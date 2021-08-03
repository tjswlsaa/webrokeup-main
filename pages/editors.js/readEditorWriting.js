import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Dimensions, View, Animated,  Alert, Button, FlatList, Keyboard, ScrollView, TouchableHighlight, StyleSheet, TouchableWithoutFeedback, ImageBackground, KeyboardAvoidingView, Text, TouchableOpacity, TextInput, TouchableOpacityBase } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import Constants from 'expo-constants';
import paper from '../../assets/paper.png';
import EditBook from '../MyPagePages/EditBook';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import KeyboardDismissView, { dismissKeyboard } from 'react-native-keyboard-dismiss-view';
// import Swipeout from 'react-native-swipeout';
// import SwipeToDelete from 'react-swipe-to-delete-component';
// import Swipeable from 'react-native-swipeable-row';
import Swipeable from 'react-native-gesture-handler/Swipeable'
// import DeleteButton from './DeleteButton'


const window = Dimensions.get("window");

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
  const { writingKey } = route.params;
  test1.writingKey=writingKey
 // console.log('포스트키부터확인',writingKey)

  var user = firebase.auth().currentUser;
  var user_uid
  if (user != null) {
    user_uid = user.uid;
  }


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



const likeRef = firebase_db.ref(`editor/${writingKey}/` + '/likes/');

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


  useEffect (()=>{
    let arr = firebase_db.ref(`editor/${writingKey}/` + '/comments/')
    .on('value', (snapshot) => {
       var commentsNumber = snapshot.numChildren();
       setCommentsNumber(commentsNumber)
    })
}, [])


const onCommentSend = () => {

  

  firebase_db
      .ref(`editor/${writingKey}/`+'/comments/'+ commentKey)
      .set({
          creator: firebase.auth().currentUser.uid,
          text:text,
          regdate:new Date().toString(),
          Kregdate:moment(new Date()).format('YYYY년 MM월 DD일'),
          iam: userinfo.iam
      })

  dismissKeyboard()
  text_a.current.clear();


}


const deleteWriting = async()=> {

 const deletefunction=()=>{
  firebase_db
  .ref(`editor/${writingKey}/`)
  .set(null)
  .then(function(){
      Alert.alert("삭제 완료")
    //   navigation.navigate("communityBoard")
 })}
  

  Alert.alert(
    'Alert Title',
    '삭제하겠습니까?',
    [

      {
        text: '취소',
        // onPress: () => console.log('취소되었습니다'),
        style: 'cancel',
      },
      {text: '삭제', onPress: () => deletefunction()},

    ],
    {cancelable: false},
  );

  
 
}


const createdAt= new Date(writing.regdate) //createdAt Mon Jul 05 2021 20:00:26 GMT+0900 (KST) number()함수못쓰나
////console.log('comment.regdate',comment.regdate)
////console.log('createdAt',createdAt)

