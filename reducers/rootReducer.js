// import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import commentReducer from "./commentReducer";
import postsReducer from "./postsReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
	// user: userReducer, was going to make another screen for a profile view of all user details. [Time]
	users: usersReducer,
	comments: commentReducer,
	posts: postsReducer
})
 export default rootReducer;
