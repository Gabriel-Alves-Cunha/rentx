import React from "react";
import Animated, {
	useSharedValue,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	interpolate,
	Extrapolate,
} from "react-native-reanimated";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Accessory } from "../../components/Accessory";
import { useTheme } from "styled-components";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { BackButton } from "../../components/BackButton";
import { ImgSlider } from "../../components/ImgSlider";
import { Button } from "../../components/Button";
import { CarDTO } from "../../DTOS/CarDTO";

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
} from "./styles";

export interface Params {
	car: CarDTO;
}

export function CarDetails() {
	const nav = useNavigation();
	const theme = useTheme();
	const route = useRoute();
	const { car } = route.params as Params;

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
						<ImgSlider imgs={car.photos} />
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
						<Price>R$ {car.price}</Price>
					</Rent>
				</Details>

				<Accessories>
					{car.accessories.map((accessory) => (
						<Accessory
							key={accessory.type}
							name={accessory.name}
							icon={getAccessoryIcon(accessory.type)}
						/>
					))}
				</Accessories>

				<About>{car.about}</About>
				<About>{car.about}</About>
				<About>{car.about}</About>
				<About>{car.about}</About>
			</Animated.ScrollView>

			<Footer>
				<Button
					title="Escolher período de aluguel"
					onPress={handleNavigate2ConfirmRental}
				/>
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
