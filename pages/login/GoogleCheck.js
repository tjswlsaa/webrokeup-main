import React, {useEffect, useState} from 'react';
import { View, ScrollView, Text, StyleSheet, Share, TextInput, TouchableOpacity, KeyboardAvoidingView, Modal, TouchableHighlight, Platform, SafeAreaView, Button, DatePickerIOS, DatePickerAndroid, Alert } from 'react-native';
import { Picker, Header, Left, Body, Right, Title } from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Google from 'expo-auth-session/providers/google';
import firebase from 'firebase';
import "firebase/auth";
import { firebase_db } from '../../firebaseConfig';

const GoogleCheck = ({ navigation, route }) => {
  const [gender, setGender] = useState('');
  const [date, setDate] = useState(moment());
  const [show, setShow] = useState(false);
  const defaultDate = new Date(date);
  const [checked, setChecked] = useState(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // androidClientId: YOUR_CLIENT_ID_HERE,
    // webClientId:"893078063657-hqlb9pf8sdkqmriffualtcie04am0sjb.apps.googleusercontent.com",
    iosClientId: "893078063657-dnf375hiptljg5t7hltutq290n00gi5u.apps.googleusercontent.com",
    expoClientId: '893078063657-mmmhu8trmjtok0mslsl015ec0hc7no30.apps.googleusercontent.com',
  });

  // request: Google.useIdTokenAuthRequest()가 준비가 되면 true가 된다
  // promptAsync(): expo를 통해서 구글 로그인 창을 띄워준다
  // response: promptAsync()로 구글 로그인이 끝나면, response가 변경된다

  useEffect(callbackGoogleLogin, [response]);
  // useEffect(callbackGoogleLogin, [response]): response가 변경되면, callbackGoogleLogin()를 호출한다

  // callbackGoogleLogin: response.params.id_token을 통해 firebase에 로그인을 한다.
  function callbackGoogleLogin() {
    if (response?.type !== 'success') {
      return; // early return
    }

    const { id_token } = response.params;
    const googleAuthProviderCredential = firebase.auth.GoogleAuthProvider.credential(id_token);
    firebase.auth()
      .signInWithCredential(googleAuthProviderCredential)
      .then(signInUserCredential => {
        afterSignInWithCredential(signInUserCredential, googleAuthProviderCredential);
      });
  };

  // afterSignInWithCredential(): firebase 로그인이 끝나면 실행된다.
  // 신규 회원인지, 기존 회원인지 확인, 분기한다.
  function afterSignInWithCredential(signInUserCredential, googleAuthProviderCredential) {
    console.log('afterSignInWithCredential()');
    console.log({signInUserCredential, googleAuthProviderCredential});

    const { user } = signInUserCredential;
    const { uid } = user;

    firebase_db.ref(`users/${uid}/`)
      .once('value', (snapshot) => {
        const userinfo = snapshot.val();
        const isNewUser = (userinfo === null);
        if (isNewUser) {
          newUsersSet(signInUserCredential, googleAuthProviderCredential);

        } else { // if (isNewUser == false)
          existsUsersUpdate(signInUserCredential);
        }
      });
  }

  // 1. 새로 회원 가입하려는 사람이 구글 로그인했을 경우
  // 추가 한다
  function newUsersSet(signInUserCredential, googleAuthProviderCredential) {
    const firebaseRefUsers = {
      method: "gmail 회원가입",
      email: signInUserCredential.user.email,
      profile_picture: signInUserCredential.additionalUserInfo.profile.picture,
      first_name: signInUserCredential.additionalUserInfo.profile.given_name,
      last_name: signInUserCredential.additionalUserInfo.profile.family_name,
      user_uid: signInUserCredential.user.uid,
      iam: signInUserCredential.user.uid.substring(0, 6) + ".지은이",
      selfLetter: "안녕하세요. 이별록 작가" + signInUserCredential.user.uid.substring(0, 6) + "입니다",
      created_at: Date.now(),
      // idToken: googleAuthProviderCredential.idToken,
      // accessToken: accessToken,
      gender: gender,
      birth: moment(new Date(date)).format('YYYY년 MM월 DD일')
    };

    firebase
      .database()
      .ref('/users/' + signInUserCredential.user.uid)
      .set(firebaseRefUsers)
      .then(function (snapshot) {
        console.log({snapshot});
        // console.log("5")
        // console.log('Snapshot', snapshot)
      });
    Alert.alert("회원가입 완료!")
  }

  // 2. 이미 회원 가입된 사람이 구글 로그인했을 경우
  // last_logged_in을 update한다.
  function existsUsersUpdate(signInUserCredential) {
    firebase
      .database()
      .ref('/users/' + signInUserCredential.user.uid)
      .update({
        last_logged_in: Date.now()
      });
  }


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

 
  // const signInWithGoogleAsync = async () => {

  //   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //     // androidClientId: YOUR_CLIENT_ID_HERE,
  //     // webClientId:"893078063657-hqlb9pf8sdkqmriffualtcie04am0sjb.apps.googleusercontent.com",
  //     // iosClientId: "893078063657-dnf375hiptljg5t7hltutq290n00gi5u.apps.googleusercontent.com",
  //     expoClientId: '893078063657-mmmhu8trmjtok0mslsl015ec0hc7no30.apps.googleusercontent.com',
  //   });

  //   // React.
  //   useEffect(() => {
  //     if (response?.type === 'success') {
  //       const { id_token } = response.params;

  //       const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
  //       firebase.auth().signInWithCredential(credential);
  //     }
  //   }, [response]);

  //   // if (result.type === 'success') {
  //   //   const { idToken, accessToken } = result;
  //   //   const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
  //   //   firebase
  //   //   .auth()
  //   //   .signInWithCredential(credential)
  //   //   onSignIn(result);
  //   //   return result.accessToken;
  //   // } else {
  //   //   return { cancelled: true };
  //   // }

  // };

  
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

                        <TouchableOpacity style={{ marginTop: "20%", alignSelf: "center", borderRadius: 10, paddingVertical: "4%", paddingHorizontal: "35%", backgroundColor: "#4cb2c8" }}
                          onPress={() => signInWithGoogleAsync()}>
                          <Text style={{ color: "white", fontSize: 17, alignSelf: "center" }}>이별록 시작하기</Text>
                        </TouchableOpacity>

                        <Button
                          disabled={!request}
                          title="Login"
                          onPress={promptAsync}
                        />
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