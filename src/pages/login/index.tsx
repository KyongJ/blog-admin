import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, message, Card, Select, Checkbox, Divider } from 'antd';
import ReactCanvasNest from 'react-canvas-nest';
import Logo from '@/assets/img/logo.png';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { login } from '../../api';
import { setUserInfo } from '../../assets/js/publicFunc';
import './index.less';
const { Option } = Select;
interface Props extends ReduxProps {}

const Login: FC<Props> = ({ storeData: { userInfo = {} }, setStoreData }) => {
    const history = useHistory();
    const [activeTabKey, setActiveTabKey] = useState<string>('phone');
    const tabList = [
        {
            key: 'phone',
            tab: '手机号',
        },
        {
            key: 'email',
            tab: '邮箱',
        },
    ];
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

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
            {/* <div className="logo-box">
                <img alt="加载失败" className="logo" src={Logo} />
                <span className="logo-name">欢迎使用</span>
            </div> */}

            <Card
                className="login-form"
                title={<span className="logo-name">欢迎使用</span>}
                tabList={tabList}
                activeTabKey={activeTabKey}
                style={{ width: 350, fontSize: 14 }}
            >
                <Form name="login-form" onFinish={onFinish}>
                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input
                            addonBefore={prefixSelector}
                            style={{ width: '100%' }}
                            placeholder="请输入你的手机号"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className="login-form-button"
                            htmlType="submit"
                            size="large"
                            type="primary"
                            style={{ borderRadius: 6 }}
                        >
                            下一步
                        </Button>
                    </Form.Item>
                    <Form.Item name="agreement" valuePropName="checked">
                        <Checkbox>
                            <span style={{ fontSize: 12 }}>
                                我已经阅读并同意 <a href="">服务协议</a> 和 <a href="">隐私策略</a>
                            </span>
                        </Checkbox>
                    </Form.Item>
                </Form>
                <div style={{marginTop:100}}></div>
                <Divider  plain>其他方式登录</Divider>
            </Card>
        </div>
    );
};

export default connect(state => state, actions)(Login);
