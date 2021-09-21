import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    ImageBackground
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProfileMatch from '../Screen/TodayMatchsExtra/ProfileMatch.js'
// import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import updateRequest from "../AppSync/mutation/updateRequest";
import { withApollo, graphql } from "react-apollo";
import compose from "lodash.flowright";
import { Auth } from "aws-amplify";
import Loader from '../Screen/Componentone/Loader';
import Swiper from 'react-native-swiper';
import {getUserDetails,getContactDetails} from "../utils"
const MatchProfile = (props) => {
    const [profilePrivecy, setProfilePrivecy] = useState(false)
    const [data, setData] = useState(false)
    const [partnerData, setPartnerData] = useState([])
    const [id, setId] = useState('')
    const [modalData, setModalData] = useState([])
    const [userData,setUserData]=useState([])
    const [contact,setContactDetails]=useState([])
    let [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        Auth.currentAuthenticatedUser()
            .then(async(data) => {
                if(props&&props.route&&props.route.params){
                    setPartnerData(props.route.params['data'])
                    setData(props.route.params)
                    setContactDetails({
                        ...contact,
                        mob: props.route.params['mob'] ? `+91-${props.route.params['mob']}`  : 'Not Specified',
                        parentContact : props.route.params['parentContact']  ? props.route.params['parentContact']: 'Not Specified',
                        email : props.route.params['email'] ? props.route.params['email']  : 'Not Specified'
                    })
                }
                let userDetails=await getUserDetails(props,data.username)
                await AsyncStorage.setItem(data.username,JSON.stringify(userDetails))
                setUserData(userDetails);
                console.log('MatchesProfile==>',props.route.params['data'])

                setId(data.username);
                // getData(data.username);
                setLoading(false)
            }).catch((err) => {

            })
    }, []);

    const getContactDetail = async (userId,partnerId) => {
        console.log(userData.plan,userId,partnerId)
        if(userData.plan != 'BASIC' && userId && partnerId){
            // partnerId = partnerId
        let contactDetails_ = await getContactDetails(props,userId,partnerId)
        console.log('contactDetails_====>', contactDetails_)
        setContactDetails({
            ...contact,
            mob: contactDetails_.mob,
            parentContact : contactDetails_.parentContact ? contactDetails_.parentContact : 'Not Specified',
            email : contactDetails_.email ? contactDetails_.email : 'Not Specified'
        })
        console.log(contactDetails_)
    }
      }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Loader loading={loading} />
                <Swiper style={styles.wrapper} showsPagination={false} showsButtons={true}
                
                
                > 
                <ScrollView >
                    <View style={{ width: '96%', alignSelf: 'center' }}>
                        <ImageBackground style={{ width: '100%', height: 400, overflow: 'hidden', borderRadius: 10 }} resizeMode='cover'
                             source={
                                !data.profilePic ?
                                data.gender == 'Male' || data.gender == 'MALE' ?
                                        require('../Imagess/male.jpg') :
                                        require('../Imagess/female.jpeg') :
                                    { uri: data.profilePic }
                            }
                            >
                            <View style={{ alignItems: 'flex-end' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, marginRight: 30, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ profilePrivecy: !this.state.profilePrivecy })} >
                                    <Image style={{ width: 20, height: 25, tintColor: 'white' }} resizeMode='contain'
                                        source={require('../Imagess/DotIcon.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', marginRight: 40, marginTop: 40, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center', padding: 5, borderRadius: 20, width: '15%' }}>
                                    <Image style={{ width: 20, height: 20, tintColor: 'white' }}
                                        source={require('../Imagess/Camera.png')} />
                                    <Text style={{ marginLeft: 5, fontSize: 14, color: 'white' }}>6</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: 30, marginTop: 200 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, color: 'white', fontWeight: '700' }}>{data.fname}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                                        <View style={{ backgroundColor: 'green', borderRadius: 10, width: 5, height: 5, borderRadius: 3 }}></View>
                                        <Text style={{ marginLeft: 5, fontSize: 15, color: 'white' }}>{data.active}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 5, borderRadius: 12, backgroundColor: 'grey', marginLeft: 15, alignItems: 'center' }}>
                                <View style={{ width: 15, height: 15, marginLeft: 5 }}>
                                <Icon name="restaurant-outline" size={15} color="#fff" />
                                </View>
                                        {/* source={require('../Imagess/Matches.png')} /> */}
                                    <Text style={{ fontSize: 15, color: 'white', marginLeft: 5 }}>
                                        {
                                        data.gender == 'Male' || data.gender == 'MALE' ? 'You & Him' :
                                         'You & Her'
                                        }</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 30, alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'white' }}>{`${data.age}, ${data.height}`}</Text>
                                <Text style={{ fontSize: 14, color: 'white' }}>Travel & Transport Profession..</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 30, alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'white' }}>{`${data.motherTongue} ${data.caste} `}</Text>
                                <Text style={{ fontSize: 14, color: 'white' }}>{ `${data.city} ${data.state}`}</Text>
                            </View>
                        </ImageBackground>
                        <View style={{ padding: 15, borderWidth: 0.5, borderRadius: 10, marginTop: 10, backgroundColor: 'white',borderColor:"#0000001A"}}>
                            <Text style={{ fontSize: 17, fontWeight: '700' }}> About {`${data.fname}`}</Text>
                            <Text style={{ fontSize: 14, marginTop: 5 }}>Welcome to my profile....</Text>
                            <Text style={{ fontSize: 14, width: '90%' }}>{data.aboutMe}</Text>
                        </View>
                        <View style={{ marginTop: 15, backgroundColor: 'white', borderWidth: 0.5, padding: 15, borderRadius: 10 ,borderColor:"#0000001A"}}>
                            <Text style={{ fontSize: 17, fontWeight: '700' }}>Basic Details</Text>
                            <View style={{ flexDirection: 'row', marginTop: 15, }}>
                                <TouchableOpacity style={{ padding: 5, borderWidth: 0.5, borderRadius: 12,borderColor:"#2ECC71" }}>
                                    <Text>Created by {data.profileCreatedFor}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 5, borderWidth: 0.5, marginLeft: 5, borderRadius: 12,borderColor:"#2ECC71" }}>
                                    <Text>Profile ID - {data.username}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <TouchableOpacity style={{ padding: 5, borderWidth: 0.5, borderRadius: 12,borderColor:"#2ECC71" }}>
                                    <Text>{data.age} Yrs old</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 5, marginLeft: 5, borderWidth: 0.5, borderRadius: 12,borderColor:"#2ECC71" }}>
                                    <Text>Height - {data.height}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', }}>
                            <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#2ECC71' }}>
                                <Icon name="calendar-outline" size={15} color="#fff" />
                                </View>
                                <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Birth Date</Text>
                                    <Text style={{ fontSize: 15 }}>Aries, Brn on 13-Apr 1995</Text>
                                </View>
                            </View>
                           
                           
                            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', }}>
                            <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#2ECC71' }}>
                                <Icon name="person-outline" size={15} color="#fff" />
                               </View>
                               <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Marital Status</Text>
                                    <Text style={{ fontSize: 15 }}>Never Married</Text>
                                </View>
                            </View>
                          
                            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', }}>
                            <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#2ECC71' }}>
                                <Icon name="location-outline" size={15} color="#fff" />
                                </View>
                                <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Lives in</Text>
                                    <Text style={{ fontSize: 15 }}>Lives in Chandrapur, Maharashtra, India</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', }}>
                            <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#2ECC71' }}>
                                <Icon name="book-outline" size={15} color="#fff" />
                                </View>
                                <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Religion & Mother Tongue</Text>
                                    <Text style={{ fontSize: 15 }}>Hindu, Marathi</Text>
                                </View>
                            </View>
                          
                            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', }}>
                            <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#2ECC71' }}>
                                <Icon name="people-sharp" size={15} color="#fff" />
                                </View>
                                <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Community</Text>
                                    <Text style={{ fontSize: 15 }}>Teli</Text>
                                </View>
                            </View>
                           
                            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', }}>
                            <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#2ECC71' }}>
                                <Icon name="restaurant-outline" size={15} color="#fff" />
                                </View>
                                <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Diet Preferences</Text>
                                    <Text style={{ fontSize: 15 }}>Non-Vegetarian</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: 'red', borderRadius: 20 }}>
                            <View style={{ width: '100%', marginTop: 5, borderRadius: 20, backgroundColor: 'white', padding: 15, alignSelf: 'center', borderWidth: 1,borderColor:"#0000001A"}}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 17, fontWeight: '700' }}>Contact Details</Text>
                                    <Image style={{ width: 25, height: 25 }}
                                        source={require('../Imagess/success.png')} />
                                </View>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ padding: 8, alignSelf: 'center', borderRadius: 20, backgroundColor: 'red' }}>
                                            <Image style={{ width: 15, height: 15, tintColor: 'white' }}
                                                source={require('../Imagess/PhoneIcon.png')} />
                                        </View>
                                        <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Contact No</Text>
                                            <Text style={{ fontSize: 14, fontWeight: '500' }}>{`${contact.mob}`}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ padding: 8, borderRadius: 20, backgroundColor: 'red', alignSelf: 'center' }}>
                                            <Image style={{ width: 15, height: 15, tintColor: 'white' }}
                                                source={require('../Imagess/PhoneIcon.png')} />
                                        </View>
                                        <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Email ID</Text>
                                            <Text style={{ fontSize: 14, fontWeight: '500' }}>{`${contact.email}`}</Text>
                                        </View>
                                    </View>
                                    <View style={{ borderTopWidth: 0.5, marginTop: 15,borderColor:"#ABB2B9" }}>
                                        <TouchableOpacity 
                                        onPress={() => getContactDetail(id,data.id)}
                                        style={{ borderWidth: 1,borderColor:"#566573" , marginTop: 15, marginBottom: 10, width: '40%', height: 40, borderRadius: 20, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 17, fontWeight: '700' }}>View Details</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 15, width: '98%', marginTop: 10, alignSelf: 'center',borderWidth: 1,borderColor:"#0000001A" }}>
                            <Text style={{ fontSize: 18, fontWeight: '700' }}>Family Details</Text>
                            <View style={{ marginTop: 5 }}>
                                <Text style={{ fontSize: 14, width: '85%' }}>My father is currently not employed and my mother is a homemaker. I have 1 Brother (unmarried)</Text>
                            </View>
                        </View>

                        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 15, alignSelf: 'center', width: '98%', marginTop: 10,borderWidth: 1,borderColor:"#0000001A" }}>
                            <Text style={{ fontSize: 18, fontWeight: '700' }}>Career & Education</Text>
                            
                            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', }}>
                            <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#F1C40F' }}>
                                <Icon name="briefcase-outline" size={15} color="#fff" />
                                </View>
                                <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Profession</Text>
                                    <Text style={{ fontSize: 15 }}>Travel & Transport Professional - own</Text>
                                    <Text style={{ fontSize: 15 }}>Business/self employed</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', }}>
                            <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#F1C40F' }}>
                                <Icon name="wallet-outline" size={15} color="#fff" />
                                </View>
                                <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Annual Income</Text>
                                    <Text style={{ fontSize: 15 }}>Earns INR 4 Lakh to 7 Lakh annually</Text>
                                   </View>
                            </View>
                       </View>

                        <View style={{ marginTop: 10, width: '98%', borderRadius: 20, marginBottom: 20, alignSelf: 'center', backgroundColor: '#A04ECC' }}>
                            <View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ width: 50, height: 50, alignSelf: 'center' }}
                                    source={require('../Imagess/Astrology.png')} />
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                    <Text style={{ fontSize: 16, color: 'white' }}>Add your details to see Shubham</Text>
                                    <Text style={{ fontSize: 16, color: 'white' }}>Bangade's astro details</Text>
                                </View>
                                <TouchableOpacity style={{ borderWidth: 1, marginTop: 10, alignItems: 'center', borderColor: 'white', marginBottom: 10, justifyContent: 'center', borderRadius: 20, width: 100, height: 40 }}>
                                    <Text style={{ fontSize: 16, color: 'white' }}>Add Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex:1}}>
                            <ProfileMatch {...props}/>
                        </View>
                    </View>
                   
           </ScrollView>

          </Swiper>
            

                <View style={{ position: 'absolute', alignSelf: 'center', marginTop: '100%', justifyContent: 'flex-end' }}>
                    <View style={{ alignSelf: 'center', marginTop: '60%', borderWidth: 1,borderColor:"#0000001A",padding: 8, borderRadius: 60, width: '80%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white', }}>
                        <TouchableOpacity>
                            <View style={{ borderWidth: 1, padding: 5, borderRadius: 35, alignSelf: 'center', backgroundColor: 'white', borderColor: 'green' }}>
                                <Image style={{ width: 25, height: 25, tintColor: 'green', transform: [{ rotate: '120deg' }] }}
                                    source={require('../Imagess/PhoneIcon.png')} />
                            </View>
                            <Text style={{ fontSize: 15, marginTop: 5 }}>View Contact</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}}>
                            <View style={{ borderWidth: 1, padding: 5, borderRadius: 35, alignSelf: 'center', backgroundColor: 'white', borderColor: 'green' }}>
                                <Image style={{ width: 25, height: 25, tintColor: 'green' }}
                                    source={require('../Imagess/SingleTick.png')} />
                            </View>
                            <Text style={{ fontSize: 15, marginTop: 5 }}>Connect Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {profilePrivecy ?
                    <View style={{ borderRadius: 40, backgroundColor: 'white', width: '100%' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, marginLeft: 25 }}>
                            <Image style={{ width: 25, height: 25 }}
                                source={require('../Imagess/FilterImage.png')} />
                            <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20 }}>Add to Shortlist</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, marginLeft: 25 }}>
                            <Image style={{ width: 25, height: 25 }}
                                source={require('../Imagess/FilterImage.png')} />
                            <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20 }}>Block this Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, marginBottom: 30, marginLeft: 25 }}>
                            <Image style={{ width: 25, height: 25 }}
                                source={require('../Imagess/FilterImage.png')} />
                            <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20 }}>Report this Profile</Text>
                        </TouchableOpacity>
                    </View>
                    : null}
            </SafeAreaView>
        )
    
}

const profile = compose(
    withApollo,
    graphql(updateRequest, { name: "updateRequest" })
)(MatchProfile);
export default profile;

const styles = StyleSheet.create({
    HeaderText: {
        fontSize: 16
    },
    wrapper:{
      
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        position:"absolute"
      },
      slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
      },
      slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BB',
      },
      text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
      }
    });
    