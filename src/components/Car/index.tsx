import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { useNetInfo } from "@react-native-community/netinfo";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { Car as CarModel } from "../../database/model/Car";

import {
	Container,
	Details,
	Brand,
	Name,
	About,
	Rent,
	Price,
	Period,
	Type,
	CarImg,
} from "./styles";

interface Props extends RectButtonProps {
	carData: CarModel;
}

export function Car({ carData, ...rest }: Props) {
	const netInfo = useNetInfo();

	const MotorIcon = getAccessoryIcon(carData.fuel_type);

	return (
		<Container {...rest}>
			<Details>
				<Brand>{carData.brand}</Brand>
				<Name>{carData.name}</Name>

				<About>
					<Rent>
						<Period>{carData.period}</Period>
						<Price>R$ {netInfo.isConnected === true ? carData.price : "?"}</Price>
					</Rent>

					<Type>
						<MotorIcon />
					</Type>
				</About>
			</Details>

			<CarImg
				resizeMode="contain"
				source={{
					uri: carData.thumbnail,
				}}
			/>
		</Container>
	);
}
