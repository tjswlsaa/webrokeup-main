import React, { useEffect, useState } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Dimensions, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import firebase from 'firebase/app'
import Swiper from 'react-native-swiper'
import backgroundimage from '../../assets/backgroundimage.jpg'
import BookComponent from '../../components/BookComponent';
import { useHeaderHeight } from '@react-navigation/stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import tutorialTwoIs from '../../assets/low_2.png';
import tutorialThreeIs from '../../assets/low_3.png';
import tutorialFourIs from '../../assets/low_4.png';
import tutorialOneIs from '../../assets/low_1.png';


const test2 = {
    item: ""
}
const onboarding = ({ navigation }) => {

    const headerHeight = useHeaderHeight();
    const ScreenHeight = Dimensions.get('window').height   //height
    const ScreenWidth = Dimensions.get('window').width
    console.log(ScreenWidth)
    const BottomSpace = getBottomSpace()
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight - headerHeight - BottomSpace 
    const [swiper, setSwiper] = useState(null);

    return (
            <View style={{ flex: 1 }}>
                <StatusBar style="white" />
              
                        <View style={{ flex: 1, width: "100%", }}>
                            <Swiper
                                // index={myBook.bookKey}
                                loop={false}
                                showsPagination={true}
                                onSwiper={setSwiper}
                                showsButtons={false}
                                dot={
                                    <View style={{           // unchecked dot style
                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                        width: 10,
                                        height: 10,
                                        borderRadius: 4,
                                        marginLeft: 10,
                                        marginRight: 9,
                                    }}
                                    />}
                                activeDot={<View style={{    // selected dots style
                                    backgroundColor: "#21381C",
                                    width: 10,
                                    height: 10,
                                    borderRadius: 4,
                                    marginLeft: 10,
                                    marginRight: 9,
                                }} />}
                            >
                                   <View style={{flex:1, backgroundColor:"white"}}>
                                    <Image style={{height:"100%", width:"99%", alignSelf:"center", resizeMode:"contain", marginTop:"5%"}} source={tutorialOneIs} ></Image>
                                    </View>
    <View style={{flex:1, backgroundColor:"white"}}>
                                    <Image style={{height:"100%", width:"99%", alignSelf:"center", resizeMode:"cover", marginTop:"5%"}} source={tutorialTwoIs} ></Image>
                                    </View>

                                    <View style={{flex:1, backgroundColor:"white"}}>
                                    <Image style={{height:"100%", width:"99%", alignSelf:"center", resizeMode:"cover", marginTop:"5%"}} source={tutorialThreeIs} ></Image>
                                    </View>

                                    <View style={{flex:1, backgroundColor:"white"}}>
                                    <Image style={{height:"100%", width:"99%", alignSelf:"center", resizeMode:"cover", marginTop:"5%"}} source={tutorialFourIs} ></Image>
                                    </View>

     
                            </Swiper>
                        </View>
                    
                    
                </View>
    )
}
AppRegistry.registerComponent('onboarding', () => SwiperComponent)
export default onboarding;