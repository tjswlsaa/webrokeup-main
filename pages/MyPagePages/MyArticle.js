import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView, Button, Touchable, Alert } from 'react-native';
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

// import paper from '../../assets/paper.png';

// const bookBackground = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTE1/MDAxNjIzMDY2NDQwOTUx.N4v5uCLTMbsT_2K1wPR0sBPZRX3AoDXjBCUKFKkiC0gg.BXjLzL7CoF2W39CT8NaYTRvMCD2feaVCy_2EWOTkMZsg.PNG.asj0611/bookBackground.png?type=w773"

const test1 = {
    bookKey: ''
};


const test3 = {
    navigation: ''
}
const MyArticle = ({ navigation, route }) => {
    test3.navigation = navigation

    // const {myitem, chapters, chapterTitle} = route.params;
    const { bookKey, chapterKey } = route.params;
    test1.bookKey = bookKey

    const [likeCount, setLikeCount] = useState(0);
    const [likedUsers, setLikedUsers] = useState([]);
    const [commentsNumber, setCommentsNumber] = useState(0);

    const user = firebase.auth().currentUser;
    var user_uid
    if (user != null) { user_uid = user.uid }

    // console.log('우선 해당 챕터키 가져오는지 여부',chapterKey)
    // const [chapters,setChapters]= useState('')
    const [chapters, setChapters] = useState({});
    console.log("myarticle author", chapters.creator)

    useEffect(getChapters, []);

    function getChapters() {

        firebase_db
            .ref(`book/${bookKey}/chapters/` + chapterKey)
            .on('value', (snapshot) => {
                // console.log('getChapters() firebase_db.on()');
                let temp = [];
                const chapters = snapshot.val()



                if (chapters > '') { // truthy check
                    setChapters(chapters);
                }
            });
    } // function getChapters()


    const likeRef = firebase_db.ref(`book/${bookKey}/chapters/` + chapterKey + '/likes/');

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
    }, [])

    useEffect(() => {
        //// console.log('MyArticle.js (2), chapters: ',chapters);
        // let arr = firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/comments/')
        let arr = firebase_db.ref(`book/${bookKey}/chapters/` + chapterKey + '/comments/')
            .on('value', (snapshot) => {
                var commentsNumber = snapshot.numChildren();
                setCommentsNumber(commentsNumber)
            })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>

                <View style={{ backgroundColor: "#e6ede8" }}>
                    {/* <ImageBackground style={{height:"100%",resizeMode:"cover"}} source={{ uri: bookBackground }} > */}

                    {chapters.creator == user_uid ? (
                        <View style={{height: "4%", marginTop: "1%", width: "90%", flexDirection: "row", alignSelf: "center"}}>
                            <TouchableOpacity style={{marginRight: "5%", borderWidth: 2, borderColor: "#21381c", width: "15%", borderRadius: 15}}>
                                <Text style={{alignSelf: "center", color: "#21381c", marginTop: "10%"}} 
                                    onPress={() => navigation.navigate("EditArticle", { bookKey: bookKey, chapters: chapters, chapterKey: chapterKey })}>수정</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: "#21381c", width: "15%", borderRadius: 15}} >
                                <Text style={{alignSelf: "center", color: "#fff", marginTop: "13%"}} 
                                    onPress={() => {
                                        // console.log('MyArticle.js (3), chapters: ',chapters);

                                        firebase_db
                                            .ref(`book/${bookKey}/chapters/` + chapterKey)
                                            .set(null)
                                            .then(function () {
                                                Alert.alert("삭제 완료")
                                                navigation.navigate("MyBook", { bookKey: bookKey })
                                            })
                                    }}>삭제</Text>
                            </TouchableOpacity>
                        </View>)
                        : (<View style={{height: "4%"}}></View>)}

                    <View>
                        {/* <ImageBackground style={{height:"100%",resizeMode:"cover"}} source={paper} > */}
                        <View style={{ marginTop: "3%", backgroundColor: "#fff", height: "95%", width: "94%", alignSelf: "center" }}>
                            <View style={{ height: "92%", borderWidth: 1}}>
                                <View style={{borderWidth:1, flex:1, marginHorizontal: "5%", marginVertical: "5%", height: "15%"}}>
                                    <Text style={{fontSize: 17, alignContent: "flex-end"}}>{chapters.chapterTitle}</Text>
                                </View>
                                <ScrollView style={{borderWidth: 1, flex: 7}}>
                                    <Text style={styles.bookText}>{chapters.mainText}</Text>
                                </ScrollView>
                            </View>

                            <View style={{ flexDirection: "row", height: "20%", }}>
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
                                    }
                                    // console.log({likeCount});
                                    // console.log("여기여기: " + likeCount) 
                                    // 이전: const [likeCount, setLikeCount] = useState(0);
                                    // 그러면, setLikeCount를 했으면, 당장에 likeCount도 바뀌어야 하는거 아닌가?
                                    // 리액트의 특징: state는 한 템포 느리게 변경된다. state는 보통 변수처럼 =로 값으르 바꿀 수 없다. 왜? state는 사실 변수가 아니다.
                                    // 이후: let likeCount = 0;
                                    // likeCount는 변수다
                                    // 값을 바꾸면, 다음 줄에서는 값이 바뀌어있다 (왜? 그것이 변수이니까 (끄덕))
                                    //// console.log('MyArticle.js (4), chapters: ',chapters);
                                    firebase_db.ref(`book/${bookKey}/chapters/` + chapterKey).child("likeCount").set(likeCount)
                                    // likeRef.child(user_uid).set({
                                    //     user_uid: user_uid,
                                    //     regdate: new Date().toString(),
                                    // })
                                    // likeReload();
                                    // Alert.alert('MyArticle.likeButton.onPress() end');
                                }}>
                                    <Clover name="clover" size={20} color="grey" style={styles.addIcon} />

                                </TouchableOpacity>
                                <Text style={{ marginLeft: "3%"}}> {likeCount} </Text>

                                <TouchableOpacity
                                    onPress={() => { navigation.navigate('Comment', { navigation: navigation, bookKey: bookKey, chapterKey: chapterKey }) }}
                                    style={styles.commentButton}
                                >
                                    <Icon name="message1" size={20} color="grey" style={styles.addIcon} />

                                </TouchableOpacity>
                                {/* <Button 
                        style={styles.commentButton}
                        title="댓글"
                        onPress={()=>{navigation.navigate('Comment',{chapters:chapters, navigation:navigation,bookKey:bookKey, chapterKey:chapterKey})}}/>
                    */}
                                <Text style={{ marginLeft: "3%" }}> {commentsNumber} </Text>
                                <Text style={{ marginLeft: 70 }}>{chapters.Kregdate}</Text>
                            </View>
                        </View>
                        {/* </ImageBackground> */}
                    </View>
                    {/* </ImageBackground> */}
                </View>
            </SafeAreaView>
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
        marginLeft: "10%",
    }
});





function headerLeft() {
    const navigation = useNavigation();

    return (
        <Button
            onPress={() => navigation.goBack()}
            title="뒤로가기?"
            color="#000"
        />

    );
}

const options = {
    headerLeft,
};

export default {
    component: MyArticle,
    options,
};