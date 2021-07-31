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
import { graphql, withApollo } from "react-apollo";
import compose from "lodash.flowright";
import _ from "lodash";
import Getdata from "../../../AppSync/query/Auth/getData";
import updateUser from "../../../AppSync/mutation/User/updateData";
import Loader from '../../../Screen/Componentone/Loader';
import { userDataMapper } from '../../mapper'
import {
    countryoption,  statusoption, heightoption, 
     castoption
} from "../../Const/const";
import { Picker } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { workingAs, annualoption, employoption, education_ } from "../../Const/const";
const Location = (props) => {
    const [text, setText] = useState('');
    const [selectedValue, setSelectedValue] = useState("Self");
    const [value, setValue] = React.useState('Kgs');
    const [number, onChangeNumber] = React.useState(null);
    const [country, setCountry] = useState([]);
    const [countryState, setCountryState] = useState([]);
    const [id, setId] = useState()
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    let [loading, setLoading] = useState(false);
    let [education, setEducation] = useState({
        highestEducation:'',
        colg_institute:'',
        eduDetails:'',
        employedIn:'',
        occupation:'',
        occuDetails:'',
        annualIncome:'',
    });
    let [location, setLocation] = useState({
        state:'',
        zipcode:'',
        country:'',
        city:'',
        citizenship:'',
        grewUpIn:'',
	    ethinicOrigin:''
    });
    const [basicInfo, setBasicInfo] = useState({
        id: '',
        education:{}, 
        location:{}

    })
    useEffect(() => {
        setLoading(true)
        Auth.currentAuthenticatedUser()
            .then((data) => {
                console.log(data.username)
                // getCountry();
                setCountry(countryoption)
                getData(data.username)
                setId(data.username)
            }).catch(error => {
                props.navigation.navigate('LoginScreen')
            })
            setLoading(false)
    }, []
    )
    // let getCountry = async () => {
    //     let country__ = await csc.getCountries();
    //     // country__.push('Not Specified')
    //     console.log('===>',country__)
    //     setCountryState(country__)
    //     
    // }
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
    const handleSubmit = async (e) => {
        // setLoading(true)
        try {

            let data_ = {
                id:id,
                location:location,
                education:education,
            }
                // console.log('date_.location', basicInfo.)
                // return;
            // console.log('Table', data_.tablename, marital, height, gender)
            // 
            const savedData = await props.updateUser({ variables: { input: data_ } })
            console.log(savedData)

        } catch (err) {
            console.log('error creating todo:', err)
        }
        setLoading(false)
    }
    const getData = async (user) => {
        console.log('User In Location', user)
        const { data } = await props.client.query({
            query: Getdata,
            fetchPolicy: "network-only",
            variables: {
                id: `${user}`,
            },
        });
        if (data) {
            let userData = data.getUser
            console.log('country===>',userData.location)
            let all = {}
            all.data = data.getUser
            let pDetails = userDataMapper(all)
            if(pDetails.country){
               let countryCode = _.find(countryoption, {"name" :pDetails.country});
            //    console.log('0000===>',countryCode,pDetails.country)
               getLocation(countryCode.code, undefined);
            }

            const {  annualIncome, eduDetails, colg_institute, city, state, country,
                location, highestEducation, employedIn, occuDetails, occupation, 
                citizenship, aboutMe, fname, ethinicOrigin,grewUpIn,height_,physicalStatus_,zipcode
            } = pDetails
            
            let education_={
                highestEducation : highestEducation,
                colg_institute : colg_institute,
                eduDetails : eduDetails,
                employedIn : employedIn,
                occupation : occupation,
                occuDetails : occuDetails,
                annualIncome : annualIncome
            }
            setEducation(education_)
            let location_={
                city:city,
                state:state,
                country:country,
                citizenship:citizenship,
                zipcode:zipcode,
                grewUpIn:grewUpIn,
                ethinicOrigin:ethinicOrigin

            }
            setLocation(location_)

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
                                placeholder="Not Specified"
                                selectedValue={location.country}
                                style={{ height: 40, width: 190, }}
                                onValueChange={(itemValue, itemIndex) => {
                                    console.log('===', itemIndex)
                                    getLocation(itemIndex, undefined);
                                    setLocation({ ...location, country: itemValue })
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
                                placeholder="Not Specified"
                                selectedValue={location.state}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setLocation({ ...state, state: itemValue })
                                }}
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
                                placeholder="Not Specified"
                                defaultValue={location.city}
                                onChangeText={text => setLocation({ ...location, city: text })}
                            // placeholder="Type here to translate!"
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
                                style={{ height: 40, width: 200 }}
                                placeholder="Not Specified"
                                defaultValue={location.zipcode}
                                onChangeText={text => setLocation({ ...location, zipcode: text })}
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
                                placeholder="Not Specified"
                                selectedValue={location.grewUpIn}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setLocation({ ...location, grewUpIn: itemValue })}
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
                                placeholder="Not Specified"
                                selectedValue={location.ethinicOrigin}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setLocation({ ...location, ethinicOrigin: itemValue })}
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
                                placeholder="Not Specified"
                                selectedValue={education.highestEducation}
                                style={{ height: 40, width: 150, }}
                                onValueChange={(itemValue, itemIndex) => setEducation({ ...education, highestEducation: itemValue })}
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
                                placeholder="Not Specified"
                                value={education.colg_institute}
                                onChangeText={text => setEducation({ ...education, colg_institute : text })}
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
                                placeholder="Not Specified"
                                selectedValue={education.employedIn}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setEducation({ ...education, employedIn: itemValue })}
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
                                placeholder="Not Specified"
                                selectedValue={education.occupation}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setEducation({ ...education, occupation: itemValue })}
                            >
                                {workingAs.map((item, index) => {
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
                            }}>Employer Name</Text>


                        </View>

                        <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 5, height: 40 }}>
                            <TextInput
                                style={{ height: 40, width: 200, }}
                                value={education.occuDetails}
                                placeholder="Not Specified"
                            // placeholder="Type here to translate!"
                            onChangeText={text => setEducation({ ...education, occuDetails : text })}
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
                                placeholder="Not Specified"
                                selectedValue={Number(education.annualIncome)}
                                style={{ height: 40, width: 200, }}
                                onValueChange={(itemValue, itemIndex) => setEducation({ ...education, annualIncome: itemValue })}
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
                            onPress={() => { handleSubmit() }}

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

const profile = compose(
    withApollo,
    graphql(updateUser, { name: "updateUser" })
)(Location);
export default profile;

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
