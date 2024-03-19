import React, { FC, useState } from 'react';
import { CSVLink } from '@/common/react-csv';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Space } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';

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
    return (
        <div>
            <Button type="primary" onClick={() => setVisible(!visible)}>
                测试
            </Button>
            <Modal width={800} visible={visible} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ fontWeight: 900, fontSize: 24 }}>创建新项目</div>
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
