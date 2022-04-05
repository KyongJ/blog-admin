import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Space, message as Imessage, Tag, Switch, Tree, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import {
    addOrUpdateRoleResource,
    changeDisable,
    deleteRole,
    getRole,
    listResourceOption,
} from '@/api';
import * as type from '@/models/role';
import MyTable from '@/component/Common/table';
import MyModalForm from '@/component/Common/modalForm';
interface Props {}

const Role: FC<Props> = props => {
    // 初始参数
    // const initParams = {};
    const tableRef = useRef<RefType>(null);
    const modalFormRef = useRef<RefType>();
    const [dataSource, setDataSource] = useState([]);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false); //加载
    const [visible, setVisible] = useState(false);
    const [resourceList, setResourceList] = useState([]); //角色资源列表
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]); //资源列表选择节点

    const Icolumns: ColumnsType<type.role> = [
        {
            title: '角色名称',
            key: 'roleName',
            dataIndex: 'roleName',
            align: 'center',
        },
        {
            title: '角色标签',
            key: 'roleLabel',
            dataIndex: 'roleLabel',
            align: 'center',
            render: (roleLabel: string) => (
                <Tag color={'blue'} key={roleLabel}>
                    {roleLabel}
                </Tag>
            ),
        },
        {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime',
            align: 'center',
            render: (createTime: Date) => dayjs(createTime).format('YYYY-MM-DD'),
        },
        {
            title: '禁用',
            key: 'isDisable',
            dataIndex: 'isDisable',
            align: 'center',
            render: (isDisable: number, { id }: { id: number }) => {
                //改变禁用权限
                const changeIsDisable = async () => {
                    try {
                        let param = new URLSearchParams();
                        param.append('id', String(id));
                        const { message } = await changeDisable(param);
                        Imessage.success(message);
                        getRoleList(tableRef.current.tableParams);
                    } catch (error) {
                        console.log(error);
                    }
                };
                return (
                    <Switch
                        defaultChecked={isDisable === 1 ? true : false}
                        onChange={changeIsDisable}
                    />
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => {
                const { id, roleName, roleLabel, resourceIdList } = record;
                return (
                    <Space size="small">
                        <Button
                            type="primary"
                            onClick={() => {
                                setCheckedKeys(resourceIdList);
                                modalFormRef.current.setFormValue({
                                    roleName,
                                    roleLabel,
                                });
                                modalFormRef.current.setExtraProps({id});
                                setVisible(true);
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            danger
                            type="primary"
                            onClick={() => {
                                deleteRoleList(id);
                            }}
                        >
                            Delete
                        </Button>
                    </Space>
                );
            },
        },
    ];

    //tree组件勾选回调函数
    const onCheck = (
        checked:
            | {
                  checked: React.Key[];
                  halfChecked: React.Key[];
              }
            | React.Key[]
    ) => {
        setCheckedKeys(checked as React.Key[]);
    };

    //modal配置
    const modalFormConfig = [
        {
            key: 'roleName',
            name:'roleName',
            label: '角色名称',
            rules: [{ required: true }],
            slot: <Input></Input>,
        },
        {
            key: 'roleLabel',
            name: 'roleLabel',
            label: '角色标签',
            rules: [{ required: true }],
            slot: <Input></Input>,
        },
        {
            key: 'resourceIdList',
            name: 'resourceIdList',
            label: '角色权限',
            // valuePropName: 'checkedKeys',
            // rules: [{ required: true }],
            slot: (
                <Tree
                    checkable
                    fieldNames={{ title: 'label', key: 'id', children: 'children' }}
                    treeData={resourceList}
                    checkedKeys={checkedKeys}
                    onCheck={onCheck}
                />
            ),
        },
    ];

    useEffect(() => {
        //获取角色列表
        getRoleList(tableRef.current.tableParams);
        //获取资源列表
        listRoleResource();
    }, []);

    //获取列表数据
    const getRoleList = async (tableParams: any) => {
        setLoading(true);
        try {
            const { data } = await getRole({ ...tableParams });
            const {
                dataList: { contentList, count },
            } = data;
            console.log(contentList);
            setDataSource(contentList);
            setCount(count);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //获取角色资源
    const listRoleResource = async () => {
        const {
            data: { resourceList },
        } = await listResourceOption();
        console.log(resourceList);
        setResourceList(resourceList);
    };

    //删除
    const deleteRoleList = async (ids: number | React.Key[]) => {
        let params;
        try {
            if (Array.isArray(ids)) {
                params = ids;
            } else {
                params = [ids];
            }
            const { message } = await deleteRole(params);
            getRoleList(tableRef.current.tableParams);
            Imessage.info(message);
        } catch (error) {
            console.log(error);
        }
    };

    const onCreate = async (values: CommonObjectType) => {
        console.log(values);
        try {
            let role = { ...values, resourceIdList: checkedKeys };
            const { message } = await addOrUpdateRoleResource(role);
            setVisible(false);
            getRoleList(tableRef.current.tableParams);
            Imessage.info(message);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="role container">
            <div className="container-name">角色管理</div>
            <MyModalForm
                modalName="Role"
                config={modalFormConfig}
                visible={visible}
                ref={modalFormRef}
                onCreate={onCreate}
                onCancel={() => setVisible(false)}
            ></MyModalForm>
            <MyTable
                columns={Icolumns}
                dataSource={dataSource}
                count={count}
                ref={tableRef}
                loading={loading}
                onParamsChange={getRoleList}
            />
        </div>
    );
};

export default Role;
