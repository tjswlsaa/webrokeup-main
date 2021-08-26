import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions ,Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import { firebase_db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';
import { useHeaderHeight } from '@react-navigation/stack';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height';

const QuestionPallete = ({ navigation, route }) => {
    const headerHeight = useHeaderHeight();
    const ScreenHeight = Dimensions.get('window').height   //height
    const BottomSpace = getBottomSpace()
    const statusBarHeight = getStatusBarHeight();
    const realScreen = ScreenHeight-headerHeight-BottomSpace

    return (
        <SafeAreaView style={{flex:1}}>

                <View style={{flexDirection:"row", marginHorizontal:"5%"}}>
                        <TouchableOpacity style={{  borderRadius: 25, height: realScreen*0.045,  width: realScreen*0.045,backgroundColor: "#9E001C",justifyContent:'center' }}
                            onPress={() => { navigation.navigate('QuestionList',{Color:"#9E001C"})}}>
                         </TouchableOpacity>
                         <TouchableOpacity style={{ borderRadius: 25, height: realScreen*0.045, width: realScreen*0.045,backgroundColor: "#F6AE2D",justifyContent:'center' }}
                            onPress={() => { navigation.navigate('QuestionList',{Color:"#F6AE2D"})}}>
                         </TouchableOpacity>
                         <TouchableOpacity style={{  borderRadius: 25, height: realScreen*0.045, width: realScreen*0.045,backgroundColor: "#33658A",justifyContent:'center' }}
                            onPress={() => { navigation.navigate('QuestionList',{Color:"#33658A"})}}>
                         </TouchableOpacity>
                         <TouchableOpacity style={{ borderRadius: 25, height: realScreen*0.045, width: realScreen*0.045,backgroundColor: "#494949",justifyContent:'center' }}
                            onPress={() => { navigation.navigate('QuestionList',{Color:"#494949"})}}>
                         </TouchableOpacity>
                </View>


        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F4F4",
        flex: 1
    },
    bookCoverContainer: {
        width: 200,
        height: 200,
        marginTop: "0%",
        alignSelf: "center",
        flexDirection: "row",


    },
    bookCoverImage: {
        marginTop: "7%",
        height: 200,
        width: 200,
        alignSelf: "center",
        resizeMode: "contain",
        backgroundColor: "pink"
    },
    bookInfoContainer: {
        backgroundColor: "#F5F4F4",
        width: '90%',
        height: 100,
        alignSelf: "center",

    },
    bookTitle: {
        fontSize: 15,
        marginTop: "7%",
        fontSize: 15,
        alignSelf: "center"
    },
    bookDesc: {
        marginTop: "4%",
        marginLeft: "10%",
    },
    subButton: {
        width: "50%",
        height: 27,
        padding: "2%",
        backgroundColor: "#C4C4C4",
        borderRadius: 15,
        margin: "2%",
        marginLeft: "0%",
        marginTop: "5%",
        alignSelf: "center",
    },
    subButtonText: {
        color: "white",
        fontWeight: "200",
        //텍스트의 현재 위치에서의 정렬 
        textAlign: "center"
    },
    bookIndexContainer: {
        backgroundColor: '#fff',
    },
    bookIndexOne: {
        marginTop: "5%",
        marginLeft: "5%",
        marginRight: "3%",
        marginBottom: "5%"
    },
    bookIndexOneTitle: {
        fontSize: 15,
    },
    bookIndexOnePunchLine: {
        fontWeight: '700',
        marginLeft: "5%",
        marginTop: "2%",
    },
    bookIndexText: {
        marginLeft: "5%",
        marginTop: "2%",
    },
    editButton: {
        // backgroundColor:"yellow",
        marginLeft: "80%",
        justifyContent: "center",
        marginTop: 15


    },
    deleteButton: {
        marginLeft: "7%",
        backgroundColor: "blue",
        justifyContent: "center"

    },
    editSection: {
        height: 40,
        // backgroundColor:"green",
        flexDirection: "row",

    },
    editButtonText: {
    }
})
export default QuestionPallete;
