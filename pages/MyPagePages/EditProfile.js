import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, ScrollView, TextInput, Alert} from 'react-native';
import {firebase_db} from '../../firebaseConfig';
import firebase from 'firebase/app'
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/AntDesign';
const EditProfile = ({navigation}) => {

    var user = firebase.auth().currentUser;
    var  user_uid
    if (user != null) {
      user_uid = user.uid;  
    }
    var userID=user_uid.substring(0,6)
       // console.log (userID)
    const [userinfo, setUserinfo] = useState([]);


    useEffect(()=>{
        firebase_db.ref(`users/${user_uid}`)
            .on('value', (snapshot) => {
                let userinfo = snapshot.val();
                setUserinfo(userinfo);
            })
    }, []);

    const [ID,setID] = useState(userinfo.iam);
    const [selfLetter, setSelfLetter] = useState(userinfo.selfLetter);
    const idtext = useRef(null);
    const selflettertext = useRef(null);

    var userID=user_uid.substring(0,6)


    // const handleSubmit =()=>{



    //     firebase_db
    //     .ref('users/'+user_uid + '/')
    //     .update({
    //       iam: ID,
    //       selfLetter: selfLetter,
    //     })
    //     Alert.alert("프로필 완료")
    //     navigation.navigate("Account")
    // }
        return(
            <View style ={{flex: 1, backgroundColor: "#FAFAFA"}}>  
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={{flex: 1, marginTop: 10, height: "30%", backgroundColor: "white"}}>
                    {/* <View style = {{flex:2}}> */}
                        <View style={{flex:1, flexDirection: "row", marginTop: 20, backgroundColor:"#FAFAFA", marginHorizontal:"8%" }}>
                            <TextInput 
                                color = "#20543F"
                                style={{marginLeft: 10, marginTop: 20, height: 40, fontWeight: "bold", fontSize: 25, alignSelf: "flex-start",}}
                                returnKeyType="done"
                                multiline={false}
                                defaultValue = {userinfo.iam} 
                                onChangeText={ID=>setID(ID)}
                                ref={idtext}/>

                        </View>
                        <TouchableOpacity style= {{padding:10, width: "20%", backgroundColor: "#20543F", borderRadius: 10, marginRight:20,alignSelf:"flex-end"}}
                            onPress={()=>{
                                firebase_db
                                  .ref('users/'+user_uid + '/')
                                  .update({
                                    iam: ID,
                                    // selfLetter: selfLetter,
                                  })
                                  Alert.alert("수정 완료되었습니다")
                                //   navigation.navigate("Account")
                            }}>
                            <Text style={{color: "white", alignSelf: "center"}}>저장하기</Text>
                        </TouchableOpacity>


                            <TextInput 
                                backgroundColor = "#FAFAFA"
                                style={{marginHorizontal: 30, marginTop: 30, height: 150, fontSize:15, marginLeft:30, marginBottom:10,lineHeight:23}}
                                multiline={true}
                                maxLength={30}
                                returnKeyType="done"
                                defaultValue = {userinfo.selfLetter}
                                onChangeText={selfLetter=>setSelfLetter(selfLetter)}
                                ref={selflettertext}/>
                    <View style={{flex: 0.5, backgroundColor: "white", }}>

                        <TouchableOpacity style= {{padding:10, width: "20%", backgroundColor: "#20543F", borderRadius: 10, alignSelf:"flex-end", marginRight:20,}}
                            onPress={()=>{
                                firebase_db
                                  .ref('users/'+user_uid + '/')
                                  .update({
                                    // iam: ID,
                                    selfLetter: selfLetter,
                                  })
                                  Alert.alert("수정 완료되었습니다")
                                //   navigation.navigate("Account")
                            }}>
                            <Text style={{color: "white", alignSelf: "center"}}>저장하기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 3, backgroundColor: "white"}}>
                    </View>
                 </View>
                 </TouchableWithoutFeedback>

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