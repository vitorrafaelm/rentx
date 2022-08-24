import { StatusBar } from 'react-native';
import React from 'react';
import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';

import { Container, Header, Title, SubTitle, Footer } from './styles';

export function SignIn(): JSX.Element {

    const theme = useTheme();

    return (
        <Container>
            <StatusBar
                barStyle='dark-content'
                backgroundColor='transparent'
                translucent
            />
            <Header>
                <Title>
                    Estamos {'\n'}quase lá.
                </Title>
                <SubTitle>
                    Faça seu login para começar{'\n'}
                    uma experiencia incrivel
                </SubTitle>
            </Header>

            <Footer>
                <Button
                    title='Login'
                    onPress={() => { }}
                    enabled={false}
                    loading={false}
                />

                <Button
                    title='Criar conta gratuita'
                    onPress={() => { }}
                    enabled={false}
                    loading={false}
                    color={theme.colors.shape}
                    light
                />
            </Footer>

        </Container>
    )
}