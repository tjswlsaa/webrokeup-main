
import React, {useEffect,useState,useRef} from 'react';
import {TouchableWithoutFeedback, ImageBackground,Animated, Keyboard, StyleSheet, Button,Text, View, Image,Alert, TouchableOpacity, ScrollView, TouchableHighlight, TextInput, Route} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {firebase_db} from '../../firebaseConfig';
//import * as firebase from 'firebase/app';
//import Constants from 'expo-constants'
//import { add, Value } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import {KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase'
import "firebase/firestore"
import "firebase/firebase-storage"
// import SwitchToggle from 'react-native-switch-toggle';
import { Switch } from 'react-native-switch';
import PropTypes from 'prop-types';
const book ="https://postfiles.pstatic.net/MjAyMTA2MDdfMTk0/MDAxNjIzMDY3OTkzMTYz.Uyg7r1zEBbPKA-CfVHU0R5ojbmozb02GJzMRapgcP1cg.flIv0UKSYHpE_CHNSOi2huGzv3svilsmEmMFy1G9zH0g.PNG.asj0611/book.png?type=w773"
const bookBackground = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTE1/MDAxNjIzMDY2NDQwOTUx.N4v5uCLTMbsT_2K1wPR0sBPZRX3AoDXjBCUKFKkiC0gg.BXjLzL7CoF2W39CT8NaYTRvMCD2feaVCy_2EWOTkMZsg.PNG.asj0611/bookBackground.png?type=w773"

const test = {
  user_uid: ''
};

const test2 ={
  image:''
};

const test3 ={
  bookTitle:''
}
const test4 ={
  isPublic:''
}
const test5={
  navigation:''
}

