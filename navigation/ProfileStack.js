import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ProfileScreen from "../screens/Profile";
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileStack = createStackNavigator();

const ProfileStackHeader = ({route,navigation} ) => {
  //console.log("profile header id:",route.params.id);
  return (
    <ProfileStack.Navigator
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
    <ProfileStack.Screen
      name="Perfil"
      component={ProfileScreen}
      initialParams={{ id: route.params.id }}
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
  </ProfileStack.Navigator>
  );
};

export default ProfileStackHeader;