import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Text,
    Modal,
    SafeAreaView,
    Switch,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    Pressable,
    Button, Platform
} from 'react-native';
import Loader from '../../../Screen/Componentone/Loader';

const Myselftextinput = (props) => {
    const [text, setText] = useState('')
    const [height, setHeight] = useState(100)
    const [details, setDetails] = useState([])
    let [loading, setLoading] = useState(false);
    return (


        <SafeAreaView style={styles.safeContainer}>
            <Loader loading={loading} />
            <ScrollView nestedScrollEnabled={true}>
                <View style={styles.Hadera}>
                    <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => props.navigation.navigate('EditProfileScreen')}>
                        <Image style={styles.Imagehadera}
                            source={require('../../../Imagess/ErrorVector.png')} />
                    </TouchableOpacity>
                    <View style={{ width: '80%' }}>
                        <Text style={styles.textStyle}>{"My Profile"}</Text>
                    </View>
                </View>
                <Text style={styles.hadertextStyle}>{"More About Yourself,Partner and Family"}</Text>
                <View style={styles.mainBody}>
                    <Text style={styles.text}>{"Below field is mandatory."}</Text>
                    <View style={styles.box}>
                        <TextInput
                            style={styles.inputText}
                            {...props}
                            multiline={true}
                            onChangeText={(text) => {
                                setText(text)
                            }}
                            onContentSizeChange={(event) => {
                                setHeight(event.nativeEvent.contentSize.height)
                            }}
                            style={[styles.default, { height: Math.max(35, height) }]}
                            value={details.aboutMe}
                        />

                    </View>
                    <View style={styles.viewMainStyle}>
                        <Text style={styles.textrow}>{"Char count"}<Text style={{ fontSize: 18, color: "#000" }}>{" 496 "}</Text>{"(Min 50)"}</Text>
                    </View>
                    <Text style={styles.textStylemain}>{"This section will be screened everytime you update it."}</Text>
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            style={styles.SubmitButtonStyle1}
                            activeOpacity={.10}
                            onPress={() => { handleSubmit() }}>
                            <Text style={styles.TextStyle1}>{"Update"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </ScrollView >

        </SafeAreaView>


    );
}


export default Myselftextinput;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: "#EFEFEF"
    },
    safeContainer: {
        flex: 1,
        backgroundColor: "#EFEFEF"
    },
    mainBody: {
        flex: 1,
        backgroundColor: "#fff",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 16,
        marginBottom: 16,
        elevation: 5
    },
    text: {
        color: "gray",
        alignSelf: "center",
        fontSize: 15,
        marginTop: 16
    },
    box: {
        backgroundColor: "#fff",
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,
        borderWidth: 1,
        borderColor: "#0000001A",
    },
    inputText: {
        padding: 8,
        borderRadius: 8,
        fontSize: 16,
        color: "#000",
        flex: 1,
        height: 45,
        borderWidth: 0.5,
        alignSelf: 'stretch',
        paddingVertical: 0,
    },
    viewMainStyle: {
        backgroundColor: "lightgray",
        height: 45,
        marginLeft: 16,
        marginRight: 16
    },
    textrow: {
        color: "gray",
        fontSize: 15,
        marginLeft: 16,
        marginTop: 8,
        marginBottom: 8
    },
    textStylemain: {
        color: "gray",
        fontSize: 12,
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16
    },
    Hadera: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FF5733',
        height: 50
    },
    Imagehadera: {
        width: 20,
        height: 20,
        tintColor: 'white',
        transform: [{ rotate: '180deg' }]
    },
    textStyle: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: "bold",
        color: 'white'
    },
    hadertextStyle: {
        alignSelf: 'center',
        fontSize: 17,
        fontWeight: "600",
        color: 'gray',
        marginTop: 8
    },
    buttonView: {
        alignSelf: "center",
        marginBottom: 16,
        marginTop: 16
    },
    SubmitButtonStyle1: {
        width: 150,
        height: 40,
        alignSelf: "center",

        // paddingTop: 10,
        // paddingBottom: 15,
        // marginLeft: 100,
        // marginRight: 100,
        backgroundColor: '#FF5733',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FF5733',
        // bottom: 60
    },

    TextStyle1: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 14,
        padding: 10,


    },

});
