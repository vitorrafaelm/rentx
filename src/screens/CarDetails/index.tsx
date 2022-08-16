import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet } from 'react-native'; 
import { useTheme } from 'styled-components'; 

import Animated, {
  useSharedValue, 
  useAnimatedScrollHandler, 
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

import { Accessory } from "../../components/Accessory";

import { BackButton } from "../../components/backButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Button } from "../../components/Button";

import {
  Container,
  Header,
  CarImages,
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

import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryItem";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { StatusBar } from "react-native";

interface Params {
  car: CarDTO;
}

export function CarDetails(): JSX.Element {
  const navigation = useNavigation(); 
  const router = useRoute(); 
  const theme = useTheme(); 

  const scrollY = useSharedValue(0); 
  const scrollHandle = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  }); 
  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value, 
        [0, 200], 
        [200, 94], 
        Extrapolate.CLAMP,
      )
    }
  }); 

  const slideCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value, 
        [0, 150], 
        [1, 0], 
        Extrapolate.CLAMP,
      )
    }
  })

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
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
       />

       <Animated.View style={[
        headerStyleAnimation, 
        styles.header, 
        { backgroundColor: theme.colors.background_secondary }
        ]}>
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

        <Animated.View style={[slideCarsStyleAnimation]}>
          <CarImages>
            <ImageSlider imagesUrl={car.photos} />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandle}
        scrollEventThrottle={16}
      >
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
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirm} enabled={true} />
      </Footer>

    </Container>
  );
}


const styles = StyleSheet.create({
  header: {
    position: 'absolute', 
    overflow: 'hidden',
    zIndex: 1,
  },
})