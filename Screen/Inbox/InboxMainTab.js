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
import Accepted from '../Inbox/Accepted'
import Contact from '../Inbox/Contact'
import Request from '../Inbox/Reqest'
import Received from '../Inbox/Received'
import SentItem from '../Inbox/SentItem'
import Deleted from '../Inbox/Deleted'

export default class app extends Component {
    constructor(props) {
        super(props)
        this.state = {
            TopArray: ['Received', 'Accepted', 'Sent Items', 'Contacts', 'Requests', 'Deleted'],
            SelectClass: ''
        }
    }
    SelectItemFun(item) {
        console.log('itemsss', item)
        this.setState({ SelectClass: item })
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ width: '95%', alignSelf: 'center', marginTop: 10 }}>
                    <FlatList horizontal={true}
                        data={this.state.TopArray}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <View>
                                <TouchableOpacity style={{ borderWidth: 0.8, marginBottom: 10, marginRight: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 10, width: 150, height: 35 }}
                                    onPress={() => this.SelectItemFun(item)} >
                                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{item}</Text>
                                </TouchableOpacity>
                            </View>} />

                </View>
                {this.state.SelectClass == 'Accepted' ?
                    <Accepted style={{}} />
                    : null}
                {this.state.SelectClass == 'Contacts' ?
                    <Contact />
                    : null}
                {this.state.SelectClass == 'Requests' ?
                    <Request />
                    : null}
                {this.state.SelectClass == 'Received' ?
                    <Received />
                    : null}
                {this.state.SelectClass == 'Sent Items' ?
                    <SentItem />
                    : null}
                {this.state.SelectClass == 'Deleted' ?
                    <Deleted />
                    : null}
                {/* <SentItem/> */}
            </SafeAreaView>
        )
    }
}