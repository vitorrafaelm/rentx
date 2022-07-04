import React, { useState } from "react";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/backButton";
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content, 
  Footer,
} from "./styles";

import ArrowSvg from "../../assets/arrow.svg";
import { Alert, StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar, DayProps, generateInterval, MarkedDatesProps } from "../../components/Calendar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { CarDTO } from "../../dtos/CarDTO";

interface RentalPeriod {
  startFormatted: string; 
  endFormatted: string; 
}

interface Params {
  car: CarDTO;
}

export function Scheduling(): JSX.Element {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps); 
  const [markedDates, setMarkedDates] = useState<MarkedDatesProps>({} as MarkedDatesProps); 
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod); 

  const theme = useTheme();
  const navigation = useNavigation(); 

  const router = useRoute(); 
  const { car } = router.params as Params; 

  function handleConfirmRental(){
    if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert("Seleciona o perído de aluguel")
    } else {
      navigation.navigate('SchedulingDetails' as never, {
        car, 
        dates: Object.keys(markedDates)
      } as never); 
    }
  }

  function handleBack() {
    navigation.goBack(); 
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate; 
    let end = date; 

    if(start.timestamp > end.timestamp) {
      start = end; 
      end = start; 
    }

    setLastSelectedDate(end); 
    const interval = generateInterval(start, end); 
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0]; 
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]; 

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
