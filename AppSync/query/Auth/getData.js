import gql from 'graphql-tag';
export default gql`
query GetUser($id:String!){
  getUser(id:$id){
   tablename
id
fname
lname
mob
dob
maritalStatus
noOfChildren
height
weight
physicalStatus
religion
# familyDetails
viewContact
profilePic
gallery
caste
email
subcaste
motherTongue
languagesKnown
gotram
star
manglik
eatingHabit
smokingHabit
drinkingHabit
aboutMe
username
profileCreatedFor
education{
      highestEducation
      colg_institute
      eduDetails
      employedIn
      occupation
      occuDetails
      annualIncome
}
familyDetails{
      parentContact
      familyValue
      familyType
      familyStatus
      nativePlace
      fathersOccupation
      mothersOccupation
      noOfBrothers
      familyLocation
      noOfSisters
      aboutMyFamily
}
    birthCity
    birthState
    partnerPreference{
      id
      aboutPartner
      maritalStatus
      ageRange{
        to
        from
      }
      heightRange{
        from
        to
      }
      motherTongue
      physicalStatus
      eatingHabit
      smokingHabit
      drinkingHabit
      partnerReligion
      caste
      star
      manglik
      education
      occupation
      annualIncome{
        from
        to
      }
      citizenship
      country
      lookingForGender
  }
    birthCountry
    willingToMarry
hobbiesAndIntrest{
      Acting
      Aerobics
      Arabic
      Art_Handicraft
      Astrology
      Astronomy
      Athletics
      Badminton
      Baseball
      Bengali
      Bird_watching
      Blues
      Boxing_Wrestling
      Card_games
      Carrom
      Chess
      Chinese
      Classical_Opera
      Classical_song
      Clubbing
      Collectibles
      Continental
      Cooking
      Country_Music
      Cricket
      Cycling
      Dancing
      Disco
      Driving
      Eating_out
      Fast_food
      Film_song
      Filmsong
      Folk
      Ghazals
      Gujarati
      Gym_workouts
      Health_Fitness
      Hockey
      Hunting
      Interior_decoration
      Italian
      Japanese
      Jazz
      Konkan
      Latin_Music
      Maharashtrian
      Mehendi_Designing
      Mexican
      Motor_Racing
      Movies
      Nature
      North_Indian
      Painting_Drawing
      Photography
      Politics
      Polo
      Qawalis
      Rajasthani
      Reading
      Religion
      Rock
      Rugby
      Seafood
      Shooting
      Shopping
      Sindhi
      Singing
      Solving_Crosswords
      South_Indian
      Swimming
      Techno_Trance
      Technology
      Travel
      Trekking
      Volleyball
      Writing
      western_song
    }
    gender
    job
    expiryDate
    addOnPlan
    validity
    plan
    location{
      state
      zipcode
      country
      city
      citizenship
      grewUpIn
	    ethinicOrigin
    }

  
    
  }
}
`;