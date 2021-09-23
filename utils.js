
import Getdata from "./AppSync/query/Auth/getData";
import ViewContact from "./AppSync/query/viewContact";
import listUser from "./AppSync/query/ListUser";

// export async function sendWhatsApp(phoneWithCountryCode) {
//   let msg = 'type something';
//   let phoneWithCountryCode = '+91';

//   let mobile = Platform.OS == 'ios' ? phoneWithCountryCode : '+' + phoneWithCountryCode;
//   if (mobile) {
//     if (msg) {
//       let url = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
//       Linking.openURL(url).then((data) => {
//         console.log('WhatsApp Opened');
//       }).catch(() => {
//         alert('Make sure WhatsApp installed on your device');
//       });
//     } else {
//       alert('Please insert message to send');
//     }
//   } else {
//     alert('Please insert mobile no');
//   }
//  }

export async function getInboxData(props,userId,type)  {
  const { data } = await props.client.query({
      query: listUser,
      fetchPolicy: "network-only",
      variables: {
          id: `${userId}`,
          type:type
      },
  });
  console.log(type,'type====>', data)
  if(data && data.listUser && data.listUser.items){
      return data.listUser.items
  }else{
    return [];
  }
  
}

export async function updateIntrestData(props, tablename,status) {
  console.log("item::====>",tablename,status );
    const { data } =   await props
      .updateRequest({
        variables: {
          userId:id,
          tablename: `${recieved_[i]['tablename']}`,
          id: recieved_[i]['id'],
          status: status,
        },
      })
      .catch((error)=>{
        console.log(error);
    })
        return data;
    }
export async function  getUserDetails(props,userId) {
    const { data } = await props.client.query({
        query: Getdata,
        fetchPolicy: "network-only",
        variables: {
            id: `${userId}`,
        },
    }).catch((error)=>{
        console.log(error);
        // setLoading(false);
    })
    if (data && data.getUser) {
        return data.getUser;
    }
}


export async function  getContactDetails(props,userId,partnerId) {
    console.log(userId,partnerId)
      try {
        const { data } = await props.client.query({
          query: ViewContact,
          fetchPolicy: "network-only",
          variables: {
            partnerId: `${partnerId}`,
            userId: `${userId}`,
          },
        }).catch((error)=>{
            console.log(error);
            // setLoading(false);
        })
        
            console.log('Contact',data.seeContactDetails)
          // setContact(data.data.seeContactDetails)
        //   const { mob, parentContact, message } = data.data.seeContactDetails
          return data.seeContactDetails
    
      } catch (error) {
        return null
    }
  }