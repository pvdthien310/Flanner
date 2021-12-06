const initState = {
    data: [],
    user: {},
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
    if (action.type == 'UPDATE_USER') {
        let newdata = state.data;
        newdata = newdata.map(member => {
            if (member._id == action.payload._id)
                return action.payload
            else return member
        })

        const newState = {
            ...state,
            data: newdata
        }
        return newState;

    }
    return state;
}
export default UserReducer;