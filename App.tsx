import React from "react";
import { ThemeProvider } from "styled-components";
import AppLoading from "expo-app-loading";

import {
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
} from "@expo-google-fonts/inter";
import {
	Archivo_400Regular,
	Archivo_500Medium,
	Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";

import { Routes } from "./src/routes";
import { AppProvider } from "./src/hooks";

import theme from "./src/styles/theme";

export default function App() {
	const [areFontsLoaded, error] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Archivo_400Regular,
		Archivo_500Medium,
		Archivo_600SemiBold,
	});

	if (!areFontsLoaded) {
		if (error) console.error(error);
		return <AppLoading />;
	}

	return (
		<ThemeProvider theme={theme}>
			<AppProvider>
				<Routes />
			</AppProvider>
		</ThemeProvider>
	);
}
