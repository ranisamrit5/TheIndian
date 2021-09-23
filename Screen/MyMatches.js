import React, { useState, useEffect } from 'react';
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
import ImageViewer from 'react-native-image-zoom-viewer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { userDataMapper } from './Mappers/mapper'
// import $ from "jquery";
import Loader from '../Screen/Componentone/Loader';
import GetSuggestion from "../AppSync/query/getSuggestion";
import CreateInterest from "../AppSync/query/createInterest";
import updateRequest from "../AppSync/mutation/updateRequest";
import { withApollo, graphql } from "react-apollo";
import compose from "lodash.flowright";
import { Auth } from "aws-amplify";
import Gallery from '../Screen/Gallery'
let DATA = [1, 2, 3, 4, 5, 6]
const images = [
    {
        url:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png',
    },
    {
        url:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
    },
];
const MyMatches = (props) => {
    // console.log('MyMatches==>',props)
    const [ProfileLike, setProfileLike] = useState(false);
    const [data, setData] = useState([]);
    const [id, setId] = useState()
    const [loading, setLoading] = useState(false);
    const [enable, setEnable] = useState(false);
    useEffect(() => {
        setLoading(true)
        Auth.currentAuthenticatedUser()
            .then((data) => {
                setId(data.username);
                getData(data.username);
                setLoading(false)
                setEnable(false)
            }).catch((err) => {

            })
    }, []);

    const getData = async function (user) {
        console.log("getData::::::", user);
        try {
            const { data } = await props.client.query({
                query: GetSuggestion,
                fetchPolicy: "network-only",
                variables: {
                    id: `${user}`,
                },
            });
            //   console.log("element==>", data);
            let allSuggestion = []
            if (data && data.getSuggestion && data.getSuggestion.items) {
                const suggest = data.getSuggestion.items;
                let _data;
                suggest.forEach(element => {
                    let all = {}
                    all.data = element
                    console.log("element==>", element.gallery);
                    let myDetails = userDataMapper(all)
                    allSuggestion.push(myDetails)
                });
            setData(suggest);
            } else {
                console.log("no data found");
            }
        } catch (error) {
            console.log("ERROR::", error);
        }

        setLoading(false);
    };

    const openGallery = () => {
        console.log('Clicked')
        return (

            <Gallery />

        )

    }
    const createinterest = async (item, interest_, index) => {
        try {
            await props.client
                .query({
                    query: CreateInterest,
                    fetchPolicy: "network-only",
                    variables: {
                        userId: `${id}`,
                        partnerId: `${item.id}`,
                        interest: interest_,
                    },
                })
                .then((res) => {
                    //   console.log("Response::", res);
                    let interest = {
                        tablename: `${id}`,
                        id: `${item.id}`,
                        status: 'REQUESTED'
                    }
                    let i = [...data]
                    //   console.log('i[index]', i[index])
                    i[index].interest = interest

                    setData(i);
                });
        } catch (error) {
            console.log("ERROR::", error);
        }


    };

    const LikeProcess = () => {
        // this.setState({ ProfileLike: !ProfileLike })
    }
    const profileNavigation = (allData, index) => {
        let inputData = {
            data: allData,
            index: index
        }
        // console.log(item.id)
        props.navigation.navigate('MatchProfile', inputData);
        // this.setState({ ProfileLike: !ProfileLike })
    }
    // console.log(enable)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader loading={loading} />
            {enable == false ?
                <ScrollView >
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
                                <Image style={{ width: 15, height: 15, marginRight: 10 }}
                                    source={require('../Imagess/FilterImage.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 30, width: '100%' }}>
                            <FlatList horizontal={true}
                                data={DATA}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) =>
                                    <View style={{ width: 120, height: 160, borderRadius: 5, borderWidth: 1, marginLeft: 10, borderColor: "#0000001A" }}>
                                        <Text style={{ marginLeft: 5, marginTop: 5 }}>Plus</Text>
                                        <TouchableOpacity style={{ alignItems: 'center' }}>
                                            <Image style={{ width: 60, height: 60, borderRadius: 30 }}
                                                source={require('../Imagess/Natural.jpg')} />
                                            <Text style={{ fontSize: 13, marginTop: 5 }}>Yogita Girhepunje</Text>
                                            <Text style={{ fontSize: 11, marginTop: 5 }}>26 yrs, 5'5", Marathi,</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ width: 100, marginTop: 5, borderRadius: 10, padding: 2, marginBottom: 5, alignItems: 'center', justifyContent: 'center', borderWidth: 1, flexDirection: 'row', alignSelf: 'center' }}>
                                            <Image style={{ width: 10, height: 10, tintColor: 'black' }}
                                                source={require('../Imagess/SingleTick.png')} />
                                            <Text style={{ fontSize: 12, marginLeft: 5 }}>Connect Now</Text>
                                        </TouchableOpacity>
                                    </View>} />
                            <FlatList style={{ marginBottom: 20, marginBottom: 10, flex: 1, width: '100%' }}
                                data={data}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) =>
                                    <View style={{ marginBottom: 10, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => profileNavigation(data, index)}
                                            style={{ alignItems: 'center', padding: 5, borderRadius: 15, flexDirection: 'row', marginTop: 40, marginRight: '8%', backgroundColor: 'transparent' }}>
                                            <ImageBackground style={{ borderRadius: 10, overflow: 'hidden' }} resizeMode='cover'
                                                // {item.profilePic?
                                                source={
                                                    !item.profilePic ?
                                                        item.gender == 'Male' || item.gender == 'MALE' ?
                                                            require('../Imagess/male.jpg') :
                                                            require('../Imagess/female.jpeg') :
                                                        { uri: item.profilePic }
                                                }
                                            >

                                                <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: 'center', padding: 5, borderRadius: 15, flexDirection: 'row', marginTop: 40, marginRight: '8%', backgroundColor: 'grey' }}
                                                    onPress={() => setEnable(true)}
                                                >
                                                    <Image style={{ width: 20, height: 20, marginLeft: 5 }}
                                                        source={require('../Imagess/Camera.png')} />
                                                    <Text style={{ marginLeft: 5 }}>7</Text>
                                                </TouchableOpacity>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 175 }}>
                                                    <Text style={{ fontSize: 18, color: 'white', marginRight: 20 }}>{item.fname}</Text>
                                                    <View style={{ width: 10, height: 10, backgroundColor: item.active == 'just now' ? 'green' : 'red', borderRadius: 5, marginRight: 10 }}></View>
                                                    <Text style={{ fontSize: 16, color: 'white' }}>{item.active == 'just now' ? 'Active' : item.active}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ color: 'white' }}>{item.age} yrs, {item.height}</Text>
                                                    <Text style={{ color: 'white' }}>{item.occupation}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center' }}>{item.motherTongue} {`,${item.caste}`}  .</Text>
                                                    <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center' }}>{item.city}, {item.state}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'center' }}>

                                                    {item.partnerConnectStatus == null ?
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <TouchableOpacity onPress={() => LikeProcess()}>
                                                                <Text style={{ fontSize: 17, color: ProfileLike == true ? 'green' : 'white' }}>Like this Profile?</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => createinterest(item, true, index)}
                                                                style={{ marginLeft: 20, alignItems: 'center', justifyContent: 'center' }}>
                                                                <View style={{ width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                                                                    <Image style={{ width: 25, height: 25, tintColor: 'green', transform: [{ rotate: '120deg' }] }}
                                                                        source={require('../Imagess/PhoneIcon.png')} />
                                                                </View>
                                                                <Text style={{ color: 'white', marginTop: 5 }}>Connect Now</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        :
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View style={{ padding: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
                                                                <TouchableOpacity style={{ alignItems: 'center' }}>
                                                                    <Image style={{ width: 40, height: 40 }}
                                                                        source={require('../Imagess/chatimage.jpeg')} />
                                                                    <Text>Shaadi Chat</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={{ alignItems: 'center' }}>
                                                                    <Image style={{ width: 40, height: 40 }}
                                                                        source={require('../Imagess/Whatsapp.jpeg')} />
                                                                    <Text>WhatsApp</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={{ alignItems: 'center' }}>
                                                                    <Image style={{ width: 40, height: 40 }}
                                                                        source={require('../Imagess/call.png')} />
                                                                    <Text>Call</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>

                                                    }

                                                </View>

                                            </ImageBackground>
                                        </TouchableOpacity>
                                    </View>} />
                        </View>
                        <View>

                        </View>
                    </View>
                </ScrollView>
                :
                <View style={styles.container}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: 'center', padding: 5, borderRadius: 15, flexDirection: 'row', marginTop: 40, marginRight: '8%', backgroundColor: 'transparent' }}
                        onPress={() => setEnable(false)}
                    >
                        <Image style={{ width: 20, height: 20, marginLeft: 5 }}
                            source={require('../Imagess/close.png')} />
                    </TouchableOpacity>
                    <ImageViewer
                        imageUrls={images}
                        renderIndicator={() => null}
                    />
                </View>
            }
        </SafeAreaView>
    )

}

const profile = compose(
    withApollo,
    graphql(updateRequest, { name: "updateRequest" })
)(MyMatches);
export default profile;
const styles = StyleSheet.create({
    HeaderText: {
        fontSize: 15,
        marginLeft: 10, marginRight: 10
    }, 
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
    }
});