const MakeNewBook = ({navigation,route}) => {
test5.navigation=navigation
const user = firebase.auth().currentUser;
const user_uid = user ? user.uid : null;
const userID = user ? user_uid.substring(0, 6) : null
test.user_uid = user_uid;

const [bookTitle, setBookTitle] = useState('');   
test3.bookTitle=bookTitle
console.log('두줄만들자',bookTitle.length)
  const [image, setImage] = useState(null);
  test2.image=image;
  const [isPublic, setPublic] = useState(true);
  test4.isPublic=isPublic
  const db=firebase.firestore();
  // const storage = firebase.storage(); 
  // const storageRef=storage.ref();
  // const 저장할경로= storageRef.child('bookCover/'+bookKey)
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
  const savePhoto= async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri)
      console.log(result.uri)
    }
    } 

  //   const maxLines= PropTypes.number


  //   const onChangeText = bookTitle => {
  //     // const lines = bookTitle.split("\n");
  
  //     if (bookTitle.length <= (maxLines || 2)) {
  //       onChangeText(bookTitle);
  //       setBookTitle({ value: bookTitle });
  //     }
  //  };

    
    // Animated.timing(this.state.animatedValue, {
    //   toValue: 1,
    //   duration: 400,
    //   useNativeDriver: true, // <-- Add this Line
    // }).start();

  return ( 
    // <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.container}>

        <ImageBackground style={styles.bookBackgroundImage} source={{uri:bookBackground}} >
          <View style={styles.openButtonContainer}>
            <Switch 
                            style={styles.button}
                            value={isPublic}
                            // useNativeDriver={true}
                            activeText={'공개'}
                            inActiveText={'비공개'}
                            onValueChange={(value)=>setPublic(value)}
                            backgroundActive={'#C4C4C4'}
                            backgroundInactive={'#4D6DAA'}
                            circleSize={30} //사이즈 조정이 안댐
                            barHeight={30}
                            barWidth={100}

                            circleActiveColor={'#4D6DAA'}
                            circleInActiveColor={'#C4C4C4'}
                        />
          </View>
          <View style={styles.bookContainer}>
          <ImageBackground style={styles.bookImage} source={{uri:book}} >
          <View style={styles.bookContainer}>
            <View style={styles.titleInput}>

              {/* {bookTitle.length > 12 ? (

                <TextInput style={styles.titleInputText}
                  defaultValue={bookTitle.substring(0,12)} 
                  >
                </TextInput>

              ):( */}

                <TextInput style={styles.titleInputText} 
                value={bookTitle}
                multiline={true}  
                maxLength ={12}
                returnKeyType="done"
                onChangeText={bookTitle=> setBookTitle(bookTitle)}
                // onchangeText={onChangeText()}
                placeholder="제목을 두줄로 작성해주세요"/>

              {/* )} */}
                  {/* <TextInput style={styles.titleInputText} 
                multiline={true}  
                maxlength='5'
                returnKeyType="done"
                onChangeText={bookTitle=> setBookTitle(bookTitle)}
                // onchangeText={onChangeText()}
                placeholder="제목을 두줄로 작성해주세요"/> */}

            {/* <View style={{borderBottomColor: "#D3D3D3" ,borderBottomWidth: "1%", width:"100%",marginLeft:"20%", marginBottom:"3%" }}/> */}
      
            {/* <View style={{borderBottomColor: "#D3D3D3" ,borderBottomWidth: "1%", width:"100%",marginLeft:"20%", marginBottom:"3%" }}/> */}
            </View>
            <View>
            <Text style={styles.writer}> {userID}.이별록작가 </Text>
            </View>

          {image==undefined ? (
 
                  <TouchableOpacity style={styles.photoInputContainer}>
                  {/* <Icon name="add" size={30} color="black" style={styles.addIcon}/> */}
                  <Button title="표지 이미지를 넣어주세요" onPress={()=>savePhoto()} />
                  {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
                  </TouchableOpacity>

          ):(
            <TouchableOpacity onPress={()=>savePhoto()}>
            <Image source={{ uri: image }} style={{ alignSelf:"center", marginTop:25, marginLeft:15, width: 250, height: 250 }} />
            </TouchableOpacity>

          )
          }






          </View>
        </ImageBackground>
        </View>
        </ImageBackground>
    </View>
    </TouchableWithoutFeedback>

    // {/* </KeyboardAvoidingView > */}
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
      height: "5%",
      width:"20%",
      // alignItems:"flex-end",
      marginTop:30,
      marginLeft:270,
  },
  button:{
    marginLeft:50,
    marginTop:10

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
    height:"15%",
    width: "50%",
    // backgroundColor:"yellow",
    marginLeft:20
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
    marginTop:"10%",
    height:"50%",
    width:"85%",
    marginLeft:"5%",
    alignSelf:"center",
    justifyContent: "center",
    alignItems: "center"
  },
  publicButton:{
    height:"40%",
    width:"22.67%",
    borderRadius:5,
    marginRight:"6%" ,
    marginLeft:"10%",
    justifyContent:"center",
  }
  })
  console.log('진행상황')
  async function saveChapter() {

    const { user_uid } = test;
    const { image }=test2;
    const {bookTitle}=test3;
    const {isPublic}=test4;
    const {navigation}=test5;

    console.log('text saveChapter props', test2)

    console.log({ user_uid });
    console.log('이거확인',user_uid)
    const bookKey = Math.random().toString().replace(".","");
    console.log('진행상황2')
    console.log('props 확인', image)
    console.log('진행상황3')
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const SAVE_PATH = storageRef.child('bookCover/' + bookKey)
    const response = await fetch(image); //get in the data?
    const blob = await response.blob();//uploading the image blob of the uri which will pass along fire store
    await SAVE_PATH.put(blob);
    const downloadURL= await SAVE_PATH.getDownloadURL()
  firebase_db
  .ref('book/'+bookKey)
  .set({
    bookTitle: bookTitle,
    user_uid: user_uid,
    regdate: new Date().toString(),
    url:downloadURL,
    bookKey:bookKey,
    isPublic:isPublic
  });
  Alert.alert("생성 완료")
  navigation.navigate("IntroArticle", {bookKey: bookKey})}
  
function headerRight() {
    return (
      <Button
        onPress={saveChapter}
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