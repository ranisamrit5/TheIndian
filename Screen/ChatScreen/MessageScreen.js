import React, { useState, useCallback, useEffect } from 'react'
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { View, SafeAreaView,TouchableOpacity,Image,Text } from "react-native";



const MessageScreen = props => {
    const [messages, setMessages] = useState([]);
   
    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])
   
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])


        return (
            <View style={{ flex: 1,backgroundColor:"#fff"}}>
               <View style={{flexDirection:'row',width:'100%',alignItems:'center',backgroundColor:'#FF5733',height:60}}>
                        <TouchableOpacity style={{marginLeft:20,}} onPress={()=>props.navigation.pop()}>
                            <Image style={{width:20,height:20,tintColor:'white',transform: [{ rotate: '180deg'}]}}
                                source={require('../../Imagess/ErrorVector.png')} />
                               
                        </TouchableOpacity>
                       <View style={{flexDirection:'row',width:'100%',alignItems:'center',alignSelf:"center"}}> 
                       <Image style={{width:40,height:40,borderRadius:30,marginLeft:20}}
                                   source={require('../../Imagess/HeroImage.jpeg')}
                                />
                            <Text style={{fontSize:18,fontWeight:"bold",color:'white',alignItems:'center',marginLeft:10}}>Snehal Sham</Text>

                            {/* <Image style={{width:30,height:30,tintColor:'white',alignItems:'center',transform: [{ rotate: '110deg'}]}}
                                source={require('../../Imagess/PhoneIcon.png')} />
                            <Image style={{width:30,height:30,tintColor:'white',alignItems:'center',}}
                                source={{uri:'https://img.icons8.com/ios/452/video-call.png'}} /> */}
                               
                       </View> 
                      
                </View>
                <View
                    // title={item.name}
                    leftPress={() => props.navigation.pop()} />
                <SafeAreaView style={{ flex: 1 }}>
                <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
                </SafeAreaView>
            </View>
        );
    
}

export default MessageScreen;
