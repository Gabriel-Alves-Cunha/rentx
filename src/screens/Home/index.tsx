import React, { useEffect, useState } from "react";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	useAnimatedGestureHandler,
	withSpring,
} from "react-native-reanimated";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import { StatusBar, StyleSheet, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";

import { LoadAnimation } from "../../components/LoadAnimation";
import { CarDTO } from "../../DTOS/CarDTO";
import { Car } from "../../components/Car";
import { api } from "../../services/api";

import {
	Container,
	Header,
	TotalCars,
	HeaderContainer,
	CarList,
} from "./styles";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
	const nav = useNavigation();
	const theme = useTheme();

	const [cars, setCars] = useState<CarDTO[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const positionY = useSharedValue(0);
	const positionX = useSharedValue(0);
	const myCarsButtonAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: positionX.value },
				{ translateY: positionY.value },
			],
		};
	});
	const onGestureEvent = useAnimatedGestureHandler({
		onStart(_event, ctx: any) {
			ctx.positionX = positionX.value;
			ctx.positionY = positionY.value;
		},
		onActive(event, ctx: any) {
			positionX.value = ctx.positionX + event.translationX;
			positionY.value = ctx.positionY + event.translationY;
		},
		onEnd() {
			positionX.value = withSpring(0);
			positionY.value = withSpring(0);
		},
	});

	function handleNavigate2CarDetails(car: CarDTO) {
		nav.navigate("CarDetails", { car });
	}

	function handleNavigate2MyScheduledCars() {
		nav.navigate("MyScheduledCars");
	}

	useEffect(() => {
		(async function fetchCars() {
			try {
				const res = await api.get("/cars");
				setCars(res.data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", () => true);
	}, []);

	return (
		<Container>
			<StatusBar
				barStyle={"light-content"}
				backgroundColor={theme.colors.header}
			/>

			<Header>
				<HeaderContainer>
					<Logo width={RFValue(108)} height={RFValue(12)} />

					{!isLoading && <TotalCars>Total: {cars.length} carros</TotalCars>}
				</HeaderContainer>
			</Header>

			{isLoading ? (
				<LoadAnimation />
			) : (
				<CarList
					data={cars}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Car data={item} onPress={() => handleNavigate2CarDetails(item)} />
					)}
				/>
			)}

			<PanGestureHandler onGestureEvent={onGestureEvent}>
				<Animated.View
					style={[
						myCarsButtonAnimatedStyle,
						{ position: "absolute", bottom: 13, right: 22 },
					]}
				>
					<ButtonAnimated
						onPress={handleNavigate2MyScheduledCars}
						style={[styles.button, { backgroundColor: theme.colors.main }]}
					>
						<Ionicons
							name="ios-car-sport"
							size={32}
							color={theme.colors.shape}
						/>
					</ButtonAnimated>
				</Animated.View>
			</PanGestureHandler>
		</Container>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
	},
});
