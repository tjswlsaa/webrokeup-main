import React, {useState,useRef,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Alert} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import Icon from 'react-native-vector-icons/AntDesign';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase_db } from '../../firebaseConfig';

const readIntroArticle = ({navigation, route}) => {
  const introArticle_a = useRef(null);
  const [text, setText] = useState('');
  const [data,setData] = useState('');
  const {bookKey, authorUser_uid, intro} = route.params;

  const ScreenHeight = Dimensions.get('window').height   //height
  const ScreenWidth = Dimensions.get('window').width   //height

  const headerHeight = useHeaderHeight();
  const BottomSpace = getBottomSpace()
  const statusBarHeight = getStatusBarHeight();
  const realScreen = ScreenHeight-headerHeight-BottomSpace

  var user = firebase.auth().currentUser;
var  user_uid
if (user != null) {
  user_uid = user.uid;  
}

const alert = async ()=> {

  const alertfunction=()=>{
    firebase_db
    .ref(`alert/${bookKey}/`)
    .set({
      user_uid: user_uid,
      regdate: new Date().toString(),
      bookkey:bookKey,
      intro:"intro"
    })
    .then(function(){
        Alert.alert("신고 완료")
   })}
   Alert.alert(
    '알림',
    '신고 하시겠습니까?',
    [

      {
        text: '취소',
        // onPress: () => console.log('취소되었습니다'),
        style: 'cancel',
      },
      {text: '신고', onPress: () => alertfunction()},

    ],
    {cancelable: false},
  );

}
  return (
    <SafeAreaView style={{flex:1}}>

        <StatusBar style="white" />
        <View style={{marginHorizontal:"5%",}}> 
        

<View style={{ height: realScreen*0.9,alignSelf: "center", backgroundColor:"white" , marginVertical:"10%", width:"95%",}}>
        <View style={{height: realScreen*0.1,  marginTop:"10%"}}>
{authorUser_uid == user_uid ? (
        <View >
        <TouchableOpacity  style={{alignSelf:"flex-end", marginRight:"10%"}} onPress={()=>navigation.navigate("EditIntroArticle", {navigation: navigation, intro:intro, bookKey: bookKey,})}>
            <Icon name="edit" size={18} color="grey" style={{alignSelf:"flex-end"}}></Icon>
        </TouchableOpacity>

        </View>) : 
        (<View>
          <TouchableOpacity style={{marginLeft:"80%",  width:50, height:25,flexDirection:"row" }} onPress={()=>alert()}>                        
                <Icon3 name="alarm-light-outline" size={20} color="grey" style={{}} />
                <Text style={{marginLeft:"7%", marginTop:"4%",color:"grey"}}>신고</Text>

                </TouchableOpacity>
        </View>)}
        </View>
        <View style={{height:realScreen*0.1,marginHorizontal:"5%"}}>
            <Text style={styles.bookTitle}>말머리에서</Text>  
        </View>
        <View style={{height:realScreen*0.6}}>
        <ScrollView style={styles.textContainer}>
            <Text style={{lineHeight:"25%", marginHorizontal:"10%"}}>{intro}</Text>
       </ScrollView>
       </View>
</View>
</View>
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