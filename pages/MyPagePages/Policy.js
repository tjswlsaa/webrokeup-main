import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView, TextInput, Alert, Switch, Touchable} from 'react-native';
import { firebase_db } from '../../firebaseConfig';
import firebase from 'firebase/app'
const Policy = ({navigation}) => {
    return(
        <View style= {{flex: 2.5, backgroundColor: "#FAFAFA"}}>
           <View style={{flex: 1, backgroundColor: "white", marginHorizontal : 10, padding: 20}}>
                <Text style={{marginVertical: 10, fontSize: 15, fontWeight: "bold"}}>약관 및 정책</Text>
                    <View style={{flex: 1, borderwidth: 1}}>
                        <Text style={{fontSize: 15, marginVertical: 10}}> 이용 약관 </Text>
                        <Text style={{fontSize: 15, }}> 개인정보 처리방침 </Text>
                    </View>
            </View>
        </View>
    )
}
export default Policy;