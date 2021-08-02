import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './pages/login/LoginScreen';
import LoadingScreen from './pages/login/LoadingScreen';
import emailSignup from './pages/login/emailSignup';
import MyPage from './pages/MyPagePages/MyPage';
import emailLogin from './pages/login/emailLogin';
const Stack = createStackNavigator();
import TabStackScreen from "./navigation/TabStackScreen";
import { HeaderBackButton } from '@react-navigation/stack';




const App= () =>{
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoadingScreen"
          screenOptions={{ headerShown: false }}
        
          >
             <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{headerShown: false}}
        />
            <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}

      />
          <Stack.Screen
        name="TabStackScreen"
        component={TabStackScreen}
      />
          <Stack.Screen
        name="emailSignup"
        component={emailSignup}
        options={{headerShown: false}}

      />

<Stack.Screen
        name="emailLogin"
        component={emailLogin}
        options={{headerShown: false}}

      />

        </Stack.Navigator>
      </NavigationContainer>
    );
  ;}


  export default App;