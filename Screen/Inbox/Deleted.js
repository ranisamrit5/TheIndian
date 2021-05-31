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
import ColorCode from '../Stylesss/ColorCode'

export default class app extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AcceptArray: [1, 2, 3, 4, 5]
        }
    }
    render() {
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
                            data={this.state.AcceptArray}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) =>
                                <View style={{ width: '100%', borderRadius: 10, borderWidth: 1, alignItems: 'center', marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <View style={{ marginLeft: '25%', alignItems: 'center' }}>
                                            <TouchableOpacity >
                                                <Image style={{ width: 150, height: 150, borderRadius: 75, borderWidth: 0.5 }}
                                                    source={require('../../Imagess/TrishaKrishnan.jpg')} />
                                            </TouchableOpacity>
                                            <Text style={{ alignItems: 'center', marginTop: 10, justifyContent: 'center', fontSize: 18 }}>Sonaxi Shinha</Text>
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
                                        <TouchableOpacity style={{ alignItems: 'center', }}>
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
}