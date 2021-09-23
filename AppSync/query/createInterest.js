import gql from 'graphql-tag';
export default gql`query CreateIntrest($userId:String! $partnerId:String! $interest:Boolean!){
    createIntrest(
      userId:$userId,
      partnerId:$partnerId,
      interest:$interest
    )
  }`
  ;