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
    ImageBackground,
    Modal
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Auth } from "aws-amplify";
import { graphql, withApollo } from "react-apollo";
import compose from "lodash.flowright";
import Getdata from "../../AppSync/query/Auth/getData";
import updateRequest from "../../AppSync/mutation/updateRequest";
import listUser from "../../AppSync/query/ListUser";
import Loader from '../../Screen/Componentone/Loader';
import {getUserDetails,getContactDetails} from "../../utils"

const Sent = (props, { navigation }) => {
    // console.log('Recieved PROPS:',navigation,props)
    const [id, setId] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [modalData, setModalData] = useState([])
    let [loading, setLoading] = useState(true);
    const [AcceptArray, setAcceptArray] = useState([1, 2, 3, 4, 5]);
    const [userData,setUserData]=useState([])
    const [data, setData] = useState([]);
    useEffect(() => {
        setLoading(true)
        Auth.currentAuthenticatedUser()
            .then(async(data) => {
                setId(data.username)
                let userDetails=await getUserDetails(props,data.username)
                setUserData(userDetails);
                getSent(data.username);
            });
    }, []
    )

    const ModalVisible = (visible,item) => {
        console.log('item---->::',item)
        setModalData(item)
        setModalVisible(visible);

    }

    const getSent = async (userId) => {
        const { data } = await props.client.query({
            query: listUser,
            fetchPolicy: "network-only",
            variables: {
                id: `${userId}`,
                type: 'SENT'
            },
        });
        if (data && data.listUser && data.listUser.items) {
            // props.navigation.navigate('InboxMainTab');
            setData(data.listUser.items)
            // setAcceptArray(data.listUser.items)
            setLoading(false)
        } else {
            props.route.params = 'Accepted'
        }
        
    }
    const getContactDetail = async (userId,partnerId) => {
        if(userData.plan != 'BASIC'){
            partnerId = partnerId.split('::')[1]
        let contactDetails_ = await getContactDetails(props,userId,partnerId)
        console.log('contactDetails_====>', contactDetails_)
        setModalData({
            ...modalData,
            mob: contactDetails_.mob,
            parentContact : contactDetails_.parentContact ? contactDetails_.parentContact : 'Not Specified',
            email : contactDetails_.email ? contactDetails_.email : 'Not Specified'
        })
        console.log(contactDetails_)
    }
      }

    return (
      
        <SafeAreaView style={{ flex: 1 }} >
            {/* <ScrollView> */}
            <View style={{ width: '95%', flex: 1, marginTop: 10, alignSelf: 'center' }} onPress={() => ModalVisible(false)} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16 }}>{`All Invitation Sent (${data.length})`}</Text>
                    <TouchableOpacity onPress={() => ModalVisible(false)} >
                        <Image style={{ width: 25, height: 25 }}
                            source={require('../../Imagess/arrowiconVc.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{  flex: 1, marginBottom: 10, }}>
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <View style={{borderRadius: 10, borderWidth: 1, alignItems: 'center', marginTop: 10,borderColor:"#0000001A" ,}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <View style={{ marginLeft: '25%', alignItems: 'center' }}>
                                        <TouchableOpacity >
                                            <Image style={{ width: 150, height: 150, borderRadius: 75, borderWidth: 0.5 ,borderColor:"#0000001A" }}
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
                                <Text style={{ textAlign:"center",marginLeft:30,marginRight:30,alignItems: 'center',alignSelf: 'center',margin:15}} >{`${item.age} yrs, ${item.height}, ${item.motherTongue}, ${item.caste}`}, Pune, India, B.E / B.Tech Sr. Manager / Manager</Text>
                                <View style={{ flexDirection: 'row', borderRadius: 10, borderColor: 'green', borderWidth: 1, padding: 10, marginBottom: 20, width: '90%' }}>
                                    <Image style={{ width: 15, height: 15 }}
                                        source={require('../../Imagess/chatimage.jpeg')} />
                                    <Text style={{ fontSize: 14, marginLeft: 10, fontWeight: '600' }}>Hello We liked your profile for my ....</Text>
                                    <TouchableOpacity>
                                        <Text style={{ fontSize: 14, color: 'green', marginLeft: 10 }}>more </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ backgroundColor: '#8fbc8f', alignItems: 'center', justifyContent: 'center', padding: 10, width: '90%', alignSelf: 'center', borderRadius: 5, }}>
                                    <Text style={{ alignSelf: 'center', textAlign: 'center' }}>He viewed your invitation on 08 jan and chose to respnd later</Text>
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
                                    <TouchableOpacity style={{ alignItems: 'center' }}
                                        onPress={() => ModalVisible(true,item)}
                                    >
                                        <Image style={{ width: 40, height: 40 }}
                                            source={require('../../Imagess/call.png')} />
                                        <Text>Call</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>}
                    />
                </View>
                <View style={ { width: '100%'}}>
                    <Modal
                    

                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                           setModalVisible(false)
                            Alert.alert("Modal has been closed.");
                        }}
                    >
                         <View style={[styles.centeredView]}>
                            <View style={[styles.modalView_, { width: '100%',height:'100%' }]}>
                            <TouchableOpacity style={{ alignItems: 'center' }}>
                                        <Image style={{ width: 60, height: 60 ,borderRadius: 75, }}
                                             source={
                                                !modalData.profilePic ?
                                                modalData.gender == 'Male' || modalData.gender == 'MALE' ?
                                                        require('../../Imagess/male.jpg') :
                                                        require('../../Imagess/female.jpeg') :
                                                    { uri: modalData.profilePic }
                                            }
                                            />
                                        <Text>{modalData.fname}</Text>
                                    
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ padding: 8, alignSelf: 'center', borderRadius: 20, backgroundColor: 'red' }}>
                                            <Image style={{ width: 15, height: 15, tintColor: 'white' }}
                                                source={require('../../Imagess/PhoneIcon.png')} />
                                        </View>
                                        <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Contact No</Text>
                                            <Text style={{ fontSize: 14, fontWeight: '500' }}>{`${modalData.mob}`}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ padding: 8, borderRadius: 20, backgroundColor: 'red', alignSelf: 'center' }}>
                                            <Image style={{ width: 15, height: 15, tintColor: 'white' }}
                                                source={require('../../Imagess/PhoneIcon.png')} />
                                        </View>
                                        <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Email ID</Text>
                                            <Text style={{ fontSize: 14, fontWeight: '500' }}>{`${modalData.email}`}</Text>
                                        </View>
                                    </View>
                                    <View style={{ borderTopWidth: 0.5, marginTop: 15,borderColor:"#ABB2B9" }}>
                                        <TouchableOpacity 
                                        onPress={() => getContactDetail(id,modalData.id)}
                                        style={{ borderWidth: 1,borderColor:"#566573" , marginTop: 15, marginBottom: 10, width: '40%', height: 40, borderRadius: 20, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 17, fontWeight: '700' }}>View Details</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                              
                        </View>
                        {/* <View style={[styles.centeredView]}>
                            <View style={[styles.modalView_, { width: '100%',height:'100%' }]}>
                                <View style={{ backgroundColor: 'white' }}>
                                <TouchableOpacity style={{ alignItems: 'center' }}>
                                        <Image style={{ width: 60, height: 60 ,borderRadius: 75, }}
                                             source={
                                                !modalData.profilePic ?
                                                modalData.gender == 'Male' || modalData.gender == 'MALE' ?
                                                        require('../../Imagess/male.jpg') :
                                                        require('../../Imagess/female.jpeg') :
                                                    { uri: modalData.profilePic }
                                            }
                                            />
                                        <Text>{modalData.fname}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => setModalVisible(false)}>
                                        <View style={{flexDirection: 'row'}}>
                                    <Image style={{ width: 20, height: 20  }}
                                             source={require('../../Imagess/call1.png') 
                                            }
                                            />
                                        <Text style={{ fontSize: 18, fontWeight: '600' }}>{`+91-${modalData.mob}`}</Text>
                                        <TouchableOpacity  onPress={() => getContactDetail(id,modalData.id)}>
                                           <Image style={{ width: 25, height: 25  }}
                                             source={require('../../Imagess/lock.png') 
                                            }
                                            />
                                            </TouchableOpacity>
                                    </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => setModalVisible(false)}>
                                        <View style={{flexDirection: 'row'}}>
                                    <Image style={{ width: 20, height: 20  }}
                                             source={require('../../Imagess/email.png') 
                                            }
                                            />
                                        <Text style={{ fontSize: 18, fontWeight: '600' }}>{`${modalData.email}`}</Text>
                                        <TouchableOpacity  onPress={() => getContactDetail(id,modalData.id)}>
                                           <Image style={{ width: 25, height: 25  }}
                                             source={require('../../Imagess/lock.png') 
                                            }
                                            />
                                            </TouchableOpacity>
                                    </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    */}
                    </Modal>

                </View>
            </View>
            {/* </ScrollView> */}
        </SafeAreaView>
     
    )
}
const profile = compose(
    withApollo,
    graphql(updateRequest, { name: "updateRequest" })
)(Sent);
export default profile;

const styles = StyleSheet.create({
    // centeredView: {
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     marginTop: 22
    // },
    modalView_: {
        //  top:170,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    centeredView: {
        margin: 0, 
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor: 'white', 
        height: '50%', 
        flex:0 , 
        bottom: 0, 
        position: 'absolute',
        width: '100%',
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },
   
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
