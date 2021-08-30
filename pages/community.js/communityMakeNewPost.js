import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Alert, Button,Dimensions,Keyboard,TouchableWithoutFeedback, FlatList, ScrollView, StyleSheet, ImageBackground, KeyboardAvoidingView, Text, TouchableOpacity, TextInput, TouchableOpacityBase } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import paper from '../../assets/paper.png';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const test2 ={
  text:""
}
const test4 ={
  title:""
}

const test1 ={
  navigation:""
}
const test3 ={
  user_uid:""
}
const communityMakeNewPost = ({ navigation, route }) => {
  test1.navigation=navigation

  const headerHeight = useHeaderHeight();
  const ScreenWidth = Dimensions.get('window').width  //screen 너비
  const ScreenHeight = Dimensions.get('window').height   //height
  const BottomSpace = getBottomSpace()
  const tabBarHeight = 0;
  const statusBarHeight = getStatusBarHeight()
  const realScreen = ScreenHeight - headerHeight - BottomSpace - tabBarHeight

  const [text, setText] = useState('');
  test2.text=text
  const [title, setTitle] = useState('');
  test4.title=title

  var user = firebase.auth().currentUser;
  var user_uid
  if (user != null) {
    user_uid = user.uid;
  }
  test3.user_uid=user_uid;
  const [userinfo, setUserinfo] = useState([]);

  useEffect(()=>{
    firebase_db.ref(`users/${user_uid}`)
        .on('value', (snapshot) => {
            let userinfo = snapshot.val();
            setUserinfo(userinfo);
        })
}, []);

console.log(userinfo)



  return (
    <KeyboardAwareScrollView
    
    extraHeight={0}
    scrollEnabled={true}
    enableAutomaticScroll={true}
    // contentContainerStyle={{height:-30}}
    resetScrollToCoords={{ x: 0, y: 0 }}
    // contentContainerStyle ={{height:realScreen}}
    >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <SafeAreaView style={{ flex: 1 }}>

          <View style={{flex:1}}>
                   <View style={{ backgroundColor:'white', height:realScreen*0.1, marginTop:"5%", marginHorizontal:"5%",borderRadius:15}}>

                    <TextInput style={{ backgroundColor: 'rgba(52,52,52,0)',  fontSize: 17,height:realScreen*0.05, marginTop:"4%", marginLeft:"10%",lineHeight:23}}
                      multiline={false} placeholder="제목을 적어주세요"
                      returnKeyType="done"
                      onChangeText={title => setTitle(title)}
                      />

                    </View>
                    <View style={{  padding: 10, backgroundColor:'white', height:realScreen*0.8, marginVertical:"5%", marginHorizontal:"5%",borderRadius:15 }}>

                  <TextInput style={{ backgroundColor: 'rgba(52,52,52,0)', padding: 30, flex: 1, fontSize: 17, marginTop:"10%", lineHeight:23}}
                    multiline={true} placeholder="글을 적어주세요"
                    returnKeyType="done"
                    onChangeText={text => setText(text)}
                     />

                </View>
          </View>
      </SafeAreaView>
      </TouchableWithoutFeedback>

          </KeyboardAwareScrollView>

  )
}
const styles = StyleSheet.create({
  bookBackgroundImage: {
    height: "100%",
    resizeMode: "cover",
  },
  bookContainer: {
    marginTop: "2%",
    marginRight: "6%",
    marginLeft: "6%",
    height: "98%",
  },
  bookImage: {
    height: "100%",
    resizeMode: "cover",
  },
  saveButton: {
    height: "4%",
    width: "22.67%",
    backgroundColor: "#C4C4C4",
    borderRadius: 5,
    marginTop: "6%",
    marginRight: "6%",
    alignSelf: "flex-end",
    justifyContent: "center"
  },
  saveButtonText: {
    marginLeft: "15%",
    fontSize: 14,
  }
})


async function saveChapter() {
  const postKey = Math.random().toString().replace(".", "");
  const regdate=  new Date().toString()
  const Kregdate= moment(new Date()).format('YYYY년 MM월 DD일') 

  const {navigation} =test1
  const {text}= test2;
  const {user_uid}=test3;
  const {title}=test4;

    if (title == ""){
      Alert.alert("제목을 입력해주세요");
      return;
    }

    if (text == ""){
      Alert.alert("글을 입력해주세요");
      return;
    }

 
  firebase_db
  .ref(`/post/${postKey}/`)
  .set({
    creator:user_uid,
    postKey: postKey,
    text: text,
    regdate: regdate,
    Kregdate:Kregdate,
    title: title,

  });
  Alert.alert("집필 완료")

  navigation.dispatch(state => {
    const routes = [...state.routes];
    routes.pop();
  
    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });
  });

  
  navigation.navigate("readPost", { postKey: postKey, text:text, regdate:regdate, Kregdate:Kregdate, postcreator:user_uid, title:title})
  //title_a.current.clear();
  //maintext_a.current.clear();  

}

function headerRight() {
  return (

    <Icon.Button name='checkmark-sharp' size={25}
    backgroundColor= 'white' color="black" 
    onPress={saveChapter}
    
    >
  </Icon.Button>

  );
}
const options = {
  headerRight,
};

export default {
  component: communityMakeNewPost,
  options,
};



