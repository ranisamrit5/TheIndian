import React, { Component } from 'react';


import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  Alert,
  Linking,
  Image as Img,
  Switch,
  Image,
  ImageBackground,
  Slider,
  slides,
  SafeAreaView,
  ScrollView
} from 'react-native';

import { useTheme } from 'react-native-paper';



const ForgotPassword = ({ navigation }) => {
  const { colors } = useTheme();

  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  }
  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        isValidUser: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false
      });
    }
  }
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  return (

    <SafeAreaView style={style.container}>
      <ScrollView>
      <View style={{flexDirection:'row',width:'100%',alignItems:'center',backgroundColor:'#FF5733',height:50}}>
                        <TouchableOpacity style={{marginLeft:20}} onPress={()=>props.navigation.pop()}>
                            <Image style={{width:20,height:20,tintColor:'white',transform: [{ rotate: '180deg'}]}}
                                source={require('../Imagess/ErrorVector.png')} />
                        </TouchableOpacity>
                       <View style={{width:'20%'}}>
                            <Text style={{alignSelf:'center',fontSize:18,fontWeight:"bold",color:'white'}}>Back</Text>
                       </View>
                       </View>
        <View style={{ justifyContent: "center", flexDirection: "row", marginTop: 30    }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", }}>Reset Passowrd!</Text>
        </View>
        <View style={{ justifyContent: "center", flexDirection: "row", marginTop: 30 }}>
          <Text style={{ fontSize: 18, }}>Enter a new password.</Text>
        </View>

        <View style={{ justifyContent: "center", flexDirection: "row", marginTop: 30,width:130 }}>
        <Text style={{ fontSize: 18, paddingTop: 10, marginBottom: 10, }}>OTP</Text>
        </View>
        <View style={style.SectionStyle}>
          <TextInput
            style={style.inputStyle}
            // onChangeText={UserPassword => setUserPassword(UserPassword)}
            // underlineColorAndroid="#FFFFFF"
            placeholder="Enter OTP" //12345
            placeholderTextColor="#000"
            keyboardType="default"
            // ref={ref => {
            //   this._passwordinput = ref;
            // }}
            // onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
          />
        </View>
        <View style={{ justifyContent: "center", flexDirection: "row", width:160 }}>
        <Text style={{ fontSize: 18, paddingTop: 10, marginBottom: 10,}}>Password</Text>
        </View>
        <View style={style.SectionStyle}>
          <TextInput
            style={style.inputStyle}
            // onChangeText={UserPassword => setUserPassword(UserPassword)}
            // underlineColorAndroid="#FFFFFF"
            placeholder="Enter Password" //12345
            placeholderTextColor="#000"
            keyboardType="default"
            // ref={ref => {
            //   this._passwordinput = ref;
            // }}
            // onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
          />
        </View>

        <View style={{ justifyContent: "center", flexDirection: "row",width:220  }}>
        <Text style={{ fontSize: 18, paddingTop: 10, marginBottom: 10,}}>Confirm Password</Text>
        </View>
        <View style={style.SectionStyle}>
          <TextInput
            style={style.inputStyle}
            // onChangeText={UserPassword => setUserPassword(UserPassword)}
            // underlineColorAndroid="#FFFFFF"
            placeholder="Enter Password" //12345
            placeholderTextColor="#000"
            keyboardType="default"
            // ref={ref => {
            //   this._passwordinput = ref;
            // }}
            // onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={style.buttonStyle}
          activeOpacity={0.5}
        // onPress={() => props.navigation.navigate('RegisterScreen')}
        >
          <Text style={style.buttonTextStyle}>CHANGE PASSWORD</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>




  );

};

export default ForgotPassword;
const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    marginBottom: 10,

  },

  action: {
    flexDirection: 'row',

    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    backgroundColor: "#f2f2f2",
    width: "80%",
    alignSelf: "center",
    borderRadius: 5,
  },
  textInput: {
    flex: 1,


    marginTop: Platform.OS === 'ios' ? 0 : -5,
    // paddingLeft: 10,
    color: '#05375a',

  },
  buttonStyle: {
    backgroundColor: '#ffa07a',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#87cefa',

    height: 40,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    marginBottom: 20,
    // bottom:10
  },
  buttonTextStyle: {
    color: '#000',
    paddingVertical: 10,
    fontSize: 16,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 5,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    bottom: 10
  },
  inputStyle: {
    flex: 1,
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#a9a9a9',
  },
});






