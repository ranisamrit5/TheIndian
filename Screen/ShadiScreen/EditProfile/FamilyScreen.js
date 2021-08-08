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
import {Picker} from 'native-base';
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
import {familyType,  familyStatus, familyVal} from "../../Const/const";
const FamilyScreen = (props) => {
    const [value, setValue] = React.useState('Kgs');
    const [number, onChangeNumber] = React.useState(null);
    const [text, setText] = useState('');
    const [selectedValue, setSelectedValue] = useState("Self");
    const [id, setId] = useState()
    const [fathersOccupation, setFathersOccupation] = useState('')
    let [data, setData] = useState({
        parentContact:'',
        familyValue:'',
        familyType:'',
        familyStatus:'',
        nativePlace:'',
        familyLocation:"",
        fathersOccupation:'',
        mothersOccupation:'',
        noOfBrothers:'0_0',
        noOfSisters:'0_0',
        aboutMyFamily:'',
});
    let [loading, setLoading] = useState(true);
    const [basicInfo, setBasicInfo] = useState({
        id: '',
        familyDetails:{}
    })
    useEffect(() => {
        setLoading(true)
        Auth.currentAuthenticatedUser()
            .then((data) => {
                console.log('user----::',data)
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
                religion, caste, familyDetails, gotram, motherTongue, dob, aboutMe, fname, profileCreatedFor,gender_,height_,physicalStatus_
            } = pDetails



                setData(familyDetails)

                if (familyDetails==null){
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
                maritalStatus:  maritalStatus_,
                noOfChildren:  noOfChildren,
                eatingHabit: eatingHabit,
                smokingHabit: smokingHabit,
                drinkingHabit: drinkingHabit,
                manglik: manglik,
                physicalStatus: physicalStatus_,
                religion: religion,
                caste: caste,
                subcaste: subcaste,
                gotram:gotram,
                height: height_,
                motherTongue: motherTongue,
                dob: dob,
                aboutMe: aboutMe,
                fname: fname,
                gender:gender_,
                familyDetails:familyDetails

            });
        }
        setLoading(false)
    }
    const handleSubmit = async (e) => {
        setLoading(true)
        let familyDetails={}
        familyDetails.parentContact=data.parentContact;
        familyDetails.familyValue=data.familyValue;
        familyDetails.familyType=data.familyType;
        familyDetails.familyStatus=data.familyStatus;
        familyDetails.nativePlace=data.nativePlace;
        familyDetails.fathersOccupation=data.fathersOccupation;
        familyDetails.mothersOccupation=data.mothersOccupation;
        familyDetails.noOfBrothers=data.noOfBrothers;
        familyDetails.noOfSisters=data.noOfSisters;
        familyDetails.aboutMyFamily=data.aboutMyFamily;
        familyDetails.familyLocation=data.familyLocation;
        
        let data_ =basicInfo;
        data_.familyDetails=familyDetails
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
const getLocation=async()=>{
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
    console.log('data=====>======',data)
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
                                selectedValue={data.fathersOccupation}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setData({ ...data, fathersOccupation : itemValue })
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
                                selectedValue={data.mothersOccupation}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) =>  setData({ ...data, mothersOccupation : itemValue })}
                            >
                                <Picker.Item label="Employed" value="Employed" />
                                <Picker.Item label="Business" value="Business" />
                                <Picker.Item label="Retired" value="Retired" />
                                <Picker.Item label="Not Employed" value="Not Employed" />
                                <Picker.Item label="Passed Away" value="Passed Away" />
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
                                value={data.familyLocation}
                                // placeholder="Type here to translate!"
                                onChangeText={text => setData({ ...data, familyLocation : text })}
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
                            }}>Native Place</Text>


                        </View>

                        <View style={{
                            borderColor: "gray", borderWidth: 1,
                            borderRadius: 5, height: 40,
                        }}>
                            <TextInput
                                value={data.nativePlace}
                                style={{ height: 40, width: 200, }}
                                // placeholder="Type here to translate!"
                                onChangeText={text => setData({ ...data, nativePlace : text })}
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
                                    onChangeText={text => {
                                        // if(text){
                                        let input=`${text}_${data.noOfBrothers ? data.noOfBrothers.split('_')[1] : "0"}`
                                        setData({ ...data, noOfBrothers : input })}
                                    // }
                                    }
                                    defaultValue={'0'}
                                    value={!data.noOfBrothers || data.noOfBrothers == "0"?"0":data.noOfBrothers.split('_')[0]}
                                    keyboardType="number-pad"
                                />
                           <Image style={{ width: 40, height: 40, borderRadius: 10, }}
                                    source={require('../../../Imagess/avtar.png')} />
                                <TextInput
                                    style={{ height: 40, width: 40, borderColor: "gray", borderWidth: 1, borderRadius: 5, }}
                                    // placeholder="Type here to translate!"
                                    // console.log(data.noOfBrothers)
                                    value={!data.noOfBrothers || data.noOfBrothers == "0" ? "0":data.noOfBrothers.split('_')[1]}
                                    onChangeText={text => {
                                       
                                        let input=`${data.noOfBrothers ? data.noOfBrothers.split('_')[0] : "0"}_${text}`
                                        console.log('INPUT',input)
                                        setData({ ...data, noOfBrothers : input })}
                                    
                                    }
                                    defaultValue={'0'}
                                    // value={number}
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
                                    value={!data.noOfSisters || data.noOfSisters == "0"?"0":data.noOfSisters.split('_')[0]}
                                    onChangeText={text => {
                                        // if(text){/
                                        let input=`${text}_${data.noOfSisters ? data.noOfSisters.split('_')[1] : "0"}`
                                        setData({ ...data, noOfSisters : input })}
                                    // }
                                    }
                                    defaultValue={'0'}
                                    keyboardType="number-pad"

                                />

                                <Image style={{ width: 35, height: 35, borderRadius: 10, }}
                                    source={require('../../../Imagess/girl.png')} />
                                <TextInput
                                    style={{ height: 40, width: 40, borderColor: "gray", borderWidth: 1, borderRadius: 5, }}
                                    value={!data.noOfSisters || data.noOfSisters == "0"?"0":data.noOfSisters.split('_')[1]}
                                    onChangeText={text => {
                                        // if(text){
                                            // if(text){
                                            let input=`${data.noOfSisters ? data.noOfSisters.split('_')[0] : "0"}_${text}`
                                        setData({ ...data, noOfSisters : input })}
                                            // }
                                        // }
                                    }
                                    defaultValue={'0'}
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
                                selectedValue={data.familyType}
                                style={{ height: 40, width: 200, }}
                                onValueChange={
                                    (itemValue, itemIndex) => setData({ ...data, familyType : itemValue })
                            }
                            >
                               {familyType.map((item, index) => {
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
                            flexDirection: "row", padding: 13,
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold"
                            }}>Family Values</Text>
                           

                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={data.familyValue}
                                style={{ height: 40, width: 200, }}
                                onValueChange={ (itemValue, itemIndex) => setData({ ...data, familyValue : itemValue })}
                            >
                              {familyVal.map((item, index) => {
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
                            flexDirection: "row", padding: 13,
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold"
                            }}>Affluence Level</Text>
                           

                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={data.familyStatus}
                                style={{ height: 40, width: 200, }}
                                onValueChange={ (itemValue, itemIndex) => setData({ ...data, familyStatus : itemValue })}
                            >
                          {familyStatus.map((item, index) => {
                                            return (< Picker.Item label={item.title} value={item.value} key={index} />);
                                        })}
                            </Picker>
                            <View style={{ height: 10 }}></View>
                        </View>
                    </View>
                        
                    
                    <View style={{ alignSelf: "center", }}>
                        <TouchableOpacity
                            style={styles.SubmitButtonStyle1}
                            activeOpacity={.10} 
                            onPress={() => { handleSubmit() }}
                            >

                            <Text style={styles.TextStyle1}>Update</Text>

                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </ScrollView >

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