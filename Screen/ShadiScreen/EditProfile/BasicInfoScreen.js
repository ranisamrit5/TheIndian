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
    Pressable, YellowBox,
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
    profileoption, statusoption, heightoption,
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
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
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
        gender: ''
    })
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


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
            var j = moment(basicInfo.dob);
            j.add(1, 'days'); 
            console.log(j.format('LL'));
            console.log('Table', basicInfo.dob)
            // return;
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
                religion, caste, star, height, motherTongue, dob, aboutMe, fname, profileCreatedFor, gender_, height_, physicalStatus_
            } = pDetails
            console.log('IN===>', maritalStatus_);

            setMaterial()
            setGender(gender)
            setBasicInfo({
                ...basicInfo,
                id: user,
                profileCreatedFor: profileCreatedFor,
                maritalStatus: maritalStatus_,
                // maritalStatus: maritalStatus !== null ? maritalStatus : 0,
                noOfChildren: noOfChildren,
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
                gender: gender_,

            });
        }
        setLoading(false)
    }


    const onChange = (event, selectedDate) => {
        // console.log(new Date(selectedDate))

        var j = moment(selectedDate);
        j.add(0, 'days'); 
        console.log(j.format('LL'));

        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setBasicInfo({
            ...basicInfo,
            dob: j
        })
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        console.log(show)
        if(show != false){
            setShow(false)
        }
        else{
            showMode('date');
        }
        
    };

    const showTimepicker = () => {
        showMode('time');
    };
    // console.log('----->', basicInfo.manglik)
    return (
        <SafeAreaView style={styles.safeContainer}>
            <Loader loading={loading} />
            <KeyboardAwareScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps={'always'} style={styles.keyBordContainer}>
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
                    <Text style={styles.hadertextStyle}>{"Basic Info"}</Text>
                    <View style={styles.mainBody}>
                        <View style={styles.rowView}>
                            <View style={styles.rowViewA}>
                                <Text style={styles.textRow}>{"Profile create by"}</Text>
                                <Text style={styles.textred}>{"*"}</Text>
                            </View>
                            <View style={styles.borderBox}>
                                <Picker
                                    selectedValue={basicInfo.profileCreatedFor}
                                    style={{ height: 40, width: 200 }}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setBasicInfo({ ...basicInfo, profileCreatedFor: itemValue })
                                        setSelectedValue(itemValue)
                                    }}
                                >
                                    {profileoption.map((item, index) => {
                                        return (< Picker.Item label={item.title} value={item.title} key={index} />);
                                    })}
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.rowViewA}>
                                <Text style={styles.textRow}>{"Gender"}</Text>
                                <Text style={styles.textred}>{"*"}</Text>
                            </View>
                            <View style={styles.borderBox}>
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

                            </View>

                        </View>

                        <View style={styles.rowView}>
                            <View style={styles.rowViewA}>
                                <Text style={styles.textRow}>{"Date Of Birth"}</Text>
                                <Text style={styles.textred}>{"*"}</Text>
                            </View>
                            <View style={styles.borderBox}>
                                <TextInput style={styles.textInput}
                                    // {...props}
                                    multiline={true}
                                    style={[styles.default, { height: Math.max(35, height) }]}
                                    value={moment(basicInfo.dob).format("DD/MM/YYYY")}
                                />
                                <View style={{ height: 40, width: 200, }}>
                                    <TouchableOpacity onPress={showDatepicker}>
                                        <Image
                                            source={calendar}
                                            style={{
                                                width: 15,
                                                height: 15,
                                                resizeMode: 'contain',
                                                position: "absolute",
                                                right: 10,
                                                bottom: 5,
                                                alignSelf: "center"
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.rowViewA}>
                                <Text style={styles.textRow}>{"Marital status"}</Text>
                                <Text style={styles.textred}>{"*"}</Text>
                            </View>
                            <View style={styles.borderBox}>
                                <Picker
                                    selectedValue={basicInfo.maritalStatus}
                                    style={{ height: 40, width: 200, }}
                                    onValueChange={(itemValue, itemIndex) => {
                                        console.log('MATSTATUS', itemValue);
                                        setMaterial(itemValue)
                                        setBasicInfo({ ...basicInfo, maritalStatus: itemValue })
                                    }}

                                >
                                    {statusoption.map((item, index) => {
                                        return (< Picker.Item label={item.title} value={item.value} key={index} />);
                                    })}
                                </Picker>

                            </View>

                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.rowViewA}>
                                <Text style={styles.textRow}>{"Height"}</Text>
                            </View>
                            <View style={styles.borderBox}>
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
                            </View>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.rowViewA}>
                                <Text style={styles.textRow}>{"Physical Status"}</Text>
                                <Text style={styles.textred}>{"*"}</Text>
                            </View>
                            <View style={styles.borderBox}>
                                <Picker
                                    selectedValue={basicInfo.physicalStatus}
                                    style={{ height: 40, width: 200, }}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setBasicInfo({ ...basicInfo, physicalStatus: itemValue })
                                        setSelectedValue(itemValue)
                                    }}
                                >
                                    <Picker.Item label="Normal" value="NORMAL" />
                                    <Picker.Item label="Physical Disability" value="PHYSICALLY_CHALLENGED" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.rowViewA}>
                                <Text style={styles.textRow}>{"Manglik"}</Text>
                            </View>
                            <View style={styles.borderBox}>
                                <Picker
                                    selectedValue={basicInfo.manglik}
                                    style={{ height: 40, width: 200, }}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setBasicInfo({ ...basicInfo, manglik: itemValue })
                                        setSelectedValue(itemValue)
                                    }}
                                >
                                    <Picker.Item label="Yes" value="YES" />
                                    <Picker.Item label="No" value="NO" />
                                    <Picker.Item label="Dont Know" value="UNKNOWN" />
                                </Picker>
                                <View style={{ height: 10 }}></View>
                            </View>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.rowViewA}>
                                <Text style={styles.textRow}>{"Caste"}</Text>
                            </View>
                            <View style={styles.borderBox}>
                                <Picker
                                    selectedValue={basicInfo.caste}
                                    style={{ height: 40, width: 200, }}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setBasicInfo({ ...basicInfo, caste: itemValue })
                                        setSelectedValue(itemValue)
                                    }}
                                >
                                    {castoption.map((item, index) => {
                                        return (< Picker.Item label={item.title} value={item.title} key={index} />);
                                    })}

                                </Picker>

                            </View>

                        </View>
                        <View style={{ alignSelf: "center", marginBottom: 16, marginTop: 16 }}>
                            <TouchableOpacity
                                style={styles.SubmitButtonStyle1}
                                activeOpacity={.10}
                                onPress={() => { handleSubmit() }}>
                                <Text style={styles.TextStyle1}>{"Update"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                 
                </ScrollView>
            </KeyboardAwareScrollView>
            {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            is24Hour={false}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onChange}
                        />
                    )}
        </SafeAreaView>


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
        backgroundColor: "#EFEFEF"
    },
    safeContainer: {
        flex: 1,
        backgroundColor: "#EFEFEF"
    },

    keyBordContainer: {
        flex: 1,
        flexDirection: 'column',
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
    rowView: {
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 10,
        marginTop: 10
    },
    rowViewA: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignSelf: "center"
    },
    textRow: {
        color: "gray",
        fontSize: 15,
        fontWeight: "bold",
    },
    textred: {
        color: "red",
        fontSize: 15,
        fontWeight: "bold"
    },
    textInput: {
        fontSize: 12,
        color: "#000",
        flex: 1,
        borderWidth: 1,
        borderColor: "#0000001A",
        borderRadius: 8,
    },
    borderBox: {
        borderColor: "#0000001A",
        borderWidth: 1,
        borderRadius: 5,
        height: 40
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
