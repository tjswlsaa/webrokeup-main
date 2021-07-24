import React from 'react'
import { useEffect } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity,Alert} from 'react-native'
import {StatusBar} from 'expo-status-bar';

export default function AboutPage ({navigation,route}) {
    console.disableYellowBox = true;
    const customAlert = () => {
        Alert.alert("toothless 이빨이 없어성")
      }
    const aboutImage = "http://file.newswire.co.kr/data/datafile2/thumb_480/2010/05/2039103817_20100527105820_1069435867.jpg"

    useEffect(()=>{
        navigation.setOptions({
            title:"소개페이지",
            headerStyle: {
                backgroundColor:'#1F266A',
                shadowColor: "#1F266A",
            },
            headerTintColor:'#fff',
        })
    },[])

    return (

        <View style={styles.container}>
            <StatusBar style='light'></StatusBar>
            <Text style={styles.title}>드래곤 길들이기 보셨나요?</Text>
            <View style={styles.middleCard}>
                <Image style={styles.image} source={{uri:aboutImage}} resizeMode={"cover"}/>
                <Text style={styles.desc01}>투슬리스가 제일 귀여워요</Text>
                <Text style={styles.desc02}>투슬리스 이름의 뜻은 뭘까용</Text>
                <TouchableOpacity style={styles.button} onPress={customAlert}>
                    <Text style={styles.buttonText}>정답은!</Text>
                </TouchableOpacity>
            </View> 
        </View>
      
        

    )
}

const styles = StyleSheet.create({
    title: {
        fontSize:30,
        fontWeight: "700",
        paddingTop:40,
        color:"#fff"
    },
    container: {
        flex:1,
        backgroundColor: "#8B00FF",
        alignItems:"center"
    },
    middleCard: {
        backgroundColor: "#fff",
        width:300,
        height:450,
        marginTop:50,
        borderRadius:30,
        alignItems: "center",
        justifyContent: "center"
  
        
    },
    image: {
        width:150,
        height:150,
        borderRadius:10

    },
    button: {
        padding:15,
        borderRadius:15,
        backgroundColor:"orange",
        margin:7,
    },

    buttonText: {
        textAlign: "center",
        color: "#fff",
        padding:5
        
    },
    desc01: {
        textAlign:"center",
        fontSize:20,
        fontWeight:"700",
        padding:22
    },
    desc02: {
        textAlign:"center",
        fontSize:14,
        padding:22
    }
})