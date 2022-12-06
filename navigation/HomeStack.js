import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from "../screens/Home";
import Icon from 'react-native-vector-icons/Ionicons';

const HomeStack = createStackNavigator();

const HomeStackHeader = ({route,navigation}) => {
  // console.log("HOME STACK HEADER",route.params)
  return (
    <HomeStack.Navigator
    screenOptions={{
      headerTitleAlign:"center",
      headerStyle: {
        backgroundColor: "#008B84",
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Daprolac"
      component={HomeScreen}
      initialParams={{ id: route.params }}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            color="white"
            size={25}
            backgroundColor="#008B84"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
  );
};

export default HomeStackHeader;