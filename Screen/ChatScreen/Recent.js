import React, { useState, useCallback, useEffect } from 'react'

import { SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    Image,
    ImageBackground } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Recent = props => {
    let [data, setData] = useState([1, 2, 3, 4, 5,6,7,8,9,10]);
    let [data1, setData1] = useState([1, 2, 3, 4, 5,6,7,8,9,10]);
        return (
            <SafeAreaView style={{flex:1,}}>
                
                <View >
                <Text style={{fontSize:18,fontWeight:"800",padding:15,}}>My Matches</Text>
                <FlatList style={{ height:150,alignSelf:"center",borderRadius:5,backgroundColor:"#fff"}} horizontal={true}
                        data={data1}
                        keyExtractor={(item, index) => index.toString()} 
                        showsHorizontalScrollIndicator={true}
                        renderItem={({item})=>
                        <View style={{marginTop:30,alignSelf:'center',height:"120%",marginLeft:5,alignItems:"center",}}>
                     <TouchableOpacity onPress={()=> props.navigation.navigate('MessageScreen')}>
                            
                            <ImageBackground style={{ width: 60, height: 60, overflow: 'hidden',
                                     borderRadius: 30,alignItems:'center',justifyContent:'flex-end',marginTop:10,marginBottom:5 }}
                                        source={require('../../Imagess/AllImage.jpg')} >
                                        <TouchableOpacity 
                                        style={{ borderWidth: 0.3,  alignItems: 'center',justifyContent:'center', 
                                         borderRadius: 10, backgroundColor: '#1aba45', width: 15, height: 15,marginTop:50,marginLeft:10 }}>
                                            
                                           
                                        </TouchableOpacity>
                                 </ImageBackground>
                                 </TouchableOpacity>
                                    <View style={{flexDirection:"column",justifyContent:"space-between",padding:5}}>
                                         <Text style={{fontSize:14,fontWeight:'600',alignItems:"center"}}>Snehal Vaiday</Text>
                                        
                                    </View>
                                   
                               
                          
                        </View>   } />
                        
                       
                   <FlatList  style={{backgroundColor:"#fff",marginTop:10}} 
                        data={data}
                        keyExtractor={(item, index) => index.toString()} 
                        showsVerticalScrollIndicator={false}
                        renderItem={({item})=>
                        <View style={{marginTop:30,width:'90%',alignSelf:'center',}}>
                            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',borderBottomWidth:0.5,}}  
                            onPress={()=>props.navigation.navigate('MessageScreen')}>
                                <Image style={{width:60,height:60,borderRadius:30,marginBottom:5,}}
                                   source={require('../../Imagess/HeroImage.jpeg')}
                                />
                                <View style={{marginLeft:15,}}>
                                    <View style={{flexDirection:'row',marginBottom:5,}}>
                                         <Text style={{fontSize:16,fontWeight:'600'}}>Snehal V</Text>
                                         <Text style={{fontSize:16,marginLeft:3}}>has viewed your Invitatio</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <Image style={{width:11,height:11}}
                                            source={require('../../Imagess/WhatchIcone.png')} />
                                            <Text style={{fontSize:11}}>19 Apr</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>   } />
                </View>
               
            </SafeAreaView>
        );
    
}

export default Recent;


// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   SectionList,
//   SafeAreaView,
//   Image,
//   FlatList,
//   TouchableOpacity
// } from 'react-native';
// import { TouchableHighlight } from 'react-native-gesture-handler';


    
//     const SECTIONS = [
//         {
//           title: 'My Matches',
//           horizontal: true,
//           data: [
//             {
//               key: '1',
//               text: 'Rahul v',
//               uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9oYVhpV1NXZOQhlc3KIT15yc1WTpQYW7ijREsF2BExbvgKag&s',
              
//             },
//             {
//               key: '2',
//               text: 'Rahul v',
//               uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQia4rHR21eXeZI3f1wZ4q3Vuwnm71YaPOACzV-isfgumOEJL3r&s',
//             },
      
//             {
//               key: '3',
//               text: 'Rahul v',
//               uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs83KruSzgrC69HlzvTNOOWpBnixIhGqD5UVPp0ib94RWxTKKe&s',
//             },
//             {
//               key: '4',
//               text: 'Rahul v',
//               uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQia4rHR21eXeZI3f1wZ4q3Vuwnm71YaPOACzV-isfgumOEJL3r&s',
//             },
//             {
//               key: '5',
//               text: 'Rahul v',
//               uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs83KruSzgrC69HlzvTNOOWpBnixIhGqD5UVPp0ib94RWxTKKe&s',
//             },
            
