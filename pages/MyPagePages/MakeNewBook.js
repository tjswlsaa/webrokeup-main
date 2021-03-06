
import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, ImageBackground, Keyboard, StyleSheet, Dimensions, Button, Text, View, Image, Alert, TouchableOpacity, TextInput, Touchable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebase_db } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase'
import "firebase/firestore"
import "firebase/firebase-storage"
import { Switch } from 'react-native-switch';
import Spinner from 'react-native-loading-spinner-overlay';
import { CommonActions } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import coverimage from '../../assets/coverimage.png';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
const book = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTk0/MDAxNjIzMDY3OTkzMTYz.Uyg7r1zEBbPKA-CfVHU0R5ojbmozb02GJzMRapgcP1cg.flIv0UKSYHpE_CHNSOi2huGzv3svilsmEmMFy1G9zH0g.PNG.asj0611/book.png?type=w773"
const bookBackground = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTE1/MDAxNjIzMDY2NDQwOTUx.N4v5uCLTMbsT_2K1wPR0sBPZRX3AoDXjBCUKFKkiC0gg.BXjLzL7CoF2W39CT8NaYTRvMCD2feaVCy_2EWOTkMZsg.PNG.asj0611/bookBackground.png?type=w773"

const test = {
  user_uid: ''
};

const test2 = {
  image: ''
};

const test3 = {
  bookTitle: ''
}
// const test4 = {
//   isPublic: ''
// }
const test5 = {
  navigation: ''
}
const test6 = {
  userinfo: ''
}
const test7 = {
  spinner: '',
  setSpinner: undefined,
}
// const test8 = {
//   smallBookTitle: '',
// }
const test9={
  bookKey:'',
}

const test10={
  color:""
}
const test11={
  startbooktitle:""
}

const MakeNewBook = ({navigation,route}) => {

  const {color} = route.params;
  console.log("mnb",color)
  test10.color = color


  const firstColor= "#9E001C"
  const secondColor="#F6AE2D"
  const thirdColor = "#33658A"
  const fourthColor= "#494949"
  //if color green bookcover startwith 3

  const KeyColor = ()=>{

    if(color=="firstColor"){
      return "#9E001C"
    }else if(color=="secondColor"){
      return "#F6AE2D"
    }else if(color=="thirdColor"){
      return "#33658A"
    }else if(color=="fourthColor"){
      return "#494949"
    }

  }

  console.log("mnb keycolor",KeyColor())

  const startBookKeyColor = ()=>{

    if(color=="firstColor"){
      return 1
    }else if(color=="secondColor"){
      return 2
    }else if(color=="thirdColor"){
      return 3
    }else if(color=="fourthColor"){
      return 4
    }

  }

  const startbooktitle = ()=>{

    if(color=="firstColor"){
      return "?????????"
    }else if(color=="secondColor"){
      return "?????????"
    }else if(color=="thirdColor"){
      return "?????????"
    }else if(color=="fourthColor"){
      return "?????????"
    }

  }
  test11.startbooktitle = startbooktitle

  console.log("mnb bookTItle key",startbooktitle())


  console.log("mnb color key",startBookKeyColor())

  const [spinner, setSpinner] = useState(false);

  test7.spinner = spinner
  test7.setSpinner = setSpinner;

  function generateRandomCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
      str += Math.floor(Math.random() * 10)
    }
    return str
  }
  const BottomSpace = getBottomSpace()
  const statusBarHeight = getStatusBarHeight();
  const realScreen = ScreenHeight - headerHeight - BottomSpace 
  const bookKey= startBookKeyColor()+generateRandomCode(6)+"000"
  console.log("MNB bookKey",bookKey)
  const ScreenHeight = Dimensions.get('window').height   //height
  const headerHeight = useHeaderHeight();
  const ScreenWidth = Dimensions.get('window').width

//   const [CountBookKey,setCountBookKey]=useState("")

//   useEffect (()=>{
//     let arr = firebase_db.ref(`book/${HeadBookKey}/`)
//     .on('value', (snapshot) => {
//        var CountBookKey = snapshot.numChildren();
//        setCountBookKey(CountBookKey)
//     })
// }, [])
  
