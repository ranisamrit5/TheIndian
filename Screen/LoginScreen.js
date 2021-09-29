import React, { useState ,useEffect} from 'react';
//ranisamrit5@gmail.com
//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableHighlight,
  StatusBar
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Screen/Componentone/Loader';
import Logo from '../Imagess/shadi.png'
import  { Auth } from 'aws-amplify';


const LoginScreen = props => {
  var [ colorId, setColorId ] = React.useState(0);
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [rePassword, setRePassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [userState, setUserState] = useState(false);
  const [userData, setUserData] = useState({
  });
  const [username, setUsername] = useState();
  const [name, setName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((data) => {
      console.log('user----::',data)
      props.navigation.navigate('TabNavigation');
    });
  }, []); 
  const onPress = (id) => {

    setColorId(id);
    switch (id) {
      case 1:
        setGender('MALE')
      case 2:
        setGender('FEMALE')
      case 3: 
        setGender('OTHER')
      
    }
  }; 
  const handelNewPasswordRequired = async() => {
    setErrortext('');
    if (!rePassword) {
      alert('Re-enter Password');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    if(rePassword != userPassword){
      alert('Password does not match');
      return;
    }
    console.log(username, userPassword,userData)
    // return
    setLoading(true);
    Auth.signIn(username, userPassword)
    .then(user => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
            Auth.completeNewPassword(
                user,               // the Cognito User Object
                userPassword,       // the new password
                {
                  email: userData.email,
                  phone_number: userData.phone_number,
                  name:name,
                  family_name:familyName,
                  gender:gender
                }
            ).then(user => {
                // at this time the user is logged in if no MFA required
                console.log(user);
                props.navigation.navigate('TabNavigation');
            }).catch(e => {
              console.log(e);
            });
        } else {
            // other situations
        }
    }).catch(e => {
        console.log(e);
    });
  };

  const handleSubmitPress = async() => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    try {
    const user = await Auth.signIn(userEmail, userPassword)
    .then((res) => {
      if (res.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setUserState(true)
        setUserEmail('')
        setUserPassword('')
        setUserData(res.challengeParam['userAttributes'])
        setUsername(res.username)
      }else{
        props.navigation.navigate('TabNavigation');
      }
      setLoading(false);
      // props.navigation.navigate('TabNavigation');
    })
    } catch (error) {
      setLoading(false);
      alert("Error");
      console.log('error signing in', error);
    }
  };

  return (
    <View style={styles.mainBody}>
      <StatusBar backgroundColor='#ffa07a' barStyle="light-content" />
      <Loader loading={loading} />
      {userState ?

        <ScrollView keyboardShouldPersistTaps="handled">

          <View style={{ marginTop: 100 }}>
            <KeyboardAvoidingView enabled>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={Logo}
                  style={{
                    width: '60%',
                    height: 100,
                    resizeMode: 'contain',
                    margin: 30,
                    bottom: 50
                  }}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  value={name}
                  // underlineColorAndroid="#FFFFFF"
                  placeholder="Name" //dummy@abc.com
                  placeholderTextColor="#000"
                  autoCapitalize="none"
                  //  keyboardType="email-address"
                  onChangeText={text => setName(text)}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    this._passwordinput && this._passwordinput.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  value={familyName}
                  // underlineColorAndroid="#FFFFFF"
                  placeholder="Last Name" //dummy@abc.com
                  placeholderTextColor="#000"
                  autoCapitalize="none"
                  //  keyboardType="email-address"
                  onChangeText={text => setFamilyName(text)}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    this._passwordinput && this._passwordinput.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
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
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={pass => setUserPassword(pass)}
                  placeholder="Enter Password" //12345
                  placeholderTextColor="#000"
                  keyboardType="default"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={repass => setRePassword(repass)}
                  placeholder="Re Enter Password" //12345
                  placeholderTextColor="#000"
                  keyboardType="default"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                />
              </View>
              {errortext != '' ? (
                <Text style={styles.errorTextStyle}> {errortext} </Text>
              ) : null}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handelNewPasswordRequired}>
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
        :

        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ marginTop: 100 }}>
            <KeyboardAvoidingView enabled>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={Logo}
                  style={{
                    width: '60%',
                    height: 100,
                    resizeMode: 'contain',
                    margin: 30,
                    bottom: 50
                  }}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}

                  // underlineColorAndroid="#FFFFFF"
                  placeholder="Mobile No./Email ID" //dummy@abc.com
                  placeholderTextColor="#000"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={text => setUserEmail(text)}
                  // ref={ref => {
                  //   this._emailinput = ref;
                  // }}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    this._passwordinput && this._passwordinput.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={text => setUserPassword(text)}
                  // underlineColorAndroid="#FFFFFF"
                  placeholder="Enter Password" //12345
                  placeholderTextColor="#000"
                  keyboardType="default"
                  // ref={ref => {
                  //   this._passwordinput = ref;
                  // }}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                />
              </View>
              {errortext != '' ? (
                <Text style={styles.errorTextStyle}> {errortext} </Text>
              ) : null}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>


              <TouchableOpacity onPress={() => props.navigation.navigate('OTP')}>
                <Text
                  style={styles.registerTextStyle1}>

                  Login via OTP
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => props.navigation.navigate('RegisterScreen')}>
                <Text style={styles.buttonTextStyle}>New User? Register free</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPassword')}>
                <Text
                  style={styles.registerTextStyle}>

                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>

      }
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
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
  buttonStyle: {
    backgroundColor: '#ffa07a',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    marginBottom: 20,
    // bottom:10
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
  registerTextStyle: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,

  },
  registerTextStyle1: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,

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
   
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});