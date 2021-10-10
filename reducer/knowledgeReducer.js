const initState = {
    data: [],
    loading: true
}

 const KnowledgeReducer = (state = initState, action) => {

    if (action.type == 'ADD_DATA_KNOWLEDGE') {

      
        const newState = {
            ...state,
            data: action.payload
        }
        console.log(newState)

        return newState;

    }
    if (action.type == 'SET_LOADING_KNOWLEDGE') {
        
        const newState = {
            ...state,
            loading: action.payload
        }
        return newState;
    }

    return state;
}
export default KnowledgeReducer;