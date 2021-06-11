import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep";
import { Confirmation } from "../screens/Confirmation";
import { SignIn } from "../screens/SignIn";
import { Splash } from "../screens/Splash";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
	return (
		// This is an unordered list of screens
		<Navigator headerMode="none" initialRouteName="Splash">
			<Screen name="SignUpSecondStep" component={SignUpSecondStep} />
			<Screen name="SignUpFirstStep" component={SignUpFirstStep} />
			<Screen name="Confirmation" component={Confirmation} />
			<Screen name="SignIn" component={SignIn} />
			<Screen name="Splash" component={Splash} />
		</Navigator>
	);
}
