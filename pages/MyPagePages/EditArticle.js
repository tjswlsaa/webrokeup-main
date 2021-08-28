import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, TouchableWithoutFeedback, Keyboard, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput, Alert } from 'react-native';
import { firebase_db } from '../../firebaseConfig';
import firebase from 'firebase/app'
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { CommonActions } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/AntDesign';

const test1 = {
    navigation:""
  }
  
  const test2 ={
    text1:""
  }
  
  const test3 ={
    text2:""
  }

  
  
  const test5 ={
    chapters:""
  }

const EditArticle = ({ navigation, route }) => {
    test1.navigation=navigation

    const { chapters} = route.params;
    test5.chapters=chapters
    console.log("EditArticlechapters222",chapters.bookKey)

    const [text1, setText1] = useState(chapters.chapterTitle);
    const [text2, setText2] = useState(chapters.mainText);

    test2.text1=text1
    test3.text2=text2


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
        <View style={{ height: "90%", width: "90%", alignSelf: "center", backgroundColor:"white", marginVertical:"10%"}} >
           {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}


            <View style={{ flexDirection:"row", marginTop:"10%",alignItems:"center",marginVertical:"5%", marginHorizontal:"10%"}}>
                <View style={{backgroundColor:chapters.chColor, flex:1, height:realScreen*0.05, }}></View>
                <View style={{height:realScreen*0.1, flex:25,}}>
                {/* <Text style={{fontSize: 18, fontWeight:"500",  marginLeft:"2%", marginTop:"7.5%"}}>{chapters.chapterTitle}</Text> */}
                <TextInput style={{ fontSize: 18, fontWeight:"500",  marginLeft:"2%", marginTop:"6%", backgroundColor: 'rgba(52,52,52,0)',  }}
                                        multiline={false} defaultValue={chapters.chapterTitle} returnKeyType="done"
                                        onChangeText={text1 => setText1(text1)}
                                        ref={title_a} />
                </View>
            </View>
                <ScrollView style={{marginTop:"5%",marginHorizontal:"10%",}}>
                    

                <TextInput style={{ backgroundColor: 'rgba(52,52,52,0)',  fontSize: 15 }}
                                    multiline={true} defaultValue={chapters.mainText} returnKeyType="done"
                                    onChangeText={text2 => setText2(text2)}
                                    ref={maintext_a} />
            
                </ScrollView>
                {/* </TouchableWithoutFeedback>  */}
                <TouchableOpacity style={{ width: "15%", borderRadius: 15, alignSelf:"flex-end", marginRight:"10%", padding:"5%"}} 
                onPress={() => {
                    // console.log('MyArticle.js (3), chapters: ',chapters);
                    firebase_db
                        .ref(`book/${chapters.bookKey}/chapters/` + chapters.chapterKey)
                        .set(null)
                        .then(function () {
                            Alert.alert("삭제 완료")
                            navigation.navigate("MyBook", { bookKey: chapters.bookKey })
                        })
                }}>
                                
                                 <Icon2 name="delete" size={18} color="grey" style={{alignSelf:"flex-end"}}></Icon2>

                            </TouchableOpacity>
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
    const {chapters}=test5

    
    firebase_db
        .ref(`/book/${chapters.bookKey}/both/` + chapters.chapterKey)
        .update({
            chapterTitle: text1,
            mainText: text2,
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
      
    navigation.navigate("MyArticle", { bookKey: chapters.bookKey, chapterKey:chapters.chapterKey })
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
    component: EditArticle,
    options,
  };