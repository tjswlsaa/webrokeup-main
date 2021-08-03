import React from "react";
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
import MyBook from "../pages/MyPagePages/MyBook";
import MyArticle from "../pages/MyPagePages/MyArticle";
import Impressed from "../pages/ImpressedPages/Impressed";
import readBook from "../pages/ImpressedPages/readBook";
import readArticle from "../pages/ImpressedPages/readArticle";
import likedArticle from "../pages/ImpressedPages/likedArticle";
import recentArticle from "../pages/ImpressedPages/recentArticle";
import Main from "../pages/MainPages/Main";
import PopularBook from "../pages/MainPages/PopularBook";
import PopularArticle from "../pages/MainPages/PopularArticle";
import NewArticle from "../pages/MainPages/NewArticle";
import MakeNewBook from "../pages/MyPagePages/MakeNewBook";
import NewPage from "../pages/MyPagePages/NewPage";
import IntroArticle from "../pages/MyPagePages/IntroArticle";
import login from "../pages/login/LoginScreen";
import LoadingScreen from "../pages/login/LoadingScreen";
import LoginScreen from "../pages/login/LoginScreen";
import emailSignup from "../pages/login/emailSignup";
import EditArticle from "../pages/MyPagePages/EditArticle";
import Comment from "../pages/MyPagePages/Comment";
import Account from "../pages/MyPagePages/Account";
import MarketingSetting from "../pages/MyPagePages/MarketingSetting";
import AccountInfo from "../pages/MyPagePages/AccountInfo";
import Notification from "../pages/MyPagePages/Notification";
import Policy from "../pages/MyPagePages/Policy";
import EditProfile from "../pages/MyPagePages/EditProfile";
import readIntroArticle from "../pages/MyPagePages/readIntroArticle";
import EditBook from "../pages/MyPagePages/EditBook";
import EditIntroArticle from "../pages/MyPagePages/EditIntroArticle";
import communityMakeNewPost from "../pages/community.js/communityMakeNewPost";
import readPost from "../pages/community.js/readPost";
import editPost from "../pages/community.js/editPost";
import communityBoard from "../pages/community.js/communityBoard";
import editorMakeNewWriting from "../pages/editors.js/editorMakeNewWriting";
import readEditorWriting from "../pages/editors.js/readEditorWriting";
import editWriting from "../pages/editors.js/editWriting";
import editorBoard from "../pages/editors.js/editorBoard";
import policyone from "../pages/MyPagePages/policyone";
import policytwo from "../pages/MyPagePages/policytwo";
import Practice from "../pages/community.js/Practice";
const TabStack = createBottomTabNavigator();
const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
const CommunityStack = createStackNavigator();
const EditorStack = createStackNavigator();
const MainStackScreen = () => {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          name="Main"
          component={Main}
          options={{
            title: "모든 이별록",
          }}
        />
        <MainStack.Screen name="NewArticle" component={NewArticle} />
        <MainStack.Screen name="PopularArticle" component={PopularArticle} />
        <MainStack.Screen name="PopularBook" component={PopularBook} />
        <HomeStack.Screen name="readArticle" component={readArticle} />
        <HomeStack.Screen name="readBook" component={readBook} />
        <HomeStack.Screen 
        name="editorMakeNewWriting" 
        options={{ headerShown: true }}
        component={editorMakeNewWriting}
        />
      <HomeStack.Screen 
        name="readEditorWriting" 
        component={readEditorWriting.component}
        options={readEditorWriting.options}    
        />
              <HomeStack.Screen 
        name="editWriting" 
        component={editWriting}
        />
                      <HomeStack.Screen 
        name="editorBoard" 
        component={editorBoard}
        />
      </MainStack.Navigator>
    );
  };
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
    initialRouteName="MyPage"

        screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
    }}
    >
      <HomeStack.Screen 
        name="MyPage" 
        component={MyPage}
        // options={{
        //   headerLeft: () => null
        // }}
        options={{
          headerShown: false,
          gestureEnabled: false,
  }}
      //          defaultNavigationOptions: {
      //   gesturesEnabled: false
      // }
        />
        <HomeStack.Screen name="readArticle" component={readArticle} />
      <HomeStack.Screen name="MyBook" 
      component={MyBook.component} 
      options={MyBook.options} 
              />
      <HomeStack.Screen 
      name="MyArticle" 
      component={MyArticle.component}
      options={MyArticle.options}       />
      <HomeStack.Screen
       name="MakeNewBook" 
       component={MakeNewBook.component}
       options={MakeNewBook.options}
       />
      <HomeStack.Screen name="IntroArticle" component={IntroArticle}/>
      <HomeStack.Screen name="NewPage" component={NewPage}/>
      <HomeStack.Screen name="EditArticle" component={EditArticle}/>
      <HomeStack.Screen 
      //  defaultNavigationOptions: {
      //   gesturesEnabled: false
      // }
      options={{
              title:"댓글",
              headerShown: false,
              // gestureEnabled: false,
              cardOverlayEnabled: true,
              // ... TransitionPresets.ModalSlideFromBottomIOS,
              ...TransitionPresets.ModalPresentationIOS,
      }}
      // gestureEnabled={false}
        // custom()
        // headerShown: true,
        // gestureDirection: 'horizontal',
        // transitionSpec: {
        //   open: config,
        //   close: closeConfig,
        // },
        // cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      // mode="modal"
      name="Comment" 
      component={Comment}/>
      <HomeStack.Screen name="Account" component={Account} options={{title: "설정"}}/>
      <HomeStack.Screen name="MarketingSetting" component={MarketingSetting} options={{title: "마케팅 알림 설정"}}/>
      <HomeStack.Screen name="AccountInfo" component={AccountInfo} options={{title: "계정 정보"}}/>
      <HomeStack.Screen name="Notification" component={Notification} options={{title: "공지사항"}}/>
      <HomeStack.Screen name="Policy" component={Policy} options={{title: "약관 및 정책"}}/>
      <HomeStack.Screen name="policyone" component={policyone} options={{title: "이용 약관"}}/>
      <HomeStack.Screen name="policytwo" component={policytwo} options={{title: "개인정보 처리방침"}}/>
      <HomeStack.Screen name="EditProfile" component={EditProfile} options={{title: "프로필 수정"}}/>
      <HomeStack.Screen name="readIntroArticle" component={readIntroArticle}/>
      <HomeStack.Screen
       name="EditBook" 
       component={EditBook.component}
       options={EditBook.options}
       />
      <HomeStack.Screen name="EditIntroArticle" component={EditIntroArticle}/>
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
      <CommunityStack.Screen 
        name="communityMakeNewPost" 
        component={communityMakeNewPost}
        />
      <CommunityStack.Screen 
        name="readPost" 
        component={readPost.component}
        options={readPost.options}        />
      <CommunityStack.Screen 
        name="editPost" 
        component={editPost}
        />
              <CommunityStack.Screen 
        name="Practice" 
        component={Practice}
        options={{headerShown:false}}
        />
    </CommunityStack.Navigator>
  )
}

const TabStackScreen = () => {
  return (
    <TabStack.Navigator
    initialRouteName="메인"
         tabBarOptions={{
          // style: { height: 50 },
          showLabel: false}}
        screenOptions={
          ({route})=> ({
              tabBarIcon: ({focused,color,size})=> {
                  let iconName;
                  if(route.name==="메인"){
                      iconName="book";}
                      else if (route.name=="나의 이별록"){
                       iconName="person-outline";}
                        else if (route.name=="게시판"){
                          iconName="person-outline"
                        }
                        return <Icon name={iconName} size={size}  color={color}/>;}
              })
          }
    >
      <TabStack.Screen name="메인" component={MainStackScreen} />
      <TabStack.Screen name="나의 이별록" component={HomeStackScreen} />
      <TabStack.Screen name="게시판" component={CommunityStackScreen} />
    </TabStack.Navigator>
  );
};
export default TabStackScreen;