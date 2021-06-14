import gql from 'graphql-tag';
export default gql`mutation CreateTranction(
    $input: TranctionInput!
  ) {
    createTranction(input: $input) {
        userId
        id
        txId
        created_at
        amount
        name
        planType
        data
    }
  }
  `;
