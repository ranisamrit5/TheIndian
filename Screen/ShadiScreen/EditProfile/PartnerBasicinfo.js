import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    SafeAreaView,
    Switch,
    StyleSheet,
    TouchableOpacity,
    Image,

    Button, Platform
} from 'react-native';
import { Picker } from 'native-base';
import Slider from '@react-native-community/slider'

const PartnerBasicinfo = (props) => {
    const [text, setText] = useState('');
    const [selectedValue, setSelectedValue] = useState("Self");
    const [sliderValue, setSliderValue] = useState(15);

    const [number, onChangeNumber] = React.useState(null);
    const [value, setValue] = useState()
    return (

        <ScrollView style={{ backgroundColor: "#fff" }}>

            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', backgroundColor: '#FF5733', height: 50 }}>
                <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => props.navigation.pop()}>
                    <Image style={{ width: 20, height: 20, tintColor: 'white', transform: [{ rotate: '180deg' }] }}
                        source={require('../../../Imagess/ErrorVector.png')} />
                </TouchableOpacity>
                <View style={{ width: '80%' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: "bold", color: 'white' }}>My Profile</Text>
                </View>
            </View>

            <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: "600", color: 'gray', marginTop: 20 }}>Tell us what you are looking for in a life partner</Text>
            <View style={{ backgroundColor: "#fff", marginTop: 20 }}>
                <SafeAreaView style={styles.mainBody}>
                    <Text style={{
                        color: "gray", fontSize: 12,
                        fontWeight: "bold", padding: 10, marginLeft: 10
                    }}>Age</Text>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: 20, bottom: 20
                    }}>

                        <Text style={{
                            color: "gray", fontSize: 12,
                            fontWeight: "bold",
                        }}>Min 21 yrs</Text>


                        <Text style={{
                            color: "gray", fontSize: 12,
                            fontWeight: "bold",
                        }}>Max 46 yrs</Text>

                    </View>

                    < Slider
                        style={{ bottom: 20, width: "90%", alignSelf: "center" }}
                        maximumValue={46}
                        minimumValue={21}
                        minimumTrackTintColor="#307ecc"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderValue}
                        onValueChange={
                            (sliderValue) => setSliderValue(sliderValue)
                        }
                    />
                    <Text style={{
                        color: "gray", fontSize: 12,
                        fontWeight: "bold", padding: 10, marginLeft: 10
                    }}>Hieght</Text>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: 20, bottom: 20
                    }}>

                        <Text style={{
                            color: "gray", fontSize: 12,
                            fontWeight: "bold",
                        }}>Min 4'5"</Text>


                        <Text style={{
                            color: "gray", fontSize: 12,
                            fontWeight: "bold",
                        }}>Max 7'0"</Text>

                    </View>

                    < Slider
                        style={{ bottom: 20, width: "90%", alignSelf: "center" }}
                        maximumValue={46}
                        minimumValue={21}
                        minimumTrackTintColor="#307ecc"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderValue}
                        onValueChange={
                            (sliderValue) => setSliderValue(sliderValue)
                        }
                    />
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13
                    }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold", alignSelf: "center",
                        }}>Marital Status</Text>


                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: 180, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Open to all" value="Open to all" />
                                <Picker.Item label="Never Married" value="Never Married" />
                                <Picker.Item label="Divorced" value="Divorced" />
                                <Picker.Item label="Widowed" value="Widowed" />
                                <Picker.Item label="Awaiting Divorce" value="Awaiting Divorce" />
                                <Picker.Item label="Annulled" value="Annulled" />
                            </Picker>

                        </View>
                    </View>

                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13
                    }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold", alignSelf: "center",
                        }}>Religion</Text>


                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: 180, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Open to all" value="Open to all" />
                                <Picker.Item label="Hindu" value="Hindu" />
                                <Picker.Item label="Muslim" value="Muslim" />
                                <Picker.Item label="Christian" value="Christian" />
                                <Picker.Item label="Sikh" value="Sikh" />
                                <Picker.Item label="Parsi" value="Parsi" />
                                <Picker.Item label="Jain" value="Jain" />
                                <Picker.Item label="Buddhist" value="Buddhist" />
                                <Picker.Item label="Jewish" value="Jewish" />
                                <Picker.Item label="No Religion" value="No Religion" />
                                <Picker.Item label="Spiritual-not religious" value="Spiritual-not religious" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>

                        </View>
                    </View>

                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13
                    }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold", alignSelf: "center",
                        }}>Community</Text>


                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: 180, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Open to all" value="Open to all" />
                                <Picker.Item label="Hindu" value="Hindu" />
                                <Picker.Item label="Muslim" value="Muslim" />
                                <Picker.Item label="Christian" value="Christian" />
                                <Picker.Item label="Sikh" value="Sikh" />
                                <Picker.Item label="Parsi" value="Parsi" />
                                <Picker.Item label="Jain" value="Jain" />
                                <Picker.Item label="Buddhist" value="Buddhist" />
                                <Picker.Item label="Jewish" value="Jewish" />
                                <Picker.Item label="No Religion" value="No Religion" />
                                <Picker.Item label="Spiritual-not religious" value="Spiritual-not religious" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>

                        </View>
                    </View>

                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13
                    }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold", alignSelf: "center",
                        }}>Mother Tongue</Text>


                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: 180, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Open to all" value="Open to all" />
                                <Picker.Item label="Hindu" value="Hindu" />
                                <Picker.Item label="Muslim" value="Muslim" />
                                <Picker.Item label="Christian" value="Christian" />
                                <Picker.Item label="Sikh" value="Sikh" />
                                <Picker.Item label="Parsi" value="Parsi" />
                                <Picker.Item label="Jain" value="Jain" />
                                <Picker.Item label="Buddhist" value="Buddhist" />
                                <Picker.Item label="Jewish" value="Jewish" />
                                <Picker.Item label="No Religion" value="No Religion" />
                                <Picker.Item label="Spiritual-not religious" value="Spiritual-not religious" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>

                        </View>
                    </View>



                    <View style={{
                        justifyContent: "space-between",
                        padding: 13,
                    }}>
                        <View style={{ alignSelf: "center", }}>
                            <TouchableOpacity
                                style={styles.SubmitButtonStyle1}
                                activeOpacity={.10}
                            //   onPress={() =>

                            // this.props.navigation.navigate('Customerlogin')
                            // navigation.navigate('Customerlogin')}


                            >

                                <Text style={styles.TextStyle1}>Update</Text>

                            </TouchableOpacity>
                        </View>

                    </View>
                </SafeAreaView>
            </View>
        </ScrollView>
    );
}


export default PartnerBasicinfo;

export const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        backgroundColor: "#fff",
    },
    SubmitButtonStyle1: {
        width: 150,
        height: 40,
        alignSelf: "center",
        marginTop:16,
        marginBottom:16,
        backgroundColor: '#FF5733',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FF5733',
       
    },

    TextStyle1: {
        color: 'black',
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 14,
        padding: 10,


    },
});