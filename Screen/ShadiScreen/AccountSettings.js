import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    SafeAreaView,
    Switch,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity,
    Image,

    Button, Platform
} from 'react-native';
import { Auth } from 'aws-amplify';


const AccountSettings = (props) => {


    async function signOut() {
        try {
            await Auth.signOut().then(()=>{
                console.log('==========')
                props.navigation.navigate('LoginScreen');
            })
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>

                <View style={styles.mainview}>
                    <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => props.navigation.pop()}>
                        <Image style={{ width: 20, height: 20, tintColor: 'white', transform: [{ rotate: '180deg' }] }}
                            source={require('../../Imagess/ErrorVector.png')} />
                    </TouchableOpacity>
                    <View style={{ width: '80%' }}>
                        <Text style={styles.hedertext}>Account Settings</Text>
                    </View>
                </View>
                <View style={styles.view5}>

                    <View style={styles.text}>
                        <Text style={styles.text1}>Alarts</Text>

                    </View>
                </View>
                <TouchableOpacity style={styles.view6}>

                    <View style={styles.text}>
                        <Text style={styles.text2}>Push Notification & Sounds</Text>

                        <Image style={styles.img}
                            source={require('../../Imagess/arrowiconVc.png')} />
                    </View>
                </TouchableOpacity>



                <View style={styles.view}>
                    <View style={styles.text}>
                        <Text style={styles.text1}>Contact Privacy</Text>

                    </View>
                </View>
                <View style={styles.view1}>

                    <View style={styles.text}>
                        <Text style={styles.text3}>+91-9579698951</Text>


                    </View>
                </View>
                <TouchableOpacity style={styles.view2}>

                    <View style={styles.text}>
                        <Text style={styles.text2}>Visibal to all Premium Members</Text>

                        <Image style={styles.img}
                            source={require('../../Imagess/arrowiconVc.png')} />
                    </View>
                </TouchableOpacity>



                <View style={styles.view3}>

                    <View style={styles.text}>
                        <Text style={styles.text3}>ranisamrit5@gmail.com</Text>


                    </View>
                </View>
                <TouchableOpacity style={styles.view4}>

                    <View style={styles.text}>
                        <Text style={styles.text2}>Edit your Email id</Text>

                        <Image style={styles.img}
                            source={require('../../Imagess/arrowiconVc.png')} />
                    </View>
                </TouchableOpacity>

                <View style={styles.view3}>

                    <View style={styles.text}>
                        <Text style={styles.text3}>Shaadi Meet</Text>


                    </View>
                </View>
                <TouchableOpacity style={styles.view4}>

                    <View style={styles.text}>
                        <Text style={styles.text2}>Edit your Meet Preferences</Text>

                        <Image style={styles.img}
                            source={require('../../Imagess/arrowiconVc.png')} />
                    </View>
                </TouchableOpacity>

                <View style={styles.view5}>

                    <View style={styles.text}>
                        <Text style={styles.text1}>Contact Filters</Text>

                    </View>
                </View>
                <TouchableOpacity style={styles.view6}>

                    <View style={styles.text}>
                        <Text style={styles.text2}>Filter Profile who can contact you</Text>

                        <Image style={styles.img}
                            source={require('../../Imagess/arrowiconVc.png')} />
                    </View>
                </TouchableOpacity>

                <View style={styles.view5}>

                    <View style={styles.text}>
                        <Text style={styles.text1}>Verification Badge</Text>

                    </View>
                </View>
                <TouchableOpacity style={styles.view6}>

                    <View style={styles.text}>
                        <Text style={styles.text2}>Visibal to all members</Text>

                        <Image style={styles.img}
                            source={require('../../Imagess/arrowiconVc.png')} />
                    </View>
                </TouchableOpacity>

                <View style={styles.view5}>

                    <View style={styles.text}>
                        <Text style={styles.text1}>Date of Birth</Text>

                    </View>
                </View>
                <TouchableOpacity style={styles.view6}>

                    <View style={styles.text}>
                        <Text style={styles.text2}>Show my full Date of Birth(dd/mm/yyy)</Text>

                        <Image style={styles.img}
                            source={require('../../Imagess/arrowiconVc.png')} />
                    </View>
                </TouchableOpacity>

                <View style={styles.view7}>
                    <View style={styles.text}>
                        <Text style={styles.text1}>Messages</Text>

                    </View>
                </View>
                <TouchableOpacity style={styles.view6}>

                    <View style={styles.text}>
                        <Text style={styles.textmassg}>Edit Messages for Connects,Accepts and Reaminders</Text>

                        <Image style={styles.img}
                            source={require('../../Imagess/arrowiconVc.png')} />
                    </View>
                </TouchableOpacity>
                <View style={styles.view8}>
                    <View style={styles.text}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#666666" }}>Hide/Delete Profile</Text>
                        <Image style={styles.img}
                            source={require('../../Imagess/arrowiconVc.png')} />

                    </View>
                </View>
                <TouchableOpacity onPress={signOut}>
                    <View style={styles.view8}>
                        <View style={styles.text}>
                            <Text style={styles.text1} >Logout</Text>
                        </View>
                    </View></TouchableOpacity>
            </ScrollView >
        </SafeAreaView>
    );

}

export default AccountSettings;
export const styles = StyleSheet.create({
    mainview: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FF5733',
        height: 50

    },
    hedertext: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: "bold",
        color: 'white'
    },
    text: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        width: '90%',
        justifyContent: 'space-between'
    },
    text1: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#666666"
    },
    text2: {
        fontSize: 14,
        fontWeight: "900",
        color: "gray"
    },
    text3: {
        fontSize: 14,
        fontWeight: "900",
        color: "#000"
    },
    textmassg: {
        fontSize: 14,
        fontWeight: "900",
        color: "gray",
        width: '90%',
    },
    img: {
        width: 25,
        height: 25,
        tintColor: 'black',
        transform: [{ rotate: '-90deg' }]
    },
    view: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    view1: {
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center'

    },
    view2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    view3: {
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
    },
    view4: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    view5: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center',
        marginTop: 10
    },
    view6: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center',
        borderBottomWidth: 0.5,
        paddingBottom: 10
    },
    view7: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center',
    },
    view8: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
        borderBottomWidth: 0.5,
        paddingBottom: 20
    }

});