// console.log("CountBookKey",CountBookKey)

// const bookKey=HeadBookKey+(CountBookKey+1)
// console.log("bookKey",bookKey)

test9.bookKey = bookKey;


  const user = firebase.auth().currentUser;
  const user_uid = user ? user.uid : null;
  const userID = user ? user_uid.substring(0, 6) : null
  const [userinfo, setUserinfo] = useState([]);
  test6.userinfo = userinfo
  useEffect(() => {
    firebase_db.ref(`users/${user_uid}`)
      .on('value', (snapshot) => {
        let userinfo = snapshot.val();
        setUserinfo(userinfo);
      })
  }, []);

  // console.log('userinfo',userinfo)
  test5.navigation = navigation

  test.user_uid = user_uid;
  const [bookTitle, setBookTitle] = useState('');
  test3.bookTitle = bookTitle
  // const [smallBookTitle, setSmallBookTitle] = useState('');
  // test8.smallBookTitle = smallBookTitle
  // test3.bookTitle=bookTitle
  // console.log('???????????????',bookTitle.length)
  const [image, setImage] = useState(null);
  test2.image = image;
  // const [isPublic, setPublic] = useState(true);
  // test4.isPublic = isPublic
  const db = firebase.firestore();
  // const storage = firebase.storage(); 
  // const storageRef=storage.ref();
  // const ???????????????= storageRef.child('bookCover/'+bookKey)
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('????????? ????????? ??????????????????. ??? ????????? ???????????? ?????? ???????????? ???????????????.');
        }
      }
    })();
  }, []);

  const savePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1, //?????? ???????????? ?????????????????????

    });

    if (!result.cancelled) {
      const image = result;

      const manipResult = await ImageManipulator.manipulateAsync(
        image.localUri || image.uri,
        [
          { resize: { width: 600 } } // width: 600px??? ????????? ?????? resize
        ],
        { format: ImageManipulator.SaveFormat.JPEG }
      );

      setImage(manipResult.uri);
    }
  }

  console.log("mnb image",image)


  return (
    // <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={{ flex: 1, flexDirection: "column" }}>

        {spinner && (
          <Spinner
            visible={true}
            textContent={'?????????'}
            textStyle={{ color: '#FFF' }}
          />
        )}

        {/* <ImageBackground style={styles.bookBackgroundImage} source={{ uri: bookBackground }} > */}
        <View style={{flex: 1}}>
          {/* <View style={{ flex: 1, flexDirection: "row", width: "20%", alignSelf: "flex-end", marginRight: "5%", marginTop: "3%"}}>
            <Switch
              value={isPublic}
              // useNativeDriver={true}
              activeText={'??????'}
              inActiveText={'?????????'}
              onValueChange={(value) => setPublic(value)}
              backgroundActive={'#C4C4C4'}
              backgroundInactive={'#20543F'}
              circleSize={30} //????????? ????????? ??????
              barHeight={30}
              barWidth={10}

              circleActiveColor={KeyColor()}
              circleInActiveColor={'#C4C4C4'}
            />

            
          </View> */}



              <View style={{backgroundColor:KeyColor(), opacity: 0.8, height:"75%", width:"7%", marginLeft:"5%", zIndex:1, marginTop:"25%" }}>
              </View>

              {image == undefined ? (

              <View style={{ backgroundColor:"#c4c4c4",  zIndex: 0, position: "absolute", height: "75%",width:"85%", marginRight: "6%", marginLeft: "10%", marginTop: "25%"}}>

                  <View style={{backgroundColor:"white", height:"75%", width:"80%", alignSelf:"center", marginTop:"20%", }}>
                  <Text style={{marginTop:"20%", marginLeft:"8%", fontSize:20}}> {startbooktitle()} ????????? </Text>
                  <TextInput style={{ marginTop:"5%",marginHorizontal:"10%", fontSize: 20,  }}
                    value={bookTitle}
                    multiline={false}
                    maxLength={10}
                    returnKeyType="done"
                    onChangeText={bookTitle => setBookTitle(bookTitle)}
                    placeholder="????????? ??????????????????" />


                  {/* <TextInput style={{ marginLeft:"10%", fontSize: 17, marginTop: "3%"}}
                    value={smallBookTitle}

                    multiline={false}
                    maxLength={14}
                    returnKeyType="done"
                    onChangeText={smallBookTitle => setSmallBookTitle(smallBookTitle)}
                    placeholder="????????? ??????????????????" /> */}

                <View>
                  <Text style={{ alignSelf: "flex-end", marginRight: "4%", marginTop: "10%"}}> {userID}.??????????????? </Text>
                </View>
                <View style={{marginTop:"20%"}} >
                <Button  color="#20543F"  title="???????????? ???????????????"  onPress={() => savePhoto()} />
                </View>
             </View>

              </View>
              ):(
                <View                 
                style={{ 
                  zIndex: 0, position: "absolute", 
                  height: "75%",width:"85%", marginRight: "6%", marginLeft: "10%", marginTop: "25%"}}>
                <TouchableOpacity 
                 style={{
                  zIndex: 0, position: "absolute", 
                  height: "100%",width:"100%"
                }}
                onPress={() => savePhoto()}>

                  <Image  source={{ uri: image }}
                    style={{
                      // zIndex: 0, position: "absolute", 
                      height: "100%",width:"100%"
                    }}
                  ></Image>
                </TouchableOpacity>  
                <View style={{backgroundColor:"white", height:"75%", width:"80%", alignSelf:"center", marginTop:"20%"}}>
                <Text style={{marginTop:"20%", marginLeft:"8%", fontSize:20}}> {startbooktitle()} ????????? </Text>

                <TextInput style={{ marginTop:"5%",marginLeft:"10%", fontSize: 20, flexShrink: 1, }}
                  value={bookTitle}
                  multiline={false}
                  maxLength={10}
                  returnKeyType="done"
                  onChangeText={bookTitle => setBookTitle(bookTitle)}
                  placeholder="????????? ??????????????????" />

              <View>
                <Text style={{ alignSelf: "flex-end", marginRight: "10%", marginTop: "10%"}}> {userID}.??????????????? </Text>
              </View>

           </View>

            </View>
              )}
        </View>
        {/* </ImageBackground> */}
      </View>
    </TouchableWithoutFeedback>

    // {/* </KeyboardAvoidingView > */}
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  bookContainer: {
    marginTop: "11%",
    marginRight: "6%",
    marginLeft: "6%",
    height: "92%",
  },
  bookBackgroundImage: {
    height: "100%",
    resizeMode: "cover",
  },
  bookImage: {
    height: "100%",
    resizeMode: "cover",
  },
  openButtonContainer: {
    height: "5%",
    width: "20%",
    // alignItems:"flex-end",
    marginTop: 30,
    marginLeft: 270,
  },
  button: {
    marginLeft: 50,
    marginTop: 10

  },
  openButton: {
    height: "40%",
    width: "22.67%",
    backgroundColor: "#C4C4C4",
    borderRadius: 5,
    marginRight: "6%",
    justifyContent: "center",
  },
  openButtonText: {
    marginLeft: "15%",
    fontSize: 14,
  },
  titleInput: {
    height: "15%",
    width: "60%",
    // backgroundColor:"yellow",
    marginLeft: 20
  },
  titleInputText: {
    fontSize: 20,
    marginLeft: "20%",
    flexShrink: 1,
  },
  writer: {
    alignSelf: "flex-end",
    marginRight: "5%",
  },
  photoInputContainer: {
    marginTop: "10%",
    height: "50%",
    width: "85%",
    marginLeft: "5%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  publicButton: {
    height: "40%",
    width: "22.67%",
    borderRadius: 5,
    marginRight: "6%",
    marginLeft: "10%",
    justifyContent: "center",
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
})
// console.log('????????????')

