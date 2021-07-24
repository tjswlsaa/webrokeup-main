//사용하지않고있음 추후 참고해야지

import styled from 'styled-components';
import{View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import { Row } from 'native-base';

const StatusBarHeight =Constants.statusBarHeight;

export const Colors={
    primary:'#ffffff',
    secondary:"#E5E7EB",
    tertiary:"#1f2937",
    darkLight:"#9CA3AF",
    brand:"#6D28D9",
    green:"#10B981",
    red:"#EF4444",

};

const {primary, secondary, tertiary, darkLight, brand,green,red} =Colors;

export const StyledContainer =styled.ScrollView`
flex:1;
padding:25px;
padding-top: ${StatusBarHeight+10}px;
background-color: ${primary};
`;

export const InnerContainer =styled.View`
flex:1;
width:100%;
align-items:center;

`;

export const PageLogo=styled.Image`
width:250px;
height:200px;
`;

export const PageTitle = styled.Text`
font-size:30px;
text-align:center;
font-weight:bold;
color: ${brand};
padding:10px; 
`;

export const SubTitle = styled.Text`
font-size:18px;
marginBottom:20px;
letterSpacing:1px;
font-weight:bold;
color: ${tertiary};
padding:10px; 
`;

export const StyledFormArea =styled.View`

width:90%;

`;

export const StyledTextInput = styled.TextInput`
backgroundColor:${secondary};
padding:15px; 
paddingLeft:55px; 
paddingRight:55px; 
borderRadius:5px;
font-size:16px;
height:60px;
marginVertical:3px;
marginBottom:10px;
color:${tertiary};

`;

export const StyledInputLabel=styled.Text`
fontSize:13px;
textAlign:left;
color:${tertiary};


`;

export const LeftIcon= styled.View`
left:15px;
top:38px;
position:absolute;
z-index:1;

`;

export const RightIcon= styled.TouchableOpacity`
right:15px;
top:38px;
position:absolute;
z-index:1;
`;

export const StyledButton= styled.TouchableOpacity`
padding:15px;
backgroundColor:${brand};
justifyContent: center;
alignItems: center;
borderRadius: 5px;
marginVertical:5px;
height:60px; 

${(props)=> props.google ==true &&`
backgroundColor: ${green};
flexDirection:row;
justifyContent:center;
`}
`;

export const ButtonText= styled.Text`

color: ${primary};
fontSize: 16px;

${(props)=> props.google ==true &&`
padding:5px;
`}
`;

export const MsgBox = styled.Text`

textAlign:center;
fontSize:13px;
`;

export const Line= styled.View`
height: 1px;
width;100%;
backgroundColor:${darkLight};
marginVertical:10px;

`;

export const ExtraView= styled.View`
justifyContent:center;
flexDirection:row;
alignItems:center;
padding:10px
`;

export const ExtraText =styled.Text`
justifyContent: center;
alignContent:center;
color: ${tertiary};
fontSize:15px;
`;

export const TextLink = styled.TouchableOpacity`
justifyContent:center;
alignItems:center;

`

export const TextLinkContent = styled.Text`

color: ${brand};
fontSize:15px;
`