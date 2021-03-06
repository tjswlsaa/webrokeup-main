import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Dimensions, NativeModules, View, Animated, Alert, Button, FlatList, Keyboard, ScrollView, TouchableHighlight, StyleSheet, TouchableWithoutFeedback, ImageBackground, KeyboardAvoidingView, Text, TouchableOpacity, TextInput, TouchableOpacityBase, AsyncStorage } from 'react-native';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';


import { dismissKeyboard } from 'react-native-keyboard-dismiss-view';
// import Swipeout from 'react-native-swipeout';
// import SwipeToDelete from 'react-swipe-to-delete-component';
// import Swipeable from 'react-native-swipeable-row';
import Swipeable from 'react-native-gesture-handler/Swipeable'
// import DeleteButton from './DeleteButton'
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
const { StatusBarManager } = NativeModules
import Clover from 'react-native-vector-icons/MaterialCommunityIcons';

const window = Dimensions.get("window");


const test1 = {
  postKey: ""
}

const test3 = {
  item: ""
}
const test4 = {
  navigation: ''
}
const readPost = ({ navigation, route }) => {
  test4.navigation = navigation

  const text_a = useRef(null);
  const { postKey, postcreator } = route.params;
  test1.postKey = postKey
  console.log("problempostKey", postKey)
  const [post, setPost] = useState({
    postKey: '',
    text: '',
    regdate: '',
    Kregdate: '',
  })

  const defaultTextInputHeight = 40;
  const [textInputHeight, setTextInputHeight] = useState(defaultTextInputHeight);

  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
      setStatusBarHeight(statusBarFrameData.height)
      // console.log('Comment.js');
      // console.log('statusBarFrameData.height: ', statusBarFrameData.height); // SE2: 20, iPhone11: 43
    }) : null
  }, []);
  useEffect(() => {
    firebase_db.ref(`post/${postKey}`)
      .on('value', (snapshot) => {
        const newPost = snapshot.val()
        setPost({
          ...post,
          ...newPost
        })
      })
  }, [])

  const headerHeight = useHeaderHeight();
  const ScreenWidth = Dimensions.get('window').width  //screen ??????
  const ScreenHeight = Dimensions.get('window').height   //height
  const BottomSpace = getBottomSpace()
  const tabBarHeight = 0;
  const realScreen = ScreenHeight - headerHeight - BottomSpace - tabBarHeight
  var user = firebase.auth().currentUser;
  var user_uid
  if (user != null) {
    user_uid = user.uid;
  }

  const [readPostUserinfo, setreadPostUserinfo] = useState({
    iam: "?????????.?????????",
    selfLetter: "??????????????? ????????? ??????????????????."
  })
  console.log("???????????????")
  console.log("post", post)
  console.log('post.creator', postcreator)
  useEffect(() => {
    firebase_db.ref(`users/${postcreator}`)
      .once('value', (snapshot) => {
        let readPostUserinfo = snapshot.val();
        if (readPostUserinfo > '') {
          setreadPostUserinfo(readPostUserinfo);
        }
      })
  }, []);
  console.log('readPostUserinfo', readPostUserinfo)

  console.log('readPostUserinfo.iam', readPostUserinfo.iam)

  const [text, setText] = useState("")
  const [likeCount, setLikeCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const [commentsNumber, setCommentsNumber] = useState(0);
  const [comments, setComments] = useState([]);
  // test1.comments=comments
  const commentKey = Math.random().toString().replace(".", "");


  useEffect(() => {
    firebase_db.ref(`post/${postKey}/` + '/comments/')
      .on('value', (snapshot) => {
        let temp = [];
        //console.log({'temp.length (.)':temp.length});
        //console.log({'comments.length (.)':comments.length});

        // console.log({snapshot});

        snapshot.forEach((child) => {

          const item = {
            creator: child.val().creator,
            regdate: child.val().regdate,
            text: child.val().text,
            // userID: child.val().userID,
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
          return new Date(b.regdate) - new Date(a.regdate);
        });

        //console.log({'temp.length (..)':temp.length});
        ////console.log({temp});
        setComments(temp);

        //console.log({'comments.length (..)':comments.length});
        ////console.log('data',data)
      });
  }, []);

  console.log('??????????????????', comments)

  const [cloverColor, setCloverColor] = useState("#c1c1c1")
  useEffect(() => {
    let meliked = likedUsers.filter(likedppl => likedppl.user_uid == user_uid)
    if (meliked == '') {
      // console.log("likedUsers: " + likedUsers)
      setCloverColor("#c1c1c1")
    } else {
      // console.log("likedUsers: " + likedUsers)
      setCloverColor("green")
    }
  }, [likedUsers])

  const likeRef = firebase_db.ref(`post/${postKey}/` + '/likes/');

  useEffect(() => {
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
  }, [likeCount])


  useEffect(() => {
    let arr = firebase_db.ref(`post/${postKey}/` + '/comments/')
      .on('value', (snapshot) => {
        var commentsNumber = snapshot.numChildren();
        setCommentsNumber(commentsNumber)
      })
  }, [])



  console.log("text>>>>>",text)

  const onCommentSend = async() => {


    console.log("text>>>>>",text)

    if (text == ""){
        Alert.alert("????????? ??????????????????");
        return;
      }
    firebase_db
      .ref(`post/${postKey}/` + '/comments/' + commentKey)
      .set({
        creator: firebase.auth().currentUser.uid,
        text: text,
        regdate: new Date().toString(),
        Kregdate: moment(new Date()).format('YYYY??? MM??? DD???')
      })

    dismissKeyboard()
    text_a.current.clear();


  }


  var alarmKey = Math.random().toString().replace(".", "");

  const alert = async () => {

    const alertfunction = () => {
      firebase_db
        .ref(`alert/${postKey}/`)
        .set({
          user_uid: user_uid,
          regdate: new Date().toString(),
          postKey: postKey
        })
        .then(function () {
          Alert.alert("?????? ??????")
        })
    }
    Alert.alert(
      '??????',
      '?????? ???????????????????',
      [

        {
          text: '??????',
          // onPress: () => console.log('?????????????????????'),
          style: 'cancel',
        },
        { text: '??????', onPress: () => alertfunction() },

      ],
      { cancelable: false },
    );

  }


  const deletePost = async () => {

    const deletefunction = () => {
      firebase_db
        .ref(`post/${postKey}/`)
        .set(null)
        .then(function () {
          Alert.alert("?????? ??????")
          navigation.navigate("communityBoard")
        })
    }


    Alert.alert(
      '??????',
      '??????????????????????',
      [

        {
          text: '??????',
          // onPress: () => console.log('?????????????????????'),
          style: 'cancel',
        },
        { text: '??????', onPress: () => deletefunction() },

      ],
      { cancelable: false },
    );



  }


  const createdAt = new Date(post.regdate) //createdAt Mon Jul 05 2021 20:00:26 GMT+0900 (KST) number()???????????????
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


    <SafeAreaView style={{ flex: 1 }}>

      <KeyboardAvoidingView behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={44 + statusBarHeight} >
        <ScrollView style={{ height: realScreen * 0.83 }}>




          <View style={{ marginTop: 20, marginHorizontal: "5%", backgroundColor: "white", paddingTop: 30, paddingBottom: 15, paddingHorizontal: 30, borderRadius: 10, justifyContent: "center" }}>
            <Text style={{ marginBottom: 10, fontSize: 13, color: "grey" }}>{readPostUserinfo.iam}</Text>
            <Text style={{ fontSize: 17, fontWeight: "600" }}>{post.title}</Text>

            <Text style={{ marginTop: "5%", lineHeight: 23 }}>{post.text}</Text>

            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40, height: realScreen * 0.05}}>
              <TouchableOpacity style={styles.likeButton} onPress={async () => {
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
                // ????????? ?????? likeCount?????? state??? ????????? ???????????? ?????????.. 
                // ???? ?????????????????? let likeCount?????? ????????? ????????? ??? ????????? ???????????? ????????????
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

                // console.log({likeCount});
                // console.log("????????????: " + likeCount) 

                firebase_db.ref(`post/${postKey}/`).child("likeCount").set({ "likeCount": likeCount })

              }}>
                <Clover name="clover" size={18} color={cloverColor} style={styles.addIcon} />

              </TouchableOpacity>
                <Text style={{ marginLeft: realScreen * 0.005 }}> {likeCount} </Text>
              <TouchableOpacity style={{ marginLeft: realScreen * 0.02 }}>
                <Icon name="message1" size={18} color="grey" style={styles.addIcon} />
              </TouchableOpacity>
              <Text style={{ marginLeft: realScreen * 0.005 }}> {commentsNumber} </Text>
              <Text style={{ marginLeft: realScreen * 0.02, color: "grey", fontSize: 12 }}>{displayedAt(createdAt)}</Text>
              {post.creator == user_uid ? (<View style={{}}>

                <TouchableOpacity style={{ flexDirection: "row", marginLeft: realScreen * 0.15, width: 50, height: 25, marginTop: "2%",}}
                  onPress={() => deletePost()}>
                  <Icon name="delete" size={15} color="grey" style={styles.addIcon} />

                  <Text style={{ marginLeft: "6%", marginTop: "3%", color: "grey", fontSize: 14 }}>??????</Text>
                </TouchableOpacity>
              </View>) : (

                <TouchableOpacity style={{ flexDirection: "row", marginLeft: realScreen * 0.15, width: 50, height: 25, marginTop: "2%", }} onPress={() => alert()}>
                  <Icon2 name="alarm-light-outline" size={15} color="black" style={styles.addIcon} />
                  <Text style={{ marginLeft: "6%", marginTop: "3%", color: "grey", fontSize: 14 }}>??????</Text>

                </TouchableOpacity>

              )}


            </View>
          </View>



          <View style={{}} >

            {comments.length == 0 ? (
              <View style={{ justifyContent: "center", alignItems: "center", marginTop: "30%" }}>
                <Text style={{ fontSize: 15 }}>??? ????????? ??????????????????!!</Text>
              </View>
            ) :

              comments.map(item => {
                // <Text>item.key: {item.key}</Text>
                test3.item = item
                return (
                  <ChapterComment
                    key={item.key}
                    comment={item}
                    creator={item.creator}
                    text={item.text}
                    regdate={item.regdate}
                    commentKey={commentKey}

                  />)
              })

            }



          </View>
        </ScrollView>





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
                lineHeight: 23
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
    alignSelf: "center"
  },
  text: {
    color: '#FFFFFF'
  }

})




