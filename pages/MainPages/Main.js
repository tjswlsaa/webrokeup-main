import React, { useEffect, useState } from 'react';
import { AppRegistry, StyleSheet, SafeAreaView, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app'
import { firebase_db } from '../../firebaseConfig';
import Swiper from 'react-native-swiper';
import book from '../../assets/book.png';
import BookComponent from '../../components/BookComponent';

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

const Main = ({ navigation, bookKey, chapters, chapterKey, users_uid }) => {
    const [userinfo, setUserinfo] = useState([]);
    test1.userinfo = userinfo;
    const [book, setBook] = useState([]);
    test2.book = book;
    const [hotChapter, setHotChapter] = useState([]);
    test3.hotChapter = hotChapter;
    const [swiper, setSwiper] = useState(null);
    const [autoSwiper, setAutoSwiper] = useState(null);
    const [writings, setWritings] =useState([])
      
    
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



    // const [item, setItem] = useState({
    //     chapterKey: '',
    //     chapterTitle: '',
    //     likeCount: '',
    //     likes: {},
    //     mainText: '',
    //     regdate: ''
    // });
    var user = firebase.auth().currentUser;
    var user_uid
    if (user != null) {
        user_uid = user.uid;
    }
    var userID = user_uid.substring(0, 6)
    console.log(userID)

    useEffect(() => {
        firebase_db.ref(`users/${user_uid}/`)
            .on('value', (snapshot) => {
                let userinfo = snapshot.val();
                setUserinfo(userinfo);
            })
    }, []);

    useEffect(() => {
        let temp = [];
        let data = firebase_db.ref('book/')
            .on('value', (snapshot) => {
                snapshot.forEach((child) => {
                    temp.push(child.val());
                })
                setBook(temp)
            })
        // console.log(temp)  
        console.log("book.bookKey: " + book.bookKey)
    }, [])

    useEffect(() => {
        
        firebase_db
            .ref(`book`)
            .on('value', (snapshot) => {
                let hotlist = [];
                console.log({ snapshot });
                // console.log({'typeof snapshot': typeof snapshot});
                // console.log({'snapshot.length': snapshot.length});
                snapshot.forEach((child) => {
                    const book = child.val();
                    const { chapters } = book;

                    if (chapters == undefined){
                        console.log("Main() 챕터가 없습니다")
                    }else{
                        hotlist = [...hotlist, ...Object.values(chapters)];
                    }
                    console.log({ chapters })
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
                console.log({ hotChapter })
                console.log("hotChapter.chapterkey: ~~~" + hotChapter.chapterKey)
            })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 , backgroundColor: "#FAFAFA"}}>
            <StatusBar style="white" />
            <View style={{ flex: 2, backgroundColor: "#FAFAFA" }}>
                <TouchableOpacity style={{ marginTop: "5%" }} onPress={() => { navigation.navigate('PopularBook'), {bookKey: bookKey} }}>
                    <Text style={{ fontSize: 20, fontWeight: "400" }}> 오늘의 이별집 </Text>
                </TouchableOpacity>
                <Swiper
                    index={book.bookKey}
                    loop={false}
                    showsPagination={false}
                    onSwiper={setSwiper}
                    style={{ marginTop: "5%" }} 
                    showsButtons={false}
                >
                    
                    {book.map(item => (
                        <BookItem
                            key={item.key}
                            users_uid={item.user_uid}
                            navigation={navigation}
                            item={item}
                            bookKey={item.bookKey}
                        />
                        // <Text>{item.bookTitle}</Text>
                    ))}
                </Swiper>
            </View>
            <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
                <TouchableOpacity style={{marginTop: "5%"}} onPress={() => {
                        console.log('Main.js (1), chapters: ',chapters);
                        console.log('Main.js (1), bookKey: ',bookKey);
                        navigation.navigate(
                            'PopularArticle'
                            // ,
                            // {
                            //     chapterKey: chapters && chapters.chapterKey, // optional: 없어도 된다면.
                            //     bookKey: bookKey // optional: 없어도 된다면..
                            // }
                        ); }
                    }>
                    <Text style={{ fontSize: 20, fontWeight: "400" }}>인기 이별록 </Text>
                </TouchableOpacity>
                <View style={{flex: 2, marginTop: "3%"}} horizontal={true}>
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
                            console.log("hotChapter 맵 운영 중"),
                            <ChapterItem
                                key={chapters.key}
                                navigation={navigation}
                                chapters={chapters}
                                chapterKey={chapters.chapterKey}
                                bookKey={chapters.bookKey}
                            />)
                        )}
                    </Swiper>
                </View>
                
            </View>
            <View style={{ flex: 1 , backgroundColor: "#FAFAFA"}}>
                <TouchableOpacity style={{}} onPress={() => { navigation.navigate('editorBoard') }}>
                    <Text style={{ marginTop: "5%", fontSize: 20, fontWeight: "400" }}> 이별 에디터 </Text>
                </TouchableOpacity>
                <ScrollView style={{marginTop: "3%"}} horizontal = {true}>
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
            </View>
        </SafeAreaView>
    )
}
// sub components
const BookItem = ({ navigation, item, bookKey }) => {

    const [userinfo2, setUserinfo2] = useState([]);
    var user = firebase.auth().currentUser;
    var user_uid
    if (user != null) {
      user_uid = user.uid;
    }
    useEffect(()=>{
      firebase_db.ref(`users/${item.user_uid}`)
          .on('value', (snapshot) => {
              let userinfo2 = snapshot.val();
              setUserinfo2(userinfo2);
          })
  }, []);
    // console.log(item);
    console.log("bookitem running")
    const {userinfo} = test1;
    return (
        <TouchableOpacity style = {{flex: 1, shadowColor: "#E9E9E9", shadowOffset: {width: 10, height: 7}, shadowOpacity: 10, shadowRadius: 10}} onPress={() => { navigation.navigate('readBook', { item: item, bookKey: bookKey, }) }}>
            <View style= {{flex: 1, flexDirection: "row"}}>
                {/* {book.map(item => (
                        <BookComponent
                            key={item.key}
                            users_uid={item.user_uid}
                            navigation={navigation}
                            item={item}
                        />
                        // <Text>{item.bookTitle}</Text>
                    ))} */}
                <ImageBackground style={{flex: 1,  flexDirection: 'column', width: "100%", height: "100%", marginRight: 5, marginLeft: 16,}} source={book} >
                    <Text style={{marginLeft: "12%", marginTop: "20%", fontSize: 17}}>{item.bookTitle}</Text>
                    <Text style={{alignSelf: "flex-end", marginTop: "6%", marginRight: "10%", fontSize: 13}}>{userinfo2.iam}</Text>
                    <Image style={{flex: 1, width: "75%", height: "45%", marginLeft: "15%", marginBottom: "30%"}} source={{ uri: item.url }} resizeMode={"center"} />
                </ImageBackground>
                <View style={{flex: 1, backgroundColor: "white", width: "100%", height: "82%", marginRight: 5, marginRight: 16,}}>
                    <Text style = {{marginHorizontal: "12%", marginTop: "20%", textAlign: "center", lineHeight: 20, fontSize: 13}} numberOfLines={7}>{item.intro}</Text>
                    <Text style = {{marginHorizontal: "10%", marginVertical: "15%", textAlign: "center", fontSize: 13}}>-{userinfo2.iam}-</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const ChapterItem = ({ navigation, chapters, chapterKey }) => {
    console.log('Main.js (1) chapters:', chapters);

    const { userinfo } = test1
    const { book } = test2
    const { hotChapter } = test3;
    console.log("chapteritem running")
    console.log({ chapters });



    return (
            <TouchableOpacity style={{ marginHorizontal: "3%", borderRadius: 10, height: "88%", backgroundColor: "#fff", shadowColor: "#E2E2E2", shadowOffset: {width: 0, height: 1}, shadowOpacity: 20, shadowRadius: 15 }} 
            onPress={() => { navigation.navigate('readArticle', { chapters: chapters, chapterKey: chapterKey, bookKey: chapters.bookKey }) }}>
                <Text style={{ fontSize: 16, fontWeight: '700', marginHorizontal: "5%", marginTop: "5%" }} numberOfLines={1}>{chapters.chapterTitle}</Text>
                <Text style={{ fontSize: 15, fontWeight: '400', marginHorizontal: "5%", marginTop: "2.5%", marginBottom: "2%", alignSelf: "center" }} numberOfLines={2}>{chapters.mainText}</Text>
                <Text style={{ fontSize: 15, fontWeight: '400', marginHorizontal: "5%" }}> by. {userinfo.iam} </Text>
            </TouchableOpacity>
    )
}

const WritingItem=(props)=> {
    const {writing, navigation}=props;
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
    return (
        <View style={{backgroundColor:"white", marginTop:10,borderRadius:10, marginLeft:10, marginRight:10}}>
            <TouchableOpacity style={styles.bookIndexOne} onPress={() => { navigation.navigate('readEditorWriting', { writingKey:writing.key, navigation: navigation}) }}>
                <View style={{backgroundColor:"pink"}}>
                <Text style={styles.bookIndexOnePunchLine} >{writing.title}</Text>
                <Text style={styles.bookIndexOnePunchLine} numberofLines={3}>{writing.text}</Text>
                </View>
                <Text style={styles.bookIndexText}>{userinfo.iam}</Text>
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