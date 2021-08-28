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
        <View style={{flex:1, }}>
        <SafeAreaView style={{flex:1, marginHorizontal:"5%", marginVertical: "3%"}}>
            <View style= {{flex: 1, }}>
                <TouchableOpacity style={{flexDirection : "row", borderRadius: 10, backgroundColor: "white", marginVertical: "2%"}}
                onPress={() => { navigation.navigate('QuestionList',{Color:"#9E001C"})}}>
                    <Icon name = "login" size = {30} color="#9E001C"/>
                    <View style= {{flex: 40, paddingLeft: "5%", paddingTop: "7%", paddingBottom: "6%"}}>
                        <Text style={{fontSize: 20, fontWeight: "700"}}>빨간 감정</Text> 
                        <Text style={{fontSize: 13, marginTop: "3%"}}> 
                        활활 타오르다 꺼져 버리는 {"\n"}
                        가득 물들다 터져 버리는 {"\n"}
                        펄펄 끓어 오르다 흘러 넘치는
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection : "row", borderRadius: 10, backgroundColor: "white", marginVertical: "2%"}}
                onPress={() => { navigation.navigate('QuestionList',{Color:"#F6AE2D"})}}>
                <Icon name = "login" size = {30} color="#F6AE2D"/>
                    <View style= {{flex: 40, paddingLeft: "5%", paddingTop: "7%", paddingBottom: "6%"}}>
                        <Text style={{fontSize: 20, fontWeight: "700"}}> 노란 감정 </Text>
                        <Text style={{fontSize: 13, marginTop: "3%"}}> 
                        따갑게 내리 쬐는 {"\n"}함박 웃음 짓는 {"\n"}한아름 품에 안은   </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection : "row", borderRadius: 10, backgroundColor: "white", marginVertical: "2%"}}
                onPress={() => { navigation.navigate('QuestionList',{Color:"#33658A"})}}>
                <Icon name = "login" size = {30} color="#33658A"/>
                    <View style= {{flex: 40, paddingLeft: "5%", paddingTop: "7%", paddingBottom: "6%"}}>
                        <Text style={{fontSize: 20, fontWeight: "700"}}> 파란 감정 </Text>
                        <Text style={{fontSize: 13, marginTop: "3%"}}> 
                        싸늘하게 남겨지는 {"\n"}새파랗게 떨어지는 {"\n"}차분하게 질식하는   </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection : "row", borderRadius: 10, backgroundColor: "white", marginVertical: "2%"}}
                onPress={() => { navigation.navigate('QuestionList',{Color:"#494949"})}}>
                <Icon name = "login" size = {30} color="#494949"/>
                    <View style= {{flex: 40, paddingLeft: "5%", paddingTop: "7%", paddingBottom: "6%"}}>
                        <Text style={{fontSize: 20, fontWeight: "700"}}> 검정 감정 </Text>
                        <Text style={{fontSize: 13, marginTop: "3%"}}>
                        고요하게 침잠하는 {"\n"}발자국 남기지 않고 찾아와 곁에 앉은 {"\n"}아무 소리 내지 못하게 집어 삼키는  </Text>
                    </View>
                </TouchableOpacity>
            </View>

                {/* <View style={{flex: 1, }}>
                    <View style={{flex: 1, flexDirection: "row", margin: 4, alignSelf: "center"}}> 
                        <TouchableOpacity style={{  borderRadius: 30, height:"100%", width: "50%", backgroundColor: 'rgba(158, 0, 28, 0.2)', margin: 4}}
                            onPress={() => { navigation.navigate('QuestionList',{Color:"#9E001C"})}}>
                                <Text style={{fontSize: 27, fontWeight: "700", color: "#9E001C", marginLeft: "5%", marginTop: "40%"}}>빨간 감정</Text>
                                <Text style={{fontSize: 12, color: "#9E001C", marginLeft: "3%", marginTop: "15%"}}>
                                    활활 타오르다 꺼져 버리는 {"\n"}
                                    가득 물들다 터져 버리는,{"\n"}
                                    펄펄 끓어 오르다 흘러 넘치는, {"\n"}
                                    </Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={{  borderRadius: 30, height:"100%", width: "50%", backgroundColor: 'rgba(51, 101, 138, 0.2)', margin: 4}}
                            onPress={() => { navigation.navigate('QuestionList',{Color:"#33658A"})}}>
                                <Text style={{fontSize: 27, fontWeight: "700", color: "#33658A", marginLeft: "3%", marginTop: "40%"}}>파란 감정</Text>
                                <Text style={{fontSize: 12, color: "#33658A", marginLeft: "3%", marginTop: "15%"}}>
                                    싸늘하게 남겨지는{"\n"}
                                    새파랗게 떨어지는{"\n"}
                                    차분하게 질식하는{"\n"}
                                    </Text>
                         </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: "row", margin: 4, alignSelf: "center"}}> 
                        <TouchableOpacity style={{ borderRadius: 30, height:"100%", width: "50%", backgroundColor: 'rgba(246, 174, 45, 0.15)', margin: 4}}
                            onPress={() => { navigation.navigate('QuestionList',{Color:"#F6AE2D"})}}>
                                    <Text style={{fontSize: 27, fontWeight: "700", color: "#F6AE2D", marginLeft: "3%", marginTop: "40%"}}>노란 감정</Text>
                                    <Text style={{fontSize: 12, color: "#F6AE2D", marginLeft: "3%", marginTop: "15%"}}>
                                        따갑게 내리 쬐는{"\n"}
                                        함박 웃음 짓는{"\n"}
                                        한아름 품에 안은{"\n"}
                                    </Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={{ borderRadius: 30, height:"100%", width: "50%", backgroundColor: 'rgba(73, 73, 73, 0.2)', margin: 4}}
                            onPress={() => { navigation.navigate('QuestionList',{Color:"#494949"})}}>
                                <Text style={{fontSize: 27, fontWeight: "700", color: "#000", marginLeft: "3%", marginTop: "40%"}}>검정 감정</Text>
                                <Text style={{fontSize: 12, color: "#000", marginLeft: "3%", marginTop: "10%"}}>
                                한없이 가라앉는{"\n"}
                                발자국 자국 남기지 않고 곁에 앉은{"\n"}
                                아무 소리 내지 못하게 집어 삼키는{"\n"}
                                고요하게 침잠하는{"\n"}
                                </Text>
                         </TouchableOpacity>
                    </View>
                </View> */}
        </SafeAreaView>
        </View>
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
