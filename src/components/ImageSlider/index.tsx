import React from 'react'; 

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

export function ImageSlider({ imagesUrl }: Props): JSX.Element {
 return (
  <Container>
    <ImagesIndexes>
      <ImageIndex active={true} />
      <ImageIndex active={false} />
      <ImageIndex active={false} />
      <ImageIndex active={false} />
    </ImagesIndexes>

    <CarImageWrapper>
      <CarImage source={{ uri: imagesUrl[0] }} resizeMode="contain" />
    </CarImageWrapper>
  </Container>
 )
}