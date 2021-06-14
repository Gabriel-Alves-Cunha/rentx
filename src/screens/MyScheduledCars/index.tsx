import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Alert, StatusBar } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { Car as CarModel } from "../../database/model/Car";
import { LoadAnimation } from "../../components/LoadAnimation";
import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { api } from "../../services/api";

import {
	Container,
	Header,
	Title,
	SubTitle,
	Content,
	Appointments,
	AppointmentsTitle,
	AppointmentsQuantity,
	CarWrapper,
	CarFooter,
	CarFooterTitle,
	CarFooterPeriod,
	CarFooterDate,
	MyScheduledCarsList,
	LoadContainer,
} from "./styles";
import { awaitResOrErr } from "../../../await";
import { format } from "date-fns/esm";
import { parseISO } from "date-fns";

export interface CarProps {
	id: string;
	car: CarModel;
	startDate: string;
	endDate: string;
}

export function MyScheduledCars() {
	const nav = useNavigation();
	const theme = useTheme();
	const isScreenFocused = useIsFocused();

	const [myScheduledCars, setMyScheduledCars] = useState<CarProps[]>(
		[] as CarProps[]
	);
	const [isLoading, setIsLoading] = useState(true);

	function handleNavigateBack2Home() {
		nav.goBack();
	}

	useEffect(() => {
		let isMounted = true;

		(async function fetchMyScheduledCars() {
			const [res, error] = await awaitResOrErr(
				api.get("/rentals"),
				"Error from fetchMyScheduledCars: "
			);

			if (error) {
				Alert.alert(
					"Não foi possível conectar com o servidor!",
					"Tente novamente mais tarde :("
				);
			} else if (isMounted) {
				console.log("response.data from fetchMyScheduledCars:", res.data);
				const dataFormatted = res.data.map((data: CarProps) => ({
					id: data.id,
					car: data.car,
					startDate: format(parseISO(data.startDate), "dd/MM/yyyy"),
					endDate: format(parseISO(data.endDate), "dd/MM/yyyy"),
				}));
				setMyScheduledCars(dataFormatted);
			}

			setIsLoading(false);
		})();

		return () => {
			isMounted = false;
		};
	}, [isScreenFocused]);

	return (
		<Container>
			<Header>
				<StatusBar
					backgroundColor={theme.colors.header}
					barStyle="light-content"
				/>

				<BackButton
					onPress={handleNavigateBack2Home}
					color={theme.colors.shape}
				/>

				<Title>Seus carros{"\n"}alugados</Title>

				<SubTitle>Conforto, segurança e praticidade.</SubTitle>
			</Header>

			<Content>
				<Appointments>
					<AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
					<AppointmentsQuantity>{myScheduledCars.length}</AppointmentsQuantity>
				</Appointments>

				{isLoading ? (
					<LoadContainer>
						<LoadAnimation />
					</LoadContainer>
				) : (
					<MyScheduledCarsList // TODO: isn't scrolling
						data={myScheduledCars}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<CarWrapper>
								<Car carData={item.car} />
								<CarFooter>
									<CarFooterTitle>Período</CarFooterTitle>
									<CarFooterPeriod>
										<CarFooterDate>{item.startDate}</CarFooterDate>
										<AntDesign
											name="arrowright"
											size={20}
											color={theme.colors.title}
											style={{ marginHorizontal: 10 }}
										/>
										<CarFooterDate>{item.endDate}</CarFooterDate>
									</CarFooterPeriod>
								</CarFooter>
							</CarWrapper>
						)}
					/>
				)}
			</Content>
		</Container>
	);
}
