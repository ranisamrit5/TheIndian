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
import {Picker} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Astro = (props) => {
    const [text, setText] = useState('');
    const [selectedValue, setSelectedValue] = useState("Self");
    const [value, setValue] = React.useState('Kgs');
    const [number, onChangeNumber] = React.useState(null);

    return (

        <ScrollView>

            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', backgroundColor: '#FF5733', height: 50 }}>
                <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => props.navigation.pop()}>
                    <Image style={{ width: 20, height: 20, tintColor: 'white', transform: [{ rotate: '180deg' }] }}
                        source={require('../../../Imagess/ErrorVector.png')} />
                </TouchableOpacity>
                <View style={{ width: '80%' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: "bold", color: 'white' }}>Add Horoscope Details</Text>
                </View>
            </View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: '#FF5733', marginTop: 10,marginLeft:20,marginTop:20 }}>Update details for better Matches</Text>

            <View style={{  marginTop: 10 }}>
                <SafeAreaView style={styles.mainBody}>


                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "column", padding: 10,
                    }}>
                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row", padding: 10,
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 17,
                                fontWeight: "500",
                            }}>Country of Birth</Text>


                        </View>

                        <View style={{ borderColor: "gray",  height: 40,borderBottomWidth:0.5,width: "100%", }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: "100%" }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Select" value="Select" />
                                <Picker.Item label="Parent/Guardian" value="Parent/Guardian" />
                                <Picker.Item label="Sibling" value="Sibling" />
                                <Picker.Item label="Friend" value="Friend" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "column", padding: 10,
                    }}>
                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row", padding: 10,
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 17,
                                fontWeight: "500",
                            }}>City of Birth</Text>


                        </View>

                        <View style={{ borderColor: "gray",  height: 40,borderBottomWidth:0.5,width: "100%", }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: "100%" }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Select" value="Select" />
                                <Picker.Item label="Parent/Guardian" value="Parent/Guardian" />
                                <Picker.Item label="Sibling" value="Sibling" />
                                <Picker.Item label="Friend" value="Friend" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "column", padding: 10,
                    }}>
                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row", padding: 10,
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 17,
                                fontWeight: "500",
                            }}>Time of Birth</Text>


                        </View>

                        <View style={{ borderColor: "gray",  height: 40,borderBottomWidth:0.5,width: "100%", }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: "100%" }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Pick Time" value="Pick Time" />
                                <Picker.Item label="Parent/Guardian" value="Parent/Guardian" />
                                <Picker.Item label="Sibling" value="Sibling" />
                                <Picker.Item label="Friend" value="Friend" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>
                    </View>

                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "column", padding: 10,
                    }}>
                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row", padding: 10,
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 17,
                                fontWeight: "500",
                            }}>Magalik/ Chevvai Dosham</Text>


                        </View>

                        <View style={{ borderColor: "gray",  height: 40,borderBottomWidth:0.5,width: "100%", }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: "100%" }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Yes" value="Yes" />
                                <Picker.Item label="No" value="No" />
                                <Picker.Item label="Don't Know" value="Don't Know" />
                               
                            </Picker>
                        </View>
                    </View>

                    <Text style={{ fontSize: 17, fontWeight: "600", color: '#FF5733',  padding:20}}>Horoscope Privacy Setting</Text>


                    <View style={{
                    justifyContent: "space-between",
                    flexDirection: "row", width: "95%" 
                }}>
                    <Text style={{
                        color: "gray", fontSize: 15,
                      alignSelf: "center",marginLeft:20
                    }}>Visible to all Members</Text>


                    <TouchableOpacity onPress={() => props.navigation.navigate('BasicInfoScreen')}>
                    <MaterialCommunityIcons name="pencil-outline" color="black" size={15}  />
                    </TouchableOpacity>
                </View>
                    
                    <View style={{ alignSelf: "center",width:"100%",marginTop:60 }}>
                        <TouchableOpacity
                            style={styles.SubmitButtonStyle1}
                            activeOpacity={.10}
                        //   onPress={() =>

                        // this.props.navigation.navigate('Customerlogin')
                        // navigation.navigate('Customerlogin')}


                        >

                            <Text style={styles.TextStyle1}>SAVE & CONTINUE</Text>

                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </ScrollView >

    );
}


export default Astro;

export const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        // backgroundColor: "#fff",
    },
    SubmitButtonStyle1: {
        width:"100%",
        height: 50,
        alignSelf: "center",

        // paddingTop: 10,
        // paddingBottom: 15,
        // marginLeft: 100,
        // marginRight: 100,
        backgroundColor: 'skyblue',
     
        borderWidth: 1,
        borderColor: 'skyblue',
        // bottom: 60,

    },

    TextStyle1: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 14,
        padding: 10,


    },
});