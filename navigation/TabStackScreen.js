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

const MainStackScreen = () => {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          name="Main"
          component={Main}

          options={{ headerShown: false }}
        /> 
        <MainStack.Screen name="NewArticle" 
        options={{
          ...defaultScreenOptions,
        }} 
        component={NewArticle} />
        <MainStack.Screen 
            name="PopularArticle" 
            component={PopularArticle} 
            options={{
              ...defaultScreenOptions,
            }} />
        <MainStack.Screen 
            name="PopularBook" 
            component={PopularBook} 
            options={{
              title:"오늘의 이별록",
              ...defaultScreenOptions,
            }} />
        <HomeStack.Screen 
        name="readArticle" 
        component={readArticle} 
        options={{
          ...defaultScreenOptions,
        }} 
        />
        <HomeStack.Screen 
        name="readBook" 
        component={readBook} 
        options={{
          ...defaultScreenOptions,
        }} 
        />
        
        <HomeStack.Screen 
          options={{
                  title:"댓글",
                  headerShown: false,
                  // gestureEnabled: false,
                  cardOverlayEnabled: true,
                  // ... TransitionPresets.ModalSlideFromBottomIOS,
                  ...TransitionPresets.ModalPresentationIOS,
                  ...defaultScreenOptions,
          }}
          name="Comment" 
          component={Comment}/>
          
      <HomeStack.Screen 
        name="editorMakeNewWriting" 
        options={{ headerShown: true }}
        component={editorMakeNewWriting}
        options={{
          ...defaultScreenOptions,
        }} 
        />
      <HomeStack.Screen 
        name="readEditorWriting" 
        component={readEditorWriting.component}
        options={{
          ...defaultScreenOptions,
          ...readEditorWriting.options
        }}     
        />
              <HomeStack.Screen 
        name="editWriting" 
        component={editWriting}
        options={{
          ...defaultScreenOptions,
        }} 
        />
      <HomeStack.Screen 
        name="editorBoard" 
        component={editorBoard}
        options={{
          ...defaultScreenOptions,
        }} 
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
        name="readArticle"
        options={{
          ...defaultScreenOptions,
        }}  
        component={readArticle} />
    <HomeStack.Screen name="MyBook" 

      component={MyBook.component} 
      options={MyBook.options} 
      options={{
        ...defaultScreenOptions,
      }} 
              />
      <HomeStack.Screen 
      name="MyArticle" 
      component={MyArticle.component}
      options={{
        ...defaultScreenOptions,
      }}
    />
      <HomeStack.Screen
       name="MakeNewBook" 
       component={MakeNewBook.component}
       options={{
        title:"책 만들기",
       ...defaultScreenOptions,
       ...MakeNewBook.options
     }} />
  
     <HomeStack.Screen 
     name="IntroArticle" 
     component={IntroArticle.component}
     options={{
       title:"말머리에서",
       ...defaultScreenOptions,
       ...IntroArticle.options

     }}
       />
      <HomeStack.Screen name="NewPage" component={NewPage}/>
      <HomeStack.Screen name="EditArticle" component={EditArticle}/>
      <HomeStack.Screen 

      options={{
              title:"댓글",
              headerShown: false,
              // gestureEnabled: false,
              cardOverlayEnabled: true,
              // ... TransitionPresets.ModalSlideFromBottomIOS,
              ...TransitionPresets.ModalPresentationIOS,
              ...defaultScreenOptions,

      }}
      
      name="Comment" 
      component={Comment}/>
      <HomeStack.Screen 
      name="Account" 
      component={Account} 
      options={{title: "설정", ...defaultScreenOptions,
    }}/>
      <HomeStack.Screen name="MarketingSetting" component={MarketingSetting} options={{title: "마케팅 알림 설정",  ...defaultScreenOptions}}/>
      <HomeStack.Screen name="AccountInfo" component={AccountInfo} options={{title: "계정 정보",  ...defaultScreenOptions}}/>
      <HomeStack.Screen name="Notification" component={Notification} options={{title: "공지사항",  ...defaultScreenOptions}}/>
      <HomeStack.Screen name="Policy" component={Policy} options={{title: "약관 및 정책",  ...defaultScreenOptions}}/>
      <HomeStack.Screen name="policyone" component={policyone} options={{title: "이용 약관",  ...defaultScreenOptions}}/>
      <HomeStack.Screen name="policytwo" component={policytwo} options={{title: "개인정보 처리방침",  ...defaultScreenOptions}}/>
      <HomeStack.Screen name="EditProfile" component={EditProfile} options={{title: "프로필 수정",  ...defaultScreenOptions}}/>
      <HomeStack.Screen name="readIntroArticle" component={readIntroArticle} options={{title: "말머리에서",  ...defaultScreenOptions}}/>
      <HomeStack.Screen
       name="EditBook" 
       component={EditBook.component}
       options={{...EditBook.options, ...defaultScreenOptions}}
       />
      <HomeStack.Screen name="EditIntroArticle" component={EditIntroArticle}options={{title: "말머리에서 수정",  ...defaultScreenOptions}}/>
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
        options={{title: "게시판 글쓰기",  ...defaultScreenOptions}}
        />
      <CommunityStack.Screen 
        name="readPost" 
        component={readPost.component}
        options={{...readPost.options, ...defaultScreenOptions, title:"게시판"}}        />
      <CommunityStack.Screen 
        name="editPost" 
        component={editPost}
        options={{title: "게시판 글 수정하기",  ...defaultScreenOptions}}

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
          showLabel: false}}
        screenOptions={
          ({route})=> ({
              tabBarIcon: ({focused,color,size})=> {
                  let iconName;
                  let screen1 = route.name;
                  let screen2;

                  if(route.name==="MainStackScreen"){
                      iconName="book";
                      screen2="Main";
                  } else if (route.name=="HomeStackScreen"){
                    iconName="person-outline";
                    screen2="MyPage";
                  } else if (route.name=="CommunityStackScreen"){
                    iconName="person-outline";
                    screen2="communityBoard";
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