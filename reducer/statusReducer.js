const initState = {
    data: [],
    loading: true,
    user_status: []
}

 const StatusReducer = (state = initState, action) => {

    if (action.type == 'ADD_USER_STATUS') {
        // console.log('aaa')
        const newState = {
            ...state,
            user_status: action.payload
        }
        return newState;
    }
    
    if (action.type == 'ADD_DATA_STATUS') {
        // console.log('aaa')
        const newState = {
            ...state,
            data: action.payload
        }
        return newState;
    }


    if (action.type == 'UPDATE_STATUS_MEMBER')
    {
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

    if (action.type == 'UPDATE_USER_STATUS_MEMBER') {
        let newdata = state.user_status;
        newdata = newdata.map(member => {
            if (member._id == action.payload._id)
                return action.payload
            else return member
        })
        
        // console.log(newdata)
        const newState = {
            ...state,
            user_status: newdata
        }
        return newState;

    }
    if (action.type == 'DELETE_USER_STATUS_MEMBER') {
        let newdata = state.user_status;
        newdata = newdata.filter(member => member._id != action.payload._id)
       
        const newState = {
            ...state,
            user_status: newdata
        }
        console.log('vao day r ')
        return newState;

    }


    if (action.type == 'SET_LOADING_STATUS') {
        
        const newState = {
            ...state,
            loading: action.payload
        }
        return newState;
    }

    return state;
}
export default StatusReducer;