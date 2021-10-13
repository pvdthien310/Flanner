const initState = {
    data: [],
    loading: true,
    user_knowledge: []
}

const KnowledgeReducer = (state = initState, action) => {

    if (action.type == 'ADD_DATA_KNOWLEDGE') {


        const newState = {
            ...state,
            data: action.payload
        }
        return newState;

    }
    if (action.type == 'ADD_USER_KNOWLEDGE') {


        const newState = {
            ...state,
            user_knowledge: action.payload
        }
        return newState;

    }
    if (action.type == 'UPDATE_KNOWLEDGE_MEMBER') {
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