import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";

import {
  Container,
  ImagesIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from "./styles";

interface Props {
  imagesUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props): JSX.Element {
  const [imageIndex, setImageIndex] = useState(0); 

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index); 
  }); 

  return (
    <Container>
      <ImagesIndexes>
        {
          imagesUrl.map((_, index) => (
            <ImageIndex key={index} active={index === imageIndex} />
          ))
        }
      </ImagesIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
