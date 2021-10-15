export class ChatUser {
    _id
    name
    avatarUrl

    constructor(_id, name, avatarUrl) {
        this._id = _id;
        this.name = name;
        this.avatarUrl = avatarUrl;

    }

    get Id() {
        return this._id
    }

    get Name() {
        return this.name
    }

    get AvatarUrl() {
        return this.url;
    }

    set Id(val) {
        this._id = val
    }

    set Name(val) {
        this.name = val
    }

    set AvatarUrl(urlVal) {
        this.avatar = urlVal
    }
}

// Firestore data converter
const chatuserConverter = {
    toFirestore: (chatUser) => {
        return {
            _id: chatUser._id,
            name: chatUser.name,
            avatarUrl: chatUser.avatarUrl
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new City(data._id, data.name, data.avatarUrl);
    }
};