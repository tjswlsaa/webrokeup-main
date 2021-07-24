import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TouchableHighlight} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { firebase_db } from '../../firebaseConfig';
const Main = ({navigation, bookKey, chapterKey}) => {
    const [book, setBook] = useState([]);
    const [newChapter, setNewChapter] = useState([]);
    const [hotChapter, setHotChapter] = useState([]);
    // const [item, setItem] = useState({
    //     chapterKey: '',
    //     chapterTitle: '',
    //     likeCount: '',
    //     likes: {},
    //     mainText: '',
    //     regdate: ''
    // });
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
    useEffect(()=>{
        firebase_db
            .ref(`book`)
            .on('value',(snapshot) =>{
                let hotlist = [];
                // console.log({snapshot});
                // console.log({'typeof snapshot': typeof snapshot});
                // console.log({'snapshot.length': snapshot.length});
                snapshot.forEach((child) => {
                    const book = child.val();
                    const {chapters} = book;
                    console.log({chapters})
                    hotlist = [...hotlist, ...Object.values(chapters)]; // spread를 통한 리스트 병합
                });
                hotlist.sort(function(a,b){
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
                setHotChapter(hotChapter);
                console.log({hotChapter})
        })
    }, [])
    useEffect(()=>{
        firebase_db
            .ref(`book`)
            .on('value',(snapshot) =>{
                let list = [];
                // console.log({snapshot});
                // console.log({'typeof snapshot': typeof snapshot});
                // console.log({'snapshot.length': snapshot.length});
                snapshot.forEach((child) => {
                    const book = child.val();
                    const {chapters} = book;
                    // console.log({chapters});
                    // const list = Object.values(chapters); // Object.values()를 해야, Object-> List로 변환할 수 있다.
                    // console.log({list});
                    list = [...list, ...Object.values(chapters)]; // spread를 통한 리스트 병합
                });
                list.sort(function(a, b) {
                    // console.log({'a.regdate': a.regdate});
                    // console.log({'b.regdate': b.regdate});
                    // const aRegDate = new Date(a.regdate);
                    // const bRegDate = new Date(b.regdate);
                    // const sub = bRegDate - aRegDate;
                    // console.log({aRegDate, bRegDate, sub, });
                    // return sub;
                    return new Date(b.regdate) - new Date(a.regdate);
                })
                const newChapter = [];
                if (list.length >= 1) {
                    newChapter.push(list[0]);
                }
                if (list.length >= 2) {
                    newChapter.push(list[1]);
                }
                setNewChapter(newChapter);
        })
    }, [])
return (
<ScrollView style={styles.container}>
    <StatusBar style="white" />
    <View  style={styles.subContainer}>
        <TouchableOpacity style={StyleSheet.tag} onPress={()=>{navigation.navigate('PopularBook')}}>
             <Text style={styles.tagText}>인기 이별북 </Text>
        </TouchableOpacity>
        <ScrollView style={styles.cardContainer} horizontal = {true}>
            {book.map(item => (
                <BookItem
                    navigation={navigation}
                    item={item}
                    bookKey={item.bookKey}
                />
                // <Text>{item.bookTitle}</Text>
            ))}
        {/* <Text>-_-?</Text> */}
        {/* <Text>book.length: {book.length}</Text> */}
        </ScrollView> 
    </View>
    <View style={{borderBottomColor: "gray" ,borderBottomWidth: 1,}}/>
        <View style={styles.likeContainer}>
            <TouchableOpacity style={StyleSheet.tag} onPress={()=>{navigation.navigate('PopularArticle')}}>
                <Text style={styles.tagText}>인기 이별록 </Text>
            </TouchableOpacity>
                <View>
                    {hotChapter.map(item => (
                        <ChapterItem
                            navigation = {navigation}
                            chapteritem = {item}
                            chapterKey = {item.chapterKey}
                        />
                        // <Text>{item.chTitle}</Text>
                    ))}
                    {/* <Text>-_-?</Text>
                    <Text>chapter.length: {chapter.length}</Text> */}
                </View>
        </View>
    <View style={{borderBottomColor: "gray" ,borderBottomWidth: 1,}}/>
    <View style={styles.recentContainer}>
        <TouchableOpacity style={StyleSheet.tag} onPress={()=>{navigation.navigate('NewArticle')}}>
             <Text style={styles.tagText}>최신 이별록 </Text>
        </TouchableOpacity>
            <View>
                    {newChapter.map(item => (
                        <ChapterItem
                            navigation = {navigation}
                            chapteritem = {item}
                            chapterKey = {item.chapterKey}
                        />
                        // <Text>{item.chTitle}</Text>
                    ))}
                    {/* <Text>-_-?</Text>
                    <Text>chapter.length: {chapter.length}</Text> */}
                </View>
    </View>
</ScrollView>
)}
// sub components
const BookItem = ({navigation, item, bookKey}) => {
    // console.log(item);
    console.log("bookitem running")
    return (
        <TouchableHighlight onPress={()=>{navigation.navigate('readBook', {item: item, bookKey: bookKey})}}>
            <View>
                <Text>{item.bookTitle}</Text> 
                <Image style={styles.bookButtonImage} source={{uri:item.url}} />
            </View>
        </TouchableHighlight>
    )
}
const ChapterItem = ({navigation, chapteritem, chapterKey}) => {
    console.log({chapteritem});
    return(
    // console.log("chapteritem running"),
    <TouchableOpacity style={styles.chOne} onPress={()=>{navigation.navigate('readArticle', {chapteritem: chapteritem, chapterKey: chapterKey})}}>
            <Text style={styles.chTitle} numberOfLines = {1}>{chapteritem.chapterTitle}</Text>  
            <Text style={styles.chOnePunchLine} numberOfLines = {3}>{chapteritem.mainText}</Text>  
            <Text style={styles.chWriter}> 작가 이름 </Text>
            <View style={{borderBottomColor: "#D3D3D3" ,borderBottomWidth: 1}}/>  
    </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container : {
        backgroundColor: '#fff',
    },
    subContainer: {
        height:300,
    },
    recentContainer:{
        height:300,
    },
    likeContainer:{
        height:300,
    },
    tag:{
        height:"20%"
    },
    tagText:{
        fontSize: 17,
        fontWeight: "600",
        marginTop: "5%",
        marginLeft:"5%"
    },
    cardContainer:{
        marginTop: "3%",
        width: "100%",
        height: "25%",
        backgroundColor: '#fff',
    },
    subBook01:{
        backgroundColor: "grey",
        width: 150,
        height: "90%",
        marginRight:5,
        marginLeft:16,
    },
bookButtonImage: {
    backgroundColor: "grey",
    width: 150,
    height: "90%",
    marginRight:5,
    marginLeft:16,
},
    chOne: {
        marginTop:"5%",
      marginLeft:"5%",
      marginRight:"3%",
      marginBottom:"5%",
    },
    chTitle: {
        fontSize: 15,
    },
    chOnePunchLine:{
        fontWeight: '700',
        marginLeft:"5%",
        marginTop:"2%",
    },
    chWriter :{
        marginLeft:"5%",
        marginTop:"2%",
    },
})
export default Main;