import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

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