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
      <CarImage source={{ uri: 'https://freebiescloud.com/wp-content/uploads/2021/03/Audi-RS6-Avant-2021-1.png' }} resizeMode="contain" />
    </CarImageWrapper>
  </Container>
 )
}