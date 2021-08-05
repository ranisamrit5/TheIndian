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
    Pressable,YellowBox,
    Button, Platform
} from 'react-native';
import calendar from '../../../Imagess/calendar.png'
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { Auth } from "aws-amplify";
import { graphql, withApollo } from "react-apollo";
import compose from "lodash.flowright";
import Getdata from "../../../AppSync/query/Auth/getData";
import updateUser from "../../../AppSync/mutation/User/updateData";
import Loader from '../../../Screen/Componentone/Loader';
import { userDataMapper } from '../../Mappers/mapper'
import {
    profileoption,  statusoption, heightoption, 
     castoption
} from "../../Const/const";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import moment from 'moment';
const BasicInfoScreen = (props) => {
    const [text, setText] = useState('');
    const [selectedValue, setSelectedValue] = useState("");
    const [gender, setGender] = useState("");
    const [marital, setMaterial] = useState("");
    const [height, setHeight] = useState("");
    const [value, setValue] = useState('Kgs');
    let [data, setData] = useState([]);
    const [id, setId] = useState()
    let [loading, setLoading] = useState(false);
    const [chosenDate, setChosenDate] = useState(new Date());
    const [basicInfo, setBasicInfo] = useState({
        id: '',
        fname: '',
        lname: '',
        dob: '',
        maritalStatus: '',
        noOfChildren: 0,
        height: '',
        physicalStatus: '',
        religion: '',
        caste: '',
        subcaste: '',
        profileCreatedFor: '',
        motherTongue: '',
        languagesKnown: '',
        gotram: '',
        star: '',
        manglik: '',
        eatingHabit: '',
        smokingHabit: '',
        drinkingHabit: '',
        aboutMe: '',
        gender:''
    })
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        console.log(isDatePickerVisible)
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setBasicInfo({
            ...basicInfo,
            dob: date
        })
        hideDatePicker();
    };
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
        setLoading(true)
        try {

            let data_ = data
            console.log('Table', data_.tablename, marital, height, gender)
            console.log('ID', data_.id)
            // setBasicInfo({
            //     ...basicInfo,
            //     height: height,
            //     gender: gender,
            //     maritalStatus: marital
            // })
            const savedData = await props.updateUser({ variables: { input: basicInfo } })
            console.log(savedData)

        } catch (err) {
            console.log('error creating todo:', err)
        }
        setLoading(false)
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
            let all = {}
            all.data = data.getUser
            let pDetails = userDataMapper(all)
            setData(userData)
            
            const { noOfChildren, maritalStatus_, eatingHabit, smokingHabit, drinkingHabit, manglik, physicalStatus,
                religion, caste, star, height, motherTongue, dob, aboutMe, fname, profileCreatedFor,gender_,height_,physicalStatus_
            } = pDetails
            console.log('IN===>',maritalStatus_);

            setMaterial()
            setGender(gender)
            setBasicInfo({
                ...basicInfo,
                id: user,
                profileCreatedFor: profileCreatedFor,
                maritalStatus:  maritalStatus_,
                // maritalStatus: maritalStatus !== null ? maritalStatus : 0,
                noOfChildren:  noOfChildren,
                eatingHabit: eatingHabit,
                smokingHabit: smokingHabit,
                drinkingHabit: drinkingHabit,
                manglik: manglik,
                physicalStatus: physicalStatus_,
                religion: religion,
                caste: caste,
                star: star,
                height: height_,
                motherTongue: motherTongue,
                dob: dob,
                aboutMe: aboutMe,
                fname: fname,
                gender:gender_,

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

        console.log('-----')
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    console.log('----->',basicInfo.manglik)
    return (

        <View safe style={styles.container}>
            <Loader loading={loading} />
            <Spinner visible={props.isLoading} />
            <SafeAreaView style={styles.safeContainer}>
                <KeyboardAwareScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps={'always'} style={styles.keyBordContainer}>
                    <ScrollView nestedScrollEnabled={true}>

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
                                {/* <FlatList
                                        data={profileoption}
                                        renderItem={({ item }) => (<Text>{item.title}</Text>)}
                                        keyExtractor={(item, index) => String(index)}
                                    /> */}
                                    <Picker
                                        selectedValue={basicInfo.profileCreatedFor}
                                        style={{ height: 40, width: 200 }}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setBasicInfo({ ...basicInfo, profileCreatedFor: itemValue })
                                            setSelectedValue(itemValue)}}
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
                                        selectedValue={basicInfo.gender.toUpperCase()}
                                        style={{ height: 40, width: 200, }}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setGender(itemValue)
                                            console.log(itemValue)
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



                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                    />


                                </View>
                                <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                                    <TextInput
                                        // {...props}
                                        multiline={true}
                                        style={[styles.default, { height: Math.max(35, height) }]}
                                        value={moment(basicInfo.dob).format("DD/MM/YYYY")}
                                    />
                                    <View style={{ height: 40, width: 197, }}>
                                        <TouchableOpacity onPress={showDatePicker}>
                                            <Image
                                                source={calendar}
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    resizeMode: 'contain',
                                                    alignSelf: "flex-end",
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
                                        selectedValue={basicInfo.maritalStatus}
                                        style={{ height: 40, width: 200, }}
                                        onValueChange={(itemValue, itemIndex) => {
                                            console.log('MATSTATUS',itemValue);
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
                                    listMode="SCROLLVIEW"
                                        selectedValue={Number(basicInfo.height)}
                                        style={{ height: 40, width: 200, }}
                                        onValueChange={(itemValue, itemIndex) => {
                                            // console.log()
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
                                        selectedValue={basicInfo.physicalStatus}
                                        style={{ height: 40, width: 200, }}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setBasicInfo({ ...basicInfo, physicalStatus: itemValue })
                                            setSelectedValue(itemValue)}}
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
                                    }}>Manglik</Text>




                                    <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                                        <Picker
                                            selectedValue={basicInfo.manglik}
                                            style={{ height: 40, width: 200, }}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setBasicInfo({ ...basicInfo, manglik: itemValue })
                                                setSelectedValue(itemValue)}}
                                        >
                                            <Picker.Item label="Yes" value="YES" />
                                            <Picker.Item label="No" value="NO" />
                                            <Picker.Item label="Dont Know" value="UNKNOWN" />
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
                                    }}>Caste</Text>


                                </View>

                                <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                                    <Picker
                                        selectedValue={basicInfo.caste}
                                        style={{ height: 40, width: 200, }}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setBasicInfo({ ...basicInfo, caste: itemValue })
                                            setSelectedValue(itemValue)}}
                                    >
                                      {castoption.map((item, index) => {
                                            return (< Picker.Item label={item.title} value={item.title} key={index} />);
                                        })}

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
