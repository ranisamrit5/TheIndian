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
import * as csc from 'country-state-picker';
import { Auth } from "aws-amplify";
import { Picker } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { familyType, annualoption, employoption, education_ } from "../../Const/const";
const Location = (props) => {
    const [text, setText] = useState('');
    const [selectedValue, setSelectedValue] = useState("Self");
    const [value, setValue] = React.useState('Kgs');
    const [number, onChangeNumber] = React.useState(null);
    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    let [data, setData] = useState({
        country: '',
        state: '',
        city: '',
        citizenship: ''
    });

    useEffect(() => {
        // setLoading(true)
        // csc.getCountries()

        Auth.currentAuthenticatedUser()
            .then((data) => {

                console.log('user----::')
                getCountry();
                // setId(data.username)
                // // props.id=data.username
                // getData(data.username)
            });
    }, []
    )
    let getCountry = async () => {
        let country__ = await csc.getCountries();
        // console.log('===>',country__)
        setCountry(country__)
    }
    const getLocation = (country_, state_) => {
        console.log(country_, state_)
        setState(csc.getStates(country_))
        if (country_ && state_)
            setCity()
        else if (country)
            setState(csc.getStates(country_))
        else if (state)
            setState()

    }
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
            <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: "600", color: 'gray', marginTop: 10 }}>Location,Education & Career</Text>

            <View style={{ backgroundColor: "#fff", marginTop: 10, }}>
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
                            }}>Country Living In </Text>


                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40, }}>
                            <Picker
                                selectedValue={data.country}
                                style={{ height: 40, width: 190, }}
                                onValueChange={(itemValue, itemIndex) => {
                                    console.log('===', itemIndex)
                                    getLocation(itemIndex, undefined);
                                    setData({ ...data, country: itemValue })
                                }}
                            >
                                {country.map((item, index) => {
                                    //   setCountry(item.code)
                                    return (< Picker.Item label={item.name} value={item.name} key={item.code} />);
                                })}
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
                            }}>State Living In</Text>


                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                {state.map((item, index) => {
                                    return (< Picker.Item label={item} value={item} key={index} />);
                                })}
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
                            }}>City Living In</Text>


                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <TextInput
                                style={{ height: 40, width: 200, }}
                                value={data.familyLocation}
                            // placeholder="Type here to translate!"
                            // onChangeText={text => setData({ ...data, familyLocation : text })}
                            // defaultValue={text}
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
                            }}>Zip/Pin Code</Text>


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
                            }}>Grew up in</Text>


                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                {country.map((item, index) => {
                                    //   setCountry(item.code)
                                    return (< Picker.Item label={item.name} value={item.name} key={item.code} />);
                                })}
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
                            }}>Ethnic Origin</Text>


                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                {country.map((item, index) => {
                                    //   setCountry(item.code)
                                    return (< Picker.Item label={item.name} value={item.name} key={item.code} />);
                                })}
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
                                fontWeight: "bold",
                            }}>Highest Qualification</Text>


                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40, }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: 150, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                {education_.map((item, index) => {
                                    //   setCountry(item.code)
                                    return (< Picker.Item label={item} value={item} key={item} />);
                                })}

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
                            }}>College Attended</Text>

                        </View>
                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <TextInput
                                style={{ height: 40, width: 200, }}
                                value={data.familyLocation}
                            // placeholder="Type here to translate!"
                            // onChangeText={text => setData({ ...data, familyLocation : text })}
                            // defaultValue={text}
                            />
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
                            }}>Working With</Text>


                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                {employoption.map((item, index) => {
                                    //   setCountry(item.code)
                                    return (< Picker.Item label={item.title} value={item.value} key={item} />);
                                })}

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
                            }}>Working As</Text>


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
                            }}>Employer Name</Text>


                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <TextInput
                                style={{ height: 40, width: 200, }}
                                value={data.familyLocation}
                            // placeholder="Type here to translate!"
                            // onChangeText={text => setData({ ...data, familyLocation : text })}
                            // defaultValue={text}
                            />
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
                            }}>Annual Income</Text>


                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                {annualoption.map((item, index) => {
                                    //   setCountry(item.code)
                                    return (< Picker.Item label={item.title} value={item.value} key={item} />);
                                })}
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


export default Location;

export const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        // backgroundColor: "#fff",
    },
    SubmitButtonStyle1: {
        width: "100%",
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