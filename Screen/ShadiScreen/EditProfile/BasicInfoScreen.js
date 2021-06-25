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
    Pressable,
    Button, Platform
} from 'react-native';
import calendar from '../../../Imagess/calendar.png'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Auth } from "aws-amplify";
import { Picker } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { graphql, withApollo } from "react-apollo";
import compose from "lodash.flowright";
import Getdata from "../../../AppSync/query/Auth/getData";
import updateUser from "../../../AppSync/mutation/User/updateData";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    profileoption, religionoption, chidoption, languageoption, statusoption, annualoption, familyVal, heightoption, countryoption,
    stateoption, cityoption, rassioption, castoption, degreeoption, employoption, employeeption
} from "../../Const/const";

const BasicInfoScreen = (props) => {
    const [text, setText] = useState('');
    const [selectedValue, setSelectedValue] = useState("Self");
    const [gender, setGender] = useState("");
    const [marital, setMaterial] = useState("");
    const [height, setHeight] = useState("");
    const [value, setValue] = useState('Kgs');
    let [data, setData] = useState([]);
    const [id, setId] = useState()
    let [loading, setLoading] = useState(false);
    const [basicInfo, setBasicInfo] = useState({
        id: '',
        fname: '',
        lname: '',
        dob: '',
        maritalStatus: 'SINGLE',
        noOfChildren: 0,
        height: '',
        physicalStatus: '',
        religion: 'Hindu',
        caste: '',
        subcaste: '',
        profileCreatedFor: 'Self',
        motherTongue: '',
        languagesKnown: '',
        gotram: '',
        star: '',
        manglik: '',
        eatingHabit: '',
        smokingHabit: '',
        drinkingHabit: '',
        aboutMe: ''
    })

    useEffect(() => {
        setLoading(true)
        Auth.currentAuthenticatedUser()
            .then((data) => {
                // console.log('user----::',data)
                setId(data.username)
                // props.id=data.username
                getData(data.username)
            });
    }, []
    )

    const handleSubmit = async (e) => {
        try {

            let data_ = data
            console.log('Table', data_.tablename, marital, height, gender)
            console.log('ID', data_.id)
            setBasicInfo({
                ...basicInfo,
                height: height,
                gender: gender,
                maritalStatus: marital
            })
            const savedData = await props.updateUser({ variables: { input: basicInfo } })
            console.log(savedData)

        } catch (err) {
            console.log('error creating todo:', err)
        }
    }

    const getData = async (user) => {
        console.log('user----::', user)
        const { data } = await props.client.query({
            query: Getdata,
            fetchPolicy: "network-only",
            variables: {
                id: `${user}`,
            },
        });
        if (data) {
            let userData = data.getUser
            setData(userData)
            console.log(userData);
            const { noOfChildren, maritalStatus, eatingHabit, smokingHabit, drinkingHabit, manglik, physicalStatus,
                religion, caste, star, height, motherTongue, dob, aboutMe, fname, profileCreatedFor
            } = userData
            setBasicInfo({
                ...basicInfo,
                id: user,
                profileCreatedFor: !profileCreatedFor ? "Self" : profileCreatedFor,
                maritalStatus: !maritalStatus ? "SINGLE" : maritalStatus,
                // maritalStatus: maritalStatus !== null ? maritalStatus : 0,
                noOfChildren: !noOfChildren ? 0 : noOfChildren,
                eatingHabit: eatingHabit,
                smokingHabit: smokingHabit,
                drinkingHabit: drinkingHabit,
                manglik: manglik,
                physicalStatus: physicalStatus,
                religion: religion,
                caste: caste,
                star: star,
                height: !height ? 0 : height,
                motherTongue: motherTongue,
                dob: dob,
                aboutMe: aboutMe,
                fname: fname

            });
        }
        setLoading(false)
    }
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
    return (

        <View safe style={styles.container}>
            <Spinner visible={props.isLoading} />
            <SafeAreaView style={styles.safeContainer}>
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'} style={styles.keyBordContainer}>
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
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: "600", color: 'gray', marginTop: 20 }}>Basic Info</Text>

                        <View style={{ backgroundColor: "#fff", marginTop: 10 }}>


                            <View style={{
                                justifyContent: "space-between",
                                flexDirection: "row", padding: 13,
                            }}>
                                <View style={{
                                    justifyContent: "space-between",
                                    flexDirection: "row", alignSelf: "center"
                                }}>
                                    <Text style={{
                                        color: "gray", fontSize: 15,
                                        fontWeight: "bold",
                                    }}>Profile create by</Text>
                                    <Text style={{
                                        color: "red", fontSize: 15,
                                        fontWeight: "bold"
                                    }}>*</Text>

                                </View>

                                <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                                    <Picker
                                        selectedValue={selectedValue}
                                        style={{ height: 40, width: 200, }}
                                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                    >
                                        {profileoption.map((item, index) => {
                                            return (< Picker.Item label={item.title} value={item.title} key={index} />);
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
                                    flexDirection: "row", alignSelf: "center"
                                }}>
                                    <Text style={{
                                        color: "gray", fontSize: 15,
                                        fontWeight: "bold"
                                    }}>Gender</Text>


                                </View>

                                <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                                    <Picker
                                        selectedValue={gender}
                                        style={{ height: 40, width: 200, }}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setGender(itemValue)
                                            setBasicInfo({ ...basicInfo, gender: itemValue })
                                        }}
                                    >
                                        <Picker.Item label="Male" value="MALE" />
                                        <Picker.Item label="Female" value="FEMALE" />
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
                                    flexDirection: "row", alignSelf: "center"
                                }}>
                                    <Text style={{
                                        color: "gray", fontSize: 15,
                                        fontWeight: "bold"
                                    }}>Date Of Birth</Text>
                                </View>
                                <View>
      
    
                       {show && (
                          <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
                                <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>

                                    <View style={{ height: 40, width: 197, }}>
                                        <TouchableOpacity onPress={showDatepicker} >

                                            <Image
                                                source={calendar}
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    resizeMode: 'contain',
                                                    alignSelf: "flex-end",
                                                    marginTop: 7,
                                                    right: 10
                                                }}
                                            />
                                        </TouchableOpacity>



                                    </View>

                                </View>

                            </View>
                            <View style={{
                                justifyContent: "space-between",
                                flexDirection: "row", padding: 13,

                            }}>
                                <View style={{
                                    justifyContent: "space-between",
                                    flexDirection: "row", alignSelf: "center"
                                }}>
                                    <Text style={{
                                        color: "gray", fontSize: 15,
                                        fontWeight: "bold"
                                    }}>Marital status</Text>
                                    <Text style={{
                                        color: "red", fontSize: 15,
                                        fontWeight: "bold"
                                    }}>*</Text>

                                </View>

                                <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                                    <Picker
                                        selectedValue={marital}
                                        style={{ height: 40, width: 200, }}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setMaterial(itemValue)
                                            setBasicInfo({ ...basicInfo, maritalStatus: itemValue })
                                        }}

                                    >
                                        {statusoption.map((item, index) => {
                                            return (< Picker.Item label={item.title} value={item.value} key={index} />);
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
                                    flexDirection: "row", alignSelf: "center"
                                }}>
                                    <Text style={{
                                        color: "gray", fontSize: 15,
                                        fontWeight: "bold"
                                    }}>Height</Text>


                                </View>

                                <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                                    <Picker
                                        selectedValue={height}
                                        style={{ height: 40, width: 200, }}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setBasicInfo({ ...basicInfo, height: itemValue })
                                            setHeight(itemValue)
                                        }}
                                    >
                                        {heightoption.map((item, index) => {
                                            return (< Picker.Item label={item.title} value={item.value} key={index} />);
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
                                    flexDirection: "row", alignSelf: "center"
                                }}>
                                    <Text style={{
                                        color: "gray", fontSize: 15,
                                        fontWeight: "bold"
                                    }}>Physical Status</Text>
                                    <Text style={{
                                        color: "red", fontSize: 15,
                                        fontWeight: "bold"
                                    }}>*</Text>

                                </View>

                                <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                                    <Picker
                                        selectedValue={selectedValue}
                                        style={{ height: 40, width: 200, }}
                                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                    >
                                        <Picker.Item label="Normal" value="NORMAL" />
                                        <Picker.Item label="Physical Disability" value="PHYSICALLY_CHALLENGED" />

                                    </Picker>
                                    <View style={{ height: 10 }}></View>
                                </View>
                            </View>

                            <View style={{
                                justifyContent: "space-between",
                                flexDirection: "row",

                            }}>
                                <View style={{
                                    justifyContent: "space-between", alignSelf: "center",
                                    flexDirection: "row", padding: 13, width: "100%"
                                }}>
                                    <Text style={{
                                        color: "gray", fontSize: 14,
                                        fontWeight: "bold"
                                    }}>Health Information</Text>




                                    <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                                        <Picker
                                            selectedValue={selectedValue}
                                            style={{ height: 40, width: 200, }}
                                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                        >
                                            <Picker.Item label="Select" value="Select" />
                                            <Picker.Item label="No Health Problems" value="No Health Problems" />
                                            <Picker.Item label="HIV positive" value="HIV positive" />
                                            <Picker.Item label="Diabetes" value="Diabetes" />
                                            <Picker.Item label="Low BP" value="Low BP" />
                                            <Picker.Item label="High BP" value="High BP" />
                                            <Picker.Item label="Herat Ailments" value="Herat Ailments" />
                                            <Picker.Item label="Other" value="Other" />
                                        </Picker>
                                        <View style={{ height: 10 }}></View>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                justifyContent: "space-between",
                                flexDirection: "row", padding: 13,

                            }}>
                                <View style={{
                                    justifyContent: "space-between",
                                    flexDirection: "row", alignSelf: "center"
                                }}>
                                    <Text style={{
                                        color: "gray", fontSize: 15,
                                        fontWeight: "bold"
                                    }}>Blood Group</Text>


                                </View>

                                <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                                    <Picker
                                        selectedValue={selectedValue}
                                        style={{ height: 40, width: 200, }}
                                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                    >
                                        <Picker.Item label="Select" value="Select" />
                                        <Picker.Item label="Don't Know" value="Don't Know" />
                                        <Picker.Item label="A+" value="A+" />
                                        <Picker.Item label="A-" value="A-" />
                                        <Picker.Item label="B+" value="B+" />
                                        <Picker.Item label="B-" value="B-" />
                                        <Picker.Item label="AB+" value="AB+" />
                                        <Picker.Item label="AB-" value="AB-" />
                                        <Picker.Item label="O+" value="O+" />
                                        <Picker.Item label="O-" value="O-" />

                                    </Picker>
                                    <View style={{ height: 10 }}></View>
                                </View>

                            </View>
                            <View style={{ alignSelf: "center", marginTop: 20 }}>
                                <TouchableOpacity
                                    style={styles.SubmitButtonStyle1}
                                    activeOpacity={.10}
                                    onPress={() => { handleSubmit() }}


                                >

                                    <Text style={styles.TextStyle1}>Update</Text>

                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView >
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </View>

    );
}


const profile = compose(
    withApollo,
    graphql(updateUser, { name: "updateUser" })
)(BasicInfoScreen);
export default profile;


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: "#fff"
    },
    safeContainer: {
        flex: 1,
        backgroundColor: "#fff"
    },

    keyBordContainer: {
        flex: 1,
        flexDirection: 'column',
    },

    SubmitButtonStyle1: {
        width: 150,
        height: 40,
        alignSelf: "center",
        backgroundColor: '#FF5733',
        borderRadius: 10,
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