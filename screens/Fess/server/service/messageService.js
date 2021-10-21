import { database, store } from "../../../../firebase/firebase";
import { addDoc, collection, setDoc, doc } from "firebase/firestore/lite";
import { set } from "react-native-reanimated";
import { getDatabase, ref, onValue} from "firebase/database";
import { uploadImage } from "./storage";


const db = getDatabase()

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

export const addNewTextMessage = (_text, _createdAt, _user, roomId )=>{
    const messageInfo ={_text,_createdAt, _user}
    console.log("messageInfo "+ messageInfo)


    set(ref(db, 'ChatRoom/'+ roomId +"Messages"), {
        createdAt: messageInfo._createdAt,
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

export const addNewImageMessage = async (_id,_image, _createdAt, _user, roomId )=>{
    const messageInfo ={_image,_createdAt, _user}

    //console.log("messageInfo "+ messageInfo)

    const url = (await uploadImage(_id, _image, roomId)).toString()

    await set(ref(db, "ChatRoom/"+roomId+"/Messages"), {
        createdAt: messageInfo._createdAt,
        image: url,
        user: messageInfo._user
    })
}

export const fetchAllMessage = async (_userId)=>{
    const data = null
    onValue(ref(db, 'ChatRoom'), (snapshot) => {
        data = snapshot.val();
    console.log(data)
    });
    return data;
}


