import React, { useState,useEffect } from 'react';
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
import { Auth } from "aws-amplify";
import AsyncStorage from '@react-native-community/async-storage';
const ProfileMatch = (props) => { 
    const [partnerData,setPartnerData]=useState(props.route.params)
    const [userData,setUserData]=useState([])
    // console.log('ProfileMatch',props.route.params)
    useEffect(() => {
        // setLoading(true)
        Auth.currentAuthenticatedUser()
            .then(async(data) => {
                let uData = await AsyncStorage.getItem(data.username)
                // console.log('uData===>',data.username,uData)
                uData=JSON.parse(uData)
                if(uData){
                    // JSON.parse(result);
                    setUserData(uData)
                }
            
        }).catch((err) => {

        })
}, []);
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/* <ScrollView> */}
                    <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 15, width: '98%', alignSelf: 'center', borderWidth: 1,borderColor:"#0000001A",marginBottom:20 }}>
                        <ImageBackground style={{  justifyContent: 'center', height: 200, alignItems: 'center',}}
                            source={require('../../Imagess/StarBkImage.jpg')} >
                                <Text style={{color:'white',fontSize:18,marginBottom:10}}>{
                                        partnerData.gender == 'Male' || partnerData.gender == 'MALE' ? 'You & Him' :
                                         'You & Her'
                                        }</Text>
                            <View style={{flexDirection: 'row',}}>
                            <Image style={{ width: 100, height: 100,borderRadius:100 }}
                                 source={
                                    !userData.profilePic ?
                                    userData.gender == 'Male' || userData.gender == 'MALE' ?
                                            require('../../Imagess/male.jpg') 
                                            :
                                            require('../../Imagess/female.jpeg') :
                                        { uri: userData.profilePic }
                                }/>
                            <Image style={{ width: 100, height: 100,borderRadius:100 }}
                                source={
                                    !partnerData.profilePic ?
                                    partnerData.gender == 'Male' || partnerData.gender == 'MALE' ?
                                            require('../../Imagess/male.jpg') :
                                            require('../../Imagess/female.jpeg') :
                                        { uri: partnerData.profilePic } }/>
                            <View style={{backgroundColor:'white',position:'absolute',marginLeft:85,alignSelf:'center',justifyContent:'center',alignItems:'center',width:30,height:30,borderRadius:20}}>
                                <Image style={{ width: 25, height: 25 }}
                                    source={require('../../Imagess/DoubleArrow.png')} />
                            </View>
                            </View>
                        </ImageBackground>
                        <View style={{marginTop:10,backgroundColor: 'white',}}>
                            <Text style={{fontSize:18,fontWeight:'600'}}>You Match 7/9 of his Preferences</Text>
                            <View style={styles.ButtonView}>
                            <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:20}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Marital Status</Text>
                                    <Text style={styles.TextView}>Never Married</Text>
                               </View>
                                <View style={{padding:5,marginBottom:5,borderWidth:0.5,borderRadius:20,borderColor:"#AEB6BF"}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                            <View style={styles.ButtonView}>
                            <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Religion / Community</Text>
                                    <Text style={styles.TextView}>Hindu: Teli</Text>
                               </View>
                               <View style={{padding:5,marginBottom:5,borderWidth:0.5,borderRadius:20,borderColor:"#AEB6BF"}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                            <View style={styles.ButtonView}>
                            <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Mother Tongue</Text>
                                    <Text style={styles.TextView}>Marathi</Text>
                               </View>
                               <View style={{padding:5,marginBottom:5,borderWidth:0.5,borderRadius:20,borderColor:"#AEB6BF"}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                            <View style={styles.ButtonView}>
                            <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Country Living in</Text>
                                    <Text style={styles.TextView}>India</Text>
                               </View>
                               <View style={{padding:5,marginBottom:5,borderWidth:0.5,borderRadius:20,borderColor:"#AEB6BF"}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                            <View style={styles.ButtonView}>
                            <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>State Living in</Text>
                                    <Text style={styles.TextView}>Maharashtra</Text>
                               </View>
                               <View style={{padding:5,marginBottom:5,borderWidth:0.5,borderRadius:20,borderColor:"#AEB6BF"}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                            <View style={styles.ButtonView}>
                            <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>City Living in</Text>
                                    <Text style={styles.TextView}>Bhandara, Nagpur</Text>
                               </View>
                               <View style={{padding:5,marginBottom:5,borderWidth:0.5,borderRadius:20,borderColor:"#AEB6BF"}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                            <View style={styles.ButtonView}>
                            <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Diet</Text>
                                    <Text style={styles.TextView}>Include profiles who are Eggetarian, Veg</Text>
                               </View>
                               <View style={{padding:5,marginBottom:5,borderWidth:0.5,borderRadius:20,borderColor:"#AEB6BF"}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                            <View style={styles.ButtonView}>
                            <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Age</Text>
                                    <Text style={styles.TextView}>18 to 22</Text>
                               </View>
                               <View style={{padding:5,marginBottom:5,borderWidth:0.5,borderRadius:20,borderColor:"#AEB6BF"}}>
                                    <Image style={{width:20,height:20}}
                                        source={require('../../Imagess/SingleTick.png')} />
                                </View>
                            </View>
                            <View style={styles.ButtonView}>
                            <View style={{ marginLeft: 10,marginBottom:10 ,marginTop:10}}>
                                    <Text style={{ fontSize: 13,color: '#AAB7B8',}}>Height</Text>
                                    <Text style={styles.TextView}>5' 0"(152cm) to 5' 6"(167cm)</Text>
                               </View>
                               <View style={{padding:5,marginBottom:5,borderWidth:0.5,borderRadius:20,borderColor:"#AEB6BF"}}>
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

const styles = StyleSheet.create({
    ButtonView: {
        borderBottomWidth:0.5,
        borderColor:"#ABB2B9",
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
         },
    TextView:{
        fontSize:16
    }
});
export default ProfileMatch;