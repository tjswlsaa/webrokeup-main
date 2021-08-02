import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput, Alert, Switch, Touchable} from 'react-native';
import { firebase_db } from '../../firebaseConfig';
import firebase from 'firebase/app'
import Icon from 'react-native-vector-icons/AntDesign';
const Account = ({navigation}) => {
    const [userinfo, setUserinfo] = useState([]);
    var user = firebase.auth().currentUser;
    var  user_uid
    if (user != null) {
        user_uid = user.uid
    }
    // var userID=user_uid.substring(0,6)
    useEffect(()=>{
        firebase_db.ref(`users/${user_uid}`)
            .on('value', (snapshot) => {
                let userinfo = snapshot.val();
                setUserinfo(userinfo);
            })
    }, []);
    return(
    <View style ={{flex: 1, backgroundColor: "#FAFAFA"}}>  
        <View style={{flex: 1, marginTop: 10, height: "30%", flexDirection: "row",}}>
            <View style = {{flex:1}}>
                <Text style={{marginLeft: 30, marginTop: 30, alignSelf: "flex-start"}}> 이별록 지은이 </Text>
                <Text style={{marginLeft: 33, marginTop: 20, fontWeight: "bold", fontSize: 25, alignSelf: "flex-start"}}>{userinfo.iam} </Text>
                <Text style={{marginHorizontal: 30, alignSelf: "flex-start",marginTop: 10,}}> {userinfo.selfLetter} </Text>
            </View>
            <View>
                <TouchableOpacity style= {{marginTop: 30, marginRight: 20, height: 30, width: 30, backgroundColor: "#FAFAFA", borderRadius: 5}}
                    onPress={()=>{navigation.navigate("EditProfile")}}>
                    <Icon name="edit" size={20} color = "#98C0ED"/>
                </TouchableOpacity>
            </View>
        </View>
        <View style= {{flex: 1.5, marginTop: 10}}>
            <TouchableOpacity style = {{flex: 1, flexDirection: "row", backgroundColor: "white"}} onPress={()=>{navigation.navigate("AccountInfo")}}>
                 <Text style = {{flex: 1, alignSelf: "center", marginTop: 10, marginHorizontal: 30, fontSize: 15, fontWeight: "bold", color: "grey"}}> 계정 정보 </Text>
                 <Icon style = {{marginTop: 20, alignSelf: "center", marginRight: 15}} name="right" size= {15} color = "grey"/>
            </TouchableOpacity>
            <TouchableOpacity style = {{flex: 1, flexDirection: "row", marginTop: 2, backgroundColor: "white"}} onPress={()=>{navigation.navigate("Notification")}}>
                <Text style = {{flex: 1, alignSelf: "center", marginTop: 10, marginHorizontal: 30, fontSize: 15, fontWeight: "bold", color: "grey"}}> 공지사항 </Text>
                <Icon style = {{marginVertical: 20, alignSelf: "center", marginRight: 15}} name="right" size= {15} color = "grey"/>
            </TouchableOpacity>
            {/* <TouchableOpacity style = {{flex: 1, flexDirection: "row", marginTop: 2, backgroundColor: "white"}} onPress={()=>{navigation.navigate("MarketingSetting")}}>
                <Text style = {{flex: 1, alignSelf: "center", marginTop: 10, marginHorizontal: 30, fontSize: 15, fontWeight: "bold", color: "grey"}}> 알림 설정 </Text>
                <Icon style = {{marginVertical: 20, alignSelf: "center", marginRight: 15}} name="right" size= {15} color = "grey"/>
            </TouchableOpacity> */}
            <TouchableOpacity style = {{flex: 1, flexDirection: "row", marginTop: 2, backgroundColor: "white"}} onPress={()=>{navigation.navigate("Policy")}}>
               <Text style = {{flex: 1, alignSelf: "center", marginTop: 10, marginHorizontal: 30, fontSize: 15, fontWeight: "bold", color: "grey"}}> 약관 및 정책 </Text> 
               <Icon style = {{marginVertical: 20, alignSelf: "center", marginRight: 15}} name="right" size= {15} color = "grey"/>
            </TouchableOpacity>
        </View>
        <View style={{flex:1}}></View>
    </View>
    )
}
// const styles = StyleSheet.create({
// })
export default Account;