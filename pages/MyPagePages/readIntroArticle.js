import React, {useState,useRef,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import Icon from 'react-native-vector-icons/AntDesign';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
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
  return (
    <SafeAreaView style={{flex:1}}>

        <StatusBar style="white" />
        <View style={{marginHorizontal:"5%",}}> 
        

<View style={{ height: realScreen*0.9,alignSelf: "center", backgroundColor:"white" , marginVertical:"10%", width:"95%",}}>
        <View style={{height: realScreen*0.1,  marginTop:"10%"}}>
{authorUser_uid == user_uid ? (
        <View >
        <TouchableOpacity  style={{alignSelf:"flex-end", marginRight:"10%"}} onPress={()=>navigation.navigate("EditIntroArticle", {navigation: navigation, intro:intro, bookKey: bookKey})}>
            <Icon name="edit" size={18} color="grey" style={{alignSelf:"flex-end"}}></Icon>
        </TouchableOpacity>

        </View>) : 
        (<View></View>)}
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