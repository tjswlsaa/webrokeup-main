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

        
   // console.log('MyArticle_edit.js (1), chapters: ',chapters);

    const likeRef = firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/likes/');

    const renderArticle = ()=>{
        return(
            <View>
                <View>
                    <Text style={styles.bookTitle}>{chapterTitle}</Text>  
                </View>
                <ScrollView style={styles.textContainer}>
                    <Text style={styles.bookText}>{chapters.mainText}</Text>  
                    <Text style={styles.regdate}>{chapters.regdate}</Text>
                </ScrollView>
            </View>
        )
    }

   // console.log('MyArticle_edit.js (2), chapters: ',chapters);

    const delArticle = ()=>{
        //// console.log("챕터 삭제")
        firebase_db
        .ref(`book/${bookKey}/chapters/` + chapters.chapterKey)
        .set(null)
        .then(function(){
            Alert.alert("삭제 완료")
            navigation.navigate("MyBook", {myitem: myitem})
        })
    }

    

    useEffect (()=>{
        let temp = [];
        let arr = likeRef
        .on('value', (snapshot) => {
            var likeCount = snapshot.numChildren();
            setLikeCount(likeCount)
            //// console.log(likeCount)

            snapshot.forEach((child) => {
                temp.push(child.val());
            })
            setLikedUsers(temp);
        })
    }, [])

    useEffect (()=>{
       // console.log('MyArticle_edit.js (3), chapters: ',chapters);

        let arr = firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/comments/')
        .on('value', (snapshot) => {
           var commentsNumber = snapshot.numChildren();
           setCommentsNumber(commentsNumber)
        })
    }, [])

    const likeIncrement = () => {        
        // 좋아요 누른 상태였으면 취소, 안 눌렀으면 좋아요 누르기 설정까지는 가능하나
        // useState처럼 즉각적으로 공감했다, 취소했다, 다시 공감하기 등 여러 번 실행은 불가
        let meliked = likedUsers.filter(likedppl => likedppl.user_uid = user_uid)
       // console.log("likedUsers: " +likedUsers)
       // console.log("meliked: " + meliked)
        if (meliked == ''){
            likeRef.child(user_uid).set({
                user_uid: user_uid,
                regdate: new Date().toString(),
            })
            likeReload();
        } else {
           // console.log ("좋아요 취소")
            likeRef.child(user_uid).set(null)
            likeReload();
        }
    }

    const likeReload = () => {
        likeRef.on('value', (snapshot) =>{
           var likeCount = snapshot.numChildren();
           setLikeCount(likeCount)
        })
        // firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey).push({likeCount: likeCount})
    }


   
    return (
        <View style={styles.container}>
            <StatusBar style="white" />

            <View style={styles.upperButtonContainer}>
                <TouchableOpacity style={styles.editButton}>                
                    <Text style={styles.editButtonText} onPress={()=>navigation.navigate("EditArticle", {bookKey: bookKey, chapters: chapters, chapterKey: chapterKey})}>편집</Text>
                </TouchableOpacity>  

                <TouchableOpacity style={styles.deleteButton} >
                    <Text style={styles.deleteButtonText} onPress={()=>delArticle()}>삭제</Text>
                </TouchableOpacity>  
            </View>

            <View>
                {renderArticle()}
            </View>
            
            <View style={styles.bottomButtonContainer}>

                <TouchableOpacity style={styles.likeButton} onPress={()=>likeIncrement()}>                
                    <Text style={styles.likeButtonText} >공감</Text>
{/* 
                    const [childCommentNumber, setchildCommentNumber] = useState(0);
                    useEffect(() => {
                                let commentNumber = 0;
                                //  댓글 전체 리스트를 가져온 후 각 댓글의 responseTo가 현제 렌더하는 comment의 _id와 일치하는 갯수
                                Comments.map((el) => {
                                if (el.responseTo === comment._id) {
                                    commentNumber++;
                                }
                                });
                                setchildCommentNumber(commentNumber);
                            }, [Comments]); */}
                </TouchableOpacity>  
                <Text style = {{marginLeft: 10}}> {likeCount} </Text>
                <TouchableOpacity style={styles.commentButton}>
                    <Text onPress={()=>{navigation.navigate('Comment',{myitem:myitem, chapters:chapters, navigation:navigation,bookKey:bookKey, chapterTitle:chapterTitle, chapterKey:chapterKey})}}style={styles.commentButtonText}>댓글</Text>
                </TouchableOpacity>  
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