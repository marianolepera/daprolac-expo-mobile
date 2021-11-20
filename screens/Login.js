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
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';


const LoginScreen =() =>{
    // const [email, setEmail] = useState({ value: '', error: '' })
    // const [clave, setClave] = useState({ value: '', error: '' })
    //const [email, setEmail] = useState("abarrios@luz-azul.com.ar");
    //const [clave, setClave] = useState("mariano");
    const [loading,setLoading] = useState(false)


    const [info, setInfo] = useState({
      email: 'abarrios@luz-azul.com.ar',
      password: 'mariano',
      check_textInputChange: false,
      secureTextEntry: true,
      isValidEmail: true,
      isValidPassword: true,
      isEmpty:false,
      error:""
  });

    const textInputChange = (val) => {
        const re = /\S+@\S+\.\S+/
        if( re.test(val) ) {
            setInfo({
                ...info,
                email: val,
                check_textInputChange: true,
                isValidEmail: true
            });
        } else {
            setInfo({
                ...info,
                email: val,
                check_textInputChange: false,
                isValidEmail: false,
                
            });
        }
    }

    const handleValidEmail = (val) => {
      const re = /\S+@\S+\.\S+/
      if( re.test(val) ) {
          setInfo({
              ...info,
              isValidEmail: true,
          });
      } else {
          setInfo({
              ...info,
              isValidEmail: false,
              error:"Formato de email invalido"
          });
      }

    

    //   if( val.trim().length == 0 ) {
    //     setInfo({
    //         ...info,
    //         isEmpty: true,
    //         error:"el mail no puede estar vacio"
    //     });
    // } else {
    //     setInfo({
    //         ...info,
    //         isEmpty: false
    //     });
    // }

    }

    const handlePasswordChange = (val) => {
      if( val.trim().length >= 4 ) {
          setInfo({
              ...info,
              password: val,
              isValidPassword: true
          });
      } else {
          setInfo({
              ...info,
              password: val,
              isValidPassword: false
          });
      }
  }

  const updateSecureTextEntry = () => {
    setInfo({
        ...info,
        secureTextEntry: !info.secureTextEntry
    });
}
    
      
    const onLoginPressed = () => {
      setLoading(true)
      const data = { email: info.email, clave: info.password };

      if( data.email.trim() == "" ){
        return((
          Alert.alert('El email no puede estar vacio'),
          setLoading(false)
        ))
      }else if (data.clave.trim() ==""){
        return((
          Alert.alert('La contraseña no puede estar vacia'),
          setLoading(false)
        ))
      }
      
      axios.post("https://daprolac.herokuapp.com/api/v1/usuarios/login", data).then((response) => {
      // axios.post("http://10.0.2.2:3000/api/v1/usuarios/login", data).then((response) => {
      // axios.post("http://localhost:3000/api/v1/usuarios/login", data).then((response) => {
        if (response.data.payload.auth ==false ) {
          return((
           Alert.alert('credenciales invalidas'),
           setLoading(false)
          )) 
        } else {
          //AsyncStorage.setItem("accessToken", response.data.accessToken);
          //AsyncStorage.setItem("user", JSON.stringify(response.data.user));
          //AsyncStorage.setItem("id", JSON.stringify(response.data.payload.id));
          //console.log("token: ",response.data.accessToken);
          //console.log("user: ",response.data.user);
          //console.log("id: ",response.data.user.id);
          //Alert.alert(AsyncStorage.getItem("accessToken"));
          setLoading(false)
          navigation.replace('Drawer',{id:response.data.payload.id})
        }
      }).catch(error =>{
        console.log(error.response.data.error.message);
        const mensaje=error.response.data.error.message;
        if(mensaje.substring(0,22).includes('"email" is not allowed')){
          Alert.alert("El email no puede estar vacio")
          setLoading(false)
        }else if(mensaje.includes("valid")){
          Alert.alert("Debe ser un email valido")
          setLoading(false)
        }
        else if(mensaje.includes("clave")){
          Alert.alert("La contraseña no puede estar vacia")
          setLoading(false)
        }else{
          Alert.alert('no existe el usuario o la contraseña es incorrecta');
          setLoading(false)
        }
        
      });
      
      // const emailError = emailValidator(email.value)
      // const passwordError = passwordValidator(password.value)
      // if (emailError || passwordError) {
      //   setEmail({ ...email, error: emailError })
      //   setPassword({ ...password, error: passwordError })
      //   return
      // }
    }

    // const emailValidator = (email)=> {
    //     const re = /\S+@\S+\.\S+/
    //     if (!email) return "Email can't be empty."
    //     if (!re.test(email)) return 'Ooops! We need a valid email address.'
    //     return ''
    //   }

    // const passwordValidator = (password) => {
    //     if (!password) return "Password can't be empty."
    //     if (password.length < 6) return 'Password must be at least 6 characters long.'
    //     return ''
    //   }
      

    const navigation = useNavigation();
    return (
    <BackGround>
      
      <Logo /> 
      <Header>Ingresa tus datos para iniciar sesion</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        // value={email.value}
        // onChangeText={(text) => setEmail({ value: text, error: '' })}
        value={info.email}
        //onChangeText={(email) => setEmail(email)}
        onChangeText={(val) => textInputChange(val)}
        onEndEditing={(e)=>handleValidEmail(e.nativeEvent.text)}
        //theme={ info.isValidadEmail ? null : {colors: { primary: 'red',underlineColor:'transparent',}}}
        //error={!!email.error}
        //errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      {info.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
      { info.isValidEmail  ? null : 
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>{info.error}</Text>
        </Animatable.View>
          }
      {/* { info.isEmpty  ? null : 
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>{info.error}</Text>
        </Animatable.View>
          } */}
      <TextInput
        label="Password"
        returnKeyType="done"
        // value={clave.value}
        // onChangeText={(text) => setClave({ value: text, error: '' })}
        value={info.password}
        //onChangeText={(clave) => setClave(clave)}
        //error={!!clave.error}
        //errorText={clave.error}
        autoCapitalize="none"
        onChangeText={(val) => handlePasswordChange(val)}
        //secureTextEntry
        secureTextEntry={info.secureTextEntry ? true : false}
      />
       <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {info.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            { info.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>La contraseña tiene que ser mayor a 4 caracteres.</Text>
            </Animatable.View>
            }
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
      errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
  })
  

export default LoginScreen;