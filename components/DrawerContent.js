import React, { useState,useEffect }  from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons'; 


import{ ThemeContext } from './ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

 function DrawerContent({id, ...props}) {
    const navigation = useNavigation();
    const paperTheme = useTheme();
    //console.log("PROPS",props);
    //console.log("router id:",id);

    const { toggleTheme } = React.useContext(ThemeContext);

    const [user,setUser] =useState("")

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
    const getData = async() =>{
        //const id= JSON.parse(await AsyncStorage.getItem('id'));
        //console.log("ID:", id);

        // await axios.get("http://10.0.2.2:3000/api/v1/usuarios/"+id +'?eager=1')
        await axios.get("https://daprolac.herokuapp.com/api/v1/usuarios/"+id +'?eager=1')
        .then(response=>{
         setUser(response.data.payload ? response.data.payload[0] : null);
         //console.log(response.data.payload)
        }).catch(error=>{
          alert(error);
          console.log(error);
        })

        // try{
        //     let valueUser = await axios.get("http://10.0.2.2:3000/api/v1/usuarios/"+id);  
        //     console.log("OBJETO:", valueUser.data.payload)
        //     setUser(valueUser.data.payload) 
        // }
        // catch(error){
        //     console.log(error)
        //     alert(error)
        // }

    }
    useEffect(() =>{
        getData();
    },[]);

    // console.log("USUARIO:",user)
    // console.log("NOMBRE:",user.nombre)
    
    const logOut=() =>{
        //AsyncStorage.removeItem("accessToken");
        //AsyncStorage.removeItem("user");
        AsyncStorage.clear();
        navigation.navigate("LoginScreen");
    }
    const image = { uri: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png" };
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={image}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{user.nombre} {user.apellido}</Title>
                                {user.tipo ==1 ?
                                    <Caption style={styles.caption}>Operador</Caption>
                                    :
                                    <Caption style={styles.caption}>Administrador</Caption>
                                }
                            </View>
                        </View>

                        {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View> */}
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Inicio"
                            onPress={() => {props.navigation.navigate('HomeScreen',{id:user.id})}}
                        />
                        <DrawerItem 
                            icon={({color}) => (
                                <Icon2 
                                name="tasks" 
                                color={color}
                                size={22}
                                />
                            )}
                            label="Tareas"
                            onPress={() => {props.navigation.navigate('TasksScreen',{id:user.id})}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Perfil"
                            onPress={() => {props.navigation.navigate('ProfileScreen',{id:user.id})}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferencias">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text style={{marginTop:3}}>Modo Oscuro</Text>
                                {paperTheme.dark ?(
                                    <Feather 
                                        style={{marginLeft:80,marginTop:3}} 
                                        name="moon"
                                        color="white" 
                                        size={22}
                                    />
                                ):(
                                    <Feather 
                                        style={{marginLeft:80,marginTop:3}} 
                                        name="sun" 
                                        color="black" 
                                        size={22}
                                />
                                )}
                                
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    onPress={logOut}
                    label="Cerrar Sesion"
                    
                />
            </Drawer.Section>
        </View>
    );
}
export default DrawerContent;

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });