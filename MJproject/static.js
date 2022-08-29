import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './screens/home';
import Quiz from './screens/quiz';
import ProfileScreen from './screens/profile';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
      {/* <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/> */}
      {/* <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown:false}}/> */}
         <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
         <Stack.Screen name='Quiz' component={Quiz} options={{headerShown:false}}/>
         <Stack.Screen name='ProfileScreen' component={ProfileScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;