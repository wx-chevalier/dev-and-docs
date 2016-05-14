/**
 * Created by apple on 16/5/9.
 */
/**
 * Created by apple on 16/5/3.
 */
import keyReducer from "./key/key.reducer";

const defaultState = {

    key: {}

};

export default function reducer(state = defaultState, action) {

    state = Object.assign({}, state, {
        key: keyReducer(state.key, action)
    });

    return state;

}