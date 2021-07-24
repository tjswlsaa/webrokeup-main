import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
const ChapterItem = ({navigation, item, chapters, bookName}) => {
    console.log(item);
    console.log("~~~~~~~~~~~~~~~~~~~~~~")
    //console.log("hellooo")
    return (
        <View>
            <TouchableOpacity style={styles.bookIndexOne} onPress={()=>{navigation.navigate('readArticle', {chapters: chapters, bookName: bookName})}}>
                  <Text style={styles.bookIndexOneTitle}>{chapters.chapterTitle}</Text>  
                <Text style={styles.bookIndexOnePunchLine}>"하이라이트 문장 들어가야 됨"</Text>  
                <Text style={styles.bookIndexText}>{chapters.mainText}</Text>
            </TouchableOpacity>
            <View style={{borderBottomColor: "gray" ,borderBottomWidth: 1,}}/>
        </View>
    )
}
const readBook = ({navigation, route}) => {
    const { item } = route.params;
    const intro = Object.values(item.intro);
    const chapters = Object.values(item.chapters);
    const subChapters = Object.values(chapters)
    const aboutImage = "http://ojsfile.ohmynews.com/STD_IMG_FILE/2018/0309/IE002297749_STD.jpg"
    function renderChapterList() {
        //console.log(item.chapter)
        if(subChapters == undefined) {
            return null
        }
        else {
            const list = subChapters.map(chapters => (
                <ChapterItem 
                    navigation={navigation}
                    chapters={chapters}
                    bookName={item.bookTitle}
                />
            ))
            return list;
        }
    }
    return (
    <ScrollView style={styles.container}>
        <View  style={styles.bookCoverContainer}>
            <StatusBar style="white" />
            <Image style={styles.bookCoverImage} source={{uri:item.url}}></Image>
        </View>
        <View  style={styles.bookInfoContainer}>
            <Text style={styles.bookTitle}>{item.bookTitle}</Text>  
            <Text style={styles.bookDesc}>{intro}</Text>  
            <TouchableOpacity style={styles.subButton}>        
                <Text style={styles.subButtonText}>구독하기</Text>
            </TouchableOpacity>   
        </View>
        <View style={styles.bookIndexContainer}>
            { renderChapterList() }
        </View>
    </ScrollView>
    );
}
const styles = StyleSheet.create({ 
    container: {
        //앱의 배경 색
        backgroundColor:"#F5F4F4",
                flex:1
      },
    bookCoverContainer: {
        width:'90%',
        //컨텐츠의 높이 값
        height:220,
        //컨텐츠의 모서리 구부리기
        marginTop:"%",
        //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
        //각 속성의 값들은 공식문서에 고대로~ 나와 있음
        alignSelf:"center"
    },
    bookCoverImage: {
        marginTop:"7%",
        height:"100%",
        width: "40%",
        alignSelf:"center"
    },
    bookInfoContainer: {
        backgroundColor:"#F5F4F4",
        width:'90%',
        //컨텐츠의 높이 값
        height:130,
        //컨텐츠의 모서리 구부리기
        //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
        //각 속성의 값들은 공식문서에 고대로~ 나와 있음
        alignSelf:"center",
    },
    bookTitle: {
        fontSize: 15,
        marginTop: "7%",
        marginLeft:"5%",
        fontSize: 15,
    },
    bookDesc: {
        marginTop: "4%",
        marginLeft:"5%",
    },
    subButton:{
        width:"50%",
            height:27,
            padding:"2%",
            backgroundColor:"#FE8D6F",
            borderRadius:15,
            margin:"2%",
            marginLeft: "0%",
            marginTop: "5%",
            alignSelf:"center",    
    },
    subButtonText: {
        color:"white",
        fontWeight:"200",
        //텍스트의 현재 위치에서의 정렬 
        textAlign:"center"
    },
    bookIndexContainer:{
        backgroundColor: '#fff',
    },
    bookIndexOne: {
        marginTop:"5%",
      marginLeft:"5%",
      marginRight:"3%",
      marginBottom:"5%",
    },
    bookIndexOneTitle: {
        fontSize: 15,
    },
    bookIndexOnePunchLine:{
        fontWeight: '700',
        marginLeft:"5%",
        marginTop:"2%",
    },
    bookIndexText :{
        marginLeft:"5%",
        marginTop:"2%",
    },
})
export default readBook;