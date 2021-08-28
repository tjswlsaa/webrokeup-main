import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView,ScrollView, ImageBackground, } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const policytwoforlogin = ({navigation, route}) => {


    return (

        <SafeAreaView style={{ flex: 1 }}>

<View style={{height:"90%", backgroundColor:"white", marginHorizontal:"5%", marginVertical:"10%"}}>
                        <View>
                            <Text style={{               fontSize: 20,
                marginTop:60, marginHorizontal:"10%"
               }}>개인정보 처리방침</Text>  
                        </View>
                        <ScrollView style={{marginHorizontal:"10%",marginVertical:"10%"}}>
                            <Text style={{lineHeight:23}}>
                            이별록(이하 "회사" 또는 "이별록"이라 함)은 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법, 통신비밀보호법, 전기통신사업법, 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보취급방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.
                            {"\n"}
                            {"\n"}

                            1. 수집하는 개인정보의 항목 및 수집방법
                            {"\n"}

                            2. 개인정보의 수집 및 이용목적
                            {"\n"}

                            3. 개인정보 제공 및 공유 
                            {"\n"}

                            4. 개인정보 파기절차 및 방법
                            {"\n"}

                            5. 개인정보의 보유 및 이용기간
                            {"\n"}

                            6. 이용자 및 법정대리인의 권리와 그 행사방법
                            {"\n"}

                            7. 개인정보 자동 수집 장치의 설치/운영 및 그 거부에 관한 사항 
                            {"\n"}

                            8. 개인정보의 안전성 확보조치에 관한 사항
                            {"\n"}

                            9. 기타
                            {"\n"}

                            10. 고지의 의무
                            {"\n"}

                            {"\n"}{"\n"}

1. 수집하는 개인정보의 항목 
{"\n"}

회사는 회원가입(또는 서비스 가입) 및 각종 서비스의 제공을 위해 이별록 서비스 최초 이용시 다음과 같은 개인정보 수집하고 있습니다.
{"\n"}

- 필수: 이메일, 단말기 정보                            {"\n"}

- 선택: 서비스 이용 도중 이용자 선택에 따라 본인의 SNS 계정 등을 연결하기 위한 계정정보를 입력할 수 있습니다.                            {"\n"}

{"\n"}

마지막으로, 서비스 이용과정이나 사업처리 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.
{"\n"}

- IP Address, 방문 일시, 서비스 이용 기록
 
{"\n"}
{"\n"}
{"\n"}
2. 개인정보의 수집 및 이용목적                            {"\n"}

 
회사는 수집한 개인정보를 다음과 같은 목적으로 이용합니다.                            {"\n"}

 
가. 이별록서비스 제공                            {"\n"}

이용자가 가입한 이별록 내 상호 식별                            {"\n"}

 
나. 회원관리                            {"\n"}

회원제 서비스 제공, 회원식별, 가입의사 확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달                            {"\n"}

 
다. 신규 서비스 개발 및 마케팅 · 광고에의 활용                            {"\n"}

신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 이벤트 참여기회 제공 또는 광고성 정보 제공, 접속빈도 파악, 회원의 서비스이용에 대한 통계                            {"\n"}
{"\n"}{"\n"}
 
3. 개인정보의 제공 및 공유{"\n"}
 
회사는 이용자들의 개인정보를 원칙적으로 "2. 개인정보의 수집목적 및 이용목적"에서 고지한 범위 내에서 사용합니다.{"\n"}
 
상기 목적 이외에는 이용자의 사전 동의 없이 "2. 개인정보의 수집목적 및 이용목적"에서 고지한 범위를 넘어서 이용하거나 원칙적으로 이용자의 개인정보를 외부에 공개하지 않습니다. 단, 아래의 경우에는 예외로 합니다.{"\n"}
 
- 이용자가 사전에 동의한 경우{"\n"}
- 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우{"\n"}
 
{"\n"}{"\n"}
4. 개인정보의 파기 절차 및 방법{"\n"}
회사는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다. 이별록 앱 사용자의 사용정보를 수집 및 보유하지 않습니다. 앱 삭제시 더 이상 위 권한을 사용하지 않습니다. {"\n"}

{"\n"}{"\n"}
5. 개인정보의 보유 및 이용기간{"\n"}
 
이용자의 개인정보는 원칙적으로 계정 삭제시 또는 개인정보의 수집 및 이용목적 달성시 지체없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.{"\n"}
 
{"\n"}{"\n"}
6. 이용자 및 법정대리인의 권리와 그 행사방법{"\n"}
 
- 이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며, 회사의 개인정보의 처리에 동의하지 않는 경우 동의를 거부하거나 가입해지(회원탈퇴)를 요청하실 수 있습니다. 다만, 그러한 경우 서비스의 일부 또는 전부 이용이 어려울 수 있습니다.{"\n"}
- 이용자가 자신의 개인정보를 조회하거나, 수정하기 위해서는 애플리케이션 내 '설정'을, 가입해지(동의철회)를 위해서는 "설정 > 계정 정보 > 탈퇴하기"를 클릭하여 직접 열람, 정정 또는 탈퇴가 가능합니다. {"\n"}
- 회사는 이용자의 요청에 의해 해지 또는 삭제된 개인정보는 "5. 개인정보의 보유 및 이용기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.{"\n"}
{"\n"}{"\n"}

7. 개인정보 자동 수집 장치의 설치/운영 및 그 거부에 관한 사항 {"\n"}
이별록 서비스는 개인정보 자동 수집 장치(쿠키)를 이용하지 않습니다{"\n"}

{"\n"}{"\n"}
 8. 개인정보의 안전성 확보조치에 관한 사항{"\n"}
 개인정보의 안전성 확보 조치를 위해 회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다. 개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다. 또한 개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.{"\n"}
 {"\n"}{"\n"}
9. 기타{"\n"}
 
이별록 서비스 내에 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는 본 "이별록 개인정보취급방침"이 적용되지 않음을 알려 드립니다.{"\n"}
{"\n"}{"\n"}
10. 고지의 의무
{"\n"}{"\n"}
현 개인정보취급방침 내용 추가, 삭제 및 수정이 있을 시에는 개정 최소 7일전부터 회사 홈페이지, 서비스 내의 '공지사항' 또는 기타 알기쉬운 방법을 통해 고지할 것입니다. 다만, 개인정보의 수집 및 활용, 제3자 제공 등과 같이 이용자 권리의 중요한 변경이 있을 경우에는 최소 30일 전에 고지합니다.
 

    
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                </Text>  
                        </ScrollView>
                    </View>

        </SafeAreaView>
        )}
    
        const styles = StyleSheet.create({ 
            container: {
                //앱의 배경 색
                backgroundColor:"#F5F4F4",
                        flex:1
              },
              upperButtonContainer: {
                flexDirection:"row",
                alignSelf:"flex-end",
                marginTop: 30,
                marginRight:15,
              },
              editButton: {
                  height:20,
                  width:60,
                  justifyContent:"center",
                  backgroundColor: "#C4C4C4",
                  alignItems:"center",
                  borderRadius:5
              },
              deleteButton: {
                  marginLeft:20,
                  height:20,
                  width:60,
                  justifyContent:"center",
                  backgroundColor: "#C4C4C4",
                  alignItems:"center",
                  borderRadius:5
              },
              textContainer:{
                  height: "50%",
                  marginTop:"7%"

              },
              bookTitle:{
                fontSize: 20,
                marginLeft: 60,
                marginTop:80,
                marginRight:60,
        
              },
              bookText:{
                  marginTop: 50,
                  marginLeft: 60,
                  marginRight:60,
              },
              regdate: {
                  marginLeft : "10%"
              },
              bottomButtonContainer: {
                flex:1,
                flexDirection:"row",
                marginTop: 10,
                marginRight:"10%",
                backgroundColor:"pink"
              },
              commentButton: {
                marginLeft: "7%"
            },
            likeButton: {
                marginLeft: "10%",
            }
        });
        
    
export default policytwoforlogin;
