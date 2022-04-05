/**
 * redux存储数据类型
 */
interface storeType {
    userInfo: {
        id: number|null;
        userInfoId: number|null;
        userName: string;
        nickName: string;
        avatar: string;
        userRole: string;
    };
    collapsed: boolean;
    editArticleId?: number;
}

const initStoreData: storeType = {
    userInfo: {
        id: null,
        userInfoId: null,
        userName: 'test',
        nickName: 'test',
        avatar: '',
        userRole: 'test',
    },
    collapsed: false,
};

export default initStoreData;
