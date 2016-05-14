import {DataBaseModel} from "../../models/database/database";

const dataBaseModel = new DataBaseModel();

export const FETCH_DATA = "DATABASE_FETACH_DATA";

/**
 * @function 请求获取数据
 * @param options
 * @returns {function()}
 */
export function fetchData(options) {

    return (dispatch)=> {

        dataBaseModel.getDataBaseList().then((dataBaseList)=> {

            dispatch(updateData(dataBaseList));
        });
    }
}

export const UPDATE_DATA = "DATABASE_UPDATE_DATA";

/**
 * @function 请求更新页面数据
 * @param dataBaseList
 * @returns {{type: string, dataBaseList: *}}
 */
export function updateData(dataBaseList) {

    return {
        type: UPDATE_DATA,
        dataBaseList: dataBaseList
    }

}