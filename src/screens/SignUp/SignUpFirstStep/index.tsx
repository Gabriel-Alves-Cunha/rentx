import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

import {
	Container,
	Header,
	Steps,
	Title,
	SubTitle,
	Form,
	FormTitle,
} from "./styles";

export const schema = Yup.object().shape({
	name: Yup.string().required("Nome é obrigatório"),
	email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
	driverLicense: Yup.string().required("CNH é obrigatório"),
});

export function SignUpFirstStep() {
	const nav = useNavigation();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [driverLicense, setDriverLicense] = useState("");

	function handleGoBack2LoginScreen() {
		nav.goBack();
	}

	async function handleGo2SignUpSecondStep() {
		try {
			const data = { name, email, driverLicense };

			await schema.validate(data);

			nav.navigate("SignUpSecondStep", { user: data });
		} catch (error) {
			if (error instanceof Yup.ValidationError)
				Alert.alert("Opa", error.message);
			else console.error(error);
		}
	}

	return (
		<KeyboardAvoidingView behavior="position" enabled>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<Header>
						<BackButton onPress={handleGoBack2LoginScreen} />

						<Steps>
							<Bullet active />
							<Bullet />
						</Steps>
					</Header>

					<Title>Crie sua{"\n"}conta</Title>
					<SubTitle>
						Faça seu cadastro{"\n"}
						rápido e fácil
					</SubTitle>

					<Form>
						<FormTitle>1. Dados</FormTitle>
						<Input
							iconName="user"
							placeholder="Nome"
							onChangeText={setName}
							value={name}
						/>
						<Input
							iconName="mail"
							placeholder="Email"
							keyboardType="email-address"
							onChangeText={setEmail}
							value={email}
						/>
						<Input
							iconName="credit-card"
							placeholder="CNH"
							keyboardType="numeric"
							onChangeText={setDriverLicense}
							value={driverLicense}
						/>
					</Form>

					<Button title="Próximo" onPress={handleGo2SignUpSecondStep} />
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
