


// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef } from 'react';
import { SafeAreaView } from 'react-native';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import { Auth } from 'aws-amplify';
import { RadioButton } from 'react-native-paper';
import Loader from '../Screen/Componentone/Loader';

const RegisterScreen = (props) => {
  var [ colorId, setColorId ] = React.useState(0);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [mob, setMob] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [gender, setGender] = useState();

  const onPress = (id) => {

    setColorId(id);
    switch (id) {
      case 1: {
        console.log(id)
        setGender('MALE')
      }
      case 2: {
        console.log(id)
        setGender('FEMALE')
      }
      case 3: {
        console.log(id)
        setGender('OTHER')
      }
    }
  }; 

  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();

  const handleSubmitButton = async () => {
    // console.log('gender',gender)
    setErrortext('');
    if (!userName) {
      alert('Please fill Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!mob) {
      alert('Please fill Mobile No.');
      return;
    }
    if (!pass && !rePass && (pass != rePass)) {
      alert('Please fill password correctly');
      return;
    }
    //Show Loader
    // setLoading(true);
    var mailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var phoneRegex = /^(\+91-|\+91|0)?\d{10}$/;
    let phone_number = ''
    let email = ''
console.log(userName,userEmail,mob,pass,rePass,gender)
// return;

    try {
      await Auth.signUp({
        username:userEmail,
        password:pass,
        attributes: {
          email:userEmail,          // optional
          phone_number:mob,
          family_name:'',
          // middle_name,
          name:userName,
          gender:gender,

        }
      }).then((user)=>{
        console.log("user successfully signed Up!", user);
        props.navigation.navigate('OTP',{params:user});
      })
      

    } catch (error) {
      setLoading(false);
      if(error.code == 'UsernameExistsException'){
         alert("User Name Already Exist");
      }
     
      console.log('error signing in', error);
    }
  };

  const onTextChanged = (e) => {
    console.log(e)
    return;
    if (/^\d+$/.test(e.toString())) {
      setUserAge(e)
    }
  }

  if (isRegistraionSuccess) {
    return (

      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Imagess/success.png')}
          style={{
            height: 200,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.successTextStyle}>
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('TabNavigation')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', backgroundColor: '#FF5733', height: 50 }}>
        <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => props.navigation.pop()}>
          <Image style={{ width: 20, height: 20, tintColor: 'white', transform: [{ rotate: '180deg' }] }}
            source={require('../Imagess/ErrorVector.png')} />
        </TouchableOpacity>
        <View style={{ width: '20%' }}>
          <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: "bold", color: 'white' }}>Back</Text>
        </View>
      </View>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../Imagess/shadi.png')}
            style={{
              width: '60%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Full Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current &&
                emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={
                (UserEmail) => setUserEmail(UserEmail)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={
                (mob) => setMob(mob)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Mobile Number"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={
                (data) => setPass(data)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"

              ref={ageInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                addressInputRef.current &&
                addressInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={
                (data) => setRePass(data)
              }
              underlineColorAndroid="#f000"
              placeholder="Re-enter Password"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}

          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "65%" }}>
            <Text style={styles.text1}>Gender</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "70%", alignSelf: "center", padding: 20, }}>
              <TouchableHighlight
                style={colorId === 1 ? styles.red : styles.button}
                onPress={() => {
                  onPress(1)
                  setGender('MALE')
                }}>
                <Text>Male</Text>


              </TouchableHighlight>

              <TouchableHighlight
                style={colorId === 2 ? styles.red : styles.button}
                onPress={() => {
                  onPress(2)
                  setGender('FEMALE')
                }}>

                <Text>Female</Text>


              </TouchableHighlight>

              <TouchableHighlight style={colorId === 3 ? styles.red : styles.button}
                onPress={() => {
                  onPress(3)
                  setGender('OTHER')
                }} >
                <Text>Other</Text>


              </TouchableHighlight>
            </View>

          </View>



          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => handleSubmitButton()}>
            <Text style={styles.buttonTextStyle}>
              REGISTER
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#ffa07a',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#000',
    paddingVertical: 10,
    fontSize: 16,
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  text1: {
    fontSize: 16,
    // fontWeight: "bold",
    color: "#666666",
    left: 35,
    // marginTop:10,
    alignSelf: "center"
  },
  red: {
    backgroundColor: '#ffa07a',
    alignItems: 'center',
    borderColor: '#7DE24E',
    padding: 10,
    borderWidth: 0.5,
    justifyContent: 'center',
    width: 70,
    height: 35,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.5,
    justifyContent: 'center',
    width: 70,
    height: 35,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
});