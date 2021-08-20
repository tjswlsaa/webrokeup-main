import React, { useEffect, useState, useRef } from 'react';
import { TouchableWithoutFeedback, Keyboard, ImageBackground, StyleSheet, Button, Text, View, Image, Alert, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebase_db } from '../../firebaseConfig';
import { Switch } from 'react-native-switch';
import "firebase/firestore"
import "firebase/firebase-storage"
import firebase from 'firebase';
import BookComponent from '../../components/BookComponent';




const readBookPage = ({ navigation, route }) => {

  const { myitem, bookKey } = route.params
  test5.bookKey=bookKey


  const [bookTitle2, setBookTitle2] = useState(myitem.bookTitle) //새로 생성한 북 제목
  test3.bookTitle2=bookTitle2

  const [image2, setImage2] = useState(myitem.url) // 새로 생성한 책 이미지 
  test2.image2=image2;

  const [isPublic, setPublic] = useState(true);
  test4.isPublic=isPublic

  var user = firebase.auth().currentUser
  var user_uid
  if (user != null) { user_uid = user.uid }
  var userID = user_uid.substring(0, 6)
 




  
  return (

    <SafeAreaView style={{ flex: 1 }}>
        <BookComponent
             item={myitem}
            navigation={navigation}
                                />
    </SafeAreaView>


  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  bookContainer: {
    marginTop: "11%",
    marginRight: "6%",
    marginLeft: "6%",
    height: "92%",
  },
  bookBackgroundImage: {
    height: "100%",
    resizeMode: "cover",
  },
  bookImage: {
    height: "100%",
    resizeMode: "cover",
  },
  openButtonContainer: {
    height: "5%",
    width:"20%",
    // alignItems:"flex-end",
    marginTop:0,
    marginBottom:25,
    marginLeft:250,
  },
  openButton: {
    height: 20,
    width: 80,
    backgroundColor: "#C4C4C4",
    borderRadius: 5,
    marginTop:"10%",
    marginLeft: "80%",
    justifyContent: "center",
    alignContent:"center",
    margin: "1%"
  },
  openButtonText: {
    marginLeft: "15%",
    fontSize: 14,
  },
  titleInput: {
    height: "12%",
    width: "50%",
    marginLeft:20
  },
  titleInputText: {
    fontSize: 20,
    marginLeft: "20%",
    flexShrink: 1,
    marginBottom: "5%"
  },
  writer: {
    alignSelf: "flex-end",
    marginRight: "5%",
    marginTop: "5%"
  },
  photoInputContainer: {
    
    // marginTop: "17%",
    // height: "50%",
    // width: "85%",
    // marginLeft: "5%",
    // alignSelf: "center",
    // justifyContent: "center",
    // alignItems: "center"
  }
})




export default readBookPage;