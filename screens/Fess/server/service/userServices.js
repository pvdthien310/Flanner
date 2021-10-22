import { db } from "../../../../firebase/firebase";
import { 
    ref, 
    onValue, 
    set, 
    update
} from "firebase/database";
import { uploadImage } from "./storage";

///Get information about user with id
export const fetchUserData = async (_userId)=>{
    const userData ={
        key: '',
        name: '',
        avatar: ''
    }
    await onValue(ref(db, 'User'),
        (snapshot) => {
            userData.key = snapshot.key,
            userData.avatar = snapshot.child('avatar').val()
            userData.name = snapshot.child('name').val()
         }
    );

    console.log(userData)
    return userData
}


