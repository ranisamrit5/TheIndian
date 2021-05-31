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
    Button
} from 'react-native';
import Swiper from 'react-native-deck-swiper'
import { TouchableOpacity } from 'react-native-gesture-handler';
const images = [
    'http://www.worldwomanfoundation.com/summit2018/wp-content/uploads/2018/09/Jeannette_Ceja-_Head_Shot_2018_0.jpg',
    'https://inspiredot.net/wp-content/uploads/2018/10/Top-30-Most-Beautiful-Women-in-the-World-26-800x450.jpg',
    'https://d2ck0sxsjau14o.cloudfront.net/wp-content/uploads/2018/10/young-attractive-woman.jpg',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bangs-camina-cabello-1547746714.jpg',
    'https://s4.scoopwhoop.com/shon/random/dk1.jpg',
    'https://www.wonderslist.com/wp-content/uploads/2015/10/Countries-With-The-Most-Beautiful-Women.jpg',
    'http://celeb-face.com/albums/userpics/2015y/07/05/43/404/AmberHeard2.jpg',
    'https://www.wonderslist.com/wp-content/uploads/2019/01/katherine-langford.jpg',
    'https://wisetoast.com/wp-content/uploads/2015/10/most-beautiful-girls-in-the-world-zarine-khan-800x416.jpg',
    'https://www.telegraph.co.uk/content/dam/women/2018/10/16/TELEMMGLPICT000177616621_trans_NvBQzQNjv4Bq-h6SfYaJRHTgGr2QLG-hIvr7sARQy7EgBjwPUzvqL_M.jpeg?imwidth=450',
    'https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/1028x675/format/jpg/quality/85/http%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2Fc374afd606d5f14d4f21fcbc7006ee80%2F0%2Fthylane-blondeau-attends-the-screening-of-sorry-angel-during-the-71st-picture-id957003810'
];

export default class app extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    onSwiped = (type) => {
        console.log(`on swiped ${type}`)
    };

    cardUndo = () => {
        this.swiper.swipeBack();
    };

    cardLeft = () => {
        this.swiper.swipeLeft()
    };

    cardRight = () => {
        this.swiper.swipeRight()
    };

    cardTop = () => {
        this.swiper.swipeTop()
    };

    cardBoost = () => {

    };

    onTapCard = (cardIndex, event) => {
        let ref = this.cardRef[cardIndex];
        if (ref) {
            let locationX = event.nativeEvent.locationX;
            if (0 < Math.round(locationX) && (SCREEN_WIDTH / 2) > Math.round(locationX)) {
                ref.onTapRightPress();
            } else if ((SCREEN_WIDTH / 2) < Math.round(locationX) && Math.round(locationX) < SCREEN_WIDTH) {
                ref.onTapLeftPress();
            }
        }
    };
    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                {/* <ScrollView> */}
                {/* <View style={{ alignSelf: 'center', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{images.length} Members are eagerly awaiting your</Text>
                        <TouchableOpacity style={{ marginLeft: 10 }}>
                            <Text style={{ fontSize: 38, fontWeight: '500', color: 'white', transform: [{ rotate: '45deg' }] }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>reply. Respond Now</Text>
                </View> */}
                <View style={{ width: '95%', flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>

                    <Swiper
                        overlayLabels={overlayLabel}
                        ref={swiper => { this.swiper = swiper }}
                        onSwipedLeft={() => this.onSwiped('left')}
                        onSwipedRight={() => this.onSwiped('right')}
                        onSwipedTop={() => this.onSwiped('top')}
                        onTapCard={this.onTapCard.bind(this)}
                        disableBottomSwipe={true}
                        cards={images}
                        // cardVerticalMargin={8}
                        //cardHorizontalMargin={20}
                        renderCard={(cards) => {
                            return (
                                <View style={{ width: '95%', marginTop: 20, alignItems: 'center', borderWidth: 1, backgroundColor: 'white' }} >
                                    {/* <Text style={styles.text}>{card}</Text> */}
                                    <Text style={{ alignSelf: 'flex-end', marginRight: 5, marginTop: 10 }}>5 Hours ago</Text>
                                    <Image style={{ width: 250, height: 250, borderRadius: 250 }}
                                        source={{ uri: cards }} />
                                    <View style={{ borderWidth: 1, marginTop: 10, borderColor: 'blue', borderRadius: 10, flexDirection: 'row', padding: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>Hey, your profile seems interesting...</Text>
                                        <TouchableOpacity>
                                            <Text style={{ color: 'blue' }}>more></Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '85%', marginTop: 10, marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={{ width: 20, height: 20 }}
                                                source={require('../../Imagess/Astrology.png')} />
                                            <Text style={{ fontSize: 18, fontWeight: '600' }}>XyzName..... Vaidya</Text>
                                        </View>
                                        <Text style={{ fontSize: 14, fontWeight: '600' }}>30 yrs, 5'7"</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '600' }}>Marathi, Teli . Nagpur, Maharashtra</Text>
                                    </View>
                                    <View style={{ marginBottom: 15, width: '85%', borderTopWidth: 1, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity style={{ backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 40 }}>
                                                <Image style={{ width: 25, height: 25 }}
                                                    source={require('../../Imagess/Decline.png')} />
                                            </TouchableOpacity>
                                            <Text style={{ marginLeft: 10 }}>Decline</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ marginRight: 10, color: 'green' }}>Accept</Text>
                                            <TouchableOpacity style={{ backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 40 }}>
                                                <Image style={{ width: 25, height: 25, tintColor: 'white' }}
                                                    source={require('../../Imagess/SingleTick.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                        //onSwiped={(cardIndex) => { console.log(cardIndex) }}
                        onSwipedAll={() => { console.log('onSwipedAll') }}
                        cardIndex={0}
                        backgroundColor={'#4FD0E9'}
                        stackSize={3}>
                        {/* <Button
                            onPress={() => { console.log('oulala') }}
                            title="Press me">
                            You can press me
                         </Button> */}
                        <View style={{ alignSelf: 'center', marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{images.length} Members are eagerly awaiting your</Text>
                                <TouchableOpacity style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 38, fontWeight: '500', color: 'white', transform: [{ rotate: '45deg' }] }}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>reply. Respond Now</Text>
                        </View>
                    </Swiper>
                </View>
                {/* </ScrollView> */}
            </SafeAreaView>
        )
    }
}
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