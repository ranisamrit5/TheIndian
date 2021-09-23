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
import Loader from '../../../Screen/Componentone/Loader';
import { Auth } from "aws-amplify";
import { withApollo } from "react-apollo";
import compose from "lodash.flowright";
import Getdata from "../../../AppSync/query/Auth/getData";
import { userDataMapper } from '../../Mappers/mapper'
import { partnerDataMapper } from '../../Mappers/partnerMapper'
const EditProfileScreen = (props) => {
    const [text, setText] = useState('')
    const [height, setHeight] = useState(100)
    const [id, setId] = useState()
    const [details, setDetails] = useState([])
    const [partner, setPartner] = useState([])
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
        setLoading(true)
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

            let partnerData = partnerDataMapper(data.getUser.partnerPreference)
            setPartner(partnerData)
            console.log('partnerData===>', data.getUser.partnerPreference['motherTongue'])
            console.log('partnerData===>', partnerData)
            setDetails(pDetails)
        }).catch((error)=>{
            setLoading(false);
        })
        setLoading(false);
    }

    // console.log('loading::', loading)
    // console.log('loading::', details)

    // const { bio, job_title, company, university, sex } = state;

    return (
    <SafeAreaView style={styles.mainBody} >
            <Loader loading={loading} />
            {/* {!loading ? */}
            <ScrollView>
                <View style={styles.haderView}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ProfileDeshbord')}>
                        <Image style={styles.backArrow}
                            source={require('../../../Imagess/ErrorVector.png')} />
                    </TouchableOpacity>
                    <Text style={styles.hadertext}>{"My Profile"}</Text>
                </View>

                <View style={styles.imageView}
                    source={details.profilePic}   >
                    <View style={{}}>
                        <ImageBackground style={{ width: 100, height: 150, overflow: 'hidden', alignItems: 'center', marginTop: 10 }}
                            source={{ uri: details.profilePic }} >

                        </ImageBackground>

                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold", color: '#000', alignSelf: "center" }}>{details.fname} ({details.username})</Text>
                        <View style={{ marginTop: 5 }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#000', alignSelf: "center" }}>Last Online: {details.lastActive}</Text>

                        </View>
                    </View>
                </View>

                <View style={styles.haderRow}>
                    <Text style={styles.title}>{"Basic Info"}</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('BasicInfoScreen')}>
                        <Image style={styles.ImageStyle}
                            source={require('../../../Imagess/pencil.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.boxView}>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Posted by"}</Text>
                        <Text style={styles.textblack}>: {basicInfo.profileCreatedFor}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Age"}</Text>
                        <Text style={styles.textblack}>: {details.age}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Marital Status"}</Text>
                        <Text style={styles.textblack}>: {details.maritalStatus}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Height"}</Text>
                        <Text style={styles.textblack}>: {details.height}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Any Disability?"}</Text>
                        <Text style={styles.textblack}>: {details.physicalStatus}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Body Weight"}</Text>
                        <Text style={styles.textblack}>{": Not Specified"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Health Information"}</Text>
                        <Text style={styles.textblack}>{": Not Specified"}</Text>
                    </View>
                </View>
                <View style={styles.haderRow}>
                    <Text style={styles.title}>{"More about Myself,Partner and Family"}</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Myselftextinput',details)}>
                        <Image style={styles.ImageStyle}
                            source={require('../../../Imagess/pencil.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.boxView}>
                    <View style={styles.rowView}>
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
                <View style={styles.haderRow}>
                    <Text style={styles.title}>{"Religious Background"}</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ReligiousScreen')}>
                        <Image style={styles.ImageStyle}
                            source={require('../../../Imagess/pencil.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.boxView}>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Religion"}</Text>
                        <Text style={styles.textblack}>: {details.religion}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Mother Tongue"}</Text>
                        <Text style={styles.textblack}>: {details.motherTongue}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Community"}</Text>
                        <Text style={styles.textblack}>: {details.caste}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Sub Community"}</Text>
                        <Text style={styles.textblack}>: {details.subcaste}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Cast No Bar"}</Text>
                        <Text style={styles.textblack}>{": Not Specified"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Gothra/Gothram"}</Text>
                        <Text style={styles.textblack}>: {details.gotram ? details.gotram : 'Not Specified'}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Health Information"}</Text>
                        <Text style={styles.textblack}>{": Not Specified"}</Text>
                    </View>
                </View>
                <View style={styles.haderRow}>
                    <Text style={styles.title}>{"Family"}</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('FamilyScreen')}>
                        <Image style={styles.ImageStyle}
                            source={require('../../../Imagess/pencil.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.boxView}>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Father's Status"}</Text>
                        <Text style={styles.textblack}>: {details.fathersOccupation}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Mother's Status"}</Text>
                        <Text style={styles.textblack}>: {details.mothersOccupation}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Native Place"}</Text>
                        <Text style={styles.textblack}>: {details.nativePlace}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"No. of Brothers"}</Text>
                        <Text style={styles.textblack}>: {details.noOfBrothers_}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"No. fo Sisters"}</Text>
                        <Text style={styles.textblack}>: {details.noOfSisters_}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Family Values"}</Text>
                        <Text style={styles.textblack}>: {details.familyValue}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Family Affluence"}</Text>
                        <Text style={styles.textblack}>: {details.familyStatus}</Text>
                    </View>


                </View>
                <View style={styles.haderRow}>
                    <Text style={styles.title}>{"Location,Education & Career"}</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Location')}>
                        <Image style={styles.ImageStyle}
                            source={require('../../../Imagess/pencil.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.boxView}>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Country Living in"}</Text>
                        <Text style={styles.textblack}>: {details.country}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"State Living in"}</Text>
                        <Text style={styles.textblack}>: {details.state}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"City Living in"}</Text>
                        <Text style={styles.textblack}>: {details.city}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Residency Status"}</Text>
                        <Text style={styles.textblack}>: {details.citizenship}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Zip/Pin code"}</Text>
                        <Text style={styles.textblack}>{": Not Specified"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Grew Up in"}</Text>
                        <Text style={styles.textblack}>{": India"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Highest Qualification"}</Text>
                        <Text style={styles.textblack}>: {details.highestEducation}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"College(s) Attended"}</Text>
                        <Text style={styles.textblack}>: {details.colg_institute}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Working With"}</Text>
                        <Text style={styles.textblack}>: {details.employedIn}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Working As"}</Text>
                        <Text style={styles.textblack}>: { }</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Annual Income"}</Text>
                        <Text style={styles.textblack}>: {details.annualIncome}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Employer Name"}</Text>
                        <Text style={styles.textblack}>{": React Native Developer"}</Text>
                    </View>
                </View>

                <View style={styles.haderRow}>
                    <Text style={styles.title}>{"Lifestyle"}</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Lifestyles')}>
                        <Image style={styles.ImageStyle}
                            source={require('../../../Imagess/pencil.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.boxView}>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Diet"}</Text>
                        <Text style={styles.textblack}>: {details.eatingHabit}</Text>
                    </View>
                </View>
                <View style={styles.haderRow}>
                    <Text style={styles.title}>{"Partner Basic Info"}</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('PartnerBasicinfo')}>
                        <Image style={styles.ImageStyle}
                            source={require('../../../Imagess/pencil.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.boxView}>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Age"}</Text>
                        <Text style={styles.textblack}>: {partner.ageRange}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Height"}</Text>
                        <Text style={styles.textblack}>: {partner.heightRange}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Marital Status"}</Text>
                        <Text style={styles.textblack}>: {partner.maritalStatus}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Religion/Community"}</Text>
                        <Text style={styles.textblack}>: {partner.partnerReligion}/{partner.caste}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Mother Tongue"}</Text>
                        <Text style={styles.textblack}>: {partner.motherTongue}</Text>
                    </View>
                </View>
                <View style={styles.haderRow}>
                    <Text style={styles.title}>{"Partner Location Details"}</Text>
                    <TouchableOpacity onPress={() => alert('Log out')}>
                        <Image style={styles.ImageStyle}
                            source={require('../../../Imagess/pencil.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.boxView}>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Country living in"}</Text>
                        <Text style={styles.textblack}>{": India"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"State living in"}</Text>
                        <Text style={styles.textblack}>{":"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"City/District"}</Text>
                        <Text style={styles.textblack}>{":"}</Text>
                    </View>
                </View>
                <View style={styles.haderRow}>
                    <Text style={styles.title}>{"Partner,Education & Career"}</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Partner_Preferences')}>
                        <Image style={styles.ImageStyle}
                            source={require('../../../Imagess/pencil.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.boxView}>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Country living in"}</Text>
                        <Text style={styles.textblack}>{": India"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"State living in"}</Text>
                        <Text style={styles.textblack}>{": Maharashtra"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"City living in"}</Text>
                        <Text style={styles.textblack}>{": Nagpur"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Residency Status"}</Text>
                        <Text style={styles.textblack}>{": Citizen"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Zip/Pin code"}</Text>
                        <Text style={styles.textblack}>{": Not Specified"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Grew Up in"}</Text>
                        <Text style={styles.textblack}>{": India"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Highest Qualification"}</Text>
                        <Text style={styles.textblack}>{": "}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"College(s) Attended"}</Text>
                        <Text style={styles.textblack}>{": College Name"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Working With"}</Text>
                        <Text style={styles.textblack}>{": Private company"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Working As"}</Text>
                        <Text style={styles.textblack}>{": Software Developer/Programmer"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Annual Income"}</Text>
                        <Text style={styles.textblack}>{": INR 2 Lakh to 4 Lakh"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Employer Name"}</Text>
                        <Text style={styles.textblack}>{":React Native Developer"}</Text>
                    </View>
                </View>
                <View style={styles.haderRow}>
                    <Text style={styles.title}>{"Partner Other Details"}</Text>
                    <TouchableOpacity onPress={() => alert('Log out')}>
                        <Image style={styles.ImageStyle}
                            source={require('../../../Imagess/pencil.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.boxView}>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Profile created by"}</Text>
                        <Text style={styles.textblack}>{":"}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text style={styles.textRow}>{"Diet"}</Text>
                        <Text style={styles.textblack}>{":"}</Text>
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
        backgroundColor: "#EFEFEF",

    },
    haderView: {
        flexDirection: 'row',
        backgroundColor: '#FF5733',
        height: 50,
        alignItems: 'center',
    },
    backArrow: {
        transform: [{ rotate: '180deg' }],
        marginLeft: 22,
        marginRight: 10,
        height: 25,
        width: 25,
        alignItems: 'flex-start',
        resizeMode: 'contain',
        tintColor: "#fff"
    },
    hadertext: {
        marginLeft: 8,
        marginRight: 20,
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold"
    },
    imageView: {
        width: '95%',
        height: 220,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 10,
        alignSelf: "center",
        elevation: 5
    },
    backgroundImg: {
        width: 100,
        height: 150,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 10
    },
    imagetext: {
        fontSize: 14,
        fontWeight: "bold",
        color: '#000',
        alignSelf: "center"
    },
    imagesmalltext: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        alignSelf: "center"
    },
    haderRow: {
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 13,
    },
    title: {
        color: "#cc2b5e",
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "center"
    },
    ImageStyle: {
        width: 15,
        height: 15,
        tintColor: "#000",
        resizeMode: "contain"
    },
    rowView: {
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: '#ffffff',
        padding: 16,
        elevation: 5
    },
    textRow: {
        color: "gray",
        fontSize: 15,
        fontWeight: "bold",
        flex: 1,
        flexWrap: "wrap"
    },
    textblack: {
        color: "#454F63",
        fontSize: 15,
        fontWeight: "bold",
        flex: 1,
        flexWrap: "wrap"

    },
    boxView: {
        flexDirection: "column",
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 8,
    }


});