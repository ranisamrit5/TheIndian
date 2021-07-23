import React, { useState,useEffect } from 'react';
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

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { userDataMapper } from './mapper'
// import $ from "jquery";
import GetSuggestion from "../AppSync/query/getSuggestion";
import CreateInterest from "../AppSync/query/createInterest";
import updateRequest from "../AppSync/mutation/updateRequest";
import { withApollo, graphql } from "react-apollo";
import compose from "lodash.flowright";
import { Auth } from "aws-amplify";
let DATA= [1, 2, 3, 4, 5, 6]
let FullImageData= [1, 2, 3]
const MyMatches = (props) => {
    const [ProfileLike, setProfileLike] = useState(false);
    let [data, setData] = useState([]);
    const [id, setId] = useState()
    let [loading, setLoading] = useState(false);
    // constructor(props) {
    //     super(props)
    //     this.state = {
            // DATA: [1, 2, 3, 4, 5, 6],
            // FullImageData: [1, 2, 3],
            // ProfileLike: false   // grey =true & white = false
    //     }
    // }
    useEffect(() => {
        Auth.currentAuthenticatedUser()
        .then((data) => {
          setId(data.username);
          getData(data.username);
        }).catch((err) => {

        })
      }, []);

      const getData = async function (user) {
        // console.log("getData::::::", user);
        try {
          const { data } = await props.client.query({
            query: GetSuggestion,
            fetchPolicy: "network-only",
            variables: {
              id: `${user}`,
            },
          });
          let allSuggestion = []
          if (data && data.getSuggestion && data.getSuggestion.items) {
            const suggest = data.getSuggestion.items;
            // setData(suggest)
            console.log("element==>", suggest);
            let _data;
            suggest.forEach(element => {
              let all = {}
              all.data = element
            //   console.log("element==>", element);
              let myDetails = userDataMapper(all)
              allSuggestion.push(myDetails)
              console.log("myDetails==>", myDetails);
            //   let pic=[]
            //   pic.push(myDetails.profilePic ? myDetails.profilePic : myDetails.gender == 'Male' ? male : female)
            //   if (myDetails.gallery)
            //     pic = [...pic, ...myDetails.gallery]
            //   console.log(pic)
            //   setImage(pic)
    
    
            });
    
            // if (suggest) {
    
            setData(allSuggestion);
            // } else {
            //   console.log("no data found");
            // }
          } else {
            console.log("no data found");
          }
        } catch (error) {
          console.log("ERROR::", error);
        }
    
        setLoading(false);
      };
   const LikeProcess=()=> {
        // this.setState({ ProfileLike: !ProfileLike })
    }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ marginTop: 10, alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.HeaderText}>Matching your Preferences</Text>
                                <TouchableOpacity style={{ marginLeft: 4 }}>
                                    <Text style={{ color: 'red' }}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.HeaderText}>REFINE</Text>
                                <Image style={{ width: 15, height: 15 }}
                                    source={require('../Imagess/FilterImage.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 30, width: '97%', alignSelf: 'center' }}>
                            <FlatList horizontal={true}
                                data={DATA}
                                renderItem={({ item }) =>
                                    <View style={{ width: 120, height: 160, borderRadius: 5, borderWidth: 0.5, marginLeft: 10 }}>
                                        <Text style={{ marginLeft: 5, marginTop: 5 }}>Plus</Text>
                                        <TouchableOpacity style={{ alignItems: 'center' }}>
                                            <Image style={{ width: 60, height: 60, borderRadius: 30 }}
                                                source={require('../Imagess/Natural.jpg')} />
                                            <Text style={{ fontSize: 13, marginTop: 5 }}>Yogita Girhepunje</Text>
                                            <Text style={{ fontSize: 11, marginTop: 5 }}>26 yrs, 5'5", Marathi,</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: 100, marginTop: 5, borderRadius: 10, padding: 2, marginBottom: 5, alignItems: 'center', justifyContent: 'center', borderWidth: 1, flexDirection: 'row', alignSelf: 'center' }}>
                                            <Image style={{ width: 10, height: 10, tintColor: 'black' }}
                                                source={require('../Imagess/SingleTick.png')} />
                                            <Text style={{ fontSize: 12, marginLeft: 5 }}>Connect Now</Text>
                                        </TouchableOpacity>
                                    </View>} />
                            <FlatList style={{ marginBottom: 20, marginBottom: 10, flex: 1 }}
                                data={data}
                                renderItem={({ item }) =>
                                    <View style={{ marginBottom: 10, width: '98%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                        <ImageBackground style={{ width: '100%', alignSelf: 'center', height: 375, borderRadius: 10, overflow: 'hidden' }} resizeMode='cover'
                                            
                                            // {item.profilePic?
                                                source={
                                                    !item.profilePic ?
                                                    item.gender == 'Male' || item.gender == 'MALE' ?
                                                    require('../Imagess/male.jpg'):
                                                    require('../Imagess/female.jpeg'): 
                                                    {uri:item.profilePic}
                                                
                                                } 

                                            // }
                                            
                                            
                                            
                                            >
                                            <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: 'center', padding: 5, borderRadius: 15, flexDirection: 'row', marginTop: 40, marginRight: '8%', backgroundColor: 'grey' }}>
                                                <Image style={{ width: 20, height: 20, marginLeft: 5 }}
                                                    source={require('../Imagess/Camera.png')} />
                                                <Text style={{ marginLeft: 5 }}>7</Text>
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 175 }}>
                                                <Text style={{ fontSize: 18, color: 'white', marginRight: 20 }}>{item.fname}</Text>
                                                <View style={{ width: 10, height: 10, backgroundColor: item.active == 'just now' ? 'green' : 'red' , borderRadius: 5, marginRight: 10 }}></View>
                                                <Text style={{ fontSize: 16, color: 'white' }}>{item.active == 'just now' ? 'Active' : item.active  }</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: 'white' }}>{item.age} yrs, {item.height}  .</Text>
                                                <Text style={{ color: 'white' }}>Non IT Engineer</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center' }}>{item.motherTongue} {`,${item.caste}`}  .</Text>
                                                <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center' }}>{item.city}, {item.state}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'center' }}>
                                                <TouchableOpacity onPress={() => LikeProcess()}>
                                                    <Text style={{ fontSize: 17, color: ProfileLike == true ? 'green' : 'white' }}>Like this Profile?</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ marginLeft: 20, alignItems: 'center', justifyContent: 'center' }}>
                                                    <View style={{ width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                                                        <Image style={{ width: 25, height: 25, tintColor: 'green', transform: [{ rotate: '120deg' }] }}
                                                            source={require('../Imagess/PhoneIcon.png')} />
                                                    </View>
                                                    <Text style={{ color: 'white', marginTop: 5 }}>View Contact</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ marginLeft: 20, alignItems: 'center', justifyContent: 'center' }}>
                                                    <View style={{ width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green' }}>
                                                        <Image style={{ width: 25, height: 25, tintColor: 'white' }}
                                                            source={require('../Imagess/SingleTick.png')} />
                                                    </View>
                                                    <Text style={{ color: 'white', marginTop: 5 }}>Contact Now</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </ImageBackground>
                                    </View>} />
                        </View>
                        <View>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    
}

const profile = compose(
    withApollo,
    graphql(updateRequest, { name: "updateRequest" })
  )(MyMatches);
  export default profile;
// export default MyMatches;
const styles = StyleSheet.create({
    HeaderText: {
        fontSize: 16
    }
});

