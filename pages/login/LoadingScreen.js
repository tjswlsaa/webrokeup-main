import { ActivityIndicator, StyleSheet, Text, View, ImageBackground,Image} from "react-native";
import React, { Component, useEffect, useState } from "react";
import { CommonActions } from '@react-navigation/native';
import firebase from "firebase";
import loading_logo from '../../assets/loading_logo.jpg';




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
          <ImageBackground style={{flex: 1, height:"100%",width:"100%"}} source={loading_logo} >
            <Text style= {{alignSelf:"center", marginTop: "135%", fontSize: 25, fontWeight: "600", color: "#20543F"}}> Feel me Fill me </Text>
          </ImageBackground>
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