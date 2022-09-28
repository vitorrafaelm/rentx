import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { Container, Header, Title, Form, SubTitle, Footer } from './styles';
import { InputPassword } from '../../components/PasswordInput';

export function SignIn(): JSX.Element {

    const theme = useTheme();

    return (
        <KeyboardAvoidingView
            behavior='position'
            enabled
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                
                <Form>
                    <Input 
                        iconName='mail'
                        placeholder='E-mail'
                        keyboardType='email-address'
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                    <InputPassword
                        iconName='lock'
                        placeholder='Senha'
                    />
                </Form>

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
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}