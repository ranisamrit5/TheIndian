import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Content, Item, Input } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import { Icon, Button, SocialIcon } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
class OTP extends React.Component {
    state = { otp: [] };
    otpTextInput = [];

    componentDidMount() {
        this.otpTextInput[0]._root.focus();
    }

    renderInputs() {
        const inputs = Array(4).fill(0);
        const txt = inputs.map(
            (i, j) => <Col key={j} style={styles.txtMargin}><Item regular>
                <Input
                    style={[styles.inputRadius, { borderRadius: 10, fontWeight: 'bold', fontSize: 25 }]}
                    keyboardType="numeric"
                    // onChangeText={v => this.focusNext(j, v)}
                    // onKeyPress={e => this.focusPrevious(e.nativeEvent.key, j)}
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
        this.props.getOtp(otp.join(''));
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
                        // onPress={() => this.props.navigation.navigate('Otpp')}
                        underlayColor="transparent"
                    />
                </Content>

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
    }


});

export default OTP;