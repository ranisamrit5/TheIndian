import React, { useEffect, useState ,useRef} from 'react';
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
//import MultiSlider from '@ptomasroos/react-native-multi-slider'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Loader from '../../Screen/Componentone/Loader';
import { Auth } from "aws-amplify";
import updateUser from "../../AppSync/mutation/User/updateData";
import { graphql, withApollo } from "react-apollo";
import compose from "lodash.flowright";
import Getdata from "../../AppSync/query/Auth/getData";
import { userDataMapper } from '../Mappers/mapper'
import MultiSelect from 'react-native-multiple-select';
import _ from 'lodash';
//import RangeSlider from 'rn-range-slider';
//import RangeSlider from 'react-native-range-slider'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
    statusoption, heightoption,motherTongue, countryoption,
     castoption,religionoption,education_
} from "../Const/const";
import createPartner from "../../AppSync/mutation/createPartner/createPartner";
import GetPartnerPreference from "../../AppSync/query/getPreference";
const PartnerPreference = (props) => {
    
    let multiSelect = useRef(null)
    const [id,setId]=useState()
    const [loading, setLoading] = useState(true);
    const [value, setValues] = useState([]);
    const  [lookingForGender,setGender]=useState()
    const [ageto,setAgeTo]=useState(0)
    const [agefrom,setAgeFrom]=useState(0)
    const [heightto,setHeightTo]=useState(0)
    const [heightfrom,setHeightFrom]=useState(0)
    const [more,setMore]=useState(false)
    const [selectedItems,setSelectedItems]=useState([])
    const [selectedReligion,setSelectedReligion]=useState([])
    const [selectedCaste,setSelectedCaste]=useState([])
    const [motherTongue_,setMothertongue]=useState([])
    const [qualification,setQualification]=useState([])
    const [country,setCountry]=useState([])
    const [show,setShow]=useState([])
    const [basicInfo,setBasicInfo]=useState({
      id:'',
      pare:''
    })
    useEffect(() => {
        let edu=[{id:'Any',title:'Any'}]
        for(edudata of education_){
             edu.push({id:edudata,title:edudata})
        }
        setValues(edu)
        setLoading(true)
        Auth.currentAuthenticatedUser()
            .then((data) => {
                setId(data.username)
                getData(data.username)
                });
    }, []
    )
    const getData = async (user) => {
        const { data } = await props.client.query({
            query: GetPartnerPreference,
            fetchPolicy: "network-only",
            variables: {
                id: `${user}`,
            },
        });
        if (data && data.getPartnerPreference) {
            let userData = data.getPartnerPreference
            console.log('getPartnerPreference',userData)
            setAgeTo(userData.ageRange.to)
            setAgeFrom(userData.ageRange.from)
            setHeightTo(userData.heightRange.to)
            setHeightFrom(userData.heightRange.from)
            setSelectedItems(userData.maritalStatus.length > 0 ?userData.maritalStatus:[])
            setSelectedReligion(userData.partnerReligion.length > 0 ?userData.partnerReligion:[])
            setSelectedCaste(userData.caste.length > 0 ?userData.caste:[])
            setMothertongue(userData.motherTongue.length > 0 ? userData.motherTongue:[])
            setCountry(userData.country.length > 0 ? userData.country:[])
            setQualification(userData.education.length > 0 ? userData.education:[])
            console.log('userPD', userData)
            let all = {}
            all.data = data.getUser
            setBasicInfo({
                ...basicInfo,
                id: user,

            });
        }
        setLoading(false)
    }

    const multiSliderValuesChange = (values) => {
        console.log('values', values[0],values[1])
        setAgeTo(values[1])
        setAgeFrom(values[0])
        // this.setState({ MinValue: values[0] })
        // this.setState({ MaxmimuValue: values[1] })
    };
    const HieghtValueChange = (values) => {
        console.log('hieght value', values[0],values[1])
        setHeightFrom(values[0])
        setHeightTo(values[1])
    }
    const  onSelectedItemsChange = val => {
        setSelectedItems(val);
        let maritial=_.includes(val,'ANY');
        if(maritial){
            setSelectedItems(['ANY']);
        }
      };
    const onSelectedReligionChange = (val) =>{
        console.log('REL',val)
        setSelectedReligion(val)
        let religion_=_.includes(val,'ANY');
        if(religion_){
            setSelectedReligion(['ANY']);
        }

    }
    const onSelectedCasteChange = (val) =>{
        console.log('REL',val)
        setSelectedCaste(val)
        let caste_=_.includes(val,'Any');
        if(caste_){
            setSelectedCaste(['Any']);
        }

    }
    const onSelectedMotherTongueChange = (val) =>{
        console.log('REL',val)
        setMothertongue(val)
        let mt=_.includes(val,'Any');
        if(mt){
            setMothertongue(['Any']);
        }

    }
    const onSelectedCountryChange = (val) =>{
        console.log('REL',val)
        setCountry(val)
        let country_=_.includes(val,'ANY');
        if(country_){
            setCountry(['ANY']);
        }

    }
    const onSelectedEducationChange = (val) =>{
        console.log('REL',val)
        setQualification(val)
        let country_=_.includes(val,'ANY');
        if(country_){
            setQualification(['ANY']);
        }

    }

    const handleSubmit = async (e) => {
        console.log(agefrom)
        setLoading(true)
        try {
            await props
              .createPartner({
                variables: {
                  input: {
                    id: id,
                    // manglik: manglik,
                    maritalStatus: selectedItems,
                    physicalStatus: 'NORMAL',
                    caste: selectedCaste,
                    // star: stars,
                    // aboutPartner: aboutPartner,
                    // eatingHabit: eatingHabit,
                    // smokingHabit: smokingHabit,
                    // drinkingHabit: drinkingHabit,
                    partnerReligion: selectedReligion,
                    education: qualification,
                    // occupation: occupation,
                    motherTongue:motherTongue_,
                    // annualIncome: annualIncome,
                    // citizenship: citizenship,
                    country: country,
                    // lookingForGender:lookingForGender,
                    ageRange: {
                      to: ageto,
                      from: agefrom,
                    },
      
                    heightRange: {
                      to: heightto,
                      from: heightfrom,
                    },
                  },
                },
              })
              .then(async ({ data }) => {
                console.log("partnerpreference::", data);
              })
              .catch((err) => {
                console.log(`${JSON.stringify(err)}`);
              });
          } catch (e) {
             console.log('ERROR');
          }
        setLoading(false)
    }
    // onSelectedEducationChange(data)}


    // const changeHandler = (e) => {
        // console.log('Religion',value)
    //     return;
    //     setAllValues( prevValues => {
    //     return { ...prevValues,[e.target.name]: e.target.value}
    //  })
    // }


        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Loader loading={loading} />
                <View style={{flexDirection:'row',width:'100%',alignItems:'center',backgroundColor:'#FF5733',height:50}}>
                        <TouchableOpacity style={{marginLeft:20}} onPress={()=>props.navigation.pop()}>
                            <Image style={{width:20,height:20,tintColor:'white',transform: [{ rotate: '180deg'}]}}
                                source={require('../../Imagess/ErrorVector.png')} />
                        </TouchableOpacity>
                       <View style={{width:'80%'}}>
                            <Text style={{alignSelf:'center',fontSize:18,fontWeight:'600',color:'white'}}>Partner Preferences</Text>
                       </View>
                </View>
                <ScrollView>
                    <View style={{backgroundColor:'#d3d3d3',height:40,justifyContent:'center'}}>
                        <Text style={{marginLeft:10,fontSize:14,fontWeight:'500'}}>Tell us what you are looking for in a life partner</Text>
                    </View>
                    <View style={{ width: '90%',flex:1, alignSelf: 'center',marginTop:10 }}>
                        <View >
                            <Text style={{ fontSize: 16 }}>Age</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 14, fontWeight: '500' }}>Min {agefrom} Year</Text>
                                <Text style={{ fontSize: 14, fontWeight: '500' }}>Max {ageto} Year</Text>
                            </View>
                        </View>
                        <MultiSlider style={{ width: '100%' }}
                            selectedStyle={{ backgroundColor: '#38ACEC' }}
                            values={[
                                agefrom,
                                ageto
                            ]}
                            onValuesChange={(data)=>multiSliderValuesChange(data)}
                            min={18}
                            max={55}
                            step={1}
                        />
                        <View >
                            <Text style={{ fontSize: 16 }}>Height</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 14, fontWeight: '500' }}>Min {heightoption.find((x) => x.value === parseInt(heightfrom)).title}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '500' }}>Max {heightoption.find((x) => x.value === parseInt(heightto)).title}</Text>
                            </View>
                        </View>
                        <MultiSlider style={{ width: '100%' }}
                            selectedStyle={{ backgroundColor: '#38ACEC' }}
                            values={[
                                heightfrom,
                                heightto,
                            ]}
                            onValuesChange={(data)=>HieghtValueChange(data)}
                            min={0}
                            max={27}
                            step={1}
                        />
                      <View style={{ flex: 1 }}>
                            <MultiSelect
                            // hideTags
                            ref={(component) => { multiSelect = component }}
                            items={statusoption}
                            uniqueKey="value"
                            onSelectedItemsChange={(data)=>onSelectedItemsChange(data)}
                            selectedItems={selectedItems}
                            selectText={`    Marital Status `}
                            searchInputPlaceholderText="Search..."
                            tagRemoveIconColor="red"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="title"
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor="#CCC"
                            submitButtonText="Submit"
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <MultiSelect
                            // hideTags
                            ref={(component) => { multiSelect = component }}
                            items={religionoption}
                            uniqueKey="title"
                            onSelectedItemsChange={(data)=>onSelectedReligionChange(data)}
                            selectedItems={selectedReligion}
                            selectText={`    Religion `}
                            searchInputPlaceholderText="Search..."
                            tagRemoveIconColor="red"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="title"
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor="#CCC"
                            submitButtonText="Submit"
                            />
                        </View>
                          <View style={{ flex: 1 }}>
                            <MultiSelect
                            // hideTags
                            ref={(component) => { multiSelect = component }}
                            items={castoption}
                            uniqueKey="title"
                            id='caste'
                            onSelectedItemsChange={(data) => onSelectedCasteChange(data)}setSelectedCaste
                            // onSelectedItemsChange={changeHandler}
                            selectedItems={selectedCaste}
                            selectText={`    Caste `}
                            searchInputPlaceholderText="Search..."
                            tagRemoveIconColor="red"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="title"
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor="#CCC"
                            submitButtonText="Submit"
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <MultiSelect
                            // hideTags
                            ref={(component) => { multiSelect = component }}
                            items={motherTongue}
                            uniqueKey="title"
                            id='caste'
                            onSelectedItemsChange={(data) => onSelectedMotherTongueChange(data)}
                            // onSelectedItemsChange={changeHandler}
                            selectedItems={motherTongue_}
                            selectText={`    Mother Tongue `}
                            searchInputPlaceholderText="Search..."
                            tagRemoveIconColor="red"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="title"
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor="#CCC"
                            submitButtonText="Submit"
                            />
                        </View>


                        <View style={{marginTop:10,width:'90%',alignItems:'center',alignSelf:'center'}} >
                            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}
                                 onPress={()=>{more?setMore(false):setMore(true)}
                                //  this.setState({PartenerData:!this.state.PartenerData})
                            } 
                                 >
                                <Text style={{fontSize:18,fontWeight:'500',color:'#38ACEC'}}>More</Text>
                                <Image style={{width:25,height:20,tintColor:'#38ACEC'}}
                                    source={require('../../Imagess/arrowiconVc.png')}  />
                            </TouchableOpacity>
                        </View>
                        {more ?
                        <View style={{marginTop:10}}>
                            <Text style={{fontSize:14,color:'red'}}>Location Details</Text>
                            <View style={{ flex: 1 }}>
                            <MultiSelect
                            // hideTags
                            ref={(component) => { multiSelect = component }}
                            items={countryoption}
                            uniqueKey="name"
                            // id='country'
                            onSelectedItemsChange={(data) => onSelectedCountryChange(data)}
                            // onSelectedItemsChange={changeHandler}
                            selectedItems={country}
                            selectText={`    Country Living in `}
                            searchInputPlaceholderText="Search..."
                            tagRemoveIconColor="red"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor="#CCC"
                            submitButtonText="Submit"
                            />
                        </View>
                            <Text style={{fontSize:14,color:'red',marginTop:15}}>Education & Career</Text>
                            <View style={styles.ViewContener}>
                                <Text style={{fontSize:14,fontWeight:'400'}}>Qualification</Text>
                                <View style={{ flex: 1 }}>
                            <MultiSelect
                            // hideTags
                            ref={(component) => { multiSelect = component }}
                            items={value}
                            uniqueKey="id"
                            id='education'
                            onSelectedItemsChange={(data) => onSelectedEducationChange(data)}
                            // onSelectedItemsChange={changeHandler}
                            selectedItems={qualification}
                            selectText={`    Education`}
                            searchInputPlaceholderText="Search..."
                            tagRemoveIconColor="red"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="title"
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor="#CCC"
                            submitButtonText="Submit"
                            />
                        </View>
                            </View>
                            <Text style={{fontSize:14,color:'red',marginTop:15}}>Suggested qualification level for you</Text>
                            <View></View>
                        </View>:null}
                        <View style={{marginTop:20}}>
                            <TouchableOpacity 
                            onPress={() => { handleSubmit() }}
                            style={{width:'100%',alignSelf:'center',height:45,backgroundColor:'#38ACEC',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:18,color:'white'}}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        )
    }

const Login = compose(
    withApollo,
    graphql(createPartner, {name: 'createPartner'}),
)(PartnerPreference);
export default Login;

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: 'red'
    // },
    // columnView: {
    //     flexDirection: 'column',
    //     padding: 15,
    //     marginTop: 15,
    //     borderRadius: 5,
    //     backgroundColor: 'white',
    //     // ...shadow(5)
    // },
    HeaderText: {
        fontSize: 16
    },
    ViewContener:{
        padding:5,
        borderBottomWidth:1,
        marginTop:5,
    }
});



