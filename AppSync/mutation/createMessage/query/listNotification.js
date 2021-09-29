import gql from 'graphql-tag';
export default gql `
query ListNotification($userId:String!){
    listNotification(userId:$userId){
 items{
        created_at
        data
        id
        profileViewBy
        seen
        tablename
        type
        partner{
          id
          fname
          lname
          gender
          profilePic
        }
      }
  }
}`;
