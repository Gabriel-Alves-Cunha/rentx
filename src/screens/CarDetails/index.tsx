import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useNetInfo } from "@react-native-community/netinfo";
import { Accessory } from "../../components/Accessory";
import { useTheme } from "styled-components";
import Animated, {
	useSharedValue,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	interpolate,
	Extrapolate,
} from "react-native-reanimated";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { Car as ModelCar } from "../../database/model/Car";
import { awaitResOrErr } from "../../../await";
import { BackButton } from "../../components/BackButton";
import { ImgSlider } from "../../components/ImgSlider";
import { Button } from "../../components/Button";
import { CarDTO } from "../../DTOS/CarDTO";
import { api } from "../../services/api";

import {
	Container,
	Header,
	CarImgs,
	Details,
	Description,
	Brand,
	Name,
	Rent,
	Period,
	Price,
	About,
	Accessories,
	Footer,
	OfflineInfo,
} from "./styles";

export interface Params {
	car: ModelCar;
}

export function CarDetails() {
	const netInfo = useNetInfo();
	const nav = useNavigation();
	const theme = useTheme();
	const route = useRoute();
	const { car } = route.params as Params;

	const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

	const scrollY = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler((event) => {
		scrollY.value = event.contentOffset.y;
	});
	const headerStyleAnimation = useAnimatedStyle(() => {
		return {
			height: interpolate(
				scrollY.value,
				[0, 200],
				[200, 70],
				Extrapolate.CLAMP
			),
		};
	});
	const sliderCarsStyleAnimation = useAnimatedStyle(() => {
		return {
			opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
		};
	});

	function handleNavigate2ConfirmRental() {
		nav.navigate("Scheduling", { car });
	}

	function handleNavigateBack2Home() {
		nav.goBack();
	}

	useEffect(() => {
		let isMounted = true;

		async function fetchCarUpdated() {
			const [response, error] = await awaitResOrErr(
				api.get(`/cars/${car.id}`),
				"Error from fetchCarUpdated:"
			);

			if (error) return;

			if (isMounted) setCarUpdated(response.data);
		}

		if (netInfo.isConnected === true) fetchCarUpdated();

		return () => {
			isMounted = false;
		};
	}, [netInfo.isConnected]);

	return (
		<Container>
			<StatusBar
				barStyle={"dark-content"}
				backgroundColor={theme.colors.background_secondary}
			/>

			<Animated.View
				style={[
					headerStyleAnimation,
					styles.header,
					{ backgroundColor: theme.colors.background_secondary },
				]}
			>
				<Header>
					<BackButton onPress={handleNavigateBack2Home} />
				</Header>

				<Animated.View style={sliderCarsStyleAnimation}>
					<CarImgs>
						<ImgSlider
							imgs={
								carUpdated.photos ?? [
									{ id: car.thumbnail, photo: car.thumbnail },
								]
							}
						/>
					</CarImgs>
				</Animated.View>
			</Animated.View>

			<Animated.ScrollView
				contentContainerStyle={{
					paddingHorizontal: 24,
					paddingTop: getStatusBarHeight() + 160,
					alignItems: "center",
				}}
				showsVerticalScrollIndicator={false}
				onScroll={scrollHandler}
				scrollEventThrottle={16}
			>
				<Details>
					<Description>
						<Brand>{car.brand}</Brand>
						<Name>{car.name}</Name>
					</Description>

					<Rent>
						<Period>{car.period}</Period>
						<Price>R$ {netInfo.isConnected === true ? car.price : "?"}</Price>
					</Rent>
				</Details>

				{carUpdated.accessories && (
					<Accessories>
						{carUpdated.accessories.map((accessory) => (
							<Accessory
								key={accessory.type}
								name={accessory.name}
								icon={getAccessoryIcon(accessory.type)}
							/>
						))}
					</Accessories>
				)}

				<About>{car.about}</About>
			</Animated.ScrollView>

			<Footer>
				<Button
					title="Escolher período de aluguel"
					onPress={handleNavigate2ConfirmRental}
					enabled={netInfo.isConnected === true}
				/>

				{netInfo.isConnected === false && (
					<OfflineInfo>
						Conecte-se à internet{"\n"}para mais informações!
					</OfflineInfo>
				)}
			</Footer>
		</Container>
	);
}

const styles = StyleSheet.create({
	header: {
		position: "absolute",
		overflow: "hidden",
		zIndex: 1,
	},
});
