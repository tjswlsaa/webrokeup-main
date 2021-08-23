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
import MyBook from "./pages/MyPagePages/MyBook";
import EditBook from "./pages/MyPagePages/EditBook";
import MakeNewBook from "./pages/MyPagePages/MakeNewBook";
import NewPage from "./pages/MyPagePages/NewPage";
import IntroArticle from "./pages/MyPagePages/IntroArticle";
import EditArticle from "./pages/MyPagePages/EditArticle";

import readPopularArticle from './pages/MyPagePages/readPopularArticle';
import readIntroArticle from "./pages/MyPagePages/readIntroArticle";
import EditIntroArticle from "./pages/MyPagePages/EditIntroArticle";
import EditProfile from "./pages/MyPagePages/EditProfile";
import PopularBook from "./pages/MainPages/PopularBook";
import PopularArticle from "./pages/MainPages/PopularArticle";
import policyone from "./pages/MyPagePages/policyone";
import policytwo from "./pages/MyPagePages/policytwo";
import Notification from "./pages/MyPagePages/Notification";
import onboarding from './pages/MyPagePages/onboarding';


import editorBoard from "./pages/editors.js/editorBoard";
import editWriting from "./pages/editors.js/editWriting";
import editorMakeNewWriting from "./pages/editors.js/editorMakeNewWriting";
import readEditorWriting from "./pages/editors.js/readEditorWriting";

import communityMakeNewPost from "./pages/community.js/communityMakeNewPost";
import readPost from "./pages/community.js/readPost";
import editPost from "./pages/community.js/editPost";

import MyArticle2 from './pages/MyPagePages/MyArticle2';
const defaultScreenOptions = {
  headerLeft: function () {
    const navigation = useNavigation();

    return (
      // <Button
      //   onPress={navigation.goBack}
      //   title="<"
      //   color="#000"
      // />
      <Icon.Button name='md-chevron-back-sharp' size={25}
        backgroundColor='white' color="black" onPress={navigation.goBack}>
      </Icon.Button>
    );

  }
};

const defaultScreenOptions2 = {
  headerLeft: function () {
    const navigation = useNavigation();

    return (
      // <Button
      //   onPress={navigation.goBack}
      //   title="<"
      //   color="#000"
      // />
      <Icon.Button name='md-chevron-back-sharp' size={25}
        backgroundColor='#F6F6F6' color="black" onPress={navigation.goBack}>
      </Icon.Button>
    );

  }
};

