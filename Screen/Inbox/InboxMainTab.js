import React, { useState,useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Dimensions,
    StatusBar,
    FlatList,
    Image,
    ImageBackground
} from 'react-native';
import utils from '../libs/config/utils'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Accepted from '../Inbox/Accepted'
import Contact from '../Inbox/Contact'
import Request from '../Inbox/Reqest'
import Received from '../Inbox/Received'
import SentItem from '../Inbox/SentItem'
import Deleted from '../Inbox/Deleted'
import { graphql, withApollo } from "react-apollo";
import compose from "lodash.flowright";
import { Auth } from "aws-amplify";
import listUser from "../../AppSync/query/ListUser";
import Loader from '../../Screen/Componentone/Loader';
const InboxMainTab = (props) => {
    // console.log('InboxMainTab:',props.route.params)
    let [loading, setLoading] = useState(false);
    const [id, setId] = useState('')
    const [selectClass, setSelectClass] = useState("Received");
    const [TopArray, setTopArray] = useState(['Received', 'Accepted', 'Sent Items', 'Contacts', 'Requests', 'Deleted']);
    let flatList_Ref;
    const [recieved_,setRecieved]= useState([]); 

    useEffect(() => {
        // setLoading(true)
        Auth.currentAuthenticatedUser()
            .then(async(data) => {
                console.log('Inbox---->::',data.username)
                setId(data.username)
                let activity = utils.userActivity(data.username,'RECIEVED',props)
                setRecieved(activity)
                await getRecieved(data.username);
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
        console.log('=====>',data)
        if(data && data.listUser && data.listUser.items && data.listUser.items > 0){
            console.log('=====>',data.listUser.items)
            props.route.params=data.listUser.items
            setRecieved(data.listUser.items)
            setLoading(false)
            setSelectClass("Received")
        }else{
            setSelectClass("Accepted")
            console.log('Else')
            // setSelectClass('Accepted')
        }
        // console.log('getRecieved====>', data.listUser.items)
    }
   const SelectItemFun=(item,index) =>{
        console.log('itemsss', item,index)
        setSelectClass(item)
        // this.setState({ SelectClass: item })
        flatList_Ref.scrollToIndex({animated: true,index:index,viewPosition: 0.5  });
        // index: index, animated: true, viewPosition: 0.5 
    }
    // render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ width: '95%', alignSelf: 'center', marginTop: 10 }}>
                    <FlatList horizontal={true}
 keyExtractor={(item, index) => index.toString()} 
                        data={TopArray}
                        ref={ref => {
                            flatList_Ref = ref;  // <------ ADD Ref for the Flatlist 
                          }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item,index }) =>
                            <View>
                                <TouchableOpacity style={{ borderWidth: 0.8, marginBottom: 10, marginRight: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 10, width: 150, height: 35 }}
                                    onPress={() => 
                                       {
                                        // this.goIndex()   
                                        SelectItemFun(item,index)}
                                    
                                    } >
                                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{item}</Text>
                                </TouchableOpacity>
                            </View>} />

                </View>
                {selectClass == 'Accepted' ?
                    <Accepted {...props} />
                    : null}
                {selectClass == 'Contacts' ?
                    <Contact {...props}/>
                    : null}
                {selectClass == 'Requests' ?
                    <Request {...props}/>
                    : null}
                {selectClass == 'Received' ?
                    <Received  {...props} />
                    : null}
                {selectClass == 'Sent Items' ?
                    <SentItem {...props}/>
                    : null}
                {selectClass == 'Deleted' ?
                    <Deleted {...props}/>
                    : null}
                {/* <SentItem/> */}
            </SafeAreaView>
        )
    }
    const profile = compose(
        withApollo,
        // graphql(updateUser, { name: "updateUser" })
    )(InboxMainTab);
    export default profile;
    // export default InboxMainTab;