// MARITALSTATUS
//-------------
// DIVORCED
// AWAITING_DIVORCE
// WIDOW
// WIDOWER
// ANNULLED
// SINGLE
// ANY


// PHYSICALSTATUS
//--------------------
// NORMAL
// PHYSICALLY_CHALLENGED


// EATINGHABIT
//-----------------
// VEG
// NONVEG
// EGG
// VEGAN

//MANGLIK
//---------
// YES
// NO
// UNKNOWN


import gql from 'graphql-tag';
export default gql`mutation UpdatePartnerPreference(
   $input: UpdatePartnerPreferenceInput!
  ) {
    updatePartnerPreference(input: $input) {
    id
aboutPartner
maritalStatus
ageRange{
  to
  from
}
heightRange{
  to
  from
}
physicalStatus
eatingHabit
smokingHabit
drinkingHabit
religion
caste
star
manglik
education
occupation
annualIncome
citizenship
country
  }
  222
  }`;