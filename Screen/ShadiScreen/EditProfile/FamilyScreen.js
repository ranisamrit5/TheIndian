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
import { RadioButton, Card } from 'react-native-paper';


const FamilyScreen = (props) => {
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
                    <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: "bold", color: 'white' }}>My Profile</Text>
                </View>
            </View>
            <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: "600", color: 'gray', marginTop: 10 }}>Family</Text>

            <View style={{ backgroundColor: "#fff", marginTop: 10 }}>
                <SafeAreaView style={styles.mainBody}>


                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,
                    }}>
                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row", padding: 13,
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold"
                            }}>Father's Status</Text>


                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Self" value="Self" />
                                <Picker.Item label="Parent/Guardian" value="Parent/Guardian" />
                                <Picker.Item label="Sibling" value="Sibling" />
                                <Picker.Item label="Friend" value="Friend" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,
                    }}>
                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row", padding: 13,
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold"
                            }}>Mother's Status</Text>


                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Self" value="Self" />
                                <Picker.Item label="Parent/Guardian" value="Parent/Guardian" />
                                <Picker.Item label="Sibling" value="Sibling" />
                                <Picker.Item label="Friend" value="Friend" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,

                    }}>
                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row", padding: 13,
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold"
                            }}>Family Location</Text>


                        </View>

                        <View style={{
                            borderColor: "gray", borderWidth: 1,
                            borderRadius: 5, height: 40,
                        }}>
                            <TextInput
                                style={{ height: 40, width: 200, }}
                                // placeholder="Type here to translate!"
                                onChangeText={text => setText(text)}
                                defaultValue={text}
                            />

                        </View>

                    </View>

                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,

                    }}>
                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row", padding: 13,
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold"
                            }}>Native Place</Text>


                        </View>

                        <View style={{
                            borderColor: "gray", borderWidth: 1,
                            borderRadius: 5, height: 40,
                        }}>
                            <TextInput
                                style={{ height: 40, width: 200, }}
                                // placeholder="Type here to translate!"
                                onChangeText={text => setText(text)}
                                defaultValue={text}
                            />

                        </View>

                    </View>

                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,

                    }}>
                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row", padding: 13,
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold"
                            }}>No.of Siblings</Text>


                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, width: 200 }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold", alignSelf: "center",marginTop:10
                            }}>No.of Brother's</Text>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 16 }}>

                                <TextInput
                                    style={{ height: 40, width: 40, borderColor: "gray", borderWidth: 1, borderRadius: 5, }}
                                    // placeholder="Type here to translate!"
                                    onChangeText={text => setText(text)}
                                    // value={number}
                                    keyboardType="number-pad"

                                    
                                />
                           
                           <Image style={{ width: 40, height: 40, borderRadius: 10, }}
                                    source={require('../../../Imagess/avtar.png')} />
                                <TextInput
                                    style={{ height: 40, width: 40, borderColor: "gray", borderWidth: 1, borderRadius: 5, }}
                                    // placeholder="Type here to translate!"
                                    onChangeText={text => setText(text)}
                                    value={number}
                                    keyboardType="number-pad"

                                />
                            </View>
                            <View style={{ flexDirection: "row",  padding: 10,justifyContent:"space-between" }}>
                           <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "600",bottom:20
                            }}>Not Married</Text>

                         <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "600",bottom:20
                            }}>Married</Text>
                            
                           </View>
    

    
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold", alignSelf: "center",marginTop:10
                            }}>No.of Sister(s)</Text>


                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 16 }}>



                                <TextInput
                                    style={{ height: 40, width: 40, borderColor: "gray", borderWidth: 1, borderRadius: 5, }}
                                    // placeholder="Type here to translate!"
                                    onChangeText={text => setText(text)}
                                    defaultValue={text}
                                    keyboardType="number-pad"

                                />

                                <Image style={{ width: 35, height: 35, borderRadius: 10, }}
                                    source={require('../../../Imagess/girl.png')} />
                                <TextInput
                                    style={{ height: 40, width: 40, borderColor: "gray", borderWidth: 1, borderRadius: 5, }}
                                    // placeholder="Type here to translate!"
                                    onChangeText={text => setText(text)}
                                    defaultValue={text}
                                    keyboardType="number-pad"
                                />
                            </View>
                            <View style={{ flexDirection: "row",  padding: 10,justifyContent:"space-between", }}>
                           <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "600",bottom:20
                            }}>Not Married</Text>

                         <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "600",bottom:20
                            }}>Married</Text>
                            
                           </View>

                        </View>

                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,

                    }}>
                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row", padding: 13,
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold"
                            }}>Family Type</Text>


                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Select" value="Select" />
                                <Picker.Item label="Joint" value="Joint" />
                                <Picker.Item label="Nuclear" value="Nuclear" />
                            </Picker>
                            <View style={{ height: 10 }}></View>
                        </View>

                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,

                    }}>
                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row", padding: 13,
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold"
                            }}>Family Values</Text>
                           

                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Select" value="Select" />
                                <Picker.Item label="Treditional" value="Treditional" />
                                <Picker.Item label="Moderate" value="Moderate" />
                                <Picker.Item label="Liberal" value="Liberal" />

                            </Picker>
                            <View style={{ height: 10 }}></View>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,

                    }}>
                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row", padding: 13,
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold"
                            }}>Affluence Level</Text>
                           

                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Select" value="Select" />
                                <Picker.Item label="Affluent" value="Affluent" />
                                <Picker.Item label="Upper Middle Class" value="Upper Middle Class" />
                                <Picker.Item label="Lower Middle Class" value="Lower Middle Class" />

                            </Picker>
                            <View style={{ height: 10 }}></View>
                        </View>
                    </View>
                        
                    
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
                </SafeAreaView>
            </View>
        </ScrollView >

    );
}


export default FamilyScreen;

export const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        // backgroundColor: "#fff",
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
        borderRadius: 10,
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