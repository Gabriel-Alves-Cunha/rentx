import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { Platform } from "react-native";

import PeopleSvg from "../assets/people.svg";
import HomeSvg from "../assets/home.svg";
import CarSvg from "../assets/car.svg";

import { MyScheduledCars } from "../screens/MyScheduledCars";
import { AppStackRoutes } from "./app.stack.routes";
import { Profile } from "../screens/Profile";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
	const theme = useTheme();

	return (
		// This is an ordered list of screens
		<Navigator
			tabBarOptions={{
				activeTintColor: theme.colors.main,
				inactiveTintColor: theme.colors.text_detail,
				showLabel: false,
				style: {
					paddingVertical: Platform.OS === "ios" ? 20 : 0,
					height: 58,
					backgroundColor: theme.colors.background_primary,
				},
			}}
		>
			<Screen
				name="Home"
				component={AppStackRoutes}
				options={{
					tabBarIcon: ({ color }) => (
						<HomeSvg width={24} height={24} fill={color} />
					),
				}}
			/>
			<Screen
				name="MyScheduledCars"
				component={MyScheduledCars}
				options={{
					tabBarIcon: ({ color }) => (
						<CarSvg width={24} height={24} fill={color} />
					),
				}}
			/>
			<Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ color }) => (
						<PeopleSvg width={24} height={24} fill={color} />
					),
				}}
			/>
		</Navigator>
	);
}
