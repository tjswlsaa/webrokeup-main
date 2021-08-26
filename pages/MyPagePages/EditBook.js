import React, { useEffect, useState, useRef } from 'react';
import { TouchableWithoutFeedback, Keyboard, ImageBackground, StyleSheet, Button, Text, View, Image, Alert, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebase_db } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { Switch } from 'react-native-switch';
import "firebase/firestore"
import "firebase/firebase-storage"
import firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImageManipulator from 'expo-image-manipulator';
import { CommonActions } from '@react-navigation/native';

const test2 ={
  image2:''
};

const test3 ={
  bookTitle2:''
}


const test5 ={
  bookKey:""
}

const test6 ={
  navigation:""
}
const test7 = {
  spinner: '',
  setSpinner: undefined,
}

const test8 = {
  userinfo: '',
}
const EditBook = ({ navigation, route }) => {
  test6.navigation=navigation

  const { myitem, bookKey } = route.params
  test5.bookKey=bookKey


  const [bookTitle2, setBookTitle2] = useState(myitem.bookTitle) //새로 생성한 북 제목
  test3.bookTitle2=bookTitle2

  const [image2, setImage2] = useState(myitem.url) // 새로 생성한 책 이미지 
  test2.image2=image2;


  const [spinner, setSpinner] = useState(false);

  test7.spinner = spinner
  test7.setSpinner = setSpinner;
  var user = firebase.auth().currentUser
  var user_uid
  if (user != null) { user_uid = user.uid }

  const [userinfo, setUserinfo] = useState([]);
  test8.userinfo = userinfo
  useEffect(() => {
    firebase_db.ref(`users/${user_uid}`)
      .on('value', (snapshot) => {
        let userinfo = snapshot.val();
        setUserinfo(userinfo);
      })
  }, []);


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, []);


const editPhoto =async()=>{
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1, //이게 없었던게 문제일수있을까

  });

  if (!result.cancelled) {
    const image2 = result;

    const manipResult = await ImageManipulator.manipulateAsync(
      image2.localUri || image2.uri,
      [
        { resize: { width: 600 } } // width: 600px에 맞춰서 자동 resize
      ],
      { format: ImageManipulator.SaveFormat.JPEG }
    );

    setImage2(manipResult.uri);
  }
}

const myitemcolor = myitem.Color
const ColorNameis = ()=>{

  if(myitemcolor=="#9E001C"){
    return "firstColor"
  }else if(myitemcolor=="#F6AE2D"){
    return "secondColor"
  }else if(myitemcolor=="#33658A"){
    return "thirdColor"
  }else if(myitemcolor=="#494949"){
    return "fourthColor"
  }

}

const ColorName = ColorNameis(myitemcolor)
console.log("mnb keycolor",ColorNameis())


const startbooktitle = ()=>{

  if(ColorName=="firstColor"){
    return "빨간색"
  }else if(ColorName=="secondColor"){
    return "노란색"
  }else if(ColorName=="thirdColor"){
    return "파란색"
  }else if(ColorName=="fourthColor"){
    return "검은색"
  }

}
  
  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.container}>
      {spinner && (
          <Spinner
            visible={true}
            textContent={'Loading...'}
            textStyle={{ color: '#FFF' }}
          />
        )}
        <View style={styles.bookContainer}>
        <View style={{backgroundColor:myitemcolor, opacity: 0.8, height:"70%", width:"7%", marginLeft:"8%", zIndex:1, marginTop:"25%" }}>
              </View>
        <View                 
                style={{ 
                  zIndex: 0, position: "absolute", 
                  height: "70%",width:"80%", marginRight: "6%", marginLeft: "13%", marginTop: "25%"}}>


                <TouchableOpacity style={{zIndex: 0, position: "absolute", 
                  height: "100%",width:"100%"}} onPress={()=>editPhoto()}>
                <Image source={{ uri: image2 }} style={{ height: "100%",width:"100%"}} />
              </TouchableOpacity>
                <View style={{backgroundColor:"white", height:"75%", width:"80%", alignSelf:"center", marginTop:"20%"}}>
                <Text style={{marginTop:"20%", marginLeft:"8%", fontSize:20}}> {startbooktitle()} 감정은 </Text>

                <TextInput style={{ marginTop:"5%",marginLeft:"10%", fontSize: 20, flexShrink: 1, }}
                  value={bookTitle2}
                  multiline={false}
                  maxLength={10}
                  returnKeyType="done"
                  onChangeText={bookTitle2 => setBookTitle2(bookTitle2)}
                  placeholder="제목을 작성해주세요" />

              <View>
                <Text style={{ alignSelf: "flex-end", marginRight: "10%", marginTop: "10%"}}> {userinfo.iam} </Text>
              </View>

           </View>

            </View>




        </View>
    </View>
    </TouchableWithoutFeedback>

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
    width:"20%",
    // alignItems:"flex-end",
    marginTop:0,
    marginBottom:25,
    marginLeft:250,
  },
  openButton: {
    height: 20,
    width: 80,
    backgroundColor: "#C4C4C4",
    borderRadius: 5,
    marginTop:"10%",
    marginLeft: "80%",
    justifyContent: "center",
    alignContent:"center",
    margin: "1%"
  },
  openButtonText: {
    marginLeft: "15%",
    fontSize: 14,
  },
  titleInput: {
    height: "12%",
    width: "50%",
    marginLeft:20
  },
  titleInputText: {
    fontSize: 20,
    marginLeft: "20%",
    flexShrink: 1,
    marginBottom: "5%"
  },
  writer: {
    alignSelf: "flex-end",
    marginRight: "5%",
    marginTop: "5%"
  },
  photoInputContainer: {
    
    // marginTop: "17%",
    // height: "50%",
    // width: "85%",
    // marginLeft: "5%",
    // alignSelf: "center",
    // justifyContent: "center",
    // alignItems: "center"
  }
})


async function EditChapter() {

//myitem. url 불러와서 삭제 


const {setSpinner}=test7;
setSpinner(true);
const {spinner}=test7;

  const {bookTitle2}=test3;
  const { image2 }=test2;
  const {bookKey}=test5;
  const {navigation}=test6;

  if(bookTitle2 == ""){
    bookTitle2 = myitem.bookTitle
  }
  var 저장할경로 = firebase.storage().ref().child('bookCover/' + bookKey)
  const response = await fetch(image2)//get in the data?
  const blob = await response.blob()//uploading the image blob of the uri which will pass along fire store
  const snapshot = await 저장할경로.put(blob)
  //// console.log(`transferred: ${snapshot.bytesTransferred}`)
  const downloadNewURL = await 저장할경로.getDownloadURL()

 

  firebase_db
    .ref(`book/${bookKey}`)
    .update({
      bookTitle: bookTitle2,
      editdate: new Date().toString(),
      url: downloadNewURL,
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
  navigation.navigate("MyBook", { bookKey: bookKey })
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
    <Button
      onPress={EditChapter}
      title="저장하기"
      color="#000"
    />

  );
}

const options = {
  headerRight,
};




export default  {
  component: EditBook,
  options,
};