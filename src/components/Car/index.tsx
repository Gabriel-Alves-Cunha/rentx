import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { CarDTO } from "../../DTOS/CarDTO";

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
	data: CarDTO;
}

export function Car({ data, ...rest }: Props) {
	const MotorIcon = getAccessoryIcon(data.fuel_type);

	return (
		<Container {...rest}>
			<Details>
				<Brand>{data.brand}</Brand>
				<Name>{data.name}</Name>

				<About>
					<Rent>
						<Period>{data.rent.period}</Period>
						<Price>R$ {data.rent.price}</Price>
					</Rent>

					<Type>
						<MotorIcon />
					</Type>
				</About>
			</Details>

			<CarImg
				resizeMode="contain"
				source={{
					uri: data.thumbnail,
				}}
			/>
		</Container>
	);
}
