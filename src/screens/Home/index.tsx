import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, BackHandler } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from '@expo/vector-icons';
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";

import Animated, { 
  useSharedValue,  
  useAnimatedStyle,
  useAnimatedGestureHandler, 
  withSpring,
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/car";
import { LoadAnimation } from "../../components/LoadAnimation";
import { CarDTO } from "../../dtos/CarDTO";

import { api } from '../../services/api'; 

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";
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

  const positionY = useSharedValue(0); 
  const positionX = useSharedValue(0); 

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  }); 

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX =  positionX.value; 
      ctx.positionY =  positionY.value; 
    }, 
    onActive(event, ctx){
      positionX.value = ctx.positionX + event.translationX; 
      positionY.value = ctx.positionY + event.translationY; 
    }, 
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    }); 
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
          {
            !load && <TotalCars>Total de {cars.length} Carros</TotalCars>
          }
        </HeaderContent>
      </Header>
      {
        load ? <LoadAnimation /> : 
        <CarList
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
      />
      }

      <PanGestureHandler onGestureEvent={onGestureEvent} >
        <Animated.View style={[
          myCarsButtonStyle, 
          {
            position: 'absolute', 
            bottom: 13,
            right: 22
          }
        ]}>
          <ButtonAnimated 
            onPress={handleOPenMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}  
          >
            <Ionicons 
              name="ios-car-sport" 
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
      
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center',
  }
}); 

// O react native não consegue entender que o svgé um componente, para isso precisa de
// uma lib: react-native-svg e react-native-svg-transform
