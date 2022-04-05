import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Modal } from 'antd';

interface Props {
    modalName?: string;
    config?: CommonObjectType[];
    ref?: RefType;
    visible?: boolean;
    onCreate?: (values: any) => void;
    onCancel?: () => void;
}

const MyModalForm: React.FC<Props> = forwardRef((props, ref) => {
    const { visible, onCreate, onCancel, config = [], modalName } = props;
    const [extraProps, setExtraProps] = useState<CommonObjectType>();
    const [form] = Form.useForm();

    const getFields = (): JSX.Element[] => {
        return config.map((item: any) => {
            return (
                <Form.Item
                    key={item.key}
                    name={item?.name}
                    label={item.label}
                    rules={item.rules}
                    valuePropName={item?.valuePropName}
                    style={{ marginBottom: '20px' }}
                >
                    {item?.slot}
                </Form.Item>
            );
        });
    };

    useImperativeHandle(ref, () => ({
        //设置表单值
        setFormValue(value: CommonObjectType): void {
            return form.setFieldsValue(value);
        },
        //重置表单值
        resetFormValue() {
            form.resetFields();
        },
        setExtraProps,
    }));

    return (
        <div>
            <Modal
                visible={visible}
                title={`${modalName}`}
                okText="Create"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form.validateFields()
                        .then(values => {
                            form.resetFields();
                            onCreate && onCreate({ ...values, ...extraProps });
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="horizontal"
                    name={'form'.concat(`_${modalName}`)}
                    labelCol={{ span: 5 }}
                >
                    {getFields()}
                </Form>
            </Modal>
        </div>
    );
});

export default MyModalForm;
