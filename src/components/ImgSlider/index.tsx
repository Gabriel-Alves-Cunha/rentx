import React, { useRef, useState } from "react";
import { ViewToken } from "react-native";

import { Bullet } from "../Bullet";

import {
	Container,
	ImgIndexes,
	CarImgWrapper,
	CarImg,
	CarImgsList,
} from "./styles";

export interface Img {
	id: string;
	photo: string;
}

interface Props {
	imgs: Img[];
}

interface ChangeImgProps {
	viewableItems: ViewToken[];
	changed: ViewToken[];
}

export function ImgSlider({ imgs }: Props) {
	const [imgIndex, setImgIndex] = useState(0);

	const indexChanged = useRef((info: ChangeImgProps) => {
		const index = info.viewableItems[0].index!;
		setImgIndex(index);
	});

	return (
		<Container>
			<ImgIndexes>
				{imgs.map((item, index) => (
					<Bullet key={item.id} active={index === imgIndex} />
				))}
			</ImgIndexes>

			<CarImgsList
				data={imgs}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<CarImgWrapper>
						<CarImg source={{ uri: item.photo }} resizeMode="contain" />
					</CarImgWrapper>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				onViewableItemsChanged={indexChanged.current}
			/>
		</Container>
	);
}
