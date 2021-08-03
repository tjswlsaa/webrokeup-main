import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert} from 'react-native';
import firebase from 'firebase';
import "firebase/auth";
const LoginScreen  = ({navigation,route}) => {


 
    return (
      <View style={{flex:1, justifyContent: 'center', marginHorizontal: "10%", marginVertical: "10%"}}>
        <View style={{flex: 2, marginTop: 50, paddingVertical: "30%"}}>  
          <Text style={{fontSize: 30}}> 이별록 </Text>
          <Text style={{fontSize: 17, marginTop: "15%"}}>이별의 끄적임을 모아 </Text>
          <Text style={{fontSize: 17, marginTop:5}}>한권의 책이 되도록</Text>
        </View>
        <View style={{flex: 2}}>
          <View style={{justifyContent: 'center'}}>
            <TouchableOpacity style={{borderWidth:1, alignSelf: "center", borderRadius: 10, paddingVertical: "5%"}} onPress={()=>{navigation.navigate("emailLogin")}}>
              <Text style={{alignSelf:"center", paddingHorizontal: "30%", fontSize:15}}> 이메일로 시작하기 </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 13}}>
              <Text style={{color: "grey", fontSize: 12}}>시작하기를 누르면서 이별록의
                <View><TouchableOpacity onPress={()=>navigation.navigate('policyoneforlogin')}><Text style={{color:"grey", fontSize: 12, textDecorationLine: "underline"}}> 이용약관</Text></TouchableOpacity></View> 및 
                <View><TouchableOpacity onPress={()=>navigation.navigate('policytwoforlogin')}><Text style={{color:"grey", fontSize: 12, textDecorationLine: "underline"}}> 개인정보 취급방침</Text></TouchableOpacity></View>
              에 동의합니다.</Text>
          </View>
        </View>
      </View>
    );           
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default LoginScreen;