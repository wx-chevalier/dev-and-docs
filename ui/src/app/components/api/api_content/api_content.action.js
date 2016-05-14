import ApiContentModel from "../../../models/api/api_content";

const apiContentModel = new ApiContentModel();

export const FETCH_DATA = "API_CONTENT_FETACH_DATA";

/**
 * @function 请求获取数据
 * @param options
 * @returns {function()}
 */
export function fetchData(options) {

    return (dispatch)=> {

        apiContentModel.getApiList().then((apiList)=> {
            dispatch(updateData(apiList));
        });
    }
}

export const UPDATA_DATA = "API_CONTENT_UPDATA_DATA";

/**
 * @function 请求更新页面数据
 * @param tableList
 * @returns {{type: string, tableList: *}}
 */
export function updateData(apiList) {

    return {
        type: UPDATA_DATA,
        apiList: apiList
    }

}