import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert} from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Fontisto';

import "firebase/auth";
import Icon2 from 'react-native-vector-icons/Ionicons';

const LoginScreen  = ({navigation,route}) => {


 
    return (
      <View style={{backgroundColor:"white", flex:1}}>
      <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: "10%", marginVertical: "10%", }}>
        <View style={{ flex: 2, marginTop: 50, paddingVertical: "30%" }}>
          <Text style={{ fontSize: 35, color: "#20543F", fontWeight: "600" }}> Feel Me </Text>
          <Text style={{ fontSize: 35, color: "#20543F", fontWeight: "600" }}> Fill Me </Text>

          <Text style={{ fontSize: 17, marginTop: "10%", marginLeft: "3%" }}>나를 채우는 감정 기록 </Text>
        </View>

        <View style={{ flex: 3, }}>

          <View style={{alignSelf:"center"}}>

          <TouchableOpacity style={{ alignSelf: "center", }} onPress={() => navigation.navigate('GoogleCheck')}>
              <View style={{ justifyContent: 'center', marginTop: 15, flexDirection: "row" }}>

                <Icon2 name="logo-google" size={20} color="black" style={{ }} />

                <Text style={{ fontSize: 15,marginLeft:"5%" }}> 구글로 시작하기 </Text>
              </View>

            </TouchableOpacity>

            <TouchableOpacity style={{ alignSelf: "center",marginTop:"10%" , marginLeft:"4%"}} onPress={() => { navigation.navigate("emailLogin") }}>
              <View style={{ flexDirection: "row" }}>

                <Icon name="email" size={20} color="black" style={{  }} />
                <Text style={{ fontSize: 15, marginLeft:"5%" }}> 이메일로 시작하기 </Text>
              </View>

            </TouchableOpacity>

          </View>


          <View style={{ marginTop: "18%", alignSelf: "center" }}>
            <View style={{ alignSelf: "center" }}>
              <Text style={{ color: "grey", fontSize: 12 }}>시작하기를 누르면서 Feel Me Fill Me의</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "0.5%" }}>
              <TouchableOpacity onPress={() => navigation.navigate('policyoneforlogin')}><Text style={{ color: "grey", fontSize: 12, textDecorationLine: "underline" }}> 이용약관</Text></TouchableOpacity>
              <Text style={{ color: "grey", fontSize: 12 }}>과</Text>
              <TouchableOpacity onPress={() => navigation.navigate('policytwoforlogin')}><Text style={{ color: "grey", fontSize: 12, textDecorationLine: "underline" }}> 개인정보 취급방침</Text></TouchableOpacity>
              <Text style={{ color: "grey", fontSize: 12 }}>에 동의합니다</Text>
            </View>
          </View>
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