import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Dimensions, View, Animated,  Image, Alert, Button, FlatList, Keyboard, ScrollView, TouchableHighlight, StyleSheet, TouchableWithoutFeedback, ImageBackground, KeyboardAvoidingView, Text, TouchableOpacity, TextInput, TouchableOpacityBase } from 'react-native';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import { dismissKeyboard } from 'react-native-keyboard-dismiss-view';
// import Swipeout from 'react-native-swipeout';
// import SwipeToDelete from 'react-swipe-to-delete-component';
// import Swipeable from 'react-native-swipeable-row';
import Swipeable from 'react-native-gesture-handler/Swipeable'
// import DeleteButton from './DeleteButton'
import Clover from 'react-native-vector-icons/MaterialCommunityIcons';

import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
const window = Dimensions.get("window");
import Swiper from 'react-native-swiper'

// import {
//   FlatList,
//   RectButton,
//   Swipeable
// } from 'react-native-gesture-handler';

const test1={
  writingKey:""
}

const test3={
  item:""
}
const test4 ={
  navigation :''
}
const readEditorWriting = ({ navigation, route }) => {
  test4.navigation=navigation

  const text_a = useRef(null);
  const { writingKey, list, index } = route.params;
  test1.writingKey=writingKey
 // console.log('포스트키부터확인',writingKey)

  var user = firebase.auth().currentUser;
  var user_uid
  if (user != null) {
    user_uid = user.uid;
  }
  const ScreenHeight = Dimensions.get('window').height   //height
  const ScreenWidth = Dimensions.get('window').width   //height

  const headerHeight = useHeaderHeight();
  const BottomSpace = getBottomSpace()
  const statusBarHeight = getStatusBarHeight();
  const realScreen = ScreenHeight-headerHeight-BottomSpace


  const [writing, setWriting] =useState({
    writingKey:'',
    title:"",
    text:'',
    regdate:'',
    Kregdate:'',
    creator:"",
    iam:"",
  })

  const [userinfo, setUserinfo] = useState([]);

  useEffect(()=>{
    firebase_db.ref(`users/${user_uid}`)
        .on('value', (snapshot) => {
            let userinfo = snapshot.val();
            setUserinfo(userinfo);
        })
}, []);

  const [text, setText] = useState("")
//   const [title, setTitle] = useState("")

  const [likeCount, setLikeCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const [commentsNumber, setCommentsNumber] = useState(0);
  const [comments, setComments] = useState([]);
  test1.comments=comments
  const commentKey = Math.random().toString().replace(".","");

  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    firebase_db.ref(`editor/${writingKey}/` + '/comments/')    
        .on('value', (snapshot) => {
            let temp = [];
           //console.log({'temp.length (.)':temp.length});
           //console.log({'comments.length (.)':comments.length});
           
          // console.log({snapshot});
           
           snapshot.forEach((child) => {
               
                const item = {
                    // creator: child.val().creator,
                    // regdate: child.val().regdate,
                    // text: child.val().text,
                    // userID: child.val().userID,
                    ...child.val(), // 구조 분해 할당: 참고: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%EA%B5%AC%EB%AC%B8
                    
                    key: child.key, // key: for render props (for react)
                };

                temp.push(item); 
                // array, 그러니까 리스트 맨 끝에 아이템을, 엘리먼트를, 하나 추가한다.
                // 그냥 snapshot쓰면 안 되나요? 왜 하나하나씩 forEach()로 받아서, 이렇게 또 push()해주고 있나요?
                // snapshot 이게, array, 그러니까 리스트가 아니라.. javascript object로 되어 있는데,
                // 아마도? firebase가 이걸 forEach와 val()로 편히 가져올 수 있도록 이렇게 저렇게 준비를 잘 해준 것 같다.
                // 근데 우리는 이 val()말고도, key가 필요하고,
                // firebase에 의하면, 이걸 얻고 싶으면 .key로 (=key property로) 가져와야 한다.
                // 그래서, 위에서 item을 빚어서, 그걸 push하고 있다.
            });

            temp.sort(function (a, b) {
                return new Date(b.regdate) - new Date(a.regdate);
            });

           //console.log({'temp.length (..)':temp.length});
            ////console.log({temp});
            setComments(temp);

           //console.log({'comments.length (..)':comments.length});
            ////console.log('data',data)
        });
}, []);

