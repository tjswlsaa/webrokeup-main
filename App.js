import * as React from 'react';
// import { Updates } from "expo";
import { Alert } from "react-native";
// import ExpoCustomUpdater from 'expo-custom-updater'
import * as Updates from 'expo-updates';

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
import MyBookPublic from './pages/MainPages/MyBookPublic';
import readIntroArticle from "./pages/MyPagePages/readIntroArticle";
import EditIntroArticle from "./pages/MyPagePages/EditIntroArticle";
import EditProfile from "./pages/MyPagePages/EditProfile";
import PopularBook from "./pages/MainPages/PopularBook";
import PopularArticle from "./pages/MainPages/PopularArticle";
import policyone from "./pages/MyPagePages/policyone";
import policytwo from "./pages/MyPagePages/policytwo";
import Notification from "./pages/MyPagePages/Notification";
import onboarding from './pages/MyPagePages/onboarding';
import QuestionList from './pages/MyPagePages/QuestionList';
import QuestionWrite from './pages/MyPagePages/QuestionWrite';
import editorBoard from "./pages/editors.js/editorBoard";
import editWriting from "./pages/editors.js/editWriting";
import editorMakeNewWriting from "./pages/editors.js/editorMakeNewWriting";
import readEditorWriting from "./pages/editors.js/readEditorWriting";
import alltheanswers from './pages/MainPages/alltheanswers';
import communityMakeNewPost from "./pages/community.js/communityMakeNewPost";
import readPost from "./pages/community.js/readPost";
import QuestionPallete from './pages/MyPagePages/QuestionPallete';
import EditQuestion from './pages/MyPagePages/EditQuestion';
import MyArticleQuestions from './pages/MyPagePages/MyArticleQuestions';
import popularbook from './pages/MyPagePages/popularbook';
import feelingtutorial from './pages/MyPagePages/feelingtutorial';
import MyArticlePublic from './pages/MyPagePages/MyArticlePublic';
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
  // checkForUpdates = async () => {


  // try {
  //   const update = await Updates.checkForUpdateAsync();
  //   if (update.isAvailable) {
  //     await Updates.fetchUpdateAsync();
  //       Alert.alert("업데이트가 필요합니다")
  //     await Updates.reloadAsync();
  //   }
  // } catch (e) {
  //   // handle or log error
  // }}

  (async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      console.log({ update, 'where': 'App.js' });
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        Alert.alert("업데이트가 필요합니다")
        await Updates.reloadAsync();
      }
    } catch (e) {
      // handle or log error
    }
  })();

// const customUpdater = new ExpoCustomUpdater()

// customUpdater.doUpdateIfAvailable()
//   checkForUpdates = async () => {
//     try {
//       const update = await Updates.checkForUpdateAsync();expo publish --release-channel production

//       if (update.isAvailable) {
//         Alert.alert(
//           '알림!',
//           '새로운 버전이 있습니다. 업데이트 하시겠습니까?',
//           [
//            {
//              text: 'Cancel',
//              onPress: () => console.log('Cancel Pressed'),
//              style: 'cancel',
//            },
//            {text: 'OK', onPress: () => this.runUpdate()},
//           ],
//           {cancelable: false},
//         );
//       }
//     } catch (e) {
//       alert(e)
//     // handle or log error
//     }
//     }
//     runUpdate = async () => {
//       await Updates.fetchUpdateAsync(); //최신업데이트 동기화, 로컬 캐시에 저장
//       // ... notify user of update ...
//       Updates.reloadFromCache();
//     }

