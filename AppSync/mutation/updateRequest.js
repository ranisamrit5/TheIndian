import gql from 'graphql-tag';

export default gql`mutation UpdateIntrest($id: String!
      $userId:String!
      $status: String!
      $tablename: String!){
      updateIntrest(id:$id userId:$userId status:$status tablename:$tablename)
    }`;