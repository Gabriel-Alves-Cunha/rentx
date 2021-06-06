import styled from "styled-components/native";
import { Dimensions, FlatList } from "react-native";

interface ImgIndexProps {
	active: boolean;
}

export const Container = styled.View`
	width: 100%;
`;

export const ImgIndexes = styled.View`
	flex-direction: row;
	align-self: flex-end;
	padding-right: 24px;
`;
export const ImgIndex = styled.View<ImgIndexProps>`
	width: 6px;
	height: 6px;
	background-color: ${({ theme, active }) =>
		active ? theme.colors.title : theme.colors.shape};

	margin-left: 8px;
	border-radius: 3px;
`;

export const CarImgWrapper = styled.View`
	width: ${Dimensions.get("window").width}px;
	height: 132px;

	justify-content: center;
	align-items: center;
`;

export const CarImg = styled.Image`
	width: 280px;
	height: 132px;
`;

export const CarImgsList = styled(FlatList as new () => FlatList<string>)``;
