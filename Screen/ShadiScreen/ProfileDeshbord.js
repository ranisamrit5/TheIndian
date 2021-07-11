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
import {RNS3} from 'react-native-s3-upload';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Auth } from "aws-amplify";
import { graphql, withApollo } from "react-apollo";
import compose from "lodash.flowright";
import Getdata from "../../AppSync/query/Auth/getData";
import updateUser from "../../AppSync/mutation/User/updateData";
import Loader from '../../Screen/Componentone/Loader';
import { userDataMapper } from '../mapper'
import female from "../../Imagess/female.jpeg";
import male from "../../Imagess/male.jpg";
// import BasicInfoScreen from './EditProfile/BasicInfoScreen';
import awsexport from "../../aws-export";
import moment from "moment"
import {s3Upload} from "../libs/awsLib";
import {launchImageLibrary} from 'react-native-image-picker';
import { Storage } from "aws-amplify";
// const [premiumMatches, setPremiumMatches] = useState([1, 2, 3, 4, 5]);
const ProfileDashboard = props => {


    // const [premiumMatches, setPremiumMatches] = useState([1, 2, 3, 4, 5]);
    let [data, setData] = useState([1, 2, 3, 4, 5]);
    const [id, setId] = useState()
    const [filePath_, setFilePath] = useState({});
    const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');
    const [details, setDetails] = useState([])
    const [validity, setValidity] = useState();
    const [basicInfo, setBasicInfo] = useState({
        id: '',
       profilePic:""
    })
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        Auth.currentAuthenticatedUser()
            .then((data) => {
                // console.log('user----::',data)
                setId(data.username)
                // props.id=data.username
                getData(data.username)
            });
    }, []
    )
    const chooseFile = () => {
        let options = {
          mediaType: 'photo',
        };
        launchImageLibrary(options, (response) => {
        //   console.log('Response = ', response.assets[0]);
          setUploadSuccessMessage('');
          if (response.didCancel) {
            alert('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
          setFilePath(response.assets[0]);
          uploadFile(response.assets[0]);
        });
      };

    const getData = async (user) => {
        const { data } = await props.client.query({
            query: Getdata,
            fetchPolicy: "network-only",
            variables: {
                id: `${user}`,
            },
        });
        if (data) {
            let userData = data.getUser
            setValidity(moment(parseInt(userData.validity)).format("MMM Do YYYY"))
            console.log('user----in DS', userData.plan)
            
            let all = {}
            all.data = data.getUser
            let pDetails = userDataMapper(all)
            setDetails(pDetails)
            console.log('user----in profilePic', pDetails.profilePic)
            const { noOfChildren, maritalStatus_, eatingHabit, smokingHabit, drinkingHabit, manglik, subcaste,
                religion,profilePic, caste, familyDetails, gotram, motherTongue, dob, aboutMe, fname, profileCreatedFor,gender_,height_,physicalStatus_
            } = pDetails
            // setData(familyDetails)
            // console.log('IN===>',profilePic);
            // // setMaterial()
            // // setGender(gender)
            // // setFathersOccupation(familyDetails.fathersOccupation)
            setBasicInfo({
                ...basicInfo,
                id: user,
            //     profileCreatedFor: profileCreatedFor,
            //     maritalStatus:  maritalStatus_,
            //     noOfChildren:  noOfChildren,
                profilePic:profilePic,
            //     eatingHabit: eatingHabit,
            //     smokingHabit: smokingHabit,
            //     drinkingHabit: drinkingHabit,
            //     manglik: manglik,
            //     physicalStatus: physicalStatus_,
            //     religion: religion,
            //     caste: caste,
            //     subcaste: subcaste,
            //     gotram:gotram,
            //     height: height_,
            //     motherTongue: motherTongue,
            //     dob: dob,
            //     aboutMe: aboutMe,
            //     fname: fname,
            //     gender:gender_,
            //     familyDetails:familyDetails

            });
        }
        setLoading(false)
    }
    const uploadFile = async (filePath) => {
        if (Object.keys(filePath).length == 0) {
          alert('Please select image first');
          return;
        }
        console.log(filePath);
        setLoading(true)
        let response =await RNS3.put(
          {
            uri: filePath.uri,
            name: filePath.fileName,
            type: filePath.type,
          },
          {
            keyPrefix: `public/${id}/`, // Ex. myuploads/
            bucket: awsexport.s3Bucket, // Ex. aboutreact
            region: awsexport.aws_cognito_region, // Ex. ap-south-1
            accessKey: awsexport.aws_access_key_id,
            secretKey: awsexport.aws_secret_access_key,
            successActionStatus: 201,
          },
        )
          .progress((progress) =>
            setUploadSuccessMessage(
              `Uploading: ${progress.loaded / progress.total} (${
                progress.percent
              }%)`,
            ),
          )
        //   .then((response) => {
            if (response.status !== 201)
              alert('Failed to upload image to S3',response);

            console.log(response);
            setFilePath('');
            let {
              bucket,
              etag,
              key,
              location
            } = response.body.postResponse;
            setUploadSuccessMessage(
              `Uploaded Successfully: 
              \n1. bucket => ${bucket}
              \n2. etag => ${etag}
              \n3. key => ${key}
              \n4. location => ${location}`,
            );
            let fileKey=`https://${awsexport.s3Bucket}.s3.${awsexport.aws_cognito_region}.amazonaws.com/public/${id}/${filePath.fileName}`
          
        //   }).then(()=>{
            await handleSubmit(fileKey);
        //   })
      };
      const handleSubmit = async (fileKey) => {
        // setLoading(true)
    
        console.log('fileKey====>',fileKey)
        let data =basicInfo
        data.profilePic=fileKey
        try {
            const savedData = await props.updateUser({ variables: { input: data } })
            console.log('savedData====>',savedData)
            setBasicInfo({ ...basicInfo, profilePic: fileKey })
            setDetails({ ...details, profilePic: fileKey })

        } catch (err) {
            console.log('error creating todo:', err)
        }
        setLoading(false)
    }
   const pickMultiple =()=> {
       console.log('Clicked')
        // ImagePicker.openPicker({
        //     multiple: true
        // }).then(images => {
        //     console.log(images);
        // });
    }
// export default class app extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             PremiumMatches:[1,2,3,4],
//             NewMatchesArray:[1,2,3,4],
//             RecentVisitorArry:[1,2,3,4]
//         }
//     }
//     render() {
        return (
            <View style={{ backgroundColor: '#FF5733',flex:1 }}>
                <Loader loading={loading} />
                <SafeAreaView style={{flex:1}} >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', alignSelf: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>My Shaadi</Text>
                    <ScrollView style={{flex:1}}>
                        <View style={{ backgroundColor: '#d3d3d3' ,flex:1}}>
                            <ImageBackground style={{ width: '100%', height: 200, flexDirection: 'row', alignItems: 'center' }} blurRadius={25} resizeMode='stretch'
                                source={
                                   { uri : details.profilePic ? details.profilePic:
                                    details.gender == 'MALE' || details.gender == 'Male' ? 
                                    require('../../Imagess/male.jpg'):require('../../Imagess/female.jpeg')
                                }
                                }
                                >
                                <View style={{ marginLeft: 40, }}>
                                    {details.profilePic?
                                    <ImageBackground style={{ width: 55, height: 55, overflow: 'hidden',
                                     borderRadius: 25,alignItems:'center',justifyContent:'flex-end',marginTop:10 }}
                                     source={{uri:details.profilePic}} >
                                    <TouchableOpacity onPress={() => chooseFile()}
                                        style={{ borderWidth: 0.3,  alignItems: 'center',justifyContent:'center', 
                                         borderRadius: 10, backgroundColor: 'green', width: 20, height: 20, }}>
                                            <Text style={{ fontSize: 15, color: 'white', }}>+</Text>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                    :
                                    <ImageBackground style={{ width: 55, height: 55, overflow: 'hidden',
                                    borderRadius: 25,alignItems:'center',justifyContent:'flex-end',marginTop:10 }}
                                    source={details.gender == 'MALE' || details.gender == 'Male' ? require('../../Imagess/male.jpg'):require('../../Imagess/female.jpeg')} > 
                                       <TouchableOpacity onPress={() => chooseFile()}
                                       style={{ borderWidth: 0.3,  alignItems: 'center',justifyContent:'center', 
                                        borderRadius: 10, backgroundColor: 'green', width: 20, height: 20, }}>
                                           <Text style={{ fontSize: 15, color: 'white', }}>+</Text>
                                       </TouchableOpacity>
                                   </ImageBackground>
}
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={{fontSize:14,fontWeight:'500',color:'white'}}>{details.fname} {details.lname}</Text>
                                    <View style={{ flexDirection: 'row',marginTop:10 }}>
                                        <Text style={{fontSize:14,fontWeight:'500',color:'white'}}>{details.username}</Text>
                                        <TouchableOpacity  onPress={()=>props.navigation.navigate('EditProfileScreen')} >
                                            <Text style={{marginLeft:10,color:'green',fontSize:16}}>Edit Profile</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{fontSize:14,fontWeight:'500',marginTop:5,color:'white'}}>Account {details.plan}</Text>
                                    <Text style={{fontSize:14,fontWeight:'500',marginTop:5,color:'white'}}>Expiry : {validity}</Text>
                                </View>
                            </ImageBackground>
                            <Text style={{marginLeft:20,fontSize:16,fontWeight:'600',marginTop:10}}>complete Your Profile</Text>
                            <View style={{alignSelf:'center',width:'100%',backgroundColor:'white',marginTop:10}}>
                                <TouchableOpacity style={{flexDirection:'row',borderBottomWidth:0.5,alignItems:'center',padding:5,width:'90%',alignSelf:'center'}}>
                                    <Image style={{width:25,height:25}}
                                        source={require('../../Imagess/Shield_VectorIcone.png')} />
                                    <View style={{flexDirection:'row',marginLeft:20,justifyContent:'space-between',width:'90%'}}>
                                        <View>
                                            <Text>Get 2 times more Matches</Text>
                                            <Text>Verify your profile with ID</Text>
                                        </View>
                                        <Image style={{width:25,height:25,transform: [{ rotate: '-90deg'}]}}
                                            source={require('../../Imagess/arrowiconVc.png')}  />
                                    </View>

                                </TouchableOpacity>

                                <TouchableOpacity style={{flexDirection:'row',borderBottomWidth:0.5,alignItems:'center',padding:5,width:'90%',alignSelf:'center'}}>
                                    <Image style={{width:25,height:25,tintColor:'grey'}}
                                        source={require('../../Imagess/Astrology_Vector.png')} />
                                    <View style={{flexDirection:'row',marginLeft:20,justifyContent:'space-between',width:'90%'}}>
                                        <View>
                                            <Text>Find Astro Compatible matches</Text>
                                            <Text>Add your astro details</Text>
                                        </View>
                                        <Image style={{width:25,height:25,transform: [{ rotate: '-90deg'}]}}
                                            source={require('../../Imagess/arrowiconVc.png')}  />
                                    </View>

                                </TouchableOpacity>
                            </View>
                            {/* ================= Premium Matches =============== */}
                            <View style={{marginTop:10,backgroundColor:'white'}}>
                                <Text style={{marginLeft:10,marginTop:5,fontSize:14,fontWeight:'bold'}}>Premium Matches (95)</Text>
                                <Text style={{marginLeft:10,fontSize:12,fontWeight:'500',marginBottom:5}}>Recently upgraded Premium members</Text>
                                <View style={{marginLeft:10}}>
                                    <FlatList horizontal={true}
                                        data={data}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({item})=>
                                        <View style={{marginRight:10,borderWidth:1,width:180}}>
                                            <ImageBackground style={{width:180,height:140,justifyContent:'flex-end'}}
                                                source={require('../../Imagess/HeroImage.jpeg')} 
                                                 >
                                                <Text style={{marginBottom:5,marginLeft:5,color:'white',opacity:10}} blurRadius={50}>Prashant Nando</Text>
                                            </ImageBackground>
                                            <View style={{marginTop:5,marginLeft:10}}>
                                                <Text>30 yrs, 5' 11",Marathi,</Text>
                                                <Text>Teli,</Text>
                                                <Text>Mumbai, Maharastra</Text>
                                            </View>
                                            <TouchableOpacity style={{borderWidth:1,borderColor:'#22BC7E',alignSelf:'center',justifyContent:'center',marginBottom:5,marginTop:5,height:30,width:'90%',flexDirection:'row',alignItems:'center'}}>
                                                <Image style={{width:20,height:10,tintColor:'#22BC7E'}}
                                                    source={require('../../Imagess/SingleTick.png')} />
                                                <Text style={{color:'#22BC7E'}}>Connect Now</Text>
                                            </TouchableOpacity>
                                        </View>   } /> 
                                        <View style={{marginTop:10,alignSelf:'center',marginBottom:10}}>
                                            <TouchableOpacity>
                                                <Text style={{fontSize:14,fontWeight:'bold',color:'#22BC7E'}}>See All</Text>
                                            </TouchableOpacity>
                                        </View>
                                </View>
                            </View>
                            {/* ============== New Matches  */}
                            <View style={{marginTop:10,backgroundColor:'white'}}>
                                <Text style={{marginLeft:10,marginTop:5,fontSize:14,fontWeight:'bold'}}>New Matches (23)</Text>
                                <Text style={{marginLeft:10,fontSize:12,fontWeight:'500',marginBottom:5}}>Members who joined recently</Text>
                                <View style={{marginLeft:10}}>
                                    <FlatList horizontal={true}
                                        data={data}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({item})=>
                                        <View style={{marginRight:10,borderWidth:1,width:180}}>
                                            <ImageBackground style={{width:180,height:140,justifyContent:'flex-end'}}
                                                source={require('../../Imagess/HeroImage.jpeg')}  >
                                                <View  blurRadius={20}>
                                                    <Text style={{marginBottom:5,marginLeft:5,color:'white',opacity:20}} blurRadius={50}>Prashant Nando</Text>
                                                </View>
                                            </ImageBackground>
                                            <View style={{marginTop:5,marginLeft:10}}>
                                                <Text>30 yrs, 5' 11",Marathi,</Text>
                                                <Text>Teli,</Text>
                                                <Text>Mumbai, Maharastra</Text>
                                            </View>
                                            <TouchableOpacity style={{borderWidth:1,borderColor:'#22BC7E',alignSelf:'center',justifyContent:'center',marginBottom:5,marginTop:5,height:30,width:'90%',flexDirection:'row',alignItems:'center'}}>
                                                <Image style={{width:20,height:10,tintColor:'#22BC7E'}}
                                                    source={require('../../Imagess/SingleTick.png')} />
                                                <Text style={{color:'#22BC7E'}}>Connect Now</Text>
                                            </TouchableOpacity>
                                        </View>   } /> 
                                        <View style={{marginTop:10,alignSelf:'center',marginBottom:10}}>
                                            <TouchableOpacity>
                                                <Text style={{fontSize:14,fontWeight:'bold',color:'#22BC7E'}}>See All</Text>
                                            </TouchableOpacity>
                                        </View>
                                </View>
                            </View>
                            {/* ============== Recent Visitors  */}
                            <View style={{marginTop:10,backgroundColor:'white'}}>
                                <Text style={{marginLeft:10,marginTop:5,fontSize:14,fontWeight:'bold'}}>Recent Visitors (518)</Text>
                                <Text style={{marginLeft:10,fontSize:12,fontWeight:'500',marginBottom:5}}>Members who visited your Profile</Text>
                                <View style={{marginLeft:10}}>
                                    <FlatList horizontal={true}
                                        data={data}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({item})=>
                                        <View style={{marginRight:10,borderWidth:1,width:180}}>
                                            <ImageBackground style={{width:180,height:140,justifyContent:'flex-end'}}
                                                source={require('../../Imagess/HeroImage.jpeg')}  >
                                                <View  blurRadius={20}>
                                                    <Text style={{marginBottom:5,marginLeft:5,color:'white',opacity:20}} blurRadius={50}>Prashant Nando</Text>
                                                </View>
                                            </ImageBackground>
                                            <View style={{marginTop:5,marginLeft:10}}>
                                                <Text>30 yrs, 5' 11",Marathi,</Text>
                                                <Text>Teli,</Text>
                                                <Text>Mumbai, Maharastra</Text>
                                            </View>
                                            <TouchableOpacity style={{borderWidth:1,borderColor:'#22BC7E',alignSelf:'center',justifyContent:'center',marginBottom:5,marginTop:5,height:30,width:'90%',flexDirection:'row',alignItems:'center'}}>
                                                <Image style={{width:20,height:10,tintColor:'#22BC7E'}}
                                                    source={require('../../Imagess/SingleTick.png')} />
                                                <Text style={{color:'#22BC7E'}}>Connect Now</Text>
                                            </TouchableOpacity>
                                        </View>   } /> 
                                        <View style={{marginTop:10,alignSelf:'center',marginBottom:10}}>
                                            <TouchableOpacity>
                                                <Text style={{fontSize:14,fontWeight:'bold',color:'#22BC7E'}}>See All</Text>
                                            </TouchableOpacity>
                                        </View>
                                </View>
                            </View>
                        {/* ============ Options & Settings ============*/}
                        <Text style={{fontSize:14,fontWeight:'bold',marginTop:15,marginLeft:10}}>Options & Settings</Text>
                        <View style={{backgroundColor:'white',marginTop:5}}>
                            <TouchableOpacity style={{flexDirection:'row',height:40,marginBottom:5,alignItems:'center',justifyContent:'center',width:'90%',borderBottomWidth:0.5,alignSelf:'center'}}
                                onPress={()=>props.navigation.navigate('Partner_Preferences')} >
                                <Image style={{width:20,height:20}}
                                    source={require('../../Imagess/Matches.png')} />
                               <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,width:'90%',justifyContent:'space-between'}}>
                                    <Text>Partner Preferences</Text>
                                    <Image style={{width:25,height:25,tintColor:'black',transform: [{ rotate: '-90deg'}]}}
                                        source={require('../../Imagess/arrowiconVc.png')} />
                               </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:'row',height:40,marginBottom:5,alignItems:'center',justifyContent:'center',width:'90%',borderBottomWidth:0.5,alignSelf:'center'}}>
                               
                                <Image style={{width:20,height:20}}
                                    source={require('../../Imagess/FilterImage.png')} />
                               <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,width:'90%',justifyContent:'space-between'}}>
                                    <Text>Contact Filters</Text>
                                    <Image style={{width:25,height:25,tintColor:'black',transform: [{ rotate: '-90deg'}]}}
                                        source={require('../../Imagess/arrowiconVc.png')} />
                               </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:'row',height:40,marginBottom:5,alignItems:'center',justifyContent:'center',width:'90%',borderBottomWidth:0.5,alignSelf:'center'}}
                               onPress={()=>props.navigation.navigate('AccountSettings')}>
                                <Image style={{width:20,height:20}}
                                    source={require('../../Imagess/SettingVector.png')} />
                               <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,width:'90%',justifyContent:'space-between'}}>
                                    <Text>Account Settings</Text>
                                    <Image style={{width:25,height:25,tintColor:'black',transform: [{ rotate: '-90deg'}]}}
                                        source={require('../../Imagess/arrowiconVc.png')} />
                               </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:'row',height:40,marginBottom:5,alignItems:'center',justifyContent:'center',width:'90%',borderBottomWidth:0.5,alignSelf:'center'}}>
                                <Image style={{width:20,height:20}}
                                    source={require('../../Imagess/help_Icon.png')} />
                               <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,width:'90%',justifyContent:'space-between'}}>
                                    <Text>Help & Support</Text>
                                    <Image style={{width:25,height:25,tintColor:'black',transform: [{ rotate: '-90deg'}]}}
                                        source={require('../../Imagess/arrowiconVc.png')} />
                               </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:'row',height:40,marginBottom:5,alignItems:'center',justifyContent:'center',width:'90%',borderBottomWidth:0.5,alignSelf:'center'}}
                                onPress={()=>props.navigation.navigate('Notification')}  >
                                <Image style={{width:20,height:20}}
                                    source={require('../../Imagess/NotificationIcon.png')} />
                               <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,width:'90%',justifyContent:'space-between'}}>
                                    <Text>Notifications</Text>
                                    <Image style={{width:25,height:25,tintColor:'black',transform: [{ rotate: '-90deg'}]}}
                                        source={require('../../Imagess/arrowiconVc.png')} />
                               </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:'row',height:40,marginBottom:5,alignItems:'center',justifyContent:'center',width:'90%',borderBottomWidth:0.5,alignSelf:'center'}}
                                onPress={()=>props.navigation.navigate('RatingStar')} >
                                <Image style={{width:20,height:20}}
                                    source={require('../../Imagess/Star_Reting.png')} />
                               <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,width:'90%',justifyContent:'space-between'}}>
                                   <View>
                                        <Text>Rate the App</Text>
                                        <Text>Make your opinion count</Text>
                                   </View>
                                    <Image style={{width:25,height:25,tintColor:'black',transform: [{ rotate: '-90deg'}]}}
                                        source={require('../../Imagess/arrowiconVc.png')} />
                               </View>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
//         )
//     }
// }
);
};
const profile = compose(
    withApollo,
    graphql(updateUser, { name: "updateUser" })
)(ProfileDashboard);
export default profile;
// export default ProfileDeshbord;
const styles = StyleSheet.create({
    HeaderText: {
        fontSize: 16
    },
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
      },
      buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
      },
      buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
      },
      textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
      },
});