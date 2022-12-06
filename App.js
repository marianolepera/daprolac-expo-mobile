import 'react-native-gesture-handler';
import React, { useState,useEffect,useCallback } from 'react';
import { View ,Text} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  useTheme 
} from 'react-native-paper';

import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';


import LoginScreen from "./screens/Login";
import ResetPasswordScreen from "./screens/ResetPassword";
import { ThemeContext } from './components/ThemeContext';
import  DrawerContent  from './components/DrawerContent';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStackHeader from "./navigation/HomeStack";
import TasksStackHeader from "./navigation/TasksStack";
import ProfileStackHeader from "./navigation/ProfileStack";
import ProfileScreen from "./screens/Profile";
import EditProfileScreen from './screens/EditProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import finishTasksStackHeader from './navigation/FinishTaskStack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TasksScreen from './screens/Tasks';
import FinishTasksScreen from './screens/FinishTasks';
import DetailTaskScreen from './screens/DetailTask';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();



function DrawerNavigation({route}){
  // console.log("ROUTE",route.params.id)
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} id={route.params.id} />}>
      <Drawer.Screen name="HomeScreen" component={HomeStackHeader} />
      <Drawer.Screen name="TasksScreen" component={TasksStackHeader} />
      <Drawer.Screen name="ProfileScreen"  component={ProfileStackHeader} />
    </Drawer.Navigator>
  );
}

function TopTabsNavigation({route}){
  return (
    <Tab.Navigator 
      initialRouteName="TasksScreen" 
      //tabBarPosition="bottom"
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: '#ffffff',
        style: {
          backgroundColor: '#008B84',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: 'black',
          borderBottomWidth: 2,
        },
      }}
      
      >
      <Tab.Screen 
      name="TasksScreen" 
      options={{
        title:"Tareas"
      }} 
      component={TasksScreen} />
      <Tab.Screen 
      name="FinishTasksScreen"
      options={{
        title:"Tareas Terminadas"
      }}  
      component={finishTasksStackHeader} />
    </Tab.Navigator>
  );
}


export default function App() {
   const [isDarkTheme, setIsDarkTheme] = React.useState(false);


   const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
      fontWeight: 'bold',
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const themeContext = React.useMemo(() => ({
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token').then(console.log)
      //console.log("VALUE:",value)
      return value;
    } catch(e) {
      // error reading value
    }
  }

  useEffect (() =>{

    getData()
  } );
  


  //  const token=AsyncStorage.getItem("token");
   
  return (
    <PaperProvider theme={theme}>
      <ThemeContext.Provider value={themeContext}>
      <NavigationContainer theme={theme}>
          <Stack.Navigator  >
          <Stack.Screen 
            name="LoginScreen" 
            component={LoginScreen}
            options={{headerShown:false}}
          />
          {/* <Stack.Screen 
            name="ProfileScreen" 
            component={ProfileScreen}
            options={{headerShown:true}}
          /> */}
          <Stack.Screen 
            name="EditProfileScreen" 
            component={EditProfileScreen}
            options={{
              // headerLeft: () => (
              //   <Icon.Button
              //     name="arrow-back-outline"
              //     color="white"
              //     size={25}
              //     backgroundColor="#008B84"
              //     onPress={() => goBack()}
              //   />
              // ),
            headerTitle:"Editar Perfil",
            headerTitleAlign:"center",
            headerStyle: {
              backgroundColor: "#008B84",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            }}
          />

          <Stack.Screen 
            name="DetailTaskScreen" 
            component={DetailTaskScreen}
            options={{
              // headerLeft: () => (
              //   <Icon.Button
              //     name="arrow-back-outline"
              //     color="white"
              //     size={25}
              //     backgroundColor="#008B84"
              //     onPress={() => goBack()}
              //   />
              // ),
            headerTitle:"Detalle Tarea",
            headerTitleAlign:"center",
            headerStyle: {
              backgroundColor: "#008B84",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            }}
          />
          <Stack.Screen 
            name="ResetPasswordScreen" 
            component={ResetPasswordScreen}
            options={{headerShown:false}}
          />
          <Stack.Screen 
            name="Drawer" 
            component={DrawerNavigation} 
            options={{headerShown: false }}/>
        </Stack.Navigator>
        
       {/* <Stack.Navigator  >
            <Stack.Screen 
              name="LoginScreen" 
              component={LoginScreen}
              options={{
                headerShown:false,
                

              }}
            />
            <Stack.Screen 
              name="ResetPasswordScreen" 
              component={ResetPasswordScreen}
              options={{
                headerShown:false,
                

              }}
            />
            <Stack.Screen 
              name="Drawer" 
              component={DrawerNavigation} 
              options={{headerShown: false }}/>
        </Stack.Navigator> */}
    </NavigationContainer>
    </ThemeContext.Provider>
    </PaperProvider>
  );
  
}

