import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import TasksScreen from "../screens/Tasks";
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import finishTasksStackHeader from './FinishTaskStack';
import FinishTasksScreen from '../screens/FinishTasks';

const TasksStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

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
          shadowColor:"transparent",
          borderWidth:0

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
      initialParams={{ id: route.params.id }}
      name="TasksScreen" 
      options={{
        title:"Tareas"
      }} 
      component={TasksScreen} />
      <Tab.Screen 
      initialParams={{ id: route.params.id }}
      name="FinishTasksScreen"
      options={{
        title:"Tareas Terminadas"
      }}  
      component={FinishTasksScreen} />
    </Tab.Navigator>
  );
}

const TasksStackHeader = ({route,navigation}) => {
  console.log("TASKASTASKHEADER:", route.params.id)
  return (
    <TasksStack.Navigator
    screenOptions={{
      headerTitleAlign:"center",
      headerStyle: {
        backgroundColor: "#008B84",
        shadowColor:"transparent"
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      
    <TasksStack.Screen 
    name="Tareas" 
    component={TopTabsNavigation} 
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
      }}/>
    
    
    {/* <TasksStack.Screen
      name="Tareas"
      component={TasksScreen}
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
    /> */}
  </TasksStack.Navigator>
  );
};

export default TasksStackHeader;