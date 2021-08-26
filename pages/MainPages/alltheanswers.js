import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions ,Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';

const test1 = {
    questions:""
  }
const alltheanswers = ({ navigation, route }) => {

    const { questionsKey } = route.params;
    console.log("bookkey color",questionsKey)

    function getColor(questionsKey) {
        if (questionsKey.indexOf('r') == 0){
        return "firstColor"
        }
        else if (questionsKey.indexOf('y') == 0){
        return "secondColor"
        }
        else if (questionsKey.indexOf('B') == 0){
        return "thirdColor"
        }
        else if (questionsKey.indexOf('b') == 0){
        return "fourthColor"
        }
    }
    const Color = getColor(questionsKey);
    const colorQuestion = Color+"Questions"
    const colorAnswers = Color+"Answers"


    const [questions, setQuestion] = useState([]);
    useEffect(()=>{
      firebase_db.ref(`questions/${colorQuestion}/`+questionsKey)
      .on('value', (snapshot)=>{
            const questions = snapshot. val()
    
            setQuestion(questions)
        })
    },[])
    console.log("allthequestions question",questions)
    test1.questions=questions

    const [answers, setAnswers] = useState([]);
    useEffect(()=>{
        firebase_db.ref(`questions/${colorAnswers}/${questionsKey}/`)
        .on('value', (snapshot)=>{
            let temp = [];
            snapshot.forEach((child)=>{
                const item={
                    ...child.val(),
                    key: child.key
                }
                temp.push(item)
                console.log("item: " + item)
            })
            temp.sort(function (a,b){
                return new Date(b.regdate) - new Date(a.regdate);
            })
            setAnswers(temp)
        })
    },[])

    console.log("answers",answers)
    
    return (
        <SafeAreaView style={{flex:1}}>
                <Text style={{alignSelf:"center", fontSize:"20", marginTop:"2%"}}>{questions.title}</Text>
                <Text style={{alignSelf:"center", fontSize:"15", marginTop:"2%", marginHorizontal:"10%"}}>{questions.intro}</Text>

                <ScrollView style={{height:500}}>

                        {answers.map(item => {
                            return (
                                <PostItem
                                    navigation={navigation}
                                    key = {item.key}
                                    answers={item}
                                />
                            )
                        })}
                </ScrollView>
                


        </SafeAreaView>
    )
}


const PostItem=(props)=> {

    const {answers, navigation}=props;
    const {questions} =test1
    console.log("answers.chapterKey",answers.chapterKey)
    console.log("answers.chapterKey",questions)


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
        <View style={{backgroundColor:"white", marginTop:10,borderRadius:10, marginLeft:10, marginRight:10}}>
            <TouchableOpacity style={styles.bookIndexOne} onPress={() => { navigation.navigate('MyArticle', { bookKey:answers.bookKey, chapterKey:answers.chapterKey,navigation: navigation}) }}>
                <View style={{}}>
                <Text style={styles.bookIndexOnePunchLine} numberOfLines={3}>{answers.chapterTitle}</Text>
                </View>
                <View style={{flexDirection:"row",alignContent:"center",marginTop:10}}>
                <Text style={styles.bookIndexText} numberOfLines={3}>{answers.mainText}</Text>      
                </View>
                <View style={{flexDirection:"row",alignSelf:"flex-end",marginTop:10, padding:"2%"}}>
                <Text style={{fontSize:10}}>{userinfo.iam}</Text>      
                </View>
            </TouchableOpacity>
            {/* <View style={{ borderBottomColor: "gray", borderBottomWidth: 1, }} /> */}
            <View style={{flexDirection:"row"}}>

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