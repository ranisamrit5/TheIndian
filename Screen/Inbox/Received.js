import React, { useState ,useEffect } from 'react';
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
    Button
} from 'react-native';
import { Auth } from "aws-amplify";
import { graphql, withApollo } from "react-apollo";
import compose from "lodash.flowright";
import Getdata from "../../AppSync/query/Auth/getData";
import updateRequest from "../../AppSync/mutation/updateRequest";
import listUser from "../../AppSync/query/ListUser";
import Loader from '../../Screen/Componentone/Loader';
import Swiper from 'react-native-deck-swiper'
import Accepted from '../Inbox/Accepted'
import utils from "../libs/config/utils"
import { TouchableOpacity } from 'react-native-gesture-handler';
const images = []
const Recieved = (props,{ navigation }) => {
    // console.log('Recieved PROPS:',navigation,props)
    const [id, setId] = useState()
    const [swiper, setSwiper] = useState()
    let [loading, setLoading] = useState(false);
    const [recieved_,setRecieved]= useState([]);

    useEffect(() => {
        setLoading(true)
        Auth.currentAuthenticatedUser()
            .then((data) => {
                console.log('Recieved---->::',data.username)
                setId(data.username)
                getRecieved(data.username);
            });
            setLoading(false)
    }, []
    )

    const getRecieved = async (userId) => {
        const { data } = await props.client.query({
            query: listUser,
            fetchPolicy: "network-only",
            variables: {
                id: `${userId}`,
                type:'RECIEVED'
            },
        });
        if(data && data.listUser && data.listUser.items){
            setRecieved(data.listUser.items)
            setLoading(false)
        }else{
            setLoading(false)
        }
        console.log('getRecieved====>', data.listUser.items)
    }

    const updateIntrestData = async (i, status) => {
        console.log("item::====>", recieved_.length);
        try {
          await props
            .updateRequest({
              variables: {
                userId:id,
                tablename: `${recieved_[i]['tablename']}`,
                id: recieved_[i]['id'],
                status: status,
              },
            })
            .then((res) => {
                if (recieved_.length == 1)
                    setRecieved([]);
                else
                    {
                        recieved_.splice(i, 1)
                        setRecieved(recieved_);
                    }

              console.log("Response Update data::");
            });
        } catch (error) {
          console.log("ERROR::", error);
        }
      };

   const onSwiped = (type) => {

        console.log(`on swiped ${type}`)
    };

    const cardUndo = () => {
        swiper.swipeBack();
    };

    const cardLeft = () => {
        connectStatus('DECLINE')
        swiper.swipeLeft()
    };

    const cardRight = () => {
        connectStatus('ACCEPT')
        swiper.swipeRight()
    };

    const cardTop = () => {
        swiper.swipeTop()
    };

    const cardBoost = () => {

    };

    const onTapCard = (cardIndex, event) => {
        console.log(`on onTapCard ${cardIndex}${event}`)

        props.route.params='Accepted'

        // <Accepted />
        // props.navigation.navigate('InboxMainTab',{item:'Accepted'});
    };
    // console.log('OUT', recieved_)
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <View style={{ width: '95%', flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
             <Loader loading={loading} />
             {recieved_.length > 0 && loading == false ?
                    <Swiper
                        overlayLabels={overlayLabel}
                        ref={swiper => { setSwiper(swiper) }}
                        onSwipedLeft={(i) => updateIntrestData(i,'DECLINE')}
                        onSwipedRight={(i) => updateIntrestData(i,'ACCEPTED')}
                        onSwipedTop={() => onSwiped('top')}
                        // onTapCard={(data,index) => onTapCard(data,index)}
                        disableBottomSwipe={true}
                        cards={recieved_}
                        // cardVerticalMargin={8}
                        //cardHorizontalMargin={20}
                        renderCard={(cards,index) => {
                            return (
                                <View style={{ borderRadius: 6,width: '95%', marginTop: 20, alignItems: 'center', borderWidth: 1, backgroundColor: 'white' }} >
                                    {/* <Text style={styles.text}>{card}</Text> */}
                                    <Text style={{ alignSelf: 'flex-end', marginRight: 5, marginTop: 10 }}>{cards.availability}</Text>
                                    <Image style={{ width: 250, height: 250, borderRadius: 250 }}
                                        source={{ uri: cards.profilePic }} />
                                    <View style={{ borderWidth: 1, marginTop: 10, borderColor: 'blue', borderRadius: 10, flexDirection: 'row', padding: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>Hey, your profile seems interesting...</Text>
                                        <TouchableOpacity>
                                            <Text style={{ color: 'blue' }}>more</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '85%', marginTop: 10, marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={{ width: 20, height: 20 }}
                                                source={require('../../Imagess/Astrology.png')} />
                                            <Text style={{ fontSize: 18, fontWeight: '600' }}>{cards.fname}</Text>
                                        </View>
                                        <Text style={{ fontSize: 14, fontWeight: '600' }}>{cards.age} yrs, {cards.height}</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '600' }}>{cards.motherTongue}, {cards.caste} , {cards.location.city}, {cards.location.state}</Text>
                                    </View>
                                    <View style={{ marginBottom: 15, width: '85%', borderTopWidth: 1, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity style={{ backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 40 }}
                                            onPress={() => { updateIntrestData(index,'DECLINE') }}
                                            >
                                                <Image style={{ width: 25, height: 25 }}
                                                    source={require('../../Imagess/Decline.png')} />
                                            </TouchableOpacity>
                                            <Text style={{ marginLeft: 10 }}>Decline</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ marginRight: 10, color: 'green' }}>Accept</Text>
                                            <TouchableOpacity style={{ backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 40 }}
                                            onPress={() => { updateIntrestData(index,'ACCEPTED') }}
                                            >
                                                <Image style={{ width: 25, height: 25, tintColor: 'white' }}
                                                    source={require('../../Imagess/SingleTick.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                        onSwipedAll={() => { console.log('onSwipedAll') }}
                        cardIndex={0}
                        backgroundColor={'#4FD0E9'}
                        stackSize={3}>
                        <View style={{ alignSelf: 'center', marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{recieved_.length <= 1 ? `${recieved_.length} Member is eagerly awaiting your`:`${recieved_.length} Members are eagerly awaiting your` } </Text>
                                <TouchableOpacity style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 38, fontWeight: '500', color: 'white', transform: [{ rotate: '45deg' }] }}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>reply. Respond Now</Text>
                        </View>
                    </Swiper>
               :  <View style={{ alignSelf: "center", marginBottom: 200, marginTop: 200, marginLeft: 24, marginRight: 24 }}>
               <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", }}>NO CONNECTION'S RECIEVED</Text>
               <Text style={{ fontSize: 12, fontWeight: "400", color: "#00000099", textAlign: "center", marginTop: 8, marginBottom: 16 }}>Sorry,looks like there is no internet connection.Please check your Wi-Fi or data connectivity.</Text>
               <View style={{ alignSelf: "center", }}>
                    <TouchableOpacity
                        style={styles.SubmitButtonStyle1}
                        activeOpacity={.10}
                        onPress={() => { 
                            props.navigation.navigate('Accepted')
                             }}>
                        <Text style={styles.TextStyle1}>GO TO ACCEPTED</Text>

                    </TouchableOpacity>
                </View>
           </View>
                        }
                </View>
                {/* </ScrollView> */}
            </SafeAreaView>
        )
    
}

const profile = compose(
    withApollo,
    graphql(updateRequest, { name: "updateRequest" })
)(Recieved);
export default profile;
// export default ;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        justifyContent: "center",
        backgroundColor: "white"
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
});
const overlayLabel = {
    left: {
        title: 'Decline',
        style: {
            label: {
                backgroundColor: 'transparent',
                borderColor: '#FE3153',
                color: '#FE3153',
                borderWidth: 5
            },
            wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: -30
            }
        }
    },
    right: {
        title: 'Accept',
        style: {
            label: {
                backgroundColor: 'transparent',
                borderColor: '#228b22',
                color: '#228b22',
                borderWidth: 5
            },
            wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: 30
            }
        }
    },
    top: {
        title: 'SUPER LIKE',
        style: {
            label: {
                backgroundColor: 'transparent',
                borderColor: '#08A4F2',
                color: '#08A4F2',
                borderWidth: 5
            },
            wrapper: {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }
        }
    }
}

