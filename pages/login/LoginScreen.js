import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert, Dimensions} from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Fontisto';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import "firebase/auth";
import Icon2 from 'react-native-vector-icons/Ionicons';

const LoginScreen  = ({navigation,route}) => {


  const ScreenHeight = Dimensions.get('window').height   //height
  const ScreenWidth = Dimensions.get('window').width   //height

  const headerHeight = useHeaderHeight();
  const BottomSpace = getBottomSpace()
  const statusBarHeight = getStatusBarHeight();
  const realScreen = ScreenHeight-headerHeight-BottomSpace
 
    return (
      <View style={{backgroundColor:"white", flex:1}}>
      <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: "10%", marginVertical: "5%",marginTop:"15%" }}>
        <View style={{ height:realScreen*0.4,  }}>
          <Text style={{ fontSize: 45, color: "#20543F", fontWeight: "600" }}> Feel Me </Text>
          <Text style={{ fontSize: 45, color: "#20543F", fontWeight: "600" }}> Fill Me </Text>

          <Text style={{ fontSize: 19, marginTop: "10%", marginLeft: "3%" }}>나를 채우는 감정 기록 </Text>
        </View>


          <View style={{alignSelf:"center"}}>

          {/* <TouchableOpacity style={{ alignSelf: "center", }} onPress={() => navigation.navigate('GoogleCheck')}>
              <View style={{ justifyContent: 'center', marginTop: 15, flexDirection: "row" }}>

                <Icon2 name="logo-google" size={20} color="black" style={{ }} />

                <Text style={{ fontSize: 15,marginLeft:"5%" }}> 구글로 시작하기 </Text>
              </View>

            </TouchableOpacity> */}

            <TouchableOpacity style={{ alignSelf: "center",height:50, width:300,backgroundColor:"#f5f5f5", borderRadius:10, marginTop:"15%"}} onPress={() => { navigation.navigate("emailLogin") }}>
              <View style={{ flexDirection: "row", alignSelf:"center" , justifyContent:"center", marginTop:"3.5%"}}>

                <Icon name="email" size={25} color="#20543F" style={{ alignSelf:"center" ,justifyContent:"center", alignItems:"center"  }} />
                <Text style={{ fontSize: 17, marginLeft:"5%", marginTop:"1%", alignSelf:"center",justifyContent:"center"  }}> 이메일로 시작하기 </Text>
              </View>

            </TouchableOpacity>

          </View>


          {/* <View style={{ marginTop: "18%", alignSelf: "center" }}>
            <View style={{ alignSelf: "center" }}>
              <Text style={{ color: "grey", fontSize: 12 }}>시작하기를 누르면서 Feel Me Fill Me의</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: "0.5%" }}>
              <TouchableOpacity onPress={() => navigation.navigate('policyoneforlogin')}><Text style={{ color: "grey", fontSize: 12, textDecorationLine: "underline" }}> 이용약관</Text></TouchableOpacity>
              <Text style={{ color: "grey", fontSize: 12 }}>과</Text>
              <TouchableOpacity onPress={() => navigation.navigate('policytwoforlogin')}><Text style={{ color: "grey", fontSize: 12, textDecorationLine: "underline" }}> 개인정보 취급방침</Text></TouchableOpacity>
              <Text style={{ color: "grey", fontSize: 12 }}>에 동의합니다</Text>
            </View>
          </View> */}
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