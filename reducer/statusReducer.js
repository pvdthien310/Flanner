const initState = {
    data: [],
    loading: true
}

 const StatusReducer = (state = initState, action) => {

    if (action.type == 'ADD_DATA_STATUS') {

        console.log('aaa')
        const newState = {
            ...state,
            data: action.payload
        }

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