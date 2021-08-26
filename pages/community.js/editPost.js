import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, Dimensions,View, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput, Alert } from 'react-native';
import { firebase_db } from '../../firebaseConfig';
import firebase from 'firebase/app'
import { StatusBar } from 'expo-status-bar';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';

const test1 = {
    navigation:""
  }
  
  const test2 ={
    postKey:""
  }
  
  const test3 ={
    editText:""
  }



const editPost = ({ navigation, route }) => {
    const { postKey, text, regdate } = route.params;
    const [editText, setEditText] = useState(text);
   
    var user = firebase.auth().currentUser;
    var user_uid
    if (user != null) {
        user_uid = user.uid
    }

    test1.navigation=navigation
    test2.postKey=postKey
    test3.editText=editText

    const headerHeight = useHeaderHeight();
    const ScreenWidth = Dimensions.get('window').width  //screen 너비
    const ScreenHeight = Dimensions.get('window').height   //height
    const BottomSpace = getBottomSpace()
    const tabBarHeight = 0;
    const statusBarHeight = getStatusBarHeight()
    const realScreen = ScreenHeight - headerHeight - BottomSpace - tabBarHeight
  


    return (
        <View style={styles.container}>
            <StatusBar style="white" />
            <SafeAreaView style={{ flex: 1 }}>


            <View style={{flex:1}}>
                <View style={{  padding: 10, backgroundColor:'white', height:realScreen*0.90, marginVertical:"8%", marginHorizontal:"5%" }}>
                <ScrollView scrollEnabled={true}>

                        <TextInput style={{ backgroundColor: 'rgba(52,52,52,0)', padding: 30, flex: 1, flexShrink: 1, fontSize: 17 ,marginTop:"10%"}}
                        multiline={true} defaultValue={text} 
                        onChangeText={editText => setEditText(editText)} />
               </ScrollView>

                </View>
          </View>



            </SafeAreaView>
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
    const {postKey}=test2
    const {editText}= test3

    
    firebase_db.ref(`post/${postKey}/`)                                
    .update({
            text: editText,
            regdate: new Date().toString()
        });
    navigation.navigate("readPost", {  postKey: postKey})
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
    component: editPost,
    options,
  };