const initState = {
    data: [],
    loading: false
}

export const reducer = (state = initState, action) => {
    if (action.type == 'ADD_DATA') {


        const newState = {
            ...state,
            data: action.payload
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