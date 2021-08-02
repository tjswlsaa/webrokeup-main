import React, {Children, useEffect, useState} from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Dimensions, SafeAreaView, TouchableOpacity,ImageBackground, ScrollView, TouchableHighlight, Platform, ImageStore} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { firebase_db } from '../../firebaseConfig';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase/app'
import Swiper from 'react-native-swiper'
const book ="https://postfiles.pstatic.net/MjAyMTA2MDdfMTk0/MDAxNjIzMDY3OTkzMTYz.Uyg7r1zEBbPKA-CfVHU0R5ojbmozb02GJzMRapgcP1cg.flIv0UKSYHpE_CHNSOi2huGzv3svilsmEmMFy1G9zH0g.PNG.asj0611/book.png?type=w773"
const bookBackground = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTE1/MDAxNjIzMDY2NDQwOTUx.N4v5uCLTMbsT_2K1wPR0sBPZRX3AoDXjBCUKFKkiC0gg.BXjLzL7CoF2W39CT8NaYTRvMCD2feaVCy_2EWOTkMZsg.PNG.asj0611/bookBackground.png?type=w773"
const bookSet ="https://postfiles.pstatic.net/MjAyMTA3MTJfMjQg/MDAxNjI2MDY4NzI5MzEw.3F5MOf0QbadAe51QtjxPYbLgqUKeOKxNogrpt7e-pIMg.Fr9zSwSUjAohp8ZNnJ7NOcrPw9FjFS4BDpBUH9wcg6Ug.PNG.asj0611/bookCover_(1).png?type=w773"
import backgroundimage from '../../assets/backgroundimage.png';


const test1 ={ 
    userinfo:''
}
const test2= {
    myitem:""
}

const MyPage = ({navigation, route}) => {
    const [myBook, setMyBook] = useState([]);
    const [userinfo, setUserinfo] = useState([]);
    test1.userinfo=userinfo
    const { width, height } = Dimensions.get('window');
    var user = firebase.auth().currentUser;
    var  user_uid
    if (user != null) {
      user_uid = user.uid;  
    }
    var userID=user_uid.substring(0,6)
        console.log (userID)


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
                    const myitem={
                    ...child.val(), 
                    key: child.key, 
                }
                temp.push(myitem)
            })
            temp.sort(function (a, b) {
                return new Date(a.regdate) - new Date(b.regdate);
            })
                setMyBook(temp);
                //console.log('mypage data',data)
            })
    }, []) // 구 리엑트: componentDidMount에 해당함 -> 컴포넌트가 마운트 되었다면 -> 컴포넌트가 프로그래밍적으로, 변수틱하게, 생성되어서 처음으로 웹브라우저에 입성하는 순간 -> 처음으로 보일 때마다
    // 그럴 때마다.. 이 부분이 최초 단 한 번 만 딱 한 번 만 실행됩니다.
    //console.log('myBook',myBook)

 const myBookFiltered= myBook.filter(filteredMyBook => filteredMyBook.user_uid == user_uid)
//  console.log('myBookFiltered',myBookFiltered)
console.log('whatiswrong',myBookFiltered)

console.log('키값확인',myBookFiltered.length)
const [swiper, setSwiper] = useState(null);
// const slideTo = (index) => swiper.slideTo(index);
return (
    <SafeAreaView style={{flex:1}}>

    <View style={{}}>
        <View style={{height:40,alignItems:"center",justifyContent:"center"}}>
            <Text style={{fontSize:15, fontWeight:"500"}}>나의 이별록</Text>
        </View>
        <View style={styles.profileContainer}>
            <View style={styles.settingPlusUserNameContainer}>
                <Text style={styles.profileUserName}>{userinfo.iam}</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('Account')}}>
                    <Icon name="settings-outline" size={25} color="black" style={styles.settingIcon}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.profileUserDesc}> {userinfo.selfLetter}</Text>
        </View>


            <View style={{width:"95%",alignSelf:"center", marginBottom:10}}>

                {myBookFiltered.length == 0 ? (

                     <ImageBackground style={{height:250,resizeMode:"cover" }}  source={require('../../assets/backgroundimage.png')}>
                        <TouchableOpacity style= {{  justifyContent:"center", alignItems:"center", marginTop:"55%" }} onPress={()=>{navigation.navigate("MakeNewBook")}}>
                            <Text style={{fontSize:15}}>새로운 책을 만들어주세요</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                    
                    ) :  (

                        <View style={{height:"100%", resizeMode:"cover" }} 
                        // source={{uri:bookBackground}}
                        source={require('../../assets/backgroundimage.png')}
                        >

                            <TouchableOpacity style={styles.openButton} onPress={()=>{navigation.navigate("MakeNewBook")}}>
                                    <Text style={styles.openButtonText}>새로운 책 만들기</Text>
                            </TouchableOpacity>

                            <Swiper 
                            index={myBook.bookKey}
                            loop={false}
                            showsPagination={true}
                            onSwiper={setSwiper} 
                            style={styles.wrapper} showsButtons={true}
                            
        
                            dot={<View style={{           // unchecked dot style
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                width: 10,
                                height: 10,
                                borderRadius: 4,
                                marginLeft: 10,
                                marginRight: 9,
                            }}/>}
                            activeDot={<View style={{    // selected dots style
                                backgroundColor: '#83ffcf',
                                width: 10,
                                height: 10,
                                borderRadius: 4,
                                marginLeft: 10,
                                marginRight: 9,
                            }}/>}
                            
                            >
                        
                                    {myBookFiltered.map(myitem => {
                                        test2.myitem=myitem
                                        console.log('myitem여기서부터문제인가',myitem)
                                    return (
                                        <MyBookItem
                                        key = {myitem.key}
                                        myitem={myitem}
                                        url={myitem.url}
                                        bookTitle={myitem.bookTitle}
                                        navigation = {navigation}
                                        userID={userID}
                                    />
                                            )
                                        })}
                            </Swiper>
                        </View>
                    )

                    }
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
        backgroundColor:"#C4C4C4",
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

    const {navigation,myitem}=props
    const {userinfo}=test1
    // const {myitem}=test2
    const { width, height } = Dimensions.get('window');
    console.log('...')
    console.log (typeof myitem)
    console.log("MYBOOKITEM()")
    console.log('myitem 확인해야함',myitem)
    const bookKey=myitem.bookKey
    console.log('마이페이지 북키확인',bookKey)
    const url= myitem.url
    return(
        // <View style={styles.subContainer}>
        <View style={{height:500,width:400,alignSelf:"center",}}>
                    {/* <ImageBackground style={{height:200}} source={{uri:book}}> */}

                    <ImageBackground style={{height:400,width:300,marginTop:"8%",alignSelf:"center"}} source={{uri:book}} > 
                            <Text style={{marginTop:"18%", marginLeft:"27%",  fontSize:14,}}>{myitem.bookTitle}</Text>
                             <Text style={{marginTop:"10%", marginLeft:"50%",  fontSize:12,}}>{userinfo.iam} </Text> 
                            <TouchableOpacity 
                            style={{ width: width/2, height: width/2, marginTop:"5%",marginLeft:"3%", backgroundColor:"yellow",alignSelf:"center"  }} 
                            onPress={()=>{navigation.navigate('MyBook', {myitem: myitem, bookKey:bookKey})}} > 
                                    <Image source={{ url: url }} style={{ flex:1, backgroundColor:"pink" }}/>
                            </TouchableOpacity>
                    </ImageBackground>
                    {/* </ImageBackground> */}
        </View>
    )
}
export default MyPage;