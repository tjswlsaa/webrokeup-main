import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput, Alert, Switch, Touchable} from 'react-native';
import { firebase_db } from '../../firebaseConfig';
import firebase from 'firebase/app'
const MarketingSetting = () => {
    const [isEmailEnabled, setEmailNotice] = useState(true);
    const [isPushEnabled, setPushNotice] = useState(true);
    return(
        <View style={{flex: 1, backgroundColor: "#FAFAFA"}}>
            <View backgroundColor = "white" style={{padding: 20}}>
                <Text style={{marginVertical: 30, marginLeft: 10, fontSize: 17, fontWeight: "bold"}}>마케팅 정보 수신 동의</Text>
                    <View style={{flexDirection: "row", backgroundColor: "white", height: 40}}>
                        <Text style={{marginVertical: 10, marginLeft: 10, flex: 1, fontSize: 15, }}> 이메일 알림 </Text>
                        <Switch 
                            style={{marginVertical: 5}}
                            value={isEmailEnabled}
                            onValueChange={(value)=>setEmailNotice(value)}
                            trackColor={{true: "#98C0ED"}}
                        />
                    </View>
                    <View style={{flexDirection: "row", backgroundColor: "white", height: 40, marginTop: 5}}>
                        <Text style={{marginVertical: 10, marginLeft: 10, flex: 1, fontSize: 15}}> 푸쉬 알림 </Text>
                        <Switch 
                            style={{marginVertical: 5}}
                            value={isPushEnabled}
                            onValueChange={(value)=>setPushNotice(value)}
                            trackColor={{true: "#98C0ED"}}
                        />
                    </View>
            </View>
        </View>
        )
}
export default MarketingSetting;