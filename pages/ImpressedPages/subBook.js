import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TouchableHighlight} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const aboutImage = "http://file.newswire.co.kr/data/datafile2/thumb_480/2010/05/2039103817_20100527105820_1069435867.jpg"
const aboutBookImage = "http://ojsfile.ohmynews.com/STD_IMG_FILE/2018/0309/IE002297749_STD.jpg"
const settingImage = "https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-cartoon-gear-icon-download-image_1251421.jpg"


const subBook = ({navigation,route}) => {
    return (
        <View style={styles.container}>
            <StatusBar style="white" />

            <ScrollView style={styles.bookContainer}>
          <TouchableOpacity style={styles.bookContainerOne} >
            <View style={styles.bookContainerOneDesc}>
              <Text style={styles.bookTitle}>이별 일기</Text>  
              <Text style={styles.bookDesc}>당신을 떠올리면 손 끝에 맺히는 문장들이 제법 있습니다. 당신이 나의 글을 살펴주는 그 날을 상상하며 글을 적어봅니다.</Text> 
              <Text style={styles.bookIndex}>22화</Text> 

            </View>
            <View style={styles.bookContainerOnePhoto}>
              <Image style={styles.bookContainerOnePhoto} source={{uri:aboutBookImage}}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookContainerOne} onPress={()=>{navigation.navigate('나의 이별북')}}>
            <View style={styles.bookContainerOneDesc}>
              <Text style={styles.bookTitle}>이별 일기</Text>  
              <Text style={styles.bookDesc}>당신을 떠올리면 손 끝에 맺히는 문장들이 제법 있습니다. 당신이 나의 글을 살펴주는 그 날을 상상하며 글을 적어봅니다.</Text> 
              <Text style={styles.bookIndex}>22화</Text> 

            </View>
            <View style={styles.bookContainerOnePhoto}>
              <Image style={styles.bookContainerOnePhoto} source={{uri:aboutBookImage}}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookContainerOne} onPress={()=>{navigation.navigate('나의 이별북')}}>
            <View style={styles.bookContainerOneDesc}>
              <Text style={styles.bookTitle}>이별 일기</Text>  
              <Text style={styles.bookDesc}>당신을 떠올리면 손 끝에 맺히는 문장들이 제법 있습니다. 당신이 나의 글을 살펴주는 그 날을 상상하며 글을 적어봅니다.</Text> 
              <Text style={styles.bookIndex}>22화</Text> 

            </View>
            <View style={styles.bookContainerOnePhoto}>
              <Image style={styles.bookContainerOnePhoto} source={{uri:aboutBookImage}}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookContainerOne} onPress={()=>{navigation.navigate('나의 이별북')}}>
            <View style={styles.bookContainerOneDesc}>
              <Text style={styles.bookTitle}>이별 일기</Text>  
              <Text style={styles.bookDesc}>당신을 떠올리면 손 끝에 맺히는 문장들이 제법 있습니다. 당신이 나의 글을 살펴주는 그 날을 상상하며 글을 적어봅니다.</Text> 
              <Text style={styles.bookIndex}>22화</Text> 

            </View>
            <View style={styles.bookContainerOnePhoto}>
              <Image style={styles.bookContainerOnePhoto} source={{uri:aboutBookImage}}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookContainerOne} onPress={()=>{navigation.navigate('나의 이별북')}}>
            <View style={styles.bookContainerOneDesc}>
              <Text style={styles.bookTitle}>이별 일기</Text>  
              <Text style={styles.bookDesc}>당신을 떠올리면 손 끝에 맺히는 문장들이 제법 있습니다. 당신이 나의 글을 살펴주는 그 날을 상상하며 글을 적어봅니다.</Text> 
              <Text style={styles.bookIndex}>22화</Text> 

            </View>
            <View style={styles.bookContainerOnePhoto}>
              <Image style={styles.bookContainerOnePhoto} source={{uri:aboutBookImage}}/>
            </View>
          </TouchableOpacity>
        </ScrollView>


        </View>
    )}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: '#fff',
    },


bookContainer:{
    height: "100%",
  },
  bookContainerOne:{
    flex:1,
    flexDirection:"row",
    backgroundColor:"#dedede",
    marginTop:"5%",
    marginLeft:"3%",
    marginRight:"3%",
    height: "100%"

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
    marginBottom:"5%"

  },
  bookContainerOnePhoto:{
    flex:1,

  },

})


export default subBook;
