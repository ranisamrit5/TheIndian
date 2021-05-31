import React, { Component } from 'react';
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
import ProfileMatch from '../Screen/TodayMatchsExtra/ProfileMatch.js'

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class app extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profilePrivecy: false
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ width: '96%', alignSelf: 'center' }}>
                        <ImageBackground style={{ width: '100%', height: 400, overflow: 'hidden', borderRadius: 10 }} resizeMode='cover'
                            source={require('../Imagess/TrishaKrishnan.jpg')}  >
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
                                    <Text style={{ fontSize: 16, color: 'white', fontWeight: '700' }}>Shubham B</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                                        <View style={{ backgroundColor: 'green', borderRadius: 10, width: 5, height: 5, borderRadius: 3 }}></View>
                                        <Text style={{ marginLeft: 5, fontSize: 15, color: 'white' }}>2d ago</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 5, borderRadius: 12, backgroundColor: 'grey', marginLeft: 15, alignItems: 'center' }}>
                                    <Image style={{ width: 15, height: 15, marginLeft: 5 }}
                                        source={require('../Imagess/Matches.png')} />
                                    <Text style={{ fontSize: 15, color: 'white', marginLeft: 5 }}>You & Him</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 30, alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'white' }}>25Yrs, 5" 10" .</Text>
                                <Text style={{ fontSize: 14, color: 'white' }}>Travel & Transport Profession..</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 30, alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'white' }}>Marathi, Teli .</Text>
                                <Text style={{ fontSize: 14, color: 'white' }}>Chandrapur,Maharashtra</Text>
                            </View>
                        </ImageBackground>
                        <View style={{ padding: 15, borderWidth: 0.5, borderRadius: 10, marginTop: 10, backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 17, fontWeight: '700' }}> About xyz</Text>
                            <Text style={{ fontSize: 14, marginTop: 5 }}>Welcome to my profile....</Text>
                            <Text style={{ fontSize: 14, width: '90%' }}>I have completed my Bachelors. I am a friendly and down-to-earth person Looking for the simple girl whocan carry the Family values.</Text>
                        </View>
                        <View style={{ marginTop: 15, backgroundColor: 'white', borderWidth: 0.5, padding: 15, borderRadius: 10 }}>
                            <Text style={{ fontSize: 17, fontWeight: '700' }}>Basic Details</Text>
                            <View style={{ flexDirection: 'row', marginTop: 15, }}>
                                <TouchableOpacity style={{ padding: 5, borderWidth: 0.8, borderRadius: 12 }}>
                                    <Text>Created by Self</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 5, borderWidth: 0.8, marginLeft: 5, borderRadius: 12 }}>
                                    <Text>Profile ID - SH77083525</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <TouchableOpacity style={{ padding: 5, borderWidth: 0.8, borderRadius: 12 }}>
                                    <Text>25 Yrs old</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 5, marginLeft: 5, borderWidth: 0.8, borderRadius: 12 }}>
                                    <Text>Height - 5" 10"</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', }}>
                                <View style={{ padding: 5, borderRadius: 20, backgroundColor: 'green' }}>
                                    <Image style={{ width: 15, height: 15, tintColor: 'white' }} resizeMode='contain'
                                        source={require('../Imagess/Calender.jpeg')} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 15 }}>Birth Date</Text>
                                    <Text style={{ fontSize: 15 }}>Aries, Brn on 13-Apr 1995</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', }}>
                                <View style={{ padding: 5, borderRadius: 20, backgroundColor: 'green' }}>
                                    <Image style={{ width: 15, height: 15, tintColor: 'white' }} resizeMode='contain'
                                        source={require('../Imagess/FilterImage.png')} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 15 }}>Marital Status</Text>
                                    <Text style={{ fontSize: 15 }}>Never Married</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', }}>
                                <View style={{ padding: 5, borderRadius: 20, backgroundColor: 'green' }}>
                                    <Image style={{ width: 15, height: 15, tintColor: 'white' }} resizeMode='contain'
                                        source={require('../Imagess/FilterImage.png')} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 15 }}>Lives in</Text>
                                    <Text style={{ fontSize: 15 }}>Lives in Chandrapur, Maharashtra, India</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', }}>
                                <View style={{ padding: 5, borderRadius: 20, backgroundColor: 'green' }}>
                                    <Image style={{ width: 15, height: 15, tintColor: 'white' }} resizeMode='contain'
                                        source={require('../Imagess/FilterImage.png')} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 15 }}>Birth Date</Text>
                                    <Text style={{ fontSize: 15 }}>Aries, Brn on 13-Apr 1995</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', }}>
                                <View style={{ padding: 5, borderRadius: 20, backgroundColor: 'green' }}>
                                    <Image style={{ width: 15, height: 15, tintColor: 'white' }} resizeMode='contain'
                                        source={require('../Imagess/FilterImage.png')} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 15 }}>Religion & Mother Tongue</Text>
                                    <Text style={{ fontSize: 15 }}>Hindu, Marathi</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', }}>
                                <View style={{ padding: 5, borderRadius: 20, backgroundColor: 'green' }}>
                                    <Image style={{ width: 15, height: 15, tintColor: 'white' }} resizeMode='contain'
                                        source={require('../Imagess/FilterImage.png')} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 15 }}>Community</Text>
                                    <Text style={{ fontSize: 15 }}>Teli</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', }}>
                                <View style={{ padding: 5, borderRadius: 20, backgroundColor: 'green' }}>
                                    <Image style={{ width: 15, height: 15, tintColor: 'white' }} resizeMode='contain'
                                        source={require('../Imagess/FilterImage.png')} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 15 }}>Diet Preferences</Text>
                                    <Text style={{ fontSize: 15 }}>Non-Vegetarian</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: 'red', borderRadius: 20 }}>
                            <View style={{ width: '100%', marginTop: 5, borderRadius: 20, backgroundColor: 'white', padding: 15, alignSelf: 'center', borderWidth: 0.5 }}>
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
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 14, fontWeight: '500' }}>Contact No</Text>
                                            <Text style={{ fontSize: 14, fontWeight: '500' }}>+91 9552******</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ padding: 8, borderRadius: 20, backgroundColor: 'red', alignSelf: 'center' }}>
                                            <Image style={{ width: 15, height: 15, tintColor: 'white' }}
                                                source={require('../Imagess/PhoneIcon.png')} />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 14, fontWeight: '500' }}>Email ID</Text>
                                            <Text style={{ fontSize: 14, fontWeight: '500' }}>**********@gmail.com</Text>
                                        </View>
                                    </View>
                                    <View style={{ borderTopWidth: 0.5, marginTop: 15 }}>
                                        <TouchableOpacity style={{ borderWidth: 1, marginTop: 15, marginBottom: 10, width: '40%', height: 40, borderRadius: 20, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 17, fontWeight: '700' }}>View Details</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 15, width: '98%', marginTop: 10, alignSelf: 'center',   borderWidth: 0.5, }}>
                            <Text style={{ fontSize: 18, fontWeight: '700' }}>Family Details</Text>
                            <View style={{ marginTop: 5 }}>
                                <Text style={{ fontSize: 14, width: '85%' }}>My father is currently not employed and my mother is a homemaker. I have 1 Brother (unmarried)</Text>
                            </View>
                        </View>

                        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 15, alignSelf: 'center', width: '98%', marginTop: 10,borderWidth: 0.5, }}>
                            <Text style={{ fontSize: 18, fontWeight: '700' }}>Career & Education</Text>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ padding: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 30, backgroundColor: 'yellow' }}>
                                    <Image style={{ width: 25, height: 25 }}
                                        source={require('../Imagess/Calender.jpeg')} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{}}>Profession</Text>
                                    <Text style={{ fontSize: 15 }}>Travel & Transport Professional - own</Text>
                                    <Text style={{ fontSize: 15 }}>Business/self employed</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ padding: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 30, backgroundColor: 'yellow' }}>
                                    <Image style={{ width: 25, height: 25 }}
                                        source={require('../Imagess/Calender.jpeg')} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{}}>Annual Income</Text>
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
                            <ProfileMatch />
                        </View>
                    </View>

                </ScrollView>

                <View style={{ position: 'absolute', alignSelf: 'center', marginTop: '100%', justifyContent: 'flex-end' }}>
                    <View style={{ alignSelf: 'center', marginTop: '25%', borderWidth: 0.5, padding: 8, borderRadius: 60, width: '80%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white', }}>
                        <TouchableOpacity>
                            <View style={{ borderWidth: 2, padding: 5, borderRadius: 35, alignSelf: 'center', backgroundColor: 'white', borderColor: 'green' }}>
                                <Image style={{ width: 25, height: 25, tintColor: 'green', transform: [{ rotate: '120deg' }] }}
                                    source={require('../Imagess/PhoneIcon.png')} />
                            </View>
                            <Text style={{ fontSize: 15, marginTop: 5 }}>View Contact</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}}>
                            <View style={{ borderWidth: 2, padding: 5, borderRadius: 35, alignSelf: 'center', backgroundColor: 'white', borderColor: 'green' }}>
                                <Image style={{ width: 25, height: 25, tintColor: 'green' }}
                                    source={require('../Imagess/SingleTick.png')} />
                            </View>
                            <Text style={{ fontSize: 15, marginTop: 5 }}>Connect Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {this.state.profilePrivecy ?
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
}

const styles = StyleSheet.create({
    HeaderText: {
        fontSize: 16
    }
});
