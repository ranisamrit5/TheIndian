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
    ImageBackground,
    Modal
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableRipple } from 'react-native-paper';
import ColorCode from '../Stylesss/ColorCode'

export default class app extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AcceptArray:[1,2,3,4,5],
            modalVisible: false
        }
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }
    
    render() {
        return (
              <SafeAreaView style={{flex:1}}>
                {/* <ScrollView> */}
                    <View style={{ width: '95%',flex:1, marginTop: 10, alignSelf: 'center' }}>
                       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                       <Text style={{ fontSize: 16 }}>All Invitation (13)</Text>
                       <TouchableOpacity style={{}} onPress={()=> this.setModalVisible(true)} >
                            <Image style={{ width: 25, height: 25 }}
                                source={require('../../Imagess/arrowiconVc.png')} />
                        </TouchableOpacity>
                       </View>
                        <View style={{width:'100%',flex:1,marginBottom:10}}>
                            <FlatList 
                                 data={this.state.AcceptArray}
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
                            <View style={{ flexDirection: 'row',borderRadius:10,borderColor:'green', borderWidth: 1, padding: 10, marginBottom: 20,width:'90%' }}>
                                <Image style={{ width: 15, height: 15 }}
                                    source={require('../../Imagess/chatimage.jpeg')} />
                                <Text style={{fontSize:14,marginLeft:10,fontWeight:'600'}}>Hello We liked your profile for my ....</Text>
                                <TouchableOpacity>
                                    <Text style={{fontSize:14,color:'green',marginLeft:10}}>more ></Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{backgroundColor:'#8fbc8f',alignItems:'center',justifyContent:'center',padding:10,width:'90%',alignSelf:'center',borderRadius:5,}}>
                                <Text style={{alignSelf:'center',textAlign:'center'}}>He viewed your invitation on 08 jan and chose to respnd later</Text>
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
                        <View >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={[styles.centeredView,{width:'90%',alignSelf:'center'}]}>
            <View style={[styles.modalView,{width:'90%',alignSelf:'center'}]}>
            <View style={{backgroundColor:'white'}}>
              <TouchableOpacity style={{marginTop:10}} onPress={()=>this.setState({modalVisible:false})}>
                  <Text style={{fontSize:18,fontWeight:'600'}}>All Invitations</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginTop:10}} onPress={()=>this.setState({modalVisible:false})}>
                  <Text style={{fontSize:18,fontWeight:'600'}}>Viewed by Him</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginTop:10}} onPress={()=>this.setState({modalVisible:false})}>
                  <Text style={{fontSize:18,fontWeight:'600'}}>Not Viewed by Him</Text>
              </TouchableOpacity>
          </View>
            </View>
          </View>
        </Modal>

      </View>
                    </View>
                {/* </ScrollView> */}
             </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
     // alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    
  });
  