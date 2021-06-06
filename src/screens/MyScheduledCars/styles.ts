import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { FlatList } from "react-native";

import { CarProps } from ".";

export const Container = styled.View`
	flex: 1;

	align-items: center;

	background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
	width: 100%;
	height: 325px;

	background-color: ${({ theme }) => theme.colors.header};

	justify-content: center;
	padding: 25px;
	padding-top: ${getStatusBarHeight() + 32}px;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_600};
	font-size: ${RFValue(30)}px;

	margin-top: 24px;

	color: ${({ theme }) => theme.colors.shape};
`;

export const SubTitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_400};
	font-size: ${RFValue(15)}px;

	margin-top: 24px;

	color: ${({ theme }) => theme.colors.shape};
`;

export const Content = styled.View`
	width: 100%;

	padding: 0 16px;
`;

export const Appointments = styled.View`
	width: 100%;

	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	padding: 24px 0;
`;

export const AppointmentsTitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_400};
	font-size: ${RFValue(15)}px;

	color: ${({ theme }) => theme.colors.text};
`;

export const AppointmentsQuantity = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	font-size: ${RFValue(15)}px;

	color: ${({ theme }) => theme.colors.title};
`;

export const CarWrapper = styled.View`
	margin-bottom: 16px;
`;

export const LoadContainer = styled.View`
	margin-top: ${RFPercentage(20)}px;
`;

export const MyScheduledCarsList = styled(
	FlatList as new () => FlatList<CarProps>
).attrs({
	showsVerticalScrollIndicator: false,
})``;

export const CarFooter = styled.View`
	width: 100%;
	flex-direction: row;

	align-items: center;
	justify-content: space-between;

	padding: 12px;
	margin-top: -10px;

	background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const CarFooterTitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(10)}px;

	color: ${({ theme }) => theme.colors.text_detail};
`;

export const CarFooterPeriod = styled.View`
	flex-direction: row;

	align-items: center;
`;

export const CarFooterDate = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_400};
	font-size: ${RFValue(13)}px;

	color: ${({ theme }) => theme.colors.title};
`;
