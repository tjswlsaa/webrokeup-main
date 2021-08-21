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
    const [myBook, setMyBook] = useState([]);
    const [userinfo, setUserinfo] = useState({
        iam: "익명의.지은이",
        selfLetter: "안녕하세요 익명의 지은이입니다."
    });
    const [swiper, setSwiper] = useState(null);
    const { width, height } = Dimensions.get('window');
    const headerHeight = useHeaderHeight();
    const ScreenHeight = Dimensions.get('window').height   //height
    const ScreenWidth = Dimensions.get('window').width
    console.log(ScreenWidth)
    const BottomSpace = getBottomSpace()
    const tabBarHeight = useBottomTabBarHeight();
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight - headerHeight - BottomSpace - tabBarHeight
    var user = firebase.auth().currentUser;
    var user_uid
    if (user != null) {
        user_uid = user.uid;
    }
    var userID = user_uid.substring(0, 6)
    useEffect(() => {
        firebase_db.ref(`users/${user_uid}`)
            .on('value', (snapshot) => {
                let userinfo = snapshot.val();
                if (userinfo > '') {
                    setUserinfo(userinfo);
                }
            })
    }, []);
    useEffect(() => {
        firebase_db.ref('book/')
            .on('value', (snapshot) => {
                let temp = [];
                snapshot.forEach((child) => {
                    const item = {
                        ...child.val(),
                        key: child.key,
                    }
                    temp.push(item)
                })
                temp.sort(function (a, b) {
                    return new Date(a.regdate) - new Date(b.regdate);
                })
                setMyBook(temp);
                //console.log('mypage data',data)
            })
    }, []) // 구 리엑트: componentDidMount에 해당함 -> 컴포넌트가 마운트 되었다면 -> 컴포넌트가 프로그래밍적으로, 변수틱하게, 생성되어서 처음으로 웹브라우저에 입성하는 순간 -> 처음으로 보일 때마다
    // 그럴 때마다.. 이 부분이 최초 단 한 번 만 딱 한 번 만 실행됩니다.
    // console.log('myBook',myBook)
    console.log('mypage.bookKey', myBook.bookKey)
    console.log('mypage.', myBook)
    const myBookFiltered = myBook.filter(filteredMyBook => filteredMyBook.user_uid == user_uid)
    // // console.log('myBookFiltered',myBookFiltered)
    //// console.log('whatiswrong',myBookFiltered)
    //// console.log('키값확인',myBookFiltered.length)
    // const slideTo = (index) => swiper.slideTo(index);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FBFBFB" }}>
            <View style={{ flex: 1 }}>
                <StatusBar style="white" />
                <View style={{ height: realScreen * 0.06, alignItems: "center", justifyContent: "center", backgroundColor: "#FBFBFB" }}>
                    <Text style={{ fontSize: 17, fontWeight: "700", marginTop: "2%", color: "#21381C" }}>FEEL ME FILL ME</Text>
                </View>
                <View style={{ height: realScreen * 0.16, marginHorizontal: "5%", borderRadius: 10, alignSelf: "center", backgroundColor: "#F2F2F2" }}>
                    <View style={{ flex: 1, flexDirection: "row", alignSelf: "center", marginHorizontal: "3%", borderRadius: 10 }}>
                        <Text style={{ flex: 1, fontSize: 17, fontWeight: "600", fontColor: "#204040", marginTop: "7%", marginLeft: "3%" }}>{userinfo.iam}</Text>
                        <TouchableOpacity style={{ alignSelf: "center", borderRadius: 50, height: 34, width: 34 }} onPress={() => { navigation.navigate('Account') }}>
                            <Icon name="settings-outline" size={27} color="#21381C" style={{ alignSelf: "center", marginTop: "10%", marginRight: "20%" }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ flex: 1, fontSize: 14, fontWeight: "400", fontColor: "#204040", marginHorizontal: "5%" }}> {userinfo.selfLetter}</Text>
                </View>
                <View style={{ height: realScreen * 0.7, width: "94%", alignSelf: "center", marginBottom: 10, padding:"2%"}}>
                    
                    <View style={{flexDirection:"row"}}>
                        <Text style={{marginTop:"3%"}}>내 감정의 색깔은? </Text>
                        <TouchableOpacity style={{marginLeft:"45%", marginTop:"3%"}}>
                            <Text>감정도움말</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row", marginTop:"5%"}}>
                                    <TouchableOpacity style={{ flexDirection: "row", height:ScreenHeight*0.3,width: ScreenWidth * 0.25 }}>

                                    <View style={{ backgroundColor: '#FF4A4A', opacity: 0.9, height: realScreen * 0.3, width: ScreenWidth * 0.07, zIndex: 1 }}>

                                    </View>

                                    <View style={{ backgroundColor: "#FF9F9F",zIndex: 0, position: "absolute", marginLeft: 15, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center" }}>
                                        <View style={{ backgroundColor: "white", height: realScreen * 0.22, width: ScreenWidth * 0.27, }}>
                                            <Text style={{ marginTop: "30%", marginLeft: "10%" }}>빨간 감정은</Text>
                                            <Text style={{ marginTop: "5%", marginLeft: "10%", fontWeight: "500" }}>책 제목이다.</Text>

                                            <View style={{ backgroundColor: "#FE5C5C", opacity: 0.4, position: "absolute", zIndeox: 0, marginTop: "60%", width: ScreenWidth * 0.20, height: realScreen * 0.004, marginLeft: 6 }}>
                                            </View>

                                            <View style={{backgroundColor:"white", marginTop:"30%", alignSelf:"center", height:40, width:ScreenWidth * 0.35, opacity:0.5}}>
                                                <Text style={{alignSelf:"center", marginTop:"10%"}}>책 시작하기</Text>
                                            </View>

                                        </View>
                                    </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flexDirection: "row", height:ScreenHeight*0.3,width: ScreenWidth * 0.25 , marginLeft:80}}>

                                            <View style={{ backgroundColor: 'yellow', opacity: 0.7, height: realScreen * 0.3, width: ScreenWidth * 0.07, zIndex: 1 }}>

                                            </View>

                                            <View style={{ backgroundColor: "#c5c5c5", zIndex: 0, position: "absolute", marginLeft: 15, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center" }}>
                                                <View style={{ backgroundColor: "white", height: realScreen * 0.22, width: ScreenWidth * 0.27, }}>
                                                    <Text style={{ marginTop: "30%", marginLeft: "10%" }}>노란 감정은</Text>
                                                    <Text style={{ marginTop: "5%", marginLeft: "10%", fontWeight: "500" }}>책 제목이다.</Text>

                                                    <View style={{ backgroundColor: "yellow", opacity: 0.4, position: "absolute", zIndeox: 0, marginTop: "60%", width: ScreenWidth * 0.20, height: realScreen * 0.004, marginLeft: 6 }}>
                                                    </View>

                                                    <View style={{backgroundColor:"white", marginTop:"30%", alignSelf:"center", height:40, width:ScreenWidth * 0.35, opacity:0.5}}>
                                                        <Text style={{alignSelf:"center", marginTop:"10%"}}>책 시작하기</Text>
                                                    </View>

                                                </View>
                                            </View>
                                    </TouchableOpacity>
 
                    </View>


                    {myBookFiltered.length == 0 ? (
                                    <TouchableOpacity style={{zIndex:2, position: "absolute",backgroundColor:"gray", height:1, justifyContent:"center", width:100, alignItems:"center", alignSelf:"center", marginTop:"50%"}}>
                                        <Text>도움말보기</Text>
                                    </TouchableOpacity>) :(
                                        <View></View>
                                    )}

                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={{ flexDirection: "row", height: ScreenHeight * 0.3, width: ScreenWidth * 0.25 }}>

                            <View style={{ backgroundColor: 'red', opacity: 0.7, height: realScreen * 0.3, width: ScreenWidth * 0.07, zIndex: 1 }}>

                            </View>

                            <View style={{ backgroundColor: "#c4c4c4", zIndex: 0, position: "absolute", marginLeft: 15, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center" }}>
                                <View style={{ backgroundColor: "white", height: realScreen * 0.22, width: ScreenWidth * 0.27, }}>
                                    <Text style={{ marginTop: "30%", marginLeft: "10%" }}>빨간 감정은</Text>
                                    <Text style={{ marginTop: "5%", marginLeft: "10%", fontWeight: "500" }}>책 제목이다.</Text>

                                    <View style={{ backgroundColor: "#FE5C5C", opacity: 0.4, position: "absolute", zIndeox: 0, marginTop: "60%", width: ScreenWidth * 0.20, height: realScreen * 0.004, marginLeft: 6 }}>
                                    </View>

                                    <View style={{ backgroundColor: "white", marginTop: "30%", alignSelf: "center", height: 40, width: ScreenWidth * 0.35, opacity: 0.5 }}>
                                        <Text style={{ alignSelf: "center", marginTop: "10%" }}>책 시작하기</Text>
                                    </View>

                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row", height: ScreenHeight * 0.3, width: ScreenWidth * 0.25, marginLeft: 80 }}>

                            <View style={{ backgroundColor: 'yellow', opacity: 0.7, height: realScreen * 0.3, width: ScreenWidth * 0.07, zIndex: 1 }}>

                            </View>

                            <View style={{ backgroundColor: "#c5c5c5", zIndex: 0, position: "absolute", marginLeft: 15, height: realScreen * 0.3, width: ScreenWidth * 0.38, alignItems: "center", justifyContent: "center" }}>
                                <View style={{ backgroundColor: "white", height: realScreen * 0.22, width: ScreenWidth * 0.27, }}>
                                    <Text style={{ marginTop: "30%", marginLeft: "10%" }}>노란 감정은</Text>
                                    <Text style={{ marginTop: "5%", marginLeft: "10%", fontWeight: "500" }}>책 제목이다.</Text>

                                    <View style={{ backgroundColor: "yellow", opacity: 0.4, position: "absolute", zIndeox: 0, marginTop: "60%", width: ScreenWidth * 0.20, height: realScreen * 0.004, marginLeft: 6 }}>
                                    </View>

                                    <View style={{ backgroundColor: "white", marginTop: "30%", alignSelf: "center", height: 40, width: ScreenWidth * 0.35, opacity: 0.5 }}>
                                        <Text style={{ alignSelf: "center", marginTop: "10%" }}>책 시작하기</Text>
                                    </View>

                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>



                    {/* {myBookFiltered.length == 0 ? (
                        <View style={{ height: realScreen * 0.6, resizeMode: "cover", backgroundColor:"yellow" }} >


                        </View>
                    ) : (
                        <View style={{ height: realScreen * 0.6, width: realScreen * 0.5, marginTop: "5%" }}>
                        </View>
                    )
                    } */}
                </View>
            </View>
        </SafeAreaView>
    )
}
AppRegistry.registerComponent('MyPage', () => SwiperComponent)
export default MyPage;