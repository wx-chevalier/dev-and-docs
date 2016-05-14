import ApiGroupModel from "../../../models/api/api_group";

const apiGroupModel = new ApiGroupModel();

export const FETCH_DATA = "API_GROUP_FETACH_DATA";

/**
 * @function 请求获取数据
 * @param options
 * @returns {function()}
 */
export function fetchData(options) {

    return (dispatch)=> {

        apiGroupModel.getApiGroupList().then((apiGroupList)=> {
            dispatch(updateData(apiGroupList));
        });
    }
}

export const UPDATA_DATA = "API_GROUP_UPDATA_DATA";

/**
 * @function 请求更新页面数据
 * @param apiGroupList
 * @returns {{type: string, apiGroupList: *}}
 */
export function updateData(apiGroupList) {

    return {
        type: UPDATA_DATA,
        apiGroupList: apiGroupList
    }

}