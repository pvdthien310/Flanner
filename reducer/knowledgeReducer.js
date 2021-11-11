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
        console.log('do day ne thang ngu')
        console.log(newState.user_knowledge)
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
    if (action.type == 'DELETE_USER_KNOWLEDGE_MEMBER') {
        let newdata = state.user_knowledge;
        newdata = newdata.filter(member => member._id != action.payload._id)
       
        const newState = {
            ...state,
            user_knowledge: newdata
        }
        return newState;

    }
    if (action.type == 'UPDATE_USER_KNOWLEDGE_MEMBER') {
        let newdata = state.user_knowledge;
        newdata = newdata.map(member => {
            if (member._id == action.payload._id)
                return action.payload
            else return member
        })
        
        // console.log(newdata)
        const newState = {
            ...state,
            user_knowledge: newdata
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