
import React, { useState, useEffect, useRef } from 'react'
import {
    StyleSheet, TouchableWithoutFeedback, RefreshControl,
    View, Text, FlatList, Keyboard, Button, TextInput, ScrollView, Dimensions, TouchableOpacity, SafeAreaView, NativeModules, Alert
} from 'react-native'
const { StatusBarManager } = NativeModules
import firebase from 'firebase/app'
import { firebase_db } from '../../firebaseConfig';
import { useScrollToTop } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import KeyboardDismissView, { dismissKeyboard } from 'react-native-keyboard-dismiss-view';
// import {PullToRefreshView} from "react-native-smooth-pull-to-refresh";
import Icon from 'react-native-vector-icons/AntDesign';
import Clover from 'react-native-vector-icons/MaterialCommunityIcons';


import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { useKeyboard } from '@react-native-community/hooks'
import Swipeable from 'react-native-gesture-handler/Swipeable'


const test = {
    bookKey: ''
};

const test2 = {
    chapterKey: ''
}

const test4 = {
    user_uid: ""
}
const test5 = {
    comments: ""
}
const test6 = {
    commentKey: ""
}
const test7 = {
    item: ""
}

function Comment({ navigation, route }) {
    const keyboard = useKeyboard()

    console.log('keyboard isKeyboardShow: ', keyboard.keyboardShown)
    console.log('keyboard keyboardHeight: ', keyboard.keyboardHeight)

    // console.log('Comment()');

    const [text, setText] = useState("")

    const { bookKey, chapterKey } = route.params;
    test.bookKey = bookKey;
    test2.chapterKey = chapterKey;

    const { chapterTitle } = route.params; textInputHeight
    const [comments, setComments] = useState([]);
    const [commentsCount, setCommentsCount] = useState(0);
    test5.comments = comments
    const [data, setData] = useState("")
    const [statusBarHeight, setStatusBarHeight] = useState(0);
    const defaultTextInputHeight = 40;
    const [textInputHeight, setTextInputHeight] = useState(defaultTextInputHeight);

    //     const realHeight = Dimensions.get('window').height - getStatusBarHeight()- getBottomSpace()-135-10

    var user = firebase.auth().currentUser;
    var user_uid
    test4.user_uid = user_uid

    if (user != null) {

        user_uid = user.uid;
    }

    console.log({ statusBarHeight })

    useEffect(() => {

        firebase_db
            .ref(`book/${bookKey}/both/` + chapterKey + '/comments/')
            .on('value', (snapshot) => {
                let temp = [];
                //console.log({'temp.length (.)':temp.length});
                //console.log({'comments.length (.)':comments.length});
                var commentsCount = snapshot.numChildren();
                setCommentsCount(commentsCount)

                snapshot.forEach((child) => {

                    const item = {
                        creator: child.val().creator,
                        regdate: child.val().regdate,
                        text: child.val().text,
                        userID: child.val().userID,
                        // ...child.val(), // ?????? ?????? ??????: ??????: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%EA%B5%AC%EB%AC%B8

                        key: child.key, // key: for render props (for react)
                    };

                    temp.push(item);
                    // array, ???????????? ????????? ??? ?????? ????????????, ???????????????, ?????? ????????????.
                    // ?????? snapshot?????? ??? ?????????? ??? ??????????????? forEach()??? ?????????, ????????? ??? push()????????? ??????????
                    // snapshot ??????, array, ???????????? ???????????? ?????????.. javascript object??? ?????? ?????????,
                    // ?????????? firebase??? ?????? forEach??? val()??? ?????? ????????? ??? ????????? ????????? ????????? ????????? ??? ?????? ??? ??????.
                    // ?????? ????????? ??? val()?????????, key??? ????????????,
                    // firebase??? ?????????, ?????? ?????? ????????? .key??? (=key property???) ???????????? ??????.
                    // ?????????, ????????? item??? ?????????, ?????? push?????? ??????.
                    
                });

                temp.sort(function (a, b) {
                    return new Date(a.regdate) - new Date(b.regdate);
                })

                //console.log({'temp.length (..)':temp.length});
                ////console.log({temp});
                setComments(temp);
                
                //console.log({'comments.length (..)':comments.length});
                ////console.log('data',data)
            });
    }, [commentsCount]);

    // console.log('comments?????? ?????????!!!!!!!!',comments)

    useEffect(() => {
        Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
            setStatusBarHeight(statusBarFrameData.height)
            // console.log('Comment.js');
            // console.log('statusBarFrameData.height: ', statusBarFrameData.height); // SE2: 20, iPhone11: 43
        }) : null
    }, []);

    const commentKey = Math.random().toString().replace(".", "");

    test6.commentKey = commentKey
    const text_a = useRef(null);

    // useEffect(()=>{
    //     firebase_db
    //         .ref(`book/${bookKey}/both/${chapterKey}/comments`)
    //         .on('value', (snapshot) => {
    //             commentsCount=snapshot.numChildren()
    //             setCommentsCount(commentsCount)
    //             console.log("commentsCount fb : " + commentsCount)
    //         })
    // }, [])


    const onCommentSend = async () => {
        const regdate = new Date()
        //console.log('?????????',regdate)// 2021-07-05T11:12:35.972Z

        if (text == ""){
            Alert.alert("????????? ??????????????????");
            return;
          }
        firebase_db
            .ref(`book/${bookKey}/both/` + chapterKey + '/comments/' + commentKey)
            .set({
                creator: firebase.auth().currentUser.uid,
                text: text,
                regdate: new Date().toString(),
            })

        let commentsCount = 0;
        firebase_db
            .ref(`book/${bookKey}/both/` + chapterKey + '/comments/')
            .on('value', (snapshot) => {
                commentsCount = snapshot.numChildren();
                setCommentsCount(commentsCount)
            })


        firebase_db
            .ref(`book/${bookKey}/both/${chapterKey}/`)
            .child('commentsCount')
            .set(commentsCount)

        await dismissKeyboard()
        text_a.current.clear();
    }


    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
            <KeyboardAvoidingView behavior="padding"
                style={{ flex: 1 }}
                // keyboardVerticalOffse??? ????????? ?????? 
                // ????????? ?????? ??????: ??????, ?????? ??????: ????????? ??????????????? 
                // B. ?????? ??????: ??????, ?????? ??????: ?????? ????????????

                // keyboardVerticalOffset={30 + statusBarHeight} 
                // ?????? ??????: ??????, ?????? ??????: ??? ??????
                // B. ?????? ??????: ??????, ?????? ??????: ??? ??????


                // keyboardVerticalOffset={statusBarHeight} 
                // ?????? ??????: ??????, ?????? ??????: ?????? ?????????
                // B: ?????? ??????: ??????, ?????? ??????: ?????? ?????? ?????????

                // keyboardVerticalOffset={30}
                // A(SE2): ?????? ??????: ??????, ?????? ??????: ?????? ????????? ??????! <- BEST!!
                // B(11): ?????? ??????: ??????, ?????? ??????: 1/4???? ???????????????

                // keyboardVerticalOffset={54} // 11: ?????? ?????????, ???????????????, 54??? ?????????!
                keyboardVerticalOffset={10 + statusBarHeight}

            >

                {/* keyboardVerticalOffset={statusBarHeight+14} > */}
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                <TouchableOpacity style={{ flex: 1, marginTop: "3%", marginLeft: "3%" }} onPress={() => navigation.goBack()}>
                    <Icon name="arrowleft" size="25" color="black" />
                </TouchableOpacity>


                <View style={{ flex: 14,  }} >

                    <ScrollView style={{ flex: 1 }}>
                        {/* <Text style = {{marginLeft: 10}}> {comments.length} </Text>  */}

                        {comments.length == 0 ? (
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: "55%" }}>
                                <Text style={{ fontSize: 15 }}>????????? ??????????????????</Text>
                            </View>
                        ) :

                            comments.map(item => {
                                // <Text>item.key: {item.key}</Text>
                                test7.item = item
                                return (
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

                <View style={{
                    flexDirection: "row",
                    backgroundColor: "#e9e9e9",
                    // height: 50, 
                    height: (textInputHeight + 10),
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <TextInput
                            placeholder="????????? ???????????????"
                            returnKeyType="done"
                            style={{
                                width: "85%",
                                backgroundColor: "white",
                                // height: "80%",
                                height: textInputHeight,
                                borderRadius: 10,
                                justifyContent: "center",
                                lineHeight:23
                            }}
                            ref={text_a}
                            multiline={true}
                            onChangeText={(text) => setText(text)}
                            onContentSizeChange={(e) => {
                                const textInputHeight = Math.max(e.nativeEvent.contentSize.height, defaultTextInputHeight);
                                setTextInputHeight(textInputHeight);
                            }}
                        />
                    </TouchableWithoutFeedback>


                    <TouchableOpacity style={{ height: 30, width: 30, alignItems: "center", justifyContent: "center", borderRadius: 100, marginLeft: 6 }}
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps='handled'
                        onPress={() => onCommentSend()}>
                        <Icon name="checkcircleo" size={30} color="black" style={styles.addIcon} />
                    </TouchableOpacity>

                </View>
                {/* </TouchableWithoutFeedback> */}
            </KeyboardAvoidingView >
        </SafeAreaView>
    )
}




const styles = StyleSheet.create({

    scroll: {
        height: "85%",
    },
    bookCoverContainer: {
        width: '90%',
        height: 400,
        alignSelf: "center",
        backgroundColor: "yellow",
    },

    commentInputBox: {
        flexDirection: "row",
        backgroundColor: "#C4C4C4",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,

    },
    commentInput: {
        width: "85%",
        backgroundColor: "white",
        height: "80%",
        borderRadius: 10,
        justifyContent: "center",
        paddingTop: 20, paddingBottom: 0,
        textAlignVertical: "center"


        // alignSelf:"center",
        // textAlignVertical : "top" 


    },
    commentSendBox: {
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        marginLeft: 6
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


const ChapterComment = (props) => {


    const [userinfo, setUserinfo] = useState([]);
    var user = firebase.auth().currentUser;
    var user_uid
    if (user != null) {
        user_uid = user.uid;
    }
    useEffect(() => {
        firebase_db.ref(`users/${comment.creator}`)
            .on('value', (snapshot) => {
                let userinfo = snapshot.val();
                setUserinfo(userinfo);
            })
    }, []);




    const [likeCount, setLikeCount] = useState(0);
    const [likedUsers, setLikedUsers] = useState([]);
    const { bookKey } = test;
    const { chapterKey } = test2;
    // const {user_uid}=test4
    const { comments } = test5
    const { commentKey } = test6
    const { item } = test7
    const { comment } = props;
    const commentKeyforLikes = comment.key




    const likeRef = firebase_db.ref(`book/${bookKey}/both/` + chapterKey + `/comments/${comment.key}/likes/`)



    useEffect(() => {
        // let temp = [];
        let arr = likeRef
            .on('value', (snapshot) => {
                let temp = [];
                var likeCount = snapshot.numChildren();

                setLikeCount(likeCount)
                //// console.log(likeCount)
                snapshot.forEach((child) => {
                    temp.push(child.val());
                })
                // console.log('?????? ??????',temp);
                setLikedUsers(temp);
            })
    }, [])

    // console.log('?????? ????????? ????????????',user_uid)
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

    const likes = async () => {

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
            // console.log ("????????? ??????")
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

    }

    const deleteCommentfunction = async () => {

        Alert.alert(
            'Alert Title',
            '??????????????????????',
            [

                {
                    text: '??????',
                    onPress: () => closeSwipeable(),
                    style: 'cancel',
                },
                { text: '??????', onPress: () => deleteit() },

            ],
            { cancelable: false },
        )

        const deleteit = () => {
            firebase_db
                .ref(`book/${bookKey}/both/` + chapterKey + `/comments/${comment.key}/`)
                .set(null)
                .then(function () {
                    Alert.alert("?????? ??????")
                })
        }

    }

    const DeleteButton = () => {


        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => deleteCommentfunction()}
                style={{
                    width: 60,
                    height: 60,
                    backgroundColor: '#f5f5f5',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: "center"
                }} >
        <Icon name="delete" size={20} color="black" style={{justifyContent:"center", }}/>

            </TouchableOpacity>
        )
    }

    const swipeableRef = useRef(null);

    const closeSwipeable = () => {
        swipeableRef.current.close();
    }


    const createdAt = new Date(comment.regdate) //createdAt Mon Jul 05 2021 20:00:26 GMT+0900 (KST) number()???????????????
    ////console.log('comment.regdate',comment.regdate)
    ////console.log('createdAt',createdAt)

    const displayedAt = (createdAt) => {

        const milliSeconds = new Date() - createdAt
        ////console.log('milliSeconds',milliSeconds)
        ////console.log('new Date()',new Date()) //new Date() 2021-07-05T11:15:46.130Z
        const seconds = milliSeconds / 1000
        if (seconds < 60) return `?????? ???`
        const minutes = seconds / 60
        if (minutes < 60) return `${Math.floor(minutes)}??? ???`
        const hours = minutes / 60
        if (hours < 24) return `${Math.floor(hours)}?????? ???`
        const days = hours / 24
        if (days < 7) return `${Math.floor(days)}??? ???`
        const weeks = days / 7
        if (weeks < 5) return `${Math.floor(weeks)}??? ???`
        const months = days / 30
        if (months < 12) return `${Math.floor(months)}?????? ???`
        const years = days / 365
        return `${Math.floor(years)}??? ???`
    }
    return (
        <View style={{ flex: 1, }}>

            {comment.creator == user_uid ? (

                <View style={{
                    flex: 1,
                    backgroundColor: "#f5f5f5",
                    marginTop: "1%",
                    borderRadius: 5,
                    marginHorizontal: "1%"
                }}>

                    <Swipeable
                        ref={swipeableRef}
                        renderRightActions={() => <DeleteButton />}>
                        <View style={{ flex: 1, flexDirection: "row", }}>
                            <View style={{ flex: 6, flexDirection: "column" }}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                // onPress={()=>deleteComment()}
                                // style={{backgroundColor:"pink"}}
                                // style={done ? styles.done : styles.check}
                                >
                                    <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10, marginLeft: 30, width: 250, }}>{comment.text}</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontSize: 11, color: "gray", marginLeft: 30, marginBottom: 10 }}>{userinfo.iam}</Text>
                                        <Text style={{ fontSize: 11, color: "gray", marginLeft: 10, marginBottom: 10 }}> ?????? {likeCount} </Text>
                                        <Text style={{ fontSize: 11, color: "gray", marginLeft: 10 }}>{displayedAt(createdAt)}</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <TouchableOpacity onPress={() => likes()} >
                                    <Clover name="clover" size={20} color={cloverColor} style={{}} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Swipeable>
                </View>

            ) : (
                <View style={{
                    // backgroundColor: "pink",
                    // flexDirection: "row",
                    // marginBottom: 10,
                    // marginTop: 10,

                    // // backgroundColor:"#C4C4C4",
                    // borderRadius: 5,
                    // width: "90%",
                    // alignSelf: "center",
                    flex: 1,
                    backgroundColor: "#f5f5f5",
                    marginTop: "1%",
                    borderRadius: 5,
                    marginHorizontal: "1%"
                }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 6, flexDirection: "column" }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                            // onPress={()=>deleteComment()}
                            // style={{backgroundColor:"pink"}}
                            // style={done ? styles.done : styles.check}
                            >
                                <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10, marginLeft: 30, width: 200, }}>{comment.text}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 11, color: "gray", marginLeft: 30, marginBottom: 10 }}>{userinfo.iam}</Text>
                                    <Text style={{ fontSize: 11, color: "gray", marginLeft: 10, marginBottom: 10 }}> ?????? {likeCount} </Text>
                                    <Text style={{ fontSize: 11, color: "gray", marginLeft: 10 }}>{displayedAt(createdAt)}</Text>

                                </View>
                            </TouchableOpacity>

                        </View>

                        <View style={{ flex: 1,  justifyContent: "center",  }}>
                            <TouchableOpacity onPress={() => likes()} >
                                <Clover name="clover" size={20} color={cloverColor} style={{}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


            )}

        </View>
    )
}


export default Comment