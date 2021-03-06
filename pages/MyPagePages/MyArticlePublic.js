import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView, Button, Touchable, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { firebase_db } from '../../firebaseConfig';
import firebase from 'firebase/app'
import { StatusBar } from 'expo-status-bar';
import { MakeNewBook } from './MakeNewBook';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { render } from 'react-dom';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Clover from 'react-native-vector-icons/MaterialCommunityIcons';
import Left from 'react-native-vector-icons/Feather'
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';
import Swiper from 'react-native-swiper'
// import paper from '../../assets/paper.png';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

// const bookBackground = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTE1/MDAxNjIzMDY2NDQwOTUx.N4v5uCLTMbsT_2K1wPR0sBPZRX3AoDXjBCUKFKkiC0gg.BXjLzL7CoF2W39CT8NaYTRvMCD2feaVCy_2EWOTkMZsg.PNG.asj0611/bookBackground.png?type=w773"

console.log("myarticle")
const test1 = {
    bookKey: ''
};

const test3 = {
    navigation: ''
}

const test4 = {
    item: ''
}
const test5 = {
    userinfo: ''
}


const MyArticlePublic = ({ navigation, route }) => {
    test3.navigation = navigation

    // const {myitem, chapters, chapterTitle} = route.params;
    const { bookKey, chapterKey, list  } = route.params;
    test1.bookKey = bookKey

    const [swiper, setSwiper] = useState(null);




    const user = firebase.auth().currentUser;
    var user_uid
    if (user != null) { user_uid = user.uid }
    test4.user_uid=user_uid



    const ScreenHeight = Dimensions.get('window').height   //height
    const ScreenWidth = Dimensions.get('window').width   //height

    const headerHeight = useHeaderHeight();
    const BottomSpace = getBottomSpace()
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight-headerHeight-BottomSpace

  

    const [index, setIndex] = useState(0);
    useEffect(() => {
        setIndex(route.params.index);
    }, [index]);

// ??? ???????????? ???



    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar style="white"/>
                <View style={{marginHorizontal:"5%",}}> 


                    <View style={{ height: realScreen*0.9,alignSelf: "center", backgroundColor:"white" , justifyContent:"center", marginVertical:"10%"}}>

                                <View>

                                    
                                    <View style={{ height: realScreen}}>
                                            

                                                    <Swiper
                                                        // index={myBook.bookKey}
                                                        loop={false}
                                                        index={index}
                                                        showsPagination={false}
                                                        onSwiper={setSwiper}
                                                        showsButtons={true}
                                                        nextButton={<Text style={{        color: "#f5f5f5",
                                                        fontSize: 40,}}>???</Text>}
                                                        prevButton={<Text style={{        color: "#f5f5f5",
                                                        fontSize: 40,        transform: [{rotate:"180deg"}],
                                                    }}>???</Text>}
                                                       
                                                    >
                                                    
                                                        {list.map(item => {
                                                            test4.item=item
                                                            return (
                                                            <View>

                                                                <ChapterItem 
                                                                navigation={navigation}
                                                                item={item}
                                                                />
                                                            
                                                                
                                                            </View>
                                                            )
                                                        })}

                                          

                                                    </Swiper>
                                        </View>
                                        

                            </View>




                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

function ChapterItem(props) {



    const { navigation, item, bookKey, chapterKey, } = props;
    const user = firebase.auth().currentUser;
    var user_uid
    if (user != null) { user_uid = user.uid }
    const [likeCount, setLikeCount] = useState(0);
    const [likedUsers, setLikedUsers] = useState([]);
    const [commentsNumber, setCommentsNumber] = useState(0);
    const [cloverColor, setCloverColor] = useState("#c1c1c1")
    const likeRef = firebase_db.ref(`book/${item.bookKey}/both/` + item.chapterKey + '/likes/');

    const ScreenHeight = Dimensions.get('window').height   //height
    const ScreenWidth = Dimensions.get('window').width   //height

    const headerHeight = useHeaderHeight();
    const BottomSpace = getBottomSpace()
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight-headerHeight-BottomSpace

    const [userinfo, setUserinfo] = useState({});
    test5.userinfo=userinfo
    useEffect(() => {
        firebase_db.ref(`users/${item.creator}/`)
            .on('value', (snapshot) => {
                let userinfo = snapshot.val();
                if (userinfo > '') {
                    setUserinfo(userinfo);
                }
            })
    }, []);

    
    console.log("itemmyarticle",item)
    useEffect(() => {
        // let temp = [];
        let arr = likeRef.on('value', (snapshot) => {
            let temp = [];
            var likeCount = snapshot.numChildren();
            // console.log('useEffect()');
            // console.log({likeCount});
            setLikeCount(likeCount)
            //// console.log(likeCount)
            snapshot.forEach((child) => {
                temp.push(child.val());
            })
            // console.log({temp});
            setLikedUsers(temp);
        })

    }, [item])
    console.log("likeCount",likeCount)

    console.log("likedUserslikedUsers",likedUsers)

    useEffect(() => {
        //// console.log('MyArticle.js (2), chapters: ',chapters);
        // let arr = firebase_db.ref(`book/${bookKey}/chapters/` + chapters.chapterKey + '/comments/')
        let arr = firebase_db.ref(`book/${item.bookKey}/both/` + item.chapterKey + '/comments/')
            .on('value', (snapshot) => {
                var commentsNumber = snapshot.numChildren();
                setCommentsNumber(commentsNumber)
            })
    }, [item])

    console.log("commentsNumber",commentsNumber)

    useEffect(()=>{
        let meliked = likedUsers.filter(likedppl => likedppl.user_uid == user_uid)
        if (meliked == '') {
            // console.log("likedUsers: " + likedUsers)
            setCloverColor("#c1c1c1")
        } else {
            // console.log("likedUsers: " + likedUsers)
            setCloverColor("green")
        }
    }, [likedUsers])

    const alert = async ()=> {

        const alertfunction=()=>{
          firebase_db
          .ref(`alert/${item.chapterKey}/`)
          .set({
            user_uid: user_uid,
            regdate: new Date().toString(),
            chapterKey:item.chapterKey
          })
          .then(function(){
              Alert.alert("?????? ??????")
         })}
         Alert.alert(
          '??????',
          '?????? ???????????????????',
          [
      
            {
              text: '??????',
              // onPress: () => console.log('?????????????????????'),
              style: 'cancel',
            },
            {text: '??????', onPress: () => alertfunction()},
      
          ],
          {cancelable: false},
        );
      
      }

    return (
    <View style={{height:realScreen*0.9}}>

        <View style={{ height: "95%", width: "85%", alignSelf: "center" }} 
        // onPress={() => { navigation.navigate("MyBook", { item: item, bookKey: item.bookKey, navigation: navigation }) }}
        >
            <TouchableOpacity style={{width:"20%", marginLeft:ScreenWidth*0.65, marginTop:realScreen*0.06}}>
                <Icon2.Button name='book-outline' size={23}
                        backgroundColor= 'white' color="black" 
                        onPress={() => navigation.navigate("MyBookPublic", {bookKey: item.bookKey, userinfo:userinfo })}        
                        >
                    </Icon2.Button>
                    </TouchableOpacity>
            <View style={{ flexDirection:"row",alignItems:"center",}}>
                <View style={{backgroundColor:item.chColor, flex:1, height:realScreen*0.05}}></View>
                <View style={{height:realScreen*0.1, flex:25,}}>
                <Text style={{fontSize: 18, fontWeight:"500",  marginLeft:"2%", marginTop:"7.5%"}}>{item.chapterTitle}</Text>
                </View>
            </View>
                <ScrollView style={{marginTop:"2%", height:realScreen*0.7}}>
                {item.type== "?????? ??????"? (

                <Text style={{fontSize: 15, marginLeft:"6%", lineHeight:23, marginRight:"3%"}}>{item.mainText}</Text>
                ) :(

                            <View>
                                                <View style={{ marginBottom:realScreen*0.03,marginLeft:"6%"}}>
                                                <Text style={{fontSize: 16, fontWeight:"600",}}>{item.Q1}</Text>
                                                <Text style={{fontSize: 15, marginVertical:"5%",lineHeight:23}}>{item.mainText}</Text>
                                                </View>
                                                <View style={{ marginBottom:realScreen*0.03,marginLeft:"6%"}}>
                                                <Text style={{fontSize: 16, fontWeight:"600",}}>{item.Q2}</Text>
                                                <Text style={{fontSize: 15, marginVertical:"5%",lineHeight:23}}>{item.text3}</Text>
                                                </View>
                                                <View style={{ marginBottom:realScreen*0.03,marginLeft:"6%"}}>
                                                <Text style={{fontSize: 16, fontWeight:"600",}}>{item.Q3}</Text>
                                                <Text style={{fontSize: 15,  marginVertical:"5%",lineHeight:23}}>{item.text4}</Text>
                                                </View>
                            </View>
                )}
                </ScrollView>
        </View>
        <View style={{ flexDirection: "row", height: realScreen*0.08, backgroundColor:"white" , marginHorizontal:"8%",  }}>
       
            <TouchableOpacity style={{marginTop:"7%", marginLeft:"3%"}} onPress={async () => {
                // console.log('MyArticle.likeButton.onPress()');
                // console.log({likedUsers});
                // let meliked = likedUsers.filter(likedppl => likedppl.user_uid = user_uid)
                let meliked = likedUsers.filter(likedppl => likedppl.user_uid == user_uid)
                const isMeliked = (meliked > '');
                const isMeliked2 = ((meliked == '') == false);
                // console.log("likedUsers: " +likedUsers)
                // console.log("meliked: " + meliked)
                // console.log({isMeliked,isMeliked2});
                let likeCount = 0;
                // ????????? ?????? likeCount?????? state??? ????????? ???????????? ?????????.. 
                // ???? ?????????????????? let likeCount?????? ????????? ????????? ??? ????????? ???????????? ????????????
                if (meliked == '') {
                    await likeRef.child(user_uid).set({
                        user_uid: user_uid,
                        regdate: new Date().toString(),
                    });
                    // likeReload();
                    likeRef.on('value', (snapshot) => {
                        //  var likeCount = snapshot.numChildren();
                        likeCount = snapshot.numChildren();
                        setLikeCount(likeCount)
                    })
                    await setCloverColor("green")
                } else {
                    // console.log ("????????? ??????")
                    // likeRef.child(user_uid).set(null)
                    await likeRef.child(user_uid).remove();
                    // likeReload();
                    likeRef.on('value', (snapshot) => {
                        //  var likeCount = snapshot.numChildren();
                        likeCount = snapshot.numChildren();
                        setLikeCount(likeCount)
                    })
                    await setCloverColor("#C1C1C1")
                }
                firebase_db.ref(`book/${item.bookKey}/both/` + item.chapterKey).child("likeCount").set(likeCount)
            }}>
                <Clover name="clover" size={18} color={cloverColor} style={styles.addIcon} />
            </TouchableOpacity>
            <Text style={{ marginLeft: "2%",marginTop:"8%", fontSize: 11, }}> {likeCount} </Text>
            <TouchableOpacity
                onPress={() => { navigation.navigate('Comment', { navigation: navigation, bookKey: item.bookKey, chapterKey: item.chapterKey }) }}
                style={{marginTop:"7%", marginLeft:"4%", fontSize: 11, }}
            >
                <Icon name="message1" size={20} color="grey" style={{}} />
            </TouchableOpacity>
            <Text style={{ marginLeft: "2%",marginTop:"8%",  fontSize: 11, }}> {commentsNumber} </Text>
            <TouchableOpacity style={{marginLeft:"3%",  width:50, height:25,marginTop:"7%",flexDirection:"row" }} onPress={()=>alert()}>                        
                <Icon3 name="alarm-light-outline" size={18} color="grey" style={{}} />
                <Text style={{marginLeft:"7%", marginTop:"7%",color:"grey", fontSize: 11,}}>??????</Text>

                </TouchableOpacity>

            <View style={{ flexDirection:"column", marginTop: "8%", marginLeft:"10%" }}>
                <Text style={{ fontSize: 11,}}>{item.Kregdate}</Text>
            </View>
        </View>
        </View>


    )
}
const styles = StyleSheet.create({
    container: {
        //?????? ?????? ???
        backgroundColor: "#F5F4F4",
        flex: 1
    },
    upperButtonContainer: {
        flexDirection: "row",
        alignSelf: "flex-end",
        marginTop: 30,
        marginRight: 15,
    },
    editButton: {
        height: 20,
        width: 60,
        justifyContent: "center",
        backgroundColor: "#C4C4C4",
        alignItems: "center",
        borderRadius: 5
    },
    deleteButton: {
        marginLeft: 20,
        height: 20,
        width: 60,
        justifyContent: "center",
        backgroundColor: "#C4C4C4",
        alignItems: "center",
        borderRadius: 5
    },
    textContainer: {
        height: "50%"
    },
    bookTitle: {
        fontSize: 20,
        marginLeft: 60,
        marginTop: 80,
        marginRight: 60,

    },
    bookText: {
        marginTop: 50,
        marginLeft: 60,
        marginRight: 60,
    },
    regdate: {
        marginLeft: "10%"
    },
    bottomButtonContainer: {
        flex: 1,
        flexDirection: "row",
        marginTop: 10,
        marginRight: "10%",
        backgroundColor: "pink"
    },
    commentButton: {
        marginLeft: "7%"
    },
    likeButton: {
    }
});



export default MyArticlePublic