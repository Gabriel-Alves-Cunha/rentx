import styled from "styled-components/native";
import { Dimensions, FlatList } from "react-native";
import FastImage from "react-native-fast-image";

import { Img } from ".";

export const Container = styled.View`
	width: 100%;
`;

export const ImgIndexes = styled.View`
	flex-direction: row;
	align-self: flex-end;
	padding-right: 24px;
`;

export const CarImgWrapper = styled.View`
	width: ${Dimensions.get("window").width}px;
	height: 132px;

	justify-content: center;
	align-items: center;
`;

export const CarImg = styled(FastImage)`
	width: 280px;
	height: 132px;
`;

export const CarImgsList = styled(FlatList as new () => FlatList<Img>)``;
