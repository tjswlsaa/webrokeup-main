import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TouchableHighlight} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const aboutBookImage = "http://ojsfile.ohmynews.com/STD_IMG_FILE/2018/0309/IE002297749_STD.jpg"

const Impressed = ({navigation,route}) => {
    return (


<ScrollView style={styles.container}>
    <StatusBar style="white" />

    <View  style={styles.subContainer}>

        <TouchableOpacity style={StyleSheet.tag} onPress={()=>{navigation.navigate('subBook')}}>
             <Text style={styles.tagText}>공감한 이별록 > </Text>
        </TouchableOpacity>
        
        <ScrollView style={styles.cardContainer} horizontal = {true}>


        <TouchableOpacity onPress={()=>{navigation.navigate('readBook')}}>
          <Image style={styles.bookButtonImage} source={{uri:aboutBookImage}} />
        </TouchableOpacity>
 
        <TouchableOpacity onPress={()=>{navigation.navigate('readBook')}}>
          <Image style={styles.bookButtonImage} source={{uri:aboutBookImage}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('readBook')}}>
          <Image style={styles.bookButtonImage} source={{uri:aboutBookImage}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('readBook')}}>
          <Image style={styles.bookButtonImage} source={{uri:aboutBookImage}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('readBook')}}>
          <Image style={styles.bookButtonImage} source={{uri:aboutBookImage}} />
        </TouchableOpacity>
        </ScrollView> 
    </View>

    <View style={{borderBottomColor: "gray" ,borderBottomWidth: 1,}}/>

    <View style={styles.likeContainer}>
        <TouchableOpacity style={StyleSheet.tag} onPress={()=>{navigation.navigate('likedArticle')}}>
             <Text style={styles.tagText}>공감한 이별록 > </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chOne} onPress={()=>{navigation.navigate('readArticle')}}>
                <Text style={styles.chTitle}>01 이별 그 순간</Text>  
                <Text style={styles.chOnePunchLine}>"먼 훗날 나를 읽게 된다면 너는 잠시 울어줄까"</Text>  
                <Text style={styles.chWriter}> by 나작가 이름 없는 애인에게 </Text>  
        </TouchableOpacity>
        <View style={{borderBottomColor: "#d3d3d3" ,borderBottomWidth: 1,}}/>
        <TouchableOpacity style={styles.chOne} onPress={()=>{navigation.navigate('readArticle')}}>
                <Text style={styles.chTitle}>01 이별 그 순간</Text>  
                <Text style={styles.chOnePunchLine}>"먼 훗날 나를 읽게 된다면 너는 잠시 울어줄까"</Text>  
                <Text style={styles.chWriter}> by 나작가 이름 없는 애인에게 </Text>  
        </TouchableOpacity>
    </View>

    <View style={{borderBottomColor: "gray" ,borderBottomWidth: 1,}}/>


    <View style={styles.recentContainer}>
        <TouchableOpacity style={StyleSheet.tag} onPress={()=>{navigation.navigate('recentArticle')}}>
             <Text style={styles.tagText}>최근 본 이별록 > </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chOne} onPress={()=>{navigation.navigate('readArticle')}}>
                <Text style={styles.chTitle}>01 이별 그 순간</Text>  
                <Text style={styles.chOnePunchLine}>"먼 훗날 나를 읽게 된다면 너는 잠시 울어줄까"</Text>  
                <Text style={styles.chWriter}> by 나작가 이름 없는 애인에게 </Text>  
        </TouchableOpacity>
        <View style={{borderBottomColor: "#d3d3d3" ,borderBottomWidth: 1,}}/>
        <TouchableOpacity style={styles.chOne} onPress={()=>{navigation.navigate('readArticle')}}>
                <Text style={styles.chTitle}>01 이별 그 순간</Text>  
                <Text style={styles.chOnePunchLine}>"먼 훗날 나를 읽게 된다면 너는 잠시 울어줄까"</Text>  
                <Text style={styles.chWriter}> by 나작가 이름 없는 애인에게 </Text>  
        </TouchableOpacity>
    </View>

</ScrollView>
    )}

const styles = StyleSheet.create({

    container : {
        backgroundColor: '#fff',
    },
    subContainer: {
        height:300,

    },
    recentContainer:{
        height:300,

    },

    likeContainer:{
        height:300,

    },
    tag:{
        height:"20%"
    },
    tagText:{
        fontSize: 17,
        fontWeight: "600",
        marginTop: "5%",
        marginLeft:"5%"

    },
    cardContainer:{
        marginTop: "3%",
        width: "100%",
        height: "25%",
        backgroundColor: '#fff',

    },

    subBook01:{
        backgroundColor: "grey",
        width: 150,
        height: "90%",
        marginRight:5,
        marginLeft:16,
    },



bookButtonImage: {
    backgroundColor: "grey",
    width: 150,
    height: "90%",
    marginRight:5,
    marginLeft:16,
},

    chOne: {
        marginTop:"5%",
      marginLeft:"5%",
      marginRight:"3%",
      marginBottom:"5%",
    },

    chTitle: {
        fontSize: 15,


    },
    chOnePunchLine:{
        fontWeight: '700',
        marginLeft:"5%",
        marginTop:"2%",


    },
    chWriter :{
        marginLeft:"5%",
        marginTop:"2%",


    },
  





})

export default Impressed;
