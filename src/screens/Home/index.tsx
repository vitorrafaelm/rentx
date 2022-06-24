import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/car";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

interface CardData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumb_nail: string;
}

export function Home(): JSX.Element {
  const navigation = useNavigation(); 

  const car: CardData = {
    brand: "Audi",
    name: "RS 5 Coupé",
    rent: {
      period: "Ao dia",
      price: 120,
    },
    thumb_nail:
      "https://freebiescloud.com/wp-content/uploads/2021/03/Audi-RS6-Avant-2021-1.png",
  };

  function handleCarDetails(){
    navigation.navigate({ name: 'CarDetails', });
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>Total de 12 Carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <Car data={car} onPress={handleCarDetails} />}
      />
    </Container>
  );
}

// O react native não consegue entender que o svgé um componente, para isso precisa de
// uma lib: react-native-svg e react-native-svg-transform
