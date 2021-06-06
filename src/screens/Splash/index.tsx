import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";
import Animated, {
	Extrapolate,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";

import { Container } from "./styles";
import { useNavigation } from "@react-navigation/core";

export function Splash() {
	const nav = useNavigation();
	const theme = useTheme();
	const splashAnimation = useSharedValue(0);

	const brandStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(splashAnimation.value, [0, 500], [1, 0]),
			transform: [
				{
					translateX: interpolate(
						splashAnimation.value,
						[0, 500],
						[0, -500],
						Extrapolate.CLAMP
					),
				},
			],
		};
	});
	const logoStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(splashAnimation.value, [0, 500], [0, 1]),
			transform: [
				{
					translateX: interpolate(
						splashAnimation.value,
						[0, 500],
						[-500, 0],
						Extrapolate.CLAMP
					),
				},
			],
		};
	});

	function startApp() {
		nav.navigate("Home");
	}

	useEffect(() => {
		splashAnimation.value = withTiming(500, { duration: 1500 }, () => {
			"worklet";
			runOnJS(startApp)();
		});
	}, []);

	return (
		<Container>
			<StatusBar
				backgroundColor={theme.colors.header}
				barStyle="light-content"
			/>

			<Animated.View style={[brandStyle, { position: "absolute" }]}>
				<BrandSvg width={80} height={50} />
			</Animated.View>
			<Animated.View style={[logoStyle, { position: "absolute" }]}>
				<LogoSvg width={180} height={20} />
			</Animated.View>
		</Container>
	);
}
