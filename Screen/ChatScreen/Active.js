import React, { useState, useCallback, useEffect } from 'react'

import {
View,
SafeAreaView,
Text,
StyleSheet,
FlatList,
Image,
ImageBackground
}
  from "react-native";
  import { TouchableOpacity } from 'react-native-gesture-handler';
  import ColorCode from '../Stylesss/ColorCode'
  import { Auth } from "aws-amplify";
  import updateRequest from "../../AppSync/mutation/updateRequest";
  import { graphql, withApollo } from "react-apollo";
  import compose from "lodash.flowright";
  import utils from "../libs/config/utils"
  import listUser from "../../AppSync/query/ListUser";



const Active = props => {

  let [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8.9, 10]);
  const [AcceptArray, setAcceptArray] = useState([]);
  const [accepted,setAccepted]= useState([]);
  const [id, setId] = useState()
  const [swiper, setSwiper] = useState()
  let [loading, setLoading] = useState(true);
  useEffect(() => {
      setLoading(true)
      Auth.currentAuthenticatedUser()
          .then(async(data) => {
              console.log('user---->::',data.username)
              setId(data.username)
              // let activity = await utils.userActivity(data.username,'ACCEPTED',props)
              // setAccepted(activity)
              getRecieved(data.username);
              let item ={
                chatId:"3c78d75f-d39a-4687-af39-8df587150bf4"
              }
              props.navigation.navigate('MessageScreen',item)
          });
  }, []
  )
  const getRecieved = async (userId) => {
    const { data } = await props.client.query({
        query: listUser,
        fetchPolicy: "network-only",
        variables: {
            id: `${userId}`,
            type:'ACCEPTED'
        },
    });
    if(data && data.listUser && data.listUser.items){
        // props.navigation.navigate('InboxMainTab');
        setAccepted(data.listUser.items)
        setAcceptArray(data.listUser.items)
        setLoading(false)
    }else{
        props.route.params='Accepted'
    }
    console.log('getRecieved====>', data.listUser.items)
}
  return (


    <SafeAreaView style={{ flex: 1 }}>

      <View style={{ marginTop: 20, borderWidth: 0.5, borderColor: "gray", }}>
        <Text style={{ fontSize: 17, fontWeight: '600', padding: 16, }}>Accepted Members</Text>
        <FlatList
          data={accepted}
          renderItem={({ item }) =>
          <TouchableOpacity
          onPress={() => props.navigation.navigate('MessageScreen',item)}>
            <View style={{ marginTop: 10, width: '95%', alignSelf: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5, marginBottom: 10, }}>
                <ImageBackground style={{
                  width: 60, height: 60, overflow: 'hidden',
                  borderRadius: 30, alignItems: 'center', justifyContent: 'flex-end', marginTop: 10, marginBottom: 5
                }}
                source={
                  !item.profilePic ?
                      item.gender == 'Male' || item.gender == 'MALE' ?
                          require('../../Imagess/male.jpg') :
                          require('../../Imagess/female.jpeg') :
                      { uri: item.profilePic }
              } >
                </ImageBackground>
                <View style={{ marginLeft: 15 }}>
                  <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", alignSelf: "center" }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', width: 210 }}>{item.fname}</Text>
                    <Text style={{ fontSize: 13, color: "green" }}>{item.available}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text style={{ fontSize: 13 }}>{item && item.education && item.education.occupation ? item.education.occupation : ''}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text style={{ fontSize: 11 }}>{item.age} yrs,{item && item.location && item.location.city ? item.location.city : ''}</Text>
                  </View>
                </View>

              </View>


            </View>
            </TouchableOpacity>} />
      </View>
    </SafeAreaView>

  );

}

const profile = compose(
  withApollo,
  // graphql(updateRequest, { name: "updateRequest" })
)(Active);
export default profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  item: {
    margin: 10,
    // backgroundColor:"#000",

  },
  itemPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  itemText: {
    color: '#000',
    marginTop: 5,
  },

});