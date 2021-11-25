const initState = {
     _chosen: 1,
    data:[]
}

 const DrawerControllerReducer = (state = initState, action) => {

    if (action.type == 'UPDATE_FEATURE') {
        // console.log('aaa')
        const newState = {
            ...state,
            _chosen: action.payload
        }
        return newState;
    }
        return state;
}
export default DrawerControllerReducer;