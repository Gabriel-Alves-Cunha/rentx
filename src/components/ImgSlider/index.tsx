import React, { useRef, useState } from "react";
import { ViewToken } from "react-native";

import {
	Container,
	ImgIndexes,
	ImgIndex,
	CarImgWrapper,
	CarImg,
	CarImgsList,
} from "./styles";

export interface ImgProps {
	imgsUrl: string[];
}

interface ChangeImgProps {
	viewableItems: ViewToken[];
	changed: ViewToken[];
}

export function ImgSlider({ imgsUrl }: ImgProps) {
	const [imgIndex, setImgIndex] = useState(0);

	const indexChanged = useRef((info: ChangeImgProps) => {
		const index = info.viewableItems[0].index!;
		setImgIndex(index);
	});

	return (
		<Container>
			<ImgIndexes>
				{imgsUrl.map((_url, index) => (
					<ImgIndex key={index} active={index === imgIndex} />
				))}
			</ImgIndexes>

			<CarImgsList
				data={imgsUrl}
				keyExtractor={(key) => key}
				renderItem={({ item: uri }) => (
					<CarImgWrapper>
						<CarImg source={{ uri }} resizeMode="contain" />
					</CarImgWrapper>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				onViewableItemsChanged={indexChanged.current}
			/>
		</Container>
	);
}
