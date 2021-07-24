
import React, { useState, useEffect, useRef  } from 'react'
import {StyleSheet,TouchableWithoutFeedback, RefreshControl
,    View, Text, FlatList,Keyboard, Button, TextInput,ScrollView, TouchableOpacity, SafeAreaView, NativeModules  } from 'react-native'
const { StatusBarManager } = NativeModules

import firebase from 'firebase/app'
import {firebase_db} from '../../firebaseConfig';

import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAvoidingView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import KeyboardDismissView, { dismissKeyboard } from 'react-native-keyboard-dismiss-view';
// import {PullToRefreshView} from "react-native-smooth-pull-to-refresh";


const test = {
    bookKey: ''
  };

const test2 ={
    chapterKey:''
}
const test3={
    chapters:''
}
const test4={
    user_uid:""
}
const test5={
    comments:""
}
const test6={
    commentKey:""
}
const test7 ={
    item:""
}
function Comment({route}) {

    console.log('Comment()');
 
    const [text, setText] = useState("")

    const {bookKey, chapters,myitem, chapterKey} = route.params;
    test.bookKey = bookKey;
    test2.chapterKey = chapterKey;
    test3.chapters=chapters

    const { chapterTitle} = route.params;
    const [commentsNumber, setCommentsNumber] = useState(0);
    const [comments, setComments] = useState([]);
    test5.comments=comments
    const [data,setData] = useState("")
    const [statusBarHeight, setStatusBarHeight] = useState(0);

    
 
    var user = firebase.auth().currentUser;
    var  user_uid
    test4.user_uid=user_uid
    
    if (user != null) {
    
      user_uid = user.uid;  
    }
  
  
    useEffect(() => {
        firebase_db
            .ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/comments/')
            .on('value', (snapshot) => {
                let temp = [];
               //console.log({'temp.length (.)':temp.length});
               //console.log({'comments.length (.)':comments.length});
               
               console.log({snapshot});
               
               snapshot.forEach((child) => {
                   
                    const item = {
                        creator: child.val().creator,
                        regdate: child.val().regdate,
                        text: child.val().text,
                        userID: child.val().userID,
                        // ...child.val(), // 구조 분해 할당: 참고: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%EA%B5%AC%EB%AC%B8
                        
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

    //console.log('comments',comments)

    useEffect(()=>{
        Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
            setStatusBarHeight(statusBarFrameData.height)
          }) : null
    }, []);

    var userID=user_uid.substring(0,6)
    const commentKey = Math.random().toString().replace(".","");
    console.log('어디서 잘못된거니0',commentKey)

    test6.commentKey=commentKey
    console.log('어디서 잘못된거니1',commentKey)


    const onCommentSend = () => {

    
        const regdate = new Date()
       //console.log('숫자열',regdate)// 2021-07-05T11:12:35.972Z

        firebase_db
            .ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/comments/'+ commentKey)
            .set({
                creator: firebase.auth().currentUser.uid,
                text:text,
                regdate:new Date().toString(),
                userID:userID,
            })

        dismissKeyboard()
        console.log('어디서 잘못된거니2',commentKey)

    }

    // const [isRefreshing,seIsRefreshing]=useState(false)

    // const onInnerRefresh=()=> {
        
    //     setIsRefreshing(true)
    
    //     setTimeout(()=> {setIsRefreshing(false)},1500)
    // } 

    return (
    
        <SafeAreaView style={{flex:1, backgroundColor:"pink"}}> 
            <KeyboardAvoidingView behavior="padding" 
            style={{flex:1}}
             keyboardVerticalOffset={statusBarHeight+44} >
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}


                <View style={styles.scroll} >
                {/* <PullToRefreshView
                    minPullDistance={70}
                    pullAnimHeight={70}
                    pullAnimYValues={{from: -50, to: 10}}
                    isRefreshing={isRefreshing}
                    onRefresh={onInnerRefresh()}
                    onTriggerToRefresh={this.onTriggerToRefresh}
                    contentComponent={ */}
                            <ScrollView style={{flex:1}}>
                                            <Text style = {{marginLeft: 10}}> {comments.length} </Text> 

                                            {comments.length == 0 ? (
                                            <View style= {{  justifyContent:"center", alignItems:"center", marginTop:"55%" }}>
                                            <Text style={{fontSize:15}}>댓글을 작성해주세요!!</Text>
                                            </View>
                                            ) : 

                                                comments.map(item => {
                                                // <Text>item.key: {item.key}</Text>
                                                test7.item=item
                                                return(
                                                <ChapterComment
                                                    key={item.key}
                                                    comment={item}
                                                    creator={item.creator}
                                                    text={item.text}
                                                    regdate={item.regdate}
                                                />)
                                                })

                                        }

                            </ScrollView>
                                        {/* }>
                                            
                    </PullToRefreshView> */}

                </View>

                <View style={styles.commentInputBox}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <TextInput
                            placeholder='댓글을 남겨주세요'
                            textAlign='justify'
                            style={styles.commentInput}
                            multiline = {false}
                            onChangeText={(text) => setText(text)} />
                </TouchableWithoutFeedback> 

                {/* <Button title="Dismiss keyboard" onPress={dismissKeyboard} /> */} 
        
                        <TouchableOpacity style={styles.commentSendBox}     
                                          keyboardDismissMode="on-drag"
                                          keyboardShouldPersistTaps='handled'
                                          onPress={() => onCommentSend()}>
                            <Icon name="checkmark-circle-outline" size={30} color="black" style={styles.addIcon}/>
                        </TouchableOpacity>

                </View>


                {/* </TouchableWithoutFeedback> */}
                </KeyboardAvoidingView >

            </SafeAreaView>
        
    )
}




const styles = StyleSheet.create({

    scroll:{
        height:"90%",
        backgroundColor:"blue"
    },
    bookCoverContainer: {
        width:'90%',
        height:400,
        alignSelf:"center",
        backgroundColor:"yellow",
    },

    commentInputBox:{
        flexDirection:"row",
        backgroundColor:"#C4C4C4",
        height:"10%",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5,

    },
    commentInput:{
        width:"85%",
        backgroundColor:"white",
        height:"80%",
        borderRadius:5,
        justifyContent:"center",
        // alignSelf:"center",
        // textAlignVertical : "top" 
        

    },
    commentSendBox:{
        height:30,
        width:30,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:100,
        marginLeft:6
    },
    // commentBox:{
    //     backgroundColor:"gray",
    //     marginBottom:10,
    //     // height:70,
    //     justifyContent:"center",
    //     backgroundColor:"#C4C4C4",
    //     borderRadius:5,
    //     width:"90%",
    //     alignSelf:"center",
    // },
    // commentBox2:{
    //     flexDirection:"row"
    // }

})


const ChapterComment = (props)=> {

    const [likeCount, setLikeCount] = useState(0);
    const [likedUsers, setLikedUsers] = useState([]);
    const { bookKey } = test;
    const { chapterKey } = test2;
    const { chapters } = test3;
    const {user_uid}=test4
    const {comments}=test5
    const {commentKey}=test6
    const {item}=test7
    const {comment}=props;
    const commentKeyforLikes=comment.key
    console.log({commentKeyforLikes})

    console.log('key값확인 item!',item)
    console.log('이거까지RHdhdhdhdhdhdhhdhdhdhhdh',item.key)
    // console.log('어디서 잘못된거니4',commentKey)

    const likeRef = firebase_db.ref(`book/${bookKey}/chapters/` + `chapters/${chapterKey}` + `comments/${commentKeyforLikes}`)    
    //(`book/${bookKey}/chapters/` + chapters.chapterKey + `comments/commentKey`)
    
    console.log('ref확인 bookKey!',bookKey)
    console.log('ref확인 chapters!',chapters)
    console.log('ref확인 chapterKey!',chapterKey)
    console.log('ref확인 comments!',comments)
    console.log('ref확인 comment.key!',comment.key)


    // firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + 'comments/commentKey').set(likes)
    //.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/comments/')
    //'/comments/'+ commentKey

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

        const likes = async ()=>{
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
        //  firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey).child("likeCount").set({"likeCount" : likeCount})
         // likeRef.child(user_uid).set({
         //     user_uid: user_uid,
         //     regdate: new Date().toString(),
         // })
         // likeReload();
         Alert.alert('MyArticle.likeButton.onPress() end');
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
    return(

            <View style={{
                    backgroundColor:"gray",flexDirection:"row",
                    marginBottom:10,
                    justifyContent:"center",
                    backgroundColor:"#C4C4C4",
                    borderRadius:5,
                    width:"90%",
                    alignSelf:"center",}}>

                <View style={{}}>
                    <TouchableOpacity style={{backgroundColor:"yellow"}} onPress={()=>likes()}>
                        <Text>조아요</Text>
                    </TouchableOpacity>
                    <Text> {likeCount} </Text>
                </View>

                <View style={{flexDirection: "column"}}>
                    <Text style={{fontSize:15, marginTop:10,marginBottom:10,marginLeft:60}}>{comment.text}</Text>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{fontSize:11,color:"gray", marginLeft:60,marginBottom:10}}>{comment.userID+'.이별록작가'}</Text>
                        <Text style={{fontSize:11,color:"gray", marginLeft:100}}>{displayedAt(createdAt)}</Text>
                    </View>
                </View>
            </View>
    )
}


export default Comment