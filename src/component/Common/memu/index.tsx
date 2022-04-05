import React, { FC, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { flattenRoutes, getRoute } from '@/assets/js/publicFunc';
import menuConfig from '@/config/memu';
import MyIconFont from '../MyIconFont';
import routeConfig from '@/route';
import './index.less';

const { SubMenu } = Menu;
//铺平路由配置
const routes = flattenRoutes(routeConfig);
interface Props {}

const MyMenu: FC<Props> = props => {
    const { pathname } = useLocation();
    const { key = 'home' } = getRoute(pathname);
    const [selectedKeys, setSelectedKeys] = useState(key);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    //找到当前菜单的父级菜单
    const handleOpenkeyChange = (curkey: string) => {
        let keyArr = curkey.split(/:|-/g);
        !openKeys.some(item => item === keyArr[0]) && setOpenKeys([...openKeys, keyArr[0]]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    //随路由变化高亮菜单
    const handleHightLightChange = (curkey: string) => {
        routes.some((item: MenuType) => item.key === curkey) && setSelectedKeys(curkey);
    };

    useEffect(() => {
        const { key } = getRoute(pathname);
        handleHightLightChange(key);
        handleOpenkeyChange(key);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    //格式化菜单名
    const setMenuName = (data: MenuType) => {
        const { iconfont } = data;
        return (
            <span>
                {iconfont && <MyIconFont type={iconfont} style={{ fontSize: '14px' }} />}
                <span>{data.name}</span>
            </span>
        );
    };

    //创建可展开第一级子菜单
    const createSubMenu = (data: MenuType): JSX.Element => {
        const menuList: JSX.Element[] = [];
        data.childrens?.map((item: MenuType) => {
            const menuItem = (
                <Menu.Item key={item.key}>
                    <Link to={item.path}>{setMenuName(item)}</Link>
                </Menu.Item>
            );
            !item.hidden && menuList.push(menuItem);
            return menuItem;
        });
        return (
            <SubMenu key={data.key} title={setMenuName(data)}>
                {menuList}
            </SubMenu>
        );
    };

    //创建可以跳转的多级子菜单
    const createMenuItem = (data: MenuType): JSX.Element => {
        return (
            <Menu.Item key={data.key}>
                <Link to={data.path}>{setMenuName(data)}</Link>
            </Menu.Item>
        );
    };

    //构建侧边栏菜单
    const renderMenuMap = (list: MenuType[]): JSX.Element[] => {
        return list.map((item: MenuType) => {
            return item.type === 'subMenu' && !item.hidden
                ? createSubMenu(item)
                : createMenuItem(item);
        });
    };

    //点击菜单
    const handleClick = ({ key }: { key: string }) => {
        setSelectedKeys(key);
    };

    const onOpenChange = (keys: string[]) => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (latestOpenKey) {
            setOpenKeys([...openKeys, latestOpenKey]);
        } else {
            setOpenKeys(keys);
        }
    };

    return (
        <div className="side-menu">
            <Menu
                mode="inline"
                defaultSelectedKeys={['home']}
                defaultOpenKeys={openKeys}
                selectedKeys={[selectedKeys]}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                onClick={handleClick}
                style={{ borderRight: 0 }}
            >
                {renderMenuMap(menuConfig)}
            </Menu>
        </div>
    );
};

export default MyMenu;
