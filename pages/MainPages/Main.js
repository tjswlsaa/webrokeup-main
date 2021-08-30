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

const test3 = {
    questionKey: '',
    likeCount: '',
    title: '',
    intro: '',
}

const test4 = {
    chapteritem:""
}

const test5 ={
    qurationchapters:""
}

const test6 ={
    index: ''
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
const [list, setList] = useState([]);

const [selectedList, setSelectedList] = useState([]);

useEffect(() => {
    firebase_db
            .ref(`book`)
            .on('value', (snapshot) => {
                    let list = [];
                    let temp = [];
                    snapshot.forEach((child) => {
                            const book = child.val();
                            const { both } = book;
                            //      console.log("useeffectbook",book)

                            if (both == undefined) {
                                    console.log("PopularArticle() 챕터가 없습니다")
                            } else {
                                    list = [...list, ...Object.values(both)]; // spread를 통한 리스트 병합
                            }
                            const arraylist = Object.values(list)
                            const listFiltered = arraylist.filter(filteredList => filteredList.isPublic == true)

                            listFiltered.sort(function (a, b) {
                                    return (b.likeCount) - (a.likeCount)
                            })
                            
                            setList(listFiltered);

                            const listoften = [];
                            if (listFiltered.length >= 1) {
                                listoften.push(listFiltered[0]);
                            }
                            if (listFiltered.length >= 2) {
                                listoften.push(listFiltered[1]);
                            }
                            if (listFiltered.length >= 3) {
                                    listoften.push(listFiltered[2]);
                                }
                            if (listFiltered.length >= 4) {
                            listoften.push(listFiltered[3]);
                            }
                            if (listFiltered.length >= 5) {
                            listoften.push(listFiltered[4]);
                            }
                            if (listFiltered.length >= 6) {
                            listoften.push(listFiltered[5]);
                            }
                            if (listFiltered.length >= 7) {
                            listoften.push(listFiltered[6]);
                            }
                            if (listFiltered.length >= 8) {
                            listoften.push(listFiltered[7]);
                            }
                            if (listFiltered.length >= 9) {
                            listoften.push(listFiltered[8]);
                            }
                            if (listFiltered.length >= 10) {
                            listoften.push(listFiltered[9]);
                            }

                            setSelectedList(listoften);
                    })
            })
}, []) // 여기에 원래 list 가 있었음... 이거 없애니 렉은 안걸림



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

                            setSelectedList2(listoften);
                   
            })
}, []) // 여기에 원래 list 가 있었음... 이거 없애니 렉은 안걸림
// console.log("populararticlelist",list)
//큐레이팅 설문지

const [list3, setList3] = useState([]);

const [selectedList3, setSelectedList3] = useState([]);

