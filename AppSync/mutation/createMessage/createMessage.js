import gql from 'graphql-tag';
export default gql`mutation sendMessage (
        $input: ChatInput!
  ){
        sendMessage(input: $input) {
        id
        chatId
    }
  }`;
  

//   {
//     "input": {
//             "chatId": "3c78d75f-d39a-4687-af39-8df587150bf4",
//             "id": "4671d0fb-30e5-4673-bc39-c3ff790e62b3",
//             "userId": "4671d0fb-30e5-4673-bc39-c3ff790e62b3",
//             "message": "Hiiii"
//     }

// query list{
//     listChat(chatId:"3c78d75f-d39a-4687-af39-8df587150bf4"){
//       items{
//         message
//       }
//     }
//   }
  