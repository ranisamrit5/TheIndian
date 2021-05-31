import React from 'react';
import { View, StyleSheet, Text,Image } from 'react-native';
// import FastImage from "react-native-fast-image";
// import { appStyles, ASPECT_RATIO, fontStyle, SCREEN_WIDTH, shadow } from "../../themes/styles";
// import RoundButton from "../../../Screen/Componentone/RoundButton";
// import ProfileSliderComponent from "../../components/ProfileSliderComponent";
// import { BACKGROUNDCOLOR, WHITE } from "../../themes/colors";
// import PurchasePopUpComponent from "../../components/purchase/PurchasePopUpComponent";
import ImagePicker from 'react-native-image-crop-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

class GenderScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            visible: false,
            data: [
                {
                    id: 1,
                    title: 'Get The Indian Matrimony Gold',
                    sub_title: 'See who likes you and more!'
                },
                {
                    id: 2,
                    title: 'Get Matches Faster',
                    sub_title: 'Boost your profile once a month!'
                },
                {
                    id: 3,
                    title: 'Stan out with Super Likes',
                    sub_title: 'You are 3 times more likely to get a match!'
                },
                {
                    id: 4,
                    title: 'Swipe around the world!',
                    sub_title: 'Passport to anywhere with The Indian Matrimony Plus!'
                },
                {
                    id: 5,
                    title: 'Control Your Profile',
                    sub_title: 'Limit what others see with The Indian Matrimony Plus!'
                },
                {
                    id: 6,
                    title: 'Increase your chances',
                    sub_title: 'Get unlimited likes and The Indian Matrimony Plus!'
                }
            ]
        }
    }

    componentDidMount() {
        console.log('PROPS::', this.props)
        this.intervel = setInterval(() => {
            const index = this.state.currentIndex + 1;
            this.setState({ currentIndex: index > (this.state.data.length - 1) ? 0 : index })
        }, 2000)
    }

    componentWillUnmount() {
        clearInterval(this.intervel)
    }

    pickMultiple() {
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            console.log(images);
        });
    }

    onPress = () => {
        this.setState({ visible: true })
    };

    render() {
        const { data, currentIndex, visible } = this.state;
        

        return (
            <View style={styles.container}>
                {/* <View style={styles.profileTopView}> */}
                    {/* <View style={styles.profileImageView}> */}
                        {/* <FastImage
                            style={styles.profileImage}
                            source={{ uri: 'http://paperlief.com/images/young-hollywood-actresses-names-wallpaper-2.jpg' }}
                            resizeMode={FastImage.resizeMode.cover}
                        /> */}
                        {/* <Text style={styles.profileTextUsername}>{'Angelina Jolie, 35'}</Text> */}
                    {/* </View> */}
                    <View style={styles.profileButtonView}>
                        
                        
                         <TouchableOpacity onPress={() => this.pickMultiple()}>
                         <Image style={{ width: 50, height: 25,tintColor:"#000",alignSelf:"center"}}
            resizeMode="contain"
            source={require('../../../Imagess/camera_white.png')} />
                         <Text>ADD MEDIA</Text>
                         
                         </TouchableOpacity>
    
                    </View>
                </View>
                // <View style={styles.profileSliderView}>
                //     <ProfileSliderComponent
                //         data={data}
                //         currentIndex={currentIndex}
                //         onPress={this.onPress} />
                // </View>
                // <PurchasePopUpComponent
                //     onDismiss={() => this.setState({ visible: false })}
                //     onTouchOutside={() => this.setState({ visible: false })}
                //     visible={visible} />
            // </View>
        );
    }
}

export default GenderScreen;

export const styles = StyleSheet.create({
    profileTopView: {
        backgroundColor: "#fff",
        paddingBottom: 90
    },
    profileImageView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        marginTop: 20,
        width: 90,
        height: 90,
        // borderRadius: ASPECT_RATIO(90) / 2,
    },
    profileTextUsername: {
        marginTop:10,
        // ...fontStyle.largeBlackText
    },
    profileButtonView: {
        marginTop: 45,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    profileSliderView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});