import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput, Alert, Switch, Touchable} from 'react-native';
import { firebase_db } from '../../firebaseConfig';
import firebase from 'firebase/app'
const AccountInfo = ({navigation}) => {
    const [userinfo, setUserinfo] = useState('');
    var user = firebase.auth().currentUser;
    var  user_uid
    if (user != null) {
      user_uid = user.uid;  
    }
    var userID=user_uid.substring(0,6)
    useEffect(()=>{
        firebase_db.ref(`users/${user_uid}`)
            .on('value', (snapshot) => {
                let userinfo = snapshot.val();
                setUserinfo(userinfo);
            })
    }, []);

   // console.log('userinfo',userinfo)
   // console.log('userinfo.method',userinfo.method)


    const deleteAccount = async()=> {

        const deletefunction =()=>{




            if (userinfo.method == "email 회원가입") {
                // Now you can use that to reauthenticate

                firebase.auth().currentUser.reauthenticateWithCredential(userinfo.email, userinfo.pw)
                    .then(function () {
                        firebase.auth().currentUser.delete()
                        Alert.alert("성공적탈퇴11!")

                        // console.log('delete successful?')
                        Alert.alert("성공적탈퇴11~~~~!")
                        return;
                    })
            }
        }
                        

            
        Alert.alert(
          'Alert Title',
          '모든 데이터가 삭제됩니다, 그래도 진행하시겠습니까?',
          [
    
            {
              text: '취소할래요',
              // onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: '넵', onPress: () => deletefunction()},
    
          ],
          {cancelable: false},
        );
    
     }
    return(
        <View style= {{flex: 1, backgroundColor: "white"}}>
                <View style={{flex: 1,  marginHorizontal : 10,}}>
                    <View style={{flex:1}}>
                        <View style={{borderwidth: 5, borderColor: "grey"}}></View>
                        <Text style={{marginVertical: 15, fontSize: 15, fontWeight: "bold"}}>계정 정보</Text>
                    </View>

                        <View style={{flex: 1, flexDirection: "row", }}>
                                <Text style={{flex: 2, fontSize: 15, marginVertical: 15}}> 회원가입 경로 </Text>
                                <Text style={{flex: 3, marginVertical: 15}}> {userinfo.method} </Text>
                            </View>
                        <View style={{flex: 1, flexDirection: "row", }}>
                            <Text style={{flex: 2, fontSize: 15, marginVertical: 15}}> 이메일 </Text>
                            <Text style={{flex: 3, marginVertical: 15}}> {userinfo.email} </Text>
                        </View>
                </View>
                
                <View style={{flex:3}}>

                    <TouchableOpacity style={{backgroundColor: "white", marginTop: 5, height: 50}} onPress={() => firebase.auth().signOut()}>
                        <Text style={{paddingVertical: 20, marginLeft: 10, fontSize: 15, fontWeight:"600", alignContent: "center", height: 20}}>로그아웃</Text>
                    </TouchableOpacity>
                    <View style={{borderwidth: 5, borderColor: "grey"}}></View>

                    <TouchableOpacity style={{backgroundColor: "white", height: 50, marginTop: 5}} 
                    onPress={() => deleteAccount()}>
     
                        <Text style={{paddingVertical: 20, marginLeft: 10, fontSize: 15, fontWeight:"600"}}>탈퇴하기</Text>
                    </TouchableOpacity>
               </View> 
        </View>
    )
}
export default AccountInfo;