/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { Avatar, Button, Form, Input, Tabs, Upload, message as Imessage } from 'antd';
import { connect } from 'react-redux';
import * as action from '@/store/actions';
import { getUserInfoById, updateUserInfo } from '@/api';
import './index.less';
import { UploadFile } from 'antd/lib/upload/interface';
const { TabPane } = Tabs;

interface Props extends ReduxProps {}

function onChange(key: string) {
    console.log(key);
}
const Setting: FC<Props> = props => {
    const [userInfo, setUserInfo] = useState<any>({});
    const [form] = Form.useForm();
    const {
        storeData: {
            userInfo: { userInfoId },
        },
    } = props;

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        form.setFieldsValue({
            nickname: userInfo.nickname,
            avatar: userInfo.avatar,
            introduce: userInfo.introduce,
        });
    }, [userInfo]);

    //获取用户信息
    const getUserInfo = async () => {
        try {
            const { data } = await getUserInfoById(userInfoId);
            setUserInfo(data.userInfo);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    //upload表单项数据
    const uploadFile = (e: any) => {
        if (e.file.status === 'done') {
            return e.file.response.data.addr;
        }
        return e;
    };

    //表单提交回调函数
    const onFinish = async (value: any) => {
        form.validateFields().then(values => {
            console.log(values);
        });
        let param = { id: userInfo.id, userId: userInfo.userId, ...value };
        try {
            const { message } = await updateUserInfo(param);
            Imessage.success(message);
        } catch (error) {
            console.log(error);
        }
    };

    //上传upload回调函数
    const handleChange = ({ file }: { file: UploadFile }) => {
        switch (file.status) {
            case 'error':
                Imessage.warning('上传失败');
                break;
            case 'uploading':
                Imessage.info('上传中');
                break;
            case 'done':
                setUserInfo({ ...userInfo, avatar: file.response.data.addr });
                Imessage.info('上传成功');
                break;
            case 'removed':
                setUserInfo({ ...userInfo, avatar: file.response.data.addr });
                Imessage.info('删除成功');
                break;
            default:
                Imessage.warning('好像出现了什么错误');
                break;
        }
    };

    return (
        <div className="setting container">
            <Tabs defaultActiveKey="user_info" onChange={onChange}>
                <TabPane tab="设置" key="user_info">
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
                        <div style={{ width: '30%' }}>
                            <Form
                                name="userInfo_form"
                                form={form}
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                onFinish={onFinish}
                                // onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="昵称"
                                    name="nickname"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your nickName!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="用户头像"
                                    name="avatar"
                                    valuePropName="file"
                                    getValueFromEvent={uploadFile}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please set your avatar!',
                                        },
                                    ]}
                                >
                                    <Upload
                                        name="file"
                                        listType="picture-card"
                                        maxCount={1}
                                        action="/admin/user-info/updateAvatar"
                                        showUploadList={false}
                                        onChange={handleChange}
                                    >
                                        {userInfo.avatar ? (
                                            <Avatar src={userInfo.avatar} alt="avatar" size={96} />
                                        ) : (
                                            'upload'
                                        )}
                                    </Upload>
                                </Form.Item>

                                <Form.Item
                                    label="个人简介"
                                    name="introduce"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your introduce!',
                                        },
                                    ]}
                                >
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button type="primary" htmlType="submit">
                                        Emit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="修改密码" key="emit_pw">
                    修改密码
                </TabPane>
                <TabPane tab="关于我" key="about">
                    关于我
                </TabPane>
            </Tabs>
        </div>
    );
};

export default connect(state => state, action)(Setting);
