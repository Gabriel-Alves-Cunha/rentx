import React, { useState } from "react";
import { StatusBar } from "react-native";
import { addDays, format } from "date-fns/esm";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";

import {
	Calendar,
	DayProps,
	generateInterval,
	MarkedDateProps,
} from "../../components/Calendar";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Params } from "../CarDetails";

import ArrowSvg from "../../assets/arrow.svg";

import {
	Container,
	Header,
	Title,
	RentalPeriod,
	DateInfo,
	DateTitle,
	DateValue,
	Content,
	Footer,
} from "./styles";

export interface RentalPeriod {
	startFormatted: string;
	endFormatted: string;
}

export function Scheduling() {
	const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
		{} as DayProps
	);
	const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
		{} as MarkedDateProps
	);
	const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
		{} as RentalPeriod
	);

	const theme = useTheme();
	const nav = useNavigation();
	const route = useRoute();
	const { car } = route.params as Params;

	function handleNavigate2SchedulingDetails() {
		nav.navigate("SchedulingDetails", {
			car,
			dates: Object.keys(markedDates),
		});
	}

	function handleNavigateBack2Home() {
		nav.goBack();
	}

	function handleDateChange(date: DayProps) {
		let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
		let end = date;

		if (start.timestamp > end.timestamp) {
			start = end;
			end = start;
		}

		setLastSelectedDate(end);

		const interval = generateInterval(start, end);
		setMarkedDates(interval);

		const firstDate = Object.keys(interval)[0];
		const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

		setRentalPeriod({
			startFormatted: format(addDays(new Date(firstDate), 1), "dd/MM/yyyy"),
			endFormatted: format(addDays(new Date(endDate), 1), "dd/MM/yyyy"),
		});
	}

	return (
		<Container>
			<StatusBar
				backgroundColor={theme.colors.header}
				barStyle="light-content"
			/>

			<Header>
				<BackButton
					onPress={handleNavigateBack2Home}
					color={theme.colors.shape}
				/>

				<Title>
					Escolha uma{"\n"}
					data de início e{"\n"}
					fim de aluguel
				</Title>

				<RentalPeriod>
					<DateInfo>
						<DateTitle>DE</DateTitle>
						<DateValue selected={!!rentalPeriod.startFormatted}>
							{rentalPeriod.startFormatted}
						</DateValue>
					</DateInfo>

					<ArrowSvg />

					<DateInfo>
						<DateTitle>ATÉ</DateTitle>
						<DateValue selected={!!rentalPeriod.endFormatted}>
							{rentalPeriod.endFormatted}
						</DateValue>
					</DateInfo>
				</RentalPeriod>
			</Header>

			<Content>
				<Calendar markedDates={markedDates} onDayPress={handleDateChange} />
			</Content>

			<Footer>
				<Button
					enabled={!!rentalPeriod.endFormatted}
					title="Confirmar"
					onPress={handleNavigate2SchedulingDetails}
				/>
			</Footer>
		</Container>
	);
}
