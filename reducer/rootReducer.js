import * as reducers from "redux";
import { combineReducers } from "redux";
import DrawerControllerReducer from "./drawerReducer";
import JWTReducer from "./JWTReducer";
import KnowledgeReducer from "./knowledgeReducer";
import NotificationReducer from "./notificationReducer";
import ReportReducer from "./reportReducer";
import StatusReducer from "./statusReducer";
import UserReducer from "./userReducer";
import CommentReducer from "./commentReducer";

const RootReducer = combineReducers({
  Knowledge: KnowledgeReducer,
  User: UserReducer,
  Notification: NotificationReducer,
  Status: StatusReducer,
  DrawerController: DrawerControllerReducer,
  JWT: JWTReducer,
  Report: ReportReducer,
  Comment: CommentReducer,
});

export default RootReducer;
