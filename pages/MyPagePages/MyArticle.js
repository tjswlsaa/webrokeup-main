import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Touchable, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {firebase_db} from '../../firebaseConfig';
import firebase from 'firebase/app'
import { StatusBar } from 'expo-status-bar';
import {MakeNewBook} from './MakeNewBook';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { render } from 'react-dom';
//import defaultExport from '@react-native-firebase/auth';
const MyArticle = ({navigation, route}) => {
    const {myitem, chapters, chapterTitle} = route.params;
    const {bookKey, chapterKey} = route.params;
    const [likeCount, setLikeCount] = useState(0);
    const [likedUsers, setLikedUsers] = useState([]);
    const [commentsNumber, setCommentsNumber] = useState(0);
    var user = firebase.auth().currentUser;
    var  user_uid
        if (user != null) {
            user_uid = user.uid
        }
    const likeRef = firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/likes/');
    // const delArticle = ()=>{
    //     // console.log("챕터 삭제")
    //     firebase_db
    //     .ref(`book/${bookKey}/chapters/` + chapters.chapterKey)
    //     .set(null)
    //     .then(function(){
    //         Alert.alert("삭제 완료")
    //         navigation.navigate("MyBook", {myitem: myitem})
    //     })
    // }
    useEffect (()=>{
        // let temp = [];
        let arr = likeRef
        .on('value', (snapshot) => {
            let temp = [];
            var likeCount = snapshot.numChildren();
            console.log('useEffect()');
            console.log({likeCount});
            setLikeCount(likeCount)
            // console.log(likeCount)
            snapshot.forEach((child) => {
                temp.push(child.val());
            })
            console.log({temp});
            setLikedUsers(temp);
        })
    }, [])
    useEffect (()=>{
        let arr = firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/comments/')
        .on('value', (snapshot) => {
           var commentsNumber = snapshot.numChildren();
           setCommentsNumber(commentsNumber)
        })
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar style="white" />
            <View style={styles.upperButtonContainer}>
                <TouchableOpacity style={styles.editButton}>                
                    <Text style={styles.editButtonText} onPress={()=>navigation.navigate("EditArticle", {bookKey: bookKey, chapters: chapters, chapterKey: chapterKey})}>편집</Text>
                </TouchableOpacity>  
                <TouchableOpacity style={styles.deleteButton} >
                    <Text style={styles.deleteButtonText} onPress={()=>{
                        firebase_db
                        .ref(`book/${bookKey}/chapters/` + chapters.chapterKey)
                        .set(null)
                        .then(function(){
                            Alert.alert("삭제 완료")
                            navigation.navigate("MyBook", {myitem: myitem})
                        })
                    }}>삭제</Text>
                </TouchableOpacity>  
            </View>
            <View>
                <View>
                    <View>
                        <Text style={styles.bookTitle}>{chapterTitle}</Text>  
                    </View>
                    <ScrollView style={styles.textContainer}>
                        <Text style={styles.bookText}>{chapters.mainText}</Text>  
                        <Text style={styles.regdate}>{chapters.regdate}</Text>
                    </ScrollView>
                </View>
            </View>
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity style={styles.likeButton} onPress={async ()=>{
                    console.log('MyArticle.likeButton.onPress()');
                    // Alert.alert('MyArticle.likeButton.onPress()');
                    console.log({likedUsers});
                    // let meliked = likedUsers.filter(likedppl => likedppl.user_uid = user_uid)
                    let meliked = likedUsers.filter(likedppl => likedppl.user_uid == user_uid)
                     const isMeliked = (meliked > '');
                     const isMeliked2 = ((meliked == '') == false);
                     console.log("likedUsers: " +likedUsers)
                     console.log("meliked: " + meliked)
                     console.log({isMeliked,isMeliked2});
                     let likeCount = 0; 
                     // 바깥에 있는 likeCount라는 state는 여기서 불러봐야 씹힌다.. 
                     // 왜? 여기서부터는 let likeCount라고 선언한 변수가 그 이름을 뺴앗앗기 떄문이다
                     if (meliked == ''){
                         await likeRef.child(user_uid).set({
                             user_uid: user_uid,
                             regdate: new Date().toString(),
                         });
                         // likeReload();
                         likeRef.on('value', (snapshot) =>{
                            //  var likeCount = snapshot.numChildren();
                             likeCount = snapshot.numChildren();
                             setLikeCount(likeCount)
                         })
                     } else {
                         console.log ("좋아요 취소")
                         // likeRef.child(user_uid).set(null)
                         await likeRef.child(user_uid).remove();
                         // likeReload();
                         likeRef.on('value', (snapshot) =>{
                            //  var likeCount = snapshot.numChildren();
                             likeCount = snapshot.numChildren();
                             setLikeCount(likeCount)
                         })
                     }
                     console.log({likeCount});
                     console.log("여기여기: " + likeCount) 
                     // 이전: const [likeCount, setLikeCount] = useState(0);
                     // 그러면, setLikeCount를 했으면, 당장에 likeCount도 바뀌어야 하는거 아닌가?
                     // 리액트의 특징: state는 한 템포 느리게 변경된다. state는 보통 변수처럼 =로 값으르 바꿀 수 없다. 왜? state는 사실 변수가 아니다.
                     // 이후: let likeCount = 0;
                     // likeCount는 변수다
                     // 값을 바꾸면, 다음 줄에서는 값이 바뀌어있다 (왜? 그것이 변수이니까 (끄덕))
                     firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey).child("likeCount").set({"likeCount" : likeCount})
                     // likeRef.child(user_uid).set({
                     //     user_uid: user_uid,
                     //     regdate: new Date().toString(),
                     // })
                     // likeReload();
                     Alert.alert('MyArticle.likeButton.onPress() end');
                }}>                
                    <Text style={styles.likeButtonText} >공감</Text>

                </TouchableOpacity>  
                <Text style = {{marginLeft: 10}}> {likeCount} </Text>
                <TouchableOpacity style={styles.commentButton}>

                    <Text onPress={()=>{navigation.navigate('Comment',{myitem:myitem, chapters:chapters, navigation:navigation,bookKey:bookKey, chapterTitle:chapterTitle, chapterKey:chapterKey})}}style={styles.commentButtonText}>댓글</Text>
                
                </TouchableOpacity>  
                <Text style = {{marginLeft: 10}}> {commentsNumber} </Text>

            </View>
        </View>
    )}
const styles = StyleSheet.create({ 
    container: {
        //앱의 배경 색
        backgroundColor:"#F5F4F4",
                flex:1
      },
      upperButtonContainer: {
        flex:1,
        flexDirection:"row",
        alignSelf:"flex-end",
        marginTop: "15%",
        marginRight:"10%"
      },
      editButton: {
      },
      deleteButton: {
          marginLeft: "7%"
      },
      textContainer:{
          height: "50%"
      },
      bookTitle:{
        fontSize: 20,
        marginLeft: "5%"
      },
      bookText:{
          marginTop: "20%",
          marginLeft:"10%",
          marginRight:"10%",
      },
      regdate: {
          marginLeft : "10%"
      },
      bottomButtonContainer: {
        flex:1,
        flexDirection:"row",
        marginTop: "15%",
        marginRight:"10%"
      },
      commentButton: {
        marginLeft: "7%"
    },
    likeButton: {
        marginLeft: "10%",
    }
});
export default MyArticle;