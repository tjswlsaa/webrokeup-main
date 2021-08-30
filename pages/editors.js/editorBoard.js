import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions,SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/Feather';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
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

                <ScrollView style={{height:500}}>

                        {writings.map((item,index) => {
                            return (
                                <WritingItem
                                    navigation={navigation}
                                    key = {item.key}
                                    writing={item}
                                    list={writings}
                                    index={index}

                                />
                            )
                        })}
                </ScrollView>
                
                <View>



                </View>


        </SafeAreaView>
    )
}


const WritingItem=(props)=> {
    const {writing, navigation,index, list}=props;
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

  const headerHeight = useHeaderHeight();
  const ScreenHeight = Dimensions.get('window').height   //height
  const ScreenWidth = Dimensions.get('window').width
  console.log(ScreenWidth)
  const BottomSpace = getBottomSpace()
  // const statusBarHeight = getStatusBarHeight();
  const realScreen = ScreenHeight - headerHeight - BottomSpace 


    return (
        <View style={{backgroundColor:"white", marginTop:10,borderRadius:10, marginLeft:10, marginRight:10, height:realScreen*0.5}}>
            <TouchableOpacity style={styles.bookIndexOne} onPress={() => { navigation.navigate('readEditorWriting', { writingKey:writing.key, navigation: navigation, index:index, list:list}) }}>
                <Image style={{height:realScreen*0.25, borderRadius: 10, width:"100%"}} source={{uri:writing.image}}></Image>

                <Text style={{fontSize:18, marginHorizontal:"3%", marginTop:"5%", fontWeight:"500"}} numberOfLines={2}>{writing.title}</Text>

                <Text style={{fontSize:15, marginTop:"2%",marginHorizontal:"3%",}} numberOfLines={3}>{writing.summary}</Text>
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