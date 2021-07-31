import gql from 'graphql-tag';
export default gql`query GetPartnerPreference($id:String!){
    getPartnerPreference(id:$id){
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
  partnerReligion
  caste
  motherTongue
  star
  manglik
  education
  occupation
  annualIncome{
    to
    from
  }
  citizenship
  country
  lookingForGender
  
  
    
    }
  }`;
  