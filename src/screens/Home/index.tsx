import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/car";
import { Load } from "../../components/Load";
import { CarDTO } from "../../dtos/CarDTO";

import { api } from '../../services/api'; 

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
  const [cars, setCars] = useState<CarDTO[]>([]); 
  const [load, setLoad] = useState(true); 

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

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars'); 
        setCars(response.data); 
      } catch (error) {
        console.log(error); 
      } finally {
        setLoad(false); 
      }
    }

    fetchCars(); 
  }, []);

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
      {
        load ? <Load /> : 
        <CarList
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Car data={item} onPress={handleCarDetails} />}
      />
      }
      
    </Container>
  );
}

// O react native não consegue entender que o svgé um componente, para isso precisa de
// uma lib: react-native-svg e react-native-svg-transform
