import React, { useState } from 'react'
import { View ,Text,StyleSheet,TouchableOpacity,Alert} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { theme } from '../core/theme'
import BackGround from '../components/BackGround'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Logo from "../components/Logo";
import Header from "../components/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Loader from "../components/Loader"


const LoginScreen =() =>{
    // const [email, setEmail] = useState({ value: '', error: '' })
    // const [clave, setClave] = useState({ value: '', error: '' })
    const [email, setEmail] = useState("abarrios@luz-azul.com.ar");
    const [clave, setClave] = useState("mariano");
    const [loading,setLoading] = useState(false)
    
      
    const onLoginPressed = () => {
      setLoading(true)
      const data = { email: email, clave: clave };
      axios.post("https://daprolac.herokuapp.com/api/v1/usuarios/login", data).then((response) => {
      // axios.post("http://10.0.2.2:3000/api/v1/usuarios/login", data).then((response) => {
      // axios.post("http://localhost:3000/api/v1/usuarios/login", data).then((response) => {
        if (response.error) {
          Alert.alert(response.error);
        } else {
          //AsyncStorage.setItem("accessToken", response.data.accessToken);
          //AsyncStorage.setItem("user", JSON.stringify(response.data.user));
          AsyncStorage.setItem("id", JSON.stringify(response.data.payload.id));
          //console.log("token: ",response.data.accessToken);
          //console.log("user: ",response.data.user);
          //console.log("id: ",response.data.user.id);
          //Alert.alert(AsyncStorage.getItem("accessToken"));
          setLoading(false)
          navigation.replace('Drawer',{id:response.data.payload.id})
        }
      }).catch(error =>{
        console.log(error.response);
        Alert.alert('no existe el usuario o la contraseña es incorrecta');
        setLoading(false)
      });
      
      // const emailError = emailValidator(email.value)
      // const passwordError = passwordValidator(password.value)
      // if (emailError || passwordError) {
      //   setEmail({ ...email, error: emailError })
      //   setPassword({ ...password, error: passwordError })
      //   return
      // }
    }

    const emailValidator = (email)=> {
        const re = /\S+@\S+\.\S+/
        if (!email) return "Email can't be empty."
        if (!re.test(email)) return 'Ooops! We need a valid email address.'
        return ''
      }

    const passwordValidator = (password) => {
        if (!password) return "Password can't be empty."
        if (password.length < 6) return 'Password must be at least 6 characters long.'
        return ''
      }
      

    const navigation = useNavigation();
    return (
    <BackGround>
      
      <Logo /> 
      <Header>Bienvenido de nuevo.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        // value={email.value}
        // onChangeText={(text) => setEmail({ value: text, error: '' })}
        value={email}
        onChangeText={(email) => setEmail(email)}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        // value={clave.value}
        // onChangeText={(text) => setClave({ value: text, error: '' })}
        value={clave}
        onChangeText={(clave) => setClave(clave)}
        error={!!clave.error}
        errorText={clave.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
      {loading && <Loader />}
      <Button mode="contained" onPress={onLoginPressed}>
        Iniciar Sesion
      </Button>
    </BackGround>
  );
    //     <View>
    //         <Text>LOGIN  SCREEN</Text>
    //         <Text>LOGIN  SCREEN</Text>
    //         <Text>LOGIN  SCREEN</Text>
    //         <Text>LOGIN  SCREEN</Text>
    //         <Button
    //         title="Go to Home"
    //         onPress={() => navigation.replace('Drawer')}
    //         />
    //     </View>
    // );
}

const styles = StyleSheet.create({
    forgotPassword: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    forgot: {
      fontSize: 13,
      color: theme.colors.secondary,
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    image: {
      width: 300,
      height: 150,
        marginBottom: 8,
      },
  })
  

export default LoginScreen;