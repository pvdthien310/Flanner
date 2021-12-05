const initState = {
    refreshToken: '',
    accessToken: '' ,
}

const JWTReducer = (state = initState, action) => {

   if (action.type == 'ADD_JWT_DATA') {
       // console.log('aaa')
       const newState = {
           ...state,
           accessToken: action.payload.accessToken,
           refreshToken: action.payload.refreshToken
       }
       console.log('token is loaded')
       return newState;
   }
   if (action.type == 'UPDATE_ACESS_TOKEN') {
    // console.log('aaa')
    const newState = {
        ...state,
        accessToken: action.payload,
    }
    console.log('access token is updated')
    return newState;
}
       return state;
}
export default JWTReducer;