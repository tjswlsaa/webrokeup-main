import "firebase/auth";
import {useState} from 'react';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Container,Content, Header, Form, Input, Item, Button, Label,} from 'native-base'
import firebase from 'firebase/app';
import {firebase_db} from '../../firebaseConfig';



// var firebaseConfig = {
//   apiKey: "AIzaSyAztNyV9LSQRPGlnDUjEFQrlz9amLio2vg",
//   authDomain: "breakupdiary-9cdc8.firebaseapp.com",
//   databaseURL: "https://breakupdiary-9cdc8-default-rtdb.asia-southeast1.firebasedatabase.app/",
//   projectId: "breakupdiary-9cdc8",
//   storageBucket: "breakupdiary-9cdc8.appspot.com",
//   messagingSenderId: "893078063657",
//   appId: "1:893078063657:web:724711b9883bdd35f86a38",
//   measurementId: "G-NLWTG75S1H"
// };
//   if (firebase.apps.length ==0){
//     firebase.initializeApp(firebaseConfig);
//   }





   class emailLogin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
      };
    }
    loginUser = async(email, password) => {
        try {
          console.log({email})
         const result= await firebase.auth()
              .signInWithEmailAndPassword(email, password)
              .catch(error => {
                console.log({error});
                alert(error);
              });
          console.log({result})
          const isValid = (result > ''); 
          if (isValid == false) {
            return; // 이 아래로 진행시키지 않는다.
          }
            firebase
            .database()
            .ref('/users/' + result.user.uid)
            .update({
              last_logged_in: Date.now()
            });
            return result.email;
    } catch (error) {
          console.log(error.toString(error));
        }
      };
      render () {
        return(
            <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                         autoCorrect={false}
                         autoCapital="none"
                         onChangeText={(email)=>this.setState({email})}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                        secureTextEntry={true}
                         autoCorrect={false}
                         autoCapital="none"
                         onChangeText={(password)=>this.setState({password})}/>
                    </Item>
                    <Button style={{marginTop:10}}
                    full
                    rounded
                    primary
                    onPress={()=>this.loginUser(this.state.email,this.state.password)}  
                    >
                        <Text>로그인</Text>
                    </Button>
                </Form>
            </Container>
        )
    };
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
      }
    });
  export default emailLogin;