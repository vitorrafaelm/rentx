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
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar, DayProps, generateInterval, MarkedDatesProps } from "../../components/Calendar";
import { useNavigation } from "@react-navigation/native";

export function Scheduling(): JSX.Element {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps); 
  const [markedDates, setMarkedDates] = useState<MarkedDatesProps>({} as MarkedDatesProps); 
  const theme = useTheme();

  const navigation = useNavigation(); 

  function handleConfirmRental(){
    navigation.navigate({ name: 'SchedulingDetails' }); 
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
            <DateValue selected={true}>18/06/2021</DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>18/06/2021</DateValue>
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
