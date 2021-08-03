import React, {useEffect,useState,useRef} from 'react';
import {ImageBackground, StyleSheet, Button,Text, View, Image, Switch,Alert, TouchableOpacity, ScrollView, TouchableHighlight, TextInput, Route} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {firebase_db} from '../../firebaseConfig';
//import * as firebase from 'firebase/app';
//import Constants from 'expo-constants'
//import { add, Value } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import {KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase'
require("firebase/firestore")
require("firebase/firebase-storage")
// import SwitchToggle from 'react-native-switch-toggle';
const book ="https://postfiles.pstatic.net/MjAyMTA2MDdfMTk0/MDAxNjIzMDY3OTkzMTYz.Uyg7r1zEBbPKA-CfVHU0R5ojbmozb02GJzMRapgcP1cg.flIv0UKSYHpE_CHNSOi2huGzv3svilsmEmMFy1G9zH0g.PNG.asj0611/book.png?type=w773"
const bookBackground = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTE1/MDAxNjIzMDY2NDQwOTUx.N4v5uCLTMbsT_2K1wPR0sBPZRX3AoDXjBCUKFKkiC0gg.BXjLzL7CoF2W39CT8NaYTRvMCD2feaVCy_2EWOTkMZsg.PNG.asj0611/bookBackground.png?type=w773"
const MakeNewBook = ({navigation,route}) => {
  var user = firebase.auth().currentUser;
  var  user_uid
  if (user != null) {
    user_uid = user.uid;  
  }
  const bookTitle_a = useRef(null);
  const [text1,setText1] = useState('');
  const [data,setData] = useState(''); 
  const [chapters, setChapters] = useState('');
  const [intro, setIntro] = useState('');
  const [image, setImage] = useState(null);
  const [isPublic, setPublic] = useState(true);
  var bookKey = Math.random().toString().replace(".","");
  var bookTitle = text1;
  const db=firebase.firestore();
  var storage = firebase.storage(); 
  var storageRef=storage.ref();
  var 저장할경로= storageRef.child('bookCover/'+bookKey)
  var user = firebase.auth().currentUser;
  var  user_uid
  if (user != null) {
    user_uid = user.uid;  
  }
  var userID=user_uid.substring(0,6)
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  useEffect(()=>{
   //// console.log("hello")
    var changeDataRef = firebase.database().ref('book/').orderByChild("regdate");
    changeDataRef.on("value",(snapshot) =>{
     //// console.log(snapshot)
      const bookKey=snapshot.bookKey;
      const tmp = [];
      snapshot.forEach((child)=>{
        tmp.unshift({
          bookKey:child.bookKey,
          user_uid:child.val().user_uid,
          bookTitle:child.val().bookTitle,
          chapters:child.val().chapters,
          intro:child.val().intro,
          regdate: child.val().regdate,
          url: child.val().url,
          isPublic:isPublic
        })
      })
    // // console.log(tmp);
      setData(tmp);
    })
  },[])
  const savePhoto= async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri)
    }
    } 
  return ( 
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    <View style={styles.container}>
        <ImageBackground style={styles.bookBackgroundImage} source={{uri:bookBackground}} >
          <View style={styles.openButtonContainer}>
            <Switch 
                            style={{marginVertical: 5}}
                            value={isPublic}
                            onValueChange={(value)=>setPublic(value)}
                            trackColor={{true: "#98C0ED"}}
                        />
          </View>
          <View style={styles.bookContainer}>
          <ImageBackground style={styles.bookImage} source={{uri:book}} >
          <View style={styles.bookContainer}>
            <View style={styles.titleInput}>
                <TextInput style={styles.titleInputText} multiline={true}  
                returnKeyType="done"
                onChangeText={text1=> setText1(text1)}
                placeholder="한 줄 제목"/>
            <View style={{borderBottomColor: "#D3D3D3" ,borderBottomWidth: "1%", width:"100%",marginLeft:"20%", marginBottom:"3%" }}/>
            </View>
            <View>
            <Text style={styles.writer}> {userID}.이별록작가 </Text>
            </View>
            <TouchableOpacity style={styles.photoInputContainer}>
                <Icon name="add" size={30} color="black" style={styles.addIcon}/>
                <Button title="이별집 표지 이미지를 넣어주세요" onPress={()=>savePhoto()} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </TouchableOpacity>
          </View>
        </ImageBackground>
        </View>
        </ImageBackground>
    </View>
    </KeyboardAvoidingView >
  )
  }
  const styles = StyleSheet.create({ 
    container:{
        flex:1,
        flexDirection: "column"
    },
    bookContainer:{
      marginTop:"11%",
      marginRight:"6%",
      marginLeft:"6%",
      height:"92%",
    },
    bookBackgroundImage:{
      height:"100%",
        resizeMode: "cover",
    },
    bookImage:{
      height:"100%",
      resizeMode: "cover",
    },
    openButtonContainer:{
      height: "8%",
      width:"100%",
      justifyContent:"flex-end",
      alignItems:"flex-end",
      backgroundColor:"yellow",
      flexDirection:"row",
  },
  openButton:{
      height:"40%",
      width:"22.67%",
      backgroundColor:"#C4C4C4",
      borderRadius:5,
      marginRight:"6%" ,
      justifyContent:"center",
  },
  openButtonText:{
      marginLeft:"15%",
      fontSize:14,
  },
  titleInput: {
    height:"12%",
    width: "50%"
  },
  titleInputText:{
    fontSize: 20,
    marginLeft: "20%",
    flexShrink: 1,
    marginBottom:"5%"
  },
  writer:{
    alignSelf: "flex-end",
    marginRight:"5%",
    marginTop:"5%"
  },
  photoInputContainer:{
    marginTop:"17%",
    height:"50%",
    width:"85%",
    marginLeft:"5%",
    alignSelf:"center",
    justifyContent: "center",
    alignItems: "center"
  }
  })
  async function saveChapter(props) {
    const { navigation, image, bookKey, bookTitle, user_uid } = props;
    const response = await fetch(image); //get in the data?
    const blob = await response.blob();//uploading the image blob of the uri which will pass along fire store
    const snapshot = await 저장할경로.put(blob);
    const downloadURL= await 저장할경로.getDownloadURL()
  firebase_db
  .ref('book/'+bookKey)
  .set({
    bookTitle: bookTitle,
    user_uid: user_uid,
    chapters: chapters,
    regdate: new Date().toString(),
    url:downloadURL,
    bookKey:bookKey,
  });
  Alert.alert("생성 완료")
  navigation.navigate("IntroArticle", {bookKey: bookKey})}
  function headerRight() {
    return (
      <Button
        onPress={() => saveChapter()}
        title="저장하기"
        color="#000"
      />
    );
  }
  const options = {
    headerRight,
  };
  export default {
    component: MakeNewBook,
    options,
  };