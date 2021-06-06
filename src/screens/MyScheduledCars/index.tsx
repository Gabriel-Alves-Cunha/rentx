import React, { useEffect, useState } from "react";
import { Alert, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { LoadAnimation } from "../../components/LoadAnimation";
import { BackButton } from "../../components/BackButton";
import { CarDTO } from "../../DTOS/CarDTO";
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

export interface CarProps {
	id: string;
	car: CarDTO;
	user_id: string;
	startDate: string;
	endDate: string;
}

export function MyScheduledCars() {
	const nav = useNavigation();
	const theme = useTheme();

	const [myScheduledCars, setMyScheduledCars] = useState<CarProps[]>(
		[] as CarProps[]
	);
	const [isLoading, setIsLoading] = useState(true);

	function handleNavigateBack2Home() {
		nav.goBack();
	}

	useEffect(() => {
		(async function fetchMyScheduledCars() {
			try {
				const res = await api.get("/schedules_byuser?user_id=1");

				//console.log(res.data);
				setMyScheduledCars(res.data);
			} catch (error) {
				console.error(error);
				Alert.alert(
					"Não foi possível conectar com o servidor. Tente novamente mais tarde :("
				);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

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

				<Title>
					Escolha uma{"\n"}
					data de início e{"\n"}
					fim de aluguel
				</Title>

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
								<Car data={item.car} />
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