const ChapterComment = (props) => {


  // const userID=user_uid.substring(0,6)
  // const {comment}=props;
  const [likeCount, setLikeCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const { comment, commentKey } = props;
  const { postKey } = test1
  const { item } = test3
  const { progress, dragX } = props
  // const {user_uid}=test4

  // console.log('?????? ????????? ?????? ???',comment)

  const likeRef = firebase_db.ref(`post/${postKey}/` + `/comments/${comment.key}/likes/`)

  const [userinfo2, setUserinfo2] = useState([]);
  var user = firebase.auth().currentUser;
  var user_uid
  if (user != null) {
    user_uid = user.uid;
  }
  useEffect(() => {
    firebase_db.ref(`users/${comment.creator}`)
      .on('value', (snapshot) => {
        let userinfo2 = snapshot.val();
        setUserinfo2(userinfo2);
      })
  }, []);

  const [cloverColor, setCloverColor] = useState("#c1c1c1")
  useEffect(() => {
    let meliked = likedUsers.filter(likedppl => likedppl.user_uid == user_uid)
    if (meliked == '') {
      // console.log("likedUsers: " + likedUsers)
      setCloverColor("#c1c1c1")
    } else {
      // console.log("likedUsers: " + likedUsers)
      setCloverColor("green")
    }
  }, [likedUsers])
  useEffect(() => {
    // let temp = [];
    firebase_db.ref(`post/${postKey}/` + `/comments/${comment.key}/likes/`)
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
        // console.log('?????? ??????',temp);
        setLikedUsers(temp);
      })
  }, [])

  // console.log('?????? ????????? ????????????',user_uid)

  const likes = async () => {
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
    // ????????? ?????? likeCount?????? state??? ????????? ???????????? ?????????.. 
    // ???? ?????????????????? let likeCount?????? ????????? ????????? ??? ????????? ???????????? ????????????
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
    // console.log({likeCount});
    // console.log("????????????: " + likeCount) 
    // ??????: const [likeCount, setLikeCount] = useState(0);
    // ?????????, setLikeCount??? ?????????, ????????? likeCount??? ???????????? ????????? ??????????
    // ???????????? ??????: state??? ??? ?????? ????????? ????????????. state??? ?????? ???????????? =??? ????????? ?????? ??? ??????. ???? state??? ?????? ????????? ?????????.
    // ??????: let likeCount = 0;
    // likeCount??? ?????????
    // ?????? ?????????, ?????? ???????????? ?????? ??????????????? (???? ????????? ??????????????? (??????))
    //  firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey).child("likeCount").set({"likeCount" : likeCount})
    // likeRef.child(user_uid).set({
    //     user_uid: user_uid,
    //     regdate: new Date().toString(),
    // })
    // likeReload();
    //  Alert.alert('MyArticle.likeButton.onPress() end');
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
        .ref(`post/${postKey}/` + `/comments/${comment.key}`)
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
        style={{ backgroundColor: "#EFEFEF", width: "20%", justifyContent: "center", }}
      >
        {/* <Text style={{justifyContent:"center", alignSelf:"center"}}>
          ??????
      </Text>
      delete */}
        <Icon name="delete" size={20} color="black" style={{ alignSelf: "flex-start", justifyContent: "center", marginLeft: "30%" }} />

      </TouchableOpacity>
    )
  }

  const AlertButton = () => {


    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => alert()}
        style={{ backgroundColor: "#EFEFEF", width: "20%", justifyContent: "center" }}
      >
        <Text style={{ color: "red" }}> ?????? </Text>

        {/* <Icon2 name="alarm-light-outline" size={20} color="black" style={{ alignSelf: "flex-end", justifyContent: "center", marginLeft: "30%", backgroundColor: "#f5f5f5" }} /> */}

      </TouchableOpacity>
    )
  }


  const alert = async () => {
    Alert.alert(
      '??????',
      '?????? ???????????????????',
      [

        {
          text: '??????',
          // onPress: () => console.log('?????????????????????'),
          style: 'cancel',
        },
        { text: '??????', onPress: () => alertfunction() },

      ],
      { cancelable: false },
    );
    const alertfunction = () => {
      firebase_db
        .ref(`alert/${commentKey}/`)
        .set({
          user_uid: user_uid,
          regdate: new Date().toString(),
          commentKey: commentKey,
          // postKey:postKey,
        })
        .then(function () {
          Alert.alert("?????? ??????")
        })
    }


  }



  const swipeableRef = useRef(null);

  const closeSwipeable = () => {
    swipeableRef.current.close();
  }

  const headerHeight = useHeaderHeight();
  const ScreenHeight = Dimensions.get('window').height   //height
  const BottomSpace = getBottomSpace()
  const tabBarHeight = 0
  const statusBarHeight = getStatusBarHeight();
  const realScreen = ScreenHeight - headerHeight - BottomSpace - tabBarHeight;
  const ScreenWidth = Dimensions.get('window').width  //screen ??????


  return (

    <View>

      {comment.creator == user_uid ? (

        <View style={{
          flexDirection: "row",
          marginBottom: 10,
          marginTop: 10,

          backgroundColor: "#EFEFEF",
          borderRadius: 5,
          width: "90%",
          alignSelf: "center",
        }}>



          <Swipeable
            ref={swipeableRef}
            renderRightActions={() => <DeleteButton />}>
            <View style={{ flexDirection: "row", width: ScreenWidth * 0.9, alignSelf: "center" }}>


              <View style={{ flexDirection: "column", width: ScreenWidth * 0.7 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                // onPress={()=>deleteComment()}
                // style={{backgroundColor:"pink"}}
                // style={done ? styles.done : styles.check}
                >
                  <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10, marginLeft: 30, width: 200, }}>{comment.text}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 11, color: "gray", marginLeft: 30, marginBottom: 10 }}>{userinfo2.iam}</Text>
                    <Text style={{ fontSize: 11, color: "gray", marginLeft: 10, marginBottom: 10 }}> ?????? {likeCount} </Text>
                    <Text style={{ fontSize: 11, color: "gray", marginLeft: 10 }}>{displayedAt(createdAt)}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ marginLeft: "10%", flexDirection: "row" }}>
                <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => likes()} >
                  <Clover name="clover" size={20} color={cloverColor} style={{}} />
                </TouchableOpacity>
              </View>
            </View>
          </Swipeable>
        </View>

      ) : (

        <View style={{
          backgroundColor: "#EFEFEF",
          flexDirection: "row",
          marginBottom: 10,
          marginTop: 10,

          // backgroundColor:"#C4C4C4",
          borderRadius: 5,
          width: "90%",
          alignSelf: "center",
        }}>
          <Swipeable
            ref={swipeableRef}
            renderRightActions={() => <AlertButton />}>
            <View style={{ flexDirection: "row", width: ScreenWidth * 0.9 }}>


              <View style={{ flexDirection: "column", width: ScreenWidth * 0.7 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                // onPress={()=>deleteComment()}
                // style={{backgroundColor:"pink"}}
                // style={done ? styles.done : styles.check}
                >
                  <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10, marginLeft: 30, width: 200, }}>{comment.text}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 11, color: "gray", marginLeft: 30, marginBottom: 10 }}>{userinfo2.iam}</Text>
                    <Text style={{ fontSize: 11, color: "gray", marginLeft: 10, marginBottom: 10 }}> ?????? {likeCount} </Text>
                    <Text style={{ fontSize: 11, color: "gray", marginLeft: 10 }}>{displayedAt(createdAt)}</Text>
                  </View>
                </TouchableOpacity>

              </View>

              <View style={{ marginLeft: "10%", flexDirection: "row" }}>
                <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => likes()} >
                  <Clover name="clover" size={20} color={cloverColor} style={{}} />
                </TouchableOpacity>
              </View>
            </View>
          </Swipeable>
        </View>


      )}

    </View>
  )

}
function headerLeft() {

  const { navigation } = test4;

  return (
    <Button
      onPress={() => { navigation.navigate('communityBoard', { navigation: navigation }) }}
      title="?????????"
      color="#000"
    />

  );
}


const options = {
  headerLeft,
};

export default {
  component: readPost,
  options,
};