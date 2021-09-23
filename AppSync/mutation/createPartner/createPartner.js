import gql from 'graphql-tag';
export default gql`mutation CreatePartnerPreference(
    $input: CreatePartnerPreferenceInput!
  ) {
    createPartnerPreference(input: $input) {
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
partnerReligion
motherTongue
caste
star
manglik
education
occupation
annualIncome{
  to
  from
}
citizenship
lookingForGender
country
    }
  }
  `;
