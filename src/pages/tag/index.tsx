import React, { FC, useEffect, useRef, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Button, Space, message as Imessage, Input } from 'antd';
import dayjs from 'dayjs';
import MyTable from '@/component/Common/table';
import { addOrUpdateTag, deleteTagList, getTag } from '@/api';
import { modalFormValue } from '@/models/tag';
import * as type from '@/models/tag';
import './index.less';
import MyModalForm from '@/component/Common/modalForm';
interface Props {}

const Tag: FC<Props> = props => {
    // 初始参数
    // const initParams = {};
    const tableRef = useRef<RefType>(null);
    const modalFormRef = useRef<RefType>(null);
    const [dataSource, setDataSource] = useState([]);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false); //加载
    const [visible, setVisible] = useState(false);
    const modalFormConfig = [
        {
            key: 'tagName',
            name:'tagName',
            label: 'tagName',
            rules: [{ required: true, message: 'Please input the tagname!' }],
            slot: <Input />,
        },
    ];
    const Icolumns: ColumnsType<type.tag> = [
        {
            title: '标签名称',
            key: 'tagName',
            dataIndex: 'tagName',
            align: 'center',
        },
        {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime',
            align: 'center',
            render: (createTime: Date) => dayjs(createTime).format('YYYY-MM-DD'),
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => {
                const { id, tagName } = record;
                return (
                    <Space size="small">
                        <Button
                            type="primary"
                            onClick={() => {
                                setVisible(true);
                                modalFormRef.current.setFormValue({
                                    tagName,
                                });
                                modalFormRef.current.setExtraProps({id});
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            danger
                            type="primary"
                            onClick={() => {
                                deleteTag(id);
                            }}
                        >
                            Delete
                        </Button>
                    </Space>
                );
            },
        },
    ];

    useEffect(() => {
        getTagList(tableRef.current.tableParams);
    }, []);

    //获取数据
    const getTagList = async (tableParams: any) => {
        setLoading(true);
        try {
            const { data } = await getTag({ ...tableParams });
            const {
                dataList: { contentList, count },
            } = data;
            setDataSource(contentList);
            setCount(count);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    //删除
    const deleteTag = async (ids: number | React.Key[]) => {
        let params;
        try {
            if (Array.isArray(ids)) {
                params = ids;
            } else {
                params = [ids];
            }
            const { message } = await deleteTagList(params);
            getTagList(tableRef.current.tableParams);
            Imessage.info(message);
        } catch (error) {
            console.log(error);
        }
    };

    //改变选中选中行数状态或者删除所在行
    const onSelectRow = (selectedRowKeys: React.Key[], isDelete: number, hasIsDelete: boolean) => {
        !hasIsDelete && deleteTag(selectedRowKeys);
    };

    //modal cancel回调
    const onCancel = () => {
        setVisible(false);
    };

    //modal create回调
    const onCreate = async (value: modalFormValue) => {
        try {
            const { message } = await addOrUpdateTag(value);
            setVisible(false);
            getTagList(tableRef.current.tableParams);
            Imessage.info(message);
        } catch (error) {
            console.log(error);
        }
    };

    //addBtn回调
    const onAddBtnChange = () => {
        modalFormRef.current.setExtraProps({});
        setVisible(true);
    };

    return (
        <div className="tag-list container">
            <div className="container-name">标签管理</div>
            <MyModalForm
                modalName={'Tag'}
                config={modalFormConfig}
                ref={modalFormRef}
                visible={visible}
                onCancel={onCancel}
                onCreate={onCreate}
            />
            <MyTable
                columns={Icolumns}
                dataSource={dataSource}
                count={count}
                ref={tableRef}
                loading={loading}
                onSelectRow={onSelectRow}
                onParamsChange={getTagList}
                onAddBtnChange={onAddBtnChange}
            />
        </div>
    );
};

export default Tag;
