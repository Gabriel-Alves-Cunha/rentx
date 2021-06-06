import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
	width: 109px;
	height: 92px;

	justify-content: center;
	align-items: center;

	background-color: ${({ theme }) => theme.colors.background_primary};

	margin-bottom: 8px;
`;

export const Name = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	font-size: ${RFValue(11)}px;
	flex-wrap: nowrap;

	margin-top: 10px;

	color: ${({ theme }) => theme.colors.text};
`;
