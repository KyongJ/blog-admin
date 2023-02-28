import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, message } from 'antd';
import ReactCanvasNest from 'react-canvas-nest';
import Logo from '@/assets/img/logo.png';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { login } from '../../api';
import { setUserInfo } from '../../assets/js/publicFunc';
import './index.less';

interface Props extends ReduxProps {}

const Login: FC<Props> = ({ storeData: { userInfo = {} }, setStoreData }) => {
    const history = useHistory();

    // 触发登录方法
    const onFinish = async (values: any) => {
        const { userName, password } = values;
        let param = new URLSearchParams();
        param.append('username', userName);
        param.append('password', password);
        const res = await login(param);
        if (res?.code === 200) {
            message.success(res.message);
            //储存用户信息
            setStoreData && setUserInfo(res.data.userInfo, setStoreData);
            //由于后端没有token，只能先使用1
            sessionStorage.setItem('isLogin', '1');
            history.push('/');
        } else {
            message.error(res.message ? res.message : '登录失败');
            return;
        }
        return;
    };

    return (
        <div className="login-layout" id="login-layout">
            <ReactCanvasNest
                config={{
                    pointColor: '24,144,255',
                    lineColor: '24,144,255',
                    pointOpacity: 0.6,
                }}
                style={{ zIndex: 1 }}
            />
            <div className="logo-box">
                <img alt="加载失败" className="logo" src={Logo} />
                <span className="logo-name">Blog-Admin</span>
            </div>
            <Form className="login-form" name="login-form" onFinish={onFinish}>
                <Form.Item name="userName" rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input placeholder="用户名" prefix={<UserOutlined />} size="large" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                    extra="用户名:test 密码:123"
                >
                    <Input.Password placeholder="密码" prefix={<LockOutlined />} size="large" />
                </Form.Item>
                <Form.Item>
                    <Button
                        className="login-form-button"
                        htmlType="submit"
                        size="large"
                        type="primary"
                    >
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default connect(state => state, actions)(Login);
