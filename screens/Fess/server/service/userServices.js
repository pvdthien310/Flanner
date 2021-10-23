import { db } from "../../../../firebase/firebase";
import { 
    ref, 
    onValue, 
    set, 
    update
} from "firebase/database";
import { uploadImage } from "./storageServices";

///Get information about user with id
export const fetchUserData = async (_userId)=>{
    const userData ={
        key: '',
        name: '',
        avatar: ''
    }
    await onValue(ref(db, 'Users/'+ _userId),
        (snapshot) => {
            userData.key = snapshot.key,
            userData.avatar = snapshot.child('avatar').val()
            userData.name = snapshot.child('name').val()
         }
    );

    console.log(userData)
    return userData
}


export const getAllUser = async ()=>{
    const list = []
    await onValue(ref(db, 'Users'),
    (snapshot) => {
        snapshot.forEach((childSnapshot ) =>{
            const info = {
                _id: '',
                name: '',
                avatar: ''
            }

            info._id = childSnapshot.key
            info.name = childSnapshot.child('name').val()
            info.avatar = childSnapshot.child('avatar').val()

            list.push(info)
        });
        
      }
    );
    return list
}

