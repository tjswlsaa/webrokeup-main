import { ActivityIndicator, StyleSheet, Text, View, ImageBackground,Image } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { CommonActions } from '@react-navigation/native';
import firebase from "firebase";
import logo from '../../assets/logo.png';




const LoadingScreen = ({ navigation, route }) => {
  useEffect(() => {
    const timeout=setTimeout(()=> {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("TabStackScreen");
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'TabStackScreen' },
            ],
          })
        );
        
      } else {
        navigation.navigate("LoginScreen");
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'LoginScreen' },
            ],
          })
        );
      }
    },)},3000)
  }, []);

  return (
    <View style={styles.container}>

          <Image style={{height:200, width:200, alignSelf:"center"}} source={logo} ></Image>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  splash:{
    width:"100%",
    height:"100%"
  }
});
export default LoadingScreen;