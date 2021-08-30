import React, { useEffect, useState } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Dimensions, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import firebase from 'firebase/app'
import Swiper from 'react-native-swiper'
import backgroundimage from '../../assets/backgroundimage.jpg'
import BookComponent from '../../components/BookComponent';
import { useHeaderHeight } from '@react-navigation/stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
const test2 = {
    item: ""
}
const MyPage = ({ navigation }) => {

    const [userinfo, setUserinfo] = useState({
        iam: "익명의.지은이",
        selfLetter: "안녕하세요 익명의 지은이입니다."
    });
    useEffect(() => {
        firebase_db.ref(`users/${user_uid}`)
            .on('value', (snapshot) => {
                let userinfo = snapshot.val();
                if (userinfo > '') {
                    setUserinfo(userinfo);
                }
            })
    }, []);

    var user = firebase.auth().currentUser;
    var user_uid
    if (user != null) {
        user_uid = user.uid;
    }


    const headerHeight = useHeaderHeight();
    const ScreenHeight = Dimensions.get('window').height   //height
    const ScreenWidth = Dimensions.get('window').width
    console.log(ScreenWidth)
    const BottomSpace = getBottomSpace()
    const tabBarHeight = useBottomTabBarHeight();
    // const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight - headerHeight - BottomSpace - tabBarHeight

    const firstColor= "#9E001C"
    const secondColor="#F6AE2D"
    const thirdColor = "#33658A"
    const fourthColor= "#494949"


    console.log("startthispage")

    const [colorBookList, setColorBookList] = useState([]);

    useEffect(()=>{
        firebase_db.ref(`users/${user_uid}/myBooks`)
            .on('value',(snapshot)=>{
                let colorBookList = snapshot.val();
                if (colorBookList>""){
                    setColorBookList(colorBookList)
                }
                })
            },[])// 여기에 colorBookList 이거 넣으면 책 삭제 되면 바로업로드 되는데... 대신 로딩이 안됨 진퇴양난

            console.log("mpage color book list", colorBookList)
            const colorBookListValues= Object.values(colorBookList)
            console.log("mpage colorBookListValues", colorBookListValues)


            //firstBookKey
            function getFirstBookKey(colorBookListValues) {
                const firstBookKey = colorBookListValues.find(bookKey => isStringStart1(bookKey));
                return firstBookKey;
            }

            function isStringStart1(string) {
                return (string.indexOf('1') == 0);
            }
            const firstBookKey = getFirstBookKey(colorBookListValues);
            console.log("mypage firstBookKey", firstBookKey)

            //secondBookKey
            function getSecondBookKey(colorBookListValues) {
                const secondBookKey = colorBookListValues.find(bookKey => isStringStart2(bookKey));
                return secondBookKey
            }

            function isStringStart2(string) {
                return (string.indexOf('2') == 0);
            }
            const secondBookKey = getSecondBookKey(colorBookListValues);
            console.log("mypage secondBookKey", secondBookKey)

            //thirdBookKey
            function getThirdBookKey(colorBookListValues) {
                const thirdBookKey = colorBookListValues.find(bookKey => isStringStart3(bookKey));
                return thirdBookKey
            }

            function isStringStart3(string) {
                return (string.indexOf('3') == 0);
            }
            
            const thirdBookKey = getThirdBookKey(colorBookListValues);
            console.log("mypage thirdBookKey", thirdBookKey)

            //fourthBookKey
            function getFourthBookKey(colorBookListValues) {
                const fourthBookKey = colorBookListValues.find(bookKey => isStringStart4(bookKey));
                return fourthBookKey      }

            function isStringStart4(string) {
                return (string.indexOf('4') == 0);
            }
            
            const fourthBookKey = getFourthBookKey(colorBookListValues);
            console.log("mypage fourthBookKey", fourthBookKey)


            const [firstBook, setfirstBook] = useState({
                bookKey: '',
                bookTitle: '',
                chapters: {},
                intro: '',
                regdate: '',
                url: '',
                user_uid: '',
            });
        
            useEffect(getMyItem1, [firstBookKey]);
            function getMyItem1() {
                console.log("getMyItem1()")
                firebase_db
                    .ref(`/book/${firstBookKey}`)
                    .on('value', (snapshot) => {
                        const newfirstBook = {};
                        snapshot.forEach((child) => {
                            const key = child.key;
                            const value = child.val();
                            newfirstBook[key] = value; // 우리가 잘 아는 javascript object가 된다!
                        });
                        if (firstBookKey > ''){
                        setfirstBook({
                            ...firstBook, // 기본 바탕색
                            ...newfirstBook, // 덧칠
                        });}
                    });
            }



            const [secondBook, setsecondBook] = useState({
                bookKey: '',
                bookTitle: '',
                chapters: {},
                intro: '',
                regdate: '',
                url: '',
                user_uid: '',
            });
        
            useEffect(getMyItem2, [secondBookKey]);
            function getMyItem2() {
                console.log("getMyItem2()")
                firebase_db
                    .ref(`/book/${secondBookKey}`)
                    .on('value', (snapshot) => {
                        const newsecondBook = {};
                        snapshot.forEach((child) => {
                            const key = child.key;
                            const value = child.val();
                            newsecondBook[key] = value; // 우리가 잘 아는 javascript object가 된다!
                        });
                        if (secondBookKey > ''){
                        setsecondBook({
                            ...secondBook, // 기본 바탕색
                            ...newsecondBook, // 덧칠
                        });}
                    });
            }



            const [thirdBook, setthirdBook] = useState({
                bookKey: '',
                bookTitle: '',
                chapters: {},
                intro: '',
                regdate: '',
                url: '',
                user_uid: '',
            });
        
            useEffect(getMyItem3, [thirdBookKey]);
            console.log("getMyItem3()")
            function getMyItem3() {
                firebase_db
                    .ref(`/book/${thirdBookKey}`)
                    .on('value', (snapshot) => {
                        const newthirdBook = {};
                        snapshot.forEach((child) => {
                            const key = child.key;
                            const value = child.val();
                            newthirdBook[key] = value; // 우리가 잘 아는 javascript object가 된다!
                        });
                        if (thirdBookKey > ''){
                        setthirdBook({
                            ...thirdBook, // 기본 바탕색
                            ...newthirdBook, // 덧칠
                        });}
                    });
            }

            console.log("mypage thirdBook",thirdBook)

            const [fourthBook, setfourthBook] = useState({
                bookKey: '',
                bookTitle: '',
                chapters: {},
                intro: '',
                regdate: '',
                url: '',
                user_uid: '',
            });
        
            useEffect(getMyItem4, [fourthBookKey]);
            console.log("getMyItem4()")
            function getMyItem4() {
                firebase_db
                    .ref(`/book/${fourthBookKey}`)
                    .on('value', (snapshot) => {
                        const newfourthBook = {};
                        snapshot.forEach((child) => {
                            const key = child.key;
                            const value = child.val();
                            newfourthBook[key] = value; // 우리가 잘 아는 javascript object가 된다!
                        });
                        if (fourthBookKey > ''){
                        setfourthBook({
                            ...fourthBook, // 기본 바탕색
                            ...newfourthBook, // 덧칠
                        });}
                    });
            }

            console.log("mypage fourthBook",fourthBook)



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fbfbfb" }}>
            <View style={{ flex: 1 }}>
                <StatusBar style="white" />
                <View style={{height: realScreen*0.08, alignItems:"center", borderBottomColor: "#D9D9D9", borderBottomWidth:0.5, justifyContent:"center", backgroundColor: "white", }}>
                <Text style={{fontSize:17, fontWeight:"700", marginTop: "2%", color: "#21381c"}}>나의 감정록</Text>
            </View>
                <View style={{ height: realScreen * 0.16, marginHorizontal: "5%", borderRadius: 10, backgroundColor: "#F2F2F2" , justifyContent:"center", marginTop:"2%"}}>
                    <View style={{ flex: 1.5, flexDirection: "row", alignSelf: "center", marginHorizontal: "3%", borderRadius: 10,  }}>
                        <Text style={{ flex: 1, fontSize: 17, fontWeight: "600", marginTop: "7%", marginLeft: "3%" }}>{userinfo.iam}</Text>
                        <TouchableOpacity style={{ alignSelf: "center", borderRadius: 50, height: 34, width: 34 }} onPress={() => { navigation.navigate('Account') }}>
                            <Icon name="settings-outline" size={27} color="#21381C" style={{ alignSelf: "center", marginTop: "10%", marginRight: "20%" }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1}}>
                    <Text style={{ fontSize: 14, fontWeight: "400", color: "#204040", marginHorizontal: "5%", }}> {userinfo.selfLetter}</Text>
                    </View>
                </View>
                <View style={{ height: realScreen * 0.7, width: "94%", alignSelf: "center", marginBottom: 10, padding:"2%"}}>
                    
                    <View style={{flexDirection:"row", marginLeft:"2.5%"}}>
                        <Text style={{marginTop:"3%"}}>내 감정의 색깔은? </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('feelingtutorial') }} style={{marginLeft:"45%", marginTop:"3%"}}>
                            <Text>감정도움말</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row", marginTop:"5%", marginLeft:"2.5%"}}>

                                {firstBookKey == undefined ? (

                                    <TouchableOpacity onPress={()=> navigation.navigate('MakeNewBook',{color:"firstColor"})} style={{ flexDirection: "row", height:ScreenHeight*0.3,width: ScreenWidth * 0.25 }}>

                                    <View style={{ backgroundColor:firstColor, opacity: 0.8, height: realScreen * 0.3, width: ScreenWidth * 0.04, zIndex: 1 }}>

                                    </View>

                                    <View style={{ backgroundColor: "#c5c5c5",zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center" }}>
                                        <View style={{ backgroundColor: "white", height: realScreen * 0.22, width: ScreenWidth * 0.27, }}>
                                            <Text style={{ marginTop: "30%", marginLeft: "10%" }}>빨간색 감정은</Text>
                                            <Text style={{ marginTop: "5%", marginLeft: "10%", fontWeight: "500" }}>책 제목이다.</Text>

                                            {/* <View style={{ backgroundColor: firstColor, opacity: 0.4, position: "absolute", zIndeox: 0, marginTop: "60%", width: ScreenWidth * 0.20, height: realScreen * 0.004, marginLeft: 6 }}>
                                            </View> */}

                                            <View style={{backgroundColor:"white", marginTop:"30%", alignSelf:"center", height:40, width:ScreenWidth * 0.35, opacity:0.5}}>
                                                <Text style={{alignSelf:"center", marginTop:"10%"}}>책 시작하기</Text>
                                            </View>

                                        </View>
                                    </View>
                                    </TouchableOpacity>
                                    ) : (


                                        <TouchableOpacity onPress={()=> navigation.navigate('MyBook',{bookKey:firstBookKey, color:firstColor})} style={{ flexDirection: "row", height:ScreenHeight*0.3,width: ScreenWidth * 0.25 }}>

                                        <View style={{ backgroundColor:firstColor, opacity: 0.8, height: realScreen * 0.3, width: ScreenWidth * 0.04, zIndex: 1 }}>
                                        </View>
    
                                        <View style={{ backgroundColor: "#c5c5c5",zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center" }}>
                                            <Image source={{uri: firstBook.url}} style={{zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center"}}></Image>
                                            <View style={{ backgroundColor: "white", height: realScreen * 0.22, width: ScreenWidth * 0.28, }}>
                                                <Text style={{ marginTop: "30%", marginLeft: "10%" }}>빨간색 감정은</Text>
                                                <Text style={{ marginTop: "5%", marginHorizontal:"10%", fontWeight: "500" }}>{firstBook.bookTitle}</Text>

                                                <Text style={{marginTop:"20%", marginLeft:"10%", fontSize:10}}>{userinfo.iam}</Text>
                                            </View>
                                        </View>
                                        </TouchableOpacity>

                                    )}


                                {thirdBookKey == undefined ? (

                                    <TouchableOpacity onPress={()=> navigation.navigate('MakeNewBook',{color:"thirdColor"})} style={{ flexDirection: "row", height:ScreenHeight*0.3,width: ScreenWidth * 0.25 , marginLeft:80}}>
                                           <View style={{ backgroundColor: thirdColor, opacity: 0.8, height: realScreen * 0.3, width: ScreenWidth * 0.04, zIndex: 1 }}>

                                            </View>
 

                                            <View style={{ backgroundColor: "#c5c5c5", zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center" }}>
                                                <View style={{ backgroundColor: "white", height: realScreen * 0.22, width: ScreenWidth * 0.28, }}>
                                                    <Text style={{ marginTop: "30%", marginLeft: "10%" }}>파란색 감정은</Text>
                                                    <Text style={{ marginTop: "5%", marginLeft: "10%", fontWeight: "500" }}>책 제목이다.</Text>

                                                    {/* <View style={{ backgroundColor: thirdColor, opacity: 0.4, position: "absolute", zIndeox: 0, marginTop: "60%", width: ScreenWidth * 0.20, height: realScreen * 0.004, marginLeft: 6 }}>
                                                    </View> */}

                                                    <View style={{backgroundColor:"white", marginTop:"30%", alignSelf:"center", height:40, width:ScreenWidth * 0.35, opacity:0.5}}>
                                                        <Text style={{alignSelf:"center", marginTop:"10%"}}>책 시작하기</Text>
                                                    </View>

                                                </View>
                                            </View>
                                    </TouchableOpacity>
                                ):(
                                    <TouchableOpacity onPress={()=> navigation.navigate('MyBook',{bookKey:thirdBookKey})} style={{ flexDirection: "row", height:ScreenHeight*0.3,width: ScreenWidth * 0.25,marginLeft:80 }}>

                                    <View style={{ backgroundColor:thirdColor, opacity: 0.8, height: realScreen * 0.3, width: ScreenWidth * 0.04, zIndex: 1 }}>

                                    </View>

                                    <View style={{ backgroundColor: "#c5c5c5",zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center" }}>
                                        <Image source={{uri: thirdBook.url}} style={{zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center"}}></Image>
                                        <View style={{ backgroundColor: "white", height: realScreen * 0.22, width: ScreenWidth * 0.28, }}>
                                            <Text style={{ marginTop: "30%", marginLeft: "10%" }}>파란색 감정은</Text>
                                            <Text style={{ marginTop: "5%", marginHorizontal:"10%", fontWeight: "500" }}>{thirdBook.bookTitle}</Text>
 
                                            <Text style={{marginTop:"20%", marginLeft:"10%", fontSize:10}}>{userinfo.iam}</Text>
                                        </View>
                                    </View>
                                    </TouchableOpacity>

                                )}
 
                    </View>



                    <View style={{ flexDirection: "row",marginLeft:"2.5%" }}>

                    {secondBookKey == undefined ? (

                        <TouchableOpacity onPress={()=> navigation.navigate('MakeNewBook',{color:"secondColor"})} style={{ flexDirection: "row", height: ScreenHeight * 0.3, width: ScreenWidth * 0.25 }}>

                            <View style={{ backgroundColor: secondColor, opacity: 0.8, height: realScreen * 0.3, width: ScreenWidth * 0.04, zIndex: 1 }}>

                            </View>

                            <View style={{ backgroundColor: "#c4c4c4", zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center" }}>
                                <View style={{ backgroundColor: "white", height: realScreen * 0.22, width: ScreenWidth * 0.28, }}>
                                    <Text style={{ marginTop: "30%", marginLeft: "10%" }}>노란색 감정은</Text>
                                    <Text style={{ marginTop: "5%", marginLeft: "10%", fontWeight: "500" }}>책 제목이다.</Text>

                                    {/* <View style={{ backgroundColor: secondColor, opacity: 0.4, position: "absolute", zIndeox: 0, marginTop: "60%", width: ScreenWidth * 0.20, height: realScreen * 0.004, marginLeft: 6 }}>
                                    </View> */}

                                    <View style={{ backgroundColor: "white", marginTop: "30%", alignSelf: "center", height: 40, width: ScreenWidth * 0.35, opacity: 0.5 }}>
                                        <Text style={{ alignSelf: "center", marginTop: "10%" }}>책 시작하기</Text>
                                    </View>

                                </View>
                            </View>
                        </TouchableOpacity>)
                        :(
                            <TouchableOpacity onPress={()=> navigation.navigate('MyBook',{bookKey:secondBookKey})} style={{ flexDirection: "row", height: ScreenHeight * 0.3, width: ScreenWidth * 0.25 }}>

                            <View style={{ backgroundColor: secondColor, opacity: 0.8, height: realScreen * 0.3, width: ScreenWidth * 0.04, zIndex: 1 }}>

                            </View>

                            <View style={{ backgroundColor: "#c4c4c4", zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center" }}>
                                <Image source={{uri: secondBook.url}} style={{zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center"}}></Image>

                                <View style={{ backgroundColor: "white", height: realScreen * 0.22, width: ScreenWidth * 0.28, }}>
                                    <Text style={{ marginTop: "30%", marginLeft: "10%" }}>노란색 감정은</Text>
                                    <Text style={{ marginTop: "5%", marginHorizontal:"10%", fontWeight: "500" }}>{secondBook.bookTitle}</Text>

                                    <Text style={{marginTop:"20%", marginLeft:"10%", fontSize:10}}>{userinfo.iam}</Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                        )}


                        {fourthBookKey == undefined ? (

                        <TouchableOpacity onPress={()=> navigation.navigate('MakeNewBook',{color:"fourthColor"})}  style={{ flexDirection: "row", height: ScreenHeight * 0.3, width: ScreenWidth * 0.25, marginLeft: 80 }}>

                            <View style={{ backgroundColor: fourthColor, opacity: 0.9, height: realScreen * 0.3, width: ScreenWidth * 0.04, zIndex: 1 }}>

                            </View>

                            <View style={{ backgroundColor: "#c5c5c5", zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center" }}>
                                <View style={{ backgroundColor: "white", height: realScreen * 0.22, width: ScreenWidth * 0.28, }}>
                                    <Text style={{ marginTop: "30%", marginLeft: "10%" }}>검은색 감정은</Text>
                                    <Text style={{ marginTop: "5%", marginHorizontal:"10%", fontWeight: "500" }}>책 제목이다.</Text>

                                    {/* <View style={{ backgroundColor: fourthColor, opacity: 0.4, position: "absolute", zIndeox: 0, marginTop: "60%", width: ScreenWidth * 0.20, height: realScreen * 0.004, marginLeft: 6 }}>
                                    </View> */}

                                    <View style={{ backgroundColor: "white", marginTop: "30%", alignSelf: "center", height: 40, width: ScreenWidth * 0.35, opacity: 0.5 }}>
                                        <Text style={{ alignSelf: "center", marginTop: "10%" }}>책 시작하기</Text>
                                    </View>

                                </View>
                            </View>
                        </TouchableOpacity>):(

                            <TouchableOpacity onPress={()=> navigation.navigate('MyBook',{bookKey:fourthBookKey, color:fourthColor})}  style={{ flexDirection: "row", height: ScreenHeight * 0.3, width: ScreenWidth * 0.25, marginLeft: 80 }}>

                            <View style={{ backgroundColor: fourthColor, opacity: 0.8, height: realScreen * 0.3, width: ScreenWidth * 0.04, zIndex: 1 }}>

                            </View>

                            <View style={{ backgroundColor: "#c5c5c5", zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center" }}>
                                <Image source={{uri: fourthBook.url}} style={{zIndex: 0, position: "absolute", marginLeft: 10, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center"}}></Image>
                                <View style={{ backgroundColor: "white", height: realScreen * 0.22, width: ScreenWidth * 0.28, }}>
                                    <Text style={{ marginTop: "30%", marginLeft: "10%" }}>검은색 감정은</Text>
                                    <Text style={{ marginTop: "5%", marginHorizontal:"10%", fontWeight: "500" }}>{fourthBook.bookTitle}</Text>

                                    <Text style={{marginTop:"20%", marginLeft:"10%", fontSize:10}}>{userinfo.iam}</Text>


                                </View>
                            </View>
                            </TouchableOpacity>


                        )}

                        {colorBookListValues.length == 0 ? (
                                    <TouchableOpacity onPress={()=>navigation.navigate("onboarding")} style={{zIndex:2, position: "absolute",backgroundColor:"#999999", height:30, justifyContent:"center", width:100, alignItems:"center", marginTop:"45%", marginLeft:"65%", borderRadius:"20%"}}>
                                        <Text>도움말보기</Text>
                                    </TouchableOpacity>) :(
                                        <View></View>
                                    )}
                    </View>




                </View>
            </View>
        </SafeAreaView>
    )
}
AppRegistry.registerComponent('MyPage', () => SwiperComponent)
export default MyPage;