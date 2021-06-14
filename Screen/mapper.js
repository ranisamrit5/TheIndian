
import {
    profileoption,
    religionoption,
    chidoption,
    languageoption,
    statusoption,
    annualoption,
    familyVal,
    familyType,
    heightoption,
    countryoption,
    familyStatus,
    stateoption,
    cityoption,
    rassioption,
    castoption,
    degreeoption,
    employoption,
    employeeption,
} from "./Const/const";
import moment from "moment"
import * as timeago from 'timeago.js';
// import female from "../images/female.jpeg";
// import male from "../images/male.jpg";
const JM = require('json-mapper');


export const userDataMapper = JM.makeConverter({
    id: function (i) {
        if (i && i.data && i.data.id !== 'undefined') {
            return i.data.id;
        }
        return;
    },
    height: function (i) {
        if (i && i.data && i.data.height !== 'undefined') {
            return heightoption.find((x) => x.value === parseInt(i.data.height)).title;
        }
        return;
    },
    fname: function (i) {
        if (i && i.data && i.data.fname !== 'undefined') {
            return i.data.fname;
        }
        return;
    },
    lname: function (i) {
        if (i && i.data && i.data.lname !== 'undefined') {
            return i.data.lname;
        }
        return;
    },
    city: function (i) {
        if (i && i.data && i.data.location && i.data.location.city !== 'undefined') {
            return i.data.location.city;
        }
        return;
    },
    state: function (i) {
        if (i && i.data && i.data.location && i.data.location.state !== 'undefined') {
            return i.data.location.state;
        }
        return;
    },
    country: function (i) {
        if (i && i.data && i.data.location && i.data.location.country !== 'undefined') {
            return i.data.location.country;
        }
        return;
    },
    aboutMyFamily: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.aboutMyFamily !== 'undefined') {
            return i.data.familyDetails.aboutMyFamily;
        }
        return;
    },
    familyStatus: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.familyStatus !== 'undefined') {
            return familyStatus.find((x) => x.value === i.data.familyDetails.familyStatus).title;
        }
        return;
    },
    familyType: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.familyType !== 'undefined') {
            return familyType.find((x) => x.value === i.data.familyDetails.familyType).title;
        }
        return;

    },
    fathersOccupation: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.fathersOccupation !== 'undefined') {
            return i.data.familyDetails.fathersOccupation;
        }
        return;
    },
    mothersOccupation: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.mothersOccupation !== 'undefined') {
            return i.data.familyDetails.mothersOccupation;
        }
        return;
    },
    nativePlace: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.nativePlace !== 'undefined') {
            return i.data.familyDetails.nativePlace;
        }
        return;
    }, noOfBrothers: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.noOfBrothers !== 'undefined') {
            return i.data.familyDetails.noOfBrothers;
        }
        return;
    },
    noOfSisters: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.noOfSisters !== 'undefined') {
            return i.data.familyDetails.noOfSisters;
        }
        return;
    }, nativePlace: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.nativePlace !== 'undefined') {
            return i.data.familyDetails.nativePlace;
        }
        return;
    },
    parentContact: function (i) {
        if (i && i.data && i.data.familyDetails && i.data.familyDetails.parentContact !== 'undefined') {
            return i.data.familyDetails.parentContact;
        }
        return;
    },
    // religion: function (i) {
    //     if (i && i.data && i.data.religion !== 'undefined') {
    //         return i.data.religion;
    //     }
    //     return;
    // },
    // religion: function (i) {
    //     if (i && i.data && i.data.religion !== 'undefined') {
    //         return i.data.religion;
    //     }
    //     return;
    // },
    religion: function (i) {
        if (i && i.data && i.data.religion !== 'undefined') {
            return i.data.religion;
        }
        return;
    },
    annualIncome: function (i) {
        if (i && i.data && i.data.education && i.data.education.annualIncome !== 'undefined') {

            return annualoption.find((x) => x.value === parseInt(i.data.education.annualIncome)).title;
        }
        return;
    },
    maritalStatus: function (i) {
        if (i && i.data && i.data.maritalStatus !== 'undefined') {
            return statusoption.find((x) => x.value === i.data.maritalStatus).title;
        }
        return;
    },
    colg_institute: function (i) {
        if (i && i.data && i.data.education && i.data.education.colg_institute !== 'undefined') {
            return i.data.education.colg_institute;
        }
        return;
    },
    eduDetails: function (i) {
        if (i && i.data && i.data.education && i.data.education.eduDetails !== 'undefined') {
            return i.data.education.eduDetails;
        }
        return;
    },
    employedIn: function (i) {
        if (i && i.data && i.data.education && i.data.education.employedIn !== 'undefined') {
            return employoption.find((x) => x.value === i.data.education.employedIn).title;
        }
        return;
    },
    highestEducation: function (i) {
        if (i && i.data && i.data.education && i.data.education.highestEducation !== 'undefined') {
            return i.data.education.highestEducation;
        }
        return;
    },
    occuDetails: function (i) {
        if (i && i.data && i.data.education && i.data.education.occuDetails !== 'undefined') {
            return i.data.education.occuDetails;
        }
        return;
    },
    occupation: function (i) {
        if (i && i.data && i.data.education && i.data.education.occupation !== 'undefined') {
            return i.data.education.occupation;
        }
        return;
    },
    gender: function (i) {
        if (i && i.data && i.data.gender !== 'undefined') {
            return i.data.gender === "MALE" ? 'Male' : 'Female';;
        }
        return;
    },
    him_her: function (i) {
        if (i && i.data && i.data.gender !== 'undefined') {
            return i.data.gender === "MALE" ? 'He' : 'She';
        }
        return;
    },
    age: function (i) {
        if (i && i.data && i.data.dob !== 'undefined') {
            return getAge(i.data.dob);
        }
        return;
    },
    //moment(data_.dob).utc().format('YYYY-MM-DD')
    dob: function (i) {
        if (i && i.data && i.data.dob !== 'undefined') {
            return moment(i.data.dob).utc().format('YYYY-MM-DD');
        }
        return;
    },
    active: function (i) {
        if (i && i.data && i.data.lastActive !== 'undefined') {
            return timeago.format(parseInt(i.data.lastActive));
        }
        return;
    },
    gallery: function (i) {
        if (i && i.data && i.data.gallery && i.data.gallery !== 'undefined') {
            return i.data.gallery;
        }
        return;
    },
    username: function (i) {
        if (i && i.data && i.data.username !== 'undefined') {
            return i.data.username;
        }
        return;
    },
    profileCreatedFor: function (i) {
        if (i && i.data && i.data.profileCreatedFor && i.data.profileCreatedFor !== 'undefined') {
            
            return i.data.profileCreatedFor;
        }
      
        return;
    },
    profilePic: function (i) {
        if (i && i.data && i.data.profilePic && i.data.profilePic !== 'undefined') {
            console.log(i.data.profilePic)
            return i.data.profilePic.replace(/\s/g, '+');
        }
        // else if(i && i.data && i.data.gender){
        //     return i.data.profileCreatedFor = i.data.gender
        // }
        // else 
            return;
            // return i.data.profileCreatedFor = female;
    },
    motherTongue: function (i) {
        if (i && i.data && i.data.motherTongue &&i.data.motherTongue !== 'undefined') {
            return capitalizeFirstLetter(i.data.motherTongue);
        }
        return;
    },
    caste: function (i) {
        if (i && i.data && i.data.caste !== 'undefined') {
            return i.data.caste;
        }
        return;
    },
    interest: function (i) {
        if (i && i.data && i.data.interest !== 'undefined') {
            return i.data.interest;
        }
        return;
    },
    request: function (i) {
        if (i && i.data && i.data.request !== 'undefined') {
            return i.data.request;
        }
        return;
    },
    aboutMe: function (i) {
        if (i && i.data && i.data.aboutMe !== 'undefined') {
            return i.data.aboutMe;
        }
        return;
    },
    partnerConnectStatus: function (i) {
        if (i && i.data && i.data.partnerConnectStatus !== 'undefined') {
            return i.data.partnerConnectStatus;
        }
        return;
    },
    partnerPreference: function (i) {
        if (i && i.data && i.data.partnerPreference !== 'undefined') {
            return i.data.partnerPreference;
        }
        return;
    },
    connectStatusForMe: function (i) {
        if (i && i.data && i.data.connectStatusForMe !== 'undefined') {
            return i.data.connectStatusForMe;
        }
        return;
    },
    physicalStatus: function (i) {
        if (i && i.data && i.data.physicalStatus !== 'undefined') {
            return i.data.physicalStatus == 'NORMAL' ? 'Normal' : 'Physically Challenged' ;
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

