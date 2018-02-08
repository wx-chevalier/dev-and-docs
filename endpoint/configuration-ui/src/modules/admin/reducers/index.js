/**
 * Created by apple on 16/5/3.
 */
import {combineReducers} from "redux";
import api from "../../../app/components/api/api.reducer";

const rootReducer = combineReducers({
    api
});

export default rootReducer
