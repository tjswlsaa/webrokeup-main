import React from 'react';
import { StyleSheet,Button,Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';


export default function setting ({navigation, route}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.settingButtonFirst} onPress={navigation.navigate("Account")}>
                <Text style={styles.settingButtonText}>계정</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingButton} onPress={navigation.navigate("MarketingSetting")}>
                <Text style={styles.settingButtonText}>알림 설정</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>공지 사항</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>개인정보처리방침 및 이용약관</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logOutButton} onPress={() => firebase.auth().signOut()}>
                <Text style={styles.logOutButtonText}>로그아웃</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.accountDeleteButton} onPress={() => firebase.auth().currentUser.delete().then(function () {
 // console.log('delete successful?')
 // console.log(app.auth().currentUser)
}).catch(function (error) {
  console.error({error})
})}>
                <Text style={styles.accountDeleteButtonText}>탈퇴하기</Text>
            </TouchableOpacity>




        </View>

    )}

    
const styles = StyleSheet.create({ 

    container:{
        flex: 1,
        backgroundColor:"white"
    },
    settingButton :{
        marginTop:"2%",
        marginLeft:"10%",
        height:"10%"
    },

    settingButtonFirst :{
    marginTop:"10%",
    marginLeft:"10%",
    height:"10%",

    },

    settingButtonText:{
        fontSize: 17
    
    },

    logOutButton:{
        width:"90%",
        height:"7%",
        padding:"2%",
        backgroundColor:"#fe8d6f",
        borderRadius:15,
        margin:"2%",
        marginLeft: "0%",
        marginTop: "40%",
        alignSelf: "center"

  
    },
    settingButtonText:{
        fontSize: 17,
    },
    logOutButtonText:{
        fontSize: 17,
        alignSelf: "center"
    },
    accountDeleteButton:{
        width:"90%",
        height:"7%",
        padding:"2%",
        backgroundColor:"#fe8d6f",
        borderRadius:15,
        margin:"2%",
        marginLeft: "0%",
        marginTop: "3%",
        alignItems: "center",
        justifyContent: "center"

  
    },
    accountDeleteButtonText :{
        fontSize: 17,
        alignSelf: "center"
    }





})