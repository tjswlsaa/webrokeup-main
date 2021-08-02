import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput, Alert, Switch, Touchable} from 'react-native';
import { firebase_db } from '../../firebaseConfig';
import firebase from 'firebase/app'
const bookBackground = "https://postfiles.pstatic.net/MjAyMTA2MDdfMTE1/MDAxNjIzMDY2NDQwOTUx.N4v5uCLTMbsT_2K1wPR0sBPZRX3AoDXjBCUKFKkiC0gg.BXjLzL7CoF2W39CT8NaYTRvMCD2feaVCy_2EWOTkMZsg.PNG.asj0611/bookBackground.png?type=w773"
import paper from '../../assets/paper.png';


const Notification = ({navigation}) => {
    return(
        
        <SafeAreaView style={{ flex: 1 }}>

        <ImageBackground style={{height:"100%",resizeMode:"cover"}} source={{ uri: bookBackground }} >

             <ImageBackground style={{height:"100%",resizeMode:"cover", marginTop:"10%"}} source={paper} >

             <View style={{height:"80%"}}>
                        <View>
                            <Text style={styles.bookTitle}>환영합니다 :)</Text>  
                        </View>
                        <ScrollView style={styles.textContainer}>
                            <Text style={styles.bookText}/>
                        </ScrollView>
            </View>
        </ImageBackground>

        </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({ 
    container: {
        //앱의 배경 색
        backgroundColor:"#F5F4F4",
                flex:1
      },
      upperButtonContainer: {
        flexDirection:"row",
        alignSelf:"flex-end",
        marginTop: 30,
        marginRight:15,
      },
      editButton: {
          height:20,
          width:60,
          justifyContent:"center",
          backgroundColor: "#C4C4C4",
          alignItems:"center",
          borderRadius:5
      },
      deleteButton: {
          marginLeft:20,
          height:20,
          width:60,
          justifyContent:"center",
          backgroundColor: "#C4C4C4",
          alignItems:"center",
          borderRadius:5
      },
      textContainer:{
          height: "50%",
        //   backgroundColor:"pink",
          marginTop:"7%"
      },
      bookTitle:{
        fontSize: 20,
        marginLeft: 60,
        marginTop:60,
        marginRight:60,

      },
      bookText:{
          marginTop: 30,
          marginLeft: 60,
          marginRight:60,
      },
      regdate: {
          marginLeft : "10%"
      },
      bottomButtonContainer: {
        flex:1,
        flexDirection:"row",
        marginTop: 10,
        marginRight:"10%",
        backgroundColor:"pink"
      },
      commentButton: {
        marginLeft: "7%"
    },
    likeButton: {
        marginLeft: "10%",
    }
});

export default Notification;