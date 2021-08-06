import React, { useEffect, useState } from 'react';
import { AppRegistry, StyleSheet, SafeAreaView, Dimensions, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app'
import { firebase_db } from '../../firebaseConfig';
import Swiper from 'react-native-swiper';
import bookPng from '../../assets/book.png';
import BookComponent from '../../components/BookComponent';
import { useHeaderHeight } from '@react-navigation/stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';


// const test1 = {
//     userinfo: ''
// }

const test2 = {
    bookTitle: '',
    bookKey: '',
    chapters: {},
    intro: '',
    isPublic: '',
    regdate: '',
    url: '',
    user_uid: ''
}
const test3 = {
    chapterKey: '',
    chapterTitle: '',
    likeCount: '',
    likes: {},
    mainText: '',
    Kregdate: '',
    regdate: ''
}

const test4 = {
    chapteritem:""
}

const Main = (navigation ) => {
   


    const [book, setBook] = useState([]);
    test2.book = book;
    const [hotChapter, setHotChapter] = useState([]);
    test3.hotChapter = hotChapter;
    const [swiper, setSwiper] = useState(null);
    const [autoSwiper, setAutoSwiper] = useState(null);
    const [writings, setWritings] =useState([])
    const headerHeight = useHeaderHeight();
    const ScreenHeight = Dimensions.get('window').height   //height
    const BottomSpace = getBottomSpace()
    const tabBarHeight = useBottomTabBarHeight();
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight-headerHeight-BottomSpace-tabBarHeight

      
    
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

   

    useEffect(() => {
        let temp = [];
        let data = firebase_db.ref('book/')
            .once('value', (snapshot) => {
                snapshot.forEach((child) => {
                    temp.push(child.val());
                });
                setBook(temp);
            })
    }, [])

    useEffect(() => {
        
        firebase_db
            .ref(`book`)
            .on('value', (snapshot) => {
                let hotlist = [];
               // console.log({ snapshot });
                //// console.log({'typeof snapshot': typeof snapshot});
                //// console.log({'snapshot.length': snapshot.length});
                snapshot.forEach((child) => {
                    const book = child.val();
                    const { chapters } = book;

                    if (chapters == undefined){
                       // console.log("Main() 챕터가 없습니다")
                    }else{
                        hotlist = [...hotlist, ...Object.values(chapters)];
                    }
                   // console.log({ chapters })
                     // spread를 통한 리스트 병합
                });
                hotlist.sort(function (a, b) {
                    return (b.likeCount) - (a.likeCount)
                });
                // 전체 snapshot 중에서, 앞에거 두 개만 갖고 오고 싶을 경우!
                const hotChapter = [];
                if (hotlist.length >= 1) {
                    hotChapter.push(hotlist[0]);
                }
                if (hotlist.length >= 2) {
                    hotChapter.push(hotlist[1]);
                }
                if (hotlist.length >= 3) {
                    hotChapter.push(hotlist[2]);
                }
                setHotChapter(hotChapter);
               // console.log({ hotChapter })
               // console.log("hotChapter.chapterkey: ~~~" + hotChapter.chapterKey)
            })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 , backgroundColor: "#fbfbfb"}}>
            <StatusBar style= "white" />
                <View style={{height: realScreen*0.06, alignItems:"center", borderBottomColor: "#D9D9D9", borderBottomWidth:0.5, justifyContent:"center", backgroundColor: "white", }}>
                    <Text style={{fontSize:17, fontWeight:"700", marginTop: "2%", color: "#21381c"}}>이별록</Text>
                </View>
            <View style={{ height: realScreen*0.45,}}>
                <View style={{flex: 1, flexDirection:"row", marginTop: "5%", marginHorizontal: "3%"}}>
                    <View style={{ flex:4, }} >
                        <Text style={{ fontSize: 20, fontWeight: "700" }}> 오늘의 이별집 </Text>
                    </View>
                    <TouchableOpacity style={{ flex: 1, borderRadius: 5, height: "100%", backgroundColor: "#21381c", }}
                    onPress={() => { navigation.navigate('PopularBook'), {bookKey: bookKey} }}>
                        <Text style={{alignSelf: "center", marginTop: "10%", color: "white"}}>더보기</Text>
                    </TouchableOpacity>
                    </View>
                <View style= {{flex: 10}}> 
                    <Swiper
                        index={book.bookKey}
                        loop={false}
                        showsPagination={false}
                        onSwiper={setSwiper}
                        showsButtons={false}
                        style={{flex: 1, backgroundColor: "white", marginHorizontal: "3%"}}
                    >
                        {book.map(item => (
                            <BookItem
                                key={item.bookKey}
                                navigation={navigation}
                                item={item}
                                bookKey={item.bookKey}
                            />
                        ))}
                    </Swiper>
                </View>
            </View>
            <View style={{ height: realScreen*0.22, backgroundColor: "#FAFAFA" , marginHorizontal: "3%"}}>
                <View style={{flex:1, flexDirection: "row", marginTop: "2%"}}>
                <View style={{ flex: 4}}> 
                    <Text style={{ fontSize: 20, fontWeight: "700" }}> 오늘은 어떤가요 </Text>
                </View>
                <TouchableOpacity style={{ flex: 1, borderRadius: 5, height: "100%", backgroundColor: "#21381c", }}
                    onPress={() => { navigation.navigate('PopularArticle')}}>
                        <Text style={{alignSelf: "center", marginTop: "10%", color: "white"}} >더보기</Text>
                    </TouchableOpacity>
                    </View>
                <View style={{flex: 5}} horizontal={true}>
                    <Swiper
                        index={hotChapter.chapterKey}
                        loop={false}
                        showsPagination={false}
                        onSwiper={setAutoSwiper}
                        style={{ marginTop: "5%" }} 
                        showsButtons={false}
                    >
                        {hotChapter.map(chapters => (
                            test4.chapters=chapters,
                           // console.log("hotChapter 맵 운영 중"),
                            <ChapterItem
                                key={chapters.chapterKey}
                                navigation={navigation}
                                chapters={chapters}
                                chapterKey={chapters.chapterKey}
                                bookKey={chapters.bookKey}
                            />)
                        )}
                    </Swiper>
                </View>
                
            </View>
            <View style={{ flex:1, height: realScreen*0.24,  marginHorizontal: "3%"}}>
                <View stlye={{flex: 1, flexDirection: "row", marginHorizontal:"3%", backgroundColor: "purple"}}>
                    <View style={{ }}>
                        <Text style={{fontSize: 20, fontWeight: "700" }}> 이별 에디터 </Text>
                    </View>
                    <TouchableOpacity style={{borderRadius: 5, height: "100%", backgroundColor: "#21381c"}}
                        onPress={() => { navigation.navigate('editorBoard')}}>
                            <Text style={{alignSelf: "center", marginTop: "10%", color: "white"}}>더보기</Text>
                    </TouchableOpacity>
                </View>
                <View style= {{flex: 3}}>  
                    <ScrollView style={{flex: 1, marginTop: "3%"}} horizontal = {true}>
                            {writings.map(item => {
                                        return (
                                            <WritingItem
                                                navigation={navigation}
                                                key={item.writingKey}
                                                writing={item}

                                            />
                                        )
                                    })}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}
// sub components
const BookItem = ({ navigation, item, bookKey }) => {

    const [BookItemUserinfo, setBookItemUserinfo] = useState({
        iam:"익명의.지은이",
        selfLetter:"안녕하세요 익명의 지은이입니다."
    });
    
    useEffect(()=>{
      firebase_db.ref(`users/${item.user_uid}`)
          .on('value', (snapshot) => {
              let BookItemUserinfo = snapshot.val();
              if (BookItemUserinfo > '') {
                setBookItemUserinfo(BookItemUserinfo);
              }
          })
  }, []);

    return (
        <TouchableOpacity style = {{flex: 1, shadowColor: "#E9E9E9", shadowOffset: {width: 10, height: 7}, shadowOpacity: 10, shadowRadius: 10}} 
        onPress={() => { navigation.navigate('readBook', {bookKey: bookKey, }) }}>
            <View style= {{flex: 1, flexDirection: "row"}}>
                <BookComponent
                    navigation={navigation}
                    item={item}
                />

                <View style={{flex: 1, backgroundColor: "#E9E9E9", borderWidth: 1, width: "100%", height: "72%", marginTop: "11%", marginRight:"8%"}}>
                    <Text style = {{marginHorizontal: "12%", marginTop: "20%", textAlign: "center", lineHeight: 20, fontSize: 13}} numberOfLines={7}>{item.intro}</Text>
                    <Text style = {{marginHorizontal: "10%", marginVertical: "15%", textAlign: "center", fontSize: 13}}>-{BookItemUserinfo.iam}-</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const ChapterItem = ({ navigation, chapters, chapterKey }) => {

    const [ChapterItemUserinfo, setChapterItemUserinfo] = useState({
        iam:"익명의.지은이",
        selfLetter:"안녕하세요 익명의 지은이입니다."
    });

    console.log({chapters})
  
    
    useEffect(()=>{
      firebase_db.ref(`users/${chapters.creator}`)
          .on('value', (snapshot) => {
              let ChapterItemUserinfo = snapshot.val();
              if (ChapterItemUserinfo > '') {
                setChapterItemUserinfo(ChapterItemUserinfo);
              }
          })
  }, []);


    return (
            <TouchableOpacity style={{ marginHorizontal: "3%", borderRadius: 10, height: "88%", backgroundColor: "#fff", borderColor: "#A2A2A2", borderWidth: 1}} 
            onPress={() => { navigation.navigate('readArticle', { chapters: chapters, chapterKey: chapterKey, bookKey: chapters.bookKey }) }}>
                <Text style={{ fontSize: 16, fontWeight: '700', marginHorizontal: "5%", marginTop: "5%" }} numberOfLines={1}>{chapters.chapterTitle}</Text>
                <Text style={{ fontSize: 15, fontWeight: '400', marginHorizontal: "5%", marginTop: "2.5%", marginBottom: "2%", alignSelf: "center" }} numberOfLines={2}>{chapters.mainText}</Text>
                <Text style={{ fontSize: 15, fontWeight: '400', marginHorizontal: "5%" }}> by. {ChapterItemUserinfo.iam} </Text>
            </TouchableOpacity>
    )
}

const WritingItem=(props)=> {
    const {writing, navigation}=props;

    const [WritingItemUserinfo, setWritingItemUserinfo] = useState({
        iam:"익명의.지은이",
        selfLetter:"안녕하세요 익명의 지은이입니다."
    });
    
    useEffect(()=>{
      firebase_db.ref(`users/${writing.creator}`)
          .once('value', (snapshot) => {
              let WritingItemUserinfo = snapshot.val();
              if (WritingItemUserinfo > '') {
                setWritingItemUserinfo(WritingItemUserinfo);
              }
          })
  }, []);
    return (
        <View style={{backgroundColor:"white", marginTop:10,borderRadius:10, marginLeft:10, marginRight:10}}>
            <TouchableOpacity style={styles.bookIndexOne} onPress={() => { navigation.navigate('readEditorWriting', { writingKey:writing.key, navigation: navigation}) }}>
                <View style={{backgroundColor:"#A2AD9C", width: 150, height: 100, borderRadius: 10}}>
                    <View style={{margin: "10%"}}>
                        <Text style={{fontSize: 15, color: "white", fontWeight: "600"}} numberofLines={3}>{writing.title}</Text>
                        <Text style={{fontSize: 13, marginTop: 10}} numberofLines={3}>{writing.text}</Text>
                    </View>
                </View>
                <Text style={styles.bookIndexText}>{WritingItemUserinfo.iam}</Text>
            </TouchableOpacity>
            {/* <View style={{ borderBottomColor: "gray", borderBottomWidth: 1, }} /> */}
            <View style={{flexDirection:"row"}}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginTop: "3%",
        width: "100%",
        height: "25%",
        backgroundColor: '#fff',
    },
    subBook01: {
        backgroundColor: "grey",
        width: 150,
        height: "90%",
        marginRight: 5,
        marginLeft: 16,
    },
    bookButtonImage: {
        backgroundColor: "grey",
        width: 150,
        height: "90%",
        marginRight: 5,
        marginLeft: 16,
    },
    chOne: {
        marginTop: "5%",
        marginLeft: "5%",
        marginRight: "3%",
        marginBottom: "5%",
    },
    chTitle: {
        fontSize: 15,
    },
    chOnePunchLine: {
        fontWeight: '700',
        marginLeft: "5%",
        marginTop: "2%",
    },
    chWriter: {
        marginLeft: "5%",
        marginTop: "2%",
    },
})

AppRegistry.registerComponent('Main', () => SwiperComponent)
export default Main;