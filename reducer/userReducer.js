const initState = {
    data: [],
    user: {userID : 'pvdthien310', avatar :'1', name: 'Thien Pham'},
    loading: true
}

const UserReducer = (state = initState, action) => {

    if (action.type == 'ADD_DATA_USER') {
        const newState = {
            ...state,
            data: action.payload
        }
        return newState;
    }

    if (action.type == 'ADD_USER') {
        const newState = {
            ...state,
            user: action.payload
        }
        return newState;
    }
    if (action.type == 'SET_LOADING_USER') {
        const newState = {
            ...state,
            loading: action.payload
        }
        return newState;
    }
    return state;
}
export default UserReducer;