const displayedAt=(createdAt)=>{
 
    const milliSeconds = new Date()- createdAt
    ////console.log('milliSeconds',milliSeconds)
    ////console.log('new Date()',new Date()) //new Date() 2021-07-05T11:15:46.130Z
    const seconds = milliSeconds / 1000
    if (seconds < 60) return `방금 전`
    const minutes = seconds / 60
    if (minutes < 60) return `${Math.floor(minutes)}분 전`
    const hours = minutes / 60
    if (hours < 24) return `${Math.floor(hours)}시간 전`
    const days = hours / 24
    if (days < 7) return `${Math.floor(days)}일 전`
    const weeks = days / 7
    if (weeks < 5) return `${Math.floor(weeks)}주 전`
    const months = days / 30
    if (months < 12) return `${Math.floor(months)}개월 전`
    const years = days / 365
    return `${Math.floor(years)}년 전`
  }

  return (


      <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{height:450}}>
          {writing.creator==user_uid ? (          <View style={{marginTop:10,flexDirection:"row", height:30,  alignSelf:"flex-end", alignItems:"flex-end"}}>
                <TouchableOpacity style={{ backgroundColor: "#C4C4C4", borderRadius: 5, justifyContent: "center", width:50, height:25}} 
                onPress={()=>navigation.navigate("editWriting", { writingKey: writingKey, text:writing.text, title:writing.title,})}
                >                
                    <Text style={{alignSelf:"center"}}>편집</Text>
                </TouchableOpacity>  
                <TouchableOpacity style={{ backgroundColor: "#C4C4C4", marginLeft:20, marginRight:20, borderRadius: 5, justifyContent: "center", width:50, height:25}} 
               onPress={()=>deleteWriting()}>                
                    <Text style={{alignSelf:"center"}}>삭제</Text>
                </TouchableOpacity> 
            </View> ) :(

<View></View>

            ) }



          <View style={{marginTop:20, marginLeft:10, marginRight:10, backgroundColor:"blue",padding:30, borderRadius:10, justifyContent:"center"}}>
                  <Text style={{marginBottom:10}}>{userinfo.iam}</Text> 
                  <Text>{writing.title}</Text>               
              
                  <Text>{writing.text}</Text>               
                  <Text style={{marginTop:30,alignSelf:"flex-end"}}>{displayedAt(createdAt)}</Text>                 
          </View>

          <View style={{backgroundColor:"pink", flexDirection:"row", alignItems:"center", marginLeft:15, marginTop:10}}>
                <TouchableOpacity style={styles.likeButton} onPress={async ()=>{
                   // console.log('MyArticle.likeButton.onPress()');
                   // console.log({likedUsers});
                    // let meliked = likedUsers.filter(likedppl => likedppl.user_uid = user_uid)
                    let meliked = likedUsers.filter(likedppl => likedppl.user_uid == user_uid)
                     const isMeliked = (meliked > '');
                     const isMeliked2 = ((meliked == '') == false);
                    // console.log("likedUsers: " +likedUsers)
                    // console.log("meliked: " + meliked)
                    // console.log({isMeliked,isMeliked2});
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
                        // console.log ("좋아요 취소")
                         // likeRef.child(user_uid).set(null)
                         await likeRef.child(user_uid).remove();
                         // likeReload();
                         likeRef.on('value', (snapshot) =>{
                            //  var likeCount = snapshot.numChildren();
                             likeCount = snapshot.numChildren();
                             setLikeCount(likeCount)
                         })
                     }
                    // console.log({likeCount});
                    // console.log("여기여기: " + likeCount) 
 
                     firebase_db.ref(`editor/${writingKey}/`).child("likeCount").set({"likeCount" : likeCount})

                     Alert.alert('MyArticle.likeButton.onPress() end');
                }}>                
                            <Icon name="like2" size={20} color="black" style={styles.addIcon}/>

                </TouchableOpacity>  
                <Text style = {{marginLeft: 10}}> {likeCount} </Text>
                <TouchableOpacity style={{marginLeft:15}}>
                  <Icon name="message1" size={20} color="black" style={styles.addIcon}/>
                </TouchableOpacity>
                <Text style = {{marginLeft: 10}}> {commentsNumber} </Text>



                </View>



                 <View style={{backgroundColor:"yellow",}} >

                                            {comments.length == 0 ? (
                                            <View style= {{  justifyContent:"center", alignItems:"center", marginTop:"55%" }}>
                                            <Text style={{fontSize:15}}>댓글을 작성해주세요!!</Text>
                                            </View>
                                            ) : 

                                                comments.map(item => {
                                                // <Text>item.key: {item.key}</Text>
                                                test3.item=item
                                                return(
                                                <WritingComment
                                                    key={item.key}
                                                    comment={item}
                                                    creator={item.creator}
                                                    text={item.text}
                                                    regdate={item.regdate}
                                      
                                                />)
                                                })

                                        } 

                                            

                 </View> 
                 </ScrollView>


                <KeyboardAvoidingView behavior="padding" 
                  style={{flex:1}}
                  keyboardVerticalOffset={120} >

                <View style={{        flexDirection:"row",
                                      backgroundColor:"#C4C4C4",
                                      height:50,
                                      alignItems:"center",
                                      justifyContent:"center",
                                      borderRadius:5,}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <TextInput
                            placeholder='댓글을 남겨주세요'
                            textAlign='justify'
                            style={{        width:"85%",
                                            backgroundColor:"white",
                                            height:"80%",
                                            borderRadius:5,
                                            justifyContent:"center",}}
                            multiline = {true}
                            ref={text_a}
                            onChangeText={(text) => setText(text)} />
                </TouchableWithoutFeedback> 
        
                        <TouchableOpacity style={{        height:30,
                                                          width:30,
                                                          alignItems:"center",
                                                          justifyContent:"center",
                                                          borderRadius:100,
                                                          marginLeft:6}}     
                                          keyboardDismissMode="on-drag"
                                          keyboardShouldPersistTaps='handled'
                                          onPress={() => onCommentSend()}>
                            <Icon name="checkcircleo" size={30} color="black" style={styles.addIcon}/>
                        </TouchableOpacity>

                </View>
                </KeyboardAvoidingView >








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




const WritingComment = (props)=> {

  var user = firebase.auth().currentUser;
  var  user_uid
  
  if (user != null) {
  
    user_uid = user.uid;  
  }

  // const {comment}=props;
  const [likeCount, setLikeCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const {comment}=props;
  const {writingKey}=test1
  const {item}=test3

  // const {user_uid}=test4

 // console.log('얘가 가지고 있는 값',comment)

  const likeRef = firebase_db.ref(`editor/${writingKey}/`  + `/comments/${comment.key}/likes/`)    



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
         // console.log('이게 뜨네',temp);
          setLikedUsers(temp);
      })
  }, [])

 // console.log('이게 들어야 확인해줌',user_uid)

      const likes = async ()=>{
     // console.log('MyArticle.likeButton.onPress()');
      // Alert.alert('MyArticle.likeButton.onPress()');
     // console.log({likedUsers});
      // let meliked = likedUsers.filter(likedppl => likedppl.user_uid = user_uid)
      let meliked = likedUsers.filter(likedppl => likedppl.user_uid == user_uid)
       const isMeliked = (meliked > '');
       const isMeliked2 = ((meliked == '') == false);
      // console.log("likedUsers: " +likedUsers)
      // console.log("meliked: " + meliked)
      // console.log({isMeliked,isMeliked2});
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
          // console.log ("좋아요 취소")
           // likeRef.child(user_uid).set(null)
           await likeRef.child(user_uid).remove();
           // likeReload();
           likeRef.on('value', (snapshot) =>{
              //  var likeCount = snapshot.numChildren();
               likeCount = snapshot.numChildren();
               setLikeCount(likeCount)
           })
       }
      // console.log({likeCount});
      // console.log("여기여기: " + likeCount) 
       // 이전: const [likeCount, setLikeCount] = useState(0);
       // 그러면, setLikeCount를 했으면, 당장에 likeCount도 바뀌어야 하는거 아닌가?
       // 리액트의 특징: state는 한 템포 느리게 변경된다. state는 보통 변수처럼 =로 값으르 바꿀 수 없다. 왜? state는 사실 변수가 아니다.
       // 이후: let likeCount = 0;
       // likeCount는 변수다
       // 값을 바꾸면, 다음 줄에서는 값이 바뀌어있다 (왜? 그것이 변수이니까 (끄덕))
      //  firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey).child("likeCount").set({"likeCount" : likeCount})
       // likeRef.child(user_uid).set({
       //     user_uid: user_uid,
       //     regdate: new Date().toString(),
       // })
       // likeReload();
      //  Alert.alert('MyArticle.likeButton.onPress() end');
      }

  const createdAt= new Date(comment.regdate) //createdAt Mon Jul 05 2021 20:00:26 GMT+0900 (KST) number()함수못쓰나
  ////console.log('comment.regdate',comment.regdate)
  ////console.log('createdAt',createdAt)

  const displayedAt=(createdAt)=>{
   
      const milliSeconds = new Date()- createdAt
      ////console.log('milliSeconds',milliSeconds)
      ////console.log('new Date()',new Date()) //new Date() 2021-07-05T11:15:46.130Z
      const seconds = milliSeconds / 1000
      if (seconds < 60) return `방금 전`
      const minutes = seconds / 60
      if (minutes < 60) return `${Math.floor(minutes)}분 전`
      const hours = minutes / 60
      if (hours < 24) return `${Math.floor(hours)}시간 전`
      const days = hours / 24
      if (days < 7) return `${Math.floor(days)}일 전`
      const weeks = days / 7
      if (weeks < 5) return `${Math.floor(weeks)}주 전`
      const months = days / 30
      if (months < 12) return `${Math.floor(months)}개월 전`
      const years = days / 365
      return `${Math.floor(years)}년 전`
    }


    
  const deleteCommentfunction=async()=>{

  Alert.alert(
    'Alert Title',
    '삭제하겠습니까?',
    [

      {
        text: '취소',
        onPress: () => closeSwipeable(),
        style: 'cancel',
      },
      {text: '삭제', onPress: () => deleteit()},

    ],
    {cancelable: false},
  )

  const deleteit=()=> {
    firebase_db
    .ref(`editor/${writingKey}/`+`/comments/${comment.key}`)        
    .set(null)
    .then(function(){
      Alert.alert("삭제 완료") })
          }

        }

