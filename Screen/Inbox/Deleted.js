import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    Image,
    ImageBackground
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Auth } from "aws-amplify";
import { graphql, withApollo } from "react-apollo";
import compose from "lodash.flowright";
import Getdata from "../../AppSync/query/Auth/getData";
import updateRequest from "../../AppSync/mutation/updateRequest";
import listUser from "../../AppSync/query/ListUser";
import Loader from '../../Screen/Componentone/Loader';
import {getUserDetails,getInboxData} from "../../utils"
const list =[{"__typename": "User", "aboutMe": "I have completed my Bachelors. I am a friendly and down-to-earth person Looking for the simple girl whocan carry the Family values.", "age": "28", "availability": "1 week ago", "caste": "Teli", "education": {"__typename": "Education", "annualIncome": "4", "colg_institute": "GNIET", "employedIn": "Not-working", "highestEducation": "Engineering Diploma", "occuDetails": "AN", "occupation": "Software Consultant"}, "email": "Not Specified", "familyDetails": {"__typename": "FamilyDetails", "parentContact": null}, "fname": "Kartina1", "gender": "FEMALE", "height": "5 ft 8 in", "id": "75465c14-6c9d-4de8-aa4e-75b0754300dcc::4671d0fb-30e5-4673-bc39-c3ff790e62b3", "interest": null, "location": {"__typename": "Location", "city": "Nagpur", "country": "Albania", "state": "Qarku i Durresit"}, "mob": "95********", "motherTongue": "Marathi", "profileCreatedFor": "Self", "profilePic": "https://amplify-matrimony-matdev-201729-deployment.s3.ap-south-1.amazonaws.com/public/4671d0fb-30e5-4673-bc39-c3ff790e62b3/CBB15993-6696-4EB0-A656-8AF564E48CAC.jpg", "religion": "Hindu", "tablename": "75465c14-6c9d-4de8-aa4e-75b075430dcc"},
{"__typename": "User", "aboutMe": "I have completed my Bachelors. I am a friendly and down-to-earth person Looking for the simple girl whocan carry the Family values.", "age": "28", "availability": "1 week ago", "caste": "Teli", "education": {"__typename": "Education", "annualIncome": "4", "colg_institute": "GNIET", "employedIn": "Not-working", "highestEducation": "Engineering Diploma", "occuDetails": "AN", "occupation": "Software Consultant"}, "email": "Not Specified", "familyDetails": {"__typename": "FamilyDetails", "parentContact": null}, "fname": "Kartina2", "gender": "FEMALE", "height": "5 ft 8 in", "id": "75465c14-6c9d-4de8-aa4e-75b075430dcc::46701d0fb-30e5-4673-bc39-c3ff790e62b3", "interest": null, "location": {"__typename": "Location", "city": "Nagpur", "country": "Albania", "state": "Qarku i Durresit"}, "mob": "95********", "motherTongue": "Marathi", "profileCreatedFor": "Self", "profilePic": "https://amplify-matrimony-matdev-201729-deployment.s3.ap-south-1.amazonaws.com/public/4671d0fb-30e5-4673-bc39-c3ff790e62b3/CBB15993-6696-4EB0-A656-8AF564E48CAC.jpg", "religion": "Hindu", "tablename": "75465c14-6c9d-4de8-aa4e-75b075430dcc"},
{"__typename": "User", "aboutMe": "I have completed my Bachelors. I am a friendly and down-to-earth person Looking for the simple girl whocan carry the Family values.", "age": "28", "availability": "1 week ago", "caste": "Teli", "education": {"__typename": "Education", "annualIncome": "4", "colg_institute": "GNIET", "employedIn": "Not-working", "highestEducation": "Engineering Diploma", "occuDetails": "AN", "occupation": "Software Consultant"}, "email": "Not Specified", "familyDetails": {"__typename": "FamilyDetails", "parentContact": null}, "fname": "Kartina3", "gender": "FEMALE", "height": "5 ft 8 in", "id": "75465c14-6c9d-4de8-aa4e-75b0705430dcc::4671d0fb-30e5-4673-bc39-c3ff790e62b3", "interest": null, "location": {"__typename": "Location", "city": "Nagpur", "country": "Albania", "state": "Qarku i Durresit"}, "mob": "95********", "motherTongue": "Marathi", "profileCreatedFor": "Self", "profilePic": "https://amplify-matrimony-matdev-201729-deployment.s3.ap-south-1.amazonaws.com/public/4671d0fb-30e5-4673-bc39-c3ff790e62b3/CBB15993-6696-4EB0-A656-8AF564E48CAC.jpg", "religion": "Hindu", "tablename": "75465c14-6c9d-4de8-aa4e-75b075430dcc"},
{"__typename": "User", "aboutMe": "I have completed my Bachelors. I am a friendly and down-to-earth person Looking for the simple girl whocan carry the Family values.", "age": "28", "availability": "1 week ago", "caste": "Teli", "education": {"__typename": "Education", "annualIncome": "4", "colg_institute": "GNIET", "employedIn": "Not-working", "highestEducation": "Engineering Diploma", "occuDetails": "AN", "occupation": "Software Consultant"}, "email": "Not Specified", "familyDetails": {"__typename": "FamilyDetails", "parentContact": null}, "fname": "Kartina4", "gender": "FEMALE", "height": "5 ft 8 in", "id": "75465c14-6c9d-4de8-aa4e-75b0754030dcc::4671d0fb-30e5-4673-bc39-c3ff790e62b3", "interest": null, "location": {"__typename": "Location", "city": "Nagpur", "country": "Albania", "state": "Qarku i Durresit"}, "mob": "95********", "motherTongue": "Marathi", "profileCreatedFor": "Self", "profilePic": "https://amplify-matrimony-matdev-201729-deployment.s3.ap-south-1.amazonaws.com/public/4671d0fb-30e5-4673-bc39-c3ff790e62b3/CBB15993-6696-4EB0-A656-8AF564E48CAC.jpg", "religion": "Hindu", "tablename": "75465c14-6c9d-4de8-aa4e-75b075430dcc"}]
const Deleted = (props, { navigation }) => {
    // console.log('Recieved PROPS:',navigation,props)
    const [id, setId] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [modalData, setModalData] = useState([])
    let [loading, setLoading] = useState(true);
    const [AcceptArray, setAcceptArray] = useState([]);
    const [userData,setUserData]=useState([])
    const [data, setData] = useState([]);
    useEffect(() => {
        setLoading(true)
        Auth.currentAuthenticatedUser()
            .then(async(data) => {
                setId(data.username)
                let userDetails=await getUserDetails(props,data.username)
                setUserData(userDetails);
                let inboxData = await getInboxData(props,data.username,'DECLINE');
                setAcceptArray(inboxData)
                // console.log(inboxData)
            });
    }, []
    )
    const updateIntrestData = async (item,index, status) => {
        console.log("item::====>",index, status,AcceptArray.length);
        try {
          await props
            .updateRequest({
              variables: {
                userId:id,
                tablename: `${item['tablename']}`,
                id: item['id'],
                status: status,
              },
            })
            .then((res) => {
                if (AcceptArray.length == 1)
                setAcceptArray([]);
            else
                {
                    AcceptArray.splice(Number(index), 1);
                    setAcceptArray(AcceptArray);
                }
              console.log("Response Update data::");
            });
        } catch (error) {
          console.log("ERROR::", error);
        }
      };
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/* <ScrollView> */}
                <View style={{ width: '95%', flex: 1, marginTop: 10, alignSelf: 'center', }}>

                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "gray", }}>All Invitation (13)</Text>
                        <TouchableOpacity style={{ alignItems: 'center', }}>
                            <Image style={{ width: 40, height: 40, }}
                                source={require('../../Imagess/set.jpg')} />

                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', flex: 1, marginBottom: 10 }}>
                        <FlatList
                            data={AcceptArray}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item,index }) =>
                                <View style={{ width: '100%', borderRadius: 10, borderWidth: 1, alignItems: 'center', marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <View style={{ marginLeft: '25%', alignItems: 'center' }}>
                                            <TouchableOpacity >
                                                <Image style={{ width: 150, height: 150, borderRadius: 75, borderWidth: 0.5 }}
                                                    source={require('../../Imagess/TrishaKrishnan.jpg')} />
                                            </TouchableOpacity>
                                            <Text style={{ alignItems: 'center', marginTop: 10, justifyContent: 'center', fontSize: 18 }}>{item.fname}</Text>
                                        </View>
                                        <View style={{ marginBottom: 90, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 14, color: "gray", marginBottom: 70, }}>few hours ago</Text>

                                        </View>
                                    </View>
                                    <Text style={{ width: '50%', fontSize: 16, marginTop: 10, marginBottom: 20 }} >28yrs, 5'11",Marathi, Teli Pune, India, B.E / B.Tech Sr. Manager / Manager</Text>
                                    <View style={{ flexDirection: 'row', borderRadius: 10, borderColor: 'green', borderWidth: 1, padding: 10, marginBottom: 20 }}>
                                        <Image style={{ width: 15, height: 15 }}
                                            source={require('../../Imagess/chatimage.jpeg')} />
                                        <Text style={{ fontSize: 14, marginLeft: 10 }}>Hi, is nice connecting with you. ....</Text>
                                        <TouchableOpacity>
                                            <Text style={{ fontSize: 14, color: 'green', marginLeft: 10 }}>more ></Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ width: '85%', borderRadius: 5, padding: 10, marginBottom: 20, backgroundColor: "#ffe4e1", alignItems: 'center', alignSelf: "center" }}>

                                        <Text style={{ fontSize: 14, alignItems: 'center', alignSelf: "center" }}>You Declined his Invitation</Text>

                                    </View>
                                    <View style={{ padding: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', width: '70%', }}>
                                        <Text style={{ fontSize: 14, alignItems: 'center', alignSelf: "center", fontWeight: "bold", color: "gray" }}>Changed your mind?</Text>
                                        <TouchableOpacity style={{ alignItems: 'center', }}
                                        onPress={() => { updateIntrestData(item,index,'ACCEPTED') }}
                                        >
                                            <Image style={{ width: 40, height: 40, }}
                                                source={require('../../Imagess/accept.jpeg')} />
                                            <Text>Accept</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>}
                        />
                    </View>
                </View>
                {/* </ScrollView> */}
            </SafeAreaView>
        )
    }
    const profile = compose(
        withApollo,
        graphql(updateRequest, { name: "updateRequest" })
    )(Deleted);
    export default profile;