console.log('포스트컨멘트',comments)


  useEffect(() => {
        firebase_db.ref(`editor/${writingKey}`)
            .on('value', (snapshot) => {
                const newWriting = snapshot. val()
                setWriting({...writing,
                ...newWriting})
            })
    }, []) 












  return (


      <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{backgroundColor:"white"}}>

      <Swiper
                                                        // index={myBook.bookKey}
                                                        loop={false}
                                                        index={index}
                                                        showsPagination={false}
                                                        onSwiper={setSwiper}
                                                        showsButtons={true}
                                                        nextButton={<Text style={{        color: "#f5f5f5",
                                                        fontSize: 40,}}>›</Text>}
                                                        prevButton={<Text style={{        color: "#f5f5f5",
                                                        fontSize: 40,        transform: [{rotate:"180deg"}],
                                                    }}>›</Text>}
                                                       
                                                    >
                                                    
                                                        {list.map(item => {
                                                            test4.item=item
                                                            return (
                                                            <View>

                                                                <ChapterItem 
                                                                navigation={navigation}
                                                                writing={item}/>
                                                            
                                                                
                                                            </View>
                                                            )
                                                        })}

                                          

                                                    </Swiper>


        

  
                 </ScrollView>










      </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  bookBackgroundImage: {
    height: "100%",
    resizeMode: "cover",
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

  saveButtonText: {
    marginLeft: "15%",
    fontSize: 14,
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#FE5746',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:"center"
},
text: {
    color: '#FFFFFF'
}

})



function ChapterItem (props) {

  const { navigation, writing, } = props;
  const ScreenHeight = Dimensions.get('window').height   //height
  const ScreenWidth = Dimensions.get('window').width   //height

  const headerHeight = useHeaderHeight();
  const BottomSpace = getBottomSpace()
  const statusBarHeight = getStatusBarHeight();
  const realScreen = ScreenHeight-headerHeight-BottomSpace

  var user = firebase.auth().currentUser;
  var user_uid
  if (user != null) {
    user_uid = user.uid;
  }
  
  const [likeCount, setLikeCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
const likeRef = firebase_db.ref(`editor/${writing.writingKey}/` + '/likes/');

useEffect (()=>{
    // let temp = [];
    let arr = likeRef
    .on('value', (snapshot) => {
        let temp = [];
        var likeCount = snapshot.numChildren();
       // console.log('useEffect()');
       // console.log({likeCount});
        setLikeCount(likeCount)
        //// console.log(likeCount)
        snapshot.forEach((child) => {
            temp.push(child.val());
        })
       // console.log({temp});
        setLikedUsers(temp);
    })
}, [])

const [cloverColor, setCloverColor] = useState("#c1c1c1")

useEffect(()=>{
  let meliked = likedUsers.filter(likedppl => likedppl.user_uid == user_uid)
  if (meliked == '') {
      // console.log("likedUsers: " + likedUsers)
      setCloverColor("#c1c1c1")
  } else {
      // console.log("likedUsers: " + likedUsers)
      setCloverColor("green")
  }
}, [likedUsers])

return(
  <View style={{height:realScreen*1}}>
<ScrollView style={{backgroundColor:"white", height:realScreen*1}}>
                  <Image style={{height:realScreen*0.4, width:"100%",}} source={{uri:writing.image}}></Image>
                  <View style={{backgroundColor:"#F5F5F5"}}>
                  <Text style={{marginLeft:"5%", fontSize:20, marginVertical:"5%",marginHorizontal:"5%",}}>{writing.title}</Text>               
                    <View style={{  flexDirection: "row", alignItems: "center", marginLeft: "5%", marginBottom:"5%"}}>
                      <TouchableOpacity style={styles.likeButton} onPress={async () => {
                        let meliked = likedUsers.filter(likedppl => likedppl.user_uid == user_uid)
                        const isMeliked = (meliked > '');
                        const isMeliked2 = ((meliked == '') == false);
                        let likeCount = 0;
                        if (meliked == '') {
                          await likeRef.child(user_uid).set({
                            user_uid: user_uid,
                            regdate: new Date().toString(),
                          });
                          // likeReload();
                          likeRef.on('value', (snapshot) => {
                            //  var likeCount = snapshot.numChildren();
                            likeCount = snapshot.numChildren();
                            setLikeCount(likeCount)
                          })
                          await setCloverColor("green")
                        } else {
                          // console.log ("좋아요 취소")
                          // likeRef.child(user_uid).set(null)
                          await likeRef.child(user_uid).remove();
                          // likeReload();
                          likeRef.on('value', (snapshot) => {
                            //  var likeCount = snapshot.numChildren();
                            likeCount = snapshot.numChildren();
                            setLikeCount(likeCount)
                          })
                          await setCloverColor("#C1C1C1")
                        }
                        firebase_db.ref(`editor/${writing.writingKey}/`).child("likeCount").set({ "likeCount": likeCount })
                      }}>
                        <Clover name="clover" size={18} color={cloverColor} style={styles.addIcon} />
                      </TouchableOpacity>
                      <Text style={{ marginLeft: 5 }}> {likeCount} </Text>
                      {/* <TouchableOpacity style={{marginLeft:15}}>
                                    <Icon name="message1" size={20} color="black" style={styles.addIcon}/>
                                  </TouchableOpacity>
                                  <Text style = {{marginLeft: 10}}> {commentsNumber} </Text> */}
                      <Text style={{marginLeft:"5%", color:"grey"}}>{writing.Kregdate}</Text>                 
                      </View>
                    </View>
                  <Text style={{marginLeft:"5%", fontSize:15, marginVertical:"5%", marginHorizontal:"5%", lineHeight:23}}>{writing.text}</Text>               
          </ScrollView>
          </View>
)
}




export default readEditorWriting;