import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";

import {
	Container,
	IconContainer,
	InputText,
	ChangePasswordVisibilityButton,
} from "./styles";

interface Props extends TextInputProps {
	iconName: React.ComponentProps<typeof Feather>["name"];
	value: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(true);
	const theme = useTheme();
	const [isFocused, setIsFocused] = useState(false);
	const [isFilled, setIsFilled] = useState(false);

	function handleInputFocus() {
		setIsFocused(true);
	}

	function handleInputBlur() {
		// lost focus
		setIsFocused(false);
		setIsFilled(!!value);
	}

	function handlePasswordVisibilityChange() {
		setIsPasswordVisible((oldValue) => !oldValue);
	}

	return (
		<Container isFocused={isFocused}>
			<IconContainer>
				<Feather
					name={iconName}
					size={24}
					color={
						isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
					}
				/>
			</IconContainer>

			<InputText
				{...rest}
				autoCorrect={false}
				secureTextEntry={isPasswordVisible}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
			/>

			<ChangePasswordVisibilityButton onPress={handlePasswordVisibilityChange}>
				<Feather
					name={isPasswordVisible ? "eye" : "eye-off"}
					size={24}
					color={theme.colors.text_detail}
				/>
			</ChangePasswordVisibilityButton>
		</Container>
	);
}
