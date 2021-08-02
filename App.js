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
import policyoneforlogin from './pages/MyPagePages/policyoneforlogin';
import policytwoforlogin from './pages/MyPagePages/policytwoforlogin';
import GoogleCheck from './pages/login/GoogleCheck';
import Icon from 'react-native-vector-icons/Ionicons';

// import { applyMiddleware, createStore } from 'redux';
// import {Provider} from 'react-redux'
// import promiseMiddleware from 'redux-promise'
// import ReduxThunk from 'redux-thunk'
// const createStoreWithMiddleware =applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)
const App = ({navigation}) =>{
    return (
      <NavigationContainer>
              <StatusBar style="white" />
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
                screenOptions={{
      gestureEnabled: false,
      gestureDirection: 'horizontal',
    }}
        component={TabStackScreen}
      />
          <Stack.Screen
        name="emailSignup"
        component={emailSignup}
        options={{headerShown: false}}
      />
                <Stack.Screen
        name="GoogleCheck"
        component={GoogleCheck}
        options={{headerShown: false}}
      />
                <Stack.Screen
        name="policyoneforlogin"
        component={policyoneforlogin}
        options={{headerShown: true, title:"서비스 약관",
        headerLeft: () => (
          <Icon.Button name='ios-menu' size={25}
          backgroundColor= '#009387'  onPress={() => navigation.navigate('LoginScreen')}>
          </Icon.Button>)
      }}
      />
                      <Stack.Screen
        name="policytwoforlogin"
        component={policytwoforlogin}
        options={{headerShown: true, title:"개인정보 처리방침"}}
      />
      <Stack.Screen
        name="emailLogin"
        component={emailLogin}
        options={{headerShown: false}}
      />
        </Stack.Navigator>
      </NavigationContainer>
    )
    // </Provider>
  }
  export default App;