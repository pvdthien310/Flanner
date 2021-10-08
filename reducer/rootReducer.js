import * as reducers from 'redux'
import { combineReducers } from 'redux'
import  KnowledgeReducer  from './knowledgeReducer'
import  UserReducer  from './userReducer'

const RootReducer =  combineReducers({
  Knowledge: KnowledgeReducer,
  User: UserReducer
})

export default RootReducer;

