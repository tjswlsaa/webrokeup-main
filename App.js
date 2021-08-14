import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
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
import Icon from 'react-native-vector-icons/Ionicons';
import GoogleCheck from './pages/login/GoogleCheck';
import Comment from "./pages/MyPagePages/Comment";
import MyArticle from "./pages/MyPagePages/MyArticle";

// import { applyMiddleware, createStore } from 'redux';
// import {Provider} from 'react-redux'
// import promiseMiddleware from 'redux-promise'
// import ReduxThunk from 'redux-thunk'
// const createStoreWithMiddleware =applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)


const defaultScreenOptions = {
  headerLeft: function() {
    const navigation = useNavigation();

    return (
      // <Button
      //   onPress={navigation.goBack}
      //   title="<"
      //   color="#000"
      // />
          <Icon.Button name='md-chevron-back-sharp' size={25}
          backgroundColor= 'white' color="black" onPress={navigation.goBack}>
        </Icon.Button>
    );

  }
};

const App = ({navigation}) =>{
  // console.log('App()');
  // console.log({navigation}); // undefined: 못 쓴다, 아직 준비가 안 됐다!

    return (
      <NavigationContainer>
        <StatusBar style="white" />
        <Stack.Navigator
          initialRouteName="LoadingScreen"
          screenOptions={{ headerShown: false }}
        >
                    <Stack.Screen
            name="GoogleCheck"
            component={GoogleCheck}
            options={{headerShown: false}}
          />
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
            gestureDirection: 'horizontal',}}
            component={TabStackScreen}
          />

             <Stack.Screen 
          options={{
                  title:"댓글",
                  headerShown: false,
                  // gestureEnabled: false,
                  cardOverlayEnabled: true,
                  // ... TransitionPresets.ModalSlideFromBottomIOS,
                  ...TransitionPresets.ModalPresentationIOS,
                  ...defaultScreenOptions,
          }}
          name="CommentApp"
          component={Comment}/>

          <Stack.Screen 
            name="MyArticleApp"
            component={MyArticle.component}
            options={{
              headerShown:true,
              ...defaultScreenOptions,
            }}
          />
          
          <Stack.Screen
            name="emailSignup"
            component={emailSignup}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="policyoneforlogin"
            component={policyoneforlogin}
            options={{headerShown: true, title:"서비스 약관",
              // headerLeft: () => (
              //   <Icon.Button name='ios-menu' size={25}
              //     backgroundColor= '#009387'  onPress={() => navigation.navigate('LoginScreen')}>
              //   </Icon.Button>)
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