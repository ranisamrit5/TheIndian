import gql from 'graphql-tag';
export default gql `query ListPlans{
    listPlan{
      items{
        tablename
        id
        type
        days
        rate
        viewContact
        desc
      }
    }
  }`;