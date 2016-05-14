/**
 * Created by apple on 16/5/3.
 */
import apiDataGridReducer from "./api_datagrid/api_datagrid.reducer";
import apiContentReducer from "./api_content/api_content.reducer";
import apiGroupReducer from "./api_group/api_group.reducer";

const defaultState = {

    api_datagrid: {},

    api_content: {},

    api_group: {}

};

export default function reducer(state = defaultState, action) {

    state = Object.assign({}, state, {
        api_datagrid: apiDataGridReducer(state.api_datagrid, action)
    });

    state = Object.assign({}, state, {
        api_content: apiContentReducer(state.api_content, action)
    });

    state = Object.assign({}, state, {
        api_group: apiGroupReducer(state.api_group, action)
    });

    return state;

}