import { ActivityIndicator, StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { Component, useEffect, useState } from "react";
import firebase from "firebase";



const star="https://i.pinimg.com/originals/fe/df/d2/fedfd24f4a01191b9fc51ebc978b0516.jpg"

const LoadingScreen = ({ navigation, route }) => {
  useEffect(() => {
    const timeout=setTimeout(()=> {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("TabStackScreen");
      } else {
        navigation.navigate("LoginScreen");
      }
    },)},3000)
  }, []);

  return (
    <View style={styles.container}>

      <ImageBackground style={styles.splash} source={{uri:star}} ></ImageBackground>
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