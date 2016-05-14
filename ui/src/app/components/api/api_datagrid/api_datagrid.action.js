/**
 * Created by apple on 16/5/3.
 */
import TableModel from "../../../models/database/table";

const tableModel = new TableModel();

export const FETCH_DATA = "API_DATAGRID_FETACH_DATA";

/**
 * @function 请求获取数据
 * @param options
 * @returns {function()}
 */
export function fetchData(options) {

    return (dispatch)=> {

        tableModel.getTablesAndColumns().then((tableList)=> {
            dispatch(updateData(tableList));
        });
    }
}

export const UPDATA_DATA = "API_DATAGRID_UPDATA_DATA";

/**
 * @function 请求更新页面数据
 * @param tableList
 * @returns {{type: string, tableList: *}}
 */
export function updateData(tableList) {

    return {
        type: UPDATA_DATA,
        tableList: tableList
    }

}