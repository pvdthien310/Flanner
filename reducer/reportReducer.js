const initState = {
    data: [],
    loading: true
}

const ReportReducer = (state = initState, action) => {

    if (action.type == 'ADD_DATA_REPORT') {
        const newState = {
            ...state,
            data: action.payload
        }
        return newState;
    }
    if (action.type == 'UPDATE_REPORT') {
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
export default ReportReducer;