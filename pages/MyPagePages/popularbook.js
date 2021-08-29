import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app'
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';
import BookComponent from '../../components/BookComponent';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Clover from 'react-native-vector-icons/MaterialCommunityIcons';

const popularbook = ({ navigation, route }) => {

       

        const headerHeight = useHeaderHeight();
        const ScreenHeight = Dimensions.get('window').height   //height
        const BottomSpace = getBottomSpace()
        const tabBarHeight = 0
        const statusBarHeight = getStatusBarHeight();
        const realScreen = ScreenHeight - headerHeight - BottomSpace - tabBarHeight;


        const [list2, setList2] = useState([]);

        const [selectedList2, setSelectedList2] = useState([]);
        
        useEffect(() => {
            firebase_db
                    .ref(`book`)
                    .on('value', (snapshot) => {
                            let list = [];
                            let temp = [];
                                    const book = snapshot.val();
                                    //      console.log("useeffectbook",book)
        
                                    if (book == undefined) {
                                            console.log("PopularArticle() 챕터가 없습니다")
                                    } else {
                                            list = [...list, ...Object.values(book)]; // spread를 통한 리스트 병합
                                    }
                                    const listFiltered2 = Object.values(book)
        
                                    listFiltered2.sort(function (a, b) {
                                            return (b.CountLikes) - (a.CountLikes)
                                    })
                                    
                                    setList2(listFiltered2);
        
                                    const listoften = [];
                                    if (listFiltered2.length >= 1) {
                                        listoften.push(listFiltered2[0]);
                                    }
                                    if (listFiltered2.length >= 2) {
                                        listoften.push(listFiltered2[1]);
                                    }
                                    if (listFiltered2.length >= 3) {
                                            listoften.push(listFiltered2[2]);
                                        }
                                    if (listFiltered2.length >= 4) {
                                    listoften.push(listFiltered2[3]);
                                    }
                                    if (listFiltered2.length >= 5) {
                                    listoften.push(listFiltered2[4]);
                                    }
                                    if (listFiltered2.length >= 6) {
                                    listoften.push(listFiltered2[5]);
                                    }
                                    if (listFiltered2.length >= 7) {
                                    listoften.push(listFiltered2[6]);
                                    }
                                    if (listFiltered2.length >= 8) {
                                    listoften.push(listFiltered2[7]);
                                    }
                                    if (listFiltered2.length >= 9) {
                                    listoften.push(listFiltered2[8]);
                                    }
                                    if (listFiltered2.length >= 10) {
                                    listoften.push(listFiltered2[9]);
                                    }
                                    if (listFiltered2.length >= 11) {
                                        listoften.push(listFiltered2[10]);
                                        }
                                if (listFiltered2.length >= 12) {
                                        listoften.push(listFiltered2[11]);
                                }
                                if (listFiltered2.length >= 13) {
                                        listoften.push(listFiltered2[12]);
                                        }
                                        if (listFiltered2.length >= 14) {
                                                listoften.push(listFiltered2[13]);
                                                }
                                                if (listFiltered2.length >= 15) {
                                                        listoften.push(listFiltered2[14]);
                                                        }
        
                                    setSelectedList2(listoften);
                           
                    })
        }, []) // 여기에 원래 list 가 있었음... 이거 없애니 렉은 안걸림
        // console.log("populararticlelist",list)
        //큐레이팅 설문지
        





        return (
                <View style={{ flex: 1 }}>

                        <View style={{ flex: 5, backgroundColor: "#F5F4F4" }}>
                                <ScrollView style={{ flex: 1, marginHorizontal: "2%", backgroundColor: "#FAFAFA" }}>
                                        {selectedList2.map((book,index) => (
                                                <ChapterItem
                                                        key={book.key}
                                                        navigation={navigation}
                                                        book={book}
                                                        bookKey={book.bookKey}
                                                        CountLikes={book.CountLikes}
                                                        selectedList={selectedList2}
                                                />))
                                        }
                                </ScrollView>
                        </View>
                </View>
        )

}



