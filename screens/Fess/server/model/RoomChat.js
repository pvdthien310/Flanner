export class RoomChat {
    _id
    memberArray = {}
    lastTime

    constructor(_id, memberArray, lastTime){
        this._id = _id
        this.memberArray = memberArray
        this.lastTime = lastTime
    }
    
    get _id(){
        return this._id;
    }

    set _id(val){
        this._id = val
    }

    get memberArray(){
        return this.memberArray
    }

    set memberArray(arrayVal){
        this.memberArray = arrayVal
    }

    get lastTime() {
        return this.lastTime;
    }

    set lastTime(val){
        this.lastTime = val
    }
}

// Firestore data converter
const roomchatConverter = {
    toFirestore: (roomChat) => {
        return {
            _id: roomChat._id,
            memberArray: roomChat.memberArray,
            lastTime: roomChat.lastTime
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new City(data._id, data.memberArray, data.lastTime);
    }
};