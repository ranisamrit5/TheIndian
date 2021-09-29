/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from 'react';
 import {
     SafeAreaView,
     StyleSheet,
     ScrollView,
     View,
     Text,
     StatusBar,
     FlatList,
     Image,
     TouchableOpacity
 } from 'react-native';

import { graphql, withApollo } from "react-apollo";
import compose from "lodash.flowright";
import { Auth } from "aws-amplify";
import Recent from './Recent'
import Meet from './Meet'
import Active from './Active';
import { TouchableHighlight } from 'react-native-gesture-handler';
export const ChatTab = props => {
    const [state, setState] = useState('Active');
    const [ isPress, setIsPress ] = useState(false);
    const [data, setData] = useState({
             data: [],
             dataShow: [],
             Meet: false,
             Recent: false,
             Active: true,
            });
     const TopTabFunction = (Value) => {
         console.log('valuess', Value)
         switch (Value.title) {
             case 'Recent': {
                setData({
                    ...data,
                    Meet: false,
                    Active: false,
                    Recent: true
                });
                 break;
             }
             case 'Active': {
                setData({
                    ...data,
                    Meet: false,
                    Active: true,
                    Recent: false
                });
                 break;
             }
             case 'Meet': {
                setData({
                    ...data,
                    Meet: false,
                    Active: false,
                    Recent: true
                });
                 break;
             }
            
         }
     }
   
       const TabData = [
             {
                id: '58694a0f-3da1-471f-bd96-145571e29d721',
                 title: 'Recent',
                 notification: ''
             },
            
             {
                 id: '58694a0f-3da1-471f-bd96-145571e29d722',
                 title: 'Active',
                 notification: ''
             },
            
             {
                 id: '58694a0f-3da1-471f-bd96-145571e29d723',
                 title: 'Meet',
                 notification: ''
             },
            
         ]
         
         
         return (
             <SafeAreaView>
                 <View style={{ marginTop: 10, height: '100%' }}>
                     <View>
                
                         <FlatList style={{ marginBottom: 10 }} horizontal={true}
                             data={TabData}
                             keyExtractor={(item, index) => index.toString()} 
                             showsHorizontalScrollIndicator={false}
                             renderItem={({ item }) =>
                                 <TouchableHighlight
                                 underlayColor="#FF5733" 
                                //  onShowUnderlay="yes"
                                 activeOpacity={0.6}
                                 style={{ borderWidth: 1, alignItems: 'center',
                                  justifyContent: 'center', width: 110, height:35, marginLeft: 5, marginRight: 5, borderRadius: 5 }}
                                     onPress={() => TopTabFunction(item)} >
                                     {item.Ima == null ?
                                         <Text style={{ fontSize: 17, alignSelf: 'center' }}>{item.title}</Text> : null}
                                 </TouchableHighlight>
                             } />
                     </View>     
                     {data.Recent ? <Recent {...props} /> : null}
                     {data.Active ? <Active {...props} /> : null}
                     {data.Meet ? <Meet {...props} /> : null}
                 </View>
             </SafeAreaView>
      );

    }
    const profile = compose(
        withApollo,
        // graphql(updateUser, { name: "updateUser" })
    )(ChatTab);
    export default profile;

    // export default ChatTab;
 
 