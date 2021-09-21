
import {
    statusoption,
    annualoption,
    familyVal,
    familyType,
    castoption,
    heightoption,
    familyStatus,
    employoption,
} from "../Const/const";
import moment from "moment"
import * as timeago from 'timeago.js';
// import female from "../images/female.jpeg";
// import male from "../images/male.jpg";
const JM = require('json-mapper');


export const partnerDataMapper = JM.makeConverter({
    id: function (i) {
        if (i && i.id !== 'undefined') {
            return i.id;
        }
        return 'Not Specified';
    },
    aboutPartner: function (i) {
        if (i && i.aboutPartner !== 'undefined' && i.aboutPartner !== '') {
            return i.aboutPartner;
        }
        return 'Not Specified';
    },
    ageRange: function (i) {
        // console.log('HEIGHT',i.height)
        if (i && i.ageRange !== 'undefined' && i.ageRange !== null) {
            return `${i.ageRange.from} to ${i.ageRange.to}`
            // return heightoption.find((x) => x.value === parseInt(i.height)).title;
        }
        return 'Not Specified';
    },
    annualIncome: function (i) {
        if (i && i.annualIncome !== 'undefined') {
            return i.annualIncome;
        }
        return 'Not Specified';
    },
    caste: function (i) {
        if (i && i.caste !== 'undefined') {
            let pcaste = i.caste.includes('ANY')
            if (pcaste)
                return 'Any';
            else
                return i.caste.toString();
        }
        return 'Not Specified';
    },
    citizenship: function (i) {
        if (i && i.citizenship !== 'undefined') {
            return i.citizenship;
        }
        return 'Not Specified';
    },
    country: function (i) {
        if (i && i.country !== 'undefined') {
            return i.country.toString();
        }
        return 'Not Specified';
    },
    drinkingHabit: function (i) {
        if (i  && i.drinkingHabit !== 'undefined') {
            return i.drinkingHabit;
        }
        return 'Not Specified';
    },
    eatingHabit: function (i) {
        if (i && i.eatingHabit  !== 'undefined') {
            return i.eatingHabit;
        }
        return 'Not Specified';
    },
    education: function (i) {
        if (i && i.education !== 'undefined') {
            return i.education.toString();
        }
        return 'Not Specified';
    },
    heightRange: function (i) {
        if (i && i.heightRange && i.heightRange !== 'undefined') {
            let from =heightoption.find((x) => x.value == Number(i.heightRange.from)).data;
            let to =heightoption.find((x) => x.value == Number(i.heightRange.to)).data;
            return `${from} to ${to}`
        }
        return 'Not Specified';
    },
    lookingForGender: function (i) {
        if (i && i.lookingForGender !== 'undefined') {
            // return familyStatus.find((x) => x.value === i.familyStatus).title;
        }
        return 'Not Specified';
    },
    manglik: function (i) {
        if (i && i.manglik !== 'undefined') {
            // return familyType.find((x) => x.value === i.familyType).title;
        }
        return 'Not Specified';

    },
    maritalStatus: function (i) {
        if (i && i.maritalStatus !== 'undefined') {
            let answer = statusoption.filter(item => (
                i.maritalStatus.includes(item.value)
              )).map(item => item.title)
            return answer.toString();
        }
        return 'Not Specified';
    },
    occupation: function (i) {
        if (i && i.occupation !== 'undefined') {
            return i.occupation;
        }
        return 'Not Specified';
    },
    partnerReligion: function (i) {
        if (i && i.partnerReligion && i.partnerReligion !== 'undefined') {
            console.log('=========>',i.partnerReligion)
            return i.partnerReligion.toString();
        }
        return 'Free';
    },
    physicalStatus: function (i) {
        if (i && i.physicalStatus !== 'undefined') {
            console.log('=========>',i.physicalStatus)
            return i.physicalStatus;
        }
        return 'Not Specified';
    },
    parentContact: function (i) {
        if (i && i.parentContact !== 'undefined') {
            return i.parentContact;
        }
        return 'Not Specified';
    },
    profileCreatedFor: function (i) {
        if (i && i.data && i.data.profileCreatedFor && i.data.profileCreatedFor !== 'undefined') {
            
            return i.data.profileCreatedFor;
        }
      
        return 'Not Specified';
    },
    username: function (i) {
        if (i && i.data && i.data.username !== 'undefined') {
            return i.data.username;
        }
        return 'Not Specified';
    },
    motherTongue: function (i) {
        if (i && i.motherTongue !== 'undefined') {
            return i.motherTongue.toString();
        }
        return 'Not Specified';
    },
    smokingHabit: function (i) {
        if (i && i.smokingHabit !== 'undefined') {
            return i.smokingHabit;
        }
        return 'Not Specified';
    },
    dob: function (i) {
        if (i && i.data && i.data.dob !== 'undefined') {
            return moment(i.data.dob).format('LLLL');
        }
        return 'Not Specified';
    },
    familyValue: function (i) {
        if (i && i.familyValue !== 'undefined') {
            console.log('====>',i.familyValue)
            // return familyVal.find((x) => x.value === i.familyValue).title;
        }
        return 'Not Specified';
    },
    star: function (i) {
        if (i && i.star !== 'undefined') {
            
            // return familyStatus.find((x) => x.value === i.familyStatus).title;
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

