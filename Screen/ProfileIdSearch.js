import React, { Component, useState } from 'react';
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
//import MultiSlider from '@ptomasroos/react-native-multi-slider'
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Dataa from './SearchOptionData/Storage'
//import RangeSlider from 'rn-range-slider';
//import RangeSlider from 'react-native-range-slider'
export default class app extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            //multiSliderValue:[],
            MinValue: 18,
            MaxmimuValue: 25,
            Hieght: {
                MinimumHieght: 4.5,
                maximumHieght: 5
            }
        }
    }
    componentDidMount() {
        console.log("Recive data", Dataa.SearchData)
    }
    multiSliderValuesChange = values => {
        console.log('values', values)
        this.setState({ MinValue: values[0] })
        this.setState({ MaxmimuValue: values[1] })
    };
    HieghtValueChange = values => {
        console.log('hieght value', values)
        this.state.Hieght.MinimumHieght = values[0]
        this.state.Hieght.maximumHieght = values[1]
        this.setState({ Hieght: this.state.Hieght })
    }
    render() {
        return (
            <SafeAreaView >
                <ScrollView>
                    <View style={{ width: '90%', flex: 1, alignSelf: 'center' }}>
                       
                    </View>

                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: 'red'
    // },
    // columnView: {
    //     flexDirection: 'column',
    //     padding: 15,
    //     marginTop: 15,
    //     borderRadius: 5,
    //     backgroundColor: 'white',
    //     // ...shadow(5)
    // },
    HeaderText: {
        fontSize: 16
    },
    ViewContener: {
        padding: 5,
        borderBottomWidth: 1,
        marginTop: 5,
    }
});