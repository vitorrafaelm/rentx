import React from "react";
import { Accessory } from "../../components/Accessory";

import { BackButton } from "../../components/backButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Button } from "../../components/Button";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories, 
  Footer,
} from "./styled";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryItem";

interface Params {
  car: CarDTO;
}

export function CarDetails(): JSX.Element {
  const navigation = useNavigation(); 
  const router = useRoute(); 

  const { car } = router.params as Params; 

  function handleConfirm() {
    navigation.navigate('Scheduling' as never, {
      car
    } as never);
  }

  function handleBack() {
    navigation.goBack(); 
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>


        <Accessories>

          {
            car.accessories.map((accessory => (
              <Accessory 
                key={accessory.type}
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)} 
              />
            )))
          }
        </Accessories>
        

        <About>
          {
            car.about
          }
        </About>
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirm} enabled={true} />
      </Footer>

    </Container>
  );
}
