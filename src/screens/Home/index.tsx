import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from '@expo/vector-icons';

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/car";
import { Load } from "../../components/Load";
import { CarDTO } from "../../dtos/CarDTO";

import { api } from '../../services/api'; 

import { Container, Header, TotalCars, HeaderContent, CarList, MyCarsButton } from "./styles";
import theme from "../../styles/theme";
import { useTheme } from "styled-components";

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
  const theme = useTheme(); 

  function handleCarDetails(car: CarDTO){
    navigation.navigate('CarDetails' as never, { car } as never);
  }

  function handleOPenMyCars(){
    navigation.navigate('MyCars' as never);
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
        renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
      />
      }

      <MyCarsButton onPress={handleOPenMyCars}>
        <Ionicons 
          name="ios-car-sport" 
          size={32}
          color={theme.colors.shape}
        />
      </MyCarsButton>
      
    </Container>
  );
}

// O react native não consegue entender que o svgé um componente, para isso precisa de
// uma lib: react-native-svg e react-native-svg-transform
