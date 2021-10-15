import { db } from "../../../../firebase/firebase";
import { addDoc, collection, setDoc, doc } from "firebase/firestore/lite";
import { Message } from "../model/Message";

///Send a message to a friend
export const addNewMessage = async (_id, _text, _createdAt, _user, roomId )=>{
    const messageInfo ={_id, _text, _createdAt, _user}
    console.log(messageInfo._text)
    const collectionRef = collection(db, "ChatRoom/"+roomId+"/Messages");
    const payload = {
        createdAt: messageInfo._createdAt,
        //text : messageInfo.text,
        user: messageInfo._user
    };
    await addDoc(collectionRef, payload);
}

///