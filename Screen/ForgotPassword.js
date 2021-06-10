import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Content, Item, Input } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import { Icon, Button, SocialIcon } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import { Auth } from 'aws-amplify';
class ForgotPassword extends React.Component {
  state = { otp: [], username: '', pass: '', repass: '', sent: false };
  otpTextInput = [];

  componentDidMount() {
    if (this.state.sent)
      this.otpTextInput[0]._root.focus();
  }

  async resendConfirmationCode() {
    if (!this.state.username) {
      // alert('Please fill Email');
      return;
    }
    try {
      await Auth.resendSignUp(this.state.username);
      console.log('code resent successfully');
    } catch (err) {
      console.log('error resending code: ', err);
    }
  }

  renderInputs() {
    const inputs = Array(6).fill(0);
    const txt = inputs.map(
      (i, j) => <Col key={j} style={styles.txtMargin}><Item regular>
        <Input
          style={[styles.inputRadius, { borderRadius: 10, fontWeight: 'bold', fontSize: 25 }]}
          keyboardType="numeric"
          onChangeText={v => this.focusNext(j, v)}
          onKeyPress={e => this.focusPrevious(e.nativeEvent.key, j)}
          ref={ref => this.otpTextInput[j] = ref}
        />
      </Item></Col>
    );
    return txt;
  }

  focusPrevious(key, index) {
    if (key === 'Backspace' && index !== 0)
      this.otpTextInput[index - 1]._root.focus();
  }

  focusNext(index, value) {
    if (index < this.otpTextInput.length - 1 && value) {
      this.otpTextInput[index + 1]._root.focus();
    }
    if (index === this.otpTextInput.length - 1) {
      this.otpTextInput[index]._root.blur();
    }
    const otp = this.state.otp;
    otp[index] = value;
    this.setState({ otp });
    // this.props.getOtp(otp.join(''));
  }
  async verifyOtp() {
    const { otp, username, pass, repass ,sent} = this.state
    let code = `${otp[0]}${otp[1]}${otp[2]}${otp[3]}${otp[4]}${otp[5]}`
    if (pass !== repass)
      alert('Password did not matched')
    console.log(code, username, pass, repass)
    console.log(this.state.username)
    if (!sent){
      await Auth.forgotPassword(username)
    .then(data => {
      console.log(data)
      this.setState({ sent: true })
    })
    .catch(err => console.log(err));

    }else{
      Auth.forgotPasswordSubmit(username, code, pass)
      .then(data => {
        this.props.navigation.navigate('LoginScreen')
      })
      .catch(err => console.log(err));
    }
    
    // console.log(otpTextInput)
  
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.btnTxt}>Forget Password?</Text>


        <View style={{ justifyContent: "center", flexDirection: "row", marginTop: 30, width: 130 }}>
          {this.state.sent == false ? (
            <Text style={{ fontSize: 18, paddingTop: 10, marginBottom: 10, }}>USERNAME</Text>
          ) : null}
        </View>
        {this.state.sent == false ? (

          <View style={styles.SectionStyle}>

            <TextInput
              style={styles.inputStyle}
              onChangeText={username => this.setState({ username: username })}
              underlineColorAndroid="#FFFFFF"
              placeholder="Enter Username" //12345
              placeholderTextColor="#000"
              keyboardType="default"
              // ref={ref => {
              //   this.setState({username:ref})
              //   // this._passwordinput = ref;
              // }}
              // onSubmitEditing={this.Keyboard.dismiss}
              blurOnSubmit={false}
            // secureTextEntry={true}
            />


          </View>
        ) : null}
          <View style={{ justifyContent: "center", flexDirection: "row", width: 130 }}>
          {this.state.sent == true ? (
            <Text style={{ fontSize: 18, paddingTop: 10, marginBottom: 10, }}>ENTER PASSWORD</Text>
          ) : null}
        </View>
        <View style={styles.SectionStyle}>
          {this.state.sent == true ? (
            <TextInput
              style={styles.inputStyle}
              onChangeText={pass => this.setState({ pass: pass })}
              underlineColorAndroid="#FFFFFF"
              placeholder="Enter Password" //12345
              placeholderTextColor="#000"
              keyboardType="default"
              ref={ref => {
                this._passwordinput = ref;
              }}
              // onSubmitEditing={this.Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={true}
            />) : null}
        </View>
        <View style={{ justifyContent: "center", flexDirection: "row", width: 130 }}>
          {this.state.sent == true ? (
            <Text style={{ fontSize: 18, paddingTop: 10, marginBottom: 10, }}>RE ENTER PASSWORD</Text>
          ) : null}
        </View>
        <View style={styles.SectionStyle}>
          {this.state.sent == true ? (
            <TextInput
              style={styles.inputStyle}
              onChangeText={repass => this.setState({ repass: repass })}
              underlineColorAndroid="#FFFFFF"
              placeholder="Re-Enter Password" //12345
              placeholderTextColor="#000"
              keyboardType="default"

              // onSubmitEditing={this.Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={true}
            />
          ) : null}
        </View>
        <View style={{ justifyContent: "center", flexDirection: "row", width: '100%' }}>
          {this.state.sent == true ? (
            <Text style={{ marginBottom: 10, }}>ENTER OTP</Text>
          ) : null}
        </View>
        <Content padder>
          {this.state.sent == true ? (
            <Grid style={styles.gridPad}>
              {this.renderInputs()}
            </Grid>
          ) : null}
          <Button
            title="Verify"
            loading={false}
            loadingProps={{ size: 'small', color: 'white' }}
            buttonStyle={{
              backgroundColor: '#ffa07a',
              borderRadius: 10,

            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 15, color: '#000' }}
            containerStyle={{
              height: 50, width: "70%", marginTop: 20,
              alignSelf: "center", marginTop: 100
            }}
            onPress={() => this.verifyOtp()}
            underlayColor="transparent"
          />
        </Content>

        <TouchableOpacity onPress={() => this.resendConfirmationCode()}>
          <Text
            style={styles.registerTextStyle}>

            Resend OTP
            </Text>
        </TouchableOpacity>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  gridPad: { padding: 30, marginTop: 10, },

  txtMargin: { margin: 3, },
  inputRadius: { textAlign: 'center' },

  container: {
    // height: "100%",
    flex: 1
  },

  btnTxt: {
    color: "#000000",
    marginLeft: 26,
    padding: "4%",
    fontSize: 26,
    fontWeight: "bold",
  },
  btnTxt1: {

    fontSize: 15,
    paddingLeft: 30,
    marginLeft: 10,
    color: "#c0c0c0",
  },
  btnTxt2: {
    fontSize: 12,
    paddingLeft: 30,
    marginLeft: 10,
    color: "#000",
    fontWeight: "bold"
  },

  OtpInputs: {
    borderRadius: 100
  }, registerTextStyle: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,

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
    borderRadius: 30,
    borderColor: '#a9a9a9',
  },


});

export default ForgotPassword;