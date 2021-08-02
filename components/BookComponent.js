import React, {useEffect, useState} from "react"
import {View,Text,Image,ImageBackground} from "react-native";
import book from '../assets/book.png';
import firebase from 'firebase/app';
import { firebase_db } from '../firebaseConfig';

//비구조 할당 방식으로 넘긴 속성 데이터를 꺼내 사용함
export default function BookComponent({item}) {
    
    const [userinfo2, setUserinfo2] = useState([]);
    var user = firebase.auth().currentUser;
    var user_uid
    if (user != null) {
      user_uid = user.uid;
    }
    useEffect(()=>{
      firebase_db.ref(`users/${item.user_uid}`)
          .on('value', (snapshot) => {
              let userinfo2 = snapshot.val();
              setUserinfo2(userinfo2);
          })
  }, []);

    return (
    <View style={{flex:1}}>
        <ImageBackground style={{flex: 1,  flexDirection: 'column', width: "100%", height: "100%", marginRight: 5, marginLeft: 16,}} source={book} >
            <Text style={{marginLeft: "12%", marginTop: "20%", fontSize: 17}}>{item.bookTitle}</Text>
            <Text style={{alignSelf: "flex-end", marginTop: "6%", marginRight: "10%", fontSize: 13}}>{userinfo2.iam}</Text>
            <Image style={{flex: 1, width: "75%", height: "45%", marginLeft: "15%", marginBottom: "30%"}} source={{ uri: item.url }} resizeMode={"center"} />
        </ImageBackground>
      </View>
    )
}