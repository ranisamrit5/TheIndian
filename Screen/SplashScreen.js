/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hooks we needed
import React, { useState, useEffect } from 'react';
import  { Auth } from 'aws-amplify';
//Import all required component
import { ActivityIndicator, View, StyleSheet, Image, TouchableOpacity, Text, StatusBar } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native';
import { Container,Content} from 'native-base';
import { useTheme } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import NetworkScreen from '../Screen/NetworkScreen';
import {checkConnected} from '../Screen/checkInternet'

const SplashScreen =  (props) => {
 
  //State for ActivityIndicator animation
  let [animating, setAnimating] = useState(true);
  const { colors } = useTheme();
  const [connected,setConnected] = useState(false);

  const network = async () => {
    checkConnected()
    .then((state => {
     console.log('Network Check----::',state)
     setConnected(state)
   }))
    // if (!state.isConnected)
    //   props.navigation.navigate('NetworkScreen')
  }; 
  
  network();
  
  useEffect(() => {

    
    // console.log('===',state)
    Auth.currentAuthenticatedUser()
    .then((data) => {
      console.log('user----::',data)
      // if (connected)
        props.navigation.navigate('TabNavigation');
    }).catch((error)=>{
      props.navigation.navigate('LoginScreen');
      console.log('error----::',error)
    })

  }, []);


  


  return (

    connected == true? (
      <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#ffa07a' barStyle="light-content" />
      <Image
        source={require('../Imagess/shadi.png')}
        style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />

    </SafeAreaView>
  ):(
    <NetworkScreen onCheck={checkConnected()} />
  )

  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});