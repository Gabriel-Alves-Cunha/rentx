import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { ConfirmButton } from "../../components/ConfirmButton";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { Container, Content, Title, Message, Footer } from "./styles";

export function SchedulingComplete() {
	const nav = useNavigation();
	const theme = useTheme();
	const width = useWindowDimensions().width; // use useWi[...] when inside a component

	function handleHome() {
		nav.navigate("Home");
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
				<Title>Carro alugado!</Title>

				<Message>
					Agora você só precisa ir{"\n"}
					até a concessionária da RentX{"\n"}
					pegar o seu automóvel.
				</Message>
			</Content>

			<Footer>
				<ConfirmButton title="OK" onPress={handleHome} />
			</Footer>
		</Container>
	);
}
