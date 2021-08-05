import React, {useState,useRef,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
const readIntroArticle = ({navigation, route}) => {
  const introArticle_a = useRef(null);
  const [text, setText] = useState('');
  const [data,setData] = useState('');
  const {bookKey, myitem, intro} = route.params;
  useEffect(()=>{
   // console.log("말머리 생성 완료")
    var changeDataRef = firebase.database().ref(`book/${bookKey}/`);
    changeDataRef.on("value",(snapshot) =>{
     // console.log(snapshot)
      const tmp = [];
      snapshot.forEach((child)=>{
        tmp.unshift({
          introKey:child.introKey,
          introArticle:child.val().intro
        })
      })
     // console.log(tmp);
      setData(tmp);
    })
  },[])
  return (
    <View style={styles.container}>
        <StatusBar style="white" />
        <View style={styles.upperButtonContainer}>
        <TouchableOpacity style={styles.editButton}>                
                    <Text style={styles.editButtonText} onPress={()=>navigation.navigate("EditIntroArticle", {navigation: navigation, intro:intro, bookKey: bookKey})}>편집</Text>
                </TouchableOpacity> 

        </View>
        <View>
            <Text style={styles.bookTitle}>말머리에서</Text>  
        </View>
        <ScrollView style={styles.textContainer}>
            <Text style={styles.bookText}>{intro}</Text>
       </ScrollView>
       {/* <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.likeButton}>                
                <Text style={styles.likeButtonText}>공감</Text>
            </TouchableOpacity>  
            <TouchableOpacity style={styles.commentButton}>
                <Text style={styles.commentButtonText}>댓글</Text>
            </TouchableOpacity>  
        </View> */}
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