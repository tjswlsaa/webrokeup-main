import "firebase/auth";
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Header } from 'native-base'
import firebase from 'firebase/app';

const emailLogin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


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
  <View style={{backgroundColor:"white", flex:1}}>
<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
  <View style={{flex:1, justifyContent: 'center', marginHorizontal: "5%", marginVertical: "15%",}}>

    <View style={{flex:4, justifyContent:'center', marginVertical: "50%", marginHorizontal: "3%"}}>  
    <View style={{flexDirection:"row", backgroundColor:"#f5f5f5", height:"30%", width:"100%", justifyContent:"center", borderRadius:15}}>
      <Icon name="user" size={18} color="grey" style={{ marginLeft: "4%",backgroundColor:"#f5f5f5", justifyContent:"center", marginTop:"4%"}}/>
      <TextInput
        placeholder="이메일 입력"
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(email)=>setEmail(email)}
        keyboardType="email-address"
        style={{fontSize: 18,marginLeft:"5%", backgroundColor:"#f5f5f5", borderRadius:10, height:"100%", width:"80%"}}
        />

      </View>

      <View style={{flexDirection:"row", backgroundColor:"#f5f5f5", height:"30%", width:"100%",  borderRadius:15, marginTop:"5%",}}>
      <Icon name="lock" size={18} color="grey" style={{ marginLeft: "6%",backgroundColor:"#f5f5f5", justifyContent:"center", marginTop:"4%"}}/>
      <TextInput
        placeholder="비밀번호 입력"
        secureTextEntry={true}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(password)=>setPassword(password)}
        style={{fontSize: 18, marginVertical: 10,marginLeft:"5%"}}
      />
      </View>
      <TouchableOpacity style={{alignSelf: "center", borderRadius: 15, paddingVertical: "5%", paddingHorizontal: "40%", marginTop: "20%", backgroundColor:"#20543F"}}onPress={()=>{loginUser(email, password)}}>
        <Text style={{alignSelf:"center", fontSize:17, color:"white"}}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignSelf:"center", marginTop:"10%"}} onPress={()=>{navigation.navigate('emailSignup')}}>
          <Text style={{fontSize:15}}>계정이 없으시다면? 회원 가입하기</Text>
        </TouchableOpacity>
    </View>

  </View>
</TouchableWithoutFeedback>
</View>
    )
}

export default emailLogin;