/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { flattenRoutes } from '../../../assets/js/publicFunc';
import routeConfig from '../../../route';
import './index.less';
interface Props {
    defaultKey: string;
}

const MyTab: FC<Props> = props => {
    const { defaultKey } = props;
    const [tabList, setTabList] = useState<IRouter[]>([routeConfig[0]]);
    const [current, setCurrent] = useState<string>(defaultKey);
    const sessionTabList = useRef<IRouter[]>([]); //setTabList 为异步操作 不具有实时性 ，所以使用ref来保证全局性
    const { pathname } = useLocation();
    const history = useHistory();
    //铺平route配置表
    const routes = flattenRoutes(routeConfig);

    useEffect(() => {
        const tabs = window.sessionStorage.getItem('curTab');
        if (tabs) {
            sessionTabList.current = JSON.parse(tabs);
            setTabList(JSON.parse(tabs));
        }
    }, []);

    //创建标签
    const createTab = useCallback(() => {
        return routes.find((item: IRouter) => {
            return pathname === item.path;
        });
    }, [pathname]);

    //改变标签
    const changeTab = useCallback(() => {
        let tabItem: IRouter = createTab();
        setCurrent(tabItem.key);
        if (JSON.stringify(sessionTabList.current).includes(JSON.stringify(tabItem)) === false) {
            sessionTabList.current = [...sessionTabList.current, tabItem];
            setTabList(sessionTabList.current);
        }
    }, [createTab]);

    //监听地址变化
    useEffect(() => {
        changeTab();
        return () => {
            window.sessionStorage.setItem('curTab', JSON.stringify(sessionTabList.current));
        };
    }, [changeTab, pathname]);

    //关闭标签
    const closeTab = (key: string): void => {
        let curIndex: number = 0;
        sessionTabList.current = sessionTabList.current.filter((item, index) => {
            if (item.key === key) {
                curIndex = index;
            }
            return item.key !== key;
        });
        const length = sessionTabList.current.length;
        setTabList(sessionTabList.current);
        if (key === current) {
            if (curIndex === length) {
                history.push({ pathname: sessionTabList.current[curIndex - 1].path });
            } else {
                history.push({ pathname: sessionTabList.current[curIndex].path });
            }
        }
    };

    //全部关闭
    const closeAll = (): void => {
        sessionTabList.current = sessionTabList.current.slice(0,1);
        setTabList(sessionTabList.current);
        history.push({pathname:sessionTabList.current[0].path})
    };

    return (
        <>
            {tabList.map((item: IRouter, index) => {
                return (
                    <div
                        className={'tab' + (item.key === current ? ' tab-click' : '')}
                        key={item.key}
                    >
                        <div className={item.key === current ? 'circle' : ''}></div>
                        <div className="tab-title">
                            <Link to={item.path}>{item.name}</Link>
                        </div>
                        {index !== 0 && (
                            <div className={'close-title'} onClick={() => closeTab(item.key)}>
                                ×
                            </div>
                        )}
                    </div>
                );
            })}
            <div
                className="tab"
                style={{ marginLeft: 'auto', marginRight: 10, cursor: 'pointer' }}
                onClick={() => {
                    closeAll();
                }}
            >
                全部关闭
            </div>
        </>
    );
};

export default MyTab;
