import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Touchable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


export default function readArticle({navigation, route}) {
    const { chapter, bookName } = route.params;

    return (

    <View style={styles.container}>
        <StatusBar style="white" />

        <View style={styles.upperButtonContainer}>
            <TouchableOpacity style={styles.editButton}>                
                <Text style={styles.editButtonText}>스크랩</Text>
            </TouchableOpacity>  

        
        </View>

        <View>
            <Text style={styles.bookTitle}>{chapter.title}</Text>  

        </View>
        <ScrollView style={styles.textContainer}>
               
                <Text style={styles.bookText}>{chapter.content}</Text>  
          
        
       </ScrollView>
       <View style={styles.bottomButtonContainer}>

            <TouchableOpacity style={styles.likeButton}>                
                <Text style={styles.likeButtonText}>공감</Text>
            </TouchableOpacity>  

            <TouchableOpacity style={styles.commentButton}>
                <Text style={styles.commentButtonText}>댓글</Text>
            </TouchableOpacity>  
        </View>
    </View>
  )}

const styles = StyleSheet.create({ 

    container: {
        //앱의 배경 색
        backgroundColor:"#F5F4F4",
                flex:1
      },

      upperButtonContainer: {
        flex:1,
        flexDirection:"row",
        alignSelf:"flex-end",
        marginTop: "15%",
        marginRight:"10%"


      },

      editButton: {
          
      },
      deleteButton: {
          marginLeft: "7%"
      },

      textContainer:{
          height: 250
      },

      bookTitle:{
        fontSize: 20,
        marginLeft: "5%"

      },
      bookText:{
          marginTop: "20%",
          marginLeft:"10%",
          marginRight:"10%",

      },

      bottomButtonContainer: {
        flex:1,
        alignSelf:"flex-end",
        flexDirection:"row",
        marginTop: "15%",
        marginRight:"10%"

      },
    
      commentButton: {
        marginLeft: "7%"
    },
    
    likeButton: {
        marginLeft: "10%"

    }









})