const ChapterItem = ({ navigation, book, bookKey, CountLikes, selectedList}) => {

        
        const headerHeight = useHeaderHeight();
        const ScreenHeight = Dimensions.get('window').height   //height
        const BottomSpace = getBottomSpace()
        const tabBarHeight = 0
        const statusBarHeight = getStatusBarHeight();
        const realScreen = ScreenHeight - headerHeight - BottomSpace - tabBarHeight;
        const ScreenWidth = Dimensions.get('window').width  //screen 너비


        const [userinfo, setuserinfo] = useState({
                iam: "익명의.지은이",
                selfLetter: "안녕하세요 익명의 지은이입니다."
        });

        useEffect(getuserinfo, []);
        function getuserinfo() {

                firebase_db.ref(`users/${book.user_uid}`)
                        .on('value', (snapshot) => {
                                let userinfo = snapshot.val();
                                if (userinfo > '') {
                                        setuserinfo(userinfo);
                                }
                        })
        }





       


        return (
            <View style={{height: realScreen*0.4, backgroundColor:"#FBFBFB", width:"90%" , flexDirection:"row"}}>
            {/* <View style={{alignContent:"center"}}> */}
                                    <TouchableOpacity style={{width:ScreenWidth*0.4,  padding:"5%", justifyContent:"center", }} onPress={() => {navigation.navigate('readIntroArticle', { bookKey:book.bookKey, authorUser_uid:userinfo, intro:book.intro}) }}>
                                                                            <View style={{ width: ScreenWidth * 0.38,padding:"5%",height:realScreen * 0.32 ,backgroundColor:"white", marginHorizontal:"5%"}}>
                                                                                    <View style={{flexDirection:"row", height:realScreen*0.1 }}>
                                                                                            <View style={{backgroundColor:book.Color, flex:1, height:"50%", marginTop:"15%"}}> 
                                                                                            </View>
                                                                                            <Text style={{flex:15,fontSize: 16, fontWeight: "700",  marginTop: "20%",marginHorizontal: "5%",}}>말머리에서</Text>
                                                                                    </View>
                                                                                            <Text style={{ fontWeight: "500", marginHorizontal: "5%", marginTop: "5%", marginBottom:"5%", marginLeft:"5%", lineHeight:20}} numberOfLines={5} >{book.intro}</Text>
                                                                            </View>
                                        </TouchableOpacity>
                                       <TouchableOpacity style={{  justifyContent:"center",marginLeft:ScreenWidth*0.05}} onPress={() => {navigation.navigate('MyBookPublic', { bookKey:book.bookKey, userinfo:userinfo}) }}>
                                        <View style={{ backgroundColor:book.Color, opacity: 0.8, height: realScreen * 0.32, width: ScreenWidth * 0.042, zIndex: 1 }}>
                                        </View>
                                        <View style={{ 
                                            backgroundColor:book.Color,
                                            zIndex: 0, position: "absolute", marginLeft: ScreenWidth * 0.025, height: realScreen * 0.32, width: ScreenWidth * 0.4, alignItems: "center", justifyContent: "center" }}>
                                        <Image source={{uri: book.url}} style={{zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.32, width: ScreenWidth * 0.4, alignItems: "center", justifyContent: "center"}}></Image>
                                        <View style={{ backgroundColor: "white", height: realScreen * 0.24, width: ScreenWidth * 0.29, }}>
                                                <Text style={{ marginTop: "30%", marginLeft: "10%" }}>{book.defaultTitle}</Text>
                                                <Text style={{ marginTop: "5%", marginLeft: "10%", fontWeight: "500" }}>{book.bookTitle}</Text>
                                                <Text style={{marginTop:"20%", marginLeft:"10%", fontSize:10}}>{userinfo.iam}</Text>
                                        </View>
                                        </View>
                                        </TouchableOpacity> 
</View>
        )
}

const styles = StyleSheet.create({
        container: {
                backgroundColor: "#FAFAFA",
                flex: 1,
                marginHorizontal: "2%"
        },

        bookIndexOne: {
                marginVertical: "5%",
                marginHorizontal: "5%"
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

})

export default popularbook;
