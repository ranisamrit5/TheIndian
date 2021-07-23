import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity,SafeAreaView,Image,TouchableWithoutFeedback} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import { Images } from '../Screen/utils/them÷÷e';
import CheckBox from '@react-native-community/checkbox';
const MaritalStatus = (props) => {
    const [toggleCheckBox, setToggleCheckBox] = React.useState(false)
  
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', backgroundColor: '#FF5733', height: 50 }}>
                <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => props.navigation.pop()}>
                    <Image style={{ width: 20, height: 20, tintColor: 'white', transform: [{ rotate: '180deg' }] }}
                        source={require('../Imagess/ErrorVector.png')} />
                </TouchableOpacity>
                <View style={{ width: '80%' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: "bold", color: 'white' }}>Marital Status</Text>
                </View>
            </View>

                <View style={{backgroundColor:"lightgray",height:100}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:"#EFEFEF",marginLeft:16,marginRight:16,marginTop:16,marginBottom:8,borderRadius:30,padding:10,width:"35%"}}>
                        <Text style={{fontSize:13,fontWeight:"900",color:"gray",textAlign:"center"}}>Naver Married</Text>
                          <TouchableOpacity>
                        <View style={{backgroundColor:"gray",borderRadius:30,width:20,height:20}}>
                        <Image style={{ width: 10, height: 10, tintColor: 'white',alignSelf:"center",marginTop:5, }}
                        source={require('../Imagess/close.png')} />
                        </View>
                      </TouchableOpacity>
                    </View>
                 <View style={{flexDirection:"row",justifyContent:"flex-end",marginLeft:16,marginRight:16,bottom:24}}>
                        <TouchableOpacity>
                      <View style={{backgroundColor:"gray",borderRadius:30,width:20,height:20}}>
                        <Image style={{ width: 10, height: 10, tintColor: 'white',alignSelf:"center",marginTop:5, }}
                        source={require('../Imagess/close.png')} />
                        </View>
                         </TouchableOpacity>
                   </View>
                   
               </View>
               <View style={styles.rowView}>
                          <CheckBox
                          style={styles.checkImage}
                        disabled={false}
                         value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}/>
                                <Text style={{fontSize:15,textAlign:"center"}}>Open to all</Text>
                                    </View>
                                    <View style={styles.rowView}>
                                    <CheckBox
                          style={styles.checkImage}
                        disabled={false}
                         value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}/>
                                <Text style={{fontSize:15,textAlign:"center",marginTop:2}}>Naver Married</Text>
                                    </View>
                                    <View style={styles.rowView}>
                                    <CheckBox
                          style={styles.checkImage}
                        disabled={false}
                         value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}/>
                                <Text style={{fontSize:15,textAlign:"center",marginTop:2}}>Divorce</Text>
                                    </View>
                                    <View style={styles.rowView}>
                                    <CheckBox
                          style={styles.checkImage}
                        disabled={false}
                         value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}/>
                                <Text style={{fontSize:15,textAlign:"center",marginTop:2}}>Widowed</Text>
                                    </View> 
                                    <View style={styles.rowView}>
                                    <CheckBox
                          style={styles.checkImage}
                        disabled={false}
                         value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}/>
                                <Text style={{fontSize:15,textAlign:"center",marginTop:2}}>Awaiting Divorce</Text>
                                    </View>
                                    <View style={styles.rowView}>
                                    <CheckBox
                          style={styles.checkImage}
                        disabled={false}
                         value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}/>
                                <Text style={{fontSize:15,textAlign:"center",marginTop:2}}>Annulled</Text>
                                    </View>
                                    <View style={{  flexDirection:'row',marginTop: 200,}}>
                            <TouchableOpacity
                                style={styles.SubmitButtonStyleA}
                                activeOpacity={.10}
                            //   onPress={() =>

                            // this.props.navigation.navigate('Customerlogin')
                            // navigation.navigate('Customerlogin')}
                            >
                         <Text style={styles.TextStyle1}>Cancel</Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.SubmitButtonStyleB}
                                activeOpacity={.10}
                            //   onPress={() =>

                            // this.props.navigation.navigate('Customerlogin')
                            // navigation.navigate('Customerlogin')} 
                            >
                                <Text style={styles.TextStyle1}>Apply</Text>

                            </TouchableOpacity>
                        </View>
                       
              </ScrollView>
             
        </SafeAreaView>
        );
    }


export default MaritalStatus;
const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
    
      
    },
    SubmitButtonStyleA: {
        flex:1,
        marginLeft: 24,
        marginRight: 12,
        height: 45,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#62A1DA",
        borderWidth:1,
        borderColor:"#62A1DA"
       
       
    },
    SubmitButtonStyleB: {
        flex:1,
        marginRight: 24,
        marginLeft: 12,
        height: 45,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#62A1DA",
        borderWidth:1,
        borderColor:"#62A1DA"
       
       
    },



    TextStyle1: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: "900",
        fontSize: 14,
        padding: 10,
    },
    rowView: {
        flexDirection: "row",
        marginTop:16
      },
      checkImage: {
       marginLeft: 20,
        alignSelf:"center",
        
      },

    
  });