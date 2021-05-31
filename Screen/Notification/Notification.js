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
    TouchableOpacity
} from 'react-native';

export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            NotificationArray:[1,2,3,4,5,6,7,8,9,1,2,3,]
        }
    }
    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                 <View style={{flexDirection:'row',width:'100%',alignItems:'center',backgroundColor:'#FF5733',height:50}}>
                        <TouchableOpacity style={{marginLeft:20}} onPress={()=>this.props.navigation.pop()}>
                            <Image style={{width:20,height:20,tintColor:'white',transform: [{ rotate: '180deg'}]}}
                                source={require('../../Imagess/ErrorVector.png')} />
                        </TouchableOpacity>
                       <View style={{width:'80%'}}>
                            <Text style={{alignSelf:'center',fontSize:18,fontWeight:'600',color:'white'}}>Notifications</Text>
                       </View>
                    </View>
                <View style={{flex:1,marginTop:20}}>
                   <FlatList
                        data={this.state.NotificationArray}
                        renderItem={({item})=>
                        <View style={{marginTop:10,width:'90%',alignSelf:'center'}}>
                            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                                <Image style={{width:60,height:60,borderRadius:30}}
                                   source={require('../../Imagess/HeroImage.jpeg')}
                                />
                                <View style={{marginLeft:15}}>
                                    <View style={{flexDirection:'row'}}>
                                         <Text style={{fontSize:16,fontWeight:'600'}}>Snehal V</Text>
                                         <Text style={{fontSize:16,marginLeft:3}}>has viewed your Invitatio</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <Image style={{width:11,height:11}}
                                            source={require('../../Imagess/WhatchIcone.png')} />
                                            <Text style={{fontSize:11}}>19 Apr</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>   } />
                </View>
            </SafeAreaView>
        )
    }
}