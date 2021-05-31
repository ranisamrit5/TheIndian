/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
            DATA: [1, 2, 3, 4, 5, 6],
            FullImageData: [1, 2, 3],
            ProfileLike: false   // grey =true & white = false
        }
    }
    LikeProcess() {
        this.setState({ ProfileLike: !this.state.ProfileLike })
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ marginTop: 10, alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.HeaderText}>Matching your Preferences</Text>
                                <TouchableOpacity style={{ marginLeft: 4 }}>
                                    <Text style={{ color: 'red' }}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.HeaderText}>REFINE</Text>
                                <Image style={{ width: 15, height: 15 }}
                                    source={require('../Imagess/FilterImage.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 30, width: '97%', alignSelf: 'center' }}>
                            <FlatList horizontal={true}
                                data={this.state.DATA}
                                renderItem={({ item }) =>
                                    <View style={{ width: 120, height: 160, borderRadius: 5, borderWidth: 0.5, marginLeft: 10 }}>
                                        <Text style={{ marginLeft: 5, marginTop: 5 }}>Plus</Text>
                                        <TouchableOpacity style={{ alignItems: 'center' }}>
                                            <Image style={{ width: 60, height: 60, borderRadius: 30 }}
                                                source={require('../Imagess/Natural.jpg')} />
                                            <Text style={{ fontSize: 13, marginTop: 5 }}>Yogita Girhepunje</Text>
                                            <Text style={{ fontSize: 11, marginTop: 5 }}>26 yrs, 5'5", Marathi,</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: 100, marginTop: 5, borderRadius: 10, padding: 2, marginBottom: 5, alignItems: 'center', justifyContent: 'center', borderWidth: 1, flexDirection: 'row', alignSelf: 'center' }}>
                                            <Image style={{ width: 10, height: 10, tintColor: 'black' }}
                                                source={require('../Imagess/SingleTick.png')} />
                                            <Text style={{ fontSize: 12, marginLeft: 5 }}>Connect Now</Text>
                                        </TouchableOpacity>
                                    </View>} />
                            <FlatList style={{ marginBottom: 20, marginBottom: 10, flex: 1 }}
                                data={this.state.FullImageData}
                                renderItem={({ item }) =>
                                    <View style={{ marginBottom: 10, width: '98%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                        <ImageBackground style={{ width: '100%', alignSelf: 'center', height: 375, borderRadius: 10, overflow: 'hidden' }} resizeMode='cover'
                                            source={require('../Imagess/AllImage.jpg')}  >
                                            <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: 'center', padding: 5, borderRadius: 15, flexDirection: 'row', marginTop: 40, marginRight: '8%', backgroundColor: 'grey' }}>
                                                <Image style={{ width: 20, height: 20, marginLeft: 5 }}
                                                    source={require('../Imagess/Camera.png')} />
                                                <Text style={{ marginLeft: 5 }}>7</Text>
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 175 }}>
                                                <Text style={{ fontSize: 18, color: 'white', marginRight: 20 }}>Xyz Name</Text>
                                                <View style={{ width: 10, height: 10, backgroundColor: 'green', borderRadius: 5, marginRight: 10 }}></View>
                                                <Text style={{ fontSize: 16, color: 'white' }}>Online</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: 'white' }}>27 yrs, 5' 8"   .</Text>
                                                <Text style={{ color: 'white' }}>Non IT Engineer</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center' }}>Marathi, Teli  .</Text>
                                                <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center' }}>Ratnagiri, Maharashtra</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'center' }}>
                                                <TouchableOpacity onPress={() => this.LikeProcess()}>
                                                    <Text style={{ fontSize: 17, color: this.state.ProfileLike == true ? 'green' : 'white' }}>Like this Profile?</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ marginLeft: 20, alignItems: 'center', justifyContent: 'center' }}>
                                                    <View style={{ width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                                                        <Image style={{ width: 25, height: 25, tintColor: 'green', transform: [{ rotate: '120deg' }] }}
                                                            source={require('../Imagess/PhoneIcon.png')} />
                                                    </View>
                                                    <Text style={{ color: 'white', marginTop: 5 }}>View Contact</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ marginLeft: 20, alignItems: 'center', justifyContent: 'center' }}>
                                                    <View style={{ width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green' }}>
                                                        <Image style={{ width: 25, height: 25, tintColor: 'white' }}
                                                            source={require('../Imagess/SingleTick.png')} />
                                                    </View>
                                                    <Text style={{ color: 'white', marginTop: 5 }}>Contact Now</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </ImageBackground>
                                    </View>} />
                        </View>
                        <View>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    HeaderText: {
        fontSize: 16
    }
});

