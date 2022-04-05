import React from 'react'
import { useLocation } from 'react-router-dom';


const FrontendAuth = (props: IRouter[]) => {
    //获得当前路径
  // const { pathname } = useLocation();
  // const { routerMap } = props;
  // //获取登录状态
  // const isLogin = window.sessionStorage.getItem("token");
  // //获取当前的路由
  // const targetRouterConfig = routerMap.find((item:IRouter[]) => item.path === pathname);
  // //不需要登录时，访问不需要权限校验的路由
  // if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
  //   const { component } = targetRouterConfig;
  //   return (<Route path={pathname} component={component} />)
  // }

  // if (isLogin) {
  //   //登陆状态
  //   if (pathname === "/login") {
  //     window.sessionStorage.removeItem("token");
  //     window.sessionStorage.removeItem("userInfo");
  //     return <Redirect to="/login" />;
  //   } else {
  //     // 如果路由合法，就跳转到相应的路由
  //     if (targetRouterConfig) {
        
  //       return <Route path={pathname} component={targetRouterConfig.component} />;
  //     } else {
  //       // 如果路由不合法，重定向到 404 页面
  //       return <Redirect to="/home" />;
  //     }
  //   }
  // } else {
  //   // 非登陆状态下，当路由合法时且需要权限校验时，跳转到登陆页面，要求登陆
  //   return <Redirect to="/login" />;
  // }
}

export default FrontendAuth
