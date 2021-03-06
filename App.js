/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  View,
  Text,

  Image,

} from 'react-native';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { ApolloProvider as Provider } from 'react-apollo';
import Client from 'aws-appsync';
import awsConfig from './aws-export';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Screen/SplashScreen';
// import SignInScreen from './Screen/SignInScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import ForgotPassword from './Screen/ForgotPassword';
import OTP from './Screen/OTP';
import MainTab from './Screen/MainTab'
import MyMatches from './Screen/MyMatches'
import MatchProfile from './Screen/MatchProfile'
import MorMatches from './Screen/MorMatches'
import ProfileDeshbord from './Screen/ShadiScreen/ProfileDeshbord'
import TodaysMaches from './Screen/TodaysMaches'
import BasicInfoScreen from './Screen/ShadiScreen/EditProfile/BasicInfoScreen';
import EditProfileScreen from './Screen/ShadiScreen/EditProfile/EditProfileScreen';
import ReligiousScreen from './Screen/ShadiScreen/EditProfile/ReligiousScreen';
import GenderScreen from './Screen/ShadiScreen/EditProfile/GenderScreen';
import FamilyScreen from './Screen/ShadiScreen/EditProfile/FamilyScreen';
import ChatTab from './Screen/ChatScreen/ChatTab';
import MessageScreen from './Screen/ChatScreen/MessageScreen';
import Feed from './Screen/ChatScreen/Active';
import Meet from './Screen/ChatScreen/Meet';
import Recent from './Screen/ChatScreen/Recent';
import Astro from './Screen/ShadiScreen/EditProfile/Astro';
import Location from './Screen/ShadiScreen/EditProfile/Location';
import Lifestyles from './Screen/ShadiScreen/EditProfile/Lifestyles';
import PartnerBasicinfo from './Screen/ShadiScreen/EditProfile/PartnerBasicinfo';
import NetworkScreen from './Screen/NetworkScreen';
import MaritalStatus from './Screen/MaritalStatus';
import Myselftextinput from './Screen/ShadiScreen/EditProfile/Myselftextinput'; 

//============ Rating Star =====================
import RatingStar from './Screen/Rating/RatingStar'

// ============= Notification ==================
import Notification from './Screen/Notification/Notification'

//============ Inbox Screens ====================
import InboxMainTab from './Screen/Inbox/InboxMainTab'

// ============ Partner Preferences =============
import Partner_Preferences from './Screen/Options_Settings/Partner_Preferences';

// ============Account Settings =============
import AccountSettings from './Screen/ShadiScreen/AccountSettings';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

Amplify.configure({
  Auth: {
    identityPoolId: awsConfig.aws_cognito_identity_pool_id,
    region: awsConfig.aws_cognito_region, // REQUIRED - Amazon Cognito Region
    userPoolId: awsConfig.aws_user_pools_id, //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: awsConfig.aws_user_pools_web_client_id,
  },
  Storage: {
    AWSS3: {
      bucket: awsConfig.bucket, //REQUIRED -  Amazon S3 bucket
      region: awsConfig.aws_cognito_region, //OPTIONAL -  Amazon service region
    },
  },
});


const client = new Client({
  url: awsConfig.graphqlEndpoint,
  region: awsConfig.aws_project_region,
  auth: {
    type: awsConfig.aws_appsync_authenticationType,
    apiKey: awsConfig.graphql_api_key,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
  disableOffline: true,
});



function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, justifyContent: "space-around" }}>
      <View >
        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('ProfileDeshbord')}>
          <Image style={{ width: 50, height: 25 }}
            resizeMode="contain"
            source={require('./Imagess/shadi.png')} />
          <Text>My Shaadi</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('MainTab',navigation)}>
          <Image style={{ width: 25, height: 25 }}
            source={require('./Imagess/Matches.png')} />
          <Text>Matches</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('InboxMainTab')} >
          <Image style={{ width: 25, height: 25 }}
            source={require('./Imagess/inbox.png')}
          />
          <Text>Inbox</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('ChatTab')} >
          <Image style={{ width: 25, height: 25 }}
            source={require('./Imagess/chaticon.png')} />
          <Text>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}



export default class app extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  TabNavigation() {
    return (
      <Tab.Navigator initialRouteName='InboxMainTab' tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="MainTab" component={MainTab} />
        <Tab.Screen name="ProfileDeshbord" component={ProfileDeshbord} />
        <Tab.Screen name='InboxMainTab' component={InboxMainTab} />
      </Tab.Navigator>
    );
  }
  render() {
    return (
      <Provider client={client}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}  >
          
        {/* <Stack.Screen name="TabNavigation" component={this.TabNavigation} />  */}
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="NetworkScreen" component={NetworkScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="MainTab" component={MainTab} />
          <Stack.Screen name="MyMatches" component={MyMatches} />
          <Stack.Screen name="MatchProfile" component={MatchProfile} />
          <Stack.Screen name="MorMatches" component={MorMatches} />
          <Stack.Screen name="TodaysMaches" component={TodaysMaches} />
          <Stack.Screen name="TabNavigation" component={this.TabNavigation} />
          <Stack.Screen name='RatingStar' component={RatingStar}/>
          <Stack.Screen name='Notification' component={Notification}/>
          <Stack.Screen name='Partner_Preferences' component={Partner_Preferences}/>
          <Stack.Screen name='AccountSettings' component={AccountSettings}/>
          <Stack.Screen name="MaritalStatus" component={MaritalStatus} />
          <Stack.Screen name='BasicInfoScreen' component={BasicInfoScreen}/>
          <Stack.Screen name='Myselftextinput' component={Myselftextinput}/>
          <Stack.Screen name='Location' component={Location}/>   
          <Stack.Screen name='EditProfileScreen' component={EditProfileScreen}/>
          <Stack.Screen name='ReligiousScreen' component={ReligiousScreen}/>
          <Stack.Screen name='Lifestyles' component={Lifestyles}/>
          <Stack.Screen name='PartnerBasicinfo' component={PartnerBasicinfo}/>
          <Stack.Screen name='GenderScreen' component={GenderScreen}/>
          <Tab.Screen name="ProfileDeshbord" component={ProfileDeshbord} />
          <Stack.Screen name='FamilyScreen' component={FamilyScreen}/>
          <Stack.Screen name='Astro' component={Astro}/>
          <Stack.Screen name='ChatTab' component={ChatTab}/>
          <Stack.Screen name='Feed' component={Feed}/>
          <Stack.Screen name='MessageScreen' component={MessageScreen}/>
          <Stack.Screen name='Meet' component={Meet}/>
          <Stack.Screen name='Recent' component={Recent}/>
          {/* <Stack.Screen name='MaritalStatus' component={MaritalStatus}/> */}
       
          
          </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    )
  }
}


