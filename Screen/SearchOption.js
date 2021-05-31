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
                    <View style={{ width: '90%',flex:1, alignSelf: 'center' }}>
                        <View >
                            <Text style={{ fontSize: 16 }}>Age</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 14, fontWeight: '500' }}>Min {this.state.MinValue} Year</Text>
                                <Text style={{ fontSize: 14, fontWeight: '500' }}>Max {this.state.MaxmimuValue} Year</Text>
                            </View>
                        </View>
                        <MultiSlider style={{ width: '100%' }}
                            selectedStyle={{ backgroundColor: 'red' }}
                            values={[
                                this.state.MinValue,
                                this.state.MaxmimuValue,
                            ]}
                            onValuesChange={this.multiSliderValuesChange}
                            min={18}
                            max={55}
                            step={1}
                        />
                        <View >
                            <Text style={{ fontSize: 16 }}>Height</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 14, fontWeight: '500' }}>Min {this.state.Hieght.MinimumHieght}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '500' }}>Max {this.state.Hieght.maximumHieght}</Text>
                            </View>
                        </View>
                        <MultiSlider style={{ width: '100%' }}
                            selectedStyle={{ backgroundColor: 'red' }}
                            values={[
                                this.state.Hieght.MinimumHieght,
                                this.state.Hieght.maximumHieght,
                            ]}
                            onValuesChange={this.HieghtValueChange}
                            min={4.5}
                            max={10.0}
                            step={1}
                        />
                        <View style={styles.ViewContener}>
                            <Text style={{fontSize:14,fontWeight:'400'}}>Marital Status</Text>
                            <TouchableOpacity style={{ flexDirection: 'row',alignItems:'center',marginTop:5, Hieght: 60,justifyContent:'space-between' }}>
                                <Text style={{fontSize:16}}>Never Married</Text>
                                <Image style={{  width: 25, height: 25, tintColor: 'black',transform: [{ rotate: '260deg'}] }}
                                    source={require('../Imagess/arrowiconVc.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ViewContener}>
                            <Text style={{fontSize:14,fontWeight:'400'}}>Religion</Text>
                            <TouchableOpacity style={{ flexDirection: 'row',alignItems:'center',marginTop:5, Hieght: 60,justifyContent:'space-between' }}>
                                <Text style={{fontSize:16}}>Hindu</Text>
                                <Image style={{  width: 25, height: 25, tintColor: 'black',transform: [{ rotate: '260deg'}] }}
                                    source={require('../Imagess/arrowiconVc.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ViewContener}>
                            <Text style={{fontSize:14,fontWeight:'400'}}>Community</Text>
                            <TouchableOpacity style={{ flexDirection: 'row',alignItems:'center',marginTop:5, Hieght: 60,justifyContent:'space-between' }}>
                                <Text style={{fontSize:16}}>Teli</Text>
                                <Image style={{  width: 25, height: 25, tintColor: 'black',transform: [{ rotate: '260deg'}] }}
                                    source={require('../Imagess/arrowiconVc.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ViewContener}>
                            <Text style={{fontSize:14,fontWeight:'400'}}>Mother Tongue</Text>
                            <TouchableOpacity style={{ flexDirection: 'row',alignItems:'center',marginTop:5, Hieght: 60,justifyContent:'space-between' }}>
                                <Text style={{fontSize:16}}>Marathi</Text>
                                <Image style={{  width: 25, height: 25, tintColor: 'black',transform: [{ rotate: '260deg'}] }}
                                    source={require('../Imagess/arrowiconVc.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ViewContener}>
                            <Text style={{fontSize:14,fontWeight:'400'}}>Manglik / Chevvai Dosham</Text>
                            <TouchableOpacity style={{ flexDirection: 'row',alignItems:'center',marginTop:5, Hieght: 60,justifyContent:'space-between' }}>
                                <Text style={{fontSize:16}}>Doesn't Matter</Text>
                                <Image style={{  width: 25, height: 25, tintColor: 'black',transform: [{ rotate: '260deg'}] }}
                                    source={require('../Imagess/arrowiconVc.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ViewContener}>
                            <Text style={{fontSize:14,fontWeight:'400'}}>Country living in</Text>
                            <TouchableOpacity style={{ flexDirection: 'row',alignItems:'center',marginTop:5, Hieght: 60,justifyContent:'space-between' }}>
                                <Text style={{fontSize:16}}>India</Text>
                                <Image style={{  width: 25, height: 25, tintColor: 'black',transform: [{ rotate: '260deg'}] }}
                                    source={require('../Imagess/arrowiconVc.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ViewContener}>
                            <Text style={{fontSize:14,fontWeight:'400'}}>State living in</Text>
                            <TouchableOpacity style={{ flexDirection: 'row',alignItems:'center',marginTop:5, Hieght: 60,justifyContent:'space-between' }}>
                                <Text style={{fontSize:16}}>Maharashtra</Text>
                                <Image style={{  width: 25, height: 25, tintColor: 'black',transform: [{ rotate: '260deg'}] }}
                                    source={require('../Imagess/arrowiconVc.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ViewContener}>
                            <Text style={{fontSize:14,fontWeight:'400'}}>City / District</Text>
                            <TouchableOpacity style={{ flexDirection: 'row',alignItems:'center',marginTop:5, Hieght: 60,justifyContent:'space-between' }}>
                                <Text style={{fontSize:16}}>Doesn't Matter</Text>
                                <Image style={{  width: 25, height: 25, tintColor: 'black',transform: [{ rotate: '260deg'}] }}
                                    source={require('../Imagess/arrowiconVc.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.ViewContener,{marginBottom:20}]}>
                            <Text style={{fontSize:14,fontWeight:'400'}}>Country Grew up in</Text>
                            <TouchableOpacity style={{ flexDirection: 'row',alignItems:'center',marginTop:5, Hieght: 60,justifyContent:'space-between' }}>
                                <Text style={{fontSize:16}}>Doesn't Matter</Text>
                                <Image style={{  width: 25, height: 25, tintColor: 'black',transform: [{ rotate: '260deg'}] }}
                                    source={require('../Imagess/arrowiconVc.png')} />
                            </TouchableOpacity>
                        </View>
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
    ViewContener:{
        padding:5,
        borderBottomWidth:1,
        marginTop:5,
    }
});