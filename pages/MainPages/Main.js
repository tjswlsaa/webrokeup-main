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

import Spinner from 'react-native-loading-spinner-overlay';

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


const test4 = {
    chapteritem:""
}

const test5 ={
    qurationchapters:""
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

    const [swiper, setSwiper] = useState(null);
    const [autoSwiper, setAutoSwiper] = useState(null);
    const [writings, setWritings] =useState([])
    const headerHeight = useHeaderHeight();
    const ScreenHeight = Dimensions.get('window').height   //height
    const BottomSpace = getBottomSpace()
    const tabBarHeight = useBottomTabBarHeight();
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight-headerHeight-BottomSpace-tabBarHeight
    const ScreenWidth = Dimensions.get('window').width


    
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


// mybook큐레이팅

const qurationBookKey1 = "1069092000"
const qurationBookKey2 = "3560282000"
// const qurationBookKey3 = "Blue1"
// const qurationBookKey4 = "black1"
// const qurationBookKey5 = "red2"

const qurationChapterKey1 = "1069092001"
const qurationChapterKey2 = "3560282002"
// const qurationChapterKey3 = "Blue1"
// const qurationChapterKey4 = "black1"
// const qurationChapterKey5 = "red2"




const [chapter1, setChapter1] = useState([]);

useEffect(getChapters1, []);
function getChapters1() {
    firebase_db
        .ref(`book/${qurationBookKey1}/both/`+qurationChapterKey1)
        .on('value', (snapshot) => {
            const chapter1 = snapshot.val()
            setChapter1(chapter1);
        })
}

const [chapter2, setChapter2] = useState([]);

useEffect(getChapters2, []);
function getChapters2() {
    firebase_db
        .ref(`book/${qurationBookKey2}/both/`+qurationChapterKey2)
        .on('value', (snapshot) => {
            const chapter2 = snapshot.val()
            setChapter2(chapter2);
        })
}




const qurationchapters = [chapter1,chapter2]
test5.qurationchapters=qurationchapters
console.log("chapteris",qurationchapters)
// 책 큐레이팅 끝

//큐레이팅 설문지
    const qurationQuestionKey1 = "red1"
    const qurationQuestionKey2 = "yellow1"
    const qurationQuestionKey3 = "Blue1"
    const qurationQuestionKey4 = "black1"
    const qurationQuestionKey5 = "red2"


    const [question1, setQuestion1] = useState([]);
    useEffect(()=>{
      firebase_db.ref(`questions/firstColorQuestions/`+qurationQuestionKey1)
      .on('value', (snapshot)=>{
            const question1 = snapshot. val()
    
            setQuestion1(question1)
        })
    },[])
    console.log("Newpage question",question1)

    const [question2, setQuestion2] = useState([]);
    useEffect(()=>{
      firebase_db.ref(`questions/secondColorQuestions/`+qurationQuestionKey2)
      .on('value', (snapshot)=>{
            const question2 = snapshot. val()
    
            setQuestion2(question2)
        })
    },[])
    console.log("Newpage question",question2)
    
    const [question3, setQuestion3] = useState([]);
    useEffect(()=>{
      firebase_db.ref(`questions/thirdColorQuestions/`+qurationQuestionKey3)
      .on('value', (snapshot)=>{
            const question3 = snapshot. val()
    
            setQuestion3(question3)
        })
    },[])
    console.log("Newpage question",question3)

    const [question4, setQuestion4] = useState([]);
    useEffect(()=>{
      firebase_db.ref(`questions/fourthColorQuestions/`+qurationQuestionKey4)
      .on('value', (snapshot)=>{
            const question4 = snapshot. val()
    
            setQuestion4(question4)
        })
    },[])
    console.log("Newpage question",question4)

    const [question5, setQuestion5] = useState([]);
    useEffect(()=>{
      firebase_db.ref(`questions/firstColorQuestions/`+qurationQuestionKey5)
      .on('value', (snapshot)=>{
            const question5 = snapshot. val()
    
            setQuestion5(question5)
        })
    },[])
    console.log("Newpage question",question5)

//큐레이팅 설문지 끝

const firstColor= "#9E001C"
const secondColor="#F6AE2D"
const thirdColor = "#33658A"
const fourthColor= "#494949"
console.log("question1.Color",question1.Color)
const ColorOne=question1.Color
    return (
        <SafeAreaView style={{ flex: 1 , backgroundColor: "#fbfbfb"}}>
        <View>
            <StatusBar style= "white" />
            <ScrollView>
            <View style={{height: realScreen*0.08, alignItems:"center", borderBottomColor: "#D9D9D9", borderBottomWidth:0.5, justifyContent:"center", backgroundColor: "white", }}>
                <Text style={{fontSize:17, fontWeight:"700", marginTop: "2%", color: "#21381c"}}>Feel Me Fill Me</Text>
            </View>
            <View style={{ height: realScreen*0.5, }}>
                    <View style={{height: realScreen*0.05, flexDirection:"row", marginTop: "5%", marginHorizontal: "3%",justifyContent:"center"}}>
                        <View style={{ flex: 4 }} >
                            <Text style={{ fontSize: 18, fontWeight: "700", }}> 오늘의 감정책 </Text>
                        </View>
                        <TouchableOpacity style={{ flex: 1, borderRadius: 5, height: realScreen*0.045,justifyContent:"center" }}
                        onPress={() => { navigation.navigate('PopularArticle')}}>
                            <Text style={{alignSelf: "center", color: "#20543F", fontWeight:"800", fontSize:18}}>더보기</Text>
                        </TouchableOpacity>
                    </View>
                <View style={{height:realScreen*0.45, width:"100%",}}> 

                    <Swiper
                        // index={book.bookKey}
                        loop={false}
                        showsPagination={false}
                        onSwiper={setSwiper}
                        showsButtons={true}
                        style={{backgroundColor: "#FBFBFB", marginHorizontal: "4%",}}
                        nextButton={<Text style={styles.nextButtonText}>›</Text>}
                        prevButton={<Text style={styles.prevButtonText}>›</Text>}
                    >

                        {qurationchapters.map((chapter, index) => {

                            return(

                                    <View style={{flexDirection:"row", height: realScreen*0.4, backgroundColor:"#FBFBFB", width:"90%" }}>
                                               
                                                        <BookComponent
                                                        navigation={navigation}
                                                        chapter={chapter}
                                                        bookKey={chapter.bookKey}
                                                        index={index}

                                                         />
                                    </View>

                            )})}


                                       


                    </Swiper>
                </View>
            </View>
            <View style={{ height: realScreen*0.4, backgroundColor: "#FAFAFA" }}>
                <View style={{flex:1, flexDirection: "row", marginTop: "2%", marginHorizontal: "3%"}}>
                        <View style={{ flex: 4}}> 
                            <Text style={{ fontSize: 18, fontWeight: "700" }}> 감정 질문지 </Text>
                        </View>
                        <TouchableOpacity style={{ flex: 1, borderRadius: 5, height: realScreen*0.045, justifyContent:'center' }}
                            onPress={() => { navigation.navigate('QuestionPallete')}}>
                            <Text style={{alignSelf: "center", color: "#20543F", fontWeight:"800", fontSize:18}}>더보기</Text>
                        </TouchableOpacity>

                </View>

                <View style={{flex: 8,marginHorizontal:"2%", }} horizontal={true}>
                    <Swiper
                        // index={hotChapter.chapterKey}
                        loop={true}
                        showsPagination={false}
                        onSwiper={setAutoSwiper}
                        style={{ marginTop: "5%" }} 
                        showsButtons={false}
                        autoplay={true}
                        autoplayTimeout={3}
                        resizeMode="contain"
                    >

                                <TouchableOpacity style={{ height: "85%", backgroundColor: "white", marginHorizontal: "5%", padding: "10%", borderRadius: "10%", }} onPress={() => navigation.navigate("alltheanswers", { questionsKey: qurationQuestionKey1 })}>
                                    <View style={{ flexDirection: "row", height: realScreen * 0.05, justifyContent: "center", }}>
                                        <View style={{ backgroundColor: question1.Color, flex: 1 }}></View>
                                        <Text style={{ fontSize: 16, flex: 25, marginTop: "2%", marginLeft:"2%" }}>{question1.title}</Text>
                                    </View>
                                    <View style={{ marginTop: "5%" }}>
                                        <Text numberOfLines={5}>{question1.summary}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: "85%", backgroundColor: "white", marginHorizontal: "5%", padding: "10%", borderRadius: "10%", }} onPress={() => navigation.navigate("alltheanswers", { questionsKey: qurationQuestionKey2 })}>
                                    <View style={{ flexDirection: "row", height: realScreen * 0.05, justifyContent: "center", }}>
                                        <View style={{ backgroundColor: question2.Color, flex: 1 }}></View>
                                        <Text style={{ fontSize: 16, flex: 25, marginTop: "2%", marginLeft:"2%"  }}>{question2.title}</Text>
                                    </View>
                                    <View style={{ marginTop: "5%" }}>
                                        <Text numberOfLines={5}>{question2.summary}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: "85%", backgroundColor: "white", marginHorizontal: "5%", padding: "10%", borderRadius: "10%", }} onPress={() => navigation.navigate("alltheanswers", { questionsKey: qurationQuestionKey3 })}>
                                    <View style={{ flexDirection: "row", height: realScreen * 0.05, justifyContent: "center", }}>
                                        <View style={{ backgroundColor: question3.Color, flex: 1 }}></View>
                                        <Text style={{ fontSize: 16, flex: 25, marginTop: "2%" , marginLeft:"2%" }}>{question3.title}</Text>
                                    </View>
                                    <View style={{ marginTop: "5%" }}>
                                        <Text numberOfLines={5}>{question3.summary}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: "85%", backgroundColor: "white", marginHorizontal: "5%", padding: "10%", borderRadius: "10%", }} onPress={() => navigation.navigate("alltheanswers", { questionsKey: qurationQuestionKey4 })}>
                                    <View style={{ flexDirection: "row", height: realScreen * 0.05, justifyContent: "center", }}>
                                        <View style={{ backgroundColor: question4.Color, flex: 1 }}></View>
                                        <Text style={{ fontSize: 16, flex: 25, marginTop: "2%" , marginLeft:"2%" }}>{question4.title}</Text>
                                    </View>
                                    <View style={{ marginTop: "5%" }}>
                                        <Text numberOfLines={5}>{question4.summary}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: "85%", backgroundColor: "white", marginHorizontal: "5%", padding: "10%", borderRadius: "10%", }} onPress={() => navigation.navigate("alltheanswers", { questionsKey: qurationQuestionKey5 })}>
                                    <View style={{ flexDirection: "row", height: realScreen * 0.05, justifyContent: "center", }}>
                                        <View style={{ backgroundColor: question5.Color, flex: 1 }}></View>
                                        <Text style={{ fontSize: 16, flex: 25, marginTop: "2%", marginLeft:"2%"  }}>{question5.title}</Text>
                                    </View>
                                    <View style={{ marginTop: "5%" }}>
                                        <Text numberOfLines={5}>{question5.summary}</Text>
                                    </View>
                                </TouchableOpacity>
                    </Swiper>
                </View>



            </View>
            <View style={{ height: realScreen*0.5, backgroundColor: "#fafafa"}}>
                <View style={{flex:1, flexDirection: "row", marginTop: "2%", marginHorizontal: "3%"}}>
                    <View style={{flex: 4}}>
                        <Text style={{fontSize: 18, fontWeight: "700" }}> 에디터 </Text>
                    </View>
                    <TouchableOpacity style={{ flex:1, borderRadius: 5, height: realScreen*0.045,justifyContent:"center"}}
                        onPress={() => { navigation.navigate('editorBoard')}}>
                            <Text style={{alignSelf: "center", color: "#20543F", fontWeight:"800", fontSize:18}}>더보기</Text>
                    </TouchableOpacity>
                </View>
                <View style= {{flex:8}}>  
                    <ScrollView style={{ marginTop: "1%", marginHorizontal: "2%"}} horizontal = {true}>
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


            </ScrollView>
            </View>
            </SafeAreaView>
    )
}

