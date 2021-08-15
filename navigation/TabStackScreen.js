import React, {useEffect} from "react";
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CardStyleInterpolators,TransitionSpecs, HeaderStyleInterpolators,TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Easing,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button} from 'react-native';

import MyPage from "../pages/MyPagePages/MyPage";
import Main from "../pages/MainPages/Main";

import Account from "../pages/MyPagePages/Account";
import MarketingSetting from "../pages/MyPagePages/MarketingSetting";
import AccountInfo from "../pages/MyPagePages/AccountInfo";
import Policy from "../pages/MyPagePages/Policy";

import communityBoard from "../pages/community.js/communityBoard";



const TabStack = createBottomTabNavigator();
const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
const CommunityStack = createStackNavigator();

const defaultScreenOptions = {
  headerLeft: function() {
    const navigation = useNavigation();

    return (

          <Icon.Button name='md-chevron-back-sharp' size={25}
          backgroundColor= 'white' color="black" onPress={navigation.goBack}>
        </Icon.Button>
    );

  }
};

const MainStackScreen = () => {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        /> 

      </MainStack.Navigator>
    );
  };


const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
    initialRouteName="MyPage"
    >
      <HomeStack.Screen 
        name="MyPage" 
        component={MyPage}
        options={{
          headerShown: false,
  }}

        />

      <HomeStack.Screen 
      name="Account" 
      component={Account} 
      options={{title: "설정", ...defaultScreenOptions,
    }}/>
      <HomeStack.Screen name="MarketingSetting" component={MarketingSetting} options={{title: "마케팅 알림 설정",  ...defaultScreenOptions}}/>
      <HomeStack.Screen name="AccountInfo" component={AccountInfo} options={{title: "계정 정보",  ...defaultScreenOptions}}/>
      <HomeStack.Screen name="Policy" component={Policy} options={{title: "약관 및 정책",  ...defaultScreenOptions}}/>

  
    </HomeStack.Navigator>
  );
};
const CommunityStackScreen = () => {
  return (
    <CommunityStack.Navigator
    initialRouteName="communityBoard"
    // headerMode="none"
    // screenOptions={{cardStyle: {backgroundColor: "transparent"}}}
    // defaultNavigationOptions= {{
    //   gesturesEnabled: false
    // }}
    screenOptions={{gestureEnabled: false}}
    >
        <CommunityStack.Screen 
        name="communityBoard" 
        // options={{ headerShown: false }}
        component={communityBoard}
        // navigationOptions= {{
        //   gesturesEnabled: false
        // }}
        // options={{
        //   gestureEnabled: false
        options={{
          headerShown: false,
          gestureEnabled: false,
  }}

        />

              
    </CommunityStack.Navigator>
  )
}

const TabStackScreen = () => {
  return (
    <TabStack.Navigator
    initialRouteName="메인"
         tabBarOptions={{
          showLabel: false}}
        screenOptions={
          ({route})=> ({
              tabBarIcon: ({focused,color,size})=> {
                  let iconName;
                  let screen1 = route.name;
                  let screen2;

                  if(route.name==="MainStackScreen"){
                      iconName="book-outline";
                      screen2="Main";
                      if(focused){
                        iconName="book";
                        color="#21381C";
                      }
                  } else if (route.name=="HomeStackScreen"){
                    iconName="person-outline";
                    screen2="MyPage";
                      if(focused){
                        iconName="person";
                        color="#21381C";
                      }
                  } else if (route.name=="CommunityStackScreen"){
                    iconName="md-chatbubbles-outline";
                    screen2="communityBoard";
                      if(focused){
                        iconName="md-chatbubbles";
                        color="#21381C";
                      }
                  }

                  return <MyIcon iconName={iconName} size={size} color={color} screen1={screen1} screen2={screen2} />;
                }
              })
          }
    >
      <TabStack.Screen name="MainStackScreen" component={MainStackScreen} />
      <TabStack.Screen name="HomeStackScreen" component={HomeStackScreen} />
      <TabStack.Screen name="CommunityStackScreen" component={CommunityStackScreen} />
    </TabStack.Navigator>
  );
};

function MyIcon(props) {
  const navigation = useNavigation();
  const {iconName, size, color, screen1, screen2} = props;

  
  /**
   * 탭버튼을 눌렀을 때, 해당 탭의 첫 화면으로 무조건 랜딩한다.
   */
  useEffect(()=>{
    const tabPress = navigation.addListener('tabPress', e => {
      e.preventDefault();
      navigation.navigate(screen1, { screen: screen2 }); 
      // 참고: https://reactnavigation.org/docs/nesting-navigators
      // 참고2: https://stackoverflow.com/a/68084839
    });
  
    return tabPress;
  }, []);

  return (
    <Icon name={iconName} size={size} color={color}/>
  );
}

export default TabStackScreen;