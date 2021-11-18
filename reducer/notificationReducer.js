const initState = {
    data: [],
    user_knowledge_notification:[],
    user_status_notification:[],
    user_system_notification:[],
    loading: true
}

 const NotificationReducer = (state = initState, action) => {

    if (action.type == 'ADD_DATA_NOTIFICATION') {

        
        const newState = {
            ...state,
            data: action.payload,
        }
        

        return newState;

    }

    if (action.type == 'DELETE_KNOWLEDGE_NOTIFICATION_BY_POSTID') {

        let newdata = state.user_knowledge_notification;
        newdata = newdata.filter(member => member.postID != action.payload._id)
       
        const newState = {
            ...state,
            user_knowledge_notification: newdata
        }
        return newState;

    }
    if (action.type == 'ADD_USER_KNOWLEDGE_NOTIFICATION') {
        
        
        const newState = {
            ...state,
            user_knowledge_notification: action.payload
        }
        

        return newState;

    }
    if (action.type == 'ADD_USER_STATUS_NOTIFICATION') {
        
        
        const newState = {
            ...state,
            user_status_notification: action.payload
        }
        

        return newState;

    }
    if (action.type == 'ADD_USER_SYSTEM_NOTIFICATION') {
        
        
        const newState = {
            ...state,
            user_system_notification: action.payload
        }

        return newState;

    }
    if (action.type == 'SET_LOADING_NOTIFICATION') {
        
        const newState = {
            ...state,
            loading: action.payload
        }
        return newState;
    }

    return state;
}
export default NotificationReducer;