import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app'
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';

const PopularArticle = ({ navigation, route }) => {
   const [list, setList] = useState([]);
   const [book, setBook] = useState([]);
   const [color, setColor] = useState('#E9E9E9')
//    const [book, setBook] = useState([]);

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
                    
                    const item = {
                            ...child.val(),
                            key: child.key,
                    }
                    temp.push(item)
                })
                setBook(temp)
             })
        }, [])

                
        const viewHot = () => {
               // console.log("viewHot")
                const hotlist = [...list];
                hotlist.sort(function(a, b) {
                        return (b.likeCount) - (a.likeCount)
                        })
                setList(hotlist);
               // console.log("viewHot done")
               // console.log ("list 2 (hot): " + {list})
        }

        const viewNew = () => {
               // console.log("viewNew")
                const newlist = [...list]
                newlist.sort(function(a, b) {
                        return new Date(b.regdate) - new Date(a.regdate);
                                })
                setList(newlist);
               // console.log("viewNew done")
               // console.log("list 3 (new): " + {list})
        }
        


        return (
        <View style={{flex: 1}}>
        <View style={{flexDirection: "row", height: "3%", marginTop: "2%"}}>
                <TouchableOpacity 
                        style={{flex:1, borderRadius: 5, backgroundColor: "#D1EAEE", marginLeft: "2%", marginRight: "1%"}} 
                        onPress={()=>viewHot()}>
                        <Text style={{alignSelf: "center", fontSize: 16}} > 인기 이별록 </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                        style={{flex:1, borderRadius: 5, backgroundColor: "#E9E9E9", marginRight: "2%", marginRight: "1%"}} 
                        onPress={()=>viewNew()}>
                        <Text style={{alignSelf: "center", fontSize: 16}}> 최신 이별록 </Text>
                </TouchableOpacity>
        </View>
        <View style={{flex:1, backgroundColor: "#E9E9E9"}}>
        <ScrollView style={styles.container}>
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

        const [likeCount, setLikeCount] = useState(0);
        const [commentsNumber, setCommentsNumber] = useState(0);
        const likeRef = firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/likes/');
        
       // console.log("likeRef: " +likeRef)
       // console.log({chapters})

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
               // console.log('PopularArticle.js (2), chapters: ',chapters);

            let arr = firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/comments/')
            .on('value', (snapshot) => {
               var commentsNumber = snapshot.numChildren();
               setCommentsNumber(commentsNumber)
            })
        }, [])


        return (
                <View>
                        <TouchableOpacity style={styles.bookIndexOne} onPress={() => {
                                       // console.log('PopularArticle.js (2), chapters: ',chapters);
                                        navigation.navigate('readArticle', { chapters: chapters, chapterKey: chapters.chapterKey, bookKey: chapters.bookKey }) }
                                }>
                                <Text style={styles.bookIndexOneTitle} numberOfLines={1}>{chapters.chapterTitle}</Text>
                                <Text style={styles.bookIndexOnePunchLine} numberOfLines={3}>{chapters.mainText}</Text>
                                <View style={{ flexDirection: "row", marginTop: 10, }}>
                                        {/* <Text style={styles.bookIndexText}>{post.iam}</Text> //이별록 포스팅에서 이용 */}
                                        <Icon name="like2" size={15} color="black" style={{ marginLeft: 20, marginTop: 5 }} />
                                        <Text style={styles.bookIndexText}>{likeCount}</Text>
                                        <Icon name="message1" size={15} color="black" style={{ marginLeft: 20, marginTop: 5 }} />
                                        <Text style={styles.bookIndexText}>{commentsNumber}</Text>
                                        <Text style={{ marginLeft: "20%", marginTop: 3 }}>{chapters.Kregdate}</Text>
                                </View>
                        </TouchableOpacity>
                        <View style={{ borderBottomColor: "gray", borderBottomWidth: 1, }} />
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
