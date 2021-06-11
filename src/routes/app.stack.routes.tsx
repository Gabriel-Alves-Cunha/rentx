import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SchedulingDetails } from "../screens/SchedulingDetails";
import { MyScheduledCars } from "../screens/MyScheduledCars";
import { Confirmation } from "../screens/Confirmation";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { Home } from "../screens/Home";

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
	return (
		// This is an unordered list of screens
		<Navigator headerMode="none" initialRouteName="Home">
			<Screen name="SchedulingDetails" component={SchedulingDetails} />
			<Screen name="MyScheduledCars" component={MyScheduledCars} />
			<Screen name="Confirmation" component={Confirmation} />
			<Screen name="CarDetails" component={CarDetails} />
			<Screen name="Scheduling" component={Scheduling} />
			<Screen name="Home" component={Home} />
		</Navigator>
	);
}
//options={{ gestureEnabled: false }} // Prevent that, on iOS, swipe back doesn't work
