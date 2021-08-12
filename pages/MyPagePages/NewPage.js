import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Alert, ScrollView, StyleSheet, ImageBackground, Text, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import { CommonActions } from '@react-navigation/native';
import paper from '../../assets/paper.png';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

const book = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTk0/MDAxNjIzMDY3OTkzMTYz.Uyg7r1zEBbPKA-CfVHU0R5ojbmozb02GJzMRapgcP1cg.flIv0UKSYHpE_CHNSOi2huGzv3svilsmEmMFy1G9zH0g.PNG.asj0611/book.png?type=w773"
const bookBackground = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTE1/MDAxNjIzMDY2NDQwOTUx.N4v5uCLTMbsT_2K1wPR0sBPZRX3AoDXjBCUKFKkiC0gg.BXjLzL7CoF2W39CT8NaYTRvMCD2feaVCy_2EWOTkMZsg.PNG.asj0611/bookBackground.png?type=w773"



const test1 = {
  navigation:""
}

const test2 ={
  bookKey:""
}

const test3 ={
  chapterKey:""
}
const test4 = {
  chapterTitle:""
}

const test5 ={
  mainText:""
}

const test6 ={
  user_uid:""
}
const NewPage = ({ navigation, route }) => {

  test1.navigation=navigation

  const title_a = useRef(null);
  const maintext_a = useRef(null);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const { bookKey } = route.params;
  test2.bookKey=bookKey

  var user = firebase.auth().currentUser;
  var user_uid
  if (user != null) {
    user_uid = user.uid;
  }
  test6.user_uid=user_uid
 // console.log('findsuer',user_uid)
  const chapterKey = Math.random().toString().replace(".", "");
  test3.chapterKey=chapterKey

  const chapterTitle = text1;
  test4.chapterTitle=chapterTitle


  const mainText = text2;
  test5.mainText=mainText

 // console.log('이거썌거',chapterKey)
  console.log("bookKey Newpage", bookKey)



  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground style={styles.bookBackgroundImage} source={{ uri: bookBackground }} >
 
          <View style={styles.bookContainer}>
            <ImageBackground style={styles.bookImage} source={paper} >
              <ScrollView scrollEnabled={false}>
                <View style={{ flexDirection: 'row', padding: 10, marginTop: 70 }}>
                  <TextInput style={{ backgroundColor: 'rgba(52,52,52,0)', padding: 30, flex: 1, flexShrink: 1, fontSize: 17 }}
                    multiline={true} placeholder="제목을 입력하세요"
                    returnKeyType="done"
                    onChangeText={text1 => setText1(text1)}
                    ref={title_a} />
                </View>
                <TextInput style={{ backgroundColor: 'rgba(52,52,52,0)', flex: 1, padding: 40, flexShrink: 1, fontSize: 17 }}
                  multiline={true} placeholder="본문을 입력하세요"
                  returnKeyType="done"
                  onChangeText={text2 => setText2(text2)}
                  ref={maintext_a} />
              </ScrollView>
            </ImageBackground>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
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

async function savePage() {

  const {navigation}=test1
  const {bookKey}=test2
  const {chapterKey}= test3
  const {chapterTitle}=test4
  const {mainText}=test5
  const {user_uid}=test6
  firebase_db
  .ref(`/book/${bookKey}/chapters/` + chapterKey)
  .set({
    chapterKey: chapterKey,
    chapterTitle: chapterTitle,
    mainText: mainText,
    regdate: new Date().toString(),
    likeCount: 0,
    Kregdate: moment(new Date()).format('YYYY년 MM월 DD일'),
    creator: user_uid,
    bookKey:bookKey
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


navigation.navigate("MyArticle", { bookKey: bookKey, chapterKey: chapterKey})
}


function headerRight() {
  return (

    <Icon.Button name='save' size={25}
    backgroundColor= 'white' color="black" 
    onPress={savePage}
    
    >
  </Icon.Button>

  );
}
const options = {
  headerRight,
};

export default {
  component: NewPage,
  options,
};