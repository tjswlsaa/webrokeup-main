
import React, {useEffect, useState, Component} from 'react';

import {ImageBackground,Button, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TouchableHighlight} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import { launchImageLibrary} from 'react-native-image-picker';

import { render } from 'react-dom';

const photoinput =({image, onImagePicked}) => {

  const [selectedImage, setSelectedImage]=useState();
  

  useEffect (()=> {
    if(image) {
     // console.log('useEffect:'+image);
      setSelectedImage({uri:image});
    }
  }, [image] )

pickImageHandler= ()=> {
 const options={};
 ImagePicker.launchImageLibrary(options,response => {
    // console.log ("response", response);
 });
};

  return ( 

    <View styles={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={selectedImage}/>
      </View>
      <View styles={styles.button}>
        <Button title="Pick Image" onPress ={this.pickImageHandler}/>
      </View>
    </View>


)}

const styles =StyleSheet.create ({

container :{
  width:"100%",
  alignItems:"center"
},

imageContainer:{
  width:"80%",
  height:150,
  borderColor:"black"
},
button :{
  margin:8
}


}

)

export default photoinput;

 



 

