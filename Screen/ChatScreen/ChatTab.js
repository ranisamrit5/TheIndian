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
 
 
 import Recent from './Recent'

 import Meet from './Meet'
 
import Active from './Active';
import { TouchableHighlight } from 'react-native-gesture-handler';
export const ChatTab = props => {
    const [state, setState] = useState('');
    const [ isPress, setIsPress ] = useState(false);
    const [data, setData] = useState({
       
             data: [],
             dataShow: [],
            
             Meet: 'false',
             Recent: 'false',
          
             Active: 'false',
            
            });
   
            
 
 
     const TopTabFunction = (Value) => {
         console.log('valuess', Value)
         switch (Value.title) {
             case 'Recent': {
                setState({ Meet: false })
                setState({ Active: false })
                 setState({ Recent: true })
               
                 break;
             }
            
             case 'Active': {
                 setState({ Meet: false })
                 setState({ Recent: true })
                
                setState({ Active: true })
                 break;
             }
             case 'Meet': {
                setState({ Recent: true })
                setState({ Active: false })
                
                setState({ Meet: true })
                 break;
             }
            
         }
     }
   
       const TabData = [
             {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                 title: 'Recent',
                 notification: ''
             },
            
             {
                 id: '58694a0f-3da1-471f-bd96-145571e29d72',
                 title: 'Active',
                 notification: ''
             },
            
             {
                 id: '58694a0f-3da1-471f-bd96-145571e29d72',
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
                     
                     {state.Recent ? <Recent /> : null}
                     {state.Active ? <Active /> : null}
                     {state.Meet ? <Meet /> : null}
                   
                 </View>
             </SafeAreaView>
      );

    }

    export default ChatTab;
 
 