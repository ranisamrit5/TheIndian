import React, { useState ,useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    Image,
    Modal,
    ImageBackground
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ColorCode from '../Stylesss/ColorCode'
import { Auth } from "aws-amplify";
import updateRequest from "../../AppSync/mutation/updateRequest";
import { graphql, withApollo } from "react-apollo";
import compose from "lodash.flowright";
import utils from "../libs/config/utils"
import listUser from "../../AppSync/query/ListUser";
const Accepted = (props) => {
    // props.route.params=''
    const [AcceptArray, setAcceptArray] = useState([]);
    const [recieved_,setRecieved]= useState([]);
    const [id, setId] = useState()
    const [swiper, setSwiper] = useState()
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        Auth.currentAuthenticatedUser()
            .then(async(data) => {
                console.log('user---->::',data.username)
                setId(data.username)
                // let activity = await utils.userActivity(data.username,'ACCEPTED',props)
                // setRecieved(activity)
                getRecieved(data.username);
            });
    }, []
    )

    const getRecieved = async (userId) => {
        const { data } = await props.client.query({
            query: listUser,
            fetchPolicy: "network-only",
            variables: {
                id: `${userId}`,
                type:'ACCEPTED'
            },
        });
        if(data && data.listUser && data.listUser.items){
            // props.navigation.navigate('InboxMainTab');
            setRecieved(data.listUser.items)
            setAcceptArray(data.listUser.items)
            setLoading(false)
        }else{
            props.route.params='Accepted'
        }
        console.log('getRecieved====>', data.listUser.items)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <ScrollView> */}
            <View style={{ width: '95%', flex: 1, marginTop: 10, alignSelf: 'center' }}>
                <Text style={{ fontSize: 16 }}>Accepted Invitation (13)</Text>
                <View style={{ width: '100%', flex: 1, marginBottom: 10 }}>
                    <FlatList
                        data={AcceptArray}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <View style={{ width: '100%', borderRadius: 10, borderWidth: 1, alignItems: 'center', marginTop: 10,borderColor:"#0000001A"  }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <View style={{ marginLeft: '25%', alignItems: 'center' }}>
                                        <TouchableOpacity >
                                            <Image style={{ width: 150, height: 150, borderRadius: 75, borderWidth: 0.5 }}
                                                source={require('../../Imagess/TrishaKrishnan.jpg')} />
                                        </TouchableOpacity>
                                        <Text style={{ alignItems: 'center', marginTop: 10, justifyContent: 'center', fontSize: 18 }}>{item.fname}</Text>
                                    </View>
                                    <View style={{ marginBottom: 70, marginLeft: '15%' }}>
                                        <Text>21 Jan</Text>
                                        <TouchableOpacity style={{ borderWidth: 1, padding: 8, borderRadius: 30, marginTop: 15,borderColor:"#0000001A"  }}>
                                            <Image style={{ width: 25, height: 25 }}
                                                source={require('../../Imagess/arrowiconVc.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style={{ textAlign:"center",marginLeft:30,marginRight:30,alignItems: 'center',alignSelf: 'center',margin:15 }} >28yrs, 5'11",Marathi, Teli Pune, India, B.E / B.Tech Sr. Manager / Manager</Text>
                                <View style={{ flexDirection: 'row', borderRadius: 10, borderColor: 'green', borderWidth: 1, padding: 10, marginBottom: 20 }}>
                                    <Image style={{ width: 15, height: 15 }}
                                        source={require('../../Imagess/chatimage.jpeg')} />
                                    <Text style={{ fontSize: 14, marginLeft: 10 }}>Hi, is nice connecting with you. ....</Text>
                                    <TouchableOpacity>
                                        <Text style={{ fontSize: 14, color: 'green', marginLeft: 10 }}>more </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ padding: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
                                    <TouchableOpacity style={{ alignItems: 'center' }}>
                                        <Image style={{ width: 40, height: 40 }}
                                            source={require('../../Imagess/chatimage.jpeg')} />
                                        <Text>Shaadi Chat</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ alignItems: 'center' }}>
                                        <Image style={{ width: 40, height: 40 }}
                                            source={require('../../Imagess/Whatsapp.jpeg')} />
                                        <Text>WhatsApp</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ alignItems: 'center' }}>
                                        <Image style={{ width: 40, height: 40 }}
                                            source={require('../../Imagess/call.png')} />
                                        <Text>Call</Text>
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
    // graphql(updateRequest, { name: "updateRequest" })
)(Accepted);
export default profile;