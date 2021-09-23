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
import GetLocation from 'react-native-get-location'
// var NodeGeocoder = require('node-geocoder');
import { Picker } from 'native-base';
// import HeaderComponent from "../../../components/HeaderComponent";
// import { BACKGROUNDCOLOR, BLACK, RED, WHITE } from "../../../themes/colors";
import { RadioButton, Card } from 'react-native-paper';
import { Auth } from "aws-amplify";
import { graphql, withApollo } from "react-apollo";
import compose from "lodash.flowright";
import Getdata from "../../../AppSync/query/Auth/getData";
import updateUser from "../../../AppSync/mutation/User/updateData";
import Loader from '../../../Screen/Componentone/Loader';
import { userDataMapper } from '../../Mappers/mapper'
import awsConfig from '../../../aws-export';
import { familyType, familyStatus, familyVal } from "../../Const/const";
const FamilyScreen = (props) => {
    const [value, setValue] = React.useState('Kgs');
    const [number, onChangeNumber] = React.useState(null);
    const [text, setText] = useState('');
    const [selectedValue, setSelectedValue] = useState("Self");
    const [id, setId] = useState()
    const [fathersOccupation, setFathersOccupation] = useState('')
    let [data, setData] = useState({
        parentContact: '',
        familyValue: '',
        familyType: '',
        familyStatus: '',
        nativePlace: '',
        familyLocation: "",
        fathersOccupation: '',
        mothersOccupation: '',
        noOfBrothers: '0_0',
        noOfSisters: '0_0',
        aboutMyFamily: '',
    });
    let [loading, setLoading] = useState(true);
    const [basicInfo, setBasicInfo] = useState({
        id: '',
        familyDetails: {}
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
            console.log('userPD', data)
            let all = {}
            all.data = data.getUser
            let pDetails = userDataMapper(all)
            // console.log('IN===>',pDetails.familyDetails.noOfBrothers);
            const { noOfChildren, maritalStatus_, eatingHabit, smokingHabit, drinkingHabit, manglik, subcaste,
                religion, caste, familyDetails, gotram, motherTongue, dob, aboutMe, fname, profileCreatedFor, gender_, height_, physicalStatus_
            } = pDetails



            setData(familyDetails)

            if (familyDetails == null) {
                setData({ ...data, noOfBrothers: '0_0' })
                setData({ ...data, noOfSisters: '0_0' })
            }

            // console.log('IN===>',familyDetails);
            // setMaterial()
            // setGender(gender)
            setFathersOccupation(familyDetails.fathersOccupation)
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
                familyDetails: familyDetails

            });
        }
        setLoading(false)
    }
    const handleSubmit = async (e) => {
        setLoading(true)
        let familyDetails = {}
        familyDetails.parentContact = data.parentContact;
        familyDetails.familyValue = data.familyValue;
        familyDetails.familyType = data.familyType;
        familyDetails.familyStatus = data.familyStatus;
        familyDetails.nativePlace = data.nativePlace;
        familyDetails.fathersOccupation = data.fathersOccupation;
        familyDetails.mothersOccupation = data.mothersOccupation;
        familyDetails.noOfBrothers = data.noOfBrothers;
        familyDetails.noOfSisters = data.noOfSisters;
        familyDetails.aboutMyFamily = data.aboutMyFamily;
        familyDetails.familyLocation = data.familyLocation;

        let data_ = basicInfo;
        data_.familyDetails = familyDetails
        delete data_.familyDetails.__typename;


        console.log(data_.familyDetails)
        try {
            const savedData = await props.updateUser({ variables: { input: data_ } })
            console.log(savedData)

        } catch (err) {
            console.log('error creating todo:', err)
        }
        setLoading(false)
    }
    const getLocation = async () => {
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log(location);
                // displayLocation(location.latitude,location.longitude)
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }

    // const displayLocation= async (latitude,longitude)=>{
    //     var options = {
    //         provider: 'google',
    //         httpAdapter: 'https', // Default
    //         apiKey: awsConfig.googleApiKey, // for Mapquest, OpenCage, Google Premier
    //         formatter: 'json' // 'gpx', 'string', ...
    //       };
    //       let geocoder = await NodeGeocoder(options);
    //       await geocoder.reverse({lat:latitude, lon:longitude}, function(err, res) {
    //         console.log(JSON.stringify(res));
    //       });
    //   };
    console.log('data=====>======', data)
    return (
        <SafeAreaView>
            <ScrollView>
                <Loader loading={loading} />
                <View style={styles.Hadera}>
                    <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => props.navigation.navigate('EditProfileScreen')}>
                        <Image style={styles.Imagehadera}
                            source={require('../../../Imagess/ErrorVector.png')} />
                    </TouchableOpacity>
                    <View style={{ width: '80%' }}>
                        <Text style={styles.textStyle}>{"My Profile"}</Text>
                    </View>
                </View>
                <Text style={styles.hadertextStyle}>{"Family"}</Text>
                <View style={styles.mainBody}>

                    <View style={styles.haderRow}>
                        <Text style={styles.textBold}>{"Father's Status"}</Text>
                        <View style={styles.pickerStyle}>
                            <Picker
                                selectedValue={data.fathersOccupation}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setData({ ...data, fathersOccupation: itemValue })
                                }}
                            >
                                <Picker.Item label="Employed" value="Employed" />
                                <Picker.Item label="Business" value="Business" />
                                <Picker.Item label="Retired" value="Retired" />
                                <Picker.Item label="Not Employed" value="Not Employed" />
                                <Picker.Item label="Passed Away" value="Passed Away" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.haderRow}>
                        <Text style={styles.textBold}>{"Mother's Status"}</Text>
                        <View style={styles.pickerStyle}>
                            <Picker
                                selectedValue={data.mothersOccupation}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setData({ ...data, mothersOccupation: itemValue })}
                            >
                                <Picker.Item label="Employed" value="Employed" />
                                <Picker.Item label="Business" value="Business" />
                                <Picker.Item label="Retired" value="Retired" />
                                <Picker.Item label="Not Employed" value="Not Employed" />
                                <Picker.Item label="Passed Away" value="Passed Away" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.haderRow}>
                        <Text style={styles.textBold}>{"Family Location"}</Text>
                        <View style={styles.pickerStyle}>
                            <TextInput
                                style={{ height: 40, width: 195, }}
                                value={data.familyLocation}
                                // placeholder="Type here to translate!"
                                onChangeText={text => setData({ ...data, familyLocation: text })}
                            // defaultValue={text}
                            />
                        </View>

                    </View>
                    <View style={styles.haderRow}>
                        <Text style={styles.textBold}>{"Native Place"}</Text>
                        <View style={styles.pickerStyle}>
                            <TextInput
                                value={data.nativePlace}
                                style={{ height: 40, width: 195, }}
                                // placeholder="Type here to translate!"
                                onChangeText={text => setData({ ...data, nativePlace: text })}
                            // defaultValue={text}
                            />
                        </View>
                    </View>

                    <View style={styles.haderRow}>
                        <Text style={styles.textBold}>{"No.of Siblings"}</Text>

                        <View style={styles.ViewA}>
                            <Text style={styles.text}>{"No.of Brother's"}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 16 }}>

                                <TextInput
                                    style={{ height: 40, width: 40, borderColor: "#0000001A", borderWidth: 1, borderRadius: 5, }}
                                    // placeholder="Type here to translate!"
                                    onChangeText={text => {
                                        // if(text){
                                        let input = `${text}_${data.noOfBrothers ? data.noOfBrothers.split('_')[1] : "0"}`
                                        setData({ ...data, noOfBrothers: input })
                                    }
                                        // }
                                    }
                                    defaultValue={'0'}
                                    value={!data.noOfBrothers || data.noOfBrothers == "0" ? "0" : data.noOfBrothers.split('_')[0]}
                                    keyboardType="number-pad"
                                />
                                <Image style={{ width: 40, height: 40, borderRadius: 10, }}
                                    source={require('../../../Imagess/avtar.png')} />
                                <TextInput
                                    style={{ height: 40, width: 40, borderColor: "#0000001A", borderWidth: 1, borderRadius: 5, }}
                                    // placeholder="Type here to translate!"
                                    // console.log(data.noOfBrothers)
                                    value={!data.noOfBrothers || data.noOfBrothers == "0" ? "0" : data.noOfBrothers.split('_')[1]}
                                    onChangeText={text => {

                                        let input = `${data.noOfBrothers ? data.noOfBrothers.split('_')[0] : "0"}_${text}`
                                        console.log('INPUT', input)
                                        setData({ ...data, noOfBrothers: input })
                                    }

                                    }
                                    defaultValue={'0'}
                                    // value={number}
                                    keyboardType="number-pad"

                                />
                            </View>
                            <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-between" }}>
                                <Text style={{ color: "gray", fontSize: 15, fontWeight: "600", bottom: 20 }}>{"Not Married"}</Text>
                                <Text style={{ color: "gray", fontSize: 15, fontWeight: "600", bottom: 20 }}>{"Married"}</Text>
                            </View>
                            <Text style={{ color: "gray", fontSize: 15, fontWeight: "bold", alignSelf: "center", marginTop: 10 }}>{"No.of Sister(s)"}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 16 }}>
                                <TextInput
                                    style={{ height: 40, width: 40, borderColor: "#0000001A", borderWidth: 1, borderRadius: 5, }}
                                    // placeholder="Type here to translate!"
                                    value={!data.noOfSisters || data.noOfSisters == "0" ? "0" : data.noOfSisters.split('_')[0]}
                                    onChangeText={text => {
                                        // if(text){/
                                        let input = `${text}_${data.noOfSisters ? data.noOfSisters.split('_')[1] : "0"}`
                                        setData({ ...data, noOfSisters: input })
                                    }
                                        // }
                                    }
                                    defaultValue={'0'}
                                    keyboardType="number-pad"

                                />

                                <Image style={{ width: 35, height: 35, borderRadius: 10, }}
                                    source={require('../../../Imagess/girl.png')} />
                                <TextInput
                                    style={{ height: 40, width: 40, borderColor: "#0000001A", borderWidth: 1, borderRadius: 5, }}
                                    value={!data.noOfSisters || data.noOfSisters == "0" ? "0" : data.noOfSisters.split('_')[1]}
                                    onChangeText={text => {
                                        // if(text){
                                        // if(text){
                                        let input = `${data.noOfSisters ? data.noOfSisters.split('_')[0] : "0"}_${text}`
                                        setData({ ...data, noOfSisters: input })
                                    }
                                        // }
                                        // }
                                    }
                                    defaultValue={'0'}
                                    keyboardType="number-pad"
                                />
                            </View>
                            <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-between", }}>
                                <Text style={{ color: "gray", fontSize: 15, fontWeight: "600", bottom: 20 }}>{"Not Married"}</Text>
                                <Text style={{ color: "gray", fontSize: 15, fontWeight: "600", bottom: 20 }}>{"Married"}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.haderRow}>
                        <Text style={styles.textBold}>{"Family Type"}</Text>
                        <View style={styles.pickerStyle}>
                            <Picker
                                selectedValue={data.familyType}
                                style={{ height: 40, width: 200, }}
                                onValueChange={
                                    (itemValue, itemIndex) => setData({ ...data, familyType: itemValue })
                                }
                            >
                                {familyType.map((item, index) => {
                                    return (< Picker.Item label={item.title} value={item.value} key={index} />);
                                })}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.haderRow}>
                        <Text style={styles.textBold}>{"Family Values"}</Text>
                        <View style={styles.pickerStyle}>
                            <Picker
                                selectedValue={data.familyValue}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setData({ ...data, familyValue: itemValue })}
                            >
                                {familyVal.map((item, index) => {
                                    return (< Picker.Item label={item.title} value={item.value} key={index} />);
                                })}

                            </Picker>
                        </View>
                    </View>
                    <View style={styles.haderRow}>
                        <Text style={styles.textBold}>{"Affluence Level"}</Text>
                        <View style={styles.pickerStyle}>
                            <Picker
                                selectedValue={data.familyStatus}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setData({ ...data, familyStatus: itemValue })}
                            >
                                {familyStatus.map((item, index) => {
                                    return (< Picker.Item label={item.title} value={item.value} key={index} />);
                                })}
                            </Picker>
                        </View>
                    </View>
                    <View style={{ alignSelf: "center", marginTop: 16 }}>
                        <TouchableOpacity
                            style={styles.SubmitButtonStyle1}
                            activeOpacity={.10}
                            onPress={() => { handleSubmit() }}
                        >

                            <Text style={styles.TextStyle1}>{"Update"}</Text>

                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const profile = compose(
    withApollo,
    graphql(updateUser, { name: "updateUser" })
)(FamilyScreen);
export default profile;

export const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        backgroundColor: "#fff",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 16,
        marginBottom: 16,
        paddingBottom: 16,
        elevation: 5
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
    haderRow: {
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 13,
    },
    textBold: {
        color: "gray",
        fontSize: 15,
        fontWeight: "bold",
        alignSelf: "center",
    },
    ViewA: {
        borderColor: "#0000001A",
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    inputtext: {
        height: 40,
        width: 40,
        borderColor: "#0000001A",
        borderWidth: 1,
        borderRadius: 5,
    },
    text: {
        color: "gray",
        fontSize: 15,
        fontWeight: "bold",
        alignSelf: "center",
        marginTop: 10
    },
    pickerStyle: {
        borderColor: "#0000001A",
        borderWidth: 1,
        borderRadius: 5,
        height: 40
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