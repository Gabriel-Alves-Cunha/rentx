import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { PasswordInput } from "../../../components/PasswordInput";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { api } from "../../../services/api";
import theme from "../../../styles/theme";

import {
	Container,
	Header,
	Steps,
	Title,
	SubTitle,
	Form,
	FormTitle,
} from "./styles";

interface Params {
	user: {
		name: string;
		email: string;
		driverLicense: string;
	};
}

export function SignUpSecondStep() {
	const nav = useNavigation();
	const route = useRoute();
	const { user } = route.params as Params;

	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	function handleGoBack2LoginScreen() {
		nav.goBack();
	}

	async function handleRegister() {
		if (!password || !passwordConfirm)
			return Alert.alert("Informe a senha e a confirmação dela!");

		if (password !== passwordConfirm)
			return Alert.alert("As senhas não são iguais!");

		await api
			.post("/users", {
				name: user.name,
				email: user.email,
				driver_license: user.driverLicense,
				password,
			})
			.then(() => {
				nav.navigate("Confirmation", {
					nextScreenRoute: "SignIn",
					title: "Conta criada",
					message: "Agora é só aproveitar",
				});
			})
			.catch((error) => {
				console.error(error);
				Alert.alert("Opaa", "Não foi possível cadastrar");
			});
	}

	return (
		<KeyboardAvoidingView behavior="position" enabled>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<Header>
						<BackButton onPress={handleGoBack2LoginScreen} />

						<Steps>
							<Bullet />
							<Bullet active />
						</Steps>
					</Header>

					<Title>Crie sua{"\n"}conta</Title>
					<SubTitle>
						Faça seu cadastro{"\n"}
						rápido e fácil
					</SubTitle>

					<Form>
						<FormTitle>2. Senha</FormTitle>
						<PasswordInput
							iconName="lock"
							placeholder="Senha"
							onChangeText={setPassword}
							value={password}
						/>
						<PasswordInput
							iconName="lock"
							placeholder="Repita a senha"
							onChangeText={setPasswordConfirm}
							value={passwordConfirm}
						/>
					</Form>

					<Button
						title="Cadastrar"
						color={theme.colors.success}
						onPress={handleRegister}
					/>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
