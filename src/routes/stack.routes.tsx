import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SchedulingComplete } from "../screens/SchedulingComplete";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { MyScheduledCars } from "../screens/MyScheduledCars";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { Splash } from "../screens/Splash";
import { Home } from "../screens/Home";

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
	return (
		<Navigator headerMode="none" initialRouteName="Splash">
			<Screen name="SchedulingComplete" component={SchedulingComplete} />
			<Screen name="SchedulingDetails" component={SchedulingDetails} />
			<Screen name="MyScheduledCars" component={MyScheduledCars} />
			<Screen name="CarDetails" component={CarDetails} />
			<Screen name="Scheduling" component={Scheduling} />
			<Screen name="Splash" component={Splash} />
			<Screen
				name="Home"
				component={Home}
				options={{ gestureEnabled: false }} // Prevent that, on iOS, swipe back doesn't work
			/>
		</Navigator>
	);
}
