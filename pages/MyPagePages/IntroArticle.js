import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Image, TouchableOpacity, ScrollView, Touchable, Alert, SafeAreaView } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { firebase_db } from '../../firebaseConfig';
import firebase from 'firebase/app';
import Icon from 'react-native-vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';


const test1 = {
  bookKey: ""
}

const test2 = {
  text: ""
}

const test3 = {
  navigation: ""
}
const IntroArticle = ({ navigation, route }) => {
  test3.navigation = navigation
  const introArticle_a = useRef(null);
  const [text, setText] = useState('');
  test2.text = text
  const [data, setData] = useState('');
  const { bookKey } = route.params;
  test1.bookKey = bookKey

  
  const headerHeight = useHeaderHeight();
  const ScreenHeight = Dimensions.get('window').height   //height
  const BottomSpace = getBottomSpace()
  const statusBarHeight = getStatusBarHeight();
  const realScreen = ScreenHeight-headerHeight-BottomSpace

  // const saveIntroArticle = async() => {
  //   let introKey = "intro";
  //   var introArticle = text;
  //   firebase_db
  //   .ref( `/book/${bookKey}/`+ introKey)
  //   .set(introArticle)
  //   Alert.alert("저장 완료!")

  //   navigation.dispatch(state => {
  //     const routes = [...state.routes];
  //     routes.pop();

  //     return CommonActions.reset({
  //       ...state,
  //       routes,
  //       index: routes.length - 1,
  //     });
  //   });
  //   navigation.navigate("NewPage", {bookKey:bookKey})
  // }

  useEffect(() => {
    // console.log("말머리 생성 완료")
    var changeDataRef = firebase.database().ref(`book/${bookKey}/`);
    changeDataRef.on("value", (snapshot) => {
      // console.log(snapshot)
      const tmp = [];
      snapshot.forEach((child) => {
        tmp.unshift({
          introKey: child.introKey,
          introArticle: child.val().introArticle
        })
      })
      // console.log(tmp);
      setData(tmp);
    })
  }, [])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="padding"
        style={{ flex: 1 }}>
        <View style={{ backgroundColor: "#F5F4F4", flex: 1}}>
          <StatusBar style="white" />
          <View style={{height: "96%", width: "90%", alignSelf: "center", marginTop: "5%", backgroundColor: "#fff"}}>
            <View style={{height: realScreen*0.08, marginHorizontal: "10%", marginTop: "20%"}}>
              <Text style={{ fontSize: 20, fontWeight: "600"}}>말머리에서</Text>
            </View>
            <ScrollView style={{ marginHorizontal: "10%"}}>
              <TextInput 
                style={{fontSize: 15}}
                multiline={true}
                placeholder="내용을 입력하세요"
                returnKeyType="done"
                onChangeText={text => setText(text)}
                ref={introArticle_a}
                >
              </TextInput>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView >
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    backgroundColor: "#F5F4F4",
    flex: 1
  },
  upperButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: "15%",
    marginRight: "10%"
  },
  editButton: {
  },
  deleteButton: {
    marginLeft: "7%"
  },
  textContainer: {
    height: "50%"
  },
  bookTitle: {
    fontSize: 20,
    marginLeft: "5%"
  },
  bookText: {
    marginTop: "20%",
    marginLeft: "10%",
    marginRight: "10%",
  },
  bottomButtonContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: "15%",
    marginRight: "10%"
  },
  commentButton: {
    marginLeft: "7%"
  },
  likeButton: {
    marginLeft: "10%"
  }
});


async function saveChapter() {

  console.log("savecahptweintro")
  const { navigation } = test3
  const { bookKey } = test1;
  const { text } = test2;
  console.log("text", text)
  // const navigation = useNavigation();

  console.log("savecahptweintro2")

  let introKey = "intro";
  var introArticle = text;
  firebase_db
    .ref(`/book/${bookKey}/` + introKey)
    .set(introArticle)
  Alert.alert("저장 완료!")

  console.log("savecahptweintro3")

  navigation.dispatch(state => {
    const routes = [...state.routes];
    routes.pop();

    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });
  });

  navigation.navigate("NewPage", { bookKey: bookKey })

  console.log("savecahptweintro4")


}

function headerRight() {
  return (

    <TouchableOpacity onPress={saveChapter}>
      <Text style={{ fontSize: 15, fontWeight: "600" }}> 다음 </Text>
    </TouchableOpacity>

    // <Icon.Button name='save' size={25}
    // backgroundColor= 'white' color="black" 
    // onPress={saveChapter}
    // >
    // </Icon.Button>

  );
}
const options = {
  headerRight,
};

export default {
  component: IntroArticle,
  options,
};