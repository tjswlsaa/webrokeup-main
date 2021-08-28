import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, KeyboardAvoidingView, Dimensions, Keyboard, Text, View, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput, Alert, TouchableWithoutFeedback } from 'react-native';
import { firebase_db } from '../../firebaseConfig';
import firebase from 'firebase/app'
import { StatusBar } from 'expo-status-bar';
import paper from '../../assets/paper.png';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';

import {useNavigation } from '@react-navigation/native';

const test1 = {
    text1:""
  }
 
  const test3 = {
    bookKey:""
  }
  const test4 = {
    navigation:""
  }
const EditIntroArticle = ({ navigation, route }) => {
    test4.navigation=navigation
    const {intro, bookKey} = route.params;
    test3.bookKey=bookKey
    console.log("EditIntroArticlebookkey",bookKey)
    const [text1, setText1] = useState(intro);
    test1.text1=text1

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

    const savePage=()=>{
        let introKey = "intro";
    
    
        firebase_db
        .ref( `/book/${bookKey}/`+ introKey)
        .set(text1)
        Alert.alert("집필 완료")
    
      
      
      navigation.navigate("readIntroArticle", { bookKey: bookKey, intro:text1, authorUser_uid: user_uid})
    }

    return (
        <SafeAreaView style={{flex:1}}>
        <KeyboardAvoidingView behavior="padding" style={{flex:1}} keyboardVerticalOffset={50}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    
                    {/* <View style={styles.bookContainer}>


                             <Text style={styles.bookTitle}>말머리에서</Text>  
                                <View style={{ flexDirection: 'row', padding: 10, marginTop: 70 }}>
                                    <TextInput style={{ backgroundColor: 'rgba(52,52,52,0)', padding: 30, flex: 1, fontSize: 17 }}
                                        multiline={true} defaultValue={intro}  returnKeyType="done"
                                        onChangeText={text1 => setText1(text1)} />
                                </View>


                    </View> */}
<View style={{ height: realScreen*0.9,alignSelf: "center", backgroundColor:"white" , marginVertical:"10%", width:"90%",}}>

<TouchableOpacity style={{alignSelf:"flex-end", marginRight:"10%", marginTop:"10%"}}  onPress={savePage}>
                        <Icon name="checkmark-sharp" size={18} color="grey" style={{alignSelf:"flex-end"}}></Icon>

                    </TouchableOpacity>

                    <View style={{height:realScreen*0.1,marginHorizontal:"5%", marginTop:"25%"}}>
                                <Text style={styles.bookTitle}>말머리에서</Text>  
                            </View>
                            <View style={{height:realScreen*0.6}}>
                            <ScrollView style={styles.textContainer}>
                            <TextInput style={{ backgroundColor: 'rgba(52,52,52,0)', padding: 30, flex: 1, fontSize: 14,lineHeight:"25%", }}
                                        multiline={true} defaultValue={intro}  returnKeyType="done"
                                        onChangeText={text1 => setText1(text1)} />                        
                            </ScrollView>
                        </View>
</View>
                </TouchableWithoutFeedback>
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








// async function savePage() {

//     const {text1}=test1
//     console.log("text1",text1)
//     const {bookKey}= test3
//     console.log("bookKey",bookKey)

//     const {navigation}= test4
//     // const navigation = useNavigation();

//     var user = firebase.auth().currentUser;
//     var user_uid
//     if (user != null) {
//         user_uid = user.uid
//     }
//     let introKey = "intro";
//     var introArticle = text1;


//     firebase_db
//     .ref( `/book/${bookKey}/`+ introKey)
//     .set(text1)
//     Alert.alert("집필 완료")

  

  
//   navigation.navigate("readIntroArticle", { bookKey: bookKey, intro:text1, authorUser_uid: user_uid})
//   }
  
  
//   function headerRight() {
//     return (
//     //   <TouchableOpacity onPress={savePage}>
//     //     <Text style={{ fontSize: 15, fontWeight: "600" }}> 완료 </Text>
//     //   </TouchableOpacity>
//       <Icon.Button name='save' size={25}
//       backgroundColor= 'white' color="black" 
//       onPress={savePage()}
      
//       >
//     </Icon.Button>
  
//     );
//   }
//   const options = {
//     headerRight, 
//   };
  
  export default EditIntroArticle
  


