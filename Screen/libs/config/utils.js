
import listUser from "../../../AppSync/query/ListUser";
module.exports.userActivity = async (userId,activity,props) => {

        console.log('id,activity ', userId,activity);
        const { data } = await props.client.query({
            query: listUser,
            fetchPolicy: "network-only",
            variables: {
                id: `${userId}`,
                type:'RECIEVED'
            },
        });
        console.log('==Utility===>',data)
        if(data && data.listUser && data.listUser.items && data.listUser.items > 0){
            // console.log('=Utility ====>',data.listUser.items)
            return data.listUser;
        }
};