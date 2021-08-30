import { ActivityIndicator, StyleSheet, Text, View, ImageBackground,Image } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { CommonActions } from '@react-navigation/native';
import firebase from "firebase";
import tutorialOneIs from '../../assets/tutorialOneIs.jpg';



const feelingtutorial = ({ navigation, route }) => {


  return (
    <View style={{flex:1, backgroundColor:"white"}}>

          <Image style={{height:"100%", width:"99%", alignSelf:"center", resizeMode:"center", marginTop:"5%"}} source={tutorialOneIs} ></Image>
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
export default feelingtutorial;