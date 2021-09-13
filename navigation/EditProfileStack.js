import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EditProfileScreen from "../screens/EditProfile";
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileStack = createStackNavigator();

const EditProfileStackHeader = ({navigation: { goBack },route }) => {
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
      name={route.params.nombre}
      component={EditProfileScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="arrow-back-outline"
            color="white"
            size={25}
            backgroundColor="#008B84"
            onPress={() => goBack()}
          />
        ),
      }}
    />
  </ProfileStack.Navigator>
  );
};

export default EditProfileStackHeader;