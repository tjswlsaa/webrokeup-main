import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';


export default function HomePage({navigation}) {
  return (
    <View style={styles.container}>
    
      <View style={styles.textContainer}>
        <Text style={styles.title}>이별록</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.todayTextContainer}>
          <View><Text style={styles.recordOfTheDay}>오늘의 이별록 </Text></View>
          <TouchableOpacity><Text>더보기</Text></TouchableOpacity>
        </View>
        <ScrollView style={styles.cardContainer} horizontal = {true}>
          <TouchableOpacity style={styles.recordOfTheDay01}><Text>Best1</Text></TouchableOpacity>
          <TouchableOpacity style={styles.recordOfTheDay02}><Text>Best2</Text></TouchableOpacity>
          <TouchableOpacity style={styles.recordOfTheDay03}><Text>Best3</Text></TouchableOpacity>
          <TouchableOpacity style={styles.recordOfTheDay03}><Text>Best4</Text></TouchableOpacity>
          <TouchableOpacity style={styles.recordOfTheDay03}><Text>Best5</Text></TouchableOpacity>
        </ScrollView> 
        <ScrollView><Text>왜 안 보일까</Text></ScrollView>

        <View style={styles.recentUploads}>
          <Text style={styles.recentUploadsTitle}>최신 이별록</Text>
          <ScrollView>
            <View><Text>예시1</Text></View>
          </ScrollView>
        </View>
      </View>
    
     

    </View>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9EC'
  },
  textContainer:{
    marginLeft: 20,
    marginTop: 70,
  },
  title:{
    fontSize: 20,
    fontWeight: "600",
    color: "#D4AF37"
  },
  mainContainer:{
    borderWidth: 1,
    marginTop: 20,
    alignSelf: "center",
    width: "90%",
    height: "90%"
  },
  recordOfTheDay: {
    fontSize: 17,
    fontWeight: "500"
  },
  cardContainer:{
    marginTop: 20,
    backgroundColor: "red",
    width: "100%",
    height: 300
  },
  recordOfTheDay01: {
    backgroundColor: "grey",
    width: 150,
    height: 200
  },
  recordOfTheDay02:{
    backgroundColor: "grey",
    width: 150,
    height: 200,
    marginLeft: 15
  
  },
  recordOfTheDay03:{
    backgroundColor: "grey",
    width: 150,
    height: 200,
    marginLeft: 15
  },
  recentUploads:{
    marginTop:10,
    width: 370,
    height: 400,
    backgroundColor: "yellow"
  },
  recentUploadsTitle:{
    fontSize: 17,
    fontWeight: "500"
  },
  
})