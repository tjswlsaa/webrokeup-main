import React, {useEffect, useState} from "react"
import {View,Text,Image,ImageBackground} from "react-native";
import book from '../assets/book.png';
import coverimage from '../assets/coverimage_w.png';
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
    <View style={{flex:1, flexDirection: 'column'}}>
        <ImageBackground style={{flex: 1, flexDirection: 'column', width: "100%", height: "100%"}} source={coverimage} resizeMode={"contain"}>
            <View style= {{flex:1, flexDirection: 'column'}}>
              <Text style={{flex:1, fontSize : 17, borderWidth: 1, marginTop: "20%", marginHorizontal: "25%"}}>{item.bookTitle}</Text>
              <Text style={{flex: 1, alignSelf: "flex-end", borderWidth: 1, fontSize: 13, marginHorizontal: "25%"}}>{userinfo2.iam}</Text>
              <Image style={{flex: 5, width: "50%", top: 0, borderWidth: 1, justifyContent: "flex-start", marginHorizontal: "25%", marginBottom: "15%"}} source={{ uri: item.url }} resizeMode={"contain"} />
            </View>
        </ImageBackground>
      </View>
    )
}