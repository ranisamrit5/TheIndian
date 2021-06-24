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
import { Auth } from "aws-amplify";
import { Picker } from 'native-base';
// import HeaderComponent from "../../../components/HeaderComponent";
// import { BACKGROUNDCOLOR, BLACK, RED, WHITE } from "../../../themes/colors";
import { RadioButton, Card } from 'react-native-paper';
// import MyProvider from './MyProvider';
import { graphql, withApollo } from "react-apollo";
import compose from "lodash.flowright";
import Getdata from "../../../AppSync/query/Auth/getData";
import updateUser from "../../../AppSync/mutation/User/updateData";
import {profileoption,religionoption,chidoption,languageoption,statusoption,annualoption,familyVal,heightoption,countryoption,
    stateoption,cityoption,rassioption,castoption,degreeoption,employoption,employeeption
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
    const [basicInfo,setBasicInfo]=useState({
        id:'',
        fname:'',
        lname:'',
        dob:'',
        maritalStatus:'SINGLE',
        noOfChildren:0,
        height:'',
        physicalStatus:'',
        religion:'Hindu',
        caste:'',
        subcaste:'',
        profileCreatedFor:'Self',
        motherTongue:'',
        languagesKnown:'',
        gotram:'',
        star:'',
        manglik:'',
        eatingHabit:'',
        smokingHabit:'',
        drinkingHabit:'',
        aboutMe:''})

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
            
            let data_=data
            console.log('Table', data_.tablename,marital,height,gender)
            console.log('ID', data_.id)
            setBasicInfo({...basicInfo,
                height:height,
                gender:gender,
                maritalStatus:marital
            })
            const savedData= await props.updateUser({variables: {input: basicInfo}})
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
            <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: "600", color: 'gray', marginTop: 10 }}>Basic Info</Text>

            <View style={{ backgroundColor: "#fff", marginTop: 10 }}>
                <SafeAreaView style={styles.mainBody}>


                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 10,
                    }}>
                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold"
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
                            flexDirection: "row",
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
                                    setBasicInfo({ ...basicInfo, gender:itemValue })}}
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
                            flexDirection: "row",
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold"
                            }}>Date Of Birth</Text>


                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <Picker
                                selectedValue={gender}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
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
                            flexDirection: "row",
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
                            flexDirection: "row",
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
                            flexDirection: "row",
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
                    {/*    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,

                    }}>
                       <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                        }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold"
                            }}>Body Weight</Text>


                        </View>

                        <View style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                        }}>
                            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                                <View style={{
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                }}>
                                    <Text style={{ padding: 8 }}>First</Text>
                                    <RadioButton value="Kgs" />


                                    <Text style={{ padding: 8 }}>Second</Text>
                                    <RadioButton value="Ibs" />
                                </View>
                            </RadioButton.Group>
                        </View> 

                    </View>*/}
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row",

                    }}>
                        <View style={{
                            justifyContent: "space-between",
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
                            flexDirection: "row", padding: 13,
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
                    <View style={{ alignSelf: "center", }}>
                        <TouchableOpacity
                            style={styles.SubmitButtonStyle1}
                            activeOpacity={.10}
                          onPress={() =>{handleSubmit()}}


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
  )(BasicInfoScreen);
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