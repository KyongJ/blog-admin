import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Space, message as Imessage, Input } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import MyTable from '@/component/Common/table';
import * as type from '@/models/category';
import { addOrUpdateCategory, deleteCategoryList, getCategory } from '@/api';
import './index.less';
import MyModalForm from '@/component/Common/modalForm';
interface Props {}

const Category: FC<Props> = props => {
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
            key: 'categoryName',
            name: 'categoryName',
            label: 'Category',
            rules: [{ required: true, message: 'Please input the categoryname!' }],
            slot: <Input />,
        },
    ];

    const Icolumns: ColumnsType<type.category> = [
        {
            title: '分类名称',
            key: 'categoryName',
            dataIndex: 'categoryName',
            align: 'center',
        },
        {
            title: '文章数量',
            key: 'articleCount',
            dataIndex: 'articleCount',
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
                const { id, categoryName } = record;
                return (
                    <Space size="small">
                        <Button
                            type="primary"
                            onClick={() => {
                                setVisible(true);
                                modalFormRef.current.setFormValue({
                                    categoryName,
                                });
                                modalFormRef.current.setExtraProps({ id });
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            danger
                            type="primary"
                            onClick={() => {
                                deleteCategory(id);
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
        getCategoryList(tableRef.current.tableParams);
    }, []);

    //获取数据
    const getCategoryList = async (tableParams: any) => {
        setLoading(true);
        try {
            const { data, message } = await getCategory({ ...tableParams });
            const {
                dataList: { contentList, count },
            } = data;
            console.log(message);
            setDataSource(contentList);
            setCount(count);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    //删除
    const deleteCategory = async (ids: number | React.Key[]) => {
        let params;
        try {
            if (Array.isArray(ids)) {
                params = ids;
            } else {
                params = [ids];
            }
            const { message } = await deleteCategoryList(params);
            getCategoryList(tableRef.current.tableParams);
            Imessage.info(message);
        } catch (error) {
            console.log(error);
        }
    };

    //改变选中选中行数状态或者删除所在行
    const onSelectRow = (selectedRowKeys: React.Key[], isDelete: number, hasIsDelete: boolean) => {
        !hasIsDelete && deleteCategory(selectedRowKeys);
    };

    //modal cancel回调
    const onCancel = () => {
        setVisible(false);
    };

    //modal create回调
    const onCreate = async (value: type.modalFormValue) => {
        try {
            console.log(value);
            const { message } = await addOrUpdateCategory(value);
            setVisible(false);
            getCategoryList(tableRef.current.tableParams);
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
                modalName={'Category'}
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
                bordered
                onSelectRow={onSelectRow}
                onParamsChange={getCategoryList}
                onAddBtnChange={onAddBtnChange}
            />
        </div>
    );
};

export default Category;
