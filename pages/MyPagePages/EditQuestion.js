import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput, Alert } from 'react-native';
import { firebase_db } from '../../firebaseConfig';
import firebase from 'firebase/app'
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { CommonActions } from '@react-navigation/native';

const test1 = {
    navigation:""
  }
  
  const test2 ={
    text1:""
  }
  
  const test3 ={
    text2:""
  }

  const test4 ={
    bookKey:""
  }
  
  const test5 ={
    chapters:""
  }
  const test6 ={
    text3:""
  }
  const test7 ={
    text4:""
  }
const EditQuestion = ({ navigation, route }) => {
    test1.navigation=navigation

    const { chapters, bookKey} = route.params;
    test5.chapters=chapters
    test4.bookKey=bookKey
    console.log("EditArticlechapters",chapters)
    const [text1, setText1] = useState(chapters.chapterTitle);
    const [text2, setText2] = useState(chapters.mainText);
    const [text3, setText3] = useState(chapters.text3);
    const [text4, setText4] = useState(chapters.text4);
    test2.text1=text1
    test3.text2=text2
    test6.text3=text3
    test7.text3=text4

    const title_a = useRef(null);
    const maintext_a = useRef(null);
    var user = firebase.auth().currentUser;
    var user_uid
    if (user != null) {
        user_uid = user.uid
    }
    const ScreenHeight = Dimensions.get('window').height   //height
    const ScreenWidth = Dimensions.get('window').width   //height

    const headerHeight = useHeaderHeight();
    const BottomSpace = getBottomSpace()
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight-headerHeight-BottomSpace
    
    return (
        <View style={{ height: "90%", width: "90%", alignSelf: "center", backgroundColor:"white", marginVertical:"10%"}} 
        // onPress={() => { navigation.navigate("MyBook", { item: item, bookKey: item.bookKey, navigation: navigation }) }}
        >

            <View style={{ flexDirection:"row", marginTop:"10%",alignItems:"center",marginVertical:"5%", marginHorizontal:"10%"}}>
                <View style={{backgroundColor:chapters.chColor, flex:1, height:realScreen*0.05, }}></View>
                <View style={{height:realScreen*0.1, flex:25,}}>
                {/* <Text style={{fontSize: 18, fontWeight:"500",  marginLeft:"2%", marginTop:"7.5%"}}>{chapters.chapterTitle}</Text> */}
                <TextInput style={{ fontSize: 18, fontWeight:"500",  marginLeft:"2%", marginTop:"6%", backgroundColor: 'rgba(52,52,52,0)',  }}
                                        multiline={true} defaultValue={chapters.chapterTitle} returnKeyType="done"
                                        onChangeText={text1 => setText1(text1)}
                                        ref={title_a} />
                </View>
            </View>
                <ScrollView style={{marginTop:"5%",marginHorizontal:"10%"}}>
                    


                            <View>
                                                <View style={{ marginBottom:realScreen*0.03}}>
                                                <Text style={{fontSize: 16, fontWeight:"600",}}>{chapters.Q1}</Text>
                                                <TextInput style={{ backgroundColor: 'rgba(52,52,52,0)',  fontSize: 15 ,lineHeight:23}}
                                                            multiline={true} defaultValue={chapters.mainText} returnKeyType="done"
                                                            onChangeText={text2 => setText2(text2)}
                                                            ref={maintext_a} />
                                                </View>
                                                <View style={{ marginBottom:realScreen*0.03}}>
                                                <Text style={{fontSize: 16, fontWeight:"600",}}>{chapters.Q2}</Text>
                                                <TextInput style={{ backgroundColor: 'rgba(52,52,52,0)',  fontSize: 15,lineHeight:23 }}
                                                            multiline={true} defaultValue={chapters.text3} returnKeyType="done"
                                                            onChangeText={text3 => setText3(text3)}
                                                            ref={maintext_a} />
                                                </View>
                                                <View style={{ marginBottom:realScreen*0.03}}>
                                                <Text style={{fontSize: 16, fontWeight:"600",}}>{chapters.Q3}</Text>
                                                <TextInput style={{ backgroundColor: 'rgba(52,52,52,0)',  fontSize: 15,lineHeight:23 }}
                                                            multiline={true} defaultValue={chapters.text4} returnKeyType="done"
                                                            onChangeText={text4 => setText4(text4)}
                                                            ref={maintext_a} />                                                
                                                </View>
                            </View>
                
                </ScrollView>
        </View>
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
        marginRight: "10%",
    },
    bookBackgroundImage: {
        height: "100%",
        resizeMode: "cover",
        flex: 1,
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
    regdate: {
        marginLeft: "10%"
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
        marginLeft: "10%",
    }
});


async function savePage() {


    const {navigation}=test1
    const {text1}=test2
    const {text2}= test3
    const {bookKey}=test4
    const {chapters}=test5
    const {text3}=test6
    const {text4}=test7

    
    firebase_db
        .ref(`/book/${chapters.bookKey}/both/` + chapters.chapterKey)
        .update({
            chapterTitle: text1,
            mainText: text2,
            text3:text3,
            text4:text4,
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
      
    navigation.navigate("MyArticle", { bookKey: bookKey, chapterKey:chapters.chapterKey })
  }
  
  
  function headerRight() {
    return (
  
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
    component: EditQuestion,
    options,
  };