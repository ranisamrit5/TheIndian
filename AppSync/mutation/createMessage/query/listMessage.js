import gql from 'graphql-tag';
export default gql `query listChat{
    listChat(
      sortDirection:false
      chatId:"3c78d75f-d39a-4687-af39-8df587150bf4"
   ){
      items{
        id
        message
        chatId
        userId
        created_at
      }
      nextToken
    }
  }`;