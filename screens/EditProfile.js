import React, { useState,useEffect } from 'react'
import {View, StyleSheet} from 'react-native';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {Text} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { useTheme } from 'react-native-paper';


const EditProfileScreen = ({route,navigation}) =>{
    const [nombre,setNombre] =useState(route.params ? route.params.nombre : "");
    const [apellido,setApellido] =useState(route.params ? route.params.apellido : "");
    const [email,setEmail] = useState(route.params ? route.params.email : "");
    //let usuario = route.params 
    const [clave,setClave] =useState("");
    const id =useState(route.params ? route.params.id : "");

    //const [user,setUser] =useState("")
    console.log(route);

    // const getData = async() =>{
    //     try{
    //         let valueUser = JSON.parse(await AsyncStorage.getItem('user'));  
            
    //         setUser(valueUser) 
    //     }
    //     catch(error){
    //         console.log(error)
    //         alert(error)
    //     }

    // }
    // useEffect(() =>{
    //     getData();
    // },[]);
    
  const {colors} = useTheme();
    
  const actualizarUsuario = (idUsuario) =>{
    const usuario = {
      email: email,
      nombre: nombre,
      apellido: apellido,
      clave: clave,
    };
    console.log(usuario);

    // axios.put('http://10.0.2.2:3000/api/v1/usuarios/' +idUsuario +'?eager=1',usuario,)
    axios.put('https://daprolac.herokuapp.com/api/v1/usuarios/' +idUsuario +'?eager=1',usuario,)
      .then(res => {
        console.log(res);
        console.log(res.data);
        alert('Se edito el usuario');
        // navigation.goBack();
        navigation.navigate({
          name: 'ProfileScreen',
          params: { id: idUsuario },
          merge: true,
        });
      })
      .catch(error => {
        console.log(error.response);
        alert('hubo un error');
      });
  }
    
    
    return (
        
         
          <View style={{marginLeft: 20,marginTop:20}}>
            <Text style={styles.headline,{color:colors.text}} h4>
              Datos Personales
            </Text>
            <TextInput
              style={{width: '90%'}}
              label="Nombre"
              returnKeyType="next"
              error={false}
              errorText={''}
              value={nombre}
              onChangeText={nombre => setNombre(nombre)}
              autoCapitalize="none"
            />
            <TextInput
              style={{width: '90%'}}
              label="Apellido"
              returnKeyType="next"
              error={false}
              errorText={''}
              value={apellido}
              onChangeText={apellido =>  setApellido(apellido)}
              autoCapitalize="none"
            />
            <TextInput
              style={{width: '90%'}}
              label="Email"
              returnKeyType="next"
              error={false}
              errorText={''}
              onChangeText={email => setEmail(email)}
              value={email}
              autoCapitalize="none"
            />
  
            <TextInput
              style={{width: '90%'}}
              label="Contraseña"
              returnKeyType="done"
              error={false}
              errorText={''}
              onChangeText={clave => setClave(clave)}
              value={clave}
              secureTextEntry
              autoCapitalize="none"
            />
            <View style={{flexDirection: 'row'}}>
              <Button
                style={{width: '45%', marginRight: 10}}
                mode="contained"
                onPress={() => actualizarUsuario(id)}
                >
                Aceptar
              </Button>
              <Button
                style={{width: '43%'}}
                mode="contained"
                onPress={() => navigation.goBack()}>
                Cancelar
              </Button>
              {/* {this.state.isLoading && <Loader />} */}
            </View>
          </View>
       
      );
}

const styles = StyleSheet.create({
    headline: {
      marginTop: 10,
      
    },
  });

export default EditProfileScreen;