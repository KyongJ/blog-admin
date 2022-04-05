import React, { FC } from 'react';
import { Avatar, Menu, Dropdown, Button ,message as Imessage} from 'antd';
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import MyBreadcrumb from '../breadcrumb';
import MyTab from '../tab';
import * as actions from '../../../store/actions';
import { useHistory } from 'react-router-dom';
import { logout } from '@/api';
import './index.less';
interface Props extends ReduxProps {}

const MyHeader: FC<Props> = props => {
    const {
        storeData: { userInfo:{avatar},collapsed },
        setStoreData,
    } = props;

    const history = useHistory();

    const toggleCollapsed = () => {
        setStoreData && setStoreData('SET_COLLAPSED', !collapsed);
    };

    const logOut = async () => {
        try {
            const {message} = await logout();
            sessionStorage.clear();
            setStoreData &&
                setStoreData('SET_USERINFO', {
                    id: null,
                    userInfoId: null,
                    userName: 'test',
                    nickName: 'test',
                    avatar: '',
                    userRole: 'test',
                });
            Imessage.info(message)
            history.replace({ pathname: '/login' });
        } catch (error) {
            console.log(error);
        }
    };
    const menu = (
        <Menu>
            <Menu.Item key="setting">
                <Button type="link" onClick={()=>{
                    history.push({pathname:'/setting'})   
                }} >设置</Button>
            </Menu.Item>
            <Menu.Item key="logout">
                <Button type="link" onClick={logOut}>
                    注销
                </Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="header-container">
            <div className="header-content">
                <div className="collapsed-btn" onClick={toggleCollapsed}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </div>
                <MyBreadcrumb></MyBreadcrumb>
                <div className="avatar">
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <Avatar icon={<UserOutlined />} src={avatar} />
                    </Dropdown>
                </div>
            </div>
            <div className="header-tab">
                <MyTab defaultKey="home"></MyTab>
            </div>
        </div>
    );
};

export default connect(state => state, actions)(MyHeader);
