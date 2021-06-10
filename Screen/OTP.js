
import React from 'react';
import { StyleSheet, View, Text ,TouchableOpacity} from 'react-native';
import { Content, Item, Input } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import { Icon, Button, SocialIcon } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import  { Auth } from 'aws-amplify';
class OTP extends React.Component {
    state = { otp: [],username:'' };
    otpTextInput = [];

    componentDidMount() {
        this.otpTextInput[0]._root.focus();
        let data=this.props.route.params
        console.log('props----::',data.params.user.username)
        this.setState({ username:data.params.user.username });
        console.log('props----::',data.params.codeDeliveryDetails.Destination)
        // setUsername(data.params.codeDeliveryDetails.Destination)
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
    async verifyOtp(){
        const {otp,username}=this.state
        let code =`${otp[0]}${otp[1]}${otp[2]}${otp[3]}${otp[4]}${otp[5]}`
        console.log(this.state.otp)
        console.log(this.state.username)
        // console.log(otpTextInput)
        try {
            await Auth.confirmSignUp(username, code).then(()=>{
                this.props.navigation.navigate('LoginScreen');
            })
          } catch (error) {
              console.log('error confirming sign up', error);
            if (error.code == 'CodeMismatchException')
                alert(error.message)
          }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.btnTxt}>Varification</Text>

                <Text style={styles.btnTxt1}>We've sent a Varification code to</Text>
                <Text style={styles.btnTxt2}>abc123@gmail.com</Text>

                <Content padder>
                    <Grid style={styles.gridPad}>
                        {this.renderInputs()}
                    </Grid>
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
                            height: 50, width: "70%", marginTop: 40,
                            alignSelf: "center", marginTop: 150
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
    gridPad: { padding: 30, marginTop: 120, },

    txtMargin: { margin: 3, },
    inputRadius: { textAlign: 'center' },

    container: {
        // height: "100%",
flex:1
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


});

export default OTP;
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import { Content, Item, Input } from 'native-base';
// import { Grid, Col } from 'react-native-easy-grid';
// import { Icon, Button, SocialIcon } from 'react-native-elements';
// import { SafeAreaView } from 'react-native';
// import { Auth } from 'aws-amplify';
// const OTP = (props) => {

//   const [otp, setOtp] = useState([]);
// //   const [otpTextInput, setOtpTextInput] = useState([]);
//     let otpTextInput=[]
//   const [username, setUsername] = useState([]);
// //    otpTextInput[0]._root.focus();
//     useEffect(() => {
//         // let data=props.route.params
//         // console.log('props----::',data.params.user.username)
//         // console.log('props----::',data.params.codeDeliveryDetails.Destination)
//         // setUsername(data.params.codeDeliveryDetails.Destination)
        
//         Auth.currentAuthenticatedUser().then((data) => {
//           console.log('user----::',data.username)
//         //   props.navigation.navigate('TabNavigation');
//         });
//       }, []); 

//   const  renderInputs =()=> {
//         const inputs = Array(6).fill(0);
//         const txt = inputs.map(
//             (i, j) => <Col key={j} style={styles.txtMargin}><Item regular>
//                 <Input
//                     style={[styles.inputRadius, { borderRadius: 10, fontWeight: 'bold', fontSize: 25 }]}
//                     keyboardType="numeric"
//                     onChangeText={v => focusNext(j, v)}
//                     onKeyPress={e => focusPrevious(e.nativeEvent.key, j)}
//                     // ref={ref => setOtpTextInput(ref[j]) = ref}
//                 />
//             </Item></Col>
//         );
//         return txt;
//     }

//     const focusPrevious=(key, index) =>{
//         if (key === 'Backspace' && index !== 0)
//             otpTextInput[index - 1]._root.focus();
//     }

//   const  focusNext=(index, value)=> {
//         if (index < otpTextInput.length - 1 && value) {
//             otpTextInput[index + 1]._root.focus();
//         }
//         if (index === otpTextInput.length - 1) {
//             otpTextInput[index]._root.blur();
//         }
//         const otp_ = otp;
//         otp_[index] = value;
//         setOtp(otp_);
//         //  props.getOtp(otp_.join(''));
//     }



//         return (
//             <SafeAreaView style={styles.container}>
//                 <Text style={styles.btnTxt}>Verification</Text>

//                 <Text style={styles.btnTxt1}>We've sent a Verification code to</Text>
//                 <Text style={styles.btnTxt2}>{username}</Text>

//                 <Content padder>
//                     <Grid style={styles.gridPad}>
//                         {renderInputs()}
//                     </Grid>
//                     <Button
//                         title="Verify"
//                         loading={false}
//                         loadingProps={{ size: 'small', color: 'white' }}
//                         buttonStyle={{
//                             backgroundColor: '#ffa07a',
//                             borderRadius: 10,

//                         }}
//                         titleStyle={{ fontWeight: 'bold', fontSize: 15, color: '#000' }}
//                         containerStyle={{
//                             height: 50, width: "70%", marginTop: 40,
//                             alignSelf: "center", marginTop: 150
//                         }}
//                         // onPress={() => this.props.navigation.navigate('Otpp')}
//                         underlayColor="transparent"
//                     />
//                 </Content>

//             </SafeAreaView>
//         );
//     }


// const styles = StyleSheet.create({
//     gridPad: { padding: 30, marginTop: 120, },

//     txtMargin: { margin: 3, },
//     inputRadius: { textAlign: 'center' },

//     container: {
//         // height: "100%",
// flex:1
//     },

//     btnTxt: {
//         color: "#000000",
//         marginLeft: 26,
//         padding: "4%",
//         fontSize: 26,
//         fontWeight: "bold",
//     },
//     btnTxt1: {

//         fontSize: 15,
//         paddingLeft: 30,
//         marginLeft: 10,
//         color: "#c0c0c0",
//     },
//     btnTxt2: {
//         fontSize: 12,
//         paddingLeft: 30,
//         marginLeft: 10,
//         color: "#000",
//         fontWeight: "bold"
//     },

//     OtpInputs: {
//         borderRadius: 100
//     }


// });

// export default OTP;


// // let data = { "codeDeliveryDetails": { "AttributeName": "phone_number", "DeliveryMedium": "SMS", "Destination": "+********0276" },
// //  "user": { "Session": null, "authenticationFlowType": "USER_SRP_AUTH", "client": { "endpoint": "https://cognito-idp.ap-south-1.amazonaws.com/",
// //   "fetchOptions": [Object] }, "keyPrefix": "CognitoIdentityServiceProvider.1dp3b1sqk4toht9aesmp117kok", "pool": { "advancedSecurityDataCollectionFlag": true, "client": [Client], "clientId": "1dp3b1sqk4toht9aesmp117kok", "storage": [Function MemoryStorage], "userPoolId": "ap-south-1_tXyLLqqHk", "wrapRefreshSessionCallback": [Function anonymous] }, "signInUserSession": null, "storage": [Function MemoryStorage], "userDataKey": "CognitoIdentityServiceProvider.1dp3b1sqk4toht9aesmp117kok.tushar.samrit@aventior.com.userData",
// //    "username": "tushar.samrit@aventior.com" }, "userConfirmed": false, "userSub": "cd20e5fd-34b9-424d-b964-61a71d9f5922" }