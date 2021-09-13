import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState,useEffect } from 'react'
import {
    View,
    ImageBackground,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
    Text
  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';
import Button from '../components/Button';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
const {width} = Dimensions.get('window');

const ProfileScreen =({route}) =>{
    const [user,setUser] =useState("")
    const [isLoading,setIsLoading] = useState(true)
    console.log(route.params.id);


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
    //     //alert("entre aqui")
    // },[]);
    //console.log("ROUTE EN PROFILE SCREEN",route.params.id);
    const getData = async() =>{
      const id=route.params.id
      try{
          // let valueUser = await axios.get("http://10.0.2.2:3000/api/v1/usuarios/"+id);  
          let valueUser = await axios.get("https://daprolac.herokuapp.com/api/v1/usuarios/"+id);  
          console.log(valueUser.data.payload);
          setUser(valueUser.data.payload ? valueUser.data.payload[0] : null) 
      }
      catch(error){
          console.log(error)
          alert(error)
      }

  }
  useEffect(() =>{
      getData();
      //alert("entre aqui")
  },[]);

    
    let usuario={
      nombre:user.nombre,
      apellido:user.apellido,
      email:user.email,
      id:user.id,
      tipo:user.tipo
    }
    const navigation = useNavigation();
    const {colors} = useTheme();
    const imagenBackground= {uri:'data:image/jpeg;base64,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'}
    const image = { uri: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png" };
    return (
        <View style={styles.container}>
        <ScrollView>
          <ImageBackground
            source={imagenBackground}
            style={styles.backgroundImage}>
            <View style={styles.header}>
              <Image
                source={image}
                style={styles.avatar}>

                </Image>
              <Text style={styles.name}>
                {usuario.nombre} {usuario.apellido}
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.field}>
            <Text style={{color: colors.text,fontSize:20 }}>E-mail</Text>
            
            <Icon.Button
              name="mail"
              backgroundColor="transparent"
              color={colors.text}
              marginTop={-4}>
              <Text style={{color: colors.text, fontSize:25 }}>{usuario.email}</Text>
            </Icon.Button>
            <Text style={{color: colors.text,fontSize:20 }}>Rol</Text>
            {usuario.tipo ==1 ?
              <Icon.Button
              name="person-circle-outline"
              backgroundColor="transparent"
              color={colors.text}
              marginTop={-4}
              size={20}
              >
              <Text style={{color: colors.text, fontSize:25 }}>Operador</Text>
            </Icon.Button>
              :
              <Icon.Button
              name="person-circle-outline"
              backgroundColor="transparent"
              color={colors.text}
              marginTop={-4}>
              <Text style={{color: colors.text, fontSize:25 }}>Administrador</Text>
            </Icon.Button>
            }
            <View>
              <Button
                style={{width: '60%', textAlign: 'center'}}
                mode="contained"
                onPress={() => navigation.navigate("EditProfileScreen", {
                  nombre:usuario.nombre,
                  email:usuario.email,
                  apellido:usuario.apellido,
                  id:usuario.id
                })}
                //onPress={() => navigation.navigate('EditProfileScreen',{ nombre: 'jane' })}
                // onPress={() => {
                //   this.props.navigation.navigate('editarPerfilScreen', {
                //     EditarPerfil: usuario,
                //   });
                // }}
                >
                Editar Perfil
              </Button>
            </View>
          </View>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: constants.SECONDARY_BG_COLOR,
  },
  headline: {
    marginTop: 10,
    //color: constants.PRIMARY_BG_COLOR,
  },
  backgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 300,
  },
  header: {
    backgroundColor: 'rgba(12, 12, 25, 0.75)',
    height: 300,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(12, 12, 25, 0.55)',
  },
  name: {
    fontSize: 30,
    marginBottom: 0,
    color: '#fff',
    fontWeight: '800',
  },
  avatar: {
    borderRadius: 60,
    width: 120,
    height: 120,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.45)',
  },
  field: {
    paddingTop: 15,
    paddingLeft: 20,
  },
  label: {
    fontSize: 20,
    //color: constants.PRIMARY_BG_COLOR,
    
    fontWeight: '700',
    //fontFamily: 'Avenir'
  },
  
});

export default ProfileScreen;