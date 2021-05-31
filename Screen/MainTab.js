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
    TouchableOpacity
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MyMatches from './MyMatches'
import MorMatches from './MorMatches'
import TodaysMaches from './TodaysMaches'
import SearchOption from './SearchOption'
import ProfileIDSearch from './ProfileIdSearch';
import ProfileMatch from './TodayMatchsExtra/ProfileMatch'

export default class app extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataShow: [],
            Search: false,
            New: false,
            TodaysMatches: false,
            MyMatches: false,
            NearMe: false,
            MoreMatches: false,
            RecentlyViewed: false,
            SerchBar: false,
            SearchOpt: false,
            ProfileIDSearch: false
        }
    }



    TopTabFunction(Value) {
        console.log('valuess', Value)
        switch (Value.title) {
            case 'Search': {
                this.setState({ TodaysMatches: false })
                this.setState({ MoreMatches: false })
                this.setState({ MyMatches: false })
                this.setState({ SerchBar: true })
                break;
            }
            case 'New': {
                break;
            }
            case 'Todays Matches': {
                this.setState({ MoreMatches: false })
                this.setState({ MyMatches: false })
                this.setState({ SerchBar: false })
                this.setState({ TodaysMatches: true })
                break;
            }
            case 'My Matches': {
                this.setState({ TodaysMatches: false })
                this.setState({ MoreMatches: false })
                this.setState({ SerchBar: false })
                this.setState({ MyMatches: true })
                break;
            }
            case 'Near Me': {
                break;
            }
            case 'More Matches': {
                this.setState({ TodaysMatches: false })
                this.setState({ MyMatches: false })
                this.setState({ SerchBar: false })
                this.setState({ MoreMatches: true })
                break;
            }
            case 'Recently Viewed': {
                break;
            }
        }
    }
    SelectSearchOption(value) {
        console.log('values get', value)
        switch (value) {
            case 'SearchOp': {
                this.setState({ ProfileIDSearch: false })
                this.setState({ SearchOpt: true })
                break;
            }
            case 'ProfileId': {
                this.setState({ SearchOpt: false })
                this.setState({ ProfileIDSearch: true })
                break;
            }
        }
    }
    render() {
        if (this.state.SerchBar == false) {
            //this.setState({ SearchOpt: false })
            //this.setState({ ProfileIDSearch: false })
            this.state.SearchOpt = false
            this.state.ProfileIDSearch = false
        }
        const TabData = [
            {
                Ima: require('../Imagess/SearchIcon.jpg'),
                title: 'Search',
            },
            {
                id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                title: 'New',
                notification: ''
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                title: 'Todays Matches',
                notification: ''
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                title: 'My Matches',
                notification: ''
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                title: 'Near Me',
                notification: ''
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                title: 'More Matches',
                notification: ''
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                title: 'Shortlisted',
                notification: ''
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                title: 'Recently Viewed',
                notification: ''
            },
        ]
        return (
            <SafeAreaView>
                <View style={{ marginTop: 10, height: '100%' }}>
                    <View>
                        <FlatList style={{ marginBottom: 10 }} horizontal={true}
                            data={TabData}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) =>
                                <TouchableOpacity style={{ borderWidth: 1, alignItems: 'center', justifyContent: 'center', width: 150, height: 40, marginLeft: 5, marginRight: 10, borderRadius: 5 }}
                                    onPress={() => this.TopTabFunction(item)} >
                                    {item.Ima == null ?
                                        <Text style={{ fontSize: 17, alignSelf: 'center' }}>{item.title}</Text> : null}
                                    {item.title == 'Search' ?
                                        <Image style={{ width: 25, height: 25 }}
                                            source={item.Ima} /> : null}
                                </TouchableOpacity>
                            } />
                    </View>
                    {this.state.SerchBar ?
                        <View style={{ flexDirection: 'row', marginBottom: 20, width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                            <TouchableOpacity style={{ width: '49%', padding: 10, borderBottomWidth: 1, borderColor: this.state.SearchOpt ? 'red' : 'black', alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => this.SelectSearchOption('SearchOp')} >
                                <Text style={{ fontSize: 14, fontWeight: '700', color: this.state.SearchOpt ? 'red' : 'black' }}>Search Options</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '49%', padding: 10, borderBottomWidth: 1, borderColor: this.state.ProfileIDSearch ? 'red' : 'black', alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => this.SelectSearchOption('ProfileId')} >
                                <Text style={{ fontSize: 14, fontWeight: '700', color: this.state.ProfileIDSearch ? 'red' : 'black' }}>Profile ID Search</Text>
                            </TouchableOpacity>
                        </View> : null}

                    {this.state.MyMatches ? <MyMatches /> : null}
                    {this.state.MoreMatches ? <MorMatches /> : null}
                    {this.state.TodaysMatches ? <TodaysMaches /> : null}
                    {/* <TodaysMaches /> */}
                    {this.state.SearchOpt ? <SearchOption /> : null}
                    {this.state.SearchOpt ? <ProfileIDSearch /> : null}
                    {/* <ProfileMatch/> */}
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({

});

