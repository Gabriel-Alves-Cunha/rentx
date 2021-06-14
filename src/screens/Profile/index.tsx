import React, { useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ValidationError } from "yup";
import { useNavigation } from "@react-navigation/core";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";

import { PasswordInput } from "../../components/PasswordInput";
import { BackButton } from "../../components/BackButton";
import { useAuth } from "../../hooks/auth";
import { schema } from "../SignUp/SignUpFirstStep";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import {
	Container,
	Header,
	HeaderTop,
	HeaderTitle,
	LogoutButton,
	PhotoContainer,
	Photo,
	PhotoButton,
	Content,
	Options,
	Option,
	OptionTitle,
	Section,
} from "./styles";
import { awaitResOrErr } from "../../../await";

export function Profile() {
	const { user, signOut, updateUser } = useAuth();
	const nav = useNavigation();
	const theme = useTheme();

	const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
	const [driverLicense, setDriverLicense] = useState(user.driver_license);
	const [avatar, setAvatar] = useState(user.avatar);
	const [name, setName] = useState(user.name);

	function handleOptionChange(optionSelected: typeof option) {
		setOption(optionSelected);
	}

	async function handleAvatarSelect() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		});

		if (result.cancelled) return;
		if (result.uri) setAvatar(result.uri);
	}

	async function handleProfileUpdate() {
		const data = { name, email: user.email, driverLicense };
		const [_res, error] = await awaitResOrErr(
			schema.validate(data),
			"Error from handleProfileUpdate:"
		);

		if (error) {
			if (error instanceof ValidationError) Alert.alert("Opa,", error.message);
		} else {
			await updateUser({
				id: user.id,
				user_id: user.user_id,
				email: user.email,
				name,
				driver_license: driverLicense,
				avatar,
				token: user.token,
			});

			Alert.alert("Perfil atualizado com sucesso!");
		}
	}

	function handleGoBack() {
		nav.goBack();
	}

	async function handleSignOut() {
		Alert.alert(
			"Tem certeza?",
			"Se você sair, precisará de internet para conectar-se novamente.",
			[
				{
					text: "Cancelar",
					onPress: () => {},
				},
				{
					text: "Sair",
					onPress: () => signOut(),
				},
			]
		);
	}

	return (
		<KeyboardAvoidingView behavior="position" enabled>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<Header>
						<HeaderTop>
							<BackButton color={theme.colors.shape} onPress={handleGoBack} />
							<HeaderTitle>Editar Perfil</HeaderTitle>
							<LogoutButton onPress={handleSignOut}>
								<Feather name="power" size={24} color={theme.colors.shape} />
							</LogoutButton>
						</HeaderTop>

						<PhotoContainer>
							{!!avatar && <Photo source={{ uri: avatar }} />}
							<PhotoButton onPress={handleAvatarSelect}>
								<Feather name="camera" size={24} color={theme.colors.shape} />
							</PhotoButton>
						</PhotoContainer>
					</Header>

					<Content style={{ marginBottom: useBottomTabBarHeight() + 25 }}>
						<Options>
							<Option
								active={option === "dataEdit"}
								onPress={() => handleOptionChange("dataEdit")}
							>
								<OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
							</Option>
							<Option
								active={option === "passwordEdit"}
								onPress={() => handleOptionChange("passwordEdit")}
							>
								<OptionTitle active={option === "passwordEdit"}>
									Trocar senha
								</OptionTitle>
							</Option>
						</Options>

						{option === "dataEdit" ? (
							<Section>
								<Input
									iconName="user"
									placeholder="Nome"
									autoCorrect={false}
									defaultValue={user.name}
									onChangeText={setName}
								/>
								<Input
									iconName="mail"
									editable={false}
									autoCorrect={false}
									defaultValue={user.email}
								/>
								<Input
									iconName="credit-card"
									placeholder="CNH"
									keyboardType="numeric"
									defaultValue={user.driver_license}
									onChangeText={setDriverLicense}
								/>
							</Section>
						) : (
							<Section>
								<PasswordInput iconName="lock" placeholder="Senha atual" />
								<PasswordInput iconName="lock" placeholder="Nova senha" />
								<PasswordInput
									iconName="lock"
									placeholder="Repetir nova senha"
								/>
							</Section>
						)}

						<Button title="Salvar alterações" onPress={handleProfileUpdate} />
					</Content>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
