import React, { useState ,useEffect } from 'react';
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
const moment = require("moment")
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Auth } from "aws-amplify";
import { graphql, withApollo } from "react-apollo";
import compose from "lodash.flowright";
import Loader from '../../Screen/Componentone/Loader';
import {getUserDetails,getContactDetails,getInboxData} from "../../utils"

const Contact = (props,{ navigation }) => {
    const [id, setId] = useState()
    let [loading, setLoading] = useState(true);
    const [ContatectArray,setContatectArray]= useState([]);
    const [Primium,setPrimium]= useState(true);
    const [userData,setUserData]=useState([])
    const [ContatctNot,setContatctNot]= useState(false);
    useEffect(() => {
        setLoading(true)
        Auth.currentAuthenticatedUser()
            .then(async(data) => {
                setId(data.username)
                let userDetails= await getUserDetails(props,data.username)
                let contactList = await getInboxData(props,data.username,'CONTACTSEEN')
                setContatectArray(contactList)
                console.log(contactList)
                setUserData(userDetails);
            });
    }, []
    )
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-between', borderWidth: 1, height: 35, alignItems: 'center',borderColor:"#0000001A", }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 15, height: 15, marginLeft: 10 }}
                            source={require('../../Imagess/Astrology.png')} />
                        <Text style={{ marginLeft: 10, fontSize: 15 }}>Contacts Viewed by you</Text>
                    </View>
                    <View style={{ flexDirection: 'row', height: 35, alignItems: 'center', borderWidth: 0.5, padding: 5 ,borderColor:"#0000001A"}}>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>12</Text>
                        <Text style={{ fontSize: 16 }}> of </Text>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>150</Text>
                    </View>
                </View>
                <View style={{marginLeft:10,marginRight:10,marginTop:16}}>
                    <FlatList
                        data={ContatectArray}
                        renderItem={({ item }) =>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderWidth: 1, padding: 10, marginBottom: 10 ,borderColor:"#0000001A",borderRadius:5}}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 50, height: 50, borderRadius: 25,marginLeft:10, }}
                                        source={
                                            !item.profilePic ?
                                                item.gender == 'Male' || item.gender == 'MALE' ?
                                                    require('../../Imagess/male.jpg') :
                                                    require('../../Imagess/female.jpeg') :
                                                { uri: item.profilePic }
                                        } />
                                    <View style={{ marginLeft: 10 }}>
                                        <View style={{ flexDirection: 'row', }}>
                                            <Text style={{ fontSize: 18, fontWeight: '500' }}>{`${item.fname}` }</Text>
                                            {Primium ?
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 5 }}>
                                                    <Image style={{ width: 20, height: 20 }}
                                                        source={require('../../Imagess/crown.jpeg')} />
                                                    <Text style={{ fontSize: 18, fontWeight: '600', color: 'red' }}>+</Text>
                                                </View>
                                                : null}
                                        </View>
                                        <Text style={{ fontSize: 14 ,marginBottom:5}}>Profile created by {item.profileCreatedFor}</Text>
                                        {ContatctNot == false ?
                                            <View style={{ padding: 5, backgroundColor: '#e5e5e5', paddingLeft: 10, paddingRight: 35, marginTop: 5,borderRadius:5 }}>
                                                {item.mob != null && item.mob != 'REJECTED' ?
                                                    <View>
                                                        <Text>{`Contact No. +91-${item.mob}`}</Text>
                                                        <Text>{`Email ${item.email ? item.email : 'Not Specified'}`}</Text>
                                                    </View>
                                                    :
                                                    <View>
                                                        <Text>Contact Not Available</Text>
                                                        <Text>As he has declined your invitation</Text>
                                                    </View>
                                                }
                                            </View>
                                            : null}
                                        {ContatctNot ?
                                            <View style={{ marginTop: 5 }}>
                                                <TouchableOpacity style={{ flexDirection: 'row',alignItems:'center' }}>
                                                    <Image style={{ width: 20, height: 20, transform: [{ rotate: '120deg' }],tintColor:'blue' }}
                                                        source={require('../../Imagess/PhoneIcon.png')} />
                                                    <Text style={{ fontSize: 15, fontWeight: '600',color:'blue' }}>+91-9890701799</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ flexDirection: 'row',alignItems:'center', marginTop: 5 }}>
                                                    <Image style={{ width: 30, height: 30 ,tintColor:'blue'}} resizeMode='cover'
                                                        source={require('../../Imagess/inbox.png')} />
                                                    <Text style={{ fontSize: 16, fontWeight: '600',color:'blue' }}>Vishalgaidhane41@gmail.com</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ flexDirection: 'row',alignItems:'center', marginTop: 5 }}>
                                                    <Image style={{ width: 20, height: 20, }}
                                                        source={require('../../Imagess/chaticon.png')} />
                                                    <Text style={{ fontSize: 16, fontWeight: '600',marginLeft:5,color:'blue' }}>Send SMS</Text>
                                                </TouchableOpacity>
                                            </View>
                                            : null}
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row',marginRight:10 }}>
                                    <Text>{moment(item.created_at).format("ll")}</Text>
                                    <TouchableOpacity style={{ marginLeft: 10 }}>
                                        <Image style={{ width: 15, height: 15, transform: [{ rotate: '90deg' }], tintColor: 'black' }}
                                            source={require('../../Imagess/DotIcon.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        } />
                </View>
            </SafeAreaView>
        )
    }
    const profile = compose(
        withApollo,
        // graphql(updateRequest, { name: "updateRequest" })
    )(Contact);
    export default profile;