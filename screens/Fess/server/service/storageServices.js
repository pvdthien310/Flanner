import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { store } from "../../../../firebase/firebase";

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

    console.log("URL      " + url)
    return url
}