import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput, Alert, Switch, Touchable} from 'react-native';
import { firebase_db } from '../../firebaseConfig';
import firebase from 'firebase/app'
const AccountInfo = ({navigation}) => {
    return(
        <View style= {{flex: 1, backgroundColor: "#FAFAFA"}}>
                <View style={{flex: 1, backgroundColor: "white", marginHorizontal : 10}}>
                    <View style={{borderwidth: 5, borderColor: "grey"}}></View>
                    <Text style={{marginVertical: 10, fontSize: 15, fontWeight: "bold"}}>계정 정보</Text>
                        <View style={{borderwidth: 1, flexDirection: "row"}}>
                            <Text style={{flex: 1, fontSize: 15, marginVertical: 10}}> 성별 </Text>
                            <Text style={{flex: 3, marginVertical: 10}}> 미설정 </Text>
                        </View>
                        <View style={{borderwidth: 1, flexDirection: "row"}}>
                            <Text style={{flex: 1, fontSize: 15, marginVertical: 10}}> 생년월일 </Text>
                            <Text style={{flex: 3, marginVertical: 10}}> 미설정 </Text>
                        </View>
                        <View style={{flex: 1, borderwidth: 1, flexDirection: "row"}}>
                            <Text style={{flex: 1, fontSize: 15, }}> 이메일 </Text>
                            <Text style={{flex: 3}}> omang0896@gmail.com </Text>
                        </View>
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity style={{backgroundColor: "white", marginTop: 10, height: 50}} onPress={() => firebase.auth().signOut()}>
                        <Text style={{paddingVertical: 20, marginLeft: 10, fontSize: 15, fontWeight:"600", alignContent: "center", height: 20}}>로그아웃</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: "white", height: 50, marginTop: 10}} onPress={() => firebase.auth().currentUser.delete().then(function () {
                            console.log('delete successful?')
                            console.log(app.auth().currentUser)
                        }).catch(function (error) {
                            console.error({error})
                        })}>
                        <Text style={{paddingVertical: 20, marginLeft: 10, fontSize: 15, fontWeight:"600"}}>탈퇴하기</Text>
                    </TouchableOpacity>
               </View> 
        </View>
    )
}
export default AccountInfo;