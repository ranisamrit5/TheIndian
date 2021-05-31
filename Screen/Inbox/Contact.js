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

export default class app extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ContatectArray: [1, 2, 3, 4,5,6,7,8,9],
            Primium: true,
            ContatctNot: false
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-between', borderWidth: 1, height: 35, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 15, height: 15, marginLeft: 10 }}
                            source={require('../../Imagess/Astrology.png')} />
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>Contacts Viewed by you</Text>
                    </View>
                    <View style={{ flexDirection: 'row', height: 35, alignItems: 'center', borderWidth: 0.5, padding: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>12</Text>
                        <Text style={{ fontSize: 16 }}> of </Text>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>150</Text>
                    </View>
                </View>
                <View style={{marginTop:10,marginBottom:10}}>
                    <FlatList
                        data={this.state.ContatectArray}
                        renderItem={({ item }) =>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderWidth: 1, padding: 10, marginBottom: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 60, height: 60, borderRadius: 25 }}
                                        source={require('../../Imagess/avtar.png')} />
                                    <View style={{ marginLeft: 10 }}>
                                        <View style={{ flexDirection: 'row', }}>
                                            <Text style={{ fontSize: 18, fontWeight: '500' }}>Amol Chakole</Text>
                                            {this.state.Primium ?
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 5 }}>
                                                    <Image style={{ width: 20, height: 20 }}
                                                        source={require('../../Imagess/crown.jpeg')} />
                                                    <Text style={{ fontSize: 18, fontWeight: '600', color: 'red' }}>+</Text>
                                                </View>
                                                : null}
                                        </View>
                                        <Text style={{ fontSize: 14 }}>Profile crreated by Self</Text>
                                        {this.state.ContatctNot == false ?
                                            <View style={{ padding: 5, backgroundColor: '#c0c0c0', paddingLeft: 10, paddingRight: 35, marginTop: 5 }}>
                                                <Text>Contact Not Available</Text>
                                                <Text>As he has declined your invitation</Text>
                                            </View>
                                            : null}
                                        {this.state.ContatctNot ?
                                            <View style={{ marginTop: 5 }}>
                                                <TouchableOpacity style={{ flexDirection: 'row',alignItems:'center' }}>
                                                    <Image style={{ width: 20, height: 20, transform: [{ rotate: '120deg' }],tintColor:'blue' }}
                                                        source={require('../../Imagess/PhoneIcon.png')} />
                                                    <Text style={{ fontSize: 16, fontWeight: '600',color:'blue' }}>+91-9890701799</Text>
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
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>23 Dec 20</Text>
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
}