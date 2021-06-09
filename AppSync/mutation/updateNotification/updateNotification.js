import gql from 'graphql-tag';
export default gql`mutation UpdateNotification(
    $input: NotificationInput!
   ) {
     updateNotification(input: $input) {
       seen
     }
   }`;
