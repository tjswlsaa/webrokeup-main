import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app'
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';
import BookComponent from '../../components/BookComponent';
import { useHeaderHeight } from '@react-navigation/stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';


const test3 = {
    navigation: ''
}
const readBook = ({ navigation, route }) => {
    test3.navigation = navigation
    // const { item, bookKey } = route.params;
    const { bookKey } = route.params;
    const [item, setItem] = useState({
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

    const [userinfo, setUserinfo] = useState([]);
    const [chapter, setChapter] = useState([]);
    const headerHeight = useHeaderHeight();
    const ScreenHeight = Dimensions.get('window').height   //height
    const BottomSpace = getBottomSpace()
    const tabBarHeight = useBottomTabBarHeight();
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight - headerHeight - BottomSpace - tabBarHeight

   
    
    useEffect(getItem, []);
    function getItem() {
        //console.log('getItem()');
        // bookKey-> item
        firebase_db
            .ref(`/book/${bookKey}`)
            .on('value', (snapshot) => {
                const newItem = {};
                snapshot.forEach((child) => {
                    const key = child.key;
                    const value = child.val();
                    newItem[key] = value; // 우리가 잘 아는 javascript object가 된다!
                });
                setItem({
                    ...item, // 기본 바탕색
                    ...newItem, // 덧칠
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

        useEffect(getUserId, [])
        function getUserId(async){
            firebase_db.ref(`users/${item.user_uid}`)
                .on('value', (snapshot) => {
                    let userinfo = snapshot.val();
                    setUserinfo(userinfo);
                })
        }
        // useEffect(() => {
        //     firebase_db.ref(`users/${item.user_uid}`)
        //         .on('value', (snapshot) => {
        //             let userinfo = snapshot.val();
        //             setUserinfo(userinfo);
        //         })
        //         console.log("userinfo is " + userinfo)
        // }, []);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fbfbfb" }}>
            {item.user_uid == user_uid ? (
                <View style={{ height: realScreen * 0.06 }} onPress={() => navigation.navigate("EditBook", { myitem: item, bookKey: bookKey })}>
                    <TouchableOpacity style={{ backgroundColor: "#fff", borderColor: "#21381C", alignSelf: "flex-end", borderWidth: 1.5, borderRadius: 15, marginTop: "3%", marginRight: "5%", width: "20%", height: "60%" }}>
                        <Text style={{ alignSelf: "center", color: "#21381C", marginTop: "3%" }}> 수정하기 </Text>
                        {/* <Icon name="edit" size={25} color="#21381c" style={styles.settingIcon} onPress={() => navigation.navigate("EditBook", { myitem: item, bookKey: bookKey })} /> */}
                    </TouchableOpacity>
                </View>
            ) : (<View style={{ height: realScreen * 0.06 }}></View>)}
            <View style={{ height: realScreen * 0.35 }}>
                <BookComponent
                    item={item}
                    navigation={navigation}
                />
                {/* <Image style={styles.bookCoverImage} source={{ uri: item.url ? item.url : null }}></Image> */}
            </View>
            <View style={{ height: realScreen * 0.2 }}>
                <Text style={{ fontSize: 17, fontWidth: "700", alignSelf: "center", marginVertical: "5%" }}>{item.bookTitle}</Text>
                {item.user_uid == user_uid ? (
                    <TouchableOpacity style={{ backgroundColor: "#21381c", width: "40%", height: "25%", alignSelf: "center", borderRadius: 15 }} onPress={() => navigation.navigate("NewPage", { myitem: item, chapters: item.chapters, chapterKey: Object.keys(item.chapters).toString(), bookKey: bookKey })}>
                        <Text style={{ fontSize: 14, alignSelf: "center", color: "#fff", marginTop: "3%" }}>새로운 챕터 만들기</Text>
                    </TouchableOpacity>) :
                    (
                    <View style={{ backgroundColor:"#fafafa", width: "96%", height: "100%", alignSelf: "center", marginTop: "1%" }}>
                        <View style={{marginVertical: "2%"}}>
                            <Text style={{color: "#21381c", fontWeight: "700", textAlign: "center"}}>{userinfo.iam}</Text>
                            <Text style={{color: "#21381c", marginTop: "1%", textAlign: "center"}} numberofLines={2}>{userinfo.selfLetter}</Text>
                        </View>
                    </View>
                    )}
            </View>
            <View style={{ backgroundColor: "#fafafa" }}>
                <View style={{ marginHorizontal: "3%" }}>
                    <TouchableOpacity style={{ marginVertical: "1%", backgroundColor: "#e9e9e9", height: realScreen * 0.14 }} onPress={() => { navigation.navigate('readIntroArticle', { myitem: item, chapters: item.chapters,authorUser_uid:item.user_uid,  intro: item.intro, navigation: navigation, bookKey: bookKey, chapterKey: Object.keys(item.chapters).toString() }) }}>
                        <Text style={{ marginTop: "3%", marginHorizontal: "3%", fontSize: 15, fontWeight: "600" }} numberOfLines={1}>말머리에서</Text>
                        <Text style={{ marginTop: "3%", marginHorizontal: "3%"}} numberofLines={2}>{item.intro}</Text>
                    </TouchableOpacity>
                </View>
                {chapter.map(chapters => {
                    // console.log('readBook.js (1) chapters:', chapters);

                    return (
                        <MyChapterItem
                            key={chapters.key}
                            navigation={navigation}
                            chapters={chapters}
                            chapterTitle={chapters.chapterTitle}
                            bookKey={bookKey}
                            chapterKey={Object.keys(item.chapters).toString()}
                            item={item}
                        />
                    )
                })}
            </View>
        </ScrollView>
    );
}
// const MyChapterItem = (props) => { // javascript의 hoisting을 공부해보자! ..인데 사실 얘는 공부를.. 아 나중의 나중에 해봅시다!
// () => {} : arrow function
// Javascript의 가장 강력하고 가장 큰 특징... 중 하나: 함수 또한 값이다.
function MyChapterItem(props) {
    const { navigation, chapters, chapterTitle, item, bookKey, chapterKey } = props;

    // console.log('readBook.js (1), chapters: ',chapters);

    // console.log('아s가 어렵다',chapters.chapterKey)
    // console.log('이것도 찾나',chapterKey)
    const [likeCount, setLikeCount] = useState(0);
    const [likedUsers, setLikedUsers] = useState([]);
    const [commentsNumber, setCommentsNumber] = useState(0);
    const likeRef = firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/likes/');
    const headerHeight = useHeaderHeight();
    const ScreenHeight = Dimensions.get('window').height   //height
    const BottomSpace = getBottomSpace()
    const tabBarHeight = useBottomTabBarHeight();
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight - headerHeight - BottomSpace - tabBarHeight


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
        // console.log('readBook.js (2), chapters: ',chapters);

        let arr = firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/comments/')
            .on('value', (snapshot) => {
                var commentsNumber = snapshot.numChildren();
                setCommentsNumber(commentsNumber)
            })
    }, [])
    return (
        <View>
            <TouchableOpacity style={{ backgroundColor: "#fff", marginVertical: "1%", marginHorizontal: "3%", height: realScreen * 0.17 }} onPress={() => {
                // console.log('readBook.js (3), chapters: ',chapters);
                navigation.navigate('readArticle', { myitem: item, chapters: chapters, navigation: navigation, chapterTitle: chapterTitle, bookKey: bookKey, chapterKey: chapters.chapterKey })
            }}>
                <View style={{ flex: 3, marginHorizontal: "3%", marginVertical: "3%" }}>
                    <Text style={{ fontSize: 15, fontWeight: "600" }} numberOfLines={1}>{chapters.chapterTitle}</Text>
                    <Text style={{ marginTop: "3%", fontWeight: "500" }} numberOfLines={2}>{chapters.mainText}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "3%", marginBottom: "2%" }}>
                    {/* <Text style={styles.bookIndexText}>{post.iam}</Text> //이별록 포스팅에서 이용 */}
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Icon name="like2" size={15} color="black" style={{ marginLeft: "3%" }} />
                        <Text style={{ marginLeft: "3%" }}>{likeCount}</Text>
                        <Icon name="message1" size={15} color="black" style={{ marginLeft: "3%" }} />
                        <Text style={{ marginLeft: "3%" }}>{commentsNumber}</Text>
                    </View>
                    <View>
                        <Text style={{ flex: 1, alignSelf: 'flex-end', marginRight: "5%", fontSize: 12 }}>{chapters.Kregdate}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F4F4",
        flex: 1
    },
    bookCoverContainer: {
        width: 200,
        height: 200,
        marginTop: "0%",
        alignSelf: "center",
        flexDirection: "row",
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
        backgroundColor: "#F5F4F4",
        width: '90%',
        height: 100,
        alignSelf: "center",
    },
    bookTitle: {
        fontSize: 15,
        marginTop: "7%",
        fontSize: 15,
        alignSelf: "center",
        backgroundColor: "pink"
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
export default readBook