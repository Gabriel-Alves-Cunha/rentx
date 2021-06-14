import React, { useEffect, useState } from "react";
// import {
// 	useSharedValue,
// 	useAnimatedStyle,
// 	useAnimatedGestureHandler,
// 	withSpring,
// } from "react-native-reanimated";
//import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
//import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { synchronize } from "@nozbe/watermelondb/sync";
import { useNetInfo } from "@react-native-community/netinfo";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";

import { Car as CarModel, carsTable } from "../../database/model/Car";
import { LoadAnimation } from "../../components/LoadAnimation";
import { awaitResOrErr } from "../../../await";
import { localDatabase } from "../../database";
import { Car } from "../../components/Car";
import { api } from "../../services/api";

import {
	Container,
	Header,
	TotalCars,
	HeaderContainer,
	CarList,
} from "./styles";
import { OfflineInfo } from "../CarDetails/styles";

//const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
	const netInfo = useNetInfo();
	const nav = useNavigation();
	const theme = useTheme();
	const isScreenFocused = useIsFocused();

	const [cars, setCars] = useState<CarModel[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// const positionY = useSharedValue(0);
	// const positionX = useSharedValue(0);
	// const myCarsButtonAnimatedStyle = useAnimatedStyle(() => ({
	// 	transform: [
	// 		{ translateX: positionX.value },
	// 		{ translateY: positionY.value },
	// 	],
	// }));
	// const onGestureEvent = useAnimatedGestureHandler({
	// 	onStart(_event, ctx: any) {
	// 		ctx.positionX = positionX.value;
	// 		ctx.positionY = positionY.value;
	// 	},
	// 	onActive(event, ctx: any) {
	// 		positionX.value = ctx.positionX + event.translationX;
	// 		positionY.value = ctx.positionY + event.translationY;
	// 	},
	// 	onEnd() {
	// 		positionX.value = withSpring(0);
	// 		positionY.value = withSpring(0);
	// 	},
	// });

	function handleNavigate2CarDetails(car: CarModel) {
		nav.navigate("CarDetails", { car });
	}

	async function offlineSynchronize() {
		await awaitResOrErr(
			synchronize({
				database: localDatabase,
				pullChanges: async ({ lastPulledAt }) => {
					// trazer
					const [response, _error] = await awaitResOrErr(
						api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt ?? 0}`),
						"Error from pullChanges: "
					);
					console.log(
						"pullChanges response.data:",
						JSON.stringify(response.data)
					);
					const { changes, latestVersion } = response.data;
					return { changes, timestamp: latestVersion };
				},
				pushChanges: async ({ changes }) => {
					// empurrar
					const user = changes.users;
					await awaitResOrErr(
						api.post("/users/sync", user),
						"Error from pushChanges: "
					);
				},
			})
		);
	}

	useEffect(() => {
		let isMounted = true;

		(async function fetchCars() {
			const carsCollection = localDatabase.get<CarModel>(carsTable);
			const [cars, error] = await awaitResOrErr(
				carsCollection.query().fetch(),
				"Failed to connect. Please try again."
			);

			if (error) return;

			console.log("Cars:", cars);
			if (isMounted) {
				setIsLoading(false);
				setCars(cars);
			}
		})();

		return () => {
			isMounted = false;
		};
	}, [isScreenFocused]);

	useEffect(() => {
		if (netInfo.isConnected === true) offlineSynchronize();
	}, [netInfo.isConnected]);

	// useFocusEffect(
	// 	useCallback(() => {
	// 		const backPressEventFn = () => true;

	// 		BackHandler.addEventListener("hardwareBackPress", backPressEventFn);

	// 		return () =>
	// 			BackHandler.removeEventListener("hardwareBackPress", backPressEventFn);
	// 	}, [])
	// );

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
						<Car
							carData={item}
							onPress={() => handleNavigate2CarDetails(item)}
						/>
					)}
				/>
			)}

			{netInfo.isConnected === false && (
				<OfflineInfo>Conecte-se à internet para mais informações!</OfflineInfo>
			)}

			{/*<PanGestureHandler onGestureEvent={onGestureEvent}>
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
				</PanGestureHandler>*/}
		</Container>
	);
}

// const styles = StyleSheet.create({
// 	button: {
// 		width: 60,
// 		height: 60,
// 		borderRadius: 30,
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// });
