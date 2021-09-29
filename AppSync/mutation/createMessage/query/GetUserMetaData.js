import gql from 'graphql-tag';
export default gql`query GetUserMetaData($userId:String!){
    getUserMetaData(userId:$userId){
        username
        fname
        lname
        profilePic
        gender
        contactView
        recentVisitor
        acceptedInvitation
        pendingInvitation
        plan
        validity
        mob
        email
        partnerPreference
        education
        familyDetails
        eatingHabit
        caste
        progress
    }
    }`;