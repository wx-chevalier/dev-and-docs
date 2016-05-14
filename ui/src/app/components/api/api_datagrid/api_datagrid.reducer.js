/**
 * Created by apple on 16/5/3.
 */
//引入本部分所需要处理的Actions
import * as apiDataGridActions from "./api_datagrid.action";
/**
 * @function 本部分默认的State结构
 * @type {{tableList: Array}}
 */
const defaultState = {
};

/**
 * @function 默认的Reducer
 * @param state
 * @param action
 * @returns {{tableList: Array}}
 */
export default function reducer(state = defaultState, action) {
    switch (action.type) {

        case apiDataGridActions.FETCH_DATA:
            //如果是选择了获取数据
            return state;
        case apiDataGridActions.UPDATA_DATA:
            //如果选择了更新数据
            return Object.assign({}, state, {tableList: action.tableList});
        default:
            return state;
    }
}