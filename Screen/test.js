import React, { useState, useCallback, useEffect } from 'react'
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { View, SafeAreaView, TouchableOpacity, Image, Text } from "react-native";
import { graphql, withApollo } from "react-apollo";
import compose from "lodash.flowright";
import { Auth } from "aws-amplify";
import listMessage from "../../AppSync/query/listMessage";

const MessageScreen = props => {
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState('');
  const [partnerData, setPartnerData] = useState(props.route.params);
  useEffect(() => {
    console.log('partnerData', partnerData)
    setMessages([
      {
        _id: "3aad0df6-27f0-41bf-87ecdf-8966786377ff",
        text: 'Hiii',
        createdAt: "2021-09-26T17:13:29.971Z",
        user: {
          _id: 2,
          name: 'TS',
          avatar: 'https://placeimg.com/140/140/any',
        },

      },
      {
        _id: "3aad0df6-27f0-41bf-87ec-8966786377ff",
        createdAt: "2021-09-26T17:13:29.971Z",
        text: "Dsfsfsfs",
        user: { _id: 1 }
      },
      { "_id": "231390ec-74aa-4c18-a90e-ca2b3315d88a", "createdAt": "2021-09-26T17:15:47.126Z", "text": "Hfhgh", "user": { "_id": 1 } }
    ])
  }, [])
  useEffect(() => {
    // setLoading(true)
    Auth.currentAuthenticatedUser()
      .then(async (data) => {
        console.log('MessageScreen---->::', data.username)
        setId(data.username)
        // let activity = utils.userActivity(data.username,'RECIEVED',props)
        // setRecieved(activity)
        await getMessageList(data.username);
      });
    setLoading(false)
  }, []
  )
  const onSend = useCallback((messages = []) => {
    console.log('messages', messages)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const getMessageList = async (userId) => {
    const { data } = await props.client.query({
      query: listMessage,
      fetchPolicy: "network-only",
      variables: {
        chatId: `${partnerData.chatId}`,
        nextToken: nextToken
      },
    });
    if (data && data.listChat && data.listChat.items) {
      console.log('MessageScreen---->::', data.listChat.items)
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
          onSend={messages => onSend(messages)}
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
  // graphql(updateUser, { name: "updateUser" })
)(MessageScreen);
export default profile;
