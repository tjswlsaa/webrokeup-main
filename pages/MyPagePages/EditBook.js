import React, { useEffect, useState, useRef } from 'react';
import { TouchableWithoutFeedback, Keyboard, ImageBackground, StyleSheet, Button, Text, View, Image, Alert, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebase_db } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { Switch } from 'react-native-switch';
import "firebase/firestore"
import "firebase/firebase-storage"
import firebase from 'firebase';
const book = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTk0/MDAxNjIzMDY3OTkzMTYz.Uyg7r1zEBbPKA-CfVHU0R5ojbmozb02GJzMRapgcP1cg.flIv0UKSYHpE_CHNSOi2huGzv3svilsmEmMFy1G9zH0g.PNG.asj0611/book.png?type=w773"
const bookBackground = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTE1/MDAxNjIzMDY2NDQwOTUx.N4v5uCLTMbsT_2K1wPR0sBPZRX3AoDXjBCUKFKkiC0gg.BXjLzL7CoF2W39CT8NaYTRvMCD2feaVCy_2EWOTkMZsg.PNG.asj0611/bookBackground.png?type=w773"

const test2 ={
  image2:''
};

const test3 ={
  bookTitle2:''
}
const test4 ={
  isPublic:''
}

const test5 ={
  bookKey:""
}

const test6 ={
  navigation:""
}

const EditBook = ({ navigation, route }) => {
  test6.navigation=navigation

  const { myitem, bookKey } = route.params
  test5.bookKey=bookKey


  const [bookTitle2, setBookTitle2] = useState(myitem.bookTitle) //새로 생성한 북 제목
  test3.bookTitle2=bookTitle2

  const [image2, setImage2] = useState(myitem.url) // 새로 생성한 책 이미지 
  test2.image2=image2;

  const [isPublic, setPublic] = useState(true);
  test4.isPublic=isPublic

  var user = firebase.auth().currentUser
  var user_uid
  if (user != null) { user_uid = user.uid }
  var userID = user_uid.substring(0, 6)
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

  const deleteBook = async()=> {

    const deletefunction =()=>{
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const DELETE_PATH = storageRef.child('bookCover/' + bookKey)

   DELETE_PATH .delete()

    firebase_db
      .ref(`book/${bookKey}`)
      .set(null)
      .then(function () {
        Alert.alert("삭제되었습니다")
        navigation.navigate("MyPage", { myitem: myitem })
      })
    }
    
    // await  Alert.alert("정말로 삭제하시겠습니까?")

    Alert.alert(
      'Alert Title',
      '책, 챕터가 모두 삭제됩니다. 그래도 진행하시겠습니까?',
      [

        {
          text: '취소할래요',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: '넵', onPress: () => deletefunction()},

      ],
      {cancelable: false},
    );

    
   
 }


  
  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.container}>
      <ImageBackground style={styles.bookBackgroundImage} source={{ uri: bookBackground }} >

        <View style={styles.bookContainer}>

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
          <ImageBackground style={styles.bookImage} source={{ uri: book }} >
            <View style={styles.bookContainer}>
              <View style={styles.titleInput}>
                <TextInput
                style={styles.titleInputText} 
                  multiline={true} defaultValue={myitem.bookTitle} returnKeyType="done"
                  onChangeText={(bookTitle2)=>{setBookTitle2(bookTitle2)}
                }
                />
                <View style={{ borderBottomColor: "#D3D3D3", borderBottomWidth: "1%", width: "100%", marginLeft: "20%", marginBottom: "3%" }} />
              </View>
              <View>
                <Text style={styles.writer}> {userID}.이별록작가 </Text>
              </View>
              <TouchableOpacity style={styles.photoInputContainer} onPress={async () => {
                  let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                  })
                 // console.log(result)
                  if (!result.cancelled) {
                    setImage2(result.uri)
                  }
                }}>
                <Image source={{ uri: image2 }} style={{ alignSelf:"center", marginTop:25, marginLeft:15, width: 250, height: 250 }} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.openButton} onPress={() => deleteBook()}>

            <Text style={styles.openButtonText}> 삭제하기 </Text>
          </TouchableOpacity>


            </View>
          </ImageBackground>
        </View>
      </ImageBackground>
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



  const {bookTitle2}=test3;
  const { image2 }=test2;
  const {isPublic}=test4;
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
      isPublic:isPublic,
      editdate: new Date().toString(),
      url: downloadNewURL,
    })
  Alert.alert("생성 완료")
  navigation.navigate("MyBook", { bookKey: bookKey })

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