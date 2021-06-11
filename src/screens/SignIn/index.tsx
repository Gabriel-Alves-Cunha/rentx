import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import { PasswordInput } from "../../components/PasswordInput";
import { useAuth } from "../../hooks/auth";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import theme from "../../styles/theme";

import { Container, Header, Title, SubTitle, Footer, Form } from "./styles";

const schema = Yup.object().shape({
	email: Yup.string()
		.required("E-mail obrigatório")
		.email("Digite um e-mail válido"),
	password: Yup.string().required("A senha é obrigatória"),
});

export function SignIn() {
	const nav = useNavigation();
	const { signIn } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSignIn() {
		try {
			const data = { email, password };
			await schema.validate(data);
			signIn(data);
		} catch (error) {
			if (error instanceof Yup.ValidationError)
				Alert.alert("Opa", error.message);
			else {
				Alert.alert(
					"Erro na autenticação",
					"Ocorreu um erro ao fazer login, verifique suas credenciais"
				);
				console.error(error);
			}
		}
	}

	function handleCreateNewAccount() {
		nav.navigate("SignUpFirstStep");
	}

	return (
		<KeyboardAvoidingView behavior="position" enabled>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<Header>
						<Title>Estamos{"\n"}quase lá</Title>
						<SubTitle>
							Faça seu login para começar{"\n"}uma experiência incrível.
						</SubTitle>
					</Header>

					<Form>
						<Input
							iconName="mail"
							placeholder="E-mail"
							keyboardType="email-address"
							autoCorrect={false}
							autoCapitalize="none"
							onChangeText={setEmail}
							value={email}
						/>
						<PasswordInput
							iconName="lock"
							placeholder="Senha"
							autoCorrect={false}
							autoCapitalize="none"
							onChangeText={setPassword}
							value={password}
						/>
					</Form>

					<Footer>
						<Button title="Login" onPress={handleSignIn} isLoading={false} />
						<Button
							title="Criar conta gratuita"
							color={theme.colors.background_secondary}
							onPress={handleCreateNewAccount}
							light
							isLoading={false}
						/>
					</Footer>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
