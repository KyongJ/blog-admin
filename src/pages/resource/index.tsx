/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useRef, useState } from 'react';
import { addOrUpdateResource, deleteResource, getResource } from '@/api';
import * as type from '@/models/resource';
import { ColumnsType } from 'antd/lib/table';
import MyTable from '@/component/Common/table';
import { Button, Space, Switch, message as Imessage, Tag, Input, Radio } from 'antd';
import MyModalForm from '@/component/Common/modalForm';
import MyIconFont from '@/component/Common/MyIconFont';
interface Props {}

const Resource: FC<Props> = props => {
    // 初始参数
    // const initParams = {};
    const modalFormRef = useRef<RefType>();
    const parentModalFormRef = useRef<RefType>();
    const [dataSource, setDataSource] = useState([]);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false); //加载
    const [parentVisible, setParentVisible] = useState(false); //父模块Modael
    const [visible, setVisible] = useState(false); //子模块Modael

    enum RequestMethod {
        GET = 'blue',
        POST = 'green',
        DELETE = 'red',
        PUT = 'orange',
    }
    const colorMethod = (requestMethod: string) => {
        switch (requestMethod) {
            case 'GET':
                return RequestMethod.GET;
            case 'POST':
                return RequestMethod.POST;
            case 'DELETE':
                return RequestMethod.DELETE;
            case 'PUT':
                return RequestMethod.PUT;
        }
    };

    const Icolumns: ColumnsType<type.resource> = [
        {
            title: '资源名称',
            key: 'resourceName',
            dataIndex: 'resourceName',
            align: 'center',
        },
        {
            title: '请求方式',
            key: 'requestMethod',
            dataIndex: 'requestMethod',
            align: 'center',
            render: (requestMethod: string) =>
                requestMethod ? <Tag color={colorMethod(requestMethod)}>{requestMethod}</Tag> : '',
        },
        {
            title: '资源路径',
            key: 'url',
            dataIndex: 'url',
            align: 'center',
        },
        {
            title: '禁用',
            key: 'isDisable',
            dataIndex: 'isDisable',
            align: 'center',
            render: (isDisable: number, record) => {
                //改变禁用权限
                let resource = { ...record, isDisable: isDisable === 1 ? 0 : 1 };
                return (
                    <Switch
                        defaultChecked={isDisable === 1 ? true : false}
                        onChange={() => {
                            saveOrUpdate(resource);
                        }}
                    />
                );
            },
        },
        {
            title: '匿名',
            key: 'isAnonymous',
            dataIndex: 'isAnonymous',
            align: 'center',
            render: (isAnonymous: number, record) => {
                //改变匿名权限
                let resource = { ...record, isAnonymous: isAnonymous === 1 ? 0 : 1 };
                return (
                    <Switch
                        defaultChecked={isAnonymous === 1 ? true : false}
                        onChange={() => {
                            saveOrUpdate(resource);
                        }}
                    />
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => {
                const { id, parentId, resourceName, requestMethod, url } = record;
                const emit = () => {
                    modalFormRef.current.setFormValue({
                        resourceName,
                        requestMethod,
                        url,
                    });
                    modalFormRef.current.setExtraProps({ id });
                    setVisible(true);
                };
                const parentEmit = () => {
                    parentModalFormRef.current.setFormValue({ resourceName });
                    parentModalFormRef.current.setExtraProps({ id });
                    setParentVisible(true);
                };
                return (
                    <Space size="small">
                        {!parentId && (
                            <Button
                                type="text"
                                icon={<MyIconFont type="icon-tianjiajihua" />}
                                onClick={() => {
                                    modalFormRef.current.resetFormValue();
                                    modalFormRef.current.setExtraProps({ parentId:id});
                                    setVisible(true);
                                }}
                            >
                                Add
                            </Button>
                        )}
                        <Button
                            type="text"
                            icon={<MyIconFont type="icon-xiugai" />}
                            onClick={() => {
                                parentId ? emit() : parentEmit();
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            danger
                            type="text"
                            icon={<MyIconFont type="icon-icon" />}
                            onClick={() => {
                                deleteResourceList(id);
                            }}
                        >
                            Delete
                        </Button>
                    </Space>
                );
            },
        },
    ];

    //modal配置
    const modalFormConfig = [
        {
            key: 'resourceName',
            name: 'resourceName',
            label: '资源模块',
            rules: [{ required: true }],
            slot: <Input></Input>,
        },
        {
            key: 'url',
            name: 'url',
            label: '资源路径',
            rules: [{ required: true }],
            slot: <Input></Input>,
        },
        {
            key: 'requestMethod',
            name: 'requestMethod',
            label: '请求方式',
            rules: [{ required: true }],
            slot: (
                <Radio.Group>
                    <Radio value="GET">GET</Radio>
                    <Radio value="POST">POST</Radio>
                    <Radio value="PUT">PUT</Radio>
                    <Radio value="DELETE">DELETE</Radio>
                </Radio.Group>
            ),
        },
    ];

    //父模块modal配置
    const parentModalFormConfig = [
        {
            key: 'resourceName',
            label: '资源模块',
            rules: [{ required: true }],
            slot: <Input></Input>,
        },
    ];

    useEffect(() => {
        //获取角色列表
        getResourceList();
    }, []);

    //获取列表数据
    const getResourceList = async () => {
        setLoading(true);
        try {
            const {
                data: { dataList },
            } = await getResource();
            console.log(dataList);
            setDataSource(dataList);
            setCount(count);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //添加或修改数据
    const saveOrUpdate = async (resource: CommonObjectType) => {
        try {
            const { message } = await addOrUpdateResource(resource);
            Imessage.success(message);
            getResourceList();
        } catch (error) {
            console.log(error);
        }
    };

    //删除
    const deleteResourceList = async (ids: number | React.Key[]) => {
        let params;
        try {
            if (Array.isArray(ids)) {
                params = ids;
            } else {
                params = [ids];
            }
            const { message } = await deleteResource(params);
            getResourceList();
            Imessage.info(message);
        } catch (error) {
            console.log(error);
        }
    };

    const onCreate = (values: CommonObjectType) => {
        console.log(values);
        try {
            saveOrUpdate(values);
            setVisible(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="resource container">
            <div className="container-name">接口管理</div>
            <MyModalForm
                modalName="ParentResource"
                config={parentModalFormConfig}
                visible={parentVisible}
                ref={parentModalFormRef}
                onCreate={onCreate}
                onCancel={() => {
                    setParentVisible(false);
                }}
            ></MyModalForm>
            <MyModalForm
                modalName="Resource"
                config={modalFormConfig}
                visible={visible}
                ref={modalFormRef}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            ></MyModalForm>
            <MyTable columns={Icolumns} dataSource={dataSource} loading={loading}></MyTable>
        </div>
    );
};

export default Resource;
