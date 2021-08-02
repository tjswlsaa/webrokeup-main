import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/Feather';
const test1 ={ 
    writings:''
}
const editorBoard = ({ navigation, route }) => {

    const [writings, setWritings] =useState([])
    test1.writings=writings

  

      useEffect(() => {
        firebase_db
            .ref('editor/')
            .on('value', (snapshot) => {
                let temp = [];
                snapshot.forEach((child) => {
                    const myitem={
                    ...child.val(), 
                    key: child.key, 
                }
                temp.push(myitem)
            })
            temp.sort(function (a, b) {
                return new Date(b.regdate) - new Date(a.regdate);
            })
                setWritings(temp);
                //console.log('mypage data',data)
            })
    }, []) 




    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{height:40, justifyContent:"center"}}>
                <Text  style={{alignSelf:"center", fontSize:15, fontWeight:"500"}}>게시판</Text>
            </View>
                <ScrollView style={{height:500}}>

                        {writings.map(item => {
                            return (
                                <WritingItem
                                    navigation={navigation}
                                    key = {item.key}
                                    writing={item}
                                />
                            )
                        })}
                </ScrollView>
                
                <View>

                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("editorMakeNewWriting")}
                    style={{height:50, backgroundColor:"blue", justifyContent:"center"}}>
                        <Text style={{alignSelf:"center", fontSize:15}}>글쓰기</Text>
                    </TouchableOpacity>

                </View>


        </SafeAreaView>
    )
}


const WritingItem=(props)=> {
    const {writing, navigation}=props;
    // const {writing}=test1


    const [userinfo, setUserinfo] = useState([]);
    var user = firebase.auth().currentUser;
    var user_uid
    if (user != null) {
      user_uid = user.uid;
    }
    useEffect(()=>{
      firebase_db.ref(`users/${writing.creator}`)
          .on('value', (snapshot) => {
              let userinfo = snapshot.val();
              setUserinfo(userinfo);
          })
  }, []);


    const createdAt= new Date(writing.regdate) //createdAt Mon Jul 05 2021 20:00:26 GMT+0900 (KST) number()함수못쓰나
    ////console.log('comment.regdate',comment.regdate)
    ////console.log('createdAt',createdAt)
  
    const displayedAt=(createdAt)=>{
     
        const milliSeconds = new Date()- createdAt
        ////console.log('milliSeconds',milliSeconds)
        ////console.log('new Date()',new Date()) //new Date() 2021-07-05T11:15:46.130Z
        const seconds = milliSeconds / 1000
        if (seconds < 60) return `방금 전`
        const minutes = seconds / 60
        if (minutes < 60) return `${Math.floor(minutes)}분 전`
        const hours = minutes / 60
        if (hours < 24) return `${Math.floor(hours)}시간 전`
        const days = hours / 24
        if (days < 7) return `${Math.floor(days)}일 전`
        const weeks = days / 7
        if (weeks < 5) return `${Math.floor(weeks)}주 전`
        const months = days / 30
        if (months < 12) return `${Math.floor(months)}개월 전`
        const years = days / 365
        return `${Math.floor(years)}년 전`
      }
    return (
        <View style={{backgroundColor:"white", marginTop:10,borderRadius:10, marginLeft:10, marginRight:10}}>
            <TouchableOpacity style={styles.bookIndexOne} onPress={() => { navigation.navigate('readWriting', { writingKey:writing.key, navigation: navigation}) }}>
                <View style={{backgroundColor:"pink"}}>
                <Text style={styles.bookIndexOnePunchLine} >{writing.title}</Text>

                <Text style={styles.bookIndexOnePunchLine} numberofLines={3}>{writing.text}</Text>
                </View>
                <Text style={styles.bookIndexText}>{userinfo.iam}</Text>
                <Text style={styles.bookIndexText}>{displayedAt(createdAt)}</Text>
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
export default editorBoard;