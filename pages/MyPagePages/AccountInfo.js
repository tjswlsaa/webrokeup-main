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

        const deletefunction =async()=>{
                     firebase.auth().currentUser.delete()
                     .then(()=>{
                        Alert.alert("탈퇴되었습니다") 
                     }).catch((error)=>{
                        Alert.alert("장기간 로그인 시도가 없습니다. 다시 로그인 한 후 시도해주세요") 
                        console.log("이게 로그인했을 때 왜 또다시 뜨지?")
                     })


        // try{
        //  firebase.auth().currentUser.delete()
        // }
        // catch(error)
        // {
        //     Alert.alert("장기간 로그인 시도가 없습니다. 다시 로그인 한 후 시도해주세요") 
        // }


    }
    }
            
    
            

     
    return(
        <View style= {{flex: 1, backgroundColor: "#fafafa"}}>
                <View style={{flex: 1,  marginHorizontal : "3%",}}>
                        <View style={{ borderwidth: 5, borderColor: "grey"}}></View>
                        <Text style={{ marginTop: "5%", marginVertical: 15, fontSize: 17, fontWeight: "bold"}}>계정 정보</Text>

                        <View style={{height: "7%", flexDirection: "row", backgroundColor: "#fafafa"}}>
                                <Text style={{flex: 2, fontSize: 15, marginVertical: "3%"}}> 회원가입 경로 </Text>
                                <Text style={{flex: 3, marginVertical: "3%"}}> {userinfo.method} </Text>
                            </View>
                        <View style={{height: "7%", flexDirection: "row", backgroundColor: "#fafafa"}}>
                            <Text style={{flex: 2, fontSize: 15, marginVertical: "3%"}}> 이메일 </Text>
                            <Text style={{flex: 3, marginVertical: "3%"}}> {userinfo.email} </Text>
                        </View>
                </View>
                <View style={{marginBottom: "5%", marginHorizontal:"3%"}}>
                    <TouchableOpacity style={{height: "10%", backgroundColor: "#fff", marginTop: 5, height: 50 }} onPress={() => firebase.auth().signOut()}>
                        <Text style={{paddingVertical: 20, marginLeft: 10, fontSize: 15, fontWeight:"600", alignSelf: "center", height: 20}}>로그아웃</Text>
                    </TouchableOpacity>
                    <View style={{borderwidth: 5, borderColor: "grey"}}></View>

                    <TouchableOpacity style={{height: "10%", backgroundColor: "#fff", height: 50, marginTop: 5}} 
                    onPress={() => deleteAccount()}>
     
                        <Text style={{paddingVertical: 20, marginLeft: 10, fontSize: 15, fontWeight:"600", alignSelf: "center"}}>탈퇴하기</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}
export default AccountInfo;