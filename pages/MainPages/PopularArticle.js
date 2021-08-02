import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app'
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';
const test4 = {
        chapterKey: '',
        chapterTitle: '',
        likeCount: '',
        likes: {},
        mainText: '',
        Kregdate: '',
        regdate: ''
     }
const PopularArticle = ({ navigation, route }) => {
   const [value, setValue] = useState('recent');
   const [list, setList] = useState([]);
   test4.list = list
   useEffect(()=>{
           firebase_db
                .ref(`book`)
                .on('value',(snapshot) =>{
                let list = [];
                // console.log({snapshot});
                // console.log({'typeof snapshot': typeof snapshot});
                // console.log({'snapshot.length': snapshot.length});
                snapshot.forEach((child) => {
                        const book = child.val();
                        const {chapters} = book;
                        if (chapters == undefined) {
                                console.log("챕터가 없습니다")
                            } else {
                                list = [...list, ...Object.values(chapters)]; // spread를 통한 리스트 병합
                            }
                });
                if(value !== hot) {
                        list.sort(function(a, b) {
                        return new Date(b.regdate) - new Date(a.regdate);
                        })
                } else {
                        list.sort(function(a, b) {
                        return (b.likeCount) - (a.likeCount)
                        })
                }
                setList(list);
                }) 
        }, [])
        const ChapterItem = ({ navigation, chapteritem, chapterKey }) => {
           console.log("chapteritem running")
           console.log({ chapteritem });
                return (
                        <View>
                                <TouchableOpacity style={styles.bookIndexOne} onPress={() => { navigation.navigate('readArticle', { chapteritem: chapteritem }) }}>
                                        <Text style={styles.bookIndexOneTitle} numberOfLines={1}>{chapteritem.chapterTitle}</Text>
                                        <Text style={styles.bookIndexOnePunchLine} numberOfLines={3}>{chapteritem.mainText}</Text>
                                        <View style={{ flexDirection: "row", marginTop: 10, }}>
                                                {/* <Text style={styles.bookIndexText}>{post.iam}</Text> //이별록 포스팅에서 이용 */}
                                                <Icon name="like2" size={15} color="black" style={{ marginLeft: 20, marginTop: 5 }} />
                                                {/* <Text style={styles.bookIndexText}>{likeCount}</Text> */}
                                                <Icon name="message1" size={15} color="black" style={{ marginLeft: 20, marginTop: 5 }} />
                                                {/* <Text style={styles.bookIndexText}>{commentsNumber}</Text> */}
                                                <Text style={{ marginLeft: "20%", marginTop: 3 }}>{chapteritem.Kregdate}</Text>
                                        </View>
                                </TouchableOpacity>
                                <View style={{ borderBottomColor: "gray", borderBottomWidth: 1, }} />
                        </View>
                )
        }
        return (
        <View style={{flex: 1}}>
        <View style={{flexDirection: "row", height: "3%", marginTop: "2%"}}>
                <TouchableOpacity 
                        style={{flex:1, borderRadius: 5, backgroundColor: "#D1EAEE", marginLeft: "2%", marginRight: "1%"}}>
                        <Text style={{alignSelf: "center", fontSize: 16}}> 인기 이별록 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1, borderRadius: 5, backgroundColor: "#E9E9E9", marginRight: "2%", marginRight: "1%"}}>
                        <Text style={{alignSelf: "center", fontSize: 16}}> 최신 이별록 </Text>
                </TouchableOpacity>
        </View>
        <View style={{flex:1, backgroundColor: "#E9E9E9"}}>
        <ScrollView style={styles.container}>
           {list.map(chapteritem => (
              console.log("hotChapter 맵 운영 중"),
              <ChapterItem
                key={chapteritem.key}
                navigation={navigation}
                chapteritem={chapteritem}
                chapterKey={chapteritem.chapterKey}
              />)
           )}
        </ScrollView>
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