import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Alert, Button, FlatList, ScrollView, StyleSheet, ImageBackground, KeyboardAvoidingView, Text, TouchableOpacity, TextInput, TouchableOpacityBase } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import Constants from 'expo-constants';
import paper from '../../assets/paper.png';
const book = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTk0/MDAxNjIzMDY3OTkzMTYz.Uyg7r1zEBbPKA-CfVHU0R5ojbmozb02GJzMRapgcP1cg.flIv0UKSYHpE_CHNSOi2huGzv3svilsmEmMFy1G9zH0g.PNG.asj0611/book.png?type=w773"
const bookBackground = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTE1/MDAxNjIzMDY2NDQwOTUx.N4v5uCLTMbsT_2K1wPR0sBPZRX3AoDXjBCUKFKkiC0gg.BXjLzL7CoF2W39CT8NaYTRvMCD2feaVCy_2EWOTkMZsg.PNG.asj0611/bookBackground.png?type=w773"
const NewPage = ({ navigation, route }) => {
  const user_id = Constants.installationId;
  const title_a = useRef(null);
  const maintext_a = useRef(null);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const { bookKey } = route.params;
  var user = firebase.auth().currentUser;
  var user_uid
  if (user != null) {
    user_uid = user.uid;
  }
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground style={styles.bookBackgroundImage} source={{ uri: bookBackground }} >
          <TouchableOpacity style={styles.saveButton} onPress={() => {
            var chapterKey = Math.random().toString().replace(".", "");
            var chapterTitle = text1;
            var mainText = text2;
            firebase_db
              .ref(`/book/${bookKey}/chapters/` + chapterKey)
              .set({
                chapterKey: chapterKey,
                chapterTitle: chapterTitle,
                mainText: mainText,
                regdate: new Date().toString(),
                likeCount: 0
              });
            Alert.alert("집필 완료")
            navigation.navigate("highlight", { bookKey: bookKey })
            //title_a.current.clear();
            //maintext_a.current.clear();  
          }}>
            <Text style={styles.saveButtonText}> 저장하기</Text>
          </TouchableOpacity>
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
export default NewPage;