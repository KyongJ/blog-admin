import * as React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import FancyRoute from './fancyRoute';


interface IAppProps {
    routes: IRouter[];
}
const AuthRouter: React.FunctionComponent<IAppProps> = props => {
    //获得当前路径
    const { pathname } = useLocation();
    const { routes } = props;
    //获取登录状态
    const isLogin = window.sessionStorage.getItem('isLogin');
    if (isLogin) {
        //获取当前的路由
        const targetRouterConfig = routes.find(item => item.path === pathname);

        if (targetRouterConfig) {
            const { component } = targetRouterConfig;
            return <FancyRoute path={pathname} component={component} />;
        }
    }
    // nprogress.done();
    return <Redirect to={'/login'}></Redirect>;
};

export default AuthRouter;
