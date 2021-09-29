import React, { useState, useCallback, useEffect } from 'react'
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { View, SafeAreaView, TouchableOpacity, Image, Text } from "react-native";
import { graphql, withApollo } from "react-apollo";
import compose from "lodash.flowright";
import { Auth } from "aws-amplify";
import listMessage from "../../AppSync/query/listMessage";
import createMessage from "../../AppSync/mutation/createMessage/createMessage";
const MessageScreen = props => {
    const [messages, setMessages] = useState([]);
    const [id, setId] = useState()
    const [loading, setLoading] = useState(false);
    const [nextToken, setNextToken] = useState('');
    const [partnerData, setPartnerData] = useState(props.route.params);
    useEffect(() => {
        // setLoading(true)
        Auth.currentAuthenticatedUser()
            .then(async (data) => {
                console.log('MessageScreenUser---->::', data.username)
                setId(data.username)
                // let activity = utils.userActivity(data.username,'RECIEVED',props)
                // setRecieved(activity)
                await getMessageList(data.username);
            });
        setLoading(false)
    }, []
    )


    const onSend = useCallback(async (messages = [], myId) => {
         sendMyMessage(messages, myId)
         setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const sendMyMessage = async (messages, myId) => {
        console.log('sending message', partnerData.chatId, myId)
        if (myId == undefined) {
            return 'UserId Empty'
        }
        for (let items of messages) {
            const savedData = await props.sendMessage({
                variables: {
                    input: {
                        "chatId": partnerData.chatId,
                        "id": "Matrimony",
                        "userId": myId,
                        "message": items.text
                    }
                }
            })

            console.log(savedData)
        }
    }

    const setMessageArray = (userId, messagesArray) => {
        let messages = []
        setId(userId)
        for (let i of messagesArray) {
            messages.push({
                _id: i.id,
                createdAt: i.created_at + 19800000 ,
                text: i.message,
                user: {
                    _id: i.userId === userId ? 1 : 2
                }
            })
            console.log(i.message,i.created_at)
        }
        return messages;
    }

    const getMessageList = async (userId) => {
        const { data } = await props.client.query({
            query: listMessage,
            fetchPolicy: "network-only",
            variables: {
                chatId: `${partnerData.chatId}`,
                nextToken: nextToken
            },
        });
        if (data?.listChat?.items) {
            let mess = setMessageArray(userId, data.listChat.items)
            //    console.log('data',mess)
            setMessages(mess)
            // props.navigation.navigate('InboxMainTab');
            // setRecieved(data.listUser.items)
            // setAcceptArray(data.listUser.items)
            // setLoading(false)
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', backgroundColor: '#FF5733', height: 60, marginTop: 50 }}>
                <TouchableOpacity style={{ marginLeft: 20, }} onPress={() => props.navigation.pop()}>
                    <Image style={{ width: 20, height: 20, tintColor: 'white', transform: [{ rotate: '180deg' }] }}
                        source={require('../../Imagess/ErrorVector.png')} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', alignSelf: "center" }}>
                    <Image style={{ width: 40, height: 40, borderRadius: 30, marginLeft: 20 }}
                        source={
                            !partnerData.profilePic ?
                                partnerData.gender == 'Male' || partnerData.gender == 'MALE' ?
                                    require('../../Imagess/male.jpg') :
                                    require('../../Imagess/female.jpeg') :
                                { uri: partnerData.profilePic }
                        }
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: 'white', alignItems: 'center', marginLeft: 10 }}>{partnerData.fname}</Text>

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
                    onSend={messages => onSend(messages, id)}
                    user={{
                        _id: 1,
                    }}
                />
            </SafeAreaView>
        </View>
    );

}
const profile = compose(
    withApollo,
    graphql(createMessage, { name: "sendMessage" })
)(MessageScreen);
export default profile;
