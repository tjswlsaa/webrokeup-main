import React, { useEffect, useState } from 'react';
import { AppRegistry, StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app'
import { firebase_db } from '../../firebaseConfig';
import Swiper from 'react-native-swiper';
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
const Main = ({ navigation, bookKey, chapterKey }) => {
    const [userinfo, setUserinfo] = useState([]);
    test1.userinfo = userinfo;
    const [book, setBook] = useState([]);
    test2.book = book;
    const [hotChapter, setHotChapter] = useState([]);
    test3.hotChapter = hotChapter;
    const [swiper, setSwiper] = useState(null);
    const [autoSwiper, setAutoSwiper] = useState(null);
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
        firebase_db.ref(`users/${user_uid}`)
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
        console.log(temp)  
    }, [])

    console.log('book222의형태',book)

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
                        console.log("챕터가 없습니다")
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
                console.log("plzlzlzlz2",hotChapter)

                console.log("plzlzlzlz",hotChapter.chapterKey)

                setHotChapter(hotChapter);
                console.log('whatishotChapter',hotChapter)
                console.log("hotChapter여기서는",hotChapter.regdate)

            })
    }, [])

    console.log("hotChapter chapterkey????",hotChapter.chapterKey)
    // const HotChapter = Object.values(hotChapter)
    // console.log("keyekey????",HotChapter)
    // console.log("HotChapter findplx????",HotChapter.chapterKey)

    console.log('book은 어떻게 생겼나',book)
    console.log('bookkkkkkkkk은 어떻게 생겼나',book.user_uid)

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
                    style={{ marginTop: "5%" }} showsButtons={false}
                >
                    {book.map(item => (
                        <BookItem
                            key={item.key}
                            navigation={navigation}
                            item={item}
                            bookKey={item.bookKey}
                        />
                        // <Text>{item.bookTitle}</Text>
                    ))}
                </Swiper>
            </View>
            <View style={{ flex: 1, backgroundColor: "pink" }}>
                <TouchableOpacity style={{marginTop: "5%"}} onPress={() => { navigation.navigate('PopularArticle') }}>
                    <Text style={{ fontSize: 20, fontWeight: "400" }}>인기 이별록 </Text>
                </TouchableOpacity>
                <View style={{ marginTop: "3%", backgroundColor:"pink"}} horizontal={true}>
                    <Swiper
                        index={1}
                        loop={true}
                        showsPagination={true}
                        onSwiper={setSwiper}
                        style={{ marginTop: "5%" }} 
                        showsButtons={true}
                    >
                        {hotChapter.map(chapteritem => (
                            console.log("hotChapter 맵 운영 중"),
                            console.log("hotChapter 맵 운영 중2222",hotChapter),
                            console.log("hotChapter 맵 운영 중3333",chapteritem.chapterKey),

                            <ChapterItem
                                key={chapteritem.key}
                                navigation={navigation}
                                chapteritem={chapteritem}
                                chapterKey={chapteritem.chapterKey}
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

    // console.log(item);
    console.log("bookitem running")
    return (
        <TouchableOpacity style = {{flex: 1, shadowColor: "#E9E9E9", shadowOffset: {width: 10, height: 7}, shadowOpacity: 10, shadowRadius: 10}} onPress={() => { navigation.navigate('readBook', {bookKey: bookKey }) }}>
            <View style= {{flex: 1, flexDirection: "row"}}>
                <Image style={{flex: 1, backgroundColor: "grey", width: "47%", height: "90%", marginRight: 5, marginLeft: 16,}} source={{ uri: item.url }} />
                <View style={{flex: 1, backgroundColor: "white", width: "47%", height: "90%", marginRight: 5, marginRight: 16,}}>
                    <Text style = {{marginTop: "20%", marginHorizontal: "10%", fontSize: 17, fontWeight: "300"}}>{item.bookTitle}</Text>
                    <Text style = {{marginHorizontal: "12%", marginTop: "15%", textAlign: "center", lineHeight: 20, fontSize: 12, }} numberOfLines={7}>{item.intro}</Text>
                    <Text style = {{marginHorizontal: "10%", marginVertical: "15%", color: "red"}}>{item.user_uid.substring(0, 6)} 유저 아이디 불러와야 함</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const ChapterItem = ({ navigation, chapteritem, chapterKey }) => {
    const { userinfo } = test1
    const { book } = test2
    const { hotChapter } = test3;
    console.log("chapteritem running")
    console.log({ chapteritem });
    return (
            <TouchableOpacity style={{ marginHorizontal: "3%", borderRadius: 10, height: "88%", backgroundColor: "#fff", shadowColor: "#E2E2E2", shadowOffset: {width: 0, height: 1}, shadowOpacity: 20, shadowRadius: 15 }} onPress={() => { navigation.navigate('readArticle', { chapteritem: chapteritem, chapterKey: chapterKey }) }}>
                <Text style={{ fontSize: 16, fontWeight: '700', marginHorizontal: "5%", marginTop: "5%" }} numberOfLines={1}>{chapteritem.chapterTitle}</Text>
                <Text style={{ fontSize: 15, fontWeight: '400', marginHorizontal: "5%", marginTop: "2.5%", marginBottom: "2%", alignSelf: "center" }} numberOfLines={2}>{chapteritem.mainText}</Text>
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
// AppRegistry.registerComponent('Main', () => SwiperComponent)
export default Main;