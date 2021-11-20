import React, { useState } from 'react'
import {  StyleSheet, Image } from 'react-native';
import BackGround from '../components/BackGround'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
//import { emailValidator } from '../helpers/emailValidator'

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  return (
    <BackGround>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      
      <Header>Recuperar Contraseña</Header> 
      <TextInput
        label="E-mail"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="recibiras un link con la contraseña nueva"
      />
      <Button
        mode="contained"
        //onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Enviar Mail
      </Button>
    </BackGround>
  )
}