async function BookComponent (props) {
    const { chapter, bookKey, navigation, index } = props

    const {qurationchapters} =test5
    // console.log("BookComponentchapter2222",chapter)
    // console.log("BookComponentchapter",chapter.bookKey)
    // console.log("BookComponentchapterbookKey",bookKey)

    // const bookKey = chapter.bookKey
    // console.log("BookComponentbookKey",bookKey)
    const headerHeight = useHeaderHeight();
    const ScreenHeight = Dimensions.get('window').height   //height
    const BottomSpace = getBottomSpace()
    const tabBarHeight = useBottomTabBarHeight();
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight-headerHeight-BottomSpace-tabBarHeight
    const ScreenWidth = Dimensions.get('window').width

    const [BookItemUserinfo, setBookItemUserinfo] = useState({
        iam:"익명의.지은이",
        selfLetter:"안녕하세요 익명의 지은이입니다."
    });
    useEffect(()=>{
      firebase_db.ref(`users/${chapter.creator}`)
          .on('value', (snapshot) => {
              let BookItemUserinfo = snapshot.val();
              if (BookItemUserinfo > '') {
                setBookItemUserinfo(BookItemUserinfo);
              }
          })
  }, []);
  const [spinner, setSpinner] = useState(true);

  const [myitem, setMyitem] = useState({
    bookKey: '',
    bookTitle: '',
    chapters: {},
    intro: '',
    regdate: '',
    url: '',
    user_uid: '',
    Color:"",
});
  
  const getMyItem = async() => {
    setSpinner(true)
    try{
    var ref =firebase_db.ref(`/book/${chapter.bookKey}`)
    let temp =[]
      await ref.once('value', (snapshot)=>{
        snapshot.forEach((child) => {
          temp.push(child.val())
          console.log("temp",temp)
      })
      setMyitem(temp)})
      setSpinner(false)
    } catch (error){
        console.log(error)
    }
          };

    useEffect(() => {
    getMyItem();
}, []);
//   if(!myitem){

//      setSpinner(true)}
//     {
//         setSpinner(false)
//     }

console.log("BookComponentmyitem",myitem)
// console.log("BookComponentmyitem",myitem.Color)







    return (
        <View style={{height: realScreen*0.4, backgroundColor:"#FBFBFB", width:"90%" , flexDirection:"row"}}>
                    {/* <View style={{alignContent:"center"}}> */}
                    {spinner && (
                            <Spinner
                                visible={spinner}
                                textContent={'Loading...'}
                                textStyle={{ color: '#FFF' }}
                            />
                            )}

                                            <TouchableOpacity style={{width:ScreenWidth*0.4,  padding:"5%", justifyContent:"center", }} onPress={() => {navigation.navigate('MyArticleQuration', { chapterKey: chapter.chapterKey,bookKey:chapter.bookKey, index:index , qurationchapters:qurationchapters}) }}>
                                                                                    <View style={{ width: ScreenWidth * 0.38,padding:"5%",height:realScreen * 0.32 ,backgroundColor:"white", marginHorizontal:"5%"}}>
                                                                                            <View style={{flexDirection:"row", flex:1, }}>
                                                                                                    <View style={{backgroundColor:chapter.chColor, flex:1, height:"50%", marginTop:"15%"}}> 
                                                                                                    </View>
                                                                                                    <Text style={{flex:12,fontSize: 16, fontWeight: "700",  marginTop: "15%",marginHorizontal: "5%",}}>{chapter.chapterTitle}</Text>
                                                                                            </View>

                                                                                                    <Text style={{ fontWeight: "500", marginHorizontal: "5%", marginTop: "5%", marginBottom:"5%"}} numberOfLines={6} >{chapter.mainText}</Text>
                                                                                    </View>

                                                </TouchableOpacity>

                                               <TouchableOpacity style={{  justifyContent:"center",marginLeft:ScreenWidth*0.05}} onPress={() => {navigation.navigate('MyBook', { bookKey: chapter.bookKey }) }}>
                                                <View style={{ backgroundColor:myitem.Color, opacity: 0.8, height: realScreen * 0.32, width: ScreenWidth * 0.042, zIndex: 1 }}>
                                                </View>

                                                <View style={{ 
                                                    backgroundColor:myitem.Color,
                                                    zIndex: 0, position: "absolute", marginLeft: ScreenWidth * 0.025, height: realScreen * 0.32, width: ScreenWidth * 0.4, alignItems: "center", justifyContent: "center" }}>
                                                <Image source={{uri: myitem.url}} style={{zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.32, width: ScreenWidth * 0.4, alignItems: "center", justifyContent: "center"}}></Image>
                                                <View style={{ backgroundColor: "white", height: realScreen * 0.24, width: ScreenWidth * 0.29, }}>
                                                        <Text style={{ marginTop: "30%", marginLeft: "10%" }}>{myitem.defaultTitle}</Text>
                                                        <Text style={{ marginTop: "5%", marginLeft: "10%", fontWeight: "500" }}>{myitem.bookTitle}</Text>

                                                        <Text style={{marginTop:"20%", marginLeft:"10%", fontSize:10}}>{BookItemUserinfo.iam}</Text>
                                                </View>
                                                </View>
                                                </TouchableOpacity> 
                    
        </View>
)
}

const WritingItem=(props)=> {
    const {writing, navigation}=props;



    return (
        <View style={{marginTop:10,borderRadius:10, marginLeft:10, marginRight:10, marginBottom:20}}>
            <TouchableOpacity style={styles.bookIndexOne} onPress={() => { navigation.navigate('readEditorWriting', { writingKey:writing.key, navigation: navigation}) }}>
                <View style={{backgroundColor:"#A2AD9C", width: 190, height: "100%", borderRadius: 10}}>
                    <Image style={{height:"40%", borderRadius: 10}} source={{uri:writing.image}}></Image>
                    <View style={{margin: "10%"}}>
                        <Text style={{fontSize: 17, color: "white", fontWeight: "600"}} numberofLines={3}>{writing.title}</Text>
                        <Text style={{fontSize: 13, marginTop: 10}} numberofLines={3}>{writing.summary}</Text>
                    </View>

                </View>


            </TouchableOpacity>

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