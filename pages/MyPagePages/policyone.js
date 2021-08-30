import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView,ScrollView, ImageBackground, } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const policyone = ({navigation, route}) => {


    return (

        <SafeAreaView style={{ flex: 1 }}>



                    <View style={{height:"90%", backgroundColor:"white", marginHorizontal:"5%", marginVertical:"10%"}}>
                        <View>
                            <Text style={{               fontSize: 20,
                marginTop:60, marginHorizontal:"10%"
               }}>서비스약관</Text>  
                        </View>
                        <ScrollView style={{marginHorizontal:"10%",marginVertical:"10%"}}>
                            <Text style={{lineHeight:23}}>

 본 서비스약관(“본 약관”)은 귀하가 당사의 각종 웹사이트, SMS, API, 알림 이메일, 애플리케이션, 버튼 및 위젯을 비롯한 서비스(“본 서비스” 또는 “필미필미”)뿐만 아니라 본 서비스상에서 업로드 또는 다운로드 되거나 보여지는 정보, 문구, 그래픽, 사진 또는 기타 자료(이하 통칭하여 “콘텐츠”)에 액세스하여 이를 이용하는 행위 일체를 규율합니다. 귀하가 본 서비스에 액세스하고 이를 이용하는 행위는 귀하가 본 약관에 동의하고 이를 준수하는 것을 전제로 합니다. 본 서비스에 액세스하거나 본 서비스를 이용함으로써, 귀하는 본 약관에 구속되는 것에 동의합니다.
 {"\n"}
 {"\n"}
 1. 기본약관
 {"\n"} {"\n"}
 
 귀하는 귀하가 본 서비스를 이용하는 행위, 귀하가 본 서비스에 게시하는 콘텐츠 및 그 결과에 대한 책임을 부담합니다. 귀하가 전송, 게재 또는 게시하는 콘텐츠는 본 서비스를 이용하는 타 이용자들에게뿐만 아니라 제3자 서비스 및 웹사이트를 통해 보여질 수 있습니다. 
 {"\n"}

 페이스북 등 외부 서비스와의 연동을 통해 이용계약을 신청할 경우, 본 약관과 개인정보취급방침, 서비스 제공을 위해 필미필미가 귀하의 외부 서비스 계정 정보 접근 및 활용에 “동의” 또는 “확인” 버튼을 누름으로써 이용계약이 성립됩니다.
 {"\n"}

 필미필미가 제공하는 본 서비스는 언제든지 진화할 수 있으며, 필미필미가 제공하는 본 서비스의 형태 및 성격은 귀하에 대한 사전 통지 없이 수시로 변경될 수 있습니다. 또한, 필미필미는 귀하 또는 제반 이용자에 대한 본 서비스(또는 본 서비스에 포함된 특정 기능)의 제공을 (영구적 또는 일시적으로) 중단할 수 있으며, 귀하에게 사전 통지를 제공하지 못할 수도 있습니다. 당사는 또한 당사의 단독 재량에 따라 언제든지 귀하에 대한 사전 통지 없이 이용 및 저장에 대한 제한을 설정할 수 있는 권리를 보유합니다.
 {"\n"}

 본 서비스는 본 서비스상의 콘텐츠나 정보를 대상으로 하는 광고, 본 서비스와 관련하여 제기되는 질의사항이나 기타 정보를 포함할 수 있습니다. 필미필미가 본 서비스상에서 행하는 광고의 종류 및 범위는 변경될 수 있습니다. 필미필미가 귀하로 하여금 본 서비스에 액세스하고 본 서비스를 이용할 수 있도록 하는 데 대한 반대급부로서, 귀하는 필미필미, 필미필미의 제3자 제공자들 및 파트너들이 본 서비스상에 또는 본 서비스로부터 콘텐츠나 정보를 게시하는 것과 관련하여 (귀하가 제공한 것인지 또는 타이용자들이 제공한 것인지의 여부를 불문함) 그러한 광고를 게재할 수 있음에 동의합니다.
 {"\n"}

 {"\n"} {"\n"}
 2. 개인정보 {"\n"}
 {"\n"}

 귀하가 필미필미에 제공하는 정보 일체는 당사의 개인정보취급방침에 따릅니다. 귀하는 본 서비스를 이용함으로써 필미필미가 저장, 처리 및 이용 목적상 해당 정보를 한국 또는 기타 국가로 전송하는 것을 비롯하여 당사가 귀하의 정보를 수집 및 이용(개인정보취급방침에서 규정하는 바와 같음)하는 것에 동의하는 것으로 간주된다는 사실을 인지하고 있습니다. 귀하에게 본 서비스를 제공하는 것의 일환으로, 당사는 서비스 관련 공지사항 및 행정적 사안에 관한 메시지를 비롯한 전달사항을 제공할 필요가 있을 수 있습니다. 이러한 전달사항은 본 서비스 및 귀하의 필미필미 계정의 일부로 간주되며, 귀하는 이를 수신거부 할 수 없습니다.  {"\n"}

 필미필미 회원가입 시 정보 제공을 위한 목적의 이메일 정보를 수집할 수 있습니다. 이는 비밀번호 분실 시 개인정보를 확인하기 위한 수단이며, 본인 이메일을 반드시 이용해야 합니다. 귀하가 제3자의 이메일을 사용 또는 다른 사용자가 귀하의 이메일을 사용하는 것에 대하여 당사는 책임지지 않습니다. {"\n"}

  
 {"\n"} {"\n"}

 3. 비밀번호     {"\n"}

 {"\n"} 
 귀하는 귀하가 본 서비스에 액세스하기 위하여 이용하는 비밀번호의 보호 및 귀하의 비밀번호에 의한 활동이나 행위 일체에 대한 책임을 부담합니다. 당사는 귀하에게 “강력한” 비밀번호(대∙소문자, 숫자 및 특수문자를 조합한 형태의 비밀번호)를 설정할 것을 권장합니다. 필미필미는 귀하가 상기를 준수하지 아니함으로 인하여 발생하는 손실이나 손해에 대한 책임을 부담할 수 없으며, 이는 향후에도 마찬가지 입니다.
  
 {"\n"} {"\n"} {"\n"}
 4. 본 서비스상의 콘텐츠
 {"\n"} {"\n"}
 공개적으로 게시된 것인지 혹은 개인적으로 전송된 것인지를 불문하고, 모든 콘텐츠는 해당 콘텐츠를 생성한 자의 단독 책임입니다. {"\n"}
 당사는 본 서비스를 통해 게시된 콘텐츠나 통신의 완전성, 진실성, 정확성 또는 신뢰성을 확인, 지지, 대표 또는 보증하거나 본 서비스를 통해 표출된 어떠한 의견도 지지하지 않습니다. 귀하는 귀하가 본 서비스를 이용하는 과정에서 귀하가 불쾌하거나, 유해하거나, 부정확하거나 또는 달리 부적절한 콘텐츠나 혹은 경우에 따라 허위제목으로 등록되었거나 기만적인 게시물에 노출될 수도 있음을 인지하고 있습니다. 경우를 불문하고, 필미필미는 어떠한 방식으로도 여하한 콘텐츠(해당 콘텐츠상의 오류나 누락을 포함하되 이에 한정되지 아니함)나 본 서비스를 통해 게시되었거나, 이메일로 전달되었거나, 전송되었거나, 또는 여타의 방식으로 제공된 콘텐츠 또는 다른 곳에서 방송된 콘텐츠를 이용함으로써 발생하는 종류를 불문한 손실이나 손해 일체에 대한 책임을 부담하지 않습니다. {"\n"}
 
 {"\n"} {"\n"}
 5. 귀하의 권리
 {"\n"} {"\n"}
 귀하는 귀하가 본 서비스상에 또는 본 서비스를 통해 등록, 게시 또는 게재한 콘텐츠 일체에 대한 권리를 보유합니다. 본 서비스상에 또는 본 서비스를 통해 콘텐츠를 등록, 게시 또는 게재함으로써, 귀하는 당사에 (현재 알려져 있거나 장래에 개발될 수 있는) 모든 미디어나 배포방식을 통해 해당 콘텐츠를 이용, 복사, 복제, 처리, 각색, 변경, 공표, 전송, 게재 또는 배포할 수 있는 전세계적이고, 비독점적이며 무상으로 제공되는 라이센스(재라이센스를 허여할 수 있는 권리를 포함함)를 허용하는 것으로 간주됩니다.
 {"\n"}
 귀하는 본 라이센스가, 콘텐츠 이용에 관한 당사의 약관에 따라, 필미필미가 본 서비스를 제공, 홍보 및 개선하고 본 서비스로 또는 본 서비스를 통해 전송되는 콘텐츠를 기타 미디어나 서비스상에서 발표, 방송, 배포 또는 게시하기 위한 목적으로 해당 콘텐츠를 필미필미과 제휴관계에 있는 여타의 회사, 단체 또는 개인들에게 제공할 수 있는 권리를 포함하는 것에 동의합니다.
 {"\n"}
 필미필미과 제휴관계에 있는 여타의 회사, 단체 또는 개인들은 귀하가 본 서비스를 통해 등록, 게시, 전송 또는 제공하는 콘텐츠에 대하여 귀하에게 대가를 지급하지 않고 해당 콘텐츠를 추가적으로 사용할 수 있습니다.
 {"\n"}
 당사는 컴퓨터 네트워크 및 각종 미디어상에서 전송, 게시 또는 배포하기 위한 목적상 귀하의 콘텐츠를 변경 또는 수정하고, 또는, 네트워크, 장비, 서비스 또는 미디어의 요건사항이나 제한사항에 부합하고 이에 적합하게 하도록 하기 위하여 필요한 경우 귀하의 콘텐츠를 변경할 수 있습니다.
 {"\n"}
 귀하는 귀하가 본 서비스를 이용하는 행위, 귀하가 제공하는 콘텐츠 및 그 결과 (타이용자들 및 당사의 제3자 파트너들이 귀하의 콘텐츠를 이용하는 것을 포함함)에 대한 책임을 부담합니다. 귀하는 당사의 파트너들이 귀하의 콘텐츠를 발표, 방송, 배포 또는 게시할 수 있으며, 귀하가 그러한 용도로 해당 콘텐츠를 등록할 수 있는 권리를 보유하고 있지 않은 경우, 귀하가 책임을 부담하게 될 수 있습니다. 필미필미는 본 약관에 따라 필미필미가 귀하의 콘텐츠를 이용하는 것에 대한 책임이나 의무를 부담하지 않습니다. 귀하는 귀하가 등록하는 콘텐츠에 대해 본 약관에 따라 부여된 권리를 허여하기 위하여 필요한 권리 및 권한 일체를 보유하고 있음을 진술 및 보증합니다.
 {"\n"}
 {"\n"} {"\n"}
 6. 본 서비스 이용을 위한 귀하의 라이센스
 {"\n"} {"\n"}
 필미필미는 귀하에게 본 서비스의 일환으로 필미필미가 귀하에게 제공하는 소프트웨어를 이용할 수 있는 개인적이고, 전세계적이고, 무상으로 제공되고, 양도 불가능하며, 비독점적인 라이센스를 허용합니다. 본 라이센스는 오로지 귀하로 하여금 본 약관에서 허용하는 방식에 따라 필미필미가 제공하는 본 서비스를 이용하고 향유할 수 있도록 하는 것 만을 목적으로 합니다.
  
 {"\n"} {"\n"} {"\n"}
 7. 필미필미의 권리
 {"\n"} {"\n"}
 본 서비스(이용자들이 제공하는 콘텐츠를 제외함)에 대한 권리, 소유권 및 이권 일체는 필미필미 및 필미필미 라이센서들의 독점 자산이며, 이는 향후에도 마찬가지 입니다. 본 서비스는 저작권 및 상표권뿐만 아니라 기타 한국 및 외국 법률에 따라 보호됩니다. 본 약관에 포함된 어떠한 조항도 귀하에게 필미필미 명칭이나 필미필미 상표, 로고, 도메인네임 및 기타 특유의 브랜드 표장을 사용할 수 있는 권리를 부여하지 않습니다. 귀하가 필미필미, 본 서비스에 관하여 제공하는 피드백, 의견이나 제안사항은 전적으로 자발적인 것으로서, 당사는 당사가 적절하다고 판단하는 피드백, 의견이나 제안사항을 귀하에 대한 의무부담 없이 자유로이 사용할 수 있습니다.
  
 {"\n"} {"\n"} {"\n"}
 8. 본 서비스상의 콘텐츠 및 본 서비스 이용에 관한 제한사항
 {"\n"} {"\n"}
 필미필미에 게시할 수 있는 컨텐츠의 종류에는 다음과 같은 제약이 있습니다. 이는 법적 기준에 근거하며 모두가 필미필미을 원활히 이용하기 위해 존재합니다. (i) 사칭 : 필미필미에서 다른 사람들을 헷갈리게 하거나 속이기 위해 누군가를 사칭해서는 안 됩니다; (ii) 개인정보: 다른 사람의 명백한 인증 및 동의 없이, 그 사람의 신용카드 정보, 집 주소, 주민등록번호, 이메일 등의 개인 또는 비밀 정보를 게시 및 유포해서는 안 됩니다; (iii) 폭력, 위협 및 음란물 : 다른 사람에 대한 폭력 행사 위협 및 음란물을 게시하거나 유포할 수 없습니다; (iv) 저작권: 필미필미는 분명한 저작권 침해에 대응하고 있습니다;  (v) 불법 이용: 필미필미을 이용하여 불법 행위 및 불법 활동 홍보에 이용할 수 없습니다. 사용자의 국가별 온라인 및 컨텐츠 관련 법을 준수해야 합니다; 
 {"\n"}
 당사는 언제든지 귀하에 대한 책임부담 없이 본 서비스상의 콘텐츠를 삭제하거나 본 서비스상에서의 콘텐츠 배포를 거절할 수 있는 권리, 사용자계정을 중단 또는 해지할 수 있는 권리를 보유합니다(단, 당사의 의무사항은 아닙니다). 당사는 또한 당사가 (i) 관계법령, 법적 절차 또는 정부요청을 준수하거나; (ii) 본 약관에 대한 잠재적 위반사항을 조사하는 것을 비롯하여 본 약관을 집행하거나; (iii) 사기, 보안 또는 기술 관련 문제를 발견, 방지 또는 달리 해결하거나; (iv) 이용자의 지원요청에 응대하거나; 또는 (v) 필미필미, 필미필미 이용자 및 대중의 권리, 재산 또는 안전을 보호하기 위하여 필요하다고 합리적으로 판단하는 정보에 액세스하여 해당 정보를 읽고, 보관하고, 공개할 수 있는 권리를 보유합니다. 필미필미는 당사의 개인정보취급방침에 따른 경우를 제외하고 제3자에게 개인식별정보를 공개하지 않습니다.
 {"\n"}
 귀하는 본 서비스에 액세스하거나 본 서비스를 이용함에 있어 다음에 해당하는 행위를 할 수 없습니다: (i) 본 서비스의 비공개 영역, 필미필미의 컴퓨터 시스템이나 필미필미 제공업체의 기술적 전송시스템에 액세스하거나 이를 무단으로 변경하거나 이용하는 행위; (ii) 여하한 시스템이나 네트워크의 취약성을 검사, 조사 또는 테스트하거나 보안조치나 인증조치를 위반하거나 회피하는 행위; (iii) 귀하가 필미필미과 체결한 별도의 계약에 따라 특별히 허용된 경우를 제외하고, 필미필미가 제공하는 현재 이용 가능한 (및 오로지 그러한 조건에 따른) 정식 인터페이스 이외의 수단(자동화 여부를 불문함)으로 본 서비스에 액세스하거나 본 서비스상에서 검색하는 행위 또는 액세스나 검색을 시도하는 행위 (iv) 이메일이나 게시물에서 TCP/IP 패킷 헤더나 헤더 정보의 일부를 위조하는 행위, 또는 방식을 불문하고 변경되었거나, 기만적이거나 또는 부정확한 소스 식별 정보를 전송하기 위한 목적으로 본 서비스를 이용하는 행위; 또는 (v) 이용자, 호스트 또는 네트워크의 액세스를 방해하거나 중단시키는 행위(또는 방해나 중단을 시도하는 행위)(본 서비스를 방해하거나 본 서비스상에 부적절한 과부하를 형성하기 위한 방식으로 바이러스를 전송하는 행위, 본 서비스상에서 오버로딩(overloading), 플러딩(flooding) 또는 스패밍(spamming)하거나 폭탄메일(mail-bombing)을 전송하는 행위, 또는 콘텐츠의 생성을 스크립팅(scripting)하는 행위를 포함하되 이에 한정되지 아니함).
 {"\n"} {"\n"}
 
 9. 저작권관련 정책
 {"\n"} {"\n"}
 필미필미는 타인의 지적재산권을 존중하며, 본 서비스 이용자들이 타인의 지적재산권을 존중할 것이라 기대합니다. 당사는 관계 법률을 준수하여 합리적으로 당사에 제공된 저작권위반 신고에 대한 답변을 제공합니다. 귀하의 콘텐츠가 저작권 침해행위를 구성하는 방식으로 복제되었다고 판단하시는 경우, 당사에 다음에 해당하는 정보를 제공해주시기 바랍니다: (i) 저작권자나 당해 저작권자를 대리하도록 수권 받은 자의 실제서명이나 전자서명; (ii) 침해 당했다고 주장되는 저작물 식별자료; (iii) 침해적이라거나 침해행위의 주체라고 주장되는 것으로서 삭제되어야 하거나 해당 자료에 대한 액세스를 제한해야 하는 자료를 식별할 수 있는 정보 및 당사가 해당 자료를 추적할 수 있도록 합리적으로 충분한 정보; (iv) 귀하의 주소, 전화번호 및 전자우편 주소 등 귀하의 연락처; (v) 문제가 제기된 방식으로 해당 자료를 이용하는 행위가 저작권자, 저작권자의 대리인 또는 법률에 의해 허용된 것이 아니라고 판단한다는 것을 내용으로 하는 귀하의 진술서; 및 (vi) 신고서상의 정보가 정확한 것이며, 귀하가 해당 저작권자를 대리하여 행위 하도록 수권 받았음을 내용으로 하는, 위증죄에 대한 처벌을 감수하는 진술서.
 {"\n"}
 당사는 당사의 단독 재량에 따라 귀하에 대한 책임을 부담하지 않고 사전 통지 없이 침해적이라고 주장되는 콘텐츠를 삭제할 수 있는 권리를 보유합니다. 적절한 상황에서, 필미필미는 이용자가 상습 침해자로 판명되는 경우 해당 이용자의 계정을 또한 해지합니다. 
 {"\n"}
 {"\n"} {"\n"}
 10. 본 약관의 해지
 {"\n"} {"\n"}
 본 약관은 다음과 같이 귀하나 필미필미가 본 약관을 해지할 때까지 계속적으로 적용됩니다.
 {"\n"}
 귀하는 귀하의 계정을 비활성화하고, 본 서비스 이용을 중단함으로써 사유를 불문하고 언제든지 필미필미과 체결한 법적 계약을 종료할 수 있습니다. 귀하가 본 서비스 이용을 중단하는 경우, 귀하는 필미필미에 이러한 사실을 별도로 통지해야 할 필요는 없습니다.
 {"\n"}
 귀하가 본 서비스 이용을 중단하는 경우, 귀하가 등록한 컨텐츠는 자동으로 삭제되지 않으니 사전에 삭제 후 서비스 이용을 중단하시기 바랍니다.
 {"\n"}
 다음의 경우를 포함하되 이에 한정되지 아니하고, 당사는 사유를 불문하고 언제든지 귀하의 계정을 중단 또는 해지하거나 귀하에 대한 본 서비스 전부 또는 일부의 제공을 중단할 수 있습니다: 당사가 합리적으로 (i) 귀하가 본 약관을 위반하였거나, (ii) 귀하가 당사에 대하여 위험을 초래하거나 잠재적 법적 문제를 야기할 수 있거나, 또는 (iii) 귀하에 대한 당사의 서비스 제공이 상업적으로 더 이상 가능하지 않다고 판단하는 경우. 당사는 귀하의 계정에 연계된 이메일 주소로 또는 귀하가 다음 번에 귀하의 계정에 액세스 할 때에 귀하에게 관련 사실을 통지하기 위하여 합리적인 노력을 기울일 것입니다.
 {"\n"}
 이러한 경우, 귀하가 본 서비스를 이용할 수 있는 라이센스를 포함하되 이에 한정되지 아니하고, 본 약관은 해지됩니다. 단, 제4조, 제5조, 제7조, 제8조, 제10조, 제11조 및 제12조는 계속적으로 적용됩니다.
 {"\n"}
 본 제10조에 포함된 어떠한 규정도 상기 제1조에서 규정하는 바와 같이 사전 통지 없이 본 서비스의 제공을 변경, 제한 또는 중단할 수 있는 필미필미의 권리에 영향을 미치지 않습니다.
 {"\n"}
 {"\n"} {"\n"}
 11. 책임의 부인 및 제한
 {"\n"} {"\n"}
 본 제11조의 세부 조항들은 관계 법률이 허용하는 최대 한도로 적용됩니다. 특정 관할권에서는 계약상의 묵시적 보증이나 책임의 제한을 허용하지 아니하므로, 본 제11조가 귀하에게 적용되지 않을 수 있습니다. 본 제11조에 포함된 어떠한 규정도 귀하가 보유하고 있는 합법적으로 제한될 수 없는 권리를 제한하도록 의도하지 않습니다.
 {"\n"} {"\n"}
 A. 본 서비스는 “있는 그대로” 제공됩니다.
 {"\n"} {"\n"}
 귀하가 본 서비스나 콘텐츠에 액세스하거나 이를 이용하는 행위는 귀하의 위험부담으로 합니다. 귀하는 본 서비스가 귀하에게 “있는 그대로” “가용한 범위 내에서” 제공된다는 사실을 인지하고 있으며 이에 동의합니다. 상기 규정을 제한하지 아니하고, 관계 법률이 허용하는 최대 한도로, 필미필미 당사자들은 상품성, 특정 목적에의 적합성이나 비침해성에 관한 명시적이거나 묵시적인 보증 및 조건 일체를 부인합니다.
 {"\n"} {"\n"}
 필미필미 당사자들은 (i) 본 서비스나 여하한 콘텐츠의 완전성, 정확성, 가용성, 시기적절성, 보안성이나 신뢰성; (ii) 귀하가 본 서비스나 콘텐츠에 액세스하거나 이를 이용함으로 인하여 발생하는 귀하 컴퓨터 시스템의 손상, 데이터 손실 또는 여타의 피해; (iii) 본 서비스에 의해 유지되는 여하한 콘텐츠나 기타 커뮤니케이션의 삭제 또는 저장실패나 전송실패; 또는 및 (iv) 본 서비스가 귀하의 요구사항을 충족한다거나 본 서비스가 끊김 없이, 안전하게 또는 오류발생 없이 제공되는지에 관한 어떠한 보증도 제공하지 아니하며 이에 대한 책임 및 의무 일체를 부인합니다. 세줄일기 당사자들로부터 또는 본 서비스를 통해 지득한 어떠한 구두 또는 서면의 권고사항이나 정보도 본 약관에서 명시적으로 규정하지 않은 보증을 제공하지 않습니다.
 {"\n"} {"\n"}
 B. 링크
 {"\n"} {"\n"}
 본 서비스는 제3자 웹사이트나 자료로 연결되는 링크를 포함할 수 있습니다. 귀하는 필미필미 당사자들이 (i) 제3자 웹사이트나 자료의 가용성이나 정확성; 또는 (ii) 제3자 웹사이트나 자료상의 콘텐츠, 제품이나 서비스 또는 그러한 제3자 웹사이트나 자료로부터 제공되는 콘텐츠, 제품이나 서비스에 대한 책임이나 의무를 부담하지 않음을 인정하고 이에 동의합니다. 링크가 제3자 웹사이트나 정보로 연결된다는 것을 이유로 필미필미 당사자들이 해당 웹사이트나 자료 또는 당해 웹사이트나 자료로부터 제공되는 콘텐츠, 제품이나 서비스에 대한 보증을 제공하였음을 의미하지 않습니다. 귀하는 귀하가 제3자 웹사이트나 자료를 이용함으로 인하여 발생하는 위험 일체를 부담하고 그에 대한 단독 책임을 부담합니다.
 {"\n"} {"\n"}
 C. 책임의 제한
 {"\n"} {"\n"}
 관계 법률이 허용하는 최대 한도로, 필미필미 당사자들은 (i) 귀하가 본 서비스에 액세스하는 행위나 본 서비스를 이용하는 행위 또는 본 서비스에 대한 액세스 불가나 본 서비스 이용불가; (ii) 본 서비스상의 제3자 행위나 콘텐츠(여타의 이용자나 제3자가 행한 명예훼손적이거나, 불쾌하거나, 불법적인 행위를 포함하되 이에 한정되지 아니함); (iii) 본 서비스로부터 지득한 콘텐츠 일체; 또는 (iv) 귀하의 전송내역이나 콘텐츠에 무단으로 액세스하는 행위나 또는 이를 무단으로 이용하거나 변경하는 행위로부터 기인하는 간접 손해, 부수적 손해, 특별 손해, 결과적 손해나 징벌적 손해, 이익손실이나 매출손실(직접적으로 또는 간접적으로 발생하였는지를 불문함), 여하한 데이터, 이용 또는 영업권 관련 손실, 또는 기타 무형손실에 대한 책임을 부담하지 않습니다.
 {"\n"}
 {"\n"} {"\n"}
 12. 일반 규정
 {"\n"} {"\n"}
 A. 포기 및 가분성
 {"\n"} {"\n"}
 필미필미가 본 약관에 포함된 어느 권리나 규정을 집행하지 아니하는 것을 이유로 해당 권리나 규정에 대한 포기로 간주되지 않습니다. 본 약관의 어느 규정이 무효이거나 집행 불가능한 것으로 판명되는 경우, 무효하거나 집행 불가능한 것으로 판명된 조항은 필요한 최소 한도로 제한되거나 삭제되며, 본 약관의 나머지 조항들은 계속적으로 완전한 효력을 유지합니다.
 {"\n"} {"\n"}
 B. 준거법 및 관할
 {"\n"} {"\n"}
 본 약관 및 본 약관에 관한 소송 일체는 대한민국 법률에 따라 규율됩니다 (대한민국 법의 국제사법 규정의 적용을 배제하며, 귀하가 거주하고 있는 주나 국가와 무관합니다). 본 서비스와 관련하여 발생하는 청구, 법적 절차 또는 소송 일체는 전적으로 대한민국 서울중앙지방법원에서만 제기가능하며, 귀하는 대한민국 서울 소재 법원을 관할 및 재판지로 하는 것에 동의하고 불편한 법정지에 관한 이의제기를 포기합니다.
 {"\n"} {"\n"}
 C. 완전한 합의
 {"\n"} {"\n"}
 본 약관 및 당사의 개인정보취급방침은 본 서비스(명시적으로 본 약관에 추가하여 또는 본 약관을 대체하여 귀하가 필미필미가 별도의 계약을 체결한 서비스는 제외함)에 관한 필미필미과 귀하간의 완전하고 배타적인 합의를 구성하며, 본 약관은 본 서비스에 관한 필미필미과 귀하간의 모든 이전의 합의를 대체하고 대신합니다. 
 {"\n"}
 당사는 본 약관을 수시로 변경할 수 있으며, 최신 버전을 항상 필미필미 내 프로그램 정보 메뉴에 게시할 예정입니다. 당사의 단독 재량에 따라 해당 변경사항이 중대하다고 판단하는 경우, 당사는 당해 변경사항을 귀하의 계정에 연계된 이메일 계정으로 이메일을 전송함으로써, 귀하에게 통지할 것입니다. 변경사항이 시행된 이후에도 지속적으로 본 서비스에 액세스하거나 이를 이용함으로써, 귀하는 변경된 본 약관에 구속되는 데 동의합니다.
 {"\n"}

                                
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
                //   backgroundColor:"pink",
                  marginTop:"7%"
              },
              bookTitle:{
                fontSize: 20,
                marginLeft: 60,
                marginTop:60,
                marginRight:60,
        
              },
              bookText:{
                  marginTop: 30,
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
        
    
export default policyone;
