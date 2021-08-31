import "firebase/auth";
import React, { useState,useRef } from 'react';
import { View, ScrollView, Text, StyleSheet,Keyboard , Share, TextInput, TouchableOpacity, KeyboardAvoidingView, Modal, TouchableHighlight, Platform, SafeAreaView, Button, DatePickerIOS, DatePickerAndroid, Alert } from 'react-native';
import { Picker, Header, Left, Body, Right, Title } from "native-base";
import firebase from 'firebase/app';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import CheckBox from 'react-native-checkbox';



const emailSignup = ({ navigation }) => {
  const [gender, setGender] = useState('');
  const [date, setDate] = useState(moment());
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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

  const passwordRef = useRef(null);
  const confirmRef = useRef(null);



  const checkPassword = async (password, confirmPassword) => {
    if (password !== confirmPassword) {
     // console.log('일치하지않으면?',password !== confirmPassword) //일치하지않으면 true -> 그러면 ischeckpassword는 undefined라고 반응
      // Alert.alert("비밀번호가 일치하지 않습니다!")
      return;
    }
    else {
          var regExp = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; // 8자리 이상, 숫자포함, 영소문자포함, 특수문자포함// 
          const passwordform =regExp.test(password); 
         // console.log('이거값',passwordform) //안맞으면 false라고뜸
          return passwordform; // 형식에 맞는 경우 true 리턴} // 이함수도 제대로 안되고 있는듯 
    }
  }


  const passwordFormat = (password) => {
    var regExp = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; 
    const check= regExp.test(password)
   // console.log('그린라이트', check)
    return check
  }
 // console.log('제발그리뉴ㅠㅠ',passwordFormat(password))

  const checkEmail = (email) => {
   // console.log('checkEmail()');
   // console.log({ email });
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // 대문자넣어도 통과 
    const isCheckEmail = regExp.test(email);
   // console.log({ isCheckEmail });
    return isCheckEmail;
    // return regExp.test(email); // 형식에 맞는 경우 true 리턴
    //여기에 중복확인 함수 넣고 싶다....
  }
  const handleSignUp = async (gender, date, email, password, confirmPassword) => {
   // console.log('handleSignUp()');
    //// console.log({ email, password, confirmPassword });
    //// console.log({gender, date})

    // if (gender == ""){
    //   Alert.alert("성별을 입력주세요");
    //   return;
    // }
   // console.log('gender is',gender)

    // if (moment(new Date(date)).format('YYYY년 MM월 DD일')== moment(new Date()).format('YYYY년 MM월 DD일')){
    //   Alert.alert("생년월일을 입력해주세요");
    //   return;
    // }
   // console.log(' date is',  moment(new Date(date)).format('YYYY년 MM월 DD일') )
   // console.log('default date is',  moment(new Date()).format('YYYY년 MM월 DD일') )

      if (email == ""){
      Alert.alert("이메일을 입력주세요");
      return;
    }
    if (password == ""){
      Alert.alert("비밀번호를 입력주세요");
      return;
    }
    console.log("password>>>>",password)
    console.log("password>>>>>>>",confirmPassword)

    if (confirmPassword == ""){
      Alert.alert("비밀번호 확인을 입력주세요");
      return;
    }
    const isCheckEmail = await checkEmail(email); // 함수와 함수 파라미터의 관계
   // console.log({ isCheckEmail });
    if (isCheckEmail == false){
      Alert.alert ("이메일 형식이 올바르지 않습니다")
      return;
    }

    const isCheckPassword = await checkPassword(password, confirmPassword);
   // console.log('비번',password)
   // console.log({ isCheckPassword });
    if (isCheckPassword == undefined) {

      Alert.alert("비밀번호가 일치하지 않습니다!")
      return;
    }
    if (isCheckPassword == false) {
      Alert.alert("비밀번호는 8자리 이상 문자, 숫자, 특수문자로 구성하여야 합니다.")
      return;
    }
    // alert나고도 바로 회원가입이 되는 문제... 이게 둘다 true로 리턴되면 아래 함수를 시행하라는 코드는 어떻게 짜나요.?// return 고치면댐
   // console.log('.');

    if (checked == false) {
      Alert.alert("약관에 동의해주세요")
      return; 
    }


  
    const userCredential = await firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        console.log({ error }); //여기에서 기본 에러 발생한것
        // alert(error);
      });

   console.log('..userCredential',userCredential);
   const isValid = (userCredential > ''); // 제가 (이은국씨가) 개인적으로 즐겨하는 truthy 체크 방법
   if (userCredential == undefined) {
     Alert.alert("이미 가입되어있습니다. 로그인해주세요")
     return; 
   }

  

   // console.log('꼭확인자자',checked)

    firebase
      .database()
      .ref('/users/' + userCredential.user.uid)
      .set({
        method:"email 회원가입",
        email: userCredential.user.email,
        user_uid: userCredential.user.uid,
        iam: userCredential.user.uid.substring(0, 6)+".지은이", 
        selfLetter: "안녕하세요. 감정록 작가 " + userCredential.user.uid.substring(0, 6) + " 입니다.",
        created_at: Date.now(),
        gender:gender,
        birth:moment(new Date(date)).format('YYYY년 MM월 DD일')
      })
      .then(function (snapshot) {
       // console.log('Snapshot', snapshot);
      });
  }

 // console.log('gener!!',gender)
 // console.log('약관 동의',checked)


  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"white" }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, marginVertical: "10%" }}>

          <View style={{ flex: 1, marginHorizontal: "5%" }}>
            <Text style={{ fontSize: 20, marginTop: "5%" }}> 안녕하세요,  </Text>
            <Text style={{ fontSize: 20, marginBottom: "10%", marginTop:"2%" }}> 필미필미에 오신걸 환영합니다! </Text>
            <View style={{flex:1}}>
            <View style={{ flex: 1 }}>
              <View style={{flexDirection:"row"}}>
                <Text style={{ fontSize: 15 }}> 성별 </Text>
                <Text style={{ fontSize: 15 , color:"grey"}}> (선택사항 입니다) </Text>

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
              <View style={{flexDirection:"row"}}>
              <Text style={{ fontSize: 15, }}> 생년월일</Text>
              <Text style={{ fontSize: 15 , color:"grey"}}> (선택사항 입니다) </Text>
              </View>
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
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, marginTop: "10%" }}> 이메일 </Text>
              <TextInput
                placeholder="이메일을 입력해 주세요"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(email) => setEmail(email)}
                keyboardType="email-address"
                style={{ fontSize: 15, marginVertical: 10, borderWidth: 1, borderColor: "#E2E2E2", marginTop: "2%", paddingVertical: "4%", paddingHorizontal: "4%" }}
              />
              <Text style={{ fontSize: 12 }}> *비밀번호 분실 시 해당 이메일로 확인 메일을 보내드립니다.</Text>
            </View>
            <View style={{ flex: 1, marginTop: "10%" }}>
              <Text style={{ fontSize: 15 }}> 비밀번호 </Text>
              <TextInput
                ref={passwordRef}
                placeholder="비밀번호를 입력해 주세요"
                secureTextEntry={true}
                textContentType="oneTimeCode"
                autoCorrect={false}
                value={password}
                blurOnSubmit={false}

                onSubmitEditing={()=> Keyboard.dismiss()}

                autoCapitalize="none"
                onChangeText={(password) => setPassword(password)}
                style={{ fontSize: 15, marginVertical: 10, borderWidth: 1, borderColor: "#E2E2E2", marginTop: "2%", paddingVertical: "4%", paddingHorizontal: "4%" }}
              />

          {password !=='' && passwordFormat(password)==true ?(
              <Text style={{ fontSize: 12, color: "green" }}> *비밀번호 통과</Text>


            ):( 
              <Text style={{ fontSize: 12, color: "red" }}> *비밀번호는 8자리 이상 영문, 숫자, 특수문자 조합</Text>
            )}


            </View>
            <View style={{ flex: 1, marginTop: "10%" }}>
              <Text style={{ fontSize: 15 }}> 비밀번호 확인 </Text>
              <TextInput
                placeholder="비밀번호를 입력해 주세요"
                secureTextEntry={true}
                autoCorrect={false}
                textContentType="oneTimeCode"
                value={confirmPassword}
                ref={confirmRef}
                autoCapitalize="none"
                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                style={{ fontSize: 15, marginVertical: 10, borderWidth: 1, borderColor: "#E2E2E2", paddingVertical: "4%", paddingHorizontal: "4%" }}
              />
              {password !=='' && password == confirmPassword ? (
                <Text style={{ fontSize: 12, color: "green" }}> *비밀번호가 일치합니다.</Text>
                ):(
                <Text style={{ fontSize: 12, color: "red" }}> *비밀번호가 일치하지 않습니다</Text>


              )}

                  <View>
                    <View style={{flexDirection:"row", height:20,marginTop:30, marginLeft:"2%"}}>
                      <CheckBox
                        checkboxStyle={{height: 20, width: 20, marginTop:"3%"}}                   
                        label=''
                        value={true}
                        onChange={(checked)=>setChecked(checked)}
                      />

                      <TouchableOpacity onPress={()=>navigation.navigate('policyoneforlogin')}><Text style={{marginLeft:10, marginTop:2, fontWeight:"500",textDecorationLine: "underline" }} >이용 약관</Text></TouchableOpacity>
                      <Text style={{marginLeft:5, marginTop:3}}>및</Text>
                      <TouchableOpacity onPress={()=>navigation.navigate('policytwoforlogin')}><Text style={{marginLeft:10, marginTop:2, fontWeight:"500",textDecorationLine: "underline" }} >개인정보 처리방침</Text></TouchableOpacity>
                      <Text style={{marginLeft:5, marginTop:3}}>동의</Text>

                    </View>


                  </View>


            </View>
            <TouchableOpacity style={{ marginTop: "10%", alignSelf: "center", borderRadius: 10, height:40 , width:"100%", backgroundColor:"#20543F", justifyContent:"center"}}
              onPress={() => handleSignUp(gender, date, email, password, confirmPassword)}>
              <Text style={{ color: "white", fontSize: 17, alignSelf: "center" }}>필미필미 시작하기</Text>
            </TouchableOpacity>
          </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>

  )
};

export default emailSignup;