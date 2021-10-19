import { db, store } from "../../../../firebase/firebase";
import { addDoc, collection, setDoc, doc } from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

///Send a text message to a friend
export const addNewTextMessage = async (_text, _createdAt, _user, roomId )=>{
    const messageInfo ={_text,_createdAt, _user}

    console.log("messageInfo "+ messageInfo)
    const collectionRef = collection(db, "ChatRoom/"+roomId+"/Messages");
    const payload = {
        createdAt: messageInfo._createdAt,
        text : messageInfo._text,
        user: messageInfo._user
    };

    console.log(payload)
    await addDoc(collectionRef, payload).then(
        (error)=>{
            console.log(error)
        }
    )
}

///Send a image message to a friend
export const addNewImageMessage = async (_id,_image, _createdAt, _user, roomId )=>{
    const messageInfo ={_image,_createdAt, _user}

    //console.log("messageInfo "+ messageInfo)

    const url = (await uploadImage(_id, _image, roomId)).toString()

    const collectionRef = collection(db, "ChatRoom/"+roomId+"/Messages");
    const payload = {
        createdAt: messageInfo._createdAt,
        image : url,
        user: messageInfo._user
    };

     await addDoc(collectionRef, payload).then(
         (error)=>{
             console.log(error)
         }
     )
}

export const uploadImage = async(_id, uri, _roomId)=>{
    const imageRef = ref(store, "RoomChat/"+_roomId+"Images/"+_id)

    const respone = await fetch(uri)
    const blob = await respone.blob()

    await uploadBytes(imageRef, blob).then(
        (snapshot)=>{
           
        }, 
        (error)=>{
            console.log(error)
        }
    )

    const url = await getDownloadURL(imageRef).catch((error)=>{
        throw error;
    })
    //console.log(url)
    return url
}