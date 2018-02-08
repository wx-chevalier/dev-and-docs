/**
 * Created by apple on 16/5/3.
 */
import {combineReducers} from "redux";
import api from "../../../app/components/api/api.reducer";
import auth from "../../../app/components/auth/auth.reducer";
import database from "../../../app/components/database/database.reducer";

const rootReducer = combineReducers({
    api,
    auth,
    database
});

export default rootReducer
