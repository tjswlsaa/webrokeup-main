import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView, Button, Touchable, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { firebase_db } from '../../firebaseConfig';
import firebase from 'firebase/app'
import { StatusBar } from 'expo-status-bar';
import { MakeNewBook } from './MakeNewBook';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { render } from 'react-dom';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Clover from 'react-native-vector-icons/MaterialCommunityIcons';
import Left from 'react-native-vector-icons/Feather'
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';
import Swiper from 'react-native-swiper'
// import paper from '../../assets/paper.png';

// const bookBackground = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTE1/MDAxNjIzMDY2NDQwOTUx.N4v5uCLTMbsT_2K1wPR0sBPZRX3AoDXjBCUKFKkiC0gg.BXjLzL7CoF2W39CT8NaYTRvMCD2feaVCy_2EWOTkMZsg.PNG.asj0611/bookBackground.png?type=w773"

console.log("myarticle")
const test1 = {
    bookKey: ''
};

const test3 = {
    navigation: ''
}

const test4 = {
    item: ''
}
const test5 = {
    user_uid: ''
}


const MyArticleQuration = ({ navigation, route }) => {

    test3.navigation = navigation

    // const {myitem, chapters, chapterTitle} = route.params;
    const { bookKey, chapterKey } = route.params;
    test1.bookKey = bookKey

    const [swiper, setSwiper] = useState(null);




    const user = firebase.auth().currentUser;
    var user_uid
    if (user != null) { user_uid = user.uid }
    test4.user_uid=user_uid

    const [index, setIndex] = useState(0);
    useEffect(() => {
        setIndex(route.params.index);
    }, []);
    console.log("myarticleindex",index)

    const ScreenHeight = Dimensions.get('window').height   //height
    const ScreenWidth = Dimensions.get('window').width   //height

    const headerHeight = useHeaderHeight();
    const BottomSpace = getBottomSpace()
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight-headerHeight-BottomSpace


   // mybook큐레이팅

const qurationBookKey1 = "1069092000"
const qurationBookKey2 = "3560282000"
// const qurationBookKey3 = "Blue1"
// const qurationBookKey4 = "black1"
// const qurationBookKey5 = "red2"

const qurationChapterKey1 = "1069092001"
const qurationChapterKey2 = "3560282002"
// const qurationChapterKey3 = "Blue1"
// const qurationChapterKey4 = "black1"
// const qurationChapterKey5 = "red2"




const [chapter1, setChapter1] = useState([]);

useEffect(getChapters1, [qurationChapterKey1]);
function getChapters1() {
    firebase_db
        .ref(`book/${qurationBookKey1}/both/`+qurationChapterKey1)
        .on('value', (snapshot) => {
            const chapter1 = snapshot.val()
            setChapter1(chapter1);
        })
}



const [chapter2, setChapter2] = useState([]);

useEffect(getChapters2, [qurationChapterKey2]);
function getChapters2() {
    firebase_db
        .ref(`book/${qurationBookKey2}/both/`+qurationChapterKey2)
        .on('value', (snapshot) => {
            const chapter2 = snapshot.val()
            setChapter2(chapter2);
        })
}

// const [BookItemUserinfo1, setBookItemUserinfo1] = useState({
//     iam:"익명의.지은이",
//     selfLetter:"안녕하세요 익명의 지은이입니다."
// });
// useEffect(()=>{
//   firebase_db.ref(`users/${myitem1.user_uid}`)
//       .on('value', (snapshot) => {
//           let BookItemUserinfo1 = snapshot.val();
//           if (BookItemUserinfo1 > '') {
//             setBookItemUserinfo1(BookItemUserinfo1);
//           }
//       })
// }, [myitem1]);


// const [BookItemUserinfo2, setBookItemUserinfo2] = useState({
// iam:"익명의.지은이",
// selfLetter:"안녕하세요 익명의 지은이입니다."
// });
// useEffect(()=>{
// firebase_db.ref(`users/${myitem2.user_uid}`)
//   .on('value', (snapshot) => {
//       let BookItemUserinfo2 = snapshot.val();
//       if (BookItemUserinfo2 > '') {
//         setBookItemUserinfo2(BookItemUserinfo2);
//       }
//   })
// }, [myitem2]);

const qurationchapters = [chapter1,chapter2]
console.log("chapteris",qurationchapters)
// 책 큐레이팅 끝



    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar style="white"/>
                <View style={{marginHorizontal:"5%",}}> 
                        {/* <TouchableOpacity onPress={() => { navigation.navigate("MyBook", { bookKey: bookKey, navigation: navigation }) }}style={{backgroundColor:"pink", }}>
                            <Text>책 보러가기</Text>
                        </TouchableOpacity> */}

                    <View style={{ height: realScreen*0.9,alignSelf: "center", backgroundColor:"white" , justifyContent:"center", marginVertical:"10%"}}>

                                <View>

                                    
                                    <View style={{ height: realScreen*0.8,}}>
                                            

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
                                                    
                                                        {qurationchapters.map(item => {
                                                            test4.item=item
                                                            return (
                                                            <View>

                                                                <ChapterItem 
                                                                navigation={navigation}
                                                                item={item}/>
                                                            
                                                                
                                                            </View>
                                                            )
                                                        })}

                                          

                                                    </Swiper>
                                        </View>
                                        

                            </View>




                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

function ChapterItem(props) {



    const { navigation, item, bookKey, chapterKey, } = props;
    const user = firebase.auth().currentUser;
    var user_uid
    if (user != null) { user_uid = user.uid }
    const [likeCount, setLikeCount] = useState(0);
    const [likedUsers, setLikedUsers] = useState([]);
    const [commentsNumber, setCommentsNumber] = useState(0);
    const [cloverColor, setCloverColor] = useState("#c1c1c1")
    const likeRef = firebase_db.ref(`book/${item.bookKey}/both/` + item.chapterKey + '/likes/');

    const ScreenHeight = Dimensions.get('window').height   //height
    const ScreenWidth = Dimensions.get('window').width   //height

    const headerHeight = useHeaderHeight();
    const BottomSpace = getBottomSpace()
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight-headerHeight-BottomSpace
    
    console.log("itemmyarticle",item)
    useEffect(() => {
        // let temp = [];
        let arr = likeRef.on('value', (snapshot) => {
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

    }, [item])
    console.log("likeCount",likeCount)

    console.log("likedUserslikedUsers",likedUsers)

    useEffect(() => {
        //// console.log('MyArticle.js (2), chapters: ',chapters);
        // let arr = firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/comments/')
        let arr = firebase_db.ref(`book/${item.bookKey}/both/` + item.chapterKey + '/comments/')
            .on('value', (snapshot) => {
                var commentsNumber = snapshot.numChildren();
                setCommentsNumber(commentsNumber)
            })
    }, [item])

    console.log("commentsNumber",commentsNumber)

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

    return (
    <View>

        <View style={{ height: "90%", width: "80%", alignSelf: "center" }} 
        // onPress={() => { navigation.navigate("MyBook", { item: item, bookKey: item.bookKey, navigation: navigation }) }}
        >
            <View style={{alignSelf:"flex-end"}}>
                    {item.isPublic == true ? 
                    (
                    <View style={{flexDirection: "row"}}>
                        <Icon name="unlock" size={15} color="black" style={{ marginLeft: 20}}/>
                        <Text style={{fontSize: 12, marginLeft: "10%", marginTop: "3%"}}>공개</Text>
                    </View>
                    )
            : 
                    (
                    <View style={{flexDirection: "row"}}>
                        <Icon name="lock" size={15} color="#20543F" style={{ marginLeft: 20}}/>
                        <Text style={{fontSize: 11, marginLeft: "5%", marginTop: "2%",}}>비공개</Text>
                    </View>   
                    )
                }
            </View>
            <View style={{ flexDirection:"row", marginTop:"10%",alignItems:"center",}}>
                <View style={{backgroundColor:item.chColor, flex:1, height:realScreen*0.05, }}></View>
                <View style={{height:realScreen*0.1, flex:25,}}>
                <Text style={{fontSize: 18, fontWeight:"500",  marginLeft:"2%", marginTop:"7.5%"}}>{item.chapterTitle}</Text>
                </View>
            </View>
                <ScrollView style={{marginTop:"5%"}}>
                {item.type== "감정 일기"? (

                <Text style={{fontSize: 15}}>{item.mainText}</Text>
                ) :(

                            <View>
                                                <View style={{ marginBottom:realScreen*0.03}}>
                                                <Text style={{fontSize: 16, fontWeight:"600",}}>{item.Q1}</Text>
                                                <Text style={{fontSize: 15, marginVertical:"5%",}}>{item.mainText}</Text>
                                                </View>
                                                <View style={{ marginBottom:realScreen*0.03}}>
                                                <Text style={{fontSize: 16, fontWeight:"600",}}>{item.Q2}</Text>
                                                <Text style={{fontSize: 15, marginVertical:"5%"}}>{item.text3}</Text>
                                                </View>
                                                <View style={{ marginBottom:realScreen*0.03}}>
                                                <Text style={{fontSize: 16, fontWeight:"600",}}>{item.Q3}</Text>
                                                <Text style={{fontSize: 15,  marginVertical:"5%"}}>{item.text4}</Text>
                                                </View>
                            </View>
                )}
                </ScrollView>
        </View>
        <View style={{ flexDirection: "row", height: realScreen*0.08, backgroundColor:"white" , marginHorizontal:"10%",  }}>
       
            <TouchableOpacity style={{marginTop:"4%", }} onPress={async () => {
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
                firebase_db.ref(`book/${item.bookKey}/both/` + item.chapterKey).child("likeCount").set(likeCount)
            }}>
                <Clover name="clover" size={20} color={cloverColor} style={styles.addIcon} />
            </TouchableOpacity>
            <Text style={{ marginLeft: "3%",marginTop:"4%", }}> {likeCount} </Text>
            <TouchableOpacity
                onPress={() => { navigation.navigate('Comment', { navigation: navigation, bookKey: item.bookKey, chapterKey: item.chapterKey }) }}
                style={{marginTop:"4%", marginLeft:"5%" }}
            >
                <Icon name="message1" size={20} color="grey" style={styles.addIcon} />
            </TouchableOpacity>
            <Text style={{ marginLeft: "3%",marginTop:"4%",  }}> {commentsNumber} </Text>
            <View style={{ flexDirection:"column", marginTop: "4%", marginLeft:"20%" }}>
                <Text style={{ fontSize: 13,}}>{item.Kregdate}</Text>
            </View>
        </View>
        </View>


    )
}
const styles = StyleSheet.create({
    container: {
        //앱의 배경 색
        backgroundColor: "#F5F4F4",
        flex: 1
    },
    upperButtonContainer: {
        flexDirection: "row",
        alignSelf: "flex-end",
        marginTop: 30,
        marginRight: 15,
    },
    editButton: {
        height: 20,
        width: 60,
        justifyContent: "center",
        backgroundColor: "#C4C4C4",
        alignItems: "center",
        borderRadius: 5
    },
    deleteButton: {
        marginLeft: 20,
        height: 20,
        width: 60,
        justifyContent: "center",
        backgroundColor: "#C4C4C4",
        alignItems: "center",
        borderRadius: 5
    },
    textContainer: {
        height: "50%"
    },
    bookTitle: {
        fontSize: 20,
        marginLeft: 60,
        marginTop: 80,
        marginRight: 60,

    },
    bookText: {
        marginTop: 50,
        marginLeft: 60,
        marginRight: 60,
    },
    regdate: {
        marginLeft: "10%"
    },
    bottomButtonContainer: {
        flex: 1,
        flexDirection: "row",
        marginTop: 10,
        marginRight: "10%",
        backgroundColor: "pink"
    },
    commentButton: {
        marginLeft: "7%"
    },
    likeButton: {
    }
});



console.log("myarticletheend")


function headerRight() {
    const navigation = useNavigation();
    const {bookKey}=test1
    const {item}=test4
    const user = firebase.auth().currentUser;
    var user_uid
    if (user != null) { user_uid = user.uid }

    return (

        <Button
            onPress={() => navigation.navigate("MyBook", {bookKey: bookKey, })}
            title="책 보러가기"
            color="#000"
        />


    );
}

const options = {
    headerRight,
};

export default {
    component: MyArticleQuration,
    options,
};