const DeleteButton = () => {


return (
  <TouchableOpacity
      activeOpacity={0.8}
      onPress={()=>deleteCommentfunction()}
      style={styles.button}
  >
      <Text style={styles.text}>
          삭제
      </Text>
  </TouchableOpacity>
)
}

const swipeableRef = useRef(null);

const closeSwipeable = () => {
  swipeableRef.current.close();
}


  return(

<View>

{comment.creator==user_uid ? (   

  <View style={{
    backgroundColor:"pink",
    flexDirection:"row",
    marginBottom:10,
    marginTop:10,

    // backgroundColor:"#C4C4C4",
    borderRadius:5,
    width:"90%",
    alignSelf:"center",}}>



              <Swipeable
                ref={swipeableRef}
              renderRightActions={()=><DeleteButton/>}>
                <View style={{flexDirection:"row"}}>
              <View style={{flexDirection: "column"}}>
                <TouchableOpacity
                          activeOpacity={0.8}
                          // onPress={()=>deleteComment()}
                          // style={{backgroundColor:"pink"}}
                          // style={done ? styles.done : styles.check}
                      >
                    <Text style={{fontSize:15, marginTop:10,marginBottom:10, marginLeft:30, width:200,}}>{comment.text}</Text>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{fontSize:11,color:"gray",marginLeft:30,marginBottom:10}}>{comment.iam}</Text>
                        <Text style={{fontSize:11,color:"gray", marginLeft:70}}>{displayedAt(createdAt)}</Text>
                    </View>
                  </TouchableOpacity>

              </View>

              <View style={{marginLeft:70,justifyContent:"center"}}>
                  <TouchableOpacity onPress={()=>likes()} >
                  <Icon name="like2" size={20} color="black" style={{}} />
                  </TouchableOpacity>
                  <Text> {likeCount} </Text>
              </View>
              </View>
              </Swipeable>
              </View>

  ) : (
    <View style={{
      backgroundColor:"pink",
      flexDirection:"row",
      marginBottom:10,
      marginTop:10,

      // backgroundColor:"#C4C4C4",
      borderRadius:5,
      width:"90%",
      alignSelf:"center",}}>
              <View style={{flexDirection:"row"}}>
              <View style={{flexDirection: "column"}}>
                <TouchableOpacity
                          activeOpacity={0.8}
                          // onPress={()=>deleteComment()}
                          // style={{backgroundColor:"pink"}}
                          // style={done ? styles.done : styles.check}
                      >
                    <Text style={{fontSize:15, marginTop:10,marginBottom:10, marginLeft:30, width:200,}}>{comment.text}</Text>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{fontSize:11,color:"gray",marginLeft:30,marginBottom:10}}>{comment.iam}</Text>
                        <Text style={{fontSize:11,color:"gray", marginLeft:70}}>{displayedAt(createdAt)}</Text>
                    </View>
                  </TouchableOpacity>

              </View>

              <View style={{marginLeft:70,justifyContent:"center"}}>
                  <TouchableOpacity onPress={()=>likes()} >
                  <Icon name="like2" size={20} color="black" style={{}} />
                  </TouchableOpacity>
                  <Text> {likeCount} </Text>
              </View>
              </View>
              </View>


  ) }

  </View>
  )

}
function headerLeft() {

  const {navigation}=test4;

  return (
    <Button
    onPress={()=>{navigation.navigate('editorBoard',{ navigation:navigation})}}   
    title="게시판"
      color="#000"
    />

  );
}


const options = {
  headerLeft,
};

export default {
  component: readEditorWriting,
  options,
};