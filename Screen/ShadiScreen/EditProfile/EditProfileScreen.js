import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    SafeAreaView,
    Switch,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EditProfileScreen = (props) => {
    const [text, setText] = useState('dcdsdsvdvdgvkjjnvdndvjnjvjnjknmvkvmdkvmdvkmvkdmvkdmckvmvkmvkdvmkvmkmkmv')
    const [height, setHeight] = useState(100)

    console.log('PROPS::', props)
    // const { bio, job_title, company, university, sex } = state;

    return (

        <ScrollView>

          

            <SafeAreaView style={styles.mainBody}>

            <View style={{flexDirection:'row',width:'100%',alignItems:'center',backgroundColor:'#FF5733',height:50}}>
                        <TouchableOpacity style={{marginLeft:20}} onPress={()=>props.navigation.pop()}>
                            <Image style={{width:20,height:20,tintColor:'white',transform: [{ rotate: '180deg'}]}}
                                source={require('../../../Imagess/ErrorVector.png')} />
                        </TouchableOpacity>
                       <View style={{width:'80%'}}>
                            <Text style={{alignSelf:'center',fontSize:18,fontWeight:"bold",color:'white'}}>My Profile</Text>
                       </View>
                </View>

                <View style={{ width: '95%', height: 220, alignItems: 'center',backgroundColor:'#fff',marginTop:10,alignSelf:"center" }} 
                                source={require('../../../Imagess/AllImage.jpg')}   >
                                <View style={{  }}>
                                    <ImageBackground style={{ width: 100, height: 150, overflow: 'hidden',alignItems:'center',marginTop:10 }}
                                        source={require('../../../Imagess/AllImage.jpg')} >
                                      
                                    </ImageBackground>
                                    
                                </View>
                                <View style={{ marginTop:10 }}>
                                    <Text style={{fontSize:14,fontWeight:"bold",color:'#000',alignSelf:"center"}}>Rani S (SH69951946)</Text>
                                    <View style={{ marginTop:5 }}>
                                        <Text style={{fontSize:14,fontWeight:'500',color:'#000',alignSelf:"center"}}>Last Online:ToDay</Text>
                                      
                                    </View>
                                </View>
                            </View>

                <View style={{
                    justifyContent: "space-between",
                    flexDirection: "row", padding: 13,
                }}>
                    <Text style={{
                        color: "#cc2b5e", fontSize: 16,
                        fontWeight: "bold", alignSelf: "center"
                    }}>Basic Info</Text>


                    <TouchableOpacity onPress={() => props.navigation.navigate('BasicInfoScreen')}>
                    <MaterialCommunityIcons name="pencil-outline" color="black" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "column", padding: 10, }}>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Posted by</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold",
                        }}>: Sibling</Text>


                        <View style={{ height: 10, }}></View>

                    </View>

                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Age</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 10
                        }}>: 25</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Marital Status</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 20
                        }}>: Never Married</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Height</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 55
                        }}>: 6'0"(182cm)</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Any Disability?</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 44
                        }}>: None</Text>

                        <View style={{ height: 5 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Body Weight</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 30
                        }}>: Not Specified</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Health Information</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 10
                        }}>: Not Specified</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                </View>
                <View style={{
                    justifyContent: "space-between",
                    flexDirection: "row", padding: 13,
                }}>
                    <Text style={{
                        color: "#cc2b5e", fontSize: 16,
                        fontWeight: "bold", alignSelf: "center"
                    }}>More about Myself,Partner and Family</Text>


                    <TouchableOpacity onPress={() => alert('Log out')}>
                    <MaterialCommunityIcons name="pencil-outline" color="black" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "column", padding: 10, }}>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <TextInput
                            {...props}
                            multiline={true}
                            onChangeText={(text) => {
                                setText(text)
                            }}
                            onContentSizeChange={(event) => {
                                setHeight(event.nativeEvent.contentSize.height)
                            }}
                            style={[styles.default, { height: Math.max(35, height) }]}
                            value={text}
                        />

                    </View>
                </View>
                <View style={{
                    justifyContent: "space-between",
                    flexDirection: "row", padding: 13,
                }}>
                    <Text style={{
                        color: "#cc2b5e", fontSize: 16,
                        fontWeight: "bold", alignSelf: "center"
                    }}>Religious Background</Text>


                    <TouchableOpacity onPress={() => props.navigation.navigate('ReligiousScreen')}>
                    <MaterialCommunityIcons name="pencil-outline" color="black" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "column", padding: 10, }}>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Religion</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold",
                        }}>: Hindu</Text>


                        <View style={{ height: 10, }}></View>

                    </View>

                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Mother Tongue</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 30
                        }}>: Marathi</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Community</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 28
                        }}>: Teli</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Sub Community</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 10
                        }}>: Not Specified</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Cast No Bar</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 35,
                        }}>: Not Specified</Text>

                        <View style={{ height: 5 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Gothra/Gothram</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", flexDirection: "row",
                        }}>: Not Specified</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Health Information</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 10, flexDirection: "row",
                        }}>: Not Specified</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                </View>
                <View style={{
                    justifyContent: "space-between",
                    flexDirection: "row", padding: 13,
                }}>
                    <Text style={{
                        color: "#cc2b5e", fontSize: 16,
                        fontWeight: "bold", alignSelf: "center"
                    }}>Family</Text>


                    <TouchableOpacity onPress={() => props.navigation.navigate('FamilyScreen')}>
                    <MaterialCommunityIcons name="pencil-outline" color="black" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "column", padding: 10, }}>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Father's Status</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold",
                        }}>: Enter Now</Text>


                        <View style={{ height: 10, }}></View>

                    </View>

                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Mother's Status</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 10
                        }}>: Enter Now</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Native Place</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 30
                        }}>: Not Specified</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>No. of Brothers</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 70
                        }}>: 0</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>No. fo Sisters</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 60
                        }}>: 0</Text>

                        <View style={{ height: 5 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Family Values</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", flexDirection: "row", marginLeft: 20
                        }}>: Not Specified</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Family Affluence</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 20, flexDirection: "row",
                        }}>: Enter Now</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                </View>
                <View style={{
                    justifyContent: "space-between",
                    flexDirection: "row", padding: 13,
                }}>
                    <Text style={{
                        color: "#cc2b5e", fontSize: 16,
                        fontWeight: "bold", alignSelf: "center"
                    }}>Astro Details</Text>


                 <TouchableOpacity onPress={() => props.navigation.navigate('Astro')}>
                 <MaterialCommunityIcons name="pencil-outline" color="black" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "column", padding: 10, }}>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,


                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Manglik/Chevvai dosham</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 30
                        }}>: Dont'Know</Text>


                        <View style={{ height: 10, }}></View>

                    </View>

                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold",
                        }}>Nakshatra</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 90
                        }}>: Not Specified</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Rashi/Moon Sign</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 40
                        }}>: Not Specified</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                </View>
                <View style={{
                    justifyContent: "space-between",
                    flexDirection: "row", padding: 13,
                }}>
                    <Text style={{
                        color: "#cc2b5e", fontSize: 16,
                        fontWeight: "bold", alignSelf: "center"
                    }}>Location,Education & Career</Text>


             <TouchableOpacity onPress={() => props.navigation.navigate('Location')}>
                    <MaterialCommunityIcons name="pencil-outline" color="black" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "column", padding: 10, }}>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Country Living in</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 40
                        }}>: India</Text>


                        <View style={{ height: 10, }}></View>

                    </View>

                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>State Living in</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 30
                        }}>: Maharashtra</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>City Living in</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 10
                        }}>: Nagpur</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Residency Status</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 30
                        }}>: Citizen</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Zip/Pin code</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 45
                        }}>: Not Specified</Text>

                        <View style={{ height: 5 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Grew Up in</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", flexDirection: "row", marginLeft: 5
                        }}>: India</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Highest Qualification</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 100, flexDirection: "row",
                        }}>: </Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>College(s) Attended</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 1, flexDirection: "row",
                        }}>: College Name</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Working With</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 60, flexDirection: "row",
                        }}>: Private company</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Working As</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 95, flexDirection: "row",
                        }}>: Software Developer/Programmer</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Annual Income</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 70, flexDirection: "row",
                        }}>: INR 2 Lakh to 4 Lakh</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Employer Name</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 65, flexDirection: "row",
                        }}>: Rect Native Developer</Text>

                        <View style={{ height: 10 }}></View>
                    </View>
                </View>


                <View style={{
                    justifyContent: "space-between",
                    flexDirection: "row", padding: 13,
                }}>
                    <Text style={{
                        color: "#cc2b5e", fontSize: 16,
                        fontWeight: "bold", alignSelf: "center"
                    }}>Lifestyle</Text>


                    <TouchableOpacity onPress={() => alert('Log out')}>
                    <MaterialCommunityIcons name="pencil-outline" color="black" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "column", padding: 10, }}>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Diet</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 50
                        }}>: Veg</Text>


                        <View style={{ height: 10, }}></View>

                    </View>
                </View>
                <View style={{
                    justifyContent: "space-between",
                    flexDirection: "row", padding: 13,
                }}>
                    <Text style={{
                        color: "#cc2b5e", fontSize: 16,
                        fontWeight: "bold", alignSelf: "center"
                    }}>Partner Basic Info</Text>


                    <TouchableOpacity onPress={() => alert('Log out')}>
                    <MaterialCommunityIcons name="pencil-outline" color="black" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "column", padding: 10, }}>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Age</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 70
                        }}>: 20 to 25</Text>


                        <View style={{ height: 10, }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Height</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 120
                        }}>: 5'3"(160cm) to 6'0"</Text>


                        <View style={{ height: 10, }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Marital Status</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 40
                        }}>: Naver Married</Text>


                        <View style={{ height: 10, }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Religion/Community</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 30
                        }}>: Hindu:Teli</Text>


                        <View style={{ height: 10, }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Mother Tongue</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold",
                        }}>: Marathi</Text>


                        <View style={{ height: 10, }}></View>

                    </View>
                </View>
                <View style={{
                    justifyContent: "space-between",
                    flexDirection: "row", padding: 13,
                }}>
                    <Text style={{
                        color: "#cc2b5e", fontSize: 16,
                        fontWeight: "bold", alignSelf: "center"
                    }}>Partner Location Details</Text>


                    <TouchableOpacity onPress={() => alert('Log out')}>
                    <MaterialCommunityIcons name="pencil-outline" color="black" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "column", padding: 10, }}>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Country living in</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold",
                        }}>: India</Text>


                        <View style={{ height: 10, }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>State living in</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 15
                        }}>: </Text>


                        <View style={{ height: 10, }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>City/District</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold",
                        }}>: </Text>


                        <View style={{ height: 10, }}></View>

                    </View>

                </View>
                <View style={{
                    justifyContent: "space-between",
                    flexDirection: "row", padding: 13,
                }}>
                    <Text style={{
                        color: "#cc2b5e", fontSize: 16,
                        fontWeight: "bold", alignSelf: "center"
                    }}>Partner,Education & Career</Text>


                    <TouchableOpacity onPress={() => alert('Log out')}>
                    <MaterialCommunityIcons name="pencil-outline" color="black" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "column", padding: 10, }}>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Country Living in</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 40
                        }}>: India</Text>


                        <View style={{ height: 10, }}></View>

                    </View>

                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>State Living in</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 30
                        }}>: Maharashtra</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>City Living in</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 10
                        }}>: Nagpur</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Residency Status</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 30
                        }}>: Citizen</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Zip/Pin code</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 45
                        }}>: Not Specified</Text>

                        <View style={{ height: 5 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Grew Up in</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", flexDirection: "row", marginLeft: 5
                        }}>: India</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Highest Qualification</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 100, flexDirection: "row",
                        }}>: </Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>College(s) Attended</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 1, flexDirection: "row",
                        }}>: College Name</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Working With</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 60, flexDirection: "row",
                        }}>: Private company</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Working As</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 95, flexDirection: "row",
                        }}>: Software Developer/Programmer</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Annual Income</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 70, flexDirection: "row",
                        }}>: INR 2 Lakh to 4 Lakh</Text>

                        <View style={{ height: 10 }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,
                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Employer Name</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 65, flexDirection: "row",
                        }}>: Rect Native Developer</Text>

                        <View style={{ height: 10 }}></View>
                    </View>
                </View>
                <View style={{
                    justifyContent: "space-between",
                    flexDirection: "row", padding: 13,
                }}>
                    <Text style={{
                        color: "#cc2b5e", fontSize: 16,
                        fontWeight: "bold", alignSelf: "center"
                    }}>Partner Other Details</Text>


                    <TouchableOpacity onPress={() => alert('Log out')}>
                    <MaterialCommunityIcons name="pencil-outline" color="black" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "column", padding: 10, }}>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Profile created by</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginRight: 60
                        }}>: </Text>


                        <View style={{ height: 10, }}></View>

                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            backgroundColor: '#ffffff',
                            padding: 16,

                        }}>
                        <Text style={{
                            color: "gray", fontSize: 15,
                            fontWeight: "bold"
                        }}>Diet</Text>
                        <Text style={{
                            color: "#454F63", fontSize: 15,
                            fontWeight: "bold", marginLeft: 30
                        }}>: </Text>


                        <View style={{ height: 10, }}></View>

                    </View>

                </View>

            </SafeAreaView>
        </ScrollView >

    );
}


export default EditProfileScreen;

export const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        backgroundColor: "#ECECEC"

    },


});