/**
 * Created by apple on 16/5/3.
 */
//引入本部分所需要处理的Actions
import * as dataBaseActions from "./database.action";
/**
 * @function 本部分默认的State结构
 * @type {{databaseList: Array}}
 */
const defaultState = {};

/**
 * @function 默认的Reducer
 * @param state
 * @param action
 * @returns {{tableList: Array}}
 */
export default function reducer(state = defaultState, action) {
    
    

    switch (action.type) {

        case dataBaseActions.FETCH_DATA:
            //如果是选择了获取数据
            return state;
        case dataBaseActions.UPDATE_DATA:
            //如果选择了更新数据
            return Object.assign({}, state, {dataBaseList: action.dataBaseList});
        default:
            return state;
    }
}