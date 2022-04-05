import React, { FC } from 'react';
import MyMenu from '../memu';
import { Layout } from 'antd';
import Logo from '../logo';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './index.less';

interface Props extends ReduxProps {}

const MySideBar: FC<Props> = props => {
    const {
        storeData: { collapsed },
    } = props;
    return (
        <Layout.Sider
            width={220}
            collapsed={collapsed}
            style={{overflowY:'auto', height: '100vh', position: 'fixed', left: 0 }}
        >
            <Logo collapsed={collapsed}></Logo>
            <MyMenu></MyMenu>
        </Layout.Sider>
    );
};

export default connect(state => state, actions)(MySideBar);
