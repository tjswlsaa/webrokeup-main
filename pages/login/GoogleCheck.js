import React, {useEffect, useState} from 'react';
import { View, ScrollView, Text, StyleSheet, Share, TextInput, TouchableOpacity, KeyboardAvoidingView, Modal, TouchableHighlight, Platform, SafeAreaView, Button, DatePickerIOS, DatePickerAndroid, Alert } from 'react-native';
import { Picker, Header, Left, Body, Right, Title } from "native-base";
import firebase from 'firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import CheckBox from 'react-native-checkbox';
import * as Google from 'expo-google-app-auth'
import "firebase/auth";
// import { GoogleSignin } from 'react-native-google-signin';

const GoogleCheck  = ({navigation,route}) => {
    const [gender, setGender] = useState('');
  const [date, setDate] = useState(moment());
  const [show, setShow] = useState(false);
  const defaultDate = new Date(date);
  const [checked, setChecked] = useState(false);

  const onChange = (e, selectedDate) => {
    setDate(moment(selectedDate))
  }
  const onCancelPress = () => {
    setDate(moment(defaultDate))
    setShow(false)
  }
  const onDonePress = () => {
    const onDateChange = () => {
     // console.log('여기서는 date나오나',date)
      setDate(date)
    };
    setShow(false)
    return onDateChange
  }

  const handleSignUp = async (gender, date) => {
   // console.log('handleSignUp()');
    //// console.log({ email, password, confirmPassword });
    //// console.log({gender, date})

    if (gender == ""){
      Alert.alert("성별을 입력주세요");
      return;
    }
   // console.log('gender is',gender)

    if (moment(new Date(date)).format('YYYY년 MM월 DD일')== moment(new Date()).format('YYYY년 MM월 DD일')){
      Alert.alert("생년월일을 입력해주세요");
      return;
    }
   // console.log(' date is',  moment(new Date(date)).format('YYYY년 MM월 DD일') )
   // console.log('default date is',  moment(new Date()).format('YYYY년 MM월 DD일') )

   

    // if (checked == false) {
    //   Alert.alert("약관에 동의해주세요")
    //   return; 
    // }

    signInWithGoogleAsync()
   
  }

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  const onSignIn = googleUser => {
   // console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
       // console.log("1")
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
         // console.log("credential확인좀하자",credential)
          //// console.log("credential확인좀하자22",oauthAccessToken)
         // console.log("credential확인좀하자333",googleUser.idToken)
         // console.log("credential확인좀하자44",googleUser.idToken)


          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function(result) {
             // console.log("3")
             // console.log('user signed in ');
              if (result.additionalUserInfo.isNewUser) {
               // console.log("4")
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    method:"gmail 회원가입",
                    email: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    user_uid:result.user.uid,
                    iam:result.user.uid.substring(0,6)+".지은이", 
                    selfLetter: "안녕하세요. 이별록 작가" + result.user.uid.substring(0,6) + "입니다" , 
                    created_at: Date.now(),
                    idToken:googleUser.idToken,
                    accessToken:googleUser.accessToken,
                    gender:gender,
                    birth:moment(new Date(date)).format('YYYY년 MM월 DD일')
                  })
                  .then(function(snapshot) {
                   // console.log("5")
                   // console.log('Snapshot', snapshot)

                  });
                  Alert.alert("회원가입 완료!")

                //   navigation.navigate("emailSignup", { user_uid: result.user.uid })

              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function(error) {
             // console.log("6")
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
         // console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };
 


      const signInWithGoogleAsync = async () => {
        try {
          const result = await Google.logInAsync({
            // androidClientId: YOUR_CLIENT_ID_HERE,
            iosClientId: "34800305578-6itscrs0mg3t5m6p4asbdathmabl8nqt.apps.googleusercontent.com",
            scopes: ['profile', 'email']
          });
          if (result.type === 'success') {
            const { idToken, accessToken } = result;
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            firebase
            .auth()
            .signInWithCredential(credential)
            onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      };

  
 // console.log('gener!!',gender)
 // console.log('약관 동의',checked)

    return(

        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, marginVertical: "10%" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon style={{ marginHorizontal: "10%" }} name="arrowleft" size="20" color="black" />
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginHorizontal: "5%" }}>
                        <Text style={{ fontSize: 20, marginTop: "10%" }}> 안녕하세요, 이별로거님 </Text>
                        <Text style={{ fontSize: 20, marginBottom: "10%" }}> 약관 동의 후 로그인을 진행해주세요 </Text>
                        <View style={{flex:1}}>
                            <View style={{ flex: 1 }}>
                                <View>
                                    <Text style={{ fontSize: 15 }}> 성별 </Text>
                                </View>
                                <Picker
                                    placeholder="선택"
                                    placeholderStyle={{ fontSize: 16, fontWeight: "300" }}
                                    mode="dropdown"
                                    // headerBackButtonText="취소"
                                    style={{ marginTop: "2%", width: "100%", paddingVertical: "4%", borderWidth: 1, borderColor: "#E2E2E2" }}
                                    selectedValue={gender}
                                    onValueChange={(gender) => setGender(gender)}
                                    renderHeader={backAction =>
                                    <Header style={{ backgroundColor: "#fafafa", borderBottomWidth: 0 }}>
                                        <Left style={{paddingLeft: 15}}>
                                        <Text style={{fontSize: 17}}></Text>
                                        </Left>
                                        <Body style={{ flex: 3 }}>
                                        <Text style={{fontSize: 17}}>당신의 성별은</Text>
                                        </Body>
                                        <Right />
                                    </Header>}
                                    itemStyle={{
                                    alignSelf:"center",
                                    width: "90%",
                                    color: "red",
                                    paddingVertical: "10%"
                                    }}
                                >
                                    <Picker.Item label="여성" value="female" />
                                    <Picker.Item label="남성" value="male" />
                                    <Picker.Item label="선택안함" value="prefer not to say" />

                                </Picker>
                                </View>
                        <View style={{ flex: 1, marginTop: "10%" }}>
                        <Text style={{ fontSize: 15, }}> 생년월일</Text>
                        <TouchableHighlight
                            style={{ flex: 1, borderWidth: 1, borderColor: "#E2E2E2", marginTop: "2%" }}
                            activeOpacity={0}
                            onPress={() => { setShow(true) }}>
                            <View>
                            <Text style={{ fontSize: 15, paddingVertical: 15, paddingHorizontal: 10, fontSize: 15, borderBottomWidth: 1, borderBottomColor: "black" }}> {date.format('YYYY-MM-DD')}</Text>
                            <Modal
                                transparent={true} animationType="slide" visible={show} supportedOrientations={['portrait']} onRequestClose={() => setShow(false)}>
                                <View style={{ flex: 1 }}>
                                <TouchableHighlight
                                    style={{ flex: 1, alignItems: 'flex-end', flexDirection: "row" }}
                                    activeOpacity={1}
                                    visible={show}
                                    onPress={() => { setShow(false) }}>
                                    <TouchableHighlight
                                    underlayColor={'#FFFFFF'}
                                    style={{ flex: 1, }}>
                                    <View style={{ backgroundColor: "white", height: 256, overflow: 'hidden' }}>
                                        <View style={{ marginTop: 20 }}>
                                        <DateTimePicker
                                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                            locale='ko'
                                            timeZoneOffsetInMinutes={0}
                                            value={new Date(date)}
                                            mode="date"
                                            minimumDate={new Date(moment().subtract(120, 'years').format('YYYY-MM-DD'))}
                                            maximumDate={new Date(moment().format('YYYY-MM-DD'))}
                                            onChange={onChange} />
                                        </View>

                                        <TouchableHighlight
                                        underlayColor={'transparent'} onPress={onCancelPress} style={{ position: 'absolute', top: 0, height: 42, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', left: 0 }}>
                                        <Text>취소</Text>
                                        </TouchableHighlight>

                                        <TouchableHighlight
                                        underlayColor={'transparent'} onPress={onDonePress} style={{ position: 'absolute', top: 0, height: 42, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', right: 0 }}>
                                        <Text>완료</Text>
                                        </TouchableHighlight>

                                    </View>
                                    </TouchableHighlight>
                                </TouchableHighlight>
                                </View>
                            </Modal>
                            </View>
                        </TouchableHighlight>
                        </View>
                    

                            {/* <View>
                                <View style={{flexDirection:"row", height:20,marginTop:10}}>
                                <CheckBox
                                    label=''
                                    value={true}
                                    onChange={(checked)=>setChecked(checked)}
                                />

                                <TouchableOpacity><Text style={{marginLeft:10, marginTop:3, fontWeight:"700"}} onPress={()=>navigation.navigate('policyoneforlogin')}>이용 약관</Text></TouchableOpacity>
                                <Text style={{marginLeft:10, marginTop:3}}>및</Text>
                                <TouchableOpacity onPress={()=>navigation.navigate('policytwoforlogin')}><Text style={{marginLeft:10, marginTop:3, fontWeight:"700"}} >개인정보 처리방침</Text></TouchableOpacity>
                                <Text style={{marginLeft:10, marginTop:3}}>동의</Text>

                                <Text style={{marginLeft:10, marginTop:3}}>서비스 이용약관 전체 동의</Text>
                                </View>


                            </View> */}


                        </View>
                        <TouchableOpacity style={{ marginTop: "20%", alignSelf: "center", borderRadius: 10, paddingVertical: "4%", paddingHorizontal: "35%", backgroundColor:"#4cb2c8"}}
                        onPress={() => handleSignUp(gender, date)}>
                        <Text style={{ color: "white", fontSize: 17, alignSelf: "center" }}>이별록 시작하기</Text>
                        </TouchableOpacity>
                    </View>
                    
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>


    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default GoogleCheck;