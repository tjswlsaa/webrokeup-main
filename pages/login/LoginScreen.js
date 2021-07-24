import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';
import * as Google from 'expo-google-app-auth'
import "firebase/auth";
import { Alert } from 'react-native';
import * as Facebook from "expo-facebook"
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import Expo from 'expo';
import emailSignup from './emailSignup';


const LoginScreen  = ({navigation,route}) => {
    const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  const onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        console.log("1")
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          console.log("2")

          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function(result) {
              console.log("3")

              console.log('user signed in ');
              if (result.additionalUserInfo.isNewUser) {
                console.log("4")

                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    email: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    user_uid:result.user.uid,
                    iam:result.user.uid.substring(0,6),
                    selfLetter: "안녕하세요. 이별록 작가" + result.user.uid.substring(0,6) + "입니다" , 
                    created_at: Date.now()
                  })
                  .then(function(snapshot) {
                    console.log("5")

                    console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function(error) {
              console.log("6")

              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };
  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        iosClientId: "34800305578-6itscrs0mg3t5m6p4asbdathmabl8nqt.apps.googleusercontent.com",
        scopes: ['profile', 'email']
      });
      if (result.type === 'success') {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase
        .auth()
        .signInWithCredential(credential)
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

    return (
      <View style={styles.container}>
        <Button
          title="Google로 시작하기"
          onPress={signInWithGoogleAsync}
          />
            {/* <Button
          title="Facebook 으로 시작하기"
          onPress={signInWithFacebook}
          /> */}
         <Button
          title="이메일로 시작하기"
          onPress={()=>{navigation.navigate('emailSignup')}}          
          />
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