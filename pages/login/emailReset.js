import React, { useState, useEffect } from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";
// import RNPickerSelect from 'react-native-picker-select';



const emailReset = ({navigation}) => {
    firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });


  return(
      <View style={{flex:1}}>
        <RNPickerSelect
                      onValueChange={(value) => console.log(value)}
                      items={[
                          { label: 'Football', value: 'football' },
                          { label: 'Baseball', value: 'baseball' },
                          { label: 'Hockey', value: 'hockey' },
                      ]}
                  />
      </View>
  )
}

export default emailReset;