useEffect(() => {
    firebase_db
            .ref(`questions`)
            .on('value', (snapshot) => {
                    let list = [];
                    let temp = [];
                    snapshot.forEach((child) => {
                            const question = child.val();
                            console.log("useeffectbookquestion",question)

                            if (question == undefined) {
                                    console.log("PopularArticle() 챕터가 없습니다")
                            } else {
                                    list = [...list, ...Object.values(question)]; // spread를 통한 리스트 병합
                            }
                            const listFiltered = Object.values(list)

                            listFiltered.sort(function (a, b) {
                                    return (b.likeCount) - (a.likeCount)
                            })
                            
                            setList3(listFiltered);
                            console.log("setList3 " + list3)


                            const listoften = [];
                            if (listFiltered.length >= 1) {
                                listoften.push(listFiltered[0]);
                            }
                            if (listFiltered.length >= 2) {
                                listoften.push(listFiltered[1]);
                            }
                            if (listFiltered.length >= 3) {
                                    listoften.push(listFiltered[2]);
                                }
                            if (listFiltered.length >= 4) {
                            listoften.push(listFiltered[3]);
                            }
                            if (listFiltered.length >= 5) {
                            listoften.push(listFiltered[4]);
                            }
                            if (listFiltered.length >= 6) {
                            listoften.push(listFiltered[5]);
                            }
                            if (listFiltered.length >= 7) {
                            listoften.push(listFiltered[6]);
                            }
                            if (listFiltered.length >= 8) {
                            listoften.push(listFiltered[7]);
                            }
                            if (listFiltered.length >= 9) {
                            listoften.push(listFiltered[8]);
                            }
                            if (listFiltered.length >= 10) {
                            listoften.push(listFiltered[9]);
                            }

                            setSelectedList3(listoften);
                    })
            })
}, []) 
console.log("setSelectedList3",selectedList3)


    return (
        <SafeAreaView style={{ flex: 1 , backgroundColor: "#fbfbfb"}}>
        <View>
            <StatusBar style= "white" />
            <ScrollView>
            <View style={{height: realScreen*0.08, alignItems:"center", borderBottomColor: "#D9D9D9", borderBottomWidth:0.5, justifyContent:"center" }}>
                <Text style={{fontSize: 18, fontWeight:"700", marginTop: "2%", color: "#21381c"}}>FEEL ME FILL ME</Text>
            </View>
            <View style={{ height: realScreen*0.47, backgroundColor: "#fafafa"}}>
                    <View style={{height: realScreen*0.05, flexDirection:"row", marginTop: "5%", marginHorizontal: "3%",justifyContent:"center"}}>
                        <View style={{ flex: 4 }} >
                            <Text style={{ fontSize: 18, fontWeight: "700", }}> 오늘의 감정책 </Text>
                        </View>
                        <TouchableOpacity style={{ flex: 1, borderRadius: 5, height: realScreen*0.045,justifyContent:"center" }}
                        onPress={() => { navigation.navigate('popularbook')}}>
                            <Text style={{alignSelf: "center", color: "#20543F", fontWeight:"800", fontSize:17}}>더보기</Text>
                        </TouchableOpacity>
                    </View>

                <ScrollView style={{ marginHorizontal: "5%"}} horizontal = {true}>

                        {selectedList2.map(book => {
                            return(

                                               
                                <BookComponent2
                                navigation={navigation}
                                book={book}
                                bookKey={book.bookKey}

                                    />

                            )})}
                </ScrollView>
                                       


                </View>

            <View style={{ height: realScreen*0.4, backgroundColor:"#F1F3F2"}}>
                <View style={{flex:1, marginTop: "3%", flexDirection: "row", marginHorizontal: "3%"}}>
                        <View style={{ flex: 4, marginTop: "3%", height: realScreen*0.045}}> 
                            <Text style={{ fontSize: 18, fontWeight: "700" }}> 감정 질문지 </Text>
                        </View>
                        <TouchableOpacity style={{ marginTop: "1.5%", flex: 1, height: realScreen*0.045, justifyContent:'center'}}
                            onPress={() => { navigation.navigate('QuestionPallete')}}>
                            <Text style={{alignSelf: "center", color: "#20543F", fontWeight:"800", fontSize:17}}>더보기</Text>
                        </TouchableOpacity>

                </View>

                <View style={{flex: 20,marginHorizontal:"2%", }} horizontal={true}>
                <Swiper
                        index={selectedList3.questionsKey}
                        loop={true}
                        showsPagination={false}
                        onSwiper={setAutoSwiper}
                        style={{ marginTop: "5%" }}
                        showsButtons={false}
                        autoplay={true}
                        autoplayTimeout={3}
                        resizeMode="contain"
                    >

                                {selectedList3.map((question, index) => (
                                    test3.question=question,
                                    test6.index=index,

                                    <QuestionComponent
                                    key={question.chapterKey}
                                    navigation={navigation}
                                    question={question}
                                    questionsKey={question.questionsKey}
                                    index={index}
                                    />
                                ))
                                }
                    </Swiper>
                </View>



            </View>



            <View style={{ height: realScreen*0.42, backgroundColor: "#Fbfbfb" }}>
                    <View style={{height: realScreen*0.05, flexDirection:"row", marginTop: "5%", marginHorizontal: "3%",justifyContent:"center"}}>
                        <View style={{ flex: 4, marginTop: "3%" }} >
                            <Text style={{ fontSize: 18, fontWeight: "700", }}> 오늘의 감정일기 </Text>
                        </View>
                        <TouchableOpacity style={{ marginTop: "1.5%", flex: 1, height: realScreen*0.045,justifyContent:"center" }}
                        onPress={() => { navigation.navigate('PopularArticle')}}>
                            <Text style={{alignSelf: "center", color: "#20543F", fontWeight:"800", fontSize:17}}>더보기</Text>
                        </TouchableOpacity>
                    </View>
                <View style={{height:realScreen*0.32, width:"100%",}}> 

                    <Swiper
                        // index={book.bookKey}
                        loop={false}
                        showsPagination={false}
                        onSwiper={setSwiper}
                        showsButtons={true}
                        style={{ marginHorizontal: "4%",}}
                        nextButton={<Text style={styles.nextButtonText}>›</Text>}
                        prevButton={<Text style={styles.prevButtonText}>›</Text>}
                    >

                        {selectedList.map((chapter, index) => {
                            // console.log("bookcomponent selectedList " + selectedList)
                            return(

                                    <View style={{flexDirection:"row", height: realScreen*0.4, backgroundColor:"#FBFBFB", width:"90%" }}>
                                               
                                        <BookComponent
                                        navigation={navigation}
                                        chapter={chapter}
                                        bookKey={chapter.bookKey}
                                        index={index}
                                        selectedList={selectedList}
                                            />
                                    </View>

                            )})}


                    </Swiper>
                </View>
            </View>

            




            <View style={{ height: realScreen*0.55, backgroundColor: "#fafafa"}}>
                <View style={{flex:1, flexDirection: "row", marginHorizontal: "3%"}}>
                    <View style={{flex: 4}}>
                        <Text style={{fontSize: 18, fontWeight: "700" }}> 에디터 </Text>
                    </View>
                    <TouchableOpacity style={{ flex:1, borderRadius: 5, height: realScreen*0.045,justifyContent:"center"}}
                        onPress={() => { navigation.navigate('editorBoard')}}>
                            <Text style={{alignSelf: "center", color: "#20543F", fontWeight:"800", fontSize:17}}>더보기</Text>
                    </TouchableOpacity>
                </View>
                <View style= {{flex:8}}>  
                    <ScrollView style={{ marginTop: "1%", marginHorizontal: "2%"}} horizontal = {true}>
                            {writings.map((item,index) => {
                                        return (
                                            <WritingItem
                                                navigation={navigation}
                                                key={item.writingKey}
                                                writing={item}
                                                list={writings}
                                                index={index}

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



function BookComponent2 (props) {
    const { book, bookKey, navigation } = props

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
      firebase_db.ref(`users/${book.user_uid}`)
          .on('value', (snapshot) => {
              let BookItemUserinfo = snapshot.val();
              if (BookItemUserinfo > '') {
                setBookItemUserinfo(BookItemUserinfo);
              }
          })
  }, []);


    return (
        <View style={{height: realScreen*0.25, backgroundColor:"#FBFBFB", flexDirection:"row", marginRight:30 , borderRadius: 10}}>                                                                      
            <TouchableOpacity style={{ width: ScreenWidth * 0.4, height: realScreen * 0.25, marginTop: "5%" }} onPress={() => { navigation.navigate('MyBookPublic', { bookKey: book.bookKey, userinfo: BookItemUserinfo}) }}>
                <View style={{ backgroundColor: book.Color, opacity: 0.8, height: realScreen * 0.32, width: ScreenWidth * 0.042, zIndex: 1 }}>
                </View>
                <View style={{
                    backgroundColor: book.Color,
                    zIndex: 0, position: "absolute", marginLeft: ScreenWidth * 0.025, height: realScreen * 0.32, width: ScreenWidth * 0.4, alignItems: "center", justifyContent: "center"
                }}>
                    <Image source={{ uri: book.url }} style={{ zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.32, width: ScreenWidth * 0.4, alignItems: "center", justifyContent: "center" }}></Image>
                    <View style={{ backgroundColor: "white", height: realScreen * 0.24, width: ScreenWidth * 0.29, }}>
                        <Text style={{ marginTop: "30%", marginLeft: "10%" }}>{book.defaultTitle}</Text>
                        <Text style={{ marginTop: "5%", marginHorizontal:"10%", fontWeight: "500" }}>{book.bookTitle}</Text>
                        <Text style={{ marginTop: "20%", marginLeft: "10%", fontSize: 10 }}>{BookItemUserinfo.iam}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        </View>
)
}
 function BookComponent (props) {
    const { chapter, bookKey, navigation, index,selectedList } = props

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





    return (
        <View style={{height: realScreen*0.25, backgroundColor:"#FBFBFB", width:ScreenWidth*0.95}}>

        <TouchableOpacity style={{width:ScreenWidth*0.95,  height:realScreen * 0.25 , marginTop:"5%", borderRadius:10, shadowColor: "#595959",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 10}} onPress={() => {navigation.navigate('MyArticleQuestions', { chapterKey: chapter.chapterKey,bookKey:chapter.bookKey, index:index , list:selectedList}) }}>
                                                                                    <View style={{ width: ScreenWidth * 0.85,padding:"5%",backgroundColor:"white", marginHorizontal:"2%", flex:1, marginLeft:"4%", borderRadius: 10}}>
                                                                                            <View style={{flexDirection:"row", flex:1}}>
                                                                                                    <View style={{backgroundColor:chapter.chColor, flex:1, marginTop:"2%"}}> 
                                                                                                    </View>
                                                                                                    <Text style={{flex:20,fontSize: 16, fontWeight: "700",  marginTop: "6%",marginHorizontal: "5%",}}>{chapter.chapterTitle}</Text>
                                                                                            </View>
                                                                                            <View style={{flex:2}}>
                                                                                                    <Text style={{ fontWeight: "500", marginHorizontal: "5%", marginTop: "5%", marginBottom:"5%", }} numberOfLines={3} >{chapter.mainText}</Text>
                                                                                            </View>
                                                                                    </View>


                                                </TouchableOpacity>

                    
        </View>
)
}
function QuestionComponent (props) {
    const { question, bookKey, navigation } = props

    // console.log("BookComponentchapter2222",chapter)
    // console.log("BookComponentchapter",chapter.bookKey)
    console.log("BookComponentquestioney",question)

    // const bookKey = chapter.bookKey
    // console.log("BookComponentbookKey",bookKey)
    const headerHeight = useHeaderHeight();
    const ScreenHeight = Dimensions.get('window').height   //height
    const BottomSpace = getBottomSpace()
    const tabBarHeight = useBottomTabBarHeight();
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight-headerHeight-BottomSpace-tabBarHeight
    const ScreenWidth = Dimensions.get('window').width






    return (
        <View style={{ height: realScreen * 0.3, width: ScreenWidth*0.95}}>

            <TouchableOpacity style={{ width: ScreenWidth * 0.96, height: realScreen * 0.28, marginTop: "5%",  }} onPress={() => navigation.navigate("alltheanswers", { questionsKey: question.questionsKey, color: question.Color })}>
                <View style={{ width: ScreenWidth * 0.85, padding: "5%", backgroundColor: "white", marginHorizontal: "5%", flex: 1,  height: realScreen * 0.3, borderRadius: 10,  }}>
                    <View style={{ flexDirection: "row", flex: 2,}}>
                        <View style={{ backgroundColor: question.Color, flex: 1, marginTop: "2%", height:"70%" }}>
                        </View>
                        <Text style={{ flex: 20, fontSize: 16, fontWeight: "700", marginTop: "3%", marginHorizontal: "5%", }} numberOfLines={2}>{question.title}</Text>
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={{ fontWeight: "500", marginHorizontal: "5%", marginTop: "3%", marginBottom: "3%", }} numberOfLines={4} >{question.summary}</Text>
                    </View>
                </View>


            </TouchableOpacity>


        </View>
)
}
const WritingItem=(props)=> {
    const {writing, navigation, index, list}=props;



    return (
        <View style={{marginTop:10,borderRadius:10, marginLeft:10, marginRight:10, marginBottom:20}}>
            <TouchableOpacity style={styles.bookIndexOne} onPress={() => { navigation.navigate('readEditorWriting', { writingKey:writing.key, navigation: navigation, index:index, list:list}) }}>
                <View style={{backgroundColor:"#A2AD9C", width: 190, height: "100%", borderRadius: 10}}>
                    <Image style={{height:"40%", borderRadius: 10}} source={{uri:writing.image}}></Image>
                    <View style={{margin: "10%"}}>
                        <Text style={{fontSize: 15, color: "white", fontWeight: "600"}} numberOfLines={3}>{writing.title}</Text>
                        <Text style={{fontSize: 13, marginTop: 10}} numberOfLines={3}>{writing.summary}</Text>
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