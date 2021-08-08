
import {
    statusoption,
    annualoption,
    familyVal,
    familyType,
    heightoption,
    familyStatus,
    employoption,
} from "../Const/const";
import moment from "moment"
import * as timeago from 'timeago.js';
// import female from "../images/female.jpeg";
// import male from "../images/male.jpg";
const JM = require('json-mapper');

import female from "../../Imagess/female.jpeg";
import male from "../../Imagess/male.jpg";
export const userDataMapper = JM.makeConverter({
    id: function (i) {
        if (i && i.data && i.data.id !== 'undefined') {
            return i.data.id;
        }
        return 'Not Specified';
    },
    height_: function (i) {
        if (i && i.data && i.data.height !== 'undefined' && i.data.height !== '') {
            return i.data.height ? i.data.height : '0'
        }
        return 'Not Specified';
    },
    height: function (i) {
        // console.log('HEIGHT',i.data.height)
        if (i && i.data && i.data.height !== 'undefined' && i.data.height !== null) {
            return heightoption.find((x) => x.value === parseInt(i.data.height)).title;
        }
        return 'Not Specified';
    },
    fname: function (i) {
        if (i && i.data && i.data.fname !== 'undefined') {
            return i.data.fname;
        }
        return 'Not Specified';
    },
    lname: function (i) {
        if (i && i.data && i.data.lname !== 'undefined') {
            return i.data.lname;
        }
        return 'Not Specified';
    },
    gotram: function (i) {
        if (i && i.data && i.data.gotram !== 'undefined') {
            return i.data.gotram;
        }
        return 'Not Specified';
    },
    city: function (i) {
        if (i && i.data && i.data.location && i.data.location.city !== 'undefined') {
            return i.data.location.city;
        }
        return 'Not Specified';
    },
    state: function (i) {
        if (i && i.data && i.data.location && i.data.location.state !== 'undefined') {
            return i.data.location.state;
        }
        return 'Not Specified';
    },
    zipcode: function (i) {
        if (i && i.data && i.data.location && i.data.location.zipcode !== 'undefined') {
            return i.data.location.zipcode;
        }
        return 'Not Specified';
    },
    grewUpIn: function (i) {
        if (i && i.data && i.data.location && i.data.location.grewUpIn !== 'undefined') {
            return i.data.location.grewUpIn;
        }
        return 'Not Specified';
    },
    ethinicOrigin: function (i) {
        if (i && i.data && i.data.location && i.data.location.ethinicOrigin !== 'undefined') {
            return i.data.location.ethinicOrigin;
        }
        return 'Not Specified';
    },
    country: function (i) {
        if (i && i.data && i.data.location && i.data.location.country !== 'undefined') {
            return i.data.location.country;
        }
        return 'Not Specified';
    },
    citizenship: function (i) {
        if (i && i.data && i.data.location && i.data.location.citizenship !== 'undefined') {
            return i.data.location.citizenship;
        }
        return 'Not Specified';
    },
    aboutMyFamily: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.aboutMyFamily !== 'undefined') {
            return i.data.familyDetails.aboutMyFamily;
        }
        return 'Not Specified';
    },
    familyDetails: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails !== 'undefined') {
            return  i.data.familyDetails;
        }
        return 'Not Specified';
    },
    familyStatus: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.familyStatus !== 'undefined') {
            return familyStatus.find((x) => x.value === i.data.familyDetails.familyStatus).title;
        }
        return 'Not Specified';
    },
    familyType: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.familyType !== 'undefined') {
            return familyType.find((x) => x.value === i.data.familyDetails.familyType).title;
        }
        return 'Not Specified';

    },
    fathersOccupation: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.fathersOccupation !== 'undefined') {
            return i.data.familyDetails.fathersOccupation;
        }
        return 'Not Specified';
    },
    mothersOccupation: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.mothersOccupation !== 'undefined') {
            return i.data.familyDetails.mothersOccupation;
        }
        return 'Not Specified';
    },
    plan: function (i) {
        if (i && i.data && i.data.plan && i.data.plan !== 'undefined') {
            console.log('=========>',i.data.plan)
            return i.data.plan;
        }
        return 'Free';
    },
    nativePlace: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.nativePlace !== 'undefined') {
            console.log('=========>',i.data.familyDetails.nativePlace)
            return i.data.familyDetails.nativePlace;
        }
        return 'Not Specified';
    },
    noOfBrothers_: function (i) {
        // console.log('noOfBrothers==>',i.data.familyDetails.noOfBrothers)
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.noOfBrothers !== 'undefined' && i.data.familyDetails.noOfBrothers !== null) {
            console.log('noOfBrothers=========>',i.data.familyDetails.noOfBrothers)
            if (i.data.familyDetails.noOfBrothers != '0_0' || i.data.familyDetails.noOfBrothers != '0') {
                let data = i.data.familyDetails.noOfBrothers;
                let broCount = Number(data.split('_')[0]) + Number(data.split('_')[1])
                if(broCount == '0'){
                    return '0';
                }
                return `${broCount} out of ${data.split('_')[1]} Married`
            }
            else
                return '0';
        }
        return '0';
    },
     noOfBrothers: function (i) {
        // console.log('noOfBrothers==>',i.data.familyDetails.noOfBrothers)
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.noOfBrothers !== 'undefined') {
            return i.data.familyDetails.noOfBrothers;
        }
        return 'Not Specified';
    },
    noOfSisters: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.noOfSisters !== 'undefined') {
            return i.data.familyDetails.noOfSisters;
        }
        return 'Not Specified';
    },
    noOfSisters_: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.noOfSisters !== 'undefined') {
            if (i.data.familyDetails.noOfSisters != '0_0' || i.data.familyDetails.noOfSisters != '0') {
                let data = i.data.familyDetails.noOfSisters;
                let broCount = Number(data.split('_')[0]) + Number(data.split('_')[1]);
                if(broCount == '0'){
                    return '0';
                }
                return `${broCount} out of ${data.split('_')[1]} Married`
            }
            else
                return '0';
        }
        return 'Not Specified';
    },
    nativePlace: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.nativePlace !== 'undefined') {
            return i.data.familyDetails.nativePlace;
        }
        return 'Not Specified';
    },
    parentContact: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.parentContact !== 'undefined') {
            return i.data.familyDetails.parentContact;
        }
        return 'Not Specified';
    },
    // religion: function (i) {
    //     if (i && i.data && i.data.religion !== 'undefined') {
    //         return i.data.religion;
    //     }
    //     return 'Not Specified';
    // },
    // religion: function (i) {
    //     if (i && i.data && i.data.religion !== 'undefined') {
    //         return i.data.religion;
    //     }
    //     return 'Not Specified';
    // },
    religion: function (i) {
        if (i && i.data && i.data.religion !== 'undefined') {
            return i.data.religion;
        }
        return 'Not Specified';
    },
    familyValue: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.familyValue !== 'undefined') {
            console.log('====>',i.data.familyDetails.familyValue)
            return familyVal.find((x) => x.value === i.data.familyDetails.familyValue).title;
        }
        return 'Not Specified';
    },
    familyStatus: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.familyStatus !== 'undefined') {
            
            return familyStatus.find((x) => x.value === i.data.familyDetails.familyStatus).title;
        }
        return 'Not Specified';
    },
    annualIncome: function (i) {
        console.log('i.data.education.annualIncome',i.data.education.annualIncome)
        if (i && i.data && i.data.education  && i.data.education.annualIncome !== 'undefined') {
            return i.data.education.annualIncome;
        }
        return '12';
    },
    maritalStatus: function (i) {
        if (i && i.data && i.data.maritalStatus !== 'undefined' && i.data.maritalStatus !== null) {
            return statusoption.find((x) => x.value === i.data.maritalStatus).title;
        }
        return 'NOT_SPECIFIED';
    },
    maritalStatus_: function (i) {
        if (i && i.data && i.data.maritalStatus !== 'undefined'&& i.data.maritalStatus !== null) {
            return i.data.maritalStatus
        }
        return 'NOT_SPECIFIED';
    },
    colg_institute: function (i) {
        if (i && i.data && i.data.education && i.data.education.colg_institute !== 'undefined') {
            return i.data.education.colg_institute;
        }
        return 'Not Specified';
    },
    eduDetails: function (i) {
        if (i && i.data && i.data.education && i.data.education.eduDetails !== 'undefined') {
            return i.data.education.eduDetails;
        }
        return 'Not Specified';
    },
    employedIn: function (i) {
        if (i && i.data && i.data.education && i.data.education.employedIn !== 'undefined') {
            return i.data.education.employedIn;
        }
        return 'NOT_SPECIFIED';
    },
    highestEducation: function (i) {
        console.log('highestEducation',i.data.education.highestEducation)
        if (i && i.data && i.data.education && i.data.education.highestEducation !== 'undefined') {
            return i.data.education.highestEducation;
        }
        return 'Not Specified';
    },
    occuDetails: function (i) {
        if (i && i.data && i.data.education && i.data.education.occuDetails !== 'undefined') {
            return i.data.education.occuDetails;
        }
        return 'Not Specified';
    },
    occupation: function (i) {
        if (i && i.data && i.data.education && i.data.education.occupation !== 'undefined') {
            return i.data.education.occupation;
        }
        return 'Not Specified';
    },
    gender_: function (i) {
        if (i && i.data && i.data.gender !== 'undefined') {
            return i.data.gender;
        }
        return 'Not Specified';
    },
    gender: function (i) {
        if (i && i.data && i.data.gender !== 'undefined') {
            return i.data.gender === "MALE" ? 'Male' : 'Female';
        }
        return 'Not Specified';
    },
    him_her: function (i) {
        if (i && i.data && i.data.gender !== 'undefined') {
            return i.data.gender === "MALE" ? 'He' : 'She';
        }
        return 'Not Specified';
    },
    age: function (i) {
        if (i && i.data && i.data.dob !== 'undefined') {
            console.log(i.data.dob)
            console.log('AGE',getAge(i.data.dob))
            return getAge(moment(i.data.dob).utc().format('YYYY-MM-DD'));
        }
        return 'Not Specified';
    },
    //moment(data_.dob).utc().format('YYYY-MM-DD')
    dob: function (i) {
        if (i && i.data && i.data.dob !== 'undefined') {
            return moment(i.data.dob).utc().format('YYYY-MM-DD');
        }
        return 'Not Specified';
    },
    active: function (i) {
        if (i && i.data && i.data.lastActive !== 'undefined') {
            return timeago.format(parseInt(i.data.lastActive));
        }
        return 'Not Specified';
    },
    gallery: function (i) {
        if (i && i.data && i.data.gallery && i.data.gallery !== 'undefined') {
            return i.data.gallery;
        }
        return 'Not Specified';
    },
    username: function (i) {
        if (i && i.data && i.data.username !== 'undefined') {
            return i.data.username;
        }
        return 'Not Specified';
    },
    profileCreatedFor: function (i) {
        if (i && i.data && i.data.profileCreatedFor && i.data.profileCreatedFor !== 'undefined') {
            
            return i.data.profileCreatedFor;
        }
      
        return 'Not Specified';
    },
    profilePic: function (i) {
        if (i && i.data && i.data.profilePic && i.data.profilePic !== 'undefined' && i.data.profilePic !== null) {
            console.log(i.data.profilePic)
            return i.data.profilePic.replace(/\s/g, '+');
        }
        return null;
        // else if (i && i.data && i.data.gender && i.data.gender !== 'undefined' && i.data.gender !== null)
        //     return i.data.gender == 'MALE'?male:female;
    },
    motherTongue: function (i) {
        if (i && i.data && i.data.motherTongue &&i.data.motherTongue !== 'undefined') {
            return capitalizeFirstLetter(i.data.motherTongue);
        }
        return 'Not Specified';
    },
    caste: function (i) {
        if (i && i.data && i.data.caste !== 'undefined') {
            return i.data.caste;
        }
        return 'Not Specified';
    },
    interest: function (i) {
        if (i && i.data && i.data.interest !== 'undefined') {
            return i.data.interest;
        }
        return 'Not Specified';
    },
    request: function (i) {
        if (i && i.data && i.data.request !== 'undefined') {
            return i.data.request;
        }
        return 'Not Specified';
    },
    aboutMe: function (i) {
        if (i && i.data && i.data.aboutMe !== 'undefined') {
            return i.data.aboutMe;
        }
        return 'Not Specified';
    },
    partnerConnectStatus: function (i) {
        if (i && i.data && i.data.partnerConnectStatus !== 'undefined') {
            return i.data.partnerConnectStatus;
        }
        return 'Not Specified';
    },
    partnerPreference: function (i) {
        if (i && i.data && i.data.partnerPreference !== 'undefined') {
            return i.data.partnerPreference;
        }
        return 'Not Specified';
    },
    connectStatusForMe: function (i) {
        if (i && i.data && i.data.connectStatusForMe !== 'undefined') {
            return i.data.connectStatusForMe;
        }
        return 'Not Specified';
    },
    physicalStatus: function (i) {
        if (i && i.data && i.data.physicalStatus !== 'undefined') {
            return i.data.physicalStatus == 'NORMAL' ? 'Normal' : 'Physically Challenged' ;
        }
        return 'Not Specified';
    },
    physicalStatus_: function (i) {
        if (i && i.data && i.data.physicalStatus !== 'undefined') {
            return i.data.physicalStatus; ;
        }
        return 'Not Specified';
    },
    subcaste: function (i) {
        if (i && i.data && i.data.subcaste !== 'undefined') {
            return i.data.subcaste ;
        }
        return 'Not Specified';
    },
    manglik: function (i) {
        if (i && i.data && i.data.manglik !== 'undefined') {
            return i.data.manglik ;
        }
        return 'Not Specified';
    },
})

//timeago.format(parseInt(item.lastActive))
const capitalizeFirstLetter = (s) => {
    console.log('MotherTong',s)
    let str = s.toLowerCase()
    return str[0].toUpperCase() + str.slice(1);
}

const getAge = (dateString) => {
    console.log('date string',dateString)
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

// : "3"
// colg_institute: "N-A"
// : null
// : "SELFEMPLOYED"
// : "BE"
// : null
// : "IT"

