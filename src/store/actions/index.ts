import actionTypes from '../actionTypes';

/**
 * redux-action
 * @param type action的必要属性
 * @param payload 修改的内容
 * @returns 
 */
export const setStoreData = (type: string, payload: any): object => {
    if (!actionTypes[type]) throw new Error('请传入redux修改数据的正确类型');
    return {
        type: type,
        payload: payload,
    };
};