// try {
//   const update = await Updates.checkForUpdateAsync();
//   if (update.isAvailable) {
//     await Updates.fetchUpdateAsync();
//     // ... notify user of update ...
//     await Updates.reloadAsync();
//   }
// } catch (e) {
//   // handle or log error
// }

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
          options={{
            headerShown: true, ...defaultScreenOptions,
          }}
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
          component={MyArticle}
          options={{
            title: "감정록",

            headerShown: true,
            ...defaultScreenOptions,
          }}
        />



        <Stack.Screen
          name="MyArticleQuestions"
          component={MyArticleQuestions}
          options={{
            title: "감정록",

            headerShown: true,
            ...defaultScreenOptions,
          }}
        />
        <Stack.Screen
          name="MyArticlePublic"
          component={MyArticlePublic}
          options={{
            title: "감정록",

            headerShown: true,
            ...defaultScreenOptions,
          }}
        />

        <Stack.Screen
          name="QuestionList"
          component={QuestionList}
          options={{
            title: "감정 질문지",

            headerShown: true,
            ...defaultScreenOptions,
          }}
        />

        <Stack.Screen
          name="MyBook"
          component={MyBook.component}
          options={{
            title: "나의 감정책",

            headerShown: true,
            ...defaultScreenOptions,
            ...MyBook.options,
          }}
        />
        <Stack.Screen
          name="MyBookPublic"
          component={MyBookPublic.component}
          options={{
            title: "감정책",

            headerShown: true,
            ...defaultScreenOptions,
          }}
        />
        <Stack.Screen
          name="onboarding"
          component={onboarding}
          options={{
            title: "도움말",
            headerShown: true,
            ...defaultScreenOptions,
          }}
        />

        <Stack.Screen
          name="emailSignup"
          component={emailSignup}
          options={{ headerShown: true, ...defaultScreenOptions, title: "이메일 회원가입",
        }}
        />

        <Stack.Screen
          name="policyoneforlogin"
          component={policyoneforlogin}
          options={{
            headerShown: true, title: "서비스 약관", ...defaultScreenOptions

          }}
        />

        <Stack.Screen
          name="policytwoforlogin"
          component={policytwoforlogin}
          options={{ headerShown: true, title: "개인정보 처리방침", ...defaultScreenOptions }}
        />
        <Stack.Screen
          name="emailLogin"
          component={emailLogin}
          options={{ headerShown: true, ...defaultScreenOptions
          ,title: "이메일 로그인",
        }}
        />

        <Stack.Screen
          name="EditBook"
          component={EditBook.component}
          options={{ headerShown: true, ...defaultScreenOptions, ...EditBook.options, title:"감정책 수정"}}
        />
        <Stack.Screen
          name="popularbook"
          component={popularbook}
          options={{ headerShown: true, ...defaultScreenOptions, title:"인기 감정책" }}
        />
        <Stack.Screen
          name="MakeNewBook"
          component={MakeNewBook.component}
          options={{
            title: "책 만들기",
            ...defaultScreenOptions,
            ...MakeNewBook.options,

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
            title: "감정 일기 쓰기",
            ...defaultScreenOptions,
            ...NewPage.options

          }}
        />
        <Stack.Screen name="QuestionWrite" component={QuestionWrite.component}
          options={{
            title: "감정 질문지 쓰기",
            ...defaultScreenOptions,
            ...QuestionWrite.options

          }}
        />
        <Stack.Screen name="EditArticle" component={EditArticle.component}
          options={{
            title: "감정 일기 수정하기",
            ...defaultScreenOptions,
            ...EditArticle.options

          }}
        />
        <Stack.Screen name="EditQuestion" component={EditQuestion.component}
          options={{
            title: "감정 질문지 수정",
            ...defaultScreenOptions,
            ...EditQuestion.options

          }}
        />
        <Stack.Screen name="readIntroArticle" component={readIntroArticle} options={{ title: "말머리에서", ...defaultScreenOptions }} />
        <Stack.Screen name="Notification" component={Notification} options={{ title: "공지사항", ...defaultScreenOptions }} />

        <Stack.Screen
          name="editorMakeNewWriting"
          options={{ headerShown: true }}
          component={editorMakeNewWriting}
          options={{
            title:"에디터 글쓰기",
            ...defaultScreenOptions,
          }}
        />
        <Stack.Screen
          name="readEditorWriting"
          component={readEditorWriting}
          options={{
            title:"감정 에디터",
            ...defaultScreenOptions,
          }}
        />

<Stack.Screen
          name="feelingtutorial"
          component={feelingtutorial}
          options={{
            title:"감정 도움말",
            headerShown: false, 
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
          name="QuestionPallete"
          component={QuestionPallete}
          options={{
            title: "감정 질문지",

            ...defaultScreenOptions,
          }}
        />
        <Stack.Screen
          name="editorBoard"
          component={editorBoard}
          options={{
            title: "필미필미 에디터",

            ...defaultScreenOptions,
          }}
        />
        <Stack.Screen name="policyone" component={policyone} options={{ title: "이용 약관", ...defaultScreenOptions }} />
        <Stack.Screen name="policytwo" component={policytwo} options={{ title: "개인정보 처리방침", ...defaultScreenOptions }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "프로필 수정", ...defaultScreenOptions }} />


        <Stack.Screen name="EditIntroArticle" component={EditIntroArticle} options={{ title: "말머리에서 수정", ...defaultScreenOptions, }} />
        <Stack.Screen
          name="PopularArticle"
          component={PopularArticle}
          options={{
            title: "오늘의 감정록",
            headerTintColor: "#21381c",
            ...defaultScreenOptions,
          }} />
        <Stack.Screen
          name="PopularBook"
          component={PopularBook}
          options={{
            title: "오늘의 감정책",
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
          name="alltheanswers"
          component={alltheanswers}
          options={{
            title: "모든 답변보기",
            ...defaultScreenOptions,

          }} />
        <Stack.Screen
          name="readPost"
          component={readPost.component}
          options={{ ...readPost.options, ...defaultScreenOptions, title: "게시판" }} />
        {/* <Stack.Screen
          name="editPost"
          component={editPost.component}
          options={{ title: "게시판 글 수정하기", ...defaultScreenOptions, ...editPost.options }}

        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
  // </Provider>
}
export default App;