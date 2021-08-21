
import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, ImageBackground, Keyboard, StyleSheet, Button, Text, View, Image, Alert, TouchableOpacity, TextInput, Touchable } from 'react-native';
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
const test4 = {
  isPublic: ''
}
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
const test8 = {
  smallBookTitle: '',
}
const test9={
  bookKey:'',
}

const MakeNewBook = ({navigation,route}) => {

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

  const bookKey= generateRandomCode(6)+"000"
  console.log("MNB",bookKey)

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
console.log("bookKey",bookKey)

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
  const [smallBookTitle, setSmallBookTitle] = useState('');
  test8.smallBookTitle = smallBookTitle
  // test3.bookTitle=bookTitle
  // console.log('두줄만들자',bookTitle.length)
  const [image, setImage] = useState(null);
  test2.image = image;
  const [isPublic, setPublic] = useState(true);
  test4.isPublic = isPublic
  const db = firebase.firestore();
  // const storage = firebase.storage(); 
  // const storageRef=storage.ref();
  // const 저장할경로= storageRef.child('bookCover/'+bookKey)
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('갤러리 접근을 허용해주세요');
        }
      }
    })();
  }, []);

  const savePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1, //이게 없었던게 문제일수있을까

    });

    if (!result.cancelled) {
      const image = result;

      const manipResult = await ImageManipulator.manipulateAsync(
        image.localUri || image.uri,
        [
          { resize: { width: 600 } } // width: 600px에 맞춰서 자동 resize
        ],
        { format: ImageManipulator.SaveFormat.JPEG }
      );

      setImage(manipResult.uri);
    }
  }


  return (
    // <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={{ flex: 1, flexDirection: "column" }}>

        {spinner && (
          <Spinner
            visible={true}
            textContent={'Loading...'}
            textStyle={{ color: '#FFF' }}
          />
        )}

        {/* <ImageBackground style={styles.bookBackgroundImage} source={{ uri: bookBackground }} > */}
        <View style={{flex: 1}}>
          <View style={{ flex: 1, flexDirection: "row", width: "20%", alignSelf: "flex-end", marginRight: "5%", marginTop: "3%"}}>
            <Switch
              value={isPublic}
              // useNativeDriver={true}
              activeText={'공개'}
              inActiveText={'비공개'}
              onValueChange={(value) => setPublic(value)}
              backgroundActive={'#C4C4C4'}
              backgroundInactive={'#21381c'}
              circleSize={30} //사이즈 조정이 안댐
              barHeight={30}
              barWidth={10}

              circleActiveColor={'#21381c'}
              circleInActiveColor={'#C4C4C4'}
            />
          </View>
          <View style={{ flex: 14, marginBottom: "30%"}}>
            <ImageBackground style={{ height: "100%", width: "100%"}} resizeMode="contain" source={coverimage} >
              <View style={{ height: "70%", marginRight: "6%", marginLeft: "10%", marginTop: "33%"}}>
                <View style={{ marginLeft: "12%", width: "80%"}}>

                  <TextInput style={{ fontSize: 20, flexShrink: 1, }}
                    value={bookTitle}
                    multiline={false}
                    maxLength={10}
                    returnKeyType="done"
                    onChangeText={bookTitle => setBookTitle(bookTitle)}
                    placeholder="제목을 작성해주세요" />


                  <TextInput style={{ fontSize: 17, marginTop: "3%"}}
                    value={smallBookTitle}

                    multiline={false}
                    maxLength={14}
                    returnKeyType="done"
                    onChangeText={smallBookTitle => setSmallBookTitle(smallBookTitle)}
                    placeholder="소제를 작성해주세요" />

                </View>
                <View>
                  <Text style={{ alignSelf: "flex-end", marginRight: "10%", marginTop: "10%"}}> {userID}.이별록작가 </Text>
                </View>

                {image == undefined ? (

                  <TouchableOpacity style={{
                    marginTop: "10%",
                    height: "50%",
                    width: "85%",
                    marginLeft: "5%",
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    {/* <Icon name="add" size={30} color="black" style={styles.addIcon}/> */}
                    <Button title="표지 이미지를 넣어주세요" onPress={() => savePhoto()} />
                    {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
                  </TouchableOpacity>

                ) : (
                  <TouchableOpacity onPress={() => savePhoto()}>
                    <Image source={{ uri: image }} style={{ alignSelf: "center", marginTop: "10%" , marginLeft: "3%", width: 250, height: 250 }} />
                  </TouchableOpacity>

                )
                }
              </View>
            </ImageBackground>
          </View>
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
// console.log('진행상황')

async function handleChapter() {
  const { bookTitle } = test3;
  const { image } = test2;
  const { smallBookTitle } = test8;

  // console.log('image!!!!!!!!!',image)
  if (bookTitle == "") {
    Alert.alert("책 제목을 입력해주세요");
    return;
  }
  if (image == null) {
    Alert.alert("이미지를 넣어주세요");
    return;
  }

  saveChapter()
}

  async function saveChapter() {
    // const reduce = require('image-blob-reduce')();

    const {setSpinner}=test7;
    setSpinner(true);
    // 저장중일때 함수의 실행을 막아야한다. 두번 저장되면 안됨!
    // 그런데, react-native-loading-spinner-overlay 얘가 화면 전체 터치 disable 덕분에 프로그래밍적으로 처리안해도댐
    // 즉, 현재 방심중임

    const { user_uid } = test;
    const { image }=test2;
    const {bookTitle}=test3;
    const {isPublic}=test4;
    const {navigation}=test5;
    const {userinfo}=test6;
    const {spinner}=test7;
    const {smallBookTitle}=test8;
    const {bookKey}=test9;


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
    bookTitle: bookTitle,
    smallBookTitle:smallBookTitle,
    user_uid: user_uid,
    regdate: new Date().toString(),
    url:downloadURL,
    bookKey:bookKey,
    isPublic:isPublic,
    CountChapter:0
    // iam:userinfo.iam,
    // selfLetter:userinfo.selfLetter
  });

  firebase_db
  .ref(`/users/${user_uid}/myBook`)
  .set({
    bookKey:bookKey
  })



  Alert.alert("생성 완료")
  

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
    <TouchableOpacity onPress={handleChapter}>
      <Text style={{fontSize: 15, fontWeight: "600"}}> 다음 </Text>
    </TouchableOpacity>
    // <Icon.Button name='save' size={25}
    //   backgroundColor='white' color="black"
    //   onPress={handleChapter}

    // >
    // </Icon.Button>

  );
}
const options = {
  headerRight,
};
export default {
  component: MakeNewBook,
  options,
};