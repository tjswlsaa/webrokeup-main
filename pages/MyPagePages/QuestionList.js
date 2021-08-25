import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions ,Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';


const QuestionList = ({ navigation, route }) => {

    const { bookKey, Color } = route.params;
    console.log("bookkey color",Color)
    console.log("bookKey",bookKey)

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
    const box = getquestionbox(Color);
    console.log("getquestionbox",box)

    const [questions, setQuestion] = useState([]);
    useEffect(()=>{
        firebase_db.ref(`${box}/`)
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

    return (
        <SafeAreaView style={{flex:1}}>

                <ScrollView style={{height:500}}>

                        {questions.map(item => {
                            return (
                                <PostItem
                                    navigation={navigation}
                                    key = {item.key}
                                    questions={item}
                                />
                            )
                        })}
                </ScrollView>
                


        </SafeAreaView>
    )
}


const PostItem=(props)=> {

    const {questions, navigation}=props;
    const questionsKey=questions.key
  
    const [PostItemUserinfo, setPostItemUserinfo]=useState({});

    useEffect(()=>{
        firebase_db.ref(`users/${questions.creator}`)
            .on('value', (snapshot) => {
                let PostItemUserinfo = snapshot.val();
                if (PostItemUserinfo > '') {
                    setPostItemUserinfo(PostItemUserinfo);
                }
            })
    }, []);
  


    const likeRef = firebase_db.ref(`post/${questionsKey}/` + '/likes/');

    const [likeCount, setLikeCount] = useState(0);
    const [likedUsers, setLikedUsers] = useState([]);

    useEffect (()=>{
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
    const [commentsNumber, setCommentsNumber] = useState(0);
    useEffect (()=>{
        let arr = firebase_db.ref(`post/${questionsKey}/` + '/comments/')
        .on('value', (snapshot) => {
           var commentsNumber = snapshot.numChildren();
           setCommentsNumber(commentsNumber)
        })
    }, [])



    return (
        <View style={{backgroundColor:"white", marginTop:10,borderRadius:10, marginLeft:10, marginRight:10}}>
            <TouchableOpacity style={styles.bookIndexOne} onPress={() => { navigation.navigate('QuestionWrite', { questionsKey:questionsKey, navigation: navigation}) }}>
                <View style={{}}>
                <Text style={styles.bookIndexOnePunchLine} numberOfLines={3}>{questions.title}</Text>
                </View>
                <View style={{flexDirection:"row",alignContent:"center",marginTop:10}}>
                <Text style={styles.bookIndexText}>{PostItemUserinfo.iam}</Text>
                <Icon name="like2" size={18} color="black" style={{marginLeft:20,marginTop:3}}/>
                <Text style={styles.bookIndexText}>{likeCount}</Text>
                <Icon name="message1" size={20} color="black" style={{marginLeft:20,marginTop:3}}/>

                <Text style={styles.bookIndexText}>{commentsNumber}</Text>
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
export default QuestionList;
