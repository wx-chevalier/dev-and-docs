/**
 * Created by apple on 16/5/3.
 */
import {combineReducers} from "redux";
import api from "../../../app/components/api/api.reducer";
import auth from "../../../app/components/auth/auth.reducer";

const rootReducer = combineReducers({
    api,
    auth
});

export default rootReducer
