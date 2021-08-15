import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Alert, Button, FlatList, ScrollView, StyleSheet, ImageBackground, KeyboardAvoidingView, Text, TouchableOpacity, TextInput, TouchableOpacityBase } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import paper from '../../assets/paper.png';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';

const test2 ={
  text:""
}

const test1 ={
  navigation:""
}
const test3 ={
  user_uid:""
}
const communityMakeNewPost = ({ navigation, route }) => {
  test1.navigation=navigation

    const book = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTk0/MDAxNjIzMDY3OTkzMTYz.Uyg7r1zEBbPKA-CfVHU0R5ojbmozb02GJzMRapgcP1cg.flIv0UKSYHpE_CHNSOi2huGzv3svilsmEmMFy1G9zH0g.PNG.asj0611/book.png?type=w773"
    const bookBackground = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTE1/MDAxNjIzMDY2NDQwOTUx.N4v5uCLTMbsT_2K1wPR0sBPZRX3AoDXjBCUKFKkiC0gg.BXjLzL7CoF2W39CT8NaYTRvMCD2feaVCy_2EWOTkMZsg.PNG.asj0611/bookBackground.png?type=w773"
  const [text, setText] = useState('');
  test2.text=text

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

      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground style={styles.bookBackgroundImage} source={{ uri: bookBackground }} >

          <View style={styles.bookContainer}>
            <ImageBackground style={styles.bookImage} source={paper} >
              <ScrollView scrollEnabled={false}>
                <View style={{ flexDirection: 'row', padding: 10, marginTop: 70 }}>
                  <TextInput style={{ backgroundColor: 'rgba(52,52,52,0)', padding: 30, flex: 1, flexShrink: 1, fontSize: 17 }}
                    multiline={true} placeholder="글을 적어주세요"
                    returnKeyType="done"
                    onChangeText={text => setText(text)}
                     />
                </View>
             </ScrollView>
            </ImageBackground>
          </View>
        </ImageBackground>
      </SafeAreaView>
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

  firebase_db
  .ref(`/post/${postKey}/`)
  .set({
    creator:user_uid,
    postKey: postKey,
    text: text,
    regdate: regdate,
    Kregdate:Kregdate,
  
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

  
  navigation.navigate("readPost", { postKey: postKey, text:text, regdate:regdate, Kregdate:Kregdate})
  //title_a.current.clear();
  //maintext_a.current.clear();  

}

function headerRight() {
  return (

    <Icon.Button name='save' size={25}
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



