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
  religion
  caste
  star
  manglik
  education
  occupation
  annualIncome
  citizenship
  country
  lookingForGender
  
  
    
    }
  }`;
  