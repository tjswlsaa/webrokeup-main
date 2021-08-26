import React, { useState, useRef,useEffect } from 'react';
import { SafeAreaView, View, Alert, ScrollView, StyleSheet, ImageBackground, Text, TouchableOpacity, TextInput,Dimensions,KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import { CommonActions } from '@react-navigation/native';
import paper from '../../assets/paper.png';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { Switch } from 'react-native-switch';


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

const test7 ={
  chColor: ""
}
const test8 ={
  isPublic: ""
}


const NewPage = ({ navigation, route }) => {

  const { bookKey } = route.params;
  test2.bookKey=bookKey;
  console.log("bookKeynewpage",bookKey)

  const firstColor= "#9E001C"
  const secondColor="#F6AE2D"
  const thirdColor = "#33658A"
  const fourthColor= "#494949"


function colorAis(bookKey) {
  if (bookKey.indexOf('1') == 0){
  return "#9E001C"
  }
  else if (bookKey.indexOf('2') == 0){
  return "#F6AE2D"
  }
  else if (bookKey.indexOf('3') == 0){
  return "#33658A"
  }
  else if (bookKey.indexOf('4') == 0){
  return "#494949"
  }
}
const colorA = colorAis(bookKey);

function colorBis(bookKey) {
  if (bookKey.indexOf('1') == 0){
  return "#E73F34"
  }
  else if (bookKey.indexOf('2') == 0){
  return "#DFB82C"
  }
  else if (bookKey.indexOf('3') == 0){
  return "#78CCD1"
  }
  else if (bookKey.indexOf('4') == 0){
  return "#161616"
  }
}
const colorB = colorBis(bookKey);

function colorCis(bookKey) {
  if (bookKey.indexOf('1') == 0){
  return "#F01D0F"
  }
  else if (bookKey.indexOf('2') == 0){
  return "#E8D60C"
  }
  else if (bookKey.indexOf('3') == 0){
  return "#24A9E2" 
  }
  else if (bookKey.indexOf('4') == 0){
  return "#625E5E"
  }
}
const colorC = colorCis(bookKey);

function colorDis(bookKey) {
  if (bookKey.indexOf('1') == 0){
  return "#623734"
  }
  else if (bookKey.indexOf('2') == 0){
  return "#FFDD00"
  }
  else if (bookKey.indexOf('3') == 0){
  return "#4581F5" 
  }
  else if (bookKey.indexOf('4') == 0){
  return "#929292"
  }
}
const colorD = colorDis(bookKey);

function colorEis(bookKey) {
  if (bookKey.indexOf('1') == 0){
  return "#4A130E"
  }
  else if (bookKey.indexOf('2') == 0){
  return "#FFF848"
  }
  else if (bookKey.indexOf('3') == 0){
  return "#3624A5" 
  }
  else if (bookKey.indexOf('4') == 0){
  return "#C8C8C8"
  }
}
const colorE = colorEis(bookKey);

function colorFis(bookKey) {
  if (bookKey.indexOf('1') == 0){
  return "#EE8D8D"
  }
  else if (bookKey.indexOf('2') == 0){
  return "#F2EDC0"
  }
  else if (bookKey.indexOf('3') == 0){
  return "#342D65" 
  }
  else if (bookKey.indexOf('4') == 0){
  return "#ECECEC"
  }
}
const colorF = colorFis(bookKey);

  test1.navigation=navigation

  const [CountChapter,setCountChapter]=useState("")

  useEffect (()=>{
    let arr = firebase_db.ref(`book/${bookKey}/` + '/both/')
    .on('value', (snapshot) => {
       var CountChapter = snapshot.numChildren();
       setCountChapter(CountChapter)
    })
}, [])

  const title_a = useRef(null);
  const maintext_a = useRef(null);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [chapterColor, setChapterColor] = useState(colorA)

  const headerHeight = useHeaderHeight();
  const ScreenHeight = Dimensions.get('window').height   //height
  const statusBarHeight = getStatusBarHeight();
  const BottomSpace = getBottomSpace();
  const realScreen = ScreenHeight-headerHeight-BottomSpace
  const [isPublic, setPublic] = useState(true);
  test8.isPublic = isPublic
  var user = firebase.auth().currentUser;
  var user_uid
  if (user != null) {
    user_uid = user.uid;
  }
  test6.user_uid=user_uid
 // console.log('findsuer',user_uid)
  // const chapterKey = Math.random().toString().replace(".", "");
  //bookKey가 애초에 5자리+000으로끝나고 숫자로 바꿔서 CountChapter+1하면되네 
  //만약 챕터가 0개라면 고정으로 bookKey+"001"
  //1개 이상이면 bookKey

  const numBookKey= Number(bookKey)
  const numCountChapter= Number(CountChapter)
  const chapterKey= (numBookKey+numCountChapter+1)
  // const chapterKey = bookKey+(CountChapter+1)
  // console.log("11bookKey Newpage", bookKey)
  // console.log("22newpagechapterKey",chapterKey)

  test3.chapterKey=chapterKey

  const chapterTitle = text1;
  test4.chapterTitle=chapterTitle

  const mainText = text2;
  test5.mainText=mainText

  const chColor = chapterColor;
  test7.chColor = chColor

 // console.log('이거썌거',chapterKey)



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior ="padding" style={{flex:1}}>
      <StatusBar style="white" />
        {/* <ImageBackground style={{height: "100%", resizeMode: "cover",}} source={{ uri: bookBackground }} > */}
          <View style={{height: "80%", width: "90%", alignSelf: "center", marginTop: "5%", backgroundColor: "#fff"}}>
            {/* <ImageBackground style={{height: "100%", resizeMode: "cover",}} source={paper} > */}
              <ScrollView scrollEnabled={true}>
                <View style={{ alignSelf: "flex-end", marginRight: "6%", marginTop: "5%"}}>
                  <Switch
                    value={isPublic}
                    // useNativeDriver={true}
                    activeText={'공개'}
                    inActiveText={'비공개'}
                    onValueChange={(value) => setPublic(value)}
                    backgroundActive={'#C4C4C4'}
                    backgroundInactive={chColor}
                    circleSize={25} //사이즈 조정이 안댐
                    barHeight={25}
                    barWidth={30}

                    circleActiveColor={chColor}
                    circleInActiveColor={'#f5f5f5'}
                  />

                  
                </View>
                <View style={{ height: realScreen*0.08, flexDirection: "row", marginHorizontal: "10%", marginTop: "10%"}}>
                  <View style={{flex: 1, backgroundColor: chapterColor, marginRight: "5%", marginBottom: "5%"}} /> 
                  <TextInput style={{ flex: 15, fontSize: 20, fontWeight: "600" }}
                    multiline={true} placeholder="감정을 한 단어로 적어주세요"
                    returnKeyType="done"
                    onChangeText={text1 => setText1(text1)}
                    ref={title_a} />
                </View>
                <TextInput style={{ marginHorizontal: "10%", fontSize: 15 }}
                  multiline={true} placeholder="어떤 일이 있었는지 적어주세요"
                  returnKeyType="done"
                  onChangeText={text2 => setText2(text2)}
                  ref={maintext_a} />
              </ScrollView>
            {/* </ImageBackground> */}
          </View>
          <View style={{backgroundColor: "#fff", height: "15%", marginHorizontal: "5%", marginTop: "3%" }}>
            <Text style={{marginTop: "5%", marginLeft: "5%"}}> 오늘의 감정 빛깔은 </Text>
            <View style={{flex: 1, flexDirection: "row", marginHorizontal: "5%", marginVertical: "3%"}}>
              <TouchableOpacity style={{flex: 1, backgroundColor:colorA}} onPress={()=>setChapterColor(colorA)}/>
              <TouchableOpacity style={{flex: 1, backgroundColor: colorB}} onPress={()=>setChapterColor(colorB)}/>
              <TouchableOpacity style={{flex: 1, backgroundColor: colorC}} onPress={()=>setChapterColor(colorC)}/>
              <TouchableOpacity style={{flex: 1, backgroundColor: colorD}} onPress={()=>setChapterColor(colorD)}/>
              <TouchableOpacity style={{flex: 1, backgroundColor: colorE}} onPress={()=>setChapterColor(colorE)}/>
              <TouchableOpacity style={{flex: 1, backgroundColor: colorF}} onPress={()=>setChapterColor(colorF)}/>
            </View>
          </View>
        {/* </ImageBackground> */}
        </KeyboardAvoidingView>
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

async function savePage() {

  const {navigation}=test1
  const {bookKey}=test2
  const {chapterKey}= test3
  const {chapterTitle}=test4
  const {mainText}=test5
  const {user_uid}=test6
  const {chColor}=test7
  const {isPublic}=test8

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
    bookKey:bookKey,
    isPublic:isPublic,
    type:"감정 일기"
  });

  firebase_db
  .ref(`/book/${bookKey}/both/` + chapterKey)
  .set({
    chapterKey: chapterKey,
    chapterTitle: chapterTitle,
    mainText: mainText,
    regdate: new Date().toString(),
    likeCount: 0,
    Kregdate: moment(new Date()).format('YYYY년 MM월 DD일'),
    creator: user_uid,
    bookKey:bookKey,
    type:"감정 일기",
    chColor: chColor,
    isPublic:isPublic,

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
    <TouchableOpacity onPress={savePage}>
      <Text style={{ fontSize: 15, fontWeight: "600" }}> 완료 </Text>
    </TouchableOpacity>
  //   <Icon.Button name='save' size={25}
  //   backgroundColor= 'white' color="black" 
  //   onPress={savePage}
    
  //   >
  // </Icon.Button>

  );
}
const options = {
  headerRight,
};

export default {
  component: NewPage,
  options,
};