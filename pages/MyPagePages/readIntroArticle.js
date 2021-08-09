import React, {useState,useRef,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
const readIntroArticle = ({navigation, route}) => {
  const introArticle_a = useRef(null);
  const [text, setText] = useState('');
  const [data,setData] = useState('');
  const {bookKey, authorUser_uid, intro} = route.params;



  var user = firebase.auth().currentUser;
var  user_uid
if (user != null) {
  user_uid = user.uid;  
}
  return (
    <SafeAreaView style={{flex:1}}>

        <StatusBar style="white" />

        {authorUser_uid == user_uid ? (
        <View style={styles.upperButtonContainer}>
        <TouchableOpacity style={styles.editButton}>                
                    <Text style={styles.editButtonText} onPress={()=>navigation.navigate("EditIntroArticle", {navigation: navigation, intro:intro, bookKey: bookKey})}>편집</Text>
                </TouchableOpacity> 

        </View>) : 
        (<View style={{height:100}}></View>)}

        <View style={{height:100}}>
            <Text style={styles.bookTitle}>말머리에서</Text>  
        </View>
        <View>
        <ScrollView style={styles.textContainer}>
            <Text style={styles.bookText}>{intro}</Text>
       </ScrollView>
       </View>
       {/* <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.likeButton}>                
                <Text style={styles.likeButtonText}>공감</Text>
            </TouchableOpacity>  
            <TouchableOpacity style={styles.commentButton}>
                <Text style={styles.commentButtonText}>댓글</Text>
            </TouchableOpacity>  
        </View> */}
    </SafeAreaView>
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
          height: "50%"
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
export default readIntroArticle;