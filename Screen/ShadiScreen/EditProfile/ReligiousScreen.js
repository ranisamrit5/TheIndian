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
import { graphql, withApollo } from "react-apollo";
import { Auth } from "aws-amplify";
import compose from "lodash.flowright";
import Loader from '../../../Screen/Componentone/Loader';
import { userDataMapper } from '../../mapper'
import Getdata from "../../../AppSync/query/Auth/getData";
import updateUser from "../../../AppSync/mutation/User/updateData";
// import HeaderComponent from "../../../components/HeaderComponent";
// import { BACKGROUNDCOLOR, BLACK, RED, WHITE } from "../../../themes/colors";
import { RadioButton, } from 'react-native-paper';
import {
    gotram, religionoption, chidoption, languageoption, statusoption, annualoption, familyVal, heightoption, countryoption,
    stateoption, cityoption, rassioption, castoption, degreeoption, employoption, employeeption, motherTongue
} from "../../Const/const";

const ReligiousScreen = (props) => {
    const [text, setText] = useState('');
    const [selectedValue, setSelectedValue] = useState("Self");
    const [value, setValue] = React.useState('Kgs');
    const [id, setId] = useState()
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(true);
    const [basicInfo, setBasicInfo] = useState({
        id: '',
        // fname: '',
        // lname: '',
        // dob: '',
        // maritalStatus: '',
        // noOfChildren: 0,
        // height: '',
        // physicalStatus: '',
        religion: '',
        caste: '',
        subcaste: '',
        // profileCreatedFor: '',
        motherTongue: '',
        // languagesKnown: '',
        gotram: '',
        // star: '',
        // manglik: '',
        // eatingHabit: '',
        // smokingHabit: '',
        // drinkingHabit: '',
        // aboutMe: '',
        // gender:''
    })
    useEffect(() => {
        setLoading(true)
        Auth.currentAuthenticatedUser()
            .then((data) => {
                console.log('user----::', data)
                setId(data.username)
                // props.id=data.username
                getData(data.username)
            });
    }, []
    )
    const handleSubmit = async (e) => {
        setLoading(true)
        try {

            // let data_ = data
            // console.log('Table', data_.tablename, marital, height, gender)
            // console.log('ID', data_.id)
            const savedData = await props.updateUser({ variables: { input: basicInfo } })
            console.log(savedData)

        } catch (err) {
            console.log('error creating todo:', err)
        }
        setLoading(false)
    }
    const getData = async (user) => {

        const { data } = await props.client.query({
            query: Getdata,
            fetchPolicy: "network-only",
            variables: {
                id: `${user}`,
            },
        });

        if (data) {
            let userData = data.getUser
            console.log('user----::', data)
            let all = {}
            all.data = data.getUser
            let pDetails = userDataMapper(all)
            setData(userData)
            const { noOfChildren, maritalStatus_, eatingHabit, smokingHabit, drinkingHabit, manglik, subcaste,
                religion, caste, star, gotram, motherTongue, dob, aboutMe, fname, profileCreatedFor, gender_, height_, physicalStatus_
            } = pDetails
            console.log('IN===>', gotram);
            // setMaterial()
            // setGender(gender)
            setBasicInfo({
                ...basicInfo,
                id: user,
                profileCreatedFor: profileCreatedFor,
                maritalStatus: maritalStatus_,
                noOfChildren: noOfChildren,
                eatingHabit: eatingHabit,
                smokingHabit: smokingHabit,
                drinkingHabit: drinkingHabit,
                manglik: manglik,
                physicalStatus: physicalStatus_,
                religion: religion,
                caste: caste,
                subcaste: subcaste,
                gotram: gotram,
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
    return (

        <ScrollView>
            <Loader loading={loading} />

            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', backgroundColor: '#FF5733', height: 50 }}>
                <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => props.navigation.pop()}>
                    <Image style={{ width: 20, height: 20, tintColor: 'white', transform: [{ rotate: '180deg' }] }}
                        source={require('../../../Imagess/ErrorVector.png')} />
                </TouchableOpacity>
                <View style={{ width: '80%' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: "bold", color: 'white' }}>My Profile</Text>
                </View>

            </View>
            <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: "600", color: 'gray', marginTop: 20 }}>Religion Background</Text>

            <View style={{ backgroundColor: "#fff", marginTop: 20 }}>
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
                                selectedValue={basicInfo.religion}
                                style={{ height: 40, width: 180, }}
                                onValueChange={(itemValue, itemIndex) => setBasicInfo({ ...basicInfo, religion: itemValue })}
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
                                selectedValue={basicInfo.motherTongue}
                                style={{ height: 40, width: 180, }}
                                onValueChange={(itemValue, itemIndex) => setBasicInfo({ ...basicInfo, motherTongue: itemValue })}
                            >
                                {motherTongue.map((item, index) => {
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
                                selectedValue={basicInfo.caste}
                                style={{ height: 40, width: 180, }}
                                onValueChange={(itemValue, itemIndex) => setBasicInfo({ ...basicInfo, caste: itemValue })}
                            >
                                {castoption.map((item, index) => {
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

                            <TextInput

                                style={styles.inputStyle}
                                underlineColorAndroid="#f000"
                                value={basicInfo.subcaste}
                                textsize="100"
                                onChangeText={
                                    (data) => {
                                        console.log(data)
                                        setBasicInfo({ ...basicInfo, subcaste: data })
                                    }
                                }
                                //   placeholder="Re-enter Password"
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="sentences"
                                //   ref={addressInputRef}
                                returnKeyType="next"
                                //   onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                            />

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
                                selectedValue={basicInfo.gotram}
                                style={{ height: 40, width: 180, }}
                                onValueChange={(itemValue, itemIndex) => {

                                    setBasicInfo({ ...basicInfo, gotram: itemValue })
                                }
                                }
                            >
                                {gotram.map((item, index) => {
                                    return (< Picker.Item label={item} value={item} key={index} />);
                                })}

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
                                onPress={() => { handleSubmit() }}
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

const profile = compose(
    withApollo,
    graphql(updateUser, { name: "updateUser" })
)(ReligiousScreen);
export default profile;


export const styles = StyleSheet.create({
    inputStyle: {
        flex: 1,
        color: '#000',
        paddingLeft: 15,
        paddingRight: 15,

    },
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