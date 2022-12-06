import React, { useState } from 'react'
import { View } from 'react-native'
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import {Text} from 'react-native-elements';
import { useTheme } from 'react-native-paper';

const HomeScreen =({route,id} ) =>{
    //const navigation = useNavigation();
    const {colors} = useTheme();
    return (
        <View>
            <Text style={{textAlign:'center', marginTop:10,color:colors.text}} h4>
                Bienvenido !
            </Text>
            <Text style={{textAlign:'center',marginTop:10,fontSize:20,fontWeight:'bold',color:colors.text}}>
                Consulta si tienes tareas por realizar!
            </Text>
        </View>
    );
}

export default HomeScreen;