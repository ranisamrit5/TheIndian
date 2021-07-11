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
import { Picker } from 'native-base';

const Lifestyles = (props) => {
    const [text, setText] = useState('');
    const [selectedValue, setSelectedValue] = useState("Self");
    const [value, setValue] = React.useState('Kgs');
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


            <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: "600", color: 'gray', marginTop: 20 }}>Lifestyle</Text>
            <View style={{ backgroundColor: "lightgray", marginTop: 20, margin: 10 }}>



                <Text style={{ alignSelf: 'center', fontSize: 12, fontWeight: "600", color: 'gray', marginTop: 20 }}>All fields are mandatory.</Text>
                <SafeAreaView style={styles.mainBody}>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13
                    }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold", alignSelf: "center",
                        }}>Diet</Text>


                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: 180, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Veg" value="Veg" />
                                <Picker.Item label="Non-Veg" value="Non-Veg" />
                                <Picker.Item label="Occasionally Non-Veg" value="Occasionally Non-Veg" />
                                <Picker.Item label="Eggetarian" value="Eggetarian" />
                                <Picker.Item label="Jain" value="Jain" />
                                <Picker.Item label="Vegan" value="Vegan" />
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


export default Lifestyles;

export const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        padding: 10,


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
        color: 'black',
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 14,
        padding: 10,


    },

});