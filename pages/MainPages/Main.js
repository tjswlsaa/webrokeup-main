import React, { useEffect, useState } from 'react';
import { AppRegistry, StyleSheet, SafeAreaView, Dimensions, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app'
import { firebase_db } from '../../firebaseConfig';
import Swiper from 'react-native-swiper';
import bookPng from '../../assets/book.png';
// import BookComponent from '../../components/BookComponent';
import { useHeaderHeight } from '@react-navigation/stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import covernpaper from '../../assets/covernpapernew.png';


const test1 = {
    userinfo: ''
}

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

const Main = ({navigation}) => {
   
    const [userinfo, setUserinfo] = useState({});

    useEffect(() => {
        firebase_db.ref(`users/${user_uid}/`)
            .on('value', (snapshot) => {
                let userinfo = snapshot.val();
                if (userinfo > '') {
                    setUserinfo(userinfo);
                }
            })
    }, []);

    var user = firebase.auth().currentUser;
var  user_uid
if (user != null) {
  user_uid = user.uid;  
}

    
    test1.userinfo = userinfo;


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
            <View style={{ height: realScreen*0.42}}>
                <View style={{flex: 1, flexDirection:"row", marginTop: "5%", marginHorizontal: "3%"}}>
                    <View style={{ flex:4, }} >
                        <Text style={{ fontSize: 18, fontWeight: "700" }}> 오늘의 이별집 </Text>
                    </View>
                    <TouchableOpacity style={{ flex: 1, borderRadius: 5, height: "100%", backgroundColor: "#21381c", }}
                    onPress={() => { navigation.navigate('PopularArticle')}}>
                        <Text style={{alignSelf: "center", marginTop: "10%", color: "white"}}>더보기</Text>
                    </TouchableOpacity>
                    </View>
                <View style= {{flex: 9}}> 

                    <Swiper
                        index={book.bookKey}
                        loop={false}
                        showsPagination={false}
                        onSwiper={setSwiper}
                        showsButtons={true}
                        style={{backgroundColor: "#fff", marginHorizontal: "4%",}}
                        nextButton={<Text style={styles.nextButtonText}>›</Text>}
                        prevButton={<Text style={styles.prevButtonText}>›</Text>}
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
            <View style={{ height: realScreen*0.23, backgroundColor: "#FAFAFA" }}>
                <View style={{flex:1, flexDirection: "row", marginTop: "2%", marginHorizontal: "3%"}}>
                <View style={{ flex: 4}}> 
                    <Text style={{ fontSize: 18, fontWeight: "700" }}> 오늘은 어떤가요 </Text>
                </View>
                <TouchableOpacity style={{ flex: 1, borderRadius: 5, height: "100%", backgroundColor: "#21381c", }}
                    onPress={() => { navigation.navigate('PopularArticle')}}>
                        <Text style={{alignSelf: "center", marginTop: "10%", color: "white"}} >더보기</Text>
                    </TouchableOpacity>
                    </View>
                <View style={{flex: 4.5, marginHorizontal: "2%"}} horizontal={true}>
                    <Swiper
                        index={hotChapter.chapterKey}
                        loop={true}
                        showsPagination={false}
                        onSwiper={setAutoSwiper}
                        style={{ marginTop: "5%" }} 
                        showsButtons={false}
                        autoplay={true}
                        autoplayTimeout={3}
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
            <View style={{ height: realScreen*0.24, backgroundColor: "#fafafa"}}>
                <View style={{flex:1, flexDirection: "row", marginTop: "2%", marginHorizontal: "3%"}}>
                    <View style={{flex: 4}}>
                        <Text style={{fontSize: 18, fontWeight: "700" }}> 에디터 </Text>
                    </View>
                    <TouchableOpacity style={{ flex:1, borderRadius: 5, height: "100%", backgroundColor: "#21381c"}}
                        onPress={() => { navigation.navigate('editorBoard')}}>
                            <Text style={{alignSelf: "center", marginTop: "10%", color: "white"}}>더보기</Text>
                    </TouchableOpacity>
                </View>
                <View style= {{flex:5}}>  
                    <ScrollView style={{flex: 1, marginTop: "1%", marginHorizontal: "2%"}} horizontal = {true}>
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
    const headerHeight = useHeaderHeight();
    const ScreenHeight = Dimensions.get('window').height   //height
    const BottomSpace = getBottomSpace()
    const tabBarHeight = useBottomTabBarHeight();
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight-headerHeight-BottomSpace-tabBarHeight
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
        // <View style = {{flex: 1}}>
        //     <View style={{alignSelf: "center"}}>
        //     <TouchableOpacity style= {{flex: 1, flexDirection: "row", marginHorizontal: "3%", alignSelf: "center"}}
        //     onPress={() => { navigation.navigate('MyBook', {bookKey: bookKey, }) }}>
        //         <View style={{flex: 3, height: "100%", }}> 
        //             <BookComponent
        //                 navigation={navigation}
        //                 item={item}
        //             />
        //         </View>
        //         <View style={{flex: 2, backgroundColor: "#e9e9e9", height: "95%", marginTop: "1%",alignItems: "center", justifyContent:"center"}}>
        //             <Text style = {{marginHorizontal: "12%", marginTop: "20%", textAlign: "center", lineHeight: 20, fontSize: 13}} numberOfLines={7}>{item.intro}</Text>
        //             <Text style = {{marginHorizontal: "10%", marginVertical: "15%", textAlign: "center", fontSize: 13}}>-{BookItemUserinfo.iam}-</Text>
        //         </View>
        //     </TouchableOpacity>
        //     </View>
        // </View>

    <View style = {{flex: 1}}>
        <TouchableOpacity style= {{width: "90%", height: "95%", marginLeft: "3%", marginRight: "10%", alignSelf: "center"}}
            onPress={() => { navigation.navigate('MyBook', {bookKey: bookKey, }) }}>
                <ImageBackground style={{flex: 1, flexDirection: "row", marginTop: "1%"}} source={covernpaper}>
                        <View style={{flex: 1}}> 
                            <View style={{flex:1, flexDirection: 'column'}}>
                                    <View style= {{flex:1, flexDirection: 'column'}}>
                                    <Text style={{flex:1, fontSize : 16, marginTop: "23%", marginHorizontal: "22%"}}>{item.bookTitle}</Text>
                                    <Text style={{flex:1, fontSize : 14, marginHorizontal: "22%"}}>{item.smallBookTitle}</Text>
                                    <Text style={{flex: 1, fontSize: 11, alignSelf: "flex-end", marginTop: "2%", marginHorizontal: "12%"}}>{BookItemUserinfo.iam}</Text>
                                    <Image style={{flex: 5, width: "60%", top: 0, justifyContent: "flex-star", marginLeft: "26%", marginBottom: "15%"}} source={{ uri: item.url }} resizeMode={"contain"} />
                                    </View>
                            </View>
                        </View>
                        <View style={{flex: 1,marginTop: "1%",alignItems: "center", justifyContent:"center"}}>
                            <Text style = {{marginHorizontal: "12%", marginTop: "20%", textAlign: "center", lineHeight: 20, fontSize: 13}} numberOfLines={7}>{item.intro}</Text>
                            <Text style = {{marginHorizontal: "10%", marginVertical: "15%", textAlign: "center", fontSize: 13}}>-{BookItemUserinfo.iam}-</Text>
                        </View>
                </ImageBackground>
        </TouchableOpacity>
    </View>
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
            <TouchableOpacity style={{ marginHorizontal: "3%", borderRadius: 10, height: "80%", backgroundColor: "#fff", borderColor: "#A2A2A2", shadowColor: "#e9e9e9", shadowRadius: 2, shadowOpacity: 3, shadowOffset:{width: 0, height: 0}}} 
            onPress={() => { navigation.navigate('MyArticleApp', { chapterKey: chapterKey, bookKey: chapters.bookKey }) }}>
                <View style={{height: "75%"}}>
                <Text style={{ fontSize: 15, fontWeight: '700', marginHorizontal: "5%", marginTop: "5%" }} numberOfLines={1}>{chapters.chapterTitle}</Text>
                <Text style={{ fontSize: 13, fontWeight: '400', marginHorizontal: "5%", marginTop: "2.5%", marginBottom: "2%", alignSelf: "center" }} numberOfLines={2}>{chapters.mainText}</Text>
                </View>
                <Text style={{ fontSize: 12, fontWeight: '400', marginHorizontal: "5%", }}> by. {ChapterItemUserinfo.iam} </Text>
            </TouchableOpacity>
    )
}

const WritingItem=(props)=> {
    const {writing, navigation}=props;

    const [WritingItemUserinfo, setWritingItemUserinfo] = useState({
        iam:"익명의.지은이",
        selfLetter:"안녕하세요 익명의 지은이입니다."
    });
    
    const [userinfo, setUserinfo] = useState({});
    var user = firebase.auth().currentUser;
    var user_uid
    if (user != null) {
      user_uid = user.uid;
    }

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
        <View style={{marginTop:10,borderRadius:10, marginLeft:10, marginRight:10}}>
            <TouchableOpacity style={styles.bookIndexOne} onPress={() => { navigation.navigate('readEditorWriting', { writingKey:writing.key, navigation: navigation}) }}>
                <View style={{backgroundColor:"#A2AD9C", width: 170, height: 100, borderRadius: 10}}>
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
    nextButtonText: {
        color: "#21381C",
        fontSize: 40,
    },
    prevButtonText: {
        color: "#21381C",
        fontSize: 40,
        transform: [{rotate:"180deg"}],
    }
})

AppRegistry.registerComponent('Main', () => SwiperComponent)
export default Main;