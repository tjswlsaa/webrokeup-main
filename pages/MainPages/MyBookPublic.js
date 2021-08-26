import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView, Button, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app'
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';
import Clover from 'react-native-vector-icons/MaterialCommunityIcons';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import BookComponent from '../../components/BookComponent';

const test3 = {
    navigation: ''
}

const MyBookPublic = ({ navigation, route }) => {
    test3.navigation = navigation


    // const { myitem, bookKey } = route.params;
    const { bookKey } = route.params;
    console.log("bookKey",bookKey)
    const [myitem, setMyitem] = useState({
        bookKey: '',
        bookTitle: '',
        chapters: {},
        intro: '',
        regdate: '',
        url: '',
        user_uid: '',
    });
    
    useEffect(getMyItem, []);
    function getMyItem() {
        //console.log('getMyItem()');
        // bookKey-> myitem
        firebase_db
            .ref(`/book/${bookKey}`)
            .on('value', (snapshot) => {
                const newMyitem = {};
                snapshot.forEach((child) => {
                    const key = child.key;
                    const value = child.val();
                    newMyitem[key] = value; // 우리가 잘 아는 javascript object가 된다!
                });
                setMyitem({
                    ...myitem, // 기본 바탕색
                    ...newMyitem, // 덧칠
                });
            });
    }
    console.log("mybookuseruid",myitem.user_uid)

    const firstColor= "#9E001C"
    const secondColor="#F6AE2D"
    const thirdColor = "#33658A"
    const fourthColor= "#494949"

    function getColor(bookKey) {
        if (bookKey.indexOf('1') == 0){
        return firstColor
        }
        else if (bookKey.indexOf('2') == 0){
        return secondColor
        }
        else if (bookKey.indexOf('3') == 0){
        return thirdColor
        }
        else if (bookKey.indexOf('4') == 0){
        return fourthColor
        }
    }
    const Color = getColor(bookKey);
    console.log("mybook Color", Color)

    function getBookNameStart(bookKey) {
        if (bookKey.indexOf('1') == 0){
        return "빨간색 감정은"
        }
        else if (bookKey.indexOf('2') == 0){
        return "노란색 감정은"
        }
        else if (bookKey.indexOf('3') == 0){
        return "파란색 감정은"
        }
        else if (bookKey.indexOf('4') == 0){
        return "검은색 감정은"
        }
    }
    const BookNameStart = getBookNameStart(bookKey);
    console.log("mybook Color", BookNameStart)

    const user = firebase.auth().currentUser;
    var user_uid
    if (user != null) { user_uid = user.uid }
    const headerHeight = useHeaderHeight();
    const ScreenWidth = Dimensions.get('window').width  //screen 너비
    const ScreenHeight = Dimensions.get('window').height   //height
    const BottomSpace = getBottomSpace()
    const tabBarHeight = 0;
    const statusBarHeight = getStatusBarHeight()
    const realScreen = ScreenHeight - headerHeight - BottomSpace - tabBarHeight

    const [userinfo, setUserinfo] = useState({
        iam: "익명의.지은이",
        selfLetter: "안녕하세요 익명의 지은이입니다."
      });

      useEffect(()=> {
        function getUserId() {
          firebase_db.ref(`users/${myitem.user_uid}`)
              .on('value', (snapshot) => {
                  let user = snapshot.val();
                  if (user) {
                    setUserinfo(userinfo);
              }})
        }
      }, []);

      const { iam, selfLetter } = useState;


    const [chapter, setChapter] = useState([]);

    useEffect(getChapters, []);
    function getChapters() {
        firebase_db
            .ref(`book/${bookKey}/both/`)
            .on('value', (snapshot) => {
                let temp = [];
                //console.log({'temp.length (.)':temp.length});
                //console.log({'comments.length (.)':comments.length});
                snapshot.forEach((child) => {
                    const item = {
                        ...child.val(), // 구조 분해 할당: 참고: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%EA%B5%AC%EB%AC%B8
                        key: child.key,
                    };
                    temp.push(item);
                });
                temp.sort(function (a, b) {
                    return new Date(a.regdate) - new Date(b.regdate);
                });
                setChapter(temp);
            })
    }

    console.log("getChapters11",chapter)
    const arraychapter= Object.values(chapter)
    // console.log("getChapters22",arraychapter)
    // console.log("getChapters",chapter.isPublic)
    // const myBookFiltered = myBook.filter(filteredMyBook => filteredMyBook.user_uid == user_uid)   
    const myChapterFiltered = arraychapter.filter(filteredMyChapter => filteredMyChapter.isPublic==true)
    // console.log("myChapterFiltered",myChapterFiltered)
    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: "#fbfbfb" }}>
                <View style={{backgroundColor:"#F5F4F4"}}>


                            <View style={{ height: realScreen * 0.35, width: realScreen * 0.33, alignSelf: "center", }}>
                                <View style={{ flex: 1 }}>
            
                                        <TouchableOpacity style={{ flexDirection: "row", height:ScreenHeight*0.3,width: ScreenWidth * 0.25,marginLeft:"10%", marginTop:"15%" }}>

                                        <View style={{ backgroundColor:Color, opacity: 0.8, height: realScreen * 0.30, width: ScreenWidth * 0.04, zIndex: 1 }}>
                                        </View>

                                        <View style={{ backgroundColor: "#c5c5c5",zIndex: 0, position: "absolute", marginLeft: ScreenWidth * 0.025, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center" }}>
                                            <Image source={{uri: myitem.url}} style={{zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center"}}></Image>
                                            <View style={{ backgroundColor: "white", height: realScreen * 0.22, width: ScreenWidth * 0.27, }}>
                                                <Text style={{ marginTop: "30%", marginLeft: "10%" }}>{BookNameStart}</Text>
                                                <Text style={{ marginTop: "5%", marginLeft: "10%", fontWeight: "500" }}>{myitem.bookTitle}</Text>

                                                <Text style={{marginTop:"20%", marginLeft:"10%", fontSize:10}}>{userinfo.iam}</Text>
                                            </View>
                                        </View>
                                        </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ height: realScreen * 0.15 }}>
                            
                                    
                                        <View style={{ backgroundColor: "#f5f5f5", width: "96%", height: "100%", alignSelf: "center", marginTop: "5%" }}>
                                            <View>
                                                <TouchableOpacity onPress={()=> navigation.navigate('MyPage',{bookKey:bookKey})}>
                                                <Text style={{ color: "#21381c", fontSize: 15, fontWeight: "700", textAlign: "center" }}>{userinfo.iam}</Text>
                                                </TouchableOpacity>
                                                <Text style={{ color: "#21381c", fontSize: 15, marginTop: "2%", textAlign: "center" }} numberOfLines={2}>{userinfo.selfLetter}</Text>
                                            </View>
                                        </View>
                            </View>
                </View>
                <View style={{ backgroundColor: "#fafafa", marginHorizontal: "1%"}}>
                    <View style={{ marginHorizontal: "3%"}}>
                        <TouchableOpacity style={{ marginVertical: "1%", marginTop: "2%", backgroundColor: "#e9e9e9", height: realScreen * 0.14 }} onPress={() => { navigation.navigate('readIntroArticle', { myitem: myitem, chapters: myitem.chapters, authorUser_uid: myitem.user_uid, intro: myitem.intro, navigation: navigation, bookKey: bookKey, chapterKey: Object.keys(myitem.chapters).toString() }) }}>
                            <Text style={{ marginTop: "5%", marginHorizontal: "6%", fontSize: 15, fontWeight: "600" }} numberOfLines={1}>말머리에서</Text>
                            <Text style={{ marginTop: "3%", marginHorizontal: "6%" }} numberOfLines={2}>{myitem.intro}</Text>
                        </TouchableOpacity>
                    </View>
                    {myChapterFiltered.map(chapters => {

                        return (
                            <MyChapterItem
                                key={chapters.key}
                                navigation={navigation}
                                chapters={chapters}
                                chapterTitle={chapters.chapterTitle}
                                bookKey={bookKey}
                                chapterKey={Object.keys(myitem.chapters).toString()}
                                myitem={myitem}
                            />
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// const MyChapterItem = (props) => { // javascript의 hoisting을 공부해보자! ..인데 사실 얘는 공부를.. 아 나중의 나중에 해봅시다!
// () => {} : arrow function
// Javascript의 가장 강력하고 가장 큰 특징... 중 하나: 함수 또한 값이다.
function MyChapterItem(props) {
    const { navigation, chapters, chapterTitle, myitem, bookKey, chapterKey } = props;
    // console.log('아s가 어렵다',chapters.chapterKey)
    // console.log('이것도 찾나',chapterKey)

    const [likeCount, setLikeCount] = useState(0);
    const [likedUsers, setLikedUsers] = useState([]);
    const [commentsNumber, setCommentsNumber] = useState(0);
    const likeRef = firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/likes/');
    const headerHeight = useHeaderHeight();
    const ScreenWidth = Dimensions.get('window').width  //screen 너비
    const ScreenHeight = Dimensions.get('window').height   //height
    const BottomSpace = getBottomSpace()
    const tabBarHeight = 0;

    const statusBarHeight = getStatusBarHeight()
    const realScreen = ScreenHeight - headerHeight - BottomSpace - tabBarHeight

    console.log("chapters2222222",chapters)

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
    }, [])

    useEffect(() => {
        let arr = firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/comments/')
            .on('value', (snapshot) => {
                var commentsNumber = snapshot.numChildren();
                setCommentsNumber(commentsNumber)
            })
    }, [])
    return (
        <View style={{marginHorizontal: "3%", height: realScreen*0.18, backgroundColor: "#fff", marginVertical: "1%"}}>
            <TouchableOpacity style={{marginTop: "3%", marginHorizontal: "3%", marginBottom: "5%",}} onPress={() => { navigation.navigate('MyArticle', {  navigation: navigation, bookKey: bookKey, chapterKey: chapters.chapterKey }) }}>
                <View style={{height: realScreen*0.12}}>
                    <Text style={{fontSize: 15, fontWeight: "600", marginHorizontal: "3%",}} numberOfLines={1}>{chapters.chapterTitle}</Text>
                    <Text style={{fontSize: 14, marginTop: "3%", marginHorizontal: "3%",}} numberOfLines={3}>{chapters.mainText}</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: "2%"}}>
                    <View style={{flex: 2, flexDirection: "row", marginLeft: "3%"}}>
                        <Clover name="clover" size={16} color="green" style={{marginLeft: "3%"}}/>
                        <Text style={{fontSize: 11, marginLeft: "5%", marginTop: "2%",}}>{likeCount}</Text>
                        <Icon name="message1" size={15} color="black" style={{ marginLeft: 20}} />
                        <Text style={{fontSize: 11, marginLeft: "5%", marginTop: "2%"}}>{commentsNumber}</Text>
                    </View>
                    <Text style={{flex: 1, fontSize: 11, alignSelf:"flex-end"}}>{chapters.Kregdate}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    bookCoverContainer: {
        width: 200,
        height: 200,
        alignSelf: "center",
        flexDirection: "row",
        backgroundColor: "pink"


    },
    bookCoverImage: {
        marginTop: "7%",
        height: 200,
        width: 200,
        alignSelf: "center",
        resizeMode: "contain",
        backgroundColor: "pink"
    },
    bookInfoContainer: {
        backgroundColor: "yellow",
        width: '90%',
        height: 100,
        alignSelf: "center",

    },
    bookTitle: {
        fontSize: 15,
        marginTop: "7%",
        fontSize: 15,
        alignSelf: "center"
    },
    bookDesc: {
        marginTop: "4%",
        marginLeft: "10%",
    },
    subButton: {
        width: "50%",
        height: 27,
        padding: "2%",
        backgroundColor: "#C4C4C4",
        borderRadius: 15,
        margin: "2%",
        marginLeft: "0%",
        marginTop: "5%",
        alignSelf: "center",
    },
    subButtonText: {
        color: "white",
        fontWeight: "200",
        //텍스트의 현재 위치에서의 정렬 
        textAlign: "center"
    },
    bookIndexContainer: {
        backgroundColor: '#fff',
    },
    bookIndexOne: {
        marginTop: "5%",
        marginLeft: "5%",
        marginRight: "3%",
        marginBottom: "5%",
    },
    bookIndexOneTitle: {
        fontSize: 15,
        marginLeft: "3%",

    },
    bookIndexOnePunchLine: {
        fontWeight: '700',
        marginLeft: "3%",
        marginTop: "2%",
    },
    bookIndexText: {
        marginLeft: "5%",
        marginTop: "2%",
    },
    editButton: {
        // backgroundColor:"yellow",
        marginLeft: "80%",
        justifyContent: "center",
        marginTop: 15


    },
    deleteButton: {
        marginLeft: "7%",
        backgroundColor: "blue",
        justifyContent: "center"

    },
    editSection: {
        height: 40,
        // backgroundColor:"green",
        flexDirection: "row",

    },
    editButtonText: {
    }
})
function headerLeft() {
    const { navigation } = test3;
    return (
        <Button
            onPress={() => { navigation.navigate('MyPage', { navigation: navigation }) }}
            title="나의 이별록"
            color="#000"
        />

    );
}

const options = {
    headerLeft,
};

export default {
    component: MyBookPublic,
    options,
};