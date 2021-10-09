const initState = {
    data: [],
    loading: true
}

 const KnowledgeReducer = (state = initState, action) => {

    if (action.type == 'ADD_DATA') {

        console.log('aaa')
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
export default KnowledgeReducer;