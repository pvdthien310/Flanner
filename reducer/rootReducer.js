import * as reducers from 'redux'
import { combineReducers } from 'redux'
import  KnowledgeReducer  from './knowledgeReducer'
import NotificationReducer from './notificationReducer'
import StatusReducer from './statusReducer'
import  UserReducer  from './userReducer'

const RootReducer =  combineReducers({
  Knowledge: KnowledgeReducer,
  User: UserReducer,
  Notification: NotificationReducer,
  Status: StatusReducer
})

export default RootReducer;

