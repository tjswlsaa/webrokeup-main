import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions ,Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';


const communityBoard = ({ navigation, route }) => {

    const [posts, setPosts] =useState([])

    const [availableDeviceWidth, setAvailableDivceWidth] = useState(
        Dimensions.get('window').width
    );
    const [availableDeviceHeight, setAvailableDivceHeight] = useState(
        Dimensions.get('window').height
    );

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDivceWidth(Dimensions.get('window').width);
            setAvailableDivceHeight(Dimensions.get('window').height);
        };
     
        Dimensions.addEventListener('change', updateLayout);
     
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });
  
   // console.log('availableDeviceWidth',availableDeviceWidth)
   // console.log('availableDeviceHeight',availableDeviceHeight)

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

    // console.log('이거떠야map',posts)

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{height:40, justifyContent:"center"}}>
                <Text  style={{alignSelf:"center", fontSize:15, fontWeight:"500"}}>게시판</Text>
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
                
                <View>

                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("Practice")}
                    style={{height:50, backgroundColor:"blue", justifyContent:"center"}}>
                        <Text style={{alignSelf:"center", fontSize:15}}>글쓰기</Text>
                    </TouchableOpacity>

                </View>


        </SafeAreaView>
    )
}


const PostItem=(props)=> {

    var user = firebase.auth().currentUser;
    var  user_uid
    
    if (user != null) {
    
      user_uid = user.uid;  
    }
  
    const [userinfo, setUserinfo]=useState("")
    useEffect(()=>{
        firebase_db.ref(`users/${post.creator}`)
            .on('value', (snapshot) => {
                let userinfo = snapshot.val();
                setUserinfo(userinfo);
            })
    }, []);
  
    const {post, navigation}=props;
    const postKey=post.key

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


    // const likeCount = Object.values(post.likeCount.likeCount)
   // console.log('이거되면탈출!!!11',post)

   // console.log('이거되면탈출',likeCount)


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
            <TouchableOpacity style={styles.bookIndexOne} onPress={() => { navigation.navigate('readPost', { postKey:post.key, navigation: navigation}) }}>
                <View style={{}}>
                <Text style={styles.bookIndexOnePunchLine} numberOfLines={3}>{post.text}</Text>
                </View>
                <View style={{flexDirection:"row",alignContent:"center",marginTop:10}}>
                <Text style={styles.bookIndexText}>{userinfo.iam}</Text>
                <Icon name="like2" size={18} color="black" style={{marginLeft:20,marginTop:3}}/>
                <Text style={styles.bookIndexText}>{likeCount}</Text>
                <Icon name="message1" size={20} color="black" style={{marginLeft:20,marginTop:3}}/>

                <Text style={styles.bookIndexText}>{commentsNumber}</Text>

                
                <Text style={styles.bookIndexText}>{displayedAt(createdAt)}</Text>
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