//           ],
//         },
//         {
          
//           data: [
//             {
//               key: '1',
//               text: 'Item text 1',
//               uri: 'https://picsum.photos/id/1011/200',
//             },
//             {
//               key: '2',
//               text: 'Item text 2',
//               uri: 'https://picsum.photos/id/1012/200',
//             },
      
//             {
//               key: '3',
//               text: 'Item text 3',
//               uri: 'https://picsum.photos/id/1013/200',
//             },
//             {
//               key: '4',
//               text: 'Item text 4',
//               uri: 'https://picsum.photos/id/1015/200',
//             },
//             {
//               key: '5',
//               text: 'Item text 5',
//               uri: 'https://picsum.photos/id/1016/200',
//             },
//             {
//               key: '6',
//               text: 'Item text 5',
//               uri: 'https://picsum.photos/id/1016/200',
//             },
//             {
//               key: '7',
//               text: 'Item text 5',
//               uri: 'https://picsum.photos/id/1016/200',
//             },
//           ],
//         },
      
//       ];
// const ListItem = ({ item, }) => {
//   return (
//     <SafeAreaView style={{ borderBottomWidth:0.5,borderTopWidth:0.5,marginTop:20,
//         }}>
//     <View style={styles.item}>
    
                                  
//       <Image
//         source={{
//           uri: item.uri,
//         }}
//         style={styles.itemPhoto}
//         resizeMode="cover"
//       />
//       <Text style={styles.itemText}>{item.text}</Text>

//     </View>
//     </SafeAreaView>
//   );
// };
// const ListItem1 = () => {
//     return (
//         <View style={{marginTop:20,width:'100%',}}>
//                                   <TouchableOpacity style={{flexDirection:'row',alignItems:'center',borderBottomWidth:0.5,}}  
//                                 //   onPress={()=>props.navigation.navigate('MessageScreen')}
//                                   >
//                                         <Image style={{width:60,height:60,borderRadius:30,marginBottom:5,}}
//                                            source={require('../../Imagess/HeroImage.jpeg')}
//                                         />
//                                         <View style={{marginLeft:15,}}>
//                                             <View style={{flexDirection:'row',marginBottom:5,}}>
//                                                  <Text style={{fontSize:16,fontWeight:'600'}}>Snehal V</Text>
//                                                  <Text style={{fontSize:16,marginLeft:3}}>has viewed your Invitation</Text>
//                                             </View>
//                                             <View style={{flexDirection:'row',alignItems:'center'}}>
//                                                 <Image style={{width:11,height:11}}
//                                                     source={require('../../Imagess/WhatchIcone.png')} />
//                                                     <Text style={{fontSize:11}}>19 Apr</Text>
//                                             </View>
//                                         </View>
//                                     </TouchableOpacity>
//                                 </View> 
//     );
//   };

//   export default () => {   
       
//   return (
//     <View style={styles.container}>
    
//       <SafeAreaView style={{ flex: 1 }}>
//         <SectionList
//           contentContainerStyle={{ paddingHorizontal: 10 }}
//           stickySectionHeadersEnabled={false}
//           sections={SECTIONS}
//           renderSectionHeader={({ section }) => (
//             <>
            
//             {/* <TouchableOpacity  onPress={()=>alert("Hi")}> */}
                                 
//               {section.horizontal ? (
//                 <FlatList
//                   horizontal
//                   data={section.data}
//                   renderItem={({ item }) => <ListItem item={item} />}
//                   showsHorizontalScrollIndicator={false}
//                 />
//               ) : null}
//               {/* </TouchableOpacity> */}
//             </>
            
//           )}
//           renderItem={({ item, section }) => {
//             if (section.horizontal) {
//               return null;
//             }
//             return <ListItem1 item={item} />;
//           }}
//         />
//       </SafeAreaView>
//     </View>
//   );
// };



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
    
//   },
  
//   item: {
//     margin: 10,
//     // backgroundColor:"#000",
    
//   },
//   itemPhoto: {
//     width:60,
//     height:60,
//     borderRadius:30,
//     marginBottom:5,
//   },
//   itemText: {
//     color: '#000',
//     marginTop: 5,
//   },
 
// });