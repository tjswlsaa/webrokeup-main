import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions ,Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';
import Clover from 'react-native-vector-icons/MaterialCommunityIcons';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';

const communityBoard = ({ navigation, route }) => {

    const [posts, setPosts] =useState([])
    
    const headerHeight = useHeaderHeight();
    const ScreenHeight = Dimensions.get('window').height   //height
    const BottomSpace = getBottomSpace()
    const tabBarHeight = 0
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight - headerHeight - BottomSpace - tabBarHeight;
    const ScreenWidth = Dimensions.get('window').width  //screen 너비
     

      useEffect(() => {
        firebase_db
            .ref('post/')
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
                setPosts(temp);
                //console.log('mypage data',data)
            })
    }, []) 


    return (
        <SafeAreaView style={{flex:1}}>
               <View style={{height: realScreen*0.08, alignItems:"center", borderBottomColor: "#D9D9D9", borderBottomWidth:0.5, justifyContent:"center", backgroundColor: "white", }}>
                <Text style={{fontSize:17, fontWeight:"700", marginTop: "2%", color: "#21381c"}}>커뮤니티</Text>
            </View>
                <ScrollView style={{height:500}}>

                        {posts.map(item => {
                            return (
                                <PostItem
                                    navigation={navigation}
                                    key = {item.key}
                                    post={item}
                                />
                            )
                        })}
                </ScrollView>
                
                <View style={{}}>

                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("communityMakeNewPost")}
                    style={{height:50,width:"98%", alignSelf:"center", backgroundColor:"#44705E", justifyContent:"center", borderRadius:"10%",}}>
                        <Text style={{alignSelf:"center", fontSize:15}}>글쓰기</Text>
                    </TouchableOpacity>

                </View>


        </SafeAreaView>
    )
}


const PostItem=(props)=> {

    const {post, navigation}=props;
    const postKey=post.key
  
    const [PostItemUserinfo, setPostItemUserinfo]=useState({});

    useEffect(()=>{
        firebase_db.ref(`users/${post.creator}`)
            .on('value', (snapshot) => {
                let PostItemUserinfo = snapshot.val();
                if (PostItemUserinfo > '') {
                    setPostItemUserinfo(PostItemUserinfo);
                }
            })
    }, []);
  


    const likeRef = firebase_db.ref(`post/${postKey}/` + '/likes/');

    const [likeCount, setLikeCount] = useState(0);
    const [likedUsers, setLikedUsers] = useState([]);

    useEffect (()=>{
        // let temp = [];
        let arr = likeRef
        .on('value', (snapshot) => {
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
    }, [])
    const [commentsNumber, setCommentsNumber] = useState(0);
    useEffect (()=>{
        let arr = firebase_db.ref(`post/${postKey}/` + '/comments/')
        .on('value', (snapshot) => {
           var commentsNumber = snapshot.numChildren();
           setCommentsNumber(commentsNumber)
        })
    }, [])




    const createdAt= new Date(post.regdate) //createdAt Mon Jul 05 2021 20:00:26 GMT+0900 (KST) number()함수못쓰나
    ////console.log('comment.regdate',comment.regdate)
    ////console.log('createdAt',createdAt)
  
    const displayedAt=(createdAt)=>{
     
        const milliSeconds = new Date()- createdAt
        ////console.log('milliSeconds',milliSeconds)
        ////console.log('new Date()',new Date()) //new Date() 2021-07-05T11:15:46.130Z
        const seconds = milliSeconds / 1000
        if (seconds < 60) return `방금 전`
        const minutes = seconds / 60
        if (minutes < 60) return `${Math.floor(minutes)}분 전`
        const hours = minutes / 60
        if (hours < 24) return `${Math.floor(hours)}시간 전`
        const days = hours / 24
        if (days < 7) return `${Math.floor(days)}일 전`
        const weeks = days / 7
        if (weeks < 5) return `${Math.floor(weeks)}주 전`
        const months = days / 30
        if (months < 12) return `${Math.floor(months)}개월 전`
        const years = days / 365
        return `${Math.floor(years)}년 전`
      }
    return (
        <View style={{backgroundColor:"white", marginTop:10,borderRadius:10, marginLeft:10, marginRight:10}}>
            <TouchableOpacity style={styles.bookIndexOne} onPress={() => { navigation.navigate('readPost', { postKey:post.key, navigation: navigation, postcreator:post.creator}) }}>
                <View style={{}}>
                <Text style={styles.bookIndexOnePunchLine} numberOfLines={3}>{post.text}</Text>
                </View>
                <View style={{flexDirection:"row",alignContent:"center",marginTop:10}}>
                <Text style={{ marginLeft: "5%",marginTop: "2%", color:"grey", fontSize:11}}>{PostItemUserinfo.iam}</Text>
                <Clover name="clover" size={13} color="green" style={{marginLeft:20,marginTop:7}}/>
                <Text style={{marginLeft: "3%",marginTop: "2%", color:"black", fontSize:11}}>{likeCount}</Text>
                <Icon name="message1" size={13} color="black" style={{marginLeft:20,marginTop:7}}/>

                <Text style={{marginLeft: "3%",marginTop: "2%", color:"black", fontSize:11}}>{commentsNumber}</Text>

                
                <Text style={{marginLeft: "15%",marginTop: "2%", color:"grey", fontSize:11}}>{displayedAt(createdAt)}</Text>
                </View>
            </TouchableOpacity>
            {/* <View style={{ borderBottomColor: "gray", borderBottomWidth: 1, }} /> */}
            <View style={{flexDirection:"row"}}>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F4F4",
        flex: 1
    },
    bookCoverContainer: {
        width: 200,
        height: 200,
        marginTop: "0%",
        alignSelf: "center",
        flexDirection: "row",


    },
    bookCoverImage: {
        marginTop: "7%",
        height: 200,
        width: 200,
        alignSelf: "center",
        resizeMode: "contain",
        backgroundColor: "pink"
    },
    bookInfoContainer: {
        backgroundColor: "#F5F4F4",
        width: '90%',
        height: 100,
        alignSelf: "center",

    },
    bookTitle: {
        fontSize: 15,
        marginTop: "7%",
        fontSize: 15,
        alignSelf: "center"
    },
    bookDesc: {
        marginTop: "4%",
        marginLeft: "10%",
    },
    subButton: {
        width: "50%",
        height: 27,
        padding: "2%",
        backgroundColor: "#C4C4C4",
        borderRadius: 15,
        margin: "2%",
        marginLeft: "0%",
        marginTop: "5%",
        alignSelf: "center",
    },
    subButtonText: {
        color: "white",
        fontWeight: "200",
        //텍스트의 현재 위치에서의 정렬 
        textAlign: "center"
    },
    bookIndexContainer: {
        backgroundColor: '#fff',
    },
    bookIndexOne: {
        marginTop: "5%",
        marginLeft: "5%",
        marginRight: "3%",
        marginBottom: "5%"
    },
    bookIndexOneTitle: {
        fontSize: 15,
    },
    bookIndexOnePunchLine: {
        fontWeight: '700',
        marginLeft: "5%",
        marginTop: "2%",
    },
    bookIndexText: {
        marginLeft: "5%",
        marginTop: "2%",
    },
    editButton: {
        // backgroundColor:"yellow",
        marginLeft: "80%",
        justifyContent: "center",
        marginTop: 15


    },
    deleteButton: {
        marginLeft: "7%",
        backgroundColor: "blue",
        justifyContent: "center"

    },
    editSection: {
        height: 40,
        // backgroundColor:"green",
        flexDirection: "row",

    },
    editButtonText: {
    }
})
export default communityBoard;