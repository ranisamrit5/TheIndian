import gql from 'graphql-tag';

export default gql`mutation UpdateIntrest($id: String!
    $status: String!
    $tablename: String!){
      updateIntrest(id:$id status:$status tablename:$tablename)
    }`;