import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/Feather';

const MyBook = ({ navigation, route }) => {
    // const { myitem, bookKey } = route.params;
    const { bookKey } = route.params;
    const [myitem, setMyitem] = useState({
        bookKey: '',
        bookTitle: '',
        chapters: {},
        intro:'',
        regdate: '',
        url: '',
        user_uid: '',
    });

  

    // const intro = Object.values(myitem.intro.introArticle)
    // console.log('오류확인', myitem.intro.introArticle)
    // const chapters = Object.values(myitem.chapters)
    // const subChapters = Object.values(chapters);
    const [chapter, setChapter] = useState([]);
    // console.log('북키가문제', bookKey)
    // const chaptersArray = Object.keys(myitem.chapters);
    // const chapterKey = chaptersArray.toString();

    // const isMyitem = (typeof myitem !== 'undefined');

    useEffect(getMyItem, []);
    function getMyItem() {
        //console.log('getMyItem()');
        // bookKey-> myitem
        firebase_db
            .ref(`/book/${bookKey}`)
            .on('value', (snapshot) => {
                const newMyitem = {};
                snapshot.forEach((child) => {
                    const key = child.key;
                    const value = child.val();
                    newMyitem[key] = value; // 우리가 잘 아는 javascript object가 된다!
                });
                setMyitem({
                    ...myitem, // 기본 바탕색
                    ...newMyitem, // 덧칠
                });
            });
    }



    useEffect(getChapters, []);
    function getChapters() {
        firebase_db
            .ref(`book/${bookKey}/chapters/`)
            .on('value', (snapshot) => {
                let temp = [];
                //console.log({'temp.length (.)':temp.length});
                //console.log({'comments.length (.)':comments.length});


                snapshot.forEach((child) => {
                    const item = {
                        ...child.val(), // 구조 분해 할당: 참고: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%EA%B5%AC%EB%AC%B8
                        key: child.key, 

                    };

                    temp.push(item);

                });

                temp.sort(function (a, b) {
                    return new Date(a.regdate) - new Date(b.regdate);
                });
                setChapter(temp);
                //console.log({ temp })
            })
    }







    return (
        <ScrollView style={styles.container}>
            <View style={styles.editSection}>
                <TouchableOpacity style={styles.editButton}>
                    <Icon name="edit" size={25} color="black" style={styles.settingIcon} onPress={() => navigation.navigate("EditBook", { myitem: myitem, bookKey: bookKey })} />
                </TouchableOpacity>


            </View>

            <View style={styles.bookCoverContainer}>
            {/* <Image source={{uri:imageURL ? imageURL : null}}  */}
                <Image style={styles.bookCoverImage} source={{ uri: myitem.url ? myitem.url : null }}></Image>

            </View>
            <View style={styles.bookInfoContainer}>
                <Text style={styles.bookTitle}>{myitem.bookTitle}</Text>

                <TouchableOpacity style={styles.subButton} onPress={() => navigation.navigate("NewPage", { myitem: myitem, chapters: myitem.chapters, chapterKey: Object.keys(myitem.chapters).toString(), bookKey: bookKey })}>
                    <Text style={styles.subButtonText}>새로운 챕터 만들기</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bookIndexContainer}>

                <View>
                    <TouchableOpacity style={styles.bookIndexOne} onPress={() => { navigation.navigate('readIntroArticle', { myitem: myitem, chapters: myitem.chapters, intro: myitem.intro, navigation: navigation, bookKey: bookKey, chapterKey: Object.keys(myitem.chapters).toString() }) }}>
                        <Text style={styles.bookIndexOneTitle} numberOfLines={1}>말머리에서</Text>
                        <Text style={styles.bookIndexText} numberofLines={3}>{myitem.intro}</Text>
                    </TouchableOpacity>
                    <View style={{ borderBottomColor: "gray", borderBottomWidth: 1, }} />
                </View>


                {chapter.map(chapters => {
                    return (
                        <MyChapterItem
                            key = {chapters.key}
                            navigation={navigation}
                            chapters={chapters}
                            chapterTitle={chapters.chapterTitle}
                            bookKey={bookKey}
                            chapterKey={Object.keys(myitem.chapters).toString()}
                            myitem={myitem}
                        />
                    )
                })}
            </View>

        </ScrollView>
    );
}

// const MyChapterItem = (props) => { // javascript의 hoisting을 공부해보자! ..인데 사실 얘는 공부를.. 아 나중의 나중에 해봅시다!
// () => {} : arrow function
// Javascript의 가장 강력하고 가장 큰 특징... 중 하나: 함수 또한 값이다.
function MyChapterItem(props) {
    const { navigation, chapters, chapterTitle, myitem, bookKey, chapterKey } = props;
    return (
        <View>
            <TouchableOpacity style={styles.bookIndexOne} onPress={() => { navigation.navigate('MyArticle', { myitem: myitem, chapters: chapters, navigation: navigation, chapterTitle: chapterTitle, bookKey: bookKey, chapterKey: chapterKey }) }}>
                <Text style={styles.bookIndexOneTitle} numberOfLines={1}>{chapters.chapterTitle}</Text>
                <Text style={styles.bookIndexOnePunchLine} numberofLines={3}>{chapters.mainText}</Text>
                <Text style={styles.bookIndexText}>{chapters.regdate}</Text>
            </TouchableOpacity>
            <View style={{ borderBottomColor: "gray", borderBottomWidth: 1, }} />
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
export default MyBook;