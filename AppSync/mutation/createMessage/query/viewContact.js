import gql from 'graphql-tag';
export default gql`
query SeeContactDetails($partnerId:String! $userId:String!){
    seeContactDetails(partnerId:$partnerId userId:$userId){
    mob
    parentContact
    message
    email
  }}

`;