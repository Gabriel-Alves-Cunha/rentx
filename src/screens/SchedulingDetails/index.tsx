import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, StatusBar } from "react-native";
import { addDays, format } from "date-fns";
import { Accessory } from "../../components/Accessory";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

import { RentalPeriod as RentalPeriodProps } from "../Scheduling";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { BackButton } from "../../components/BackButton";
import { ImgSlider } from "../../components/ImgSlider";
import { Button } from "../../components/Button";
import { CarDTO } from "../../DTOS/CarDTO";
import { api } from "../../services/api";

import {
	Container,
	Header,
	CarImgs,
	Content,
	Details,
	Description,
	Brand,
	Name,
	Rent,
	Period,
	Price,
	Accessories,
	Footer,
	RentalPeriod,
	CalendarIcon,
	DateInfo,
	DateTitle,
	DateValue,
	RentalPrice,
	RentalPriceLabel,
	RentalPriceDetails,
	RentalPriceQuota,
	RentalPriceTotal,
} from "./styles";

interface Params {
	car: CarDTO;
	dates: string[];
}

export function SchedulingDetails() {
	const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>(
		{} as RentalPeriodProps
	);
	const [isLoading, setIsLoading] = useState(false);

	const nav = useNavigation();
	const theme = useTheme();
	const route = useRoute();
	const { car, dates } = route.params as Params;

	const rentTotal = Number(dates.length * car.price);

	async function handleNavigate2Confirmation() {
		setIsLoading(true);

		const schedulesByCar = await api
			.get(`/schedules_bycars/${car.id}`)
			.catch((err) => {
				console.error(err);
				Alert.alert(
					"Não foi possível se conectar ao servidor.\n Tente novamente mais tarde :("
				);
			});

		if (!schedulesByCar) return;

		const unavailable_dates = [
			...(schedulesByCar.data.unavailable_dates as string[]),
			...dates,
		];

		api
			.put("schedules_byuser", {
				user_id: 1,
				car,
				startDate: format(addDays(new Date(dates[0]), 1), "dd/MM/yyyy"),
				endDate: format(
					addDays(new Date(dates[dates.length - 1]), 1),
					"dd/MM/yyyy"
				),
			})
			.catch((err) => {
				console.error(err);
				Alert.alert(
					"Não foi possível se conectar ao servidor.\n Tente novamente mais tarde :("
				);
			});

		api
			.put(`/schedules_bycars/${car.id}`, {
				id: car.id,
				unavailable_dates,
			})
			.then((_res) => {
				nav.navigate("Confirmation", {
					nextScreenRoute: "Home",
					title: "Carro alugado",
					message: `Agora você só precisa ir\naté a concessionária da Rentx\npegar seu automóvel.`,
				});
			})
			.catch((error) => {
				console.error(error);
				Alert.alert("Não foi possível confirmar o agendamento");
				setIsLoading(false);
			});
	}

	function handleNavigateBack2Scheduling() {
		nav.goBack();
	}

	useEffect(() => {
		setRentalPeriod({
			startFormatted: format(addDays(new Date(dates[0]), 1), "dd/MM/yyyy"),
			endFormatted: format(
				addDays(new Date(dates[dates.length - 1]), 1),
				"dd/MM/yyyy"
			),
		});
	}, []);

	return (
		<Container>
			<StatusBar
				barStyle={"dark-content"}
				backgroundColor={theme.colors.background_secondary}
			/>

			<Header>
				<BackButton onPress={handleNavigateBack2Scheduling} />
			</Header>

			<CarImgs>
				<ImgSlider imgs={car.photos} />
			</CarImgs>

			<Content>
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

				<RentalPeriod>
					<CalendarIcon>
						<Feather
							name="calendar"
							size={RFValue(24)}
							color={theme.colors.shape}
						/>
					</CalendarIcon>

					<DateInfo>
						<DateTitle>DE</DateTitle>
						<DateValue>{rentalPeriod.startFormatted}</DateValue>
					</DateInfo>

					<Feather
						name="chevron-right"
						size={RFValue(10)}
						color={theme.colors.text}
					/>

					<DateInfo>
						<DateTitle>ATÉ</DateTitle>
						<DateValue>{rentalPeriod.endFormatted}</DateValue>
					</DateInfo>
				</RentalPeriod>

				<RentalPrice>
					<RentalPriceLabel>TOTAL</RentalPriceLabel>
					<RentalPriceDetails>
						<RentalPriceQuota>
							R$ {car.price} x{dates.length} diárias
						</RentalPriceQuota>
						<RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
					</RentalPriceDetails>
				</RentalPrice>
			</Content>

			<Footer>
				<Button
					title="Alugar agora"
					color={theme.colors.success}
					onPress={handleNavigate2Confirmation}
					enabled={!isLoading}
					isLoading={isLoading}
				/>
			</Footer>
		</Container>
	);
}
