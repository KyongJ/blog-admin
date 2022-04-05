import actionTypes from '../actionTypes';
import initStoreData from '../state';


const setStoreData = (state = initStoreData, action: Action): object => {
    if (!actionTypes[action.type]) return state;
    const { field } = actionTypes[action.type];
    return {
        ...state,
        [field]: action.payload,
    };
};

export default setStoreData