async function handleChapter() {
  const { bookTitle } = test3;
  const { image } = test2;
  // const { smallBookTitle } = test8;

  // console.log('image!!!!!!!!!',image)
  if (bookTitle == "") {
    Alert.alert("??? ????????? ??????????????????");
    return;
  }
  if (image == null) {
    Alert.alert("???????????? ???????????????");
    return;
  }

  saveChapter()
}

  async function saveChapter() {
    // const reduce = require('image-blob-reduce')();

    const {setSpinner}=test7;
    setSpinner(true);
    // ??????????????? ????????? ????????? ???????????????. ?????? ???????????? ??????!
    // ?????????, react-native-loading-spinner-overlay ?????? ?????? ?????? ?????? disable ????????? ???????????????????????? ??????????????????
    // ???, ?????? ????????????

    const { user_uid } = test;
    const { image }=test2;
    const {bookTitle}=test3;
    // const {isPublic}=test4;
    const {navigation}=test5;
    const {userinfo}=test6;
    const {spinner}=test7;
    // const {smallBookTitle}=test8;
    const {bookKey}=test9;
    const {color}=test10;

    const startbooktitle = ()=>{

      if(color=="firstColor"){
        return "?????????"
      }else if(color=="secondColor"){
        return "?????????"
      }else if(color=="thirdColor"){
        return "?????????"
      }else if(color=="fourthColor"){
        return "?????????"
      }
  
    }
    const firstColor= "#9E001C"
    const secondColor="#F6AE2D"
    const thirdColor = "#33658A"
    const fourthColor= "#494949"

    function getColor(bookKey) {
      if (bookKey.indexOf('1') == 0){
      return firstColor
      }
      else if (bookKey.indexOf('2') == 0){
      return secondColor
      }
      else if (bookKey.indexOf('3') == 0){
      return thirdColor
      }
      else if (bookKey.indexOf('4') == 0){
      return fourthColor
      }
  }
  const Color = getColor(bookKey);
  console.log("populararticle Color", Color)
  
    console.log("mnb22222 bookTItle key",startbooktitle())

    console.log('saveChapter() .', new Date());
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const SAVE_PATH = storageRef.child('bookCover/' + bookKey)
    console.log('saveChapter() ..', new Date());
    const response = await fetch(image); //get in the data?
    console.log('saveChapter() ...', new Date());
    const blob = await response.blob();//uploading the image blob of the uri which will pass along fire store
    console.log('saveChapter() ....', new Date());
    await SAVE_PATH.put(blob);
    console.log('saveChapter() .....', new Date());
    const downloadURL= await SAVE_PATH.getDownloadURL()
    console.log('saveChapter() ..... .', new Date());

  firebase_db
  .ref('book/'+bookKey)
  .set({
    defaultTitle:startbooktitle()+" ?????????",
    bookTitle: bookTitle,
    // smallBookTitle:smallBookTitle,
    user_uid: user_uid,
    regdate: new Date().toString(),
    url:downloadURL,
    bookKey:bookKey,
    // isPublic:isPublic,
    CountChapter:0,
    Color:Color,
    likeCountSum: 0,
    // iam:userinfo.iam,
    // selfLetter:userinfo.selfLetter
  });

  let mybookKey=color

  firebase_db
  .ref(`/users/${user_uid}/myBooks/`+mybookKey)
  .set(bookKey)



  Alert.alert("?????? ??????")
  

  navigation.dispatch(state => {
    const routes = [...state.routes];
    routes.pop();

    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });
  });

  navigation.navigate("IntroArticle", { bookKey: bookKey })

  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
      // textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
}


function headerRight() {
  return (
    // <TouchableOpacity onPress={handleChapter}>
    //   <Text style={{fontSize: 16, fontWeight: "600", marginRight:10}}> ?????? </Text>
    // </TouchableOpacity>
    <Icon.Button name='checkmark-sharp' size={25}
      backgroundColor='white' color="black"
      onPress={handleChapter}

    >
    </Icon.Button>

  );
}
const options = {
  headerRight,
};
export default {
  component: MakeNewBook,
  options,
};