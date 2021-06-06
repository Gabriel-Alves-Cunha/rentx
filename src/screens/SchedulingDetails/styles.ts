import styled from "styled-components/native";
import {
	getStatusBarHeight,
	getBottomSpace,
} from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	position: absolute;

	margin-top: ${getStatusBarHeight()}px;
	margin-left: 24px;
`;

export const CarImgs = styled.View`
	margin-top: ${getStatusBarHeight() + 14}px;
`;

export const Content = styled.ScrollView.attrs({
	contentContainerStyle: {
		padding: 24,
		alignItems: "center",
	},
	showsVerticalScrollIndicator: false,
})``;

export const Details = styled.View`
	width: 100%;

	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	margin-top: 38px;
`;

export const Description = styled.View``;

export const Brand = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(10)}px;
	text-transform: uppercase;

	color: ${({ theme }) => theme.colors.text_detail};
`;

export const Name = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(25)}px;
	text-transform: capitalize;

	color: ${({ theme }) => theme.colors.title};
`;

export const Rent = styled.View``;

export const Period = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(10)}px;
	text-transform: uppercase;

	color: ${({ theme }) => theme.colors.text_detail};
`;

export const Price = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(25)}px;
	text-transform: capitalize;

	color: ${({ theme }) => theme.colors.success};
`;

export const Accessories = styled.View`
	width: 100%;

	flex-direction: row;
	flex-wrap: wrap;

	align-items: center;
	justify-content: space-around;

	margin-top: 16px;
`;

export const Footer = styled.View`
	width: 100%;

	padding: 24px;
	padding-bottom: ${getBottomSpace() + 24}px;

	background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const RentalPeriod = styled.View`
	width: 100%;

	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	margin-top: 40px;

	border-bottom-width: 0.5px;
	border-bottom-color: ${({ theme }) => theme.colors.line};
	padding-bottom: 16px;
`;

export const CalendarIcon = styled.View`
	width: 48px;
	height: 48px;

	background-color: ${({ theme }) => theme.colors.main};

	justify-content: center;
	align-items: center;
`;

export const DateInfo = styled.View``;

export const DateTitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	font-size: ${RFValue(10)}px;

	color: ${({ theme }) => theme.colors.text_detail};

	text-transform: uppercase;
`;

export const DateValue = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	font-size: ${RFValue(15)}px;

	color: ${({ theme }) => theme.colors.title};
`;

export const RentalPrice = styled.View`
	width: 100%;
	margin-top: 16px;
`;

export const RentalPriceLabel = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	font-size: ${RFValue(10)}px;

	color: ${({ theme }) => theme.colors.text_detail};

	text-transform: uppercase;
`;

export const RentalPriceDetails = styled.View`
	width: 100%;
	flex-direction: row;

	justify-content: space-between;
	align-items: center;
`;

export const RentalPriceQuota = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	font-size: ${RFValue(15)}px;

	color: ${({ theme }) => theme.colors.title};
`;

export const RentalPriceTotal = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(24)}px;

	color: ${({ theme }) => theme.colors.success};
`;