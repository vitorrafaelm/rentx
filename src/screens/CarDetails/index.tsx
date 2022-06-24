import React from "react";
import { Accessory } from "../../components/Accessory";

import { BackButton } from "../../components/backButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Button } from "../../components/Button";

import SpeedSvg from '../../assets/speed.svg'; 
import AccelerationSvg from '../../assets/acceleration.svg'; 
import ForceSvg from '../../assets/force.svg'; 
import GasolineSvg from '../../assets/gasoline.svg'; 
import ExchangeSvg from '../../assets/exchange.svg'; 
import PeopleSvg from '../../assets/people.svg'; 

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
import { useNavigation } from "@react-navigation/native";


export function CarDetails(): JSX.Element {
  const navigation = useNavigation(); 

  function handleConfirm() {
    navigation.navigate({ name: 'Scheduling'});
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={["1", "2"]} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborhini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 500</Price>
          </Rent>
        </Details>


        <Accessories>
          <Accessory name="380Km/h" icon={SpeedSvg} />
          <Accessory name="3.2s" icon={AccelerationSvg} />
          <Accessory name="80 HP" icon={ForceSvg} />
          <Accessory name="Gasolina" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="2 pessoas" icon={PeopleSvg} />
        </Accessories>
        

        <About>
          Este é um automóvel desportivo. Surgiu do lendário
          touro de lide indultado na praça real Maestranza de Sevilla. 
          É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirm} />
      </Footer>

    </Container>
  );
}
