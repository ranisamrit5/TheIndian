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
            LikeMembersData: [1, 2, 3, 4, 5, 6]
        }
    }
    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={{ width: '98%', alignSelf: 'center' }}>
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>Recent Visitors (265)</Text>
                        <Text style={{ marginLeft: 10, fontSize: 13 }}>Members who visited your Profile</Text>
                        <View style={{ borderBottomWidth: 0.5, backgroundColor: 'white', marginBottom: 20 }}>
                            <FlatList horizontal={true}
                            keyExtractor={(item, index) => index.toString()} 
                                showsHorizontalScrollIndicator={false}
                                data={this.state.LikeMembersData}
                                renderItem={({ item }) =>
                                    <View style={{ alignItems: 'center', marginTop: 10, width: 175, justifyContent: 'center', marginLeft: 5, height: 280, borderWidth: 0.5 }}>
                                        <ImageBackground style={{ width: 175, height: 168, justifyContent: 'flex-end' }} resizeMode='center'
                                            source={require('../Imagess/TrishaKrishnan.jpg')}  >
                                            <Text style={{ marginBottom: 10, marginLeft: 20 }}>Mangesh Karotkar</Text>
                                        </ImageBackground>
                                        <View style={{ marginTop: 3 }}>
                                            <Text>27 yrs, 5" 8", Marathi,</Text>
                                            <Text>Teli,</Text>
                                            <Text>Pune, Maharashtra</Text>
                                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', justifyContent: 'center', width: 150, marginBottom: 20, height: 25, borderWidth: 1 }}>
                                                <Image style={{ width: 18, height: 18 }}
                                                    source={require('../Imagess/SingleTick.png')} />
                                                <Text style={{ marginLeft: 5 }}>Connect Now</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>} />
                            <View style={{ marginTop: 10, marginBottom: 10 }}>
                                <TouchableOpacity style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>See All</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'white', marginTop: 5 }}>
                            <Text style={{ marginLeft: 10, fontSize: 16, marginTop: 10 }}>Members You May like (695)</Text>
                            <Text style={{ marginLeft: 10, fontSize: 13 }}>other profiles you might like</Text>
                            <View style={{ borderBottomWidth: 0.5, backgroundColor: 'white', marginBottom: 20 }}>
                                <FlatList horizontal={true}
                                keyExtractor={(item, index) => index.toString()} 
                                    showsHorizontalScrollIndicator={false}
                                    data={this.state.LikeMembersData}
                                    renderItem={({ item }) =>
                                        <View style={{ alignItems: 'center', marginTop: 10, width: 175, justifyContent: 'center', marginLeft: 5, height: 280, borderWidth: 0.5 }}>
                                            <ImageBackground style={{ width: 175, height: 168, justifyContent: 'flex-end' }} resizeMode='center'
                                                source={require('../Imagess/TrishaKrishnan.jpg')}  >
                                                <Text style={{ marginBottom: 10, marginLeft: 20 }}>Mangesh Karotkar</Text>
                                            </ImageBackground>
                                            <View style={{ marginTop: 3 }}>
                                                <Text>27 yrs, 5" 8", Marathi,</Text>
                                                <Text>Teli,</Text>
                                                <Text>Pune, Maharashtra</Text>
                                                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', justifyContent: 'center', width: 150, marginBottom: 20, height: 25, borderWidth: 1 }}>
                                                    <Image style={{ width: 18, height: 18 }}
                                                        source={require('../Imagess/SingleTick.png')} />
                                                    <Text style={{ marginLeft: 5 }}>Connect Now</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>} />
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                    <TouchableOpacity style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 18 }}>See All</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'white', marginTop: 5, marginBottom: 50 }}>
                            <Text style={{ marginLeft: 10, fontSize: 16, marginTop: 10 }}>Members You May like (695)</Text>
                            <Text style={{ marginLeft: 10, fontSize: 13 }}>other profiles you might like</Text>
                            <View style={{ borderBottomWidth: 0.5, backgroundColor: 'white', marginBottom: 20 }}>
                                <FlatList horizontal={true}
                                keyExtractor={(item, index) => index.toString()} 
                                    showsHorizontalScrollIndicator={false}
                                    data={this.state.LikeMembersData}
                                    renderItem={({ item }) =>
                                        <View style={{ alignItems: 'center', marginTop: 10, width: 175, justifyContent: 'center', marginLeft: 5, height: 280, borderWidth: 0.5 }}>
                                            <ImageBackground style={{ width: 175, height: 168, justifyContent: 'flex-end' }} resizeMode='center'
                                                source={require('../Imagess/TrishaKrishnan.jpg')}  >
                                                <Text style={{ marginBottom: 10, marginLeft: 20 }}>Mangesh Karotkar</Text>
                                            </ImageBackground>
                                            <View style={{ marginTop: 3 }}>
                                                <Text>27 yrs, 5" 8", Marathi,</Text>
                                                <Text>Teli,</Text>
                                                <Text>Pune, Maharashtra</Text>
                                                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', justifyContent: 'center', width: 150, marginBottom: 20, height: 25, borderWidth: 1 }}>
                                                    <Image style={{ width: 18, height: 18 }}
                                                        source={require('../Imagess/SingleTick.png')} />
                                                    <Text style={{ marginLeft: 5 }}>Connect Now</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>} />
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                    <TouchableOpacity style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 18 }}>See All</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
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