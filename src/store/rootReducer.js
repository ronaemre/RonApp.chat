import { combineReducers } from "redux"    //yeni statelerimizi belirlememizi sağlayan şey reducerlarımızdır.
import { reducer as firebase } from "react-redux-firebase"
import channelReducer from "./reducers/channelReducer";


const rootReducer = combineReducers({
    firebase,
    channels: channelReducer,
})

export default rootReducer;

