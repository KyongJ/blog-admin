import { createStore, applyMiddleware, combineReducers } from 'redux';
import storeData from './reducers';
import promiseMiddleware from 'redux-promise';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { composeWithDevTools } from 'redux-devtools-extension';

const storageConfig = {
    key: 'root', // 必须有的
    storage: storageSession, // 缓存机制
};

const allReducers = combineReducers({
    storeData,
});
const myPersistReducer = persistReducer(storageConfig, allReducers);
const store: any = createStore(
    myPersistReducer,
    composeWithDevTools(applyMiddleware(promiseMiddleware))
);

const persistor = persistStore(store);
export { store, persistor };
