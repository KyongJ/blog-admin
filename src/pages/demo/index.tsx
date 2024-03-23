import React, { FC, useState } from 'react';
import { CSVLink } from '@/common/react-csv';
import { InboxOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Select, Space, Steps } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import './index.less';
const { Step } = Steps;
const { Option } = Select;
const Demo: FC = () => {
    const [visible, setVisible] = useState(false);
    const { TextArea } = Input;
    // const [name, setName] = useState<string>('');

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
    };
    return (
        <div>
            {/* <Steps type="navigation" size="small" current={0}>
                <Step title="藏品详细信息" />
                <Step title="藏品图片/视频" />
                <Step title="版权证明文件" />
                <Step title="藏品估值" />
                <Step title="确认信息" />
                <Step title="填报完成" />
            </Steps> */}
            <div className="steps">
                <div className="step-box" style={{ width: '16.67%' }}>
                    <div className="step active first">藏品详细信息</div>
                </div>
                <div className="step-box" style={{ width: '16.67%' }}>
                    <div className="step both">藏品图片/视频</div>
                </div>
                <div className="step-box" style={{ width: '16.67%' }}>
                    <div className="step both">版权证明文件</div>
                </div>
                <div className="step-box" style={{ width: '16.67%' }}>
                    <div className="step both">藏品估值</div>
                </div>
                <div className="step-box" style={{ width: '16.67%' }}>
                    <div className="step both">确认信息</div>
                </div>
                <div className="step-box" style={{ width: '16.67%' }}>
                    <div className="step both">填报完成</div>
                </div>
            </div>
            <div className="upload-content">
                <div>
                    <Form
                        name="validateOnly"
                        layout="vertical"
                        autoComplete="off"
                        {...formItemLayout}
                    >
                        <Form.Item name="name" label="藏品名称" rules={[{ required: true }]}>
                            <Input placeholder='对藏品的简短而具体的描述或命名' />
                        </Form.Item>
                        <Form.Item name="time" label="创作时间" rules={[{ required: true }]}>
                            <DatePicker />
                        </Form.Item>
                        <Form.Item name="belong" label="数字签名" rules={[{ required: true }]}>
                            <Input placeholder='提供数字藏品的数字证书或数字签名信息'/>
                        </Form.Item>
                        <Form.Item name="type" label="藏品类别" rules={[{ required: true }]}>
                            <Select placeholder="藏品归类" allowClear>
                                <Option value="1">音乐</Option>
                                <Option value="2">文学</Option>
                                <Option value="3">实物</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="description" label="藏品描述" rules={[{ required: true }]}>
                            <TextArea placeholder='详细介绍藏品的背景、创作灵感、艺术价值等'/>
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button>创建</Button>
                                <Button htmlType="reset">重置</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <Modal width={800} visible={visible} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ fontWeight: 900, fontSize: 24 }}>发布数字藏品</div>
                <span>支持的文件格式:JPG、PNG、GIF、SVF,最大不超过100MB</span>
                <div>
                    <Dragger>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    </Dragger>
                </div>
                <div>
                    <Form name="validateOnly" layout="vertical" autoComplete="off">
                        <Form.Item name="name" label="名称" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="age" label="外部链接" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="age" label="关键词" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="age" label="区块链网络" rules={[{ required: true }]}>
                            <Select />
                        </Form.Item>
                        <Form.Item name="age" label="介绍信息" rules={[{ required: true }]}>
                            <TextArea />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button>创建</Button>
                                <Button htmlType="reset">重置</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default Demo;
