import React, { useState } from 'react';
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

const Accepted = (props) => {
    // props.route.params=''
    const [AcceptArray, setAcceptArray] = useState([1,2,3,4,5]);

        return (
              <SafeAreaView style={{flex:1}}>
                {/* <ScrollView> */}
                    <View style={{ width: '95%',flex:1, marginTop: 10, alignSelf: 'center' }}>
                        <Text style={{ fontSize: 16 }}>Accepted Invitation (13)</Text>
                        <View style={{width:'100%',flex:1,marginBottom:10}}>
                            <FlatList 
                                 data={AcceptArray}
                                 showsVerticalScrollIndicator={false}
                                 renderItem={({item})=>
                                 <View style={{ width: '100%',borderRadius:10, borderWidth: 1, alignItems: 'center', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <View style={{ marginLeft: '25%', alignItems: 'center' }}>
                                    <TouchableOpacity >
                                        <Image style={{ width: 150, height: 150, borderRadius: 75, borderWidth: 0.5 }}
                                            source={require('../../Imagess/TrishaKrishnan.jpg')} />
                                    </TouchableOpacity>
                                    <Text style={{ alignItems: 'center', marginTop: 10, justifyContent: 'center', fontSize: 18 }}>Sonaxi Shinha</Text>
                                </View>
                                <View style={{ marginBottom: 70, marginLeft: '15%' }}>
                                    <Text>21 Jan</Text>
                                    <TouchableOpacity style={{ borderWidth: 1, padding: 8, borderRadius: 30, marginTop: 15 }}>
                                        <Image style={{ width: 25, height: 25 }}
                                            source={require('../../Imagess/arrowiconVc.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={{ width: '50%', fontSize: 16, marginTop: 10, marginBottom: 20 }} >28yrs, 5'11",Marathi, Teli Pune, India, B.E / B.Tech Sr. Manager / Manager</Text>
                            <View style={{ flexDirection: 'row',borderRadius:10,borderColor:'green', borderWidth: 1, padding: 10, marginBottom: 20 }}>
                                <Image style={{ width: 15, height: 15 }}
                                    source={require('../../Imagess/chatimage.jpeg')} />
                                <Text style={{fontSize:14,marginLeft:10}}>Hi, is nice connecting with you. ....</Text>
                                <TouchableOpacity>
                                    <Text style={{fontSize:14,color:'green',marginLeft:10}}>more </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{padding:10,alignItems:'center',flexDirection:'row',justifyContent:'space-around',width:'90%'}}>
                                <TouchableOpacity style={{alignItems:'center'}}>
                                    <Image style={{width:40,height:40}}
                                        source={require('../../Imagess/chatimage.jpeg')} />
                                    <Text>Shaadi Chat</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{alignItems:'center'}}>
                                    <Image style={{width:40,height:40}}
                                        source={require('../../Imagess/Whatsapp.jpeg')} />
                                    <Text>WhatsApp</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{alignItems:'center'}}>
                                    <Image style={{width:40,height:40}}
                                        source={require('../../Imagess/call.png')} />
                                    <Text>Call</Text>
                                </TouchableOpacity>
                            </View>
                        </View>   }
                            />
                        </View>
                    </View>
                {/* </ScrollView> */}
             </SafeAreaView>
        )
    }
    export default Accepted;