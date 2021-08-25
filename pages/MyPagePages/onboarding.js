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
// import onboarding1 from '../../assets/onboarding1.PNG';
// import onboarding2 from '../../assets/onboarding2.PNG';
// import onboarding3 from '../../assets/onboarding3.PNG';


const test2 = {
    item: ""
}
const onboarding = ({ navigation }) => {
    const onboardingimage2="https://miricanvas.zendesk.com/hc/article_attachments/900002066746/________________16_.png"
    const onboardingimage= "https://lh3.googleusercontent.com/proxy/gk0CmvRC45vMYOFxGYE6pwniRsooFYGOZ84nKVLc9PLLY2ChPv6mj7gKMfkrQVvORj1jpezYxzkngiWxXLDen7cSIl46PBlEjtJ8VvFW9uhQv-k4s9mHk6wZCWT3Ye_r29PTprDOXiRhANqRa1DrbkcYThPURdU"
    const onboardingimage3="https://t1.daumcdn.net/cfile/tistory/99CCD5475B4DFA5D12"
    const headerHeight = useHeaderHeight();
    const ScreenHeight = Dimensions.get('window').height   //height
    const ScreenWidth = Dimensions.get('window').width
    console.log(ScreenWidth)
    const BottomSpace = getBottomSpace()
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight - headerHeight - BottomSpace 
    const [swiper, setSwiper] = useState(null);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FBFBFB" }}>
            <View style={{ flex: 1 }}>
                <StatusBar style="white" />
              
                        <View style={{ height: realScreen * 0.9, width: "100%", marginTop: "5%" }}>
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
                                    <View style={{backgroundColor:"yellow"}}>
                                        <Text>온보딩</Text>
                                    </View>

                                    <View>
                                    <Text>온보딩2</Text>
                                    </View>

                                    <View>
                                    <Text>온보딩3</Text>
                                    </View>

     
                            </Swiper>
                        </View>
                    
                    
                </View>
        </SafeAreaView>
    )
}
AppRegistry.registerComponent('onboarding', () => SwiperComponent)
export default onboarding;