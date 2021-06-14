import gql from 'graphql-tag';
export default gql`query ListUser($nextToken:String $limit:Int $type:String!  $id:String! ){
    listUser(id:$id nextToken:$nextToken  limit: $limit type:$type ){
         items{
            id
            fname
            gender
            profilePic
            age
            height
            caste
            availability
            religion
            motherTongue
            aboutMe
            location{
            state
            country
            city
          }
          familyDetails{
            parentContact
          }
          education{
            colg_institute
            annualIncome
            employedIn
            occuDetails
            occupation
            highestEducation
          }
            interest{
            status
            tablename
            id
          }
      
      }
  }
  }`
  ;