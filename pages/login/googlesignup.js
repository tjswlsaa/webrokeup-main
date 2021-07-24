import React, {useState} from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TouchableHighlight} from 'react-native';
import {Container,Content, Header, Form, Input, Item, Button, Label,} from 'native-base'
import firebase from 'firebase/app';
import {firebase_db} from '../../firebaseConfig';
import DateTimePicker from '@react-native-community/datetimepicker';
import 'firebase/firebase-firestore'
import 'firebase/auth'
import{
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    StyledFormArea,
    SubTitle,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,

}from '../../components/styles';
import {Formik} from 'formik';

import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import * as Google from 'expo-google-app-auth'




const auth=firebase.auth();
const fs=firebase.firestore();


export default function Signup ({navigation,route, user}) {

    async function signInWithGoogleAsync() {
      try {
        const result = await Google.logInAsync({
          iosClientId: "34800305578-6itscrs0mg3t5m6p4asbdathmabl8nqt.apps.googleusercontent.com",
          scopes: ['profile', 'email'],
        });
  
        if (result.type === "success") {
            const { idToken, accessToken } = result;
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            firebase
              .auth()
              .signInAndRetrieveDataWithCredential(credential)
              .then(res => {
                console.log("LoginScreen.js 17 | success, navigating to profileScreen");
                this.updateUserData(credential);
                navigation.navigate("ProfileScreen", { user });              })
              .catch(error => {
                console.log("firebase cred err:", error);
              });
          } else {
            return { cancelled: true };
          }
        } catch (err) {
          console.log("err:", err);
        }
      };
    const signInWithGoogle = () => {
        signInWithGoogleAsync()
        }
    
        return (



        <StyledButton google={true} onPress={() => signInWithGoogle()}>
        <Fontisto name="google" color={primary} size={20}/>
        <ButtonText google={true}>
            Sign in with Google
        </ButtonText>
    </StyledButton>


        )
    }

// const aboutBookImage = "https://cdn.boldomatic.com/content/post/suy6Pg/We-broke-up?size=800"
var firebaseConfig = {
  apiKey: "AIzaSyAztNyV9LSQRPGlnDUjEFQrlz9amLio2vg",
  authDomain: "breakupdiary-9cdc8.firebaseapp.com",
  databaseURL: "https://breakupdiary-9cdc8-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "breakupdiary-9cdc8",
  storageBucket: "breakupdiary-9cdc8.appspot.com",
  messagingSenderId: "893078063657",
  appId: "1:893078063657:web:724711b9883bdd35f86a38",
  measurementId: "G-NLWTG75S1H"
};
  if (firebase.apps.length ==0){
    firebase.initializeApp(firebaseConfig);
  }


  import {Colors} from '../../components/styles'
import { render } from 'react-dom';
  const {brand,darkLight, primary} =Colors;


  const styles = StyleSheet.create({

    container:{
        flex:1
    },

  })