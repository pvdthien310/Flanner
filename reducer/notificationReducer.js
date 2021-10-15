const initState = {
    data: [],
    user_notification:[],
    loading: true
}

 const NotificationReducer = (state = initState, action) => {

    if (action.type == 'ADD_DATA') {

        
        const newState = {
            ...state,
            data: action.payload
        }

        return newState;

    }
    if (action.type == 'ADD_USER_NOTIFICATION') {

        
        const newState = {
            ...state,
            user_notification: action.payload
        }

        return newState;

    }
    if (action.type == 'SET_LOADING') {
        
        const newState = {
            ...state,
            loading: action.payload
        }
        return newState;
    }

    return state;
}
export default NotificationReducer;