/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Table, Button, Select } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import './index.less';
import MyIconFont from '../MyIconFont';
/**
 * @param {ColumnsType<T>[]} columns 表格列的配置
 * @param {any[]} data 表格数据
 * @param {number} count 表格量
 * @param {boolean} loading 是否加载
 * @param {RefType} ref 表格的实例，用于调用内部方法
 * @param {boolean} bordered 边框
 * @param {object} extraProps 额外参数
 * @param {object[]} searchConfig 搜索栏配置
 * @param {Function} onParamsChange 表格参数变化回调函数
 * @param {Function} onSelectRow 复选框操作回调函数
 * @param {Function} onAddBtnChange add按钮回调函数
 */
interface TableProps {
    columns?: ColumnsType<any>;
    dataSource?: any[];
    count?: number;
    loading?: boolean;
    ref?: RefType;
    bordered?: boolean;
    extraProps?: object;
    searchConfig?: object[];
    onParamsChange?: (arg0?: any) => void;
    onSelectRow?: (arg0: React.Key[], ...args: any[]) => void;
    onAddBtnChange?: () => void;
}

/**
 * @forwardRef
 * 引用父组件的ref实例，成为子组件的一个参数
 * 可以引用父组件的ref绑定到子组件自身的节点上.
 */
const MyTable: FC<TableProps> = forwardRef((props: TableProps, ref: RefType) => {
    const {
        columns,
        dataSource,
        count,
        loading,
        extraProps,
        bordered = false,
        searchConfig = [],
        onParamsChange,
        onSelectRow,
        onAddBtnChange,
    } = props;

    // 初始参数
    const initParams = {
        ...extraProps,
        current: 1,
        size: 10,
    };
    // 列表查询参数
    const [tableParams, setTableParams] = useState(initParams);
    // 搜索搜索参数
    const [searchParams, setSearchParams] = useState({});
    // 多选框的选择值
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [pagination, setPagination] = useState<{ current: number; size: number }>({
        current: 1,
        size: 10,
    });
    // 列表选项是否有逻辑删除
    const [selectedRows, setSelectedRows] = useState<any>([]);

    //计算被选中的项数
    const hasSelected = useMemo(() => {
        return selectedRowKeys.length > 0;
    }, [selectedRowKeys]);

    //设置被选中的key
    const onSelectChange = (selectedRowKeys: React.Key[] = [], selectedRows: any[]) => {
        setSelectedRowKeys(selectedRowKeys);
        setSelectedRows(selectedRows);
        // onSelectRow && onSelectRow(selectedRowKeys, selectedRows);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    // 判断是否有复选框显示
    const showCheckbox = onSelectRow ? { rowSelection } : {};

    //表格页面、筛选、排序变化
    const onTabelChange = (pagination: any, filters: any, sorter: any) => {
        console.log('pagination', pagination);
        onPaginationChange(pagination.current, pagination.pageSize);
        // console.log('filters', filters);
        // console.log('sorter', sorter);
    };

    //页数变化回调
    const onPaginationChange = (current: number, size: number) => {
        setPagination({ current, size });
        setSearchParams({
            ...searchParams,
            current,
            size,
        });
    };

    //自定义筛选框的变化
    const onSearchChange = (value: string, option: any) => {
        setSearchParams({ ...searchParams, ...option.params });
    };

    //参数变化数据重新获取
    const paramsChange = (searchParams: any) => {
        //设置表格参数
        setTableParams({ ...tableParams, ...searchParams });
        //筛选数据
        onParamsChange && onParamsChange({ ...tableParams, ...searchParams });
    };

    //批量删除
    const handleDeleteBtn = () => {
        const { isDelete } = selectedRows[0];
        if (typeof isDelete === 'number' && isDelete === 0) {
            onSelectRow && onSelectRow(selectedRowKeys, isDelete, true);
        } else {
            onSelectRow && onSelectRow(selectedRowKeys, isDelete, false);
        }
        setSelectedRowKeys([]);
        setSelectedRows([]);
    };

    useEffect(() => {
        paramsChange(searchParams);
    }, [searchParams]);

    //判断该页是否清零
    useEffect(() => {
        if (pagination.current !== 1 && count && count % pagination.size === 0) {
            onPaginationChange(pagination.current - 1, pagination.size);
        }
    }, [count]);

    /**
     * @useImperativeHandle
     * 第一个参数，接收一个通过forwardRef引用父组件的ref实例
     * 第二个参数一个回调函数，返回一个对象,对象里面存储需要暴露给父组件的属性或方法
     */
    useImperativeHandle(
        ref,
        () => ({
            tableParams,
        }),
        [tableParams]
    );

    return (
        <div className="my-table">
            <div className="table-handle">
                {onSelectRow && (
                    //批量删除
                    <div>
                        <Button
                            type="primary"
                            danger
                            disabled={!hasSelected}
                            onClick={handleDeleteBtn}
                            icon={<MyIconFont type={'icon-icon'} />}
                        >
                            Delete
                        </Button>
                        <span style={{ margin: 'auto 8px' }}>
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </span>
                    </div>
                )}
                {onAddBtnChange && (
                    //增加按钮
                    <Button
                        type="primary"
                        onClick={() => onAddBtnChange()}
                        icon={<MyIconFont type={'icon-jia'} />}
                    >
                        Add
                    </Button>
                )}
                {searchConfig.length > 0 && (
                    <div className="table-select">
                        {searchConfig.map(item => (
                            <Select
                                {...item}
                                style={{ width: '200px' }}
                                onChange={onSearchChange}
                            ></Select>
                        ))}
                    </div>
                )}
            </div>
            <Table
                {...showCheckbox}
                rowKey={record => record.id}
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                onChange={onTabelChange}
                pagination={{
                    total: count,
                    pageSize: tableParams.size,
                    current: tableParams.current,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showTotal: all => `共 ${all} 条`,
                }}
                bordered={bordered}
            />
        </div>
    );
});

export default MyTable;
