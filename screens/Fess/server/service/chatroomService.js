import { db } from "../../../../firebase/firebase";
import { 
    ref, 
    onValue, 
    set, 
    update
} from "firebase/database";
import { uploadImage } from "./storageServices";

///Send a text message to a friend
// export const addNewTextMessage = async (_text, _createdAt, _user, roomId )=>{
//     const messageInfo ={_text,_createdAt, _user}

//     console.log("messageInfo "+ messageInfo)
//     const collectionRef = collection(db, "ChatRoom/"+roomId+"/Messages");
//     const payload = {
//         createdAt: messageInfo._createdAt,
//         text : messageInfo._text,
//         user: messageInfo._user
//     };

//     console.log(payload)
//     await addDoc(collectionRef, payload).then(
//         (error)=>{
//             console.log(error)
//         }
//     )
// }

export const addNewTextMessage = async(_id,_text, _createdAt, _user, roomId )=>{
    const messageInfo ={_id,_text,_createdAt, _user}
    console.log("messageInfo "+ messageInfo)

    const user1 ='123'
    const user2 = '456'

    const unSeen1 ='9'
    const unSeen2 = '8'

    //Nếu là tin nhắn đầu tiên, gọi addListUserToChatRoom

    //Cập nhật unSeen
    const listUser = [user1.valueOf(), user2.valueOf()]
    const listUnSeen = [unSeen1.valueOf(), unSeen2.valueOf()]
    const updateSeen = {
        listUser, // tạm thời để xử lí
        listUnSeen,
        lasttime: _createdAt
    }

    update(ref(db,'/ChatRoom/' + roomId ), updateSeen)

    //Thêm tin nhắn 
    await set(ref(db, 'ChatRoom/'+ roomId +'/Messages/'+_id), {
        createdAt: messageInfo._createdAt.toString(),
        text: messageInfo._text,
        user: messageInfo._user
    }); 

}

///Send a image message to a friend
// export const addNewImageMessage = async (_id,_image, _createdAt, _user, roomId )=>{
//     const messageInfo ={_image,_createdAt, _user}

//     //console.log("messageInfo "+ messageInfo)

//     const url = (await uploadImage(_id, _image, roomId)).toString()

//     const collectionRef = collection(db, "ChatRoom/"+roomId+"/Messages");
//     const payload = {
//         createdAt: messageInfo._createdAt,
//         image : url,
//         user: messageInfo._user
//     };

//      await addDoc(collectionRef, payload).then(
//          (error)=>{
//              console.log(error)
//          }
//      )
// }

export const addNewImageMessage =  async (_id,_image, _createdAt, _user, roomId )=>{
    const messageInfo ={_image,_createdAt, _user}

    //console.log("messageInfo "+ messageInfo)

    const url = await uploadImage(_id, _image, roomId)

    set(ref(db, "ChatRoom/"+roomId+"/Messages/"+_id), {
        createdAt: messageInfo._createdAt.toString(),
        image: url,
        user: messageInfo._user
    })
}

///Fetch all message in chat rooms of user
export const fetchAllChatRoom = async (_userId)=>{

    const allData =[]
    await onValue(ref(db, 'ChatRoom'),
        (snapshot) => {
            snapshot.forEach((childSnapshot ) =>{
                if (childSnapshot.key.includes(_userId)){
                    const roomChat = {
                        _id,
                        object
                    }
                    roomChat._id = childSnapshot.key
                    roomChat.object = childSnapshot
                    allData.push(roomChat)
                }
            });
            console.log(allData)
         }
    );
    return allData
}

const addListUserToChatRoom = async (listUser)=>{
    await set(ref(db, 'ChatRoom/'+ roomId ), {
        listUser
    });
}

