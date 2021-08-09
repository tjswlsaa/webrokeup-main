import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView, Button, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app'
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';
import { useHeaderHeight } from '@react-navigation/stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import BookComponent from '../../components/BookComponent';

const test3 = {
    navigation: ''
}

const MyBook = ({ navigation, route }) => {
    test3.navigation = navigation

    // const { myitem, bookKey } = route.params;
    const { bookKey } = route.params;
    const [myitem, setMyitem] = useState({
        bookKey: '',
        bookTitle: '',
        chapters: {},
        intro: '',
        regdate: '',
        url: '',
        user_uid: '',
    });
    const user = firebase.auth().currentUser;
    var user_uid
    if (user != null) { user_uid = user.uid }
    const headerHeight = useHeaderHeight();
    const ScreenWidth = Dimensions.get('window').width  //screen 너비
    const ScreenHeight = Dimensions.get('window').height   //height
    const BottomSpace = getBottomSpace()
    const tabBarHeight = useBottomTabBarHeight();
    const statusBarHeight = getStatusBarHeight()
    const realScreen = ScreenHeight - headerHeight - BottomSpace - tabBarHeight


    const [chapter, setChapter] = useState([]);
    const [userinfo, setUserinfo] = useState({
        iam: "익명의.지은이",
        selfLetter: "안녕하세요 익명의 지은이입니다."
    });

    useEffect(getUserId, []);
    function getUserId() {
        firebase_db.ref(`users/${myitem.user_uid}`)
            .on('value', (snapshot) => {
                let userinfo = snapshot.val();
                if (userinfo > '') {
                  setUserinfo(userinfo);
            }})
    }

    let iam = userinfo.iam;
    console.log({iam})
    let selfLetter = userinfo.selfLetter;
    console.log({selfLetter})


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



    useEffect(getChapters, []);
    function getChapters() {
        firebase_db
            .ref(`book/${bookKey}/chapters/`)
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
                //console.log({ temp })
            })
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: "#fbfbfb" }}>
                {myitem.user_uid == user_uid ? (
                    <View style={{ height: realScreen * 0.06 }} onPress={() => navigation.navigate("EditBook", { myitem: myitem, bookKey: bookKey })}>
                        <TouchableOpacity style={{ backgroundColor: "#fff", borderColor: "#21381C", alignSelf: "flex-end", borderWidth: 1.5, borderRadius: 15, marginTop: "3%", marginRight: "5%", width: "20%", height: "60%" }}>
                            <Text style={{ alignSelf: "center", color: "#21381C", marginTop: "3%" }}> 수정하기 </Text>
                        </TouchableOpacity>
                    </View>
                ) : (<View style={{ height: realScreen * 0.06 }}></View>)}
                <View style={{ height: realScreen * 0.4, width: realScreen * 0.33, alignSelf: "center" }}>
                    <View style={{ flex: 1 }}>
                        <BookComponent
                            item={myitem}
                            navigation={navigation}
                        />
                    </View>
                    {/* <Image style={styles.bookCoverImage} source={{ uri: item.url ? item.url : null }}></Image> */}
                </View>
                <View style={{ height: realScreen * 0.15 }}>
                    {/* <Text style={{ fontSize: 17, fontWidth: "700", alignSelf: "center", marginVertical: "5%" }}>{myitem.bookTitle}</Text> */}
                    {myitem.user_uid == user_uid ? (
                        <TouchableOpacity style={{ backgroundColor: "#21381c", width: "40%", height: "25%", marginTop: "7%", alignSelf: "center", borderRadius: 15 }} onPress={() => navigation.navigate("NewPage", { myitem: myitem, chapters: myitem.chapters, chapterKey: Object.keys(myitem.chapters).toString(), bookKey: bookKey })}>
                            <Text style={{ fontSize: 14, alignSelf: "center", color: "#fff", marginTop: "3%" }}>새로운 챕터 만들기</Text>
                        </TouchableOpacity>) :
                        (
                            <View style={{ backgroundColor: "#fafafa", width: "96%", height: "100%", alignSelf: "center", marginTop: "5%" }}>
                                <View>
                                    <Text style={{ color: "#21381c", fontSize: 17, fontWeight: "700", textAlign: "center" }}>{userinfo.iam}</Text>
                                    <Text style={{ color: "#21381c", fontSize: 15, marginTop: "2%", textAlign: "center" }} numberofLines={2}>{userinfo.selfLetter}</Text>
                                </View>
                            </View>
                        )}
                </View>
                <View style={{ backgroundColor: "#fafafa" }}>
                    <View style={{ marginHorizontal: "3%" }}>
                        <TouchableOpacity style={{ marginVertical: "1%", backgroundColor: "#e9e9e9", height: realScreen * 0.14 }} onPress={() => { navigation.navigate('readIntroArticle', { myitem: myitem, chapters: myitem.chapters, authorUser_uid: myitem.user_uid, intro: myitem.intro, navigation: navigation, bookKey: bookKey, chapterKey: Object.keys(myitem.chapters).toString() }) }}>
                            <Text style={{ marginTop: "3%", marginHorizontal: "3%", fontSize: 15, fontWeight: "600" }} numberOfLines={1}>말머리에서</Text>
                            <Text style={{ marginTop: "3%", marginHorizontal: "3%" }} numberofLines={2}>{myitem.intro}</Text>
                        </TouchableOpacity>
                    </View>
                    {chapter.map(chapters => {

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
        <View>
            <TouchableOpacity style={styles.bookIndexOne} onPress={() => { navigation.navigate('MyArticle', { myitem: myitem, chapters: chapters, navigation: navigation, chapterTitle: chapterTitle, bookKey: bookKey, chapterKey: chapters.chapterKey }) }}>
                <Text style={styles.bookIndexOneTitle} numberOfLines={1}>{chapters.chapterTitle}</Text>
                <Text style={styles.bookIndexOnePunchLine} numberOfLines={3}>{chapters.mainText}</Text>

                <View style={{ flexDirection: "row", marginTop: 10, }}>
                    <Icon name="like2" size={15} color="black" style={{ marginLeft: 20, marginTop: 5 }} />
                    <Text style={styles.bookIndexText}>{likeCount}</Text>
                    <Icon name="message1" size={15} color="black" style={{ marginLeft: 20, marginTop: 5 }} />
                    <Text style={styles.bookIndexText}>{commentsNumber}</Text>
                    <Text style={{ marginLeft: "20%", marginTop: 3 }}>{chapters.Kregdate}</Text>
                </View>
            </TouchableOpacity>
            <View style={{ borderBottomColor: "gray", borderBottomWidth: 1, }} />
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
        marginLeft: "5%",

    },
    bookIndexOnePunchLine: {
        fontWeight: '700',
        marginLeft: "5%",
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
    component: MyBook,
    options,
};