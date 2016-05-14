import KeyModel from "../../../models/auth/key";

const keyModel = new KeyModel();

export const FETCH_DATA = "KEY_FETACH_DATA";

/**
 * @function 请求获取数据
 * @param options
 * @returns {function()}
 */
export function fetchData(options) {

    return (dispatch)=> {

        keyModel.getKeyList().then((keyList)=> {
            dispatch(updateData(keyList));
        });
    }
}

export const UPDATA_DATA = "KEY_UPDATA_DATA";

/**
 * @function 请求更新页面数据
 * @param tableList
 * @returns {{type: string, tableList: *}}
 */
export function updateData(keyList) {

    return {
        type: UPDATA_DATA,
        keyList: keyList
    }

}