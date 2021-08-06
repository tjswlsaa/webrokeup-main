import React, {Children, useEffect, useState} from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Dimensions, SafeAreaView, TouchableOpacity,ImageBackground, ScrollView, TouchableHighlight, Platform, ImageStore} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { firebase_db } from '../../firebaseConfig';
import Constants from 'expo-constants';
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



const test1 ={ 
    userinfo:''
}
const test2= {
    item:""
}
const MyPage = ({navigation, item, bookKey}) => {
    const [myBook, setMyBook] = useState([]);
    const [userinfo, setUserinfo] = useState([]);
    test1.userinfo=userinfo
    const [swiper, setSwiper] = useState(null);
    const { width, height } = Dimensions.get('window');
    const headerHeight = useHeaderHeight();
    const ScreenHeight = Dimensions.get('window').height   //height
    const BottomSpace = getBottomSpace()
    const tabBarHeight = useBottomTabBarHeight();
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight-headerHeight-BottomSpace-tabBarHeight


    var user = firebase.auth().currentUser;
    var  user_uid
    if (user != null) {
      user_uid = user.uid;  
    }
    var userID=user_uid.substring(0,6)
       // console.log (userID)
   
    useEffect(()=>{
        firebase_db.ref(`users/${user_uid}`)
            .on('value', (snapshot) => {
                let userinfo = snapshot.val();
                setUserinfo(userinfo);
            })
    }, []);
    
    useEffect(() => {
        firebase_db.ref('book/')
            .on('value', (snapshot) => {
                let temp = [];
                snapshot.forEach((child) => {
                    const item={
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
   // console.log('myBook.bookKey', myBook.bookKey)
 
    const myBookFiltered= myBook.filter(filteredMyBook => filteredMyBook.user_uid == user_uid)

    // // console.log('myBookFiltered',myBookFiltered)
//// console.log('whatiswrong',myBookFiltered)
//// console.log('키값확인',myBookFiltered.length)
// const slideTo = (index) => swiper.slideTo(index);

return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#fbfbfb"}}>
        <View style={{flex: 1}}>
            <StatusBar style="white"/>
            <View style={{height: realScreen*0.06, alignItems:"center", justifyContent:"center", backgroundColor: "#fbfbfb"}}>
                <Text style={{fontSize:17, fontWeight:"700", marginTop: "2%", color: "#21381C"}}>나의 이별록</Text>
            </View>
            <View style={{height: realScreen*0.17, marginHorizontal: "3%", borderRadius: 15, alignSelf: "center", backgroundColor: "#E9E9E9"}}>
                <View style={{flex: 1, flexDirection: "row",  alignSelf: "center", marginHorizontal: "3%", borderRadius: 10}}>
                    <Text style={{flex: 1, fontSize: 17, fontWeight: "600", fontColor: "#204040", marginTop:"7%", marginLeft: "3%"}}>{userinfo.iam}</Text>
                    <TouchableOpacity style={{backgroundColor: "#204040", alignSelf: "center", borderRadius: 50, height: 35, width: 35}} onPress={()=>{navigation.navigate('Account')}}>
                        <Icon name="settings-outline" size={25} color="white" style={{alignSelf: "center", marginTop: "10%"}}/>
                    </TouchableOpacity>
                </View>
                <Text style={{flex: 1, fontSize: 15, fontWeight: "400", fontColor: "#204040", marginLeft: "3%"}}> {userinfo.selfLetter}</Text>
            </View>
            <View style={{height: realScreen*0.7, width: "94%", alignSelf:"center", marginBottom:10}}>
                {myBookFiltered.length == 0 ? (
                        <View style={{height:realScreen*0.6, resizeMode:"cover" }} >
                    <TouchableOpacity style= {{ flex:1, justifyContent:"center", alignItems:"center", }} 
                        onPress={()=>{navigation.navigate("MakeNewBook")}}>
                            <Icon2 name="plus" size = {30}/>
                            <Text style={{fontSize:15, marginTop: "5%"}}>새로운 책을 만들어주세요</Text>
                        </TouchableOpacity>
                    {/* </ImageBackground> */}
                        </View>
                    ) :  (
                        <View style={{flex:1, height: realScreen*0.6, resizeMode:"cover" }}>
                            <TouchableOpacity style={{flex:1}} onPress={()=>{navigation.navigate("MyBook", {item: item, bookKey: bookKey})}}>
                            <Swiper 
                            index={myBook.bookKey}
                            loop={false}
                            showsPagination={true}
                            onSwiper={setSwiper} 
                            style={styles.wrapper} showsButtons={false}
                            dot={
                            <View style={{           // unchecked dot style
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                width: 10,
                                height: 10,
                                borderRadius: 4,
                                marginLeft: 10,
                                marginRight: 9,
                            }}
                            />}
                            activeDot={<View style={{    // selected dots style
                                backgroundColor: "#21381C",
                                width: 10,
                                height: 10,
                                borderRadius: 4,
                                marginLeft: 10,
                                marginRight: 9,
                            }}/>}
                            >
                                    {myBookFiltered.map(item => {
                                        test2.item=item
                                        console.log('item여기서부터문제인가',item)
                                    return (
                                        <BookComponent
                                        key = {item.key}
                                        item={item}
                                        url={item.url}
                                        bookTitle={item.bookTitle}
                                        navigation = {navigation}
                                        userID={userID}
                                    />
                                            )
                                        })}
                            </Swiper>  
                            
                
                            </TouchableOpacity>
                        </View>
                    )
                    }
                <View style={{height: realScreen*0.1}}>
                    <TouchableOpacity style={{width: "60%", height: "50%", marginTop: "5%", backgroundColor: "#21381C", borderRadius: 20, alignSelf: "center"}} onPress={()=>{navigation.navigate("MakeNewBook")}}>
                                <Text style={{alignSelf: "center", paddingVertical: 10, fontSize: 15, color: "white"}}> 새 이별집 만들기</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    </SafeAreaView>
)}
const styles = StyleSheet.create({
    container : {
        backgroundColor: 'white',
    },
    container2: {
        backgroundColor: 'yellow',
    },
    subContainer: {
        height:"80%",
    },
    tag:{
        height:"20%"
    },
    tagText:{
        fontSize: 17,
        fontWeight: "600",
        marginLeft:"5%"
    },
    cardContainer:{
        marginTop: "3%",
        width: "100%",
        height: "25%",
        backgroundColor: "#fff",
    },
      wrap: {
        backgroundColor: "green",
        width: "80%",
        height: "80%",
        alignSelf: 'center',
        alignItems: "center"
    },
    wrap3: {
        width: "90%",
        height: "80%",
        alignSelf: 'center',
        alignItems: "center",
        justifyContent:"center"
    },
    profileContainer:{
      width:'95%',
      height:100,
      padding:10,
      alignSelf:"center",
      backgroundColor:"white",
      borderRadius:10,
      marginBottom:10,
    //   marginTop:10
      },
      settingPlusUserNameContainer:{
      flexDirection:"row",
    //   backgroundColor:"yellow"
      },
      profileUserName:{
      fontSize: 15,
      marginTop:15,
      marginLeft:30,
      width:250,
    //   backgroundColor:"pink"
      },
      settingIcon:{
      marginTop:10,
      justifyContent:"flex-end",
    //   backgroundColor:"green"
      },
      profileUserDesc: {
      fontSize: 14,
      marginTop:10,
      marginLeft:25,
    //   backgroundColor:"blue"
      },
      bookBackgroundImage:{
        height:"100%",
        resizeMode: "contain",
      },
      bookImage:{
        height:"100%",
        resizeMode: "contain",
      },
      openButton:{
        height:"5%",
        width:"40%",
        backgroundColor:"#D3D6EC",
        borderRadius:5,
        marginRight:"6%" ,
        marginTop:"5%",
        alignItems:"center",
        marginLeft:"50%",
        justifyContent:"center"
    },
    openButtonText:{
        fontSize:14,
    },
})
console.log('.')
AppRegistry.registerComponent('MyPage', () => SwiperComponent)
console.log('..')
const MyBookItem = (props) => {
    const {navigation,item}=props
    const {userinfo}=test1
    // const {item}=test2
    const { width, height } = Dimensions.get('window');
   // console.log('...')
   // console.log (typeof item)
   // console.log("MYBOOKITEM()")
   // console.log('item 확인해야함',item)
    const bookKey=item.bookKey
   // console.log('마이페이지 북키확인',bookKey)
    const url= item.url
    return(
        // <View style={styles.subContainer}>
        <View style={{height:"100%",width:"90%", marginHorizontal: "5%", borderWidth: 1}}>
                <ImageBackground style={{height:"100%", width: "100%", }} source={backgroundimage}>
                    <ImageBackground style={{height:400,width:300,marginTop:"8%",alignSelf:"center"}} source={{uri:book}} > 
                            <Text style={{marginTop:"18%", marginLeft:"27%",  fontSize:14,}}>{item.bookTitle}</Text>
                             <Text style={{marginTop:"10%", marginLeft:"50%",  fontSize:12,}}>{userinfo.iam} </Text> 
                            <TouchableOpacity 
                            style={{ width: width/2, height: width/2, marginTop:"5%",marginLeft:"3%", backgroundColor:"yellow",alignSelf:"center"  }} 
                            onPress={()=>{navigation.navigate('MyBook', {item: item, bookKey:bookKey})}} > 
                                    <Image source={{ url: url }} style={{ flex:1, backgroundColor:"pink" }}/>
                            </TouchableOpacity>
                    </ImageBackground>
                </ImageBackground>
        </View>
    )
}
export default MyPage;