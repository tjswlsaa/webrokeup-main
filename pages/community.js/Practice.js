import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Dimensions, ImageBackground, ScrollView, TextInput, Alert, Switch, Touchable} from 'react-native';
import { firebase_db } from '../../firebaseConfig';
import firebase from 'firebase/app'
import { useHeaderHeight } from '@react-navigation/stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';

const Practice = ({navigation}) => {



//Iphone X 이전의 버전에서는 상태표시줄을 제외한 부분을 SafeAreaView의 영역이다. 그래서 Status Bar의 Height만 제외해 주면 된다.->HeaderHeight
//Iphone X 이전의 버전에서는 상태표시줄 뿐만이 아니라 Home Indicator 의 부분도 제외를 해줘야 SafeAreaView의 영역이다.->BottomSpace

const headerHeight = useHeaderHeight();
const ScreenWidth = Dimensions.get('window').width  //screen 너비
const ScreenHeight = Dimensions.get('window').height   //height
const BottomSpace = getBottomSpace()
const tabBarHeight = useBottomTabBarHeight();
const statusBarHeight= getStatusBarHeight()

console.log('시작!')

console.log('headerHeight',headerHeight)
console.log('ScreenWidth',ScreenWidth)
console.log('ScreenHeight',ScreenHeight)
console.log('BottomSpace',BottomSpace)
console.log('tabBarHeight',tabBarHeight)
console.log('statusBarHeight',statusBarHeight)
console.log('realScreen',realScreen)

const realScreen = ScreenHeight-headerHeight-BottomSpace-tabBarHeight

    return(
        <SafeAreaView style= {{flex: 1, backgroundColor: "pink"}}>
            {/* <View style= {{height:553,marginHorizontal:"4%",backgroundColor: "green"}}>
            </View> */}
            {/* <View style= {{ marginHorizontal:"4%",backgroundColor: "black"}}> */}
                <ScrollView  style= {{ backgroundColor: "blue"}} >
                    <View style={{height:realScreen/2, backgroundColor:"white"}}>


                    </View>  
                     <View style={{height:realScreen/2, backgroundColor:"purple"}}>
   
                        <Text>1111</Text>
            
                     </View>
                      
                </ScrollView>
            {/* </View> */}

        </SafeAreaView>
    )
}
export default Practice;