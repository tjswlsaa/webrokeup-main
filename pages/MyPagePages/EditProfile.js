import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput, Alert} from 'react-native';
import {firebase_db} from '../../firebaseConfig';
import firebase from 'firebase/app'
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/AntDesign';
//import defaultExport from '@react-native-firebase/auth';
const EditProfile = ({navigation}) => {
    const [ID,setID] = useState('실험');
    const [selfLetter, setSelfLetter] = useState('');
    const idtext = useRef(null);
    const selflettertext = useRef(null);
    var user = firebase.auth().currentUser;
    var  user_uid
    if (user != null) {
        user_uid = user.uid
    }
    var userID=user_uid.substring(0,6)
        return(
            <View style ={{flex: 1, backgroundColor: "#FAFAFA"}}>  
                <View style={{flex: 1, marginTop: 10, height: "30%", backgroundColor: "white"}}>
                    <View style = {{flex:2}}>
                        <View style={{flex:1, flexDirection: "row", marginTop: 20}}>
                            <Text style={{marginLeft: 30, marginTop: 30, alignSelf: "flex-start", fontSize:17}}>지은이</Text>
                            <TextInput 
                                color = "#98C0ED"
                                style={{marginLeft: 30, marginTop: 20, height: 40, fontWeight: "bold", fontSize: 25, alignSelf: "flex-start"}}
                                returnKeyType="done"
                                defaultValue = {userID} 
                                onChangeText={ID=>setID(ID)}
                                ref={idtext}/>
                        </View>
                            <TextInput 
                                backgroundColor = "#FAFAFA"
                                style={{marginHorizontal: 30, marginTop: 20, height: 150}}
                                multiline={true}
                                returnKeyType="done"
                                defaultValue = {"안녕하세요 이별록 작가" + userID + "입니다."}
                                onChangeText={selfLetter=>setSelfLetter(selfLetter)}
                                ref={selflettertext}/>
                    </View>
                    <View style={{flex: 0.5, backgroundColor: "white", padding: 20}}>
                        {/* <TouchableOpacity style= {{marginTop: 30, marginRight: 20, height: 30, width: 30, backgroundColor: "white", borderRadius: 5}}>
                            <Icon name="edit" size={20} color = "#98C0ED"/>
                        </TouchableOpacity> */}
                        <TouchableOpacity style= {{padding:10, width: "30%", backgroundColor: "#98C0ED", borderRadius: 10, alignSelf:"flex-end"}}
                            onPress={()=>{
                                firebase_db
                                  .ref('users/'+user_uid + '/')
                                  .update({
                                    id: ID,
                                    self_letter: selfLetter,
                                  })
                                navigation.navigate("Account")
                            }}>
                            <Text style={{color: "white", alignSelf: "center"}}>저장하기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 3, backgroundColor: "white"}}>
                    </View>
                 </View>
            </View>
        )
    }
    // function saveChapter() {
    //     var chapterTitle = text1;
    //     var mainText = text2;
    //     firebase_db
    //       .ref(`/book/${bookKey}/chapters/`+ chapters.chapterKey)
    //       .set({
    //         chapterKey: chapters.chapterKey,
    //         chapterTitle: chapterTitle,
    //         mainText: mainText,
    //         regdate: new Date().toString()
    //       });
    //       Alert.alert("집필 완료")
    //       navigation.navigate("MyPage", {bookKey:bookKey})
    //       //title_a.current.clear();
    //       //maintext_a.current.clear();  
    //   };
export default EditProfile;