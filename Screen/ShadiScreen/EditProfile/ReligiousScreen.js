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
// import HeaderComponent from "../../../components/HeaderComponent";
// import { BACKGROUNDCOLOR, BLACK, RED, WHITE } from "../../../themes/colors";
import { RadioButton, } from 'react-native-paper';


const ReligiousScreen = (props) => {
    const [text, setText] = useState('');
    const [selectedValue, setSelectedValue] = useState("Self");
    const [value, setValue] = React.useState('Kgs');
    return (

        <ScrollView>


                        <View style={{flexDirection:'row',width:'100%',alignItems:'center',backgroundColor:'#FF5733',height:50}}>
                        <TouchableOpacity style={{marginLeft:20}} onPress={()=>props.navigation.pop()}>
                            <Image style={{width:20,height:20,tintColor:'white',transform: [{ rotate: '180deg'}]}}
                                source={require('../../../Imagess/ErrorVector.png')} />
                        </TouchableOpacity>
                       <View style={{width:'80%'}}>
                            <Text style={{alignSelf:'center',fontSize:18,fontWeight:"bold",color:'white'}}>My Profile</Text>
                       </View>
                       
                </View>
                <Text style={{alignSelf:'center',fontSize:18,fontWeight:"600",color:'gray',marginTop:20}}>Religion Background</Text>

                <View style={{backgroundColor:"#fff",marginTop:20}}>
            <SafeAreaView style={styles.mainBody}>
                <View style={{
                     justifyContent: "space-between",
                    flexDirection: "row", padding: 13
                }}>
                    <Text style={{
                        color: "gray", fontSize: 15,
                        fontWeight: "bold"
                    }}>Religion</Text>

                    <Text style={{
                        color: "red", fontSize: 15,
                        fontWeight: "bold", marginRight: 70
                    }}>*</Text>
                    <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 40, width: 180, }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Hindu" value="Hindu" />
                            <Picker.Item label="Muslim" value="Muslim" />
                            <Picker.Item label="Christian" value="Christian" />
                            <Picker.Item label="Sikh" value="Sikh" />
                            <Picker.Item label="Parsi" value="Parsi" />
                            <Picker.Item label="Jain" value="Jain" />
                            <Picker.Item label="Buddhist" value="Buddhist" />
                            <Picker.Item label="Jewish" value="Jewish" />
                            <Picker.Item label="No Religon" value="No Religon" />
                            <Picker.Item label="Spiritual" value="Spiritual" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                        <View style={{ height: 10 }}></View>
                    </View>
                </View>
                <View style={{
                     justifyContent: "space-between",
                    flexDirection: "row", padding: 13,
                }}>
                    <Text style={{
                        color: "gray", fontSize: 15,
                        fontWeight: "bold"
                    }}>Mother Tongue</Text>
                    <Text style={{
                        color: "red", fontSize: 15,
                        fontWeight: "bold", marginRight: 20
                    }}>*</Text>
                    <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 40, width: 180, }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Hindu" value="Hindu" />
                            <Picker.Item label="Muslim" value="Muslim" />
                            <Picker.Item label="Christian" value="Christian" />
                            <Picker.Item label="Sikh" value="Sikh" />
                            <Picker.Item label="Parsi" value="Parsi" />
                            <Picker.Item label="Jain" value="Jain" />
                            <Picker.Item label="Buddhist" value="Buddhist" />
                            <Picker.Item label="Jewish" value="Jewish" />
                            <Picker.Item label="No Religon" value="No Religon" />
                            <Picker.Item label="Spiritual" value="Spiritual" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                        <View style={{ height: 10 }}></View>
                    </View>
                </View>
                <View style={{
                 justifyContent: "space-between",
                    flexDirection: "row", padding: 13,
                }}>
                    <Text style={{
                        color: "gray", fontSize: 15,
                        fontWeight: "bold"
                    }}>Community</Text>
                    <Text style={{
                        color: "red", fontSize: 15,
                        fontWeight: "bold", marginRight: 40
                    }}>*</Text>
                    <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 40, width: 180, }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Hindu" value="Hindu" />
                            <Picker.Item label="Muslim" value="Muslim" />
                            <Picker.Item label="Christian" value="Christian" />
                            <Picker.Item label="Sikh" value="Sikh" />
                            <Picker.Item label="Parsi" value="Parsi" />
                            <Picker.Item label="Jain" value="Jain" />
                            <Picker.Item label="Buddhist" value="Buddhist" />
                            <Picker.Item label="Jewish" value="Jewish" />
                            <Picker.Item label="No Religon" value="No Religon" />
                            <Picker.Item label="Spiritual" value="Spiritual" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                        <View style={{ height: 10 }}></View>
                    </View>
                </View>
                <View style={{
                     justifyContent: "space-between",
                    flexDirection: "row", padding: 13,
                }}>
                    <Text style={{
                        color: "gray", fontSize: 15,
                        fontWeight: "bold"
                    }}>Sub-Community</Text>
                    <Text style={{
                        color: "red", fontSize: 15,
                        fontWeight: "bold", marginRight: 10
                    }}>*</Text>
                    <View style={{
                        borderColor: "gray",
                        borderWidth: 1, borderRadius: 5, height: 40, width: 179
                    }}>
                        <TextInput></TextInput>
                        <View style={{ height: 10 }}></View>
                    </View>
                </View>
                <View style={{
                      justifyContent: "space-between",
                    flexDirection: "row", padding: 13,
                }}>
                    <Text style={{
                        color: "gray", fontSize: 15,

                    }}>Not Particular about my Partner's Cast/Sect (Caste No Bar)</Text>


                </View>

                <View style={{
                     justifyContent: "space-between",
                    flexDirection: "row", padding: 13,
                }}>
                    <Text style={{
                        color: "gray", fontSize: 15,
                        fontWeight: "bold"
                    }}>Gothra/Gothram</Text>

                    <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 40, width: 180, }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Hindu" value="Hindu" />
                            <Picker.Item label="Muslim" value="Muslim" />
                            <Picker.Item label="Christian" value="Christian" />
                            <Picker.Item label="Sikh" value="Sikh" />
                            <Picker.Item label="Parsi" value="Parsi" />
                            <Picker.Item label="Jain" value="Jain" />
                            <Picker.Item label="Buddhist" value="Buddhist" />
                            <Picker.Item label="Jewish" value="Jewish" />
                            <Picker.Item label="No Religon" value="No Religon" />
                            <Picker.Item label="Spiritual" value="Spiritual" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                        <View style={{ height: 10 }}></View>
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
        </ScrollView >

    );
}


export default ReligiousScreen;

export const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        // backgroundColor: "#ECECEC",
        padding: 10


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