import { 
  Container, 
  Details, 
  Brand, 
  Name, 
  About, 
  Rent, 
  Period, 
  Price, 
  Type,
  CarImage,
} from './styles'; 

import Gasoline from '../../assets/gasoline.svg'; 
import { RectButtonProps } from 'react-native-gesture-handler';

interface CardData {
  brand: string; 
  name: string; 
  rent: {
    period: string; 
    price: number;
  }, 
  thumb_nail: string; 
}
 
interface CarProps extends RectButtonProps {
  data: CardData; 
}

export function Car({ data, ...rest }: CarProps): JSX.Element {
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
        <Rent>
          <Period>{data.rent.period}</Period>
          <Price>R$ {data.rent.price}</Price>
        </Rent>

        <Type>
          <Gasoline />
        </Type>
      </About>

      </Details>

      <CarImage source={{ uri: data.thumb_nail}} resizeMode="contain" />
    </Container>
  )
}