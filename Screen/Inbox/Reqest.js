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

export default class app extends Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return(
            <SafeAreaView>
                <ScrollView>
                    <View>
                        <Text style={{fontSize:25,fontWeight:'800'}}>Request Classs.........</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}