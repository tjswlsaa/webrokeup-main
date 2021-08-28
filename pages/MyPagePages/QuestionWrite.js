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
  text1:""
}

const test5 ={
  text2:""
}

const test6 ={
  user_uid:""
}
const test7 = {
    text3:""
  }
  
  const test8 ={
    text4:""
  }
  const test9 ={
    Color:""
  }
  const test10 ={
    questionsKey:""
  }
  const test11 ={
    question:""
  }
  const test12 ={
    isPublic: ""
  }
  const test13 ={
    chColor: ""
  }
const QuestionWrite = ({ navigation, route }) => {
    const { questionsKey } = route.params;
    test10.questionsKey=questionsKey

    const [isPublic, setPublic] = useState(true);
    test12.isPublic = isPublic
// questionkey로 색깔 구하기
function getColor(questionsKey) {
    if (questionsKey.indexOf('r') == 0){
    return "firstColor"
    }
    else if (questionsKey.indexOf('y') == 0){
    return "secondColor"
    }
    else if (questionsKey.indexOf('B') == 0){
    return "thirdColor"
    }
    else if (questionsKey.indexOf('b') == 0){
    return "fourthColor"
    }
}
const Color = getColor(questionsKey);
const colorQuestion = Color+"Questions"

console.log("mybook Color", Color)
test9.Color=Color
// const firstColor= "#9E001C"
// const secondColor="#F6AE2D"
// const thirdColor = "#33658A"
// const fourthColor= "#494949"

function titleColoris(Color) {
    if (Color == "firstColor"){
    return "#9E001C"
    }
    else if (Color == "secondColor"){
    return "#F6AE2D"
    }
    else if (Color == "thirdColor"){
    return "#33658A"
    }
    else if (Color == "fourthColor"){
    return "#494949"
    }
}
const titleColor = titleColoris(Color);
console.log("titleColor",titleColor)


//questionkey로 bookKey구하기
    var user = firebase.auth().currentUser;
    var user_uid
    if (user != null) {
      user_uid = user.uid;
    }
    test6.user_uid=user_uid

    
    const [bookKey, setBookKey] = useState([]);
    test2.bookKey=bookKey;

    useEffect(()=>{
        firebase_db.ref(`users/${user_uid}/myBooks/${Color}`)
            .on('value',(snapshot)=>{
                let bookKey = snapshot.val();
                if (bookKey>""){
                    setBookKey(bookKey)
                }
                })
            },[])

    console.log("getColorcolorBookList",bookKey)

    const [CountChapter,setCountChapter]=useState("")

    useEffect (()=>{
      let arr = firebase_db.ref(`book/${bookKey}/` + '/both/')
      .on('value', (snapshot) => {
         var CountChapter = snapshot.numChildren();
         setCountChapter(CountChapter)
      })
  }, [CountChapter])
  
console.log("CountChapterquestionwriting",CountChapter)
  test1.navigation=navigation






const [question, setQuestion] = useState([]);
useEffect(()=>{
  firebase_db.ref(`questions/${colorQuestion}/`+questionsKey)
  .on('value', (snapshot)=>{
        const question = snapshot. val()

        setQuestion(question)
    })
},[])
console.log("Newpage question",question)
test11.question=question

  const title_a = useRef(null);
  const maintext_a = useRef(null);
  const [text1, setText1] = useState('');
  test4.text1=text1
  console.log("text1111",text1)
  const [text2, setText2] = useState('');
  test5.text2=text2
  const [text3, setText3] = useState('');
  test7.text3=text3
  const [text4, setText4] = useState('');
  test8.text4=text4


  const headerHeight = useHeaderHeight();
  const ScreenHeight = Dimensions.get('window').height   //height
  const statusBarHeight = getStatusBarHeight();
  const BottomSpace = getBottomSpace();
  const realScreen = ScreenHeight-headerHeight-BottomSpace


 // console.log('findsuer',user_uid)
  // const chapterKey = Math.random().toString().replace(".", "");
  //bookKey가 애초에 5자리+000으로끝나고 숫자로 바꿔서 CountChapter+1하면되네 
  //만약 챕터가 0개라면 고정으로 bookKey+"001"
  //1개 이상이면 bookKey

  const numBookKey= Number(bookKey)
  const numCountChapter= Number(CountChapter)
  const chapterKey= (numBookKey+numCountChapter+1)
  // const chapterKey = bookKey+(CountChapter+1)
  console.log("11bookKey Newpage", bookKey)

  console.log("22newpagechapterKey",chapterKey)


  test3.chapterKey=chapterKey

  const [index, setIndex] = useState(0);
    console.log("index1111",index)

 // console.log('이거썌거',chapterKey)
  function colordefaultis(bookKey) {
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
  const colordefault = colordefaultis(bookKey);

function colorAis(bookKey) {
  if (bookKey.indexOf('1') == 0){
  return "#FFD2CF"
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
  return "#FB8A8A"
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
  return "#FF3225"
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
  return "#D40D12"
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
  return "#9E001C"
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
  return "#4A130E"
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
const [chapterColor, setChapterColor] = useState(titleColor)

 const chColor = chapterColor;
 test13.chColor = chColor

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior ="padding" style={{flex:1}}>
      <StatusBar style="white" />
        {/* <ImageBackground style={{height: "100%", resizeMode: "cover",}} source={{ uri: bookBackground }} > */}
            {/* <ImageBackground style={{height: "100%", resizeMode: "cover",}} source={paper} > */}
              <ScrollView style={{backgroundColor:"white", marginHorizontal:"5%", marginTop:"5%"}} scrollEnabled={true}>
              <View style={{ alignSelf: "flex-end", marginRight:"10%", marginTop:"5%",}}>
                            <Switch
                              value={isPublic}
                              // useNativeDriver={true}
                              activeText={'공개'}
                              inActiveText={'비공개'}
                              onValueChange={(value) => setPublic(value)}
                              backgroundActive={'#C4C4C4'}
                              backgroundInactive={chapterColor}
                              circleSize={25} //사이즈 조정이 안댐
                              barHeight={25}
                              barWidth={30}

                              circleActiveColor={chapterColor}
                              circleInActiveColor={'#f5f5f5'}
                            />
                        </View>
                <View style={{flex:1, flexDirection:"row", alignItems:"center",  height: realScreen*0.15, marginHorizontal:"5%"}}>

                       
                        <View style={{flex:1,backgroundColor:chapterColor,  height: realScreen*0.08, width: realScreen*0.05,}}>
                        </View>
                        <View style={{ flex:15, height: realScreen*0.08, justifyContent:"center", width:"100%"}}>
                
                            <TextInput style={{ fontSize: 20, fontWeight: "600", marginHorizontal: "2%", }}
                                multiline={false} placeholder={question.title}
                                returnKeyType="done"
                                maxLength={17}
                                onChangeText={text1 => setText1(text1)}
                                // ref={title_a} 
                                />
                        </View>
                    
                </View>
                <View style={{marginHorizontal: "10%",  marginBottom:realScreen*0.03 }}>
                    <Text style={{fontSize: 15}}>{question.intro}</Text>
                </View>  
                <View style={{ height: realScreen*0.08 , justifyContent:"center"}}>
                    <Text style={{marginHorizontal: "10%", fontSize: 18,}}>{question.Q1}</Text>
                </View>  
                <TextInput style={{ marginHorizontal: "10%", fontSize: 15, height:realScreen*0.2, marginTop:"3%", marginBottom:"3%"  }}
                  multiline={true} placeholder="답변을 입력하세요"
                  returnKeyType="done"
                  onChangeText={text2 => setText2(text2)}
                   />
                <View style={{height: realScreen*0.08 , justifyContent:"center"}}>
                    <Text style={{marginHorizontal: "10%", fontSize: 18,}}>{question.Q2}</Text>
                </View>  
                <TextInput style={{ marginHorizontal: "10%", fontSize: 15, height:realScreen*0.2, marginTop:"3%", marginBottom:"3%"  }}
                  multiline={true} placeholder="답변을 입력하세요"
                  returnKeyType="done"
                  onChangeText={text3 => setText3(text3)}
                  />
                <View style={{height: realScreen*0.08 , justifyContent:"center"}}>
                    <Text style={{marginHorizontal: "10%", fontSize: 18,}}>{question.Q3}</Text>
                </View>  
                <TextInput style={{ marginHorizontal: "10%", fontSize: 15, height:realScreen*0.2, marginTop:"3%", marginBottom:"3%"  }}
                  multiline={true} placeholder="답변을 입력하세요"
                  returnKeyType="done"
                  onChangeText={text4 => setText4(text4)}
                  />
                <View style={{ height: realScreen*0.08 , justifyContent:"center"}}>
                </View>  
                <View style={{ marginHorizontal: "5%"}}>
                <Text style={{marginTop: "5%", }}> 오늘의 감정 빛깔은 </Text>
                </View>
                <View style={{  fontSize: 15, height:realScreen*0.1, marginTop:"3%", marginBottom:"3%", flexDirection:"row" , alignSelf:"center",  }}>
                      <View style={{flex: 1, flexDirection: "row", marginHorizontal: "5%", marginVertical: "3%"}}>
                            <TouchableOpacity style={{flex: 1, backgroundColor:colorA}} onPress={()=>setChapterColor(colorA)}/>
                            <TouchableOpacity style={{flex: 1, backgroundColor: colorB}} onPress={()=>setChapterColor(colorB)}/>
                            <TouchableOpacity style={{flex: 1, backgroundColor: colorC}} onPress={()=>setChapterColor(colorC)}/>
                            <TouchableOpacity style={{flex: 1, backgroundColor: colorD}} onPress={()=>setChapterColor(colorD)}/>
                            <TouchableOpacity style={{flex: 1, backgroundColor: colorE}} onPress={()=>setChapterColor(colorE)}/>
                            <TouchableOpacity style={{flex: 1, backgroundColor: colorF}} onPress={()=>setChapterColor(colorF)}/>
                      </View>
                </View>
              </ScrollView>
            {/* </ImageBackground> */}
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
  const {text1}=test4
  const {text2}=test5
  const {user_uid}=test6
  const {text3}=test7
  const {text4}=test8
  const {Color}=test9
  const {questionsKey}=test10
  const {question}=test11
  const {isPublic}=test12
  const {chColor}=test13

  console.log("text1",text1)
  console.log("text12",text2)
  console.log("text13",text3)
  console.log("text14",text4)
  console.log("chapterKey",chapterKey)
  console.log("bookKey",bookKey)
  console.log("user_uid",user_uid)
  console.log("Color",Color)
  const colorAnswers = Color+"Answers"
  console.log("chapterKeychapterKey",chapterKey)
  firebase_db
  .ref(`/book/${bookKey}/both/` + chapterKey)
  .set({
    chapterKey: chapterKey,
    regdate: new Date().toString(),
    likeCount: 0,
    commentsCount: 0,
    Kregdate: moment(new Date()).format('YYYY년 MM월 DD일'),
    creator: user_uid,
    bookKey:bookKey,
    chapterTitle:text1,
    mainText:text2,
    text3:text3,
    text4:text4,
    Q1:question.Q1,
    Q2:question.Q2,
    Q3:question.Q3,
    intro:question.intro,
    type:"감정 질문지",
    color:Color,
    isPublic:isPublic,
    chColor:chColor,
    questionsKey:questionsKey

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

    // <TouchableOpacity onPress={savePage}>
    //   <Text style={{ fontSize: 15, fontWeight: "600" }}> 완료 </Text>
    // </TouchableOpacity>
    <Icon.Button name='checkmark-sharp' size={25}
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
  component: QuestionWrite,
  options,
};