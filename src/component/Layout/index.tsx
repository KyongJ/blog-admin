import React, { FC } from 'react';
import { Layout } from 'antd';
import MySideBar from '../Common/sidebar/index';
import MyHeader from '../Common/header';
import AuthRouter from '../../route/authRouter';
import { flattenRoutes } from '../../assets/js/publicFunc';
import { connect } from 'react-redux';
import routeConfig from '../../route';
import * as actions from '../../store/actions';
import './index.less';

const { Content } = Layout;
const routes = flattenRoutes(routeConfig);
interface Props extends ReduxProps {}

const MyLayout: FC<Props> = props => {
    const {
        storeData: { collapsed },
    } = props;
    return (
        <Layout>
            <MySideBar />
            <Layout
                className={!collapsed ? ['site-layout', 'layout-custom'].join(' ') : 'site-layout'}
                style={{ marginLeft: '80px',transition:'all 0.5s' }}
            >
                <MyHeader></MyHeader>
                <Content className="site-layout-background content-custom">
                    <AuthRouter routes={routes} />
                </Content>
            </Layout>
        </Layout>
    );
};

export default connect(state => state, actions)(MyLayout);
