import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TouchableHighlight} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app'
import { firebase_db } from '../../firebaseConfig';
import BookComponent from '../../components/BookComponent';

const aboutImage = "http://file.newswire.co.kr/data/datafile2/thumb_480/2010/05/2039103817_20100527105820_1069435867.jpg"
const aboutBookImage = "http://ojsfile.ohmynews.com/STD_IMG_FILE/2018/0309/IE002297749_STD.jpg"
const settingImage = "https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-cartoon-gear-icon-download-image_1251421.jpg"


const PopularBook = ({navigation,bookKey}) => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    let temp = [];
    let data = firebase_db.ref('book/')
        .on('value', (snapshot) => {
            snapshot.forEach((child) => {
                temp.push(child.val());
               // console.log({snapshot})
            })
            setBook(temp)
        })
   // console.log(temp)
}, [])


const BookItem = ({ navigation, item }) => {
  //// console.log(item);
 // console.log("bookitem for popular book running")
  return (
    <View style={{height: "30%"}}>
    <TouchableOpacity style={styles.bookContainerOne} onPress={()=>{navigation.navigate('readBook')}} > 
      <View style={styles.bookContainerOneDesc}>
        <Text style={styles.bookTitle}>{item.bookTitle}</Text>  
        <Text style={styles.bookDesc}>{item.intro}</Text> 

      </View>
      <View style={styles.bookContainerOnePhoto}>
        <BookComponent
                    users_uid={item.user_uid}
                    navigation={navigation}
                    item={item}
                />

        {/* <Image style={styles.bookContainerOnePhoto} source={{uri:item.url}}/> */}
      </View>
    </TouchableOpacity>
    </View>
  )
}

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <StatusBar style="white" />
            <ScrollView style={styles.bookContainer}>
              <View>
                {book.map(item => (
                        <BookItem
                            key={item.key}
                            navigation={navigation}
                            item={item}
                            bookKey={item.bookKey}
                        />
                        // <Text>{item.bookTitle}</Text>
                    ))}
              </View>
        </ScrollView>
        </View>
    )}




const styles = StyleSheet.create({


bookContainer:{
    height: "100%",
  },
  bookContainerOne:{
    flex:1,
    flexDirection:"row",
    backgroundColor:"#FAFAFA",
    marginVertical:"5%",
    marginHorizontal:"3%",
    height: "100%",
    shadowColor: "#E9E9E9", 
    shadowOffset: {width: 10, height: 7}, 
    shadowOpacity: 10, 
    shadowRadius: 10
  },
  bookContainerOneDesc: {
    flex:2,
    fontSize: 20,
    marginTop:"3%",
  },
  bookTitle:{
    fontSize: 17,
    marginTop:"5%",
    marginLeft:"8%",
    marginRight:"8%",
  },
  bookDesc:{
    fontSize: 14,
    marginTop:"5%",
    marginLeft:"8%",
    marginRight:"8%",



  },
  bookIndex:{
    fontSize: 15,
    marginTop:"5%",
    marginLeft:"8%",
    marginRight:"8%",
    marginBottom:"5%",
    color: "red"
  },
  bookContainerOnePhoto:{
    flex:1,
    shadowColor: "#E9E9E9",
    height: "100%",
    width: "100%", 
    shadowOffset: {width: 10, height: 7}, 
    shadowOpacity: 10, 
    shadowRadius: 10
  },

})


export default PopularBook;
