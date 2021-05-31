import React, { useState, useCallback, useEffect } from 'react'

import
 { View,
   SafeAreaView,
   Text,
   StyleSheet,
   TouchableOpacity,
   FlatList,
   Image,
   ImageBackground
  } 
   from "react-native";




const Active = props => {
   
  let [data, setData] = useState([1, 2, 3, 4, 5,6,7,8.9,10]);

        return (
           
              
          <SafeAreaView style={{flex:1}}>
        
         <View style={{marginTop:20,borderWidth:0.5,borderColor:"gray",}}>
         <Text style={{fontSize:17,fontWeight:'600',padding:16,}}>Accepted Members</Text>
            <FlatList
                 data={data}
                 renderItem={({item})=>
                 <View style={{marginTop:10,width:'95%',alignSelf:'center'}}>
                    
                     <View  style={{flexDirection:'row',alignItems:'center',borderBottomWidth:0.5,marginBottom:10,}}>
                                    <ImageBackground style={{ width: 60, height: 60, overflow: 'hidden',
                                     borderRadius: 30,alignItems:'center',justifyContent:'flex-end',marginTop:10,marginBottom:5 }}
                                        source={require('../../Imagess/AllImage.jpg')} >
                                        <TouchableOpacity 
                                        // onPress={() => pickMultiple()}
                                        style={{ borderWidth: 0.3,  alignItems: 'center',justifyContent:'center', 
                                         borderRadius: 10, backgroundColor: '#1aba45', width: 15, height: 15,marginTop:50,marginLeft:10 }}>
                                            
                                           
                                        </TouchableOpacity>
                                        
                                    </ImageBackground>
                                    <View style={{marginLeft:15}}>
                                    <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:"center",alignSelf:"center"}}>
                                         <Text style={{fontSize:16,fontWeight:'600',width:210}}>Snehal Vaiday</Text>
                                         <Text style={{fontSize:13,color:"gray"}}>Online</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        
                                            <Text style={{fontSize:13}}>Software Developer/ Programmer</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                       
                                            <Text style={{fontSize:11}}>25 yrs,Pune</Text>
                                    </View>
                                </View>
                                  
                             </View>
                            
                   
                 </View>   } />
         </View>
     </SafeAreaView>
            
        );
    
}

export default Active;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  
  item: {
    margin: 10,
    // backgroundColor:"#000",
    
  },
  itemPhoto: {
    width:60,
    height:60,
    borderRadius:30,
    marginBottom:5,
  },
  itemText: {
    color: '#000',
    marginTop: 5,
  },
 
});