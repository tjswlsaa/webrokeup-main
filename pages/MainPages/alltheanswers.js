import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';
import Clover from 'react-native-vector-icons/MaterialCommunityIcons';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
const test1 = {
    questions:""
  }
  const test2 = {
    list:""
  }

  const alltheanswers = ({ navigation, route }) => {

    const { questionsKey, color } = route.params;
    console.log("bookkey color", questionsKey)

    function getColor(questionsKey) {
        if (questionsKey.indexOf('r') == 0) {
            return "firstColor"
        }
        else if (questionsKey.indexOf('y') == 0) {
            return "secondColor"
        }
        else if (questionsKey.indexOf('B') == 0) {
            return "thirdColor"
        }
        else if (questionsKey.indexOf('b') == 0) {
            return "fourthColor"
        }
    }
    const Color = getColor(questionsKey);
    const colorQuestion = Color + "Questions"
    const colorAnswers = Color + "Answers"
    var user = firebase.auth().currentUser;
    var user_uid
    if (user != null) {
        user_uid = user.uid;
    }

    const [colorBookList, setColorBookList] = useState([]);

    useEffect(()=>{
        firebase_db.ref(`users/${user_uid}/myBooks`)
            .on('value',(snapshot)=>{
                let colorBookList = snapshot.val();
                if (colorBookList>""){
                    setColorBookList(colorBookList)
                }
                })
            },[])// 여기에 colorBookList 이거 넣으면 책 삭제 되면 바로업로드 되는데... 대신 로딩이 안됨 진퇴양난

            console.log("questionlist color book list", colorBookList)

            const istherebook =()=> {
 
        if(Color=='firstColor'){
            return colorBookList.firstColor
        }
        if(Color=='secondColor'){
            return colorBookList.secondColor
        }
        if(Color=='thirdColor'){
            return colorBookList.thirdColor
        }
        if(Color=='fourthColor'){
            return colorBookList.fourthColor
        }
    }
    
    const [questions, setQuestion] = useState([]);
    const getQuestions = async () => {     
        await firebase_db.ref(`questions/${colorQuestion}/` + questionsKey)
            .on('value', (snapshot) => {
                const questions = snapshot.val()

                setQuestion(questions)
            })
        }
        useEffect(() => {
            getQuestions()
        }, [])
    console.log("allthequestions question", questions)
    test1.questions = questions


    // const [answers, setAnswers] = useState([]);
    // useEffect(()=>{
    //     firebase_db.ref(`questions/${colorAnswers}/${questionsKey}/`)
    //     .on('value', (snapshot)=>{
    //         let temp = [];
    //         snapshot.forEach((child)=>{
    //             const item={
    //                 ...child.val(),
    //                 key: child.key
    //             }
    //             temp.push(item)
    //             console.log("item: " + item)
    //         })
    //         temp.sort(function (a,b){
    //             return new Date(b.regdate) - new Date(a.regdate);
    //         })
    //         setAnswers(temp)
    //     })
    // },[])

    // console.log("answers",answers)

    const [list, setList] = useState([]);
    test2.list=list;
    const [selectedList, setSelectedList] = useState([]);
    const [hotcolor, setHotColor] = useState(color)
    const [newcolor, setNewColor] = useState("#E9E9E9")
    const headerHeight = useHeaderHeight();
    const ScreenHeight = Dimensions.get('window').height   //height
    const BottomSpace = getBottomSpace()
    const tabBarHeight = 0
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight - headerHeight - BottomSpace - tabBarHeight;


    useEffect(() => {
        firebase_db
            .ref(`book`)
            .on('value', (snapshot) => {
                let list = [];
                let temp = [];
                snapshot.forEach((child) => {
                    const book = child.val();
                    const { both } = book;
                    //      console.log("useeffectbook",book)

                    if (both == undefined) {
                    } else {
                        list = [...list, ...Object.values(both)]; // spread를 통한 리스트 병합
                    }
                    const arraylist = Object.values(list)
                    const listFiltered = arraylist.filter(filteredList => filteredList.isPublic == true && filteredList.questionsKey == questionsKey)

                    listFiltered.sort(function (a, b) {
                        return (b.likeCount) - (a.likeCount)
                    })
                    setList(listFiltered);

                    const listoften = [];
                    if (listFiltered.length >= 1) {
                        listoften.push(listFiltered[0]);
                    }
                    if (listFiltered.length >= 2) {
                        listoften.push(listFiltered[1]);
                    }
                    if (listFiltered.length >= 3) {
                            listoften.push(listFiltered[2]);
                        }
                    if (listFiltered.length >= 4) {
                    listoften.push(listFiltered[3]);
                    }
                    if (listFiltered.length >= 5) {
                    listoften.push(listFiltered[4]);
                    }
                    if (listFiltered.length >= 6) {
                    listoften.push(listFiltered[5]);
                    }
                    if (listFiltered.length >= 7) {
                    listoften.push(listFiltered[6]);
                    }
                    if (listFiltered.length >= 8) {
                    listoften.push(listFiltered[7]);
                    }
                    if (listFiltered.length >= 9) {
                    listoften.push(listFiltered[8]);
                    }
                    if (listFiltered.length >= 10) {
                    listoften.push(listFiltered[9]);
                    }

                    setSelectedList(listoften);
                })
            })
    }, []) // 여기에 원래 list 가 있었음... 이거 없애니 렉은 안걸림
    // console.log("populararticlelist",list)


    const viewHot = () => {
        // console.log("viewHot")
        const hotlist = [...list];
        hotlist.sort(function (a, b) {
                return (b.likeCount) - (a.likeCount)
        })
        const listoften = [];
        if (hotlist.length >= 1) {
            listoften.push(hotlist[0]);
        }
        if (hotlist.length >= 2) {
            listoften.push(hotlist[1]);
        }
        if (hotlist.length >= 3) {
                listoften.push(hotlist[2]);
            }
        if (hotlist.length >= 4) {
        listoften.push(hotlist[3]);
        }
        if (hotlist.length >= 5) {
        listoften.push(hotlist[4]);
        }
        if (hotlist.length >= 6) {
        listoften.push(hotlist[5]);
        }
        if (hotlist.length >= 7) {
        listoften.push(hotlist[6]);
        }
        if (hotlist.length >= 8) {
        listoften.push(hotlist[7]);
        }
        if (hotlist.length >= 9) {
        listoften.push(hotlist[8]);
        }
        if (hotlist.length >= 10) {
        listoften.push(hotlist[9]);
        }
        setSelectedList(listoften);

        setHotColor(questions.Color);
        setNewColor("#E9E9E9")
    }

    const viewNew = () => {
        const newlist = [...list]
                newlist.sort(function (a, b) {
                        return new Date(b.regdate) - new Date(a.regdate);
                })
                const newlistoften = [];
                if (newlist.length >= 1) {
                        newlistoften.push(newlist[0]);
                }
                if (newlist.length >= 2) {
                        newlistoften.push(newlist[1]);
                }
                if (newlist.length >= 3) {
                        newlistoften.push(newlist[2]);
                        }
                if (newlist.length >= 4) {
                newlistoften.push(newlist[3]);
                }
                if (newlist.length >= 5) {
                newlistoften.push(newlist[4]);
                }
                if (newlist.length >= 6) {
                newlistoften.push(newlist[5]);
                }
                if (newlist.length >= 7) {
                newlistoften.push(newlist[6]);
                }
                if (newlist.length >= 8) {
                newlistoften.push(newlist[7]);
                }
                if (newlist.length >= 9) {
                newlistoften.push(newlist[8]);
                }
                if (newlist.length >= 10) {
                newlistoften.push(newlist[9]);
                }
                setSelectedList(newlistoften);
        setHotColor("#E9E9E9")
        setNewColor(questions.Color)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ }}>
                <View style={{ backgroundColor: questions.Color, flex: 1, marginTop: "2%", height:"70%" }}>
                        </View>
                    <Text style={{ alignSelf: "center", fontSize: "20", marginTop: "2%", textAlign: "center", fontWeight: "600" }}>{questions.title}</Text>
                    <View style={{ backgroundColor: questions.Color, marginTop: "2%", height:realScreen*0.003, width:"80%", alignSelf:"center"}}></View>

                    <Text style={{ alignSelf: "center", fontSize: "14", marginTop: "3%", marginHorizontal: "5%", marginBottom: "5%", textAlign: "center" }}>{questions.intro}</Text>
                </View>

                {istherebook() == undefined? ( <TouchableOpacity style={{ height: 30, width: "30%", alignSelf: "center", }} onPress={() =>Alert.alert("책을 먼저 만들어주세요")}>
                    <Text style={{ fontSize: 15, alignSelf: "center", color: "#fff", marginTop: "3%", color: questions.Color }}>  글쓰러 가기 </Text>
                </TouchableOpacity> ):(
                <TouchableOpacity style={{ height: 30, width: "30%", alignSelf: "center", }} onPress={()=>{navigation.navigate("QuestionWrite", {questionsKey: questionsKey, navigation: navigation})}}>
                    <Text style={{ fontSize: 15, alignSelf: "center", color: "#fff", marginTop: "3%", color: questions.Color }}>  글쓰러 가기 </Text>
                </TouchableOpacity>)}



                <View style={{ backgroundColor: "#fafafa", marginTop: 10 }}>
                    <View style={{ flexDirection: "row", height: 30, marginTop: "2%" }}>
                        <TouchableOpacity
                            style={{ flex: 1, marginLeft: "2%", marginRight: "1%" }}
                            onPress={() => viewHot()}>
                            <Text style={{ alignSelf: "center", fontSize: 17 }} > 인기 답변 </Text>
                            <View style={{ fontSize: 17, borderBottomWidth: 3, borderBottomColor: hotcolor, marginTop: "3%" }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1, marginRight: "2%", marginRight: "1%" }}
                            onPress={() => viewNew()}>
                            <Text style={{ alignSelf: "center", fontSize: 17 }}> 최신 답변 </Text>
                            <View style={{ fontSize: 17, borderBottomWidth: 3, borderBottomColor: newcolor, marginTop: "3%" }} />
                        </TouchableOpacity>
                    </View>
                    {/* <ScrollView style={{height:500}}> */}

                    {selectedList.map((item, index) => {
                        return (
                            <PostItem
                                navigation={navigation}
                                key={item.key}
                                answers={item}
                                questionsKey={questionsKey}
                                index={index}
                                likeCount={item.likeCount}
                                commentsCount={item.commentsCount}
                            />
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const PostItem = (props) => {

    const { answers, navigation, questionsKey, index, likeCount, commentsCount } = props;
    const { questions } = test1
    const { list } = test2; 

    console.log("answers.chapterKey", answers.chapterKey)
    console.log("answers.chapterKey", questions)


    const Color = getColor(questionsKey);
    const colorQuestion = Color + "Questions"
    const colorAnswers = Color + "Answers"
    const likeRef = firebase_db.ref(`questions/${colorQuestion}/${questionsKey}/likes`);

    console.log("answers.chapterKey",answers.chapterKey)
    console.log("answers.listlist",list)


    function getColor(questionsKey) {
        if (questionsKey.indexOf('r') == 0) {
            return "firstColor"
        }
        else if (questionsKey.indexOf('y') == 0) {
            return "secondColor"
        }
        else if (questionsKey.indexOf('B') == 0) {
            return "thirdColor"
        }
        else if (questionsKey.indexOf('b') == 0) {
            return "fourthColor"
        }
    }

    const [userinfo, setUserinfo] = useState({
        iam: "익명의.지은이",
        selfLetter: "안녕하세요 익명의 지은이입니다."
    });
    useEffect(() => {
        firebase_db.ref(`users/${answers.creator}`)
            .on('value', (snapshot) => {
                let userinfo = snapshot.val();
                if (userinfo > '') {
                    setUserinfo(userinfo);
                }
            })
    }, []);

    

    return (
        <View style={{ backgroundColor: "white", marginTop: 5, borderRadius: 10, marginLeft: 10, marginRight: 10 }}>
            <TouchableOpacity style={styles.bookIndexOne} onPress={() => { navigation.navigate('MyArticleQuestions', { bookKey:answers.bookKey, chapterKey:answers.chapterKey,navigation: navigation, list:list, index:index}) }}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ flex: 1, fontSize: 16, fontWeight: "500", marginLeft: "3%" }} numberOfLines={3}>{answers.chapterTitle}</Text>
                    <View style={{ alignSelf: "flex-end", marginRight: "3%" }}>
                        <Text style={{ fontSize: 10 }}>{userinfo.iam}</Text>
                    </View>

                </View>
                <View style={{ alignContent: "center", marginTop: 10, fontSize: 14 }}>
                    <Text style={{ marginLeft: "3%", marginVertical: "1%" }} numberOfLines={1}>Q1: {answers.mainText}</Text>
                    <Text style={{ marginLeft: "3%", marginVertical: "1%" }} numberOfLines={1}>Q2: {answers.text3}</Text>
                    <Text style={{ marginLeft: "3%", marginVertical: "1%" }} numberOfLines={1}>Q3: {answers.text4}</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: "2%" }}>
                    <Clover name="clover" size={15} color="grey" style={{ marginLeft: 5 }} />
                    <Text style={{ fontSize: 11, marginLeft: "5%", }}>{likeCount}</Text>
                    <Icon name="message1" size={15} color="black" style={{ marginLeft: 20 }} />
                    <Text style={{ fontSize: 11, marginLeft: "5%", }}>{commentsCount}</Text>
                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>

            </View>

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
        marginBottom: "5%"
    },
    bookIndexOneTitle: {
        fontSize: 15,
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
export default alltheanswers;