import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { Accessory } from "../../components/Accessory";

import { BackButton } from "../../components/backButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Button } from "../../components/Button";

import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";

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
  Accessories,
  Footer,
  RentalPeriod, 
  DateInfo,
  CalendarIcon,
  DateTitle,
  DateValue, 
  RentalPrice, 
  RentalPriceLabel, 
  RentalPriceDetail,
  RentalPriceQuota, 
  RentalPriceTotal, 
} from "./styles";
import { useNavigation } from "@react-navigation/native";

export function SchedulingDetails(): JSX.Element {
  const theme = useTheme();

  const navigation = useNavigation(); 

  function handleConfirm(){
    navigation.navigate({ name: 'SchedulingComplete'}); 
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.shape}
          />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice> 
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetail>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900'</RentalPriceTotal>
          </RentalPriceDetail>
        </RentalPrice>
      </Content>

      <Footer>
        <Button title="Alugar agora" color={theme.colors.success} onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
