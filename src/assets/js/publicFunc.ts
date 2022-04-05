import routeConfig from '../../route';

/**
 * * 以递归的方式展平react router数组
 * @param {IRouter[]} arr 路由数组
 * @returns
 */
export const flattenRoutes = (arr: IRouter[]): any[] =>
    arr.reduce((prev: IRouter[], item: IRouter) => {
        if (Array.isArray(item.childrens)) {
            prev.push({ ...item, childrens: [] });
        }
        return prev.concat(Array.isArray(item.childrens) ? flattenRoutes(item.childrens) : item);
    }, []);

/**
 * 找出当前路径对应的路由信息
 * @param pathname url路径
 * @returns
 */
export const getRoute = (pathname: string) => {
    const routes = flattenRoutes(routeConfig);

    return routes.find((item: IRouter) => {
        return pathname === item.path;
    });
};

/**
 * 修改用户信息
 * @param userInfo
 * @param action
 */
export const setUserInfo = (userInfo: any, action: (type: string, payload: any) => object) => {
    const { id, userInfoId, username, nickname, userRole, avatar } = userInfo;
    const curUserInfo = {
        id,
        userInfoId,
        userName: username,
        nickName: nickname,
        avatar,
        userRole,
    };
    action('SET_USERINFO', curUserInfo);
};

/**
 * numberToString类型转换
 * @param value
 * @returns
 */
export const typeConverse = (value: number | string) => {
    switch (typeof value) {
        case 'number':
            return value + '';
        case 'string':
            return value;
    }
};

/**
 * 判断是否为空
 * @param value 
 * @returns 
 */
export const isEmpty = (value: string | null | undefined) => {
    if (typeof value === 'undefined' || value === null || value === '') {
        return true;
    } else {
        return false;
    }
};
