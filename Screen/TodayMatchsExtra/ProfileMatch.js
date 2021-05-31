import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
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

export default class app extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/* <ScrollView> */}
                    <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 15, width: '98%', alignSelf: 'center', borderWidth: 0.5,marginBottom:20 }}>
                        <ImageBackground style={{  justifyContent: 'center', height: 200, alignItems: 'center' }}
                            source={require('../../Imagess/StarBkImage.jpg')} >
                                <Text style={{color:'white',fontSize:18,marginBottom:10}}>You and Him</Text>
                            <View style={{flexDirection: 'row',}}>
                            <Image style={{ width: 100, height: 100,borderRadius:50 }}
                                source={require('../../Imagess/ActresImage.jpg')} />
                            
                            <Image style={{ width: 100, height: 100,borderRadius:50 }}
                                source={require('../../Imagess/HeroImage.jpeg')} />
                            <View style={{backgroundColor:'white',position:'absolute',marginLeft:85,alignSelf:'center',justifyContent:'center',alignItems:'center',width:30,height:30,borderRadius:20}}>
                                <Image style={{ width: 25, height: 25 }}
                                    source={require('../../Imagess/DoubleArrow.png')} />
                            </View>
                            </View>
                        </ImageBackground>
                        <View style={{marginTop:10,backgroundColor: 'white',}}>
                            <Text style={{fontSize:18,fontWeight:'600'}}>You Match 7/9 of his Preferences</Text>
                            <View style={styles.ButtonView}>
                               <View>
                                    <Text>Marital Status</Text>
                                    <Text style={styles.TextView}>Never Married</Text>
                               </View>
                                <View style={{padding:5,marginBottom:5,borderWidth:1,borderRadius:20}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                            <View style={styles.ButtonView}>
                               <View>
                                    <Text>Religion / Community</Text>
                                    <Text style={styles.TextView}>Hindu: Teli</Text>
                               </View>
                                <View style={{padding:5,marginBottom:5,borderWidth:1,borderRadius:20}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                            <View style={styles.ButtonView}>
                               <View>
                                    <Text>Mother Tongue</Text>
                                    <Text style={styles.TextView}>Marathi</Text>
                               </View>
                                <View style={{padding:5,marginBottom:5,borderWidth:1,borderRadius:20}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                            <View style={styles.ButtonView}>
                               <View>
                                    <Text>Country Living in</Text>
                                    <Text style={styles.TextView}>India</Text>
                               </View>
                                <View style={{padding:5,marginBottom:5,borderWidth:1,borderRadius:20}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                            <View style={styles.ButtonView}>
                               <View>
                                    <Text>State Living in</Text>
                                    <Text style={styles.TextView}>Maharashtra</Text>
                               </View>
                                <View style={{padding:5,marginBottom:5,borderWidth:1,borderRadius:20}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                            <View style={styles.ButtonView}>
                               <View>
                                    <Text>City Living in</Text>
                                    <Text style={styles.TextView}>Bhandara, Nagpur</Text>
                               </View>
                                <View style={{padding:5,marginBottom:5,borderWidth:1,borderRadius:20}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                            <View style={styles.ButtonView}>
                               <View>
                                    <Text>Diet</Text>
                                    <Text style={styles.TextView}>Include profiles who are Eggetarian, Veg</Text>
                               </View>
                                <View style={{padding:5,marginBottom:5,borderWidth:1,borderRadius:20}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                            <View style={styles.ButtonView}>
                               <View>
                                    <Text>Age</Text>
                                    <Text style={styles.TextView}>18 to 22</Text>
                               </View>
                                <View style={{padding:5,marginBottom:5,borderWidth:1,borderRadius:20}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                            <View style={styles.ButtonView}>
                               <View>
                                    <Text>Height</Text>
                                    <Text style={styles.TextView}>5' 0"(152cm) to 5' 6"(167cm)</Text>
                               </View>
                                <View style={{padding:5,marginBottom:5,borderWidth:1,borderRadius:20}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                        </View>
                    </View>
                {/* </ScrollView> */}
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    ButtonView: {
        borderBottomWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10
    },
    TextView:{
        fontSize:16
    }
});
