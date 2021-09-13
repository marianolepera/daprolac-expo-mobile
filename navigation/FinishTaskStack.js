import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FinishTasksScreen from '../screens/FinishTasks';
import Icon from 'react-native-vector-icons/Ionicons';

const TasksStack = createStackNavigator();

const finishTasksStackHeader = ({route,navigation}) => {
  return (
    <TasksStack.Navigator
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
    <TasksStack.Screen
      name="Tareas Terminadas"
      component={FinishTasksScreen}
      //initialParams={{ id: route.params.id }}
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
  </TasksStack.Navigator>
  );
};

export default finishTasksStackHeader;