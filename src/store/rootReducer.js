import { combineReducers } from "redux"    //yeni statelerimizi belirlememizi sağlayan şey reducerlarımızdır.
import { reducer as firebase } from "react-redux-firebase"



const rootReducer = combineReducers({
    firebase,
})

export default rootReducer;

