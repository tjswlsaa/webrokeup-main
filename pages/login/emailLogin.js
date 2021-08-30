import "firebase/auth";
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Dimensions, Keyboard, TouchableWithoutFeedback, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Header } from 'native-base'
import firebase from 'firebase/app';
import logo from '../../assets/logo.png';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {KeyboardAvoidingView} from 'react-native';

const emailLogin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const headerHeight = useHeaderHeight();
  const ScreenWidth = Dimensions.get('window').width  //screen 너비
  const ScreenHeight = Dimensions.get('window').height   //height
  const BottomSpace = getBottomSpace()
  const tabBarHeight = 0;
  const statusBarHeight = getStatusBarHeight()
  const realScreen = ScreenHeight - headerHeight - BottomSpace - tabBarHeight
  const loginUser = async (email, password) => {
    try {
     // console.log({ email })
      const result = await firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
         // console.log({ error });
          alert("로그인 정보가 없습니다");
        });
     // console.log({ result })
      const isValid = (result > '');
      if (isValid == false) {
        return; // 이 아래로 진행시키지 않는다.
      }
      firebase
        .database()
        .ref('/users/' + result.user.uid)
        .update({
          last_logged_in: Date.now()
        });
      return result.email;
    } catch (error) {
     // console.log(error.toString(error));
    }
  }

return (
  <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled>

  <View style={{backgroundColor:"white", flex:1}}>
<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
  <View style={{flex:1, justifyContent: 'center', marginHorizontal: "5%", }}>
<View style={{ height:realScreen*0.35}}>
  <Image style={{height:realScreen*0.3, width:200, alignSelf:"center"}} source={logo} ></Image>
  <Text style= {{alignSelf: "center", fontSize: 27, marginTop: "5%", fontWeight: "600", color: "#20543F"}}> Feel me Fill me </Text> 
  </View>

    <View style={{ height:realScreen*0.4, justifyContent:'center',  marginHorizontal: "3%", marginTop:"10%" }}>  
    <View style={{flexDirection:"row", backgroundColor:"#f5f5f5", height:realScreen*0.06, width:"100%", justifyContent:"center", borderRadius:15}}>
      <Icon name="user" size={18} color="grey" style={{ marginLeft: "4%",backgroundColor:"#f5f5f5", justifyContent:"center", marginTop:"3%"}}/>
      <TextInput
        placeholder="이메일을 입력해주세요"
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(email)=>setEmail(email)}
        keyboardType="email-address"
        style={{fontSize: 18,marginLeft:"5%", backgroundColor:"#f5f5f5", borderRadius:10, height:"100%", width:"80%"}}
        />

      </View>

      <View style={{flexDirection:"row", backgroundColor:"#f5f5f5", height:realScreen*0.06, width:"100%",  borderRadius:15, marginTop:"5%",}}>
      <Icon name="lock" size={18} color="grey" style={{ marginLeft: "6%",backgroundColor:"#f5f5f5", justifyContent:"center", marginTop:"3%"}}/>
      <TextInput
        placeholder="비밀번호를 입력해주세요"
        secureTextEntry={true}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(password)=>setPassword(password)}
        style={{fontSize: 18, marginVertical: 10,marginLeft:"5%"}}
      />
      </View>
      <TouchableOpacity style={{alignSelf: "center", borderRadius: 15,justifyContent:"center" ,paddingHorizontal: "40%", marginTop: "10%", backgroundColor:"#20543F", height:realScreen*0.06, width: "100%"}}onPress={()=>{loginUser(email, password)}}>
        <Text style={{alignSelf:"center", marginTop: "4%", fontSize:17, color:"white", fontSize: 18}}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignSelf:"center",marginTop:"6%"}} onPress={()=>{navigation.navigate('emailSignup')}}>
          <Text style={{fontSize:15}}>계정이 없으시다면? 회원 가입하기</Text>
        </TouchableOpacity>
    </View>

  </View>
</TouchableWithoutFeedback>
</View>
</KeyboardAvoidingView >

    )
}

export default emailLogin;