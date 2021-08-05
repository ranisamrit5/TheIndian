import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';



const NetworkScreen = (props) => {
    console.log('NetworkScreen Check 1',props.onCheck)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ alignSelf: "center", marginBottom: 200, marginTop: 200, marginLeft: 24, marginRight: 24 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", }}>NO INTERNET CONNECTION</Text>
                    <Text style={{ fontSize: 12, fontWeight: "400", color: "#00000099", textAlign: "center", marginTop: 8, marginBottom: 16 }}>Sorry,looks like there is no internet connection.Please check your Wi-Fi or data connectivity.</Text>

                </View>
                <View style={{ alignSelf: "center", }}>
                    <TouchableOpacity
                        style={styles.SubmitButtonStyle1}
                        activeOpacity={.10}
                        onPress={() => { 
                            console.log('NetworkScreen Check 2',props.onCheck)
                            props.onCheck
                             }}>
                        <Text style={styles.TextStyle1}>Try Again</Text>

                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}


export default NetworkScreen;
const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',

    },
    SubmitButtonStyle1: {
        width: 150,
        height: 40,
        alignSelf: "center",
        backgroundColor: '#62A1DA',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#62A1DA',
        bottom: 150,

    },

    TextStyle1: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: "900",
        fontSize: 14,
        padding: 10,


    },

});