const App = ({ navigation }) => {
  // console.log('App()');
  // console.log({navigation}); // undefined: 못 쓴다, 아직 준비가 안 됐다!

  return (
    <NavigationContainer>
      <StatusBar style="white" />
      <Stack.Navigator
        initialRouteName="LoadingScreen"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen
          name="GoogleCheck"
          component={GoogleCheck}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabStackScreen"
          options={{ headerShown: false }}

          screenOptions={{
            gestureEnabled: false,
            gestureDirection: 'horizontal',
          }}
          component={TabStackScreen}
        />

        <Stack.Screen
          options={{
            title: "댓글",
            headerShown: false,
            // gestureEnabled: false,
            cardOverlayEnabled: true,
            // ... TransitionPresets.ModalSlideFromBottomIOS,
            ...TransitionPresets.ModalPresentationIOS,
            ...defaultScreenOptions,
          }}
          name="Comment"
          component={Comment} />

        <Stack.Screen
          name="MyArticle"
          component={MyArticle.component}
          options={{
            headerShown: true,
            ...defaultScreenOptions,
          }}
        />
        <Stack.Screen
          name="readPopularArticle"
          component={readPopularArticle.component}
          options={{
            headerShown: true,
            ...defaultScreenOptions,
          }}
        />
        <Stack.Screen
          name="MyArticle2"
          component={MyArticle2.component}
          options={{
            headerShown: true,
            ...defaultScreenOptions,
          }}
        />

        <Stack.Screen
          name="MyBook"
          component={MyBook.component}
          options={{
            headerShown: true,
            ...defaultScreenOptions,
          }}
        />

      <Stack.Screen
          name="onboarding"
          component={onboarding}
          options={{
            headerShown: true,
            ...defaultScreenOptions,
          }}
        />

        <Stack.Screen
          name="emailSignup"
          component={emailSignup}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="policyoneforlogin"
          component={policyoneforlogin}
          options={{
            headerShown: true, title: "서비스 약관",
            // headerLeft: () => (
            //   <Icon.Button name='ios-menu' size={25}
            //     backgroundColor= '#009387'  onPress={() => navigation.navigate('LoginScreen')}>
            //   </Icon.Button>)
          }}
        />

        <Stack.Screen
          name="policytwoforlogin"
          component={policytwoforlogin}
          options={{ headerShown: true, title: "개인정보 처리방침" }}
        />
        <Stack.Screen
          name="emailLogin"
          component={emailLogin}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="EditBook"
          component={EditBook.component}
          options={{ headerShown: true, ...EditBook.options, ...defaultScreenOptions }}
        />
        <Stack.Screen
          name="MakeNewBook"
          component={MakeNewBook.component}
          options={{
            title: "책 만들기",
            ...defaultScreenOptions2,
            ...MakeNewBook.options,
            headerStyle: {
              backgroundColor: "#F6F6F6",
            },
          }} />

        <Stack.Screen
          name="IntroArticle"
          component={IntroArticle.component}
          options={{
            title: "말머리에서",
            ...defaultScreenOptions,
            ...IntroArticle.options

          }}
        />
        <Stack.Screen name="NewPage" component={NewPage.component}
          options={{
            title: "새챕터 만들기",
            ...defaultScreenOptions,
            ...NewPage.options

          }}
        />
        <Stack.Screen name="EditArticle" component={EditArticle.component}
          options={{
            title: "챕터 수정하기",
            ...defaultScreenOptions,
            ...EditArticle.options

          }}
        />
        <Stack.Screen name="readIntroArticle" component={readIntroArticle} options={{ title: "말머리에서", ...defaultScreenOptions }} />
        <Stack.Screen name="Notification" component={Notification} options={{title: "공지사항",  ...defaultScreenOptions}}/>

        <Stack.Screen
          name="editorMakeNewWriting"
          options={{ headerShown: true }}
          component={editorMakeNewWriting}
          options={{
            ...defaultScreenOptions,
          }}
        />
        <Stack.Screen
          name="readEditorWriting"
          component={readEditorWriting}
          options={{
            ...defaultScreenOptions,
          }}
        />
        <Stack.Screen
          name="editWriting"
          component={editWriting}
          options={{
            ...defaultScreenOptions,
          }}
        />
        <Stack.Screen
          name="editorBoard"
          component={editorBoard}
          options={{
            ...defaultScreenOptions,
          }}
        />
        <Stack.Screen name="policyone" component={policyone} options={{ title: "이용 약관", ...defaultScreenOptions }} />
        <Stack.Screen name="policytwo" component={policytwo} options={{ title: "개인정보 처리방침", ...defaultScreenOptions }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "프로필 수정", ...defaultScreenOptions }} />


        <Stack.Screen name="EditIntroArticle" component={EditIntroArticle} options={{ title: "말머리에서 수정", ...defaultScreenOptions }} />
        <Stack.Screen
          name="PopularArticle"
          component={PopularArticle}
          options={{
            title: "오늘의 이별록",
            headerTintColor: "#21381c",
            ...defaultScreenOptions,
          }} />
        <Stack.Screen
          name="PopularBook"
          component={PopularBook}
          options={{
            title: "오늘의 이별록",
            ...defaultScreenOptions,
          }} />


        <Stack.Screen
          name="communityMakeNewPost"
          component={communityMakeNewPost.component}
          options={{
            title: "게시판 글쓰기",
            ...defaultScreenOptions,
            ...communityMakeNewPost.options

          }} />
        <Stack.Screen
          name="readPost"
          component={readPost.component}
          options={{ ...readPost.options, ...defaultScreenOptions, title: "게시판" }} />
        <Stack.Screen
          name="editPost"
          component={editPost}
          options={{ title: "게시판 글 수정하기", ...defaultScreenOptions }}

        />
      </Stack.Navigator>
    </NavigationContainer>
  )
  // </Provider>
}
export default App;