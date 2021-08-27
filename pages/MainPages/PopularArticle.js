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

const PopularArticle = ({ navigation, route }) => {
   const [list, setList] = useState([]);
   const [hotcolor, setHotColor] = useState("#21381c")
   const [newcolor, setNewColor] = useState("#E9E9E9")
   const headerHeight = useHeaderHeight();
   const ScreenHeight = Dimensions.get('window').height   //height
   const BottomSpace = getBottomSpace()
   const tabBarHeight = 0
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
                     console.log("useeffectbook",book)
                     
                     if (chapters == undefined) {
                            console.log("PopularArticle() 챕터가 없습니다")
                         } else {
                             list = [...list, ...Object.values(chapters)]; // spread를 통한 리스트 병합
                        }
                        const arraylist = Object.values(list)
                        const listFiltered = arraylist.filter(filteredList => filteredList.isPublic == true)
                
                        listFiltered.sort(function(a, b) {
                                return (b.likeCount) - (a.likeCount)
                                })
                        setList(listFiltered);
                    })
                })
        }, []) // 여기에 원래 list 가 있었음... 이거 없애니 렉은 안걸림
        // console.log("populararticlelist",list)


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
                // console.log("viewNew done")
                // console.log("list 3 (new): " + {list});

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



const ChapterItem = ({ navigation, chapters, chapterKey, bookKey, list }) => {
       // console.log('PopularArticle.js (1), chapters: ',chapters);
       console.log("popualr bookKey",bookKey)
        const [book,setBook] = useState([]);
        console.log("popular article",book)
        console.log("popular articlechapters",chapters)

        const [likeCount, setLikeCount] = useState(0);
        const [commentsNumber, setCommentsNumber] = useState(0);
        const likeRef = firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/likes/');
        const headerHeight = useHeaderHeight();
        const ScreenHeight = Dimensions.get('window').height   //height
        const BottomSpace = getBottomSpace()
        const tabBarHeight = 0
        const statusBarHeight = getStatusBarHeight();
        const realScreen = ScreenHeight-headerHeight-BottomSpace-tabBarHeight;
        const ScreenWidth = Dimensions.get('window').width  //screen 너비


        const [myitem, setMyitem] = useState({
                bookKey: '',
                bookTitle: '',
                chapters: {},
                intro: '',
                regdate: '',
                url: '',
                user_uid: '',
            });

        useEffect(getMyItem, [list]);
        function getMyItem() {
            //console.log('getMyItem()');
            // bookKey-> myitem
            firebase_db
                .ref(`/book/${bookKey}`)
                .on('value', (snapshot) => {
                    const newMyitem = {};
                    snapshot.forEach((child) => {
                        const key = child.key;
                        const value = child.val();
                        newMyitem[key] = value; // 우리가 잘 아는 javascript object가 된다!
                    });
                    setMyitem({
                        ...myitem, // 기본 바탕색
                        ...newMyitem, // 덧칠
                    });
                });
        }


        console.log("book popular myitem", myitem)
        console.log("book popular chapters.user_uid", chapters.creator)

        const [userinfo, setuserinfo] = useState({
            iam:"익명의.지은이",
            selfLetter:"안녕하세요 익명의 지은이입니다."
        });

        useEffect(getuserinfo, []);

         function getuserinfo(){
                 
          firebase_db.ref(`users/${chapters.creator}`)
              .on('value', (snapshot) => {
                  let userinfo = snapshot.val();
                  if (userinfo > '') {
                        setuserinfo(userinfo);
                  }
              })
        }

        let iam = userinfo.iam;
        console.log({iam})
        let selfLetter = userinfo.selfLetter;
        console.log({selfLetter})

        const firstColor= "#9E001C"
        const secondColor="#F6AE2D"
        const thirdColor = "#33658A"
        const fourthColor= "#494949"

        function getColor(bookKey) {
                if (bookKey.indexOf('1') == 0){
                return firstColor
                }
                else if (bookKey.indexOf('2') == 0){
                return secondColor
                }
                else if (bookKey.indexOf('3') == 0){
                return thirdColor
                }
                else if (bookKey.indexOf('4') == 0){
                return fourthColor
                }
            }
            const Color = getColor(bookKey);
            console.log("populararticle Color", Color)



        useEffect (()=>{
            // let temp = [];
            let arr = likeRef
            .on('value', (snapshot) => {
                let temp = [];
                var likeCount = snapshot.numChildren();
               // console.log('useEffect()');
               console.log({likeCount});
                setLikeCount(likeCount)
                //// console.log(likeCount)
                snapshot.forEach((child) => {
                    temp.push(child.val());
                })
            })
        }, [])
    
        useEffect (()=>{
               // console.log('PopularArticle.js (2), item: ',item);

            let arr = firebase_db.ref(`book/${bookKey}/both/` + chapters.chapterKey + '/comments/')
            .on('value', (snapshot) => {
               var commentsNumber = snapshot.numChildren();
               setCommentsNumber(commentsNumber)
            })
        }, [])


        return (
                <View style={{height: realScreen*0.35, flexDirection: "row", backgroundColor:"#F5F4F4"}}>

                        <View style={{flex: 1,}}>
                                <TouchableOpacity style={{  flex:1, padding:"5%" }} onPress={() => {
                                                navigation.navigate('MyArticle', { chapterKey: chapters.chapterKey, bookKey: chapters.bookKey }) }
                                        }>
                                        <View style={{flex:1,  flexDirection: "row"}}>
                                                <View style={{flex:1, marginHorizontal: "5%", marginTop: "2%", padding:"2%",backgroundColor:"white"}}>
                                                        <View style={{flex:5}}>
                                                        <Text style={{fontSize: 16, fontWeight: "700", marginHorizontal: "5%", marginTop: "15%"}} numberOfLines={1}>{chapters.chapterTitle}</Text>
                                                        <Text style={{ fontWeight: "500", marginHorizontal: "5%", marginTop: "2%"}} numberOfLines={6} >{chapters.mainText}</Text>
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
                                        </View>
                                </TouchableOpacity>
                        </View>

                        <View style={{flex: 1,}}>

                                <TouchableOpacity
                                onPress={() => {
                                        navigation.navigate('MyBookPublic', { bookKey: chapters.bookKey }) }
                                }
                                style={{ flexDirection: "row", height:ScreenHeight*0.3,width: ScreenWidth * 0.25,padding:"5%"}}>
                                        <View>
                                        <View style={{ backgroundColor:myitem.Color, opacity: 0.8, height: realScreen * 0.32, width: ScreenWidth * 0.042, zIndex: 1 }}>
                                        </View>

                                        <View style={{ backgroundColor: "#c5c5c5",zIndex: 0, position: "absolute", marginLeft: ScreenWidth * 0.025, height: realScreen * 0.32, width: ScreenWidth * 0.4, alignItems: "center", justifyContent: "center" }}>
                                        <Image source={{uri: myitem.url}} style={{zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.32, width: ScreenWidth * 0.4, alignItems: "center", justifyContent: "center"}}></Image>
                                        <View style={{ backgroundColor: "white", height: realScreen * 0.24, width: ScreenWidth * 0.29, }}>
                                                <Text style={{ marginTop: "30%", marginLeft: "10%" }}>{myitem.defaultTitle}</Text>
                                                <Text style={{ marginTop: "5%", marginLeft: "10%", fontWeight: "500" }}>{myitem.bookTitle}</Text>

                                                <Text style={{marginTop:"20%", marginLeft:"10%", fontSize:10}}>{userinfo.iam}</Text>
                                        </View>
                                        </View>
                                        </View>
                                </TouchableOpacity>

                        </View>

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
