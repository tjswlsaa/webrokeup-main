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
      console.log({ email })
      const result = await firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
          console.log({ error });
          alert(error);
        });
      console.log({ result })
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
      console.log(error.toString(error));
    }
  }
return (
<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
  <View style={{flex:1, justifyContent: 'center', marginHorizontal: "10%", marginVertical: "15%"}}>
    <TouchableOpacity onPress={()=>navigation.goBack()}>
      <Icon name="arrowleft" size="20" color="black"/>
    </TouchableOpacity>
    <View style={{flex:4, justifyContent:'center', marginVertical: "50%", marginHorizontal: "3%"}}>  
      <Text> 이메일 </Text>
      <TextInput
        placeholder="이메일을 입력해 주세요"
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(email)=>setEmail(email)}
        keyboardType="email-address"
        style={{fontSize: 20, marginVertical: 10}}
        />
      <Text style={{marginTop: 10}}> 비밀번호 </Text>
      <TextInput
        placeholder="비밀번호를 입력해 주세요"
        secureTextEntry={true}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(password)=>setPassword(password)}
        style={{fontSize: 20, marginVertical: 10}}
      />
      <TouchableOpacity style={{borderWidth:1, alignSelf: "center", borderRadius: 10, paddingVertical: "5%", paddingHorizontal: "40%", marginTop: "15%"}}onPress={()=>{loginUser(email, password)}}>
        <Text style={{alignSelf:"center", fontSize:17}}>로그인</Text>
      </TouchableOpacity>
    </View>
    <View style={{flex:1, marginHorizontal: "3%", marginBottom: "5%"}} >
    <View style={{height: "40%", flexDirection: "row"}} >
        <Text style = {{flex:1}}>이별록이 처음이라면?</Text>
        <TouchableOpacity style= {{flex: 1, alignItems: "flex-end"}} onPress={()=>{navigation.navigate('emailSignup')}}>
          <Text style={{fontSize:14}}>회원가입하기</Text>
        </TouchableOpacity>
      </View>
      <View style = {{flex:1, flexDirection: "row"}}>
        <Text style = {{flex:2}}>비밀번호를 잊어버리셨나요?</Text>
        <TouchableOpacity style= {{flex: 1, alignItems: "flex-end"}}>
          <Text style={{fontSize:14}}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</TouchableWithoutFeedback>
    )
}
export default emailLogin;