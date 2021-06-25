import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';

import { Auth } from "aws-amplify";
import {  withApollo } from "react-apollo";
import compose from "lodash.flowright";
import Getdata from "../../../AppSync/query/Auth/getData";
import { userDataMapper } from '../../mapper'
const EditProfileScreen = (props) => {
    const [text, setText] = useState('dcdsdsvdvdgvkjjnvdndvjnjvjnjknmvkvmdkvmdvkmvkdmvkdmckvmvkmvkdvmkvmkmkmv')
    const [height, setHeight] = useState(100)
    const [id, setId] = useState()
    const [details, setDetails] = useState([])
    let [basicInfo, setBasicInfo] = useState({
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
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Auth.currentAuthenticatedUser()
            .then((data) => {
                // console.log('user----::',data)
                setId(data.username)
                // props.id=data.username
                getData(data.username)
            });
    }, []
    )

    const getData = async (user) => {
        // console.log('user---->>',props)
        await props.client.query({
            query: Getdata,
            fetchPolicy: "network-only",
            variables: {
                id: `${user}`,
            },
        }).then(async ({ data }) => {
            let all = {}
            all.data = data.getUser
            let pDetails = userDataMapper(all)
            setDetails(pDetails)
        })
        setLoading(false);
    }

    // console.log('loading::', loading)
    console.log('loading::', details)

    // const { bio, job_title, company, university, sex } = state;

    return (




        <SafeAreaView style={styles.mainBody} >
            {/* {!loading ? */}


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

                    <View style={{ width: '95%', height: 220, alignItems: 'center', backgroundColor: '#fff', marginTop: 10, alignSelf: "center" }}
                        source={details.profilePic}   >
                        <View style={{}}>
                            <ImageBackground style={{ width: 100, height: 150, overflow: 'hidden', alignItems: 'center', marginTop: 10 }}
                                source={{uri:details.profilePic}} >

                            </ImageBackground>

                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: '#000', alignSelf: "center" }}>{details.fname} ({details.username})</Text>
                            <View style={{ marginTop: 5 }}>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: '#000', alignSelf: "center" }}>Last Online: {details.lastActive}</Text>

                            </View>
                        </View>
                    </View>

                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,
                    }}>
                        <Text style={{
                            color: "#cc2b5e", fontSize: 16,
                            fontWeight: "bold", alignSelf: "center"
                        }}>Basic Info</Text>


                        <TouchableOpacity onPress={() => props.navigation.navigate('BasicInfoScreen')}>
                            <Image style={{ width: 20, height: 20, tintColor: "#000" }}
                                source={require('../../../Imagess/pencil.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "column", padding: 10, }}>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Posted by</Text>


                            
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: {basicInfo.profileCreatedFor}</Text>


                           

                        </View>

                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Age</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: {details.age}</Text>

                            <View style={{ height: 10 }}></View>

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Marital Status</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: {details.maritalStatus}</Text>

                          

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Height</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: {details.height}</Text>

                            

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Any Disability?</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: {details.physicalStatus}</Text>

                           

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Body Weight</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: Not Specified</Text>

                          

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Health Information</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: Not Specified</Text>

                          

                        </View>
                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,
                    }}>
                        <Text style={{
                            color: "#cc2b5e", fontSize: 16,
                            fontWeight: "bold", alignSelf: "center"
                        }}>More about Myself,Partner and Family</Text>


                        <TouchableOpacity onPress={() => alert('Log out')}>
                            <Image style={{ width: 20, height: 20, tintColor: "#000" }}
                                source={require('../../../Imagess/pencil.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "column", padding: 10, }}>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <TextInput
                                {...props}
                                multiline={true}
                                onChangeText={(text) => {
                                    setText(text)
                                }}
                                onContentSizeChange={(event) => {
                                    setHeight(event.nativeEvent.contentSize.height)
                                }}
                                style={[styles.default, { height: Math.max(35, height) }]}
                                value={details.aboutMe}
                            />

                        </View>
                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,
                    }}>
                        <Text style={{
                            color: "#cc2b5e", fontSize: 16,
                            fontWeight: "bold", alignSelf: "center"
                        }}>Religious Background</Text>


                        <TouchableOpacity onPress={() => props.navigation.navigate('ReligiousScreen')}>
                            <Image style={{ width: 20, height: 20, tintColor: "#000" }}
                                source={require('../../../Imagess/pencil.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "column", padding: 10, }}>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Religion</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: {details.religion}</Text>


                         

                        </View>

                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Mother Tongue</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: {details.motherTongue}</Text>

                           

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Community</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: {details.caste}</Text>

                          

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Sub Community</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: {details.subcaste}</Text>

                            

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Cast No Bar</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: Not Specified</Text>

                          

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Gothra/Gothram</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: Not Specified</Text>

                           

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Health Information</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: Not Specified</Text>

                        

                        </View>
                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,
                    }}>
                        <Text style={{
                            color: "#cc2b5e", fontSize: 16,
                            fontWeight: "bold", alignSelf: "center"
                        }}>Family</Text>


                        <TouchableOpacity onPress={() => props.navigation.navigate('FamilyScreen')}>
                            <Image style={{ width: 20, height: 20, tintColor: "#000" }}
                                source={require('../../../Imagess/pencil.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "column", padding: 10, }}>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Father's Status</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: {details.fathersOccupation}</Text>


                       

                        </View>

                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Mother's Status</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: {details.mothersOccupation}</Text>

                            <View style={{ height: 10 }}></View>

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Native Place</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: {details.nativePlace}</Text>

                         

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>No. of Brothers</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: {details.noOfBrothers}</Text>

                           

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>No. fo Sisters</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: {details.noOfSisters}</Text>

                            

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Family Values</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: { }</Text>

                           

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Family Affluence</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: Enter Now</Text>

                           

                        </View>
                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,
                    }}>
                        <Text style={{
                            color: "#cc2b5e", fontSize: 16,
                            fontWeight: "bold", alignSelf: "center"
                        }}>Astro Details</Text>


                        <TouchableOpacity onPress={() => props.navigation.navigate('Astro')}>
                            <Image style={{ width: 20, height: 20, tintColor: "#000" }}
                                source={require('../../../Imagess/pencil.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "column", padding: 10, }}>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,


                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Manglik/Chevvai dosham</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: {details.manglik}</Text>



                        </View>

                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Nakshatra</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: Not Specified</Text>

                          

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Rashi/Moon Sign</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: Not Specified</Text>

                            

                        </View>
                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,
                    }}>
                        <Text style={{
                            color: "#cc2b5e", fontSize: 16,
                            fontWeight: "bold", alignSelf: "center"
                        }}>Location,Education & Career</Text>


                        <TouchableOpacity onPress={() => props.navigation.navigate('Location')}>
                            <Image style={{ width: 20, height: 20, tintColor: "#000" }}
                                source={require('../../../Imagess/pencil.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "column", padding: 10, }}>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Country Living in</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: {details.country}</Text>


                          

                        </View>

                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>State Living in</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: {details.state}</Text>

                         

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>City Living in</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: {details.city}</Text>

                           

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Residency Status</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: {details.citizenship}</Text>

                          

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Zip/Pin code</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: Not Specified</Text>

                    
                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Grew Up in</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: India</Text>

                          

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Highest Qualification</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: {details.highestEducation}</Text>

                       

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>College(s) Attended</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: {details.colg_institute}</Text>

                        

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Working With</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: {details.employedIn}</Text>

                            

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Working As</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: {}</Text>

                            

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Annual Income</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: {details.annualIncome}</Text>

                     

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 10,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Employer Name</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: React Native Developer</Text>

                       
                        </View>
                    </View>


                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,
                    }}>
                        <Text style={{
                            color: "#cc2b5e", fontSize: 16,
                            fontWeight: "bold", alignSelf: "center"
                        }}>Lifestyle</Text>


                        <TouchableOpacity onPress={() => alert('Log out')}>
                            <Image style={{ width: 20, height: 20, tintColor: "#000" }}
                                source={require('../../../Imagess/pencil.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "column", padding: 10, }}>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Diet</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: {details.eatingHabit}</Text>


                           

                        </View>
                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,
                    }}>
                        <Text style={{
                            color: "#cc2b5e", fontSize: 16,
                            fontWeight: "bold", alignSelf: "center"
                        }}>Partner Basic Info</Text>


                        <TouchableOpacity onPress={() => alert('Log out')}>
                            <Image style={{ width: 20, height: 20, tintColor: "#000" }}
                                source={require('../../../Imagess/pencil.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "column", padding: 10, }}>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Age</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: 20 to 25</Text>


                          

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Height</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: 5'3"(160cm) to 6'0"</Text>



                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Marital Status</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: Naver Married</Text>


                         

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Religion/Community</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: Hindu:Teli</Text>


                          

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Mother Tongue</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: Marathi</Text>


                         

                        </View>
                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,
                    }}>
                        <Text style={{
                            color: "#cc2b5e", fontSize: 16,
                            fontWeight: "bold", alignSelf: "center"
                        }}>Partner Location Details</Text>


                        <TouchableOpacity onPress={() => alert('Log out')}>
                            <Image style={{ width: 20, height: 20, tintColor: "#000" }}
                                source={require('../../../Imagess/pencil.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "column", padding: 10, }}>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Country living in</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: India</Text>


                            

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>State living in</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: </Text>


                            

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>City/District</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: </Text>


                           

                        </View>

                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,
                    }}>
                        <Text style={{
                            color: "#cc2b5e", fontSize: 16,
                            fontWeight: "bold", alignSelf: "center"
                        }}>Partner,Education & Career</Text>


                        <TouchableOpacity onPress={() => alert('Log out')}>
                            <Image style={{ width: 20, height: 20, tintColor: "#000" }}
                                source={require('../../../Imagess/pencil.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "column", padding: 10, }}>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Country Living in</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: India</Text>


                          

                        </View>

                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>State Living in</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: Maharashtra</Text>

                         

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>City Living in</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: Nagpur</Text>

                       

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Residency Status</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: Citizen</Text>

                    

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Zip/Pin code</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: Not Specified</Text>

                            

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Grew Up in</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: India</Text>

                          

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Highest Qualification</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: </Text>

                         

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>College(s) Attended</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: College Name</Text>

                           

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Working With</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: Private company</Text>

                           

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Working As</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: Software Developer/Programmer</Text>

                            <View style={{ height: 10 }}></View>

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Annual Income</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>: INR 2 Lakh to 4 Lakh</Text>

                         

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,
                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Employer Name</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold", flex:1,flexWrap:"wrap"
                            }}>:React Native Developer</Text>

                            
                        </View>
                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "row", padding: 13,
                    }}>
                        <Text style={{
                            color: "#cc2b5e", fontSize: 16,
                            fontWeight: "bold", alignSelf: "center"
                        }}>Partner Other Details</Text>


                        <TouchableOpacity onPress={() => alert('Log out')}>
                            <Image style={{ width: 20, height: 20, tintColor: "#000" }}
                                source={require('../../../Imagess/pencil.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "column", padding: 10, }}>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Profile created by</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: </Text>


                          

                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                backgroundColor: '#ffffff',
                                padding: 16,

                            }}>
                            <Text style={{
                                color: "gray", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>Diet</Text>
                            <Text style={{
                                color: "#454F63", fontSize: 15,
                                fontWeight: "bold",flex:1,flexWrap:"wrap"
                            }}>: </Text>


                            
                        </View>

                    </View>
                </ScrollView>
                {/* : null} */}
        </SafeAreaView>



    );
}

const Login = compose(
    withApollo,
    // graphql(UpdateTalentDelphiii, {name: 'UpdateTalentDelphiii'}),
)(EditProfileScreen);
export default Login;

// export default EditProfileScreen;

export const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        backgroundColor: "#ECECEC"

    },


});