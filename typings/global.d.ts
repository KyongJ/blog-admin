/**
 * action数据类型
 */
interface Action {
    type: string;
    payload: any;
}

/**
 * redux继承接受参数接口
 */
interface ReduxProps {
    storeData?: storeType;
    setStoreData?: (type: string, payload: any) => object;
}

/**
 * 路由配置的参数类型
 */
interface IRouter {
    name: string;
    path: string;
    key: string;
    exact?: boolean;
    component?: ReactNode;
    childrens?: IRouter[];
}

/**
 * 菜单配置参数
 */
interface MenuType {
    path: string;
    name: string;
    key: string;
    iconfont: string;
    type?: string;
    hidden?:boolean;
    childrens?: MenuType[];
}

//Ref类型
type RefType = MutableRefObject<unknown> | ((instance: unknown) => void)

//通用类型
type CommonObjectType<T = any> = Record<string, T>
