import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions ,Image, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';


const QuestionList = ({ navigation, route }) => {

    const { Color } = route.params;
    console.log("bookkey color",Color)

    function getquestionbox(Color) {
        if (Color == "#9E001C"){
        return "firstColor"
        }
        else if (Color == "#F6AE2D"){
        return "secondColor"
        }
        else if (Color == "#33658A"){
        return "thirdColor"
        }
        else if (Color ==  "#494949"){
        return "fourthColor"
        }
    }
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
            const colorBookListValues= Object.keys(colorBookList)
            console.log("mpaquestionlistge colorBookListValues", colorBookListValues)
            console.log("mpaquestionlistge colorBookListValues>>>", colorBookList.firstColor)
            console.log("mpaquestionlistge colorBookListValues>>>", colorBookList.fourthColor) //undefined



    const numberColor = getquestionbox(Color);
    console.log("getquestionbox",numberColor)

    const Key = numberColor
    console.log("mpaquestionlistge colorBookListValues>>>>>>", colorBookList) //undefined

    const colorQuestion = numberColor+"Questions"
    console.log("colorQuestion",colorQuestion)

//만약 numberColor가 firstColor라면
//colorBookList.firstColor가 undefined이면 책을 먼저 만들어주세요 alert 뜨기
// undefined아니면 그대로,그리고 colorBookList.firstColor 전달 

const istherebook =()=> {
 
    if(numberColor=='firstColor'){
        return colorBookList.firstColor
    }
    if(numberColor=='secondColor'){
        return colorBookList.secondColor
    }
    if(numberColor=='thirdColor'){
        return colorBookList.thirdColor
    }
    if(numberColor=='fourthColor'){
        return colorBookList.fourthColor
    }
}

console.log("istherebook>>",istherebook())

    const [questions, setQuestion] = useState([]);
    useEffect(()=>{
        firebase_db.ref(`questions/${colorQuestion}/`)
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
            setQuestion(temp)
        })
    },[])

    console.log("questions",questions)

    return (
        <SafeAreaView style={{flex:1}}>

                <ScrollView style={{height:500}}>

                        {questions.map(item => {
                            return (
                                <PostItem
                                    navigation={navigation}
                                    key = {item.key}
                                    questions={item}
                                    therebook={istherebook()}

                                />
                            )
                        })}
                </ScrollView>
                


        </SafeAreaView>
    )
}


const PostItem=(props)=> {

    const {questions, navigation, numberColor,therebook}=props;
    console.log("questions222",questions)
    const questionsKey=questions.questionsKey
    console.log("questionsKey",questionsKey)




    return (
        <View style={{backgroundColor:"white", marginTop:10,borderRadius:10, marginLeft:10, marginRight:10}}>

            {therebook == undefined? (
                <TouchableOpacity style={{ marginTop: "5%",marginHorizontal:"5%" ,marginBottom: "5%"}} onPress={() =>Alert.alert("책을 먼저 만들어주세요")}>
                <View style={{flexDirection:"row", flex:1}}>
                        <View style={{backgroundColor:questions.Color, flex:1}}>
                        </View>
                        <Text style={{flex:35,fontSize:17, fontWeight:"600", marginHorizontal:"2%"}} numberOfLines={3}>{questions.title}</Text>
                </View>
                <View style={{flexDirection:"row",alignContent:"center",marginTop:10}}>
                <Text numberOfLines={3} style={styles.bookIndexText}>{questions.summary}</Text>      
                </View>
            </TouchableOpacity>

            ):(
                <TouchableOpacity style={{ marginTop: "5%",marginHorizontal:"5%" ,marginBottom: "5%"}} onPress={() => { navigation.navigate('QuestionWrite', { questionsKey:questionsKey, navigation: navigation}) }}>
                <View style={{flexDirection:"row", flex:1}}>
                        <View style={{backgroundColor:questions.Color, flex:1}}>
                        </View>
                        <Text style={{flex:35,fontSize:17, fontWeight:"600", marginHorizontal:"2%"}} numberOfLines={3}>{questions.title}</Text>
                </View>
                <View style={{flexDirection:"row",alignContent:"center",marginTop:10}}>
                <Text numberOfLines={3} style={styles.bookIndexText}>{questions.summary}</Text>      
                </View>
            </TouchableOpacity>

            )}
         
            <TouchableOpacity onPress={()=>{navigation.navigate("alltheanswers",{questionsKey:questionsKey, navigation: navigation, color: questions.Color})}} style={{width:"30%", marginHorizontal:"5%", marginBottom:"5%"}}>
                <Text style={{marginLeft:"15%",color:"gray"}}>모두의 답변보기</Text>
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
export default QuestionList;
