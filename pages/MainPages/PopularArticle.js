import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app'
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';
import BookComponent from '../../components/BookComponent';
import { useHeaderHeight } from '@react-navigation/stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';

const PopularArticle = ({ navigation, route }) => {
   const [list, setList] = useState([]);
   const [hotcolor, setHotColor] = useState("#21381c")
   const [newcolor, setNewColor] = useState("#E9E9E9")
   const headerHeight = useHeaderHeight();
   const ScreenHeight = Dimensions.get('window').height   //height
   const BottomSpace = getBottomSpace()
   const tabBarHeight = useBottomTabBarHeight();
   const statusBarHeight = getStatusBarHeight();
   const realScreen = ScreenHeight-headerHeight-BottomSpace-tabBarHeight;


   
   
useEffect(()=>{
        firebase_db
             .ref(`book`)
             .on('value',(snapshot) =>{
             let list = [];
             let temp = [];
             snapshot.forEach((child) => {
                     const book = child.val();
                     const {chapters} = book;
                     if (chapters == undefined) {
                            // console.log("PopularArticle() 챕터가 없습니다")
                         } else {
                             list = [...list, ...Object.values(chapters)]; // spread를 통한 리스트 병합
                        }
                         list.sort(function(a, b) {
                                return (b.likeCount) - (a.likeCount)
                                })
                        setList(list);
                    })
                })
        }, [])

                
        const viewHot = () => {
               // console.log("viewHot")
                const hotlist = [...list];
                hotlist.sort(function(a, b) {
                        return (b.likeCount) - (a.likeCount)
                        })
                setList(hotlist);
                console.log("viewHot done")
                console.log ("list 2 (hot): " + {list});

                setHotColor("#21381C");
                setNewColor("#E9E9E9")
        }

        const viewNew = () => {
               // console.log("viewNew")
                const newlist = [...list]
                newlist.sort(function(a, b) {
                        return new Date(b.regdate) - new Date(a.regdate);
                                })
                setList(newlist);
                console.log("viewNew done")
                console.log("list 3 (new): " + {list});

                setHotColor("#E9E9E9")
                setNewColor("#21381C")
        }
        


        return (
        <View style={{flex: 1}}>
        <View style={{flexDirection: "row", height: "3%", marginVertical: "2%"}}>
                <TouchableOpacity 
                        style={{flex:1, marginLeft: "2%", marginRight: "1%"}} 
                        onPress={()=>viewHot()}>
                        <Text style={{alignSelf: "center", fontSize: 17}} > 인기 이별록 </Text>
                        <View style={{fontSize: 17, borderBottomWidth: 3, borderBottomColor: hotcolor, marginTop: "3%"}}/> 
                </TouchableOpacity>
                <TouchableOpacity 
                        style={{flex:1,marginRight: "2%", marginRight: "1%"}} 
                        onPress={()=>viewNew()}>
                        <Text style={{fontize: 17, alignSelf: "center", fontSize: 17}}> 최신 이별록 </Text>
                        <View style={{fontSize: 17, borderBottomWidth: 3, borderBottomColor: newcolor, marginTop: "3%"}}/> 
                </TouchableOpacity>
        </View>
        <View style={{flex:5, backgroundColor: "#E9E9E9"}}>
                <ScrollView style={{flex:1, marginHorizontal: "2%", backgroundColor:"#FAFAFA"}}>
                        {list.map(chapters => (
                                <ChapterItem
                                        key={chapters.key}
                                        navigation={navigation}
                                        chapters={chapters}
                                        chapterKey={chapters.chapterKey}
                                        bookKey={chapters.bookKey}
                                        />))
                        }
                </ScrollView>
        </View>
        </View>
        )
        
}



const ChapterItem = ({ navigation, chapters, chapterKey, bookKey }) => {
       // console.log('PopularArticle.js (1), chapters: ',chapters);
        const [book,setBook] = useState([]);
        const [item, setItem] = useState([]);
        const [likeCount, setLikeCount] = useState(0);
        const [commentsNumber, setCommentsNumber] = useState(0);
        const likeRef = firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/likes/');
        const headerHeight = useHeaderHeight();
        const ScreenHeight = Dimensions.get('window').height   //height
        const BottomSpace = getBottomSpace()
        const tabBarHeight = useBottomTabBarHeight();
        const statusBarHeight = getStatusBarHeight();
        const realScreen = ScreenHeight-headerHeight-BottomSpace-tabBarHeight;

        var user = firebase.auth().currentUser;
        var user_uid
        if (user != null) {
                user_uid = user.uid;
        }
        
        var userID = user_uid.substring(0, 6)

        useEffect(() => {
                let temp = [];
                let data = firebase_db.ref(`book/${bookKey}`)
                    .once('value', (snapshot) => {
                        temp.push(snapshot);
                        });
                        setItem(temp);
                        console.log("temp: " + temp)
            }, [])
   

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
            })
        }, [])
    
        useEffect (()=>{
               // console.log('PopularArticle.js (2), item: ',item);

            let arr = firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/comments/')
            .on('value', (snapshot) => {
               var commentsNumber = snapshot.numChildren();
               setCommentsNumber(commentsNumber)
            })
        }, [])


        return (
                <View style={{height: realScreen*0.35, backgroundColor: "white", marginBottom: "1%"}}>
                        <TouchableOpacity style={{  flex:1, marginVertical: "1%", }} onPress={() => {
                                       console.log('PopularArticle.js (2), chapters: ',chapters);
                                        navigation.navigate('MyArticle', { chapterKey: chapters.chapterKey, bookKey: chapters.bookKey }) }
                                }>
                                <View style={{flex:1,  flexDirection: "row", }}>
                                        <View style={{flex:1, marginHorizontal: "5%", marginTop: "2%"}}>
                                                <View style={{flex:5}}>
                                                <Text style={{fontSize: 16, fontWeight: "700", marginHorizontal: "5%", marginTop: "3%"}} numberOfLines={1}>{chapters.chapterTitle}</Text>
                                                <Text style={{ fontWeight: "500", marginHorizontal: "5%", marginTop: "2%"}} numberOfLines={6} line>{chapters.mainText}</Text>
                                                </View>
                                                <View>
                                                        <Text style={{ marginLeft: "5%", fontSize: 10 }}>{chapters.Kregdate}</Text>
                                                </View>
                                                <View style={{ flex: 1, flexDirection: "row"}}>
                                                        <Icon name="like2" size={15} color="black" style={{ marginLeft: 10, marginTop: 5 }} />
                                                        <Text style={styles.bookIndexText}>{likeCount}</Text>
                                                        <Icon name="message1" size={15} color="black" style={{ marginLeft: 10, marginTop: 5 }} />
                                                        <Text style={styles.bookIndexText}>{commentsNumber}</Text>
                                                </View>
                                        </View>
                                        <View>
                                                <BookComponent
                                                users_uid={item.user_uid}
                                                navigation={navigation}
                                                item={item}
                                                />
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

export default PopularArticle;
