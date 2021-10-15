export class Message{
    _id
    text
    image
    createdAt
    roomId
    sender
    constructor(messageId, text, image, createdAt, sender){
        this._id = messageId
        this.text = text
        this.image = image
        this.createdAt = createdAt
        this.sender =sender
    }

    get roomId(){
        return this.roomId
    }

    set roomId(val){
        this.roomId=val
    }
    
    get _id(){
        return this._id
    }

    set _id(val){
        this._id=val
    }

    get text(){
        return this.text
    }

    set text(val){
        this.text = val
    }

    get image(){
        return this.image
    }

    set image(val){
        this.image = val
    }

    get createdAt(){
        return this.createdAt
    }

    set CreatedAt(val){
        this.createdAt = val
    }

    get roomId(){
        return this.roomId
    }

    set roomId(val){
        this.roomId = val
    }

    get sender(){
        return this.sender
    }

    set sender(val){
        this.sender = val
    }


}

// Firestore data converter
const messageConverter = {
    toFirestore: (message) => {
        return {
            _id: message._id,
            text: message.text,
            image: message.image,
            createdAt: message.createdAt,
            roomId: message.roomId,
            sender: message.sender
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new City(data._id, data.text, data.image, data.createdAt, data.roomId, data.sender);
    }
};