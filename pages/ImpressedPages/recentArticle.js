import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';


const recentArticle = ({navigation,route}) => {

    const aboutImage = "http://ojsfile.ohmynews.com/STD_IMG_FILE/2018/0309/IE002297749_STD.jpg"
  

    return (

        <ScrollView style={styles.container}>
                <TouchableOpacity style={styles.bookIndexOne} onPress={()=>{navigation.navigate('readArticle')}}>
                        <Text style={styles.bookIndexOneTitle}>01 이별 그 순간</Text>  
                        <Text style={styles.bookIndexOnePunchLine}>"먼 훗날 나를 읽게 된다면 너는 잠시 울어줄까"</Text>  
                        <Text style={styles.bookIndexText}>날이 더웠다. 햇빛이 뜨거워서 살이 익는 것 같았다. 나를 보는 네 표정이 좋지 않은게 날씨 탓도 있지 않을까 생각했다.</Text>  
                </TouchableOpacity>
                <View style={{borderBottomColor: "#d3d3d3" ,borderBottomWidth: 1,}}/>
        
                <TouchableOpacity style={styles.bookIndexOne} onPress={()=>{navigation.navigate('readArticle')}}>
                        <Text style={styles.bookIndexOneTitle}>01 이별 그 순간</Text>  
                        <Text style={styles.bookIndexOnePunchLine}>"먼 훗날 나를 읽게 된다면 너는 잠시 울어줄까"</Text>  
                        <Text style={styles.bookIndexText}>날이 더웠다. 햇빛이 뜨거워서 살이 익는 것 같았다. 나를 보는 네 표정이 좋지 않은게 날씨 탓도 있지 않을까 생각했다.</Text>  
                </TouchableOpacity>
                <View style={{borderBottomColor: "#d3d3d3" ,borderBottomWidth: 1,}}/>
        
                <TouchableOpacity style={styles.bookIndexOne} onPress={()=>{navigation.navigate('readArticle')}}>
                        <Text style={styles.bookIndexOneTitle}>01 이별 그 순간</Text>  
                        <Text style={styles.bookIndexOnePunchLine}>"먼 훗날 나를 읽게 된다면 너는 잠시 울어줄까"</Text>  
                        <Text style={styles.bookIndexText}>날이 더웠다. 햇빛이 뜨거워서 살이 익는 것 같았다. 나를 보는 네 표정이 좋지 않은게 날씨 탓도 있지 않을까 생각했다.</Text>  
                </TouchableOpacity>
                <View style={{borderBottomColor: "#d3d3d3" ,borderBottomWidth: 1,}}/>
        
                <TouchableOpacity style={styles.bookIndexOne} onPress={()=>{navigation.navigate('readArticle')}}>
                        <Text style={styles.bookIndexOneTitle}>01 이별 그 순간</Text>  
                        <Text style={styles.bookIndexOnePunchLine}>"먼 훗날 나를 읽게 된다면 너는 잠시 울어줄까"</Text>  
                        <Text style={styles.bookIndexText}>날이 더웠다. 햇빛이 뜨거워서 살이 익는 것 같았다. 나를 보는 네 표정이 좋지 않은게 날씨 탓도 있지 않을까 생각했다.</Text>  
                </TouchableOpacity>
                <View style={{borderBottomColor: "#d3d3d3" ,borderBottomWidth: 1,}}/>
        
                <TouchableOpacity style={styles.bookIndexOne} onPress={()=>{navigation.navigate('readArticle')}}>
                        <Text style={styles.bookIndexOneTitle}>01 이별 그 순간</Text>  
                        <Text style={styles.bookIndexOnePunchLine}>"먼 훗날 나를 읽게 된다면 너는 잠시 울어줄까"</Text>  
                        <Text style={styles.bookIndexText}>날이 더웠다. 햇빛이 뜨거워서 살이 익는 것 같았다. 나를 보는 네 표정이 좋지 않은게 날씨 탓도 있지 않을까 생각했다.</Text>  
                </TouchableOpacity>
                <View style={{borderBottomColor: "#d3d3d3" ,borderBottomWidth: 1,}}/>
        
                <TouchableOpacity style={styles.bookIndexOne} onPress={()=>{navigation.navigate('readArticle')}}>
                        <Text style={styles.bookIndexOneTitle}>01 이별 그 순간</Text>  
                        <Text style={styles.bookIndexOnePunchLine}>"먼 훗날 나를 읽게 된다면 너는 잠시 울어줄까"</Text>  
                        <Text style={styles.bookIndexText}>날이 더웠다. 햇빛이 뜨거워서 살이 익는 것 같았다. 나를 보는 네 표정이 좋지 않은게 날씨 탓도 있지 않을까 생각했다.</Text>  
                </TouchableOpacity>
                <View style={{borderBottomColor: "#d3d3d3" ,borderBottomWidth: 1,}}/>
        
                <TouchableOpacity style={styles.bookIndexOne} onPress={()=>{navigation.navigate('readArticle')}}>
                        <Text style={styles.bookIndexOneTitle}>01 이별 그 순간</Text>  
                        <Text style={styles.bookIndexOnePunchLine}>"먼 훗날 나를 읽게 된다면 너는 잠시 울어줄까"</Text>  
                        <Text style={styles.bookIndexText}>날이 더웠다. 햇빛이 뜨거워서 살이 익는 것 같았다. 나를 보는 네 표정이 좋지 않은게 날씨 탓도 있지 않을까 생각했다.</Text>  
                </TouchableOpacity>
        </ScrollView>
            )}
        
            
        const styles = StyleSheet.create({
                container : {
                        backgroundColor: "white"
                },
        
            bookIndexOne: {
                marginTop:"5%",
              marginLeft:"5%",
              marginRight:"3%",
              marginBottom:"5%",
            },
        
            bookIndexOneTitle: {
                fontSize: 15,
        
        
            },
            bookIndexOnePunchLine:{
                fontWeight: '700',
                marginLeft:"5%",
                marginTop:"2%",
        
        
            },
            bookIndexText :{
                marginLeft:"5%",
                marginTop:"2%",
        
        
            },
          
        
        
        
        
        
         })
        
export default recentArticle;
