import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput, Alert } from 'react-native';
import { firebase_db } from '../../firebaseConfig';
import firebase from 'firebase/app'
import { StatusBar } from 'expo-status-bar';
import paper from '../../assets/paper.png';

const book = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTk0/MDAxNjIzMDY3OTkzMTYz.Uyg7r1zEBbPKA-CfVHU0R5ojbmozb02GJzMRapgcP1cg.flIv0UKSYHpE_CHNSOi2huGzv3svilsmEmMFy1G9zH0g.PNG.asj0611/book.png?type=w773"
const bookBackground = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTE1/MDAxNjIzMDY2NDQwOTUx.N4v5uCLTMbsT_2K1wPR0sBPZRX3AoDXjBCUKFKkiC0gg.BXjLzL7CoF2W39CT8NaYTRvMCD2feaVCy_2EWOTkMZsg.PNG.asj0611/bookBackground.png?type=w773"
const editWriting = ({ navigation, route }) => {
    const { writingKey, text, title } = route.params;
    const [editText, setEditText] = useState(text);
    const [editTitle, setEditTitle] = useState(title);

    var user = firebase.auth().currentUser;
    var user_uid
    if (user != null) {
        user_uid = user.uid
    }

    const [userinfo, setUserinfo] = useState([]);

    useEffect(()=>{
      firebase_db.ref(`users/${user_uid}`)
          .on('value', (snapshot) => {
              let userinfo = snapshot.val();
              setUserinfo(userinfo);
          })
  }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="white" />
            <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground style={styles.bookBackgroundImage} source={{ uri: bookBackground }} >

                    <TouchableOpacity style={styles.saveButton} onPress={() => {
        
                            firebase_db.ref(`editor/${writingKey}/`)                                
                            .update({
                                    text: editText,
                                    title: editTitle,
                                    regdate: new Date().toString()
                                });
                            Alert.alert("집필 완료")
                            navigation.navigate("readEditorWriting", {  writingKey: writingKey})
                            //title_a.current.clear();
                            //maintext_a.current.clear();  
                    }}>
                        <Text style={{ alignSelf: "center" }}>저장하기</Text>
                    </TouchableOpacity>
                    <ImageBackground style={styles.bookImage} source={paper} >
                    <ScrollView scrollEnabled={false}>

                    <View style={{marginTop:20, marginLeft:10, marginRight:10, padding:40, borderRadius:10, justifyContent:"center"}}>
                        <TextInput style={{ backgroundColor: 'rgba(52,52,52,0)', padding: 30, flex: 1, flexShrink: 1, fontSize: 17 }}
                                                    multiline={true} defaultValue={title} 
                                                    onChangeText={editTitle => setEditTitle(editTitle)} />    
     
                            <TextInput style={{ backgroundColor: 'rgba(52,52,52,0)', padding: 30, flex: 1, flexShrink: 1, fontSize: 17 }}
                                                multiline={true} defaultValue={text} 
                                                onChangeText={editText => setEditText(editText)} />              
                    </View>
                    </ScrollView>

                    </ImageBackground>

                    </ImageBackground>

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
export default editWriting;