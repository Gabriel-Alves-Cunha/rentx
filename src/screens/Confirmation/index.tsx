import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { ConfirmButton } from "../../components/ConfirmButton";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { Container, Content, Title, Message, Footer } from "./styles";

interface Params {
	title: string;
	message: string;
	nextScreenRoute: string;
}

export function Confirmation() {
	const nav = useNavigation();
	const theme = useTheme();
	const width = useWindowDimensions().width; // use useWi[...] when inside a component
	const route = useRoute();
	const { title, message, nextScreenRoute } = route.params as Params;

	function handleGo2NextScreen() {
		nav.navigate(nextScreenRoute);
	}

	return (
		<Container>
			<StatusBar
				backgroundColor={theme.colors.header}
				barStyle="light-content"
			/>

			<LogoSvg width={width} />

			<Content>
				<DoneSvg width={80} height={80} />
				<Title>{title}</Title>

				<Message>{message}</Message>
			</Content>

			<Footer>
				<ConfirmButton title="OK" onPress={handleGo2NextScreen} />
			</Footer>
		</Container>
	);
}
