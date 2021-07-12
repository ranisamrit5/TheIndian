import gql from 'graphql-tag';
export default gql`query listUser($id:String! type: String!){
    listUser(id:$id type:$type){
        items{
      id
      profilePic
      fname
      lname
      partnerConnectStatus{
        status
      }
    }
    }
  }`;