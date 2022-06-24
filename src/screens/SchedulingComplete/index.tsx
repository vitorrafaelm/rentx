import React from "react";
import { useWindowDimensions, StatusBar } from "react-native";
import { useTheme } from "styled-components";

import BrandSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { Container, Content, Title, Message, Footer } from "./styles";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useNavigation } from "@react-navigation/native";

export function SchedulingComplete(): JSX.Element {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const navigation = useNavigation(); 

  function handleConfirmRental(){
    navigation.navigate({ name: 'Home'}); 
  }

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <BrandSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado</Title>

        <Message>
          Agora você só precisar ir {"\n"}
          até a concessionária da RENTX {"\n"}
          pegar o seu automóvel
        </Message>
        <Footer>
          <ConfirmButton title="OK" onPress={handleConfirmRental} />
        </Footer>
      </Content>
    </Container>
  );
}
