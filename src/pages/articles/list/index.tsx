/* eslint-disable no-lone-blocks */
import React, { FC, useEffect, useRef, useState } from 'react';
import { Tag, Image, Switch, Space, Button, Input, message as Imessage } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { FilterConfirmProps, FilterDropdownProps } from 'antd/lib/table/interface';
import MyTable from '@/component/Common/table';
import * as type from '@/models/article';
import { searchConfig } from './config';
import dayjs from 'dayjs';
import { changeIsTop, updateArticle, getArticle, getArticleOptions, deleteArticle } from '@/api';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@/store/actions';
interface Props extends ReduxProps {}

const ArticleList: FC<Props> = props => {
    // 初始参数
    const initParams = {
        isDraft: 0,
        isDelete: 0,
    };
    // const domList = document.querySelectorAll('div[data-src]');
    const { setStoreData } = props;
    const tableRef = useRef<RefType>(null);
    const ioRef = useRef<RefType>();
    const [dataSource, setDataSource] = useState<type.Article[]>([]);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false); //加载
    const [condition, setCondition] = useState<type.conditionType>(); //文章筛选条件
    const history = useHistory();
    // useImageLazy(domList)
    // useImageLazy(domList,[0.25])
    //表格列项搜索参数
    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: (props: FilterDropdownProps) => {
            const { selectedKeys, setSelectedKeys, confirm, clearFilters } = props;
            return (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(confirm)}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(confirm)}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                confirm({ closeDropdown: false });
                            }}
                        >
                            Filter
                        </Button>
                    </Space>
                </div>
            );
        },
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value: string | number | boolean, record: any) =>
            record['articleTitle'].toString().includes(value),
        onFilterDropdownVisibleChange: (visible: boolean) => {
            if (visible) {
                console.log('可见时的操作');
            }
        },
    });

    //获取过滤选项
    const getCondition = (type: string) => {
        if (type === 'category') {
            return condition?.categoryList.map(item => ({
                value: item.categoryName,
                text: item.categoryName,
            }));
        } else if (type === 'tag') {
            return condition?.tagList.map(item => ({ value: item.tagName, text: item.tagName }));
        }
    };

    //初始化表格列项
    let Icolumns: ColumnsType<type.Article> = [
        {
            title: '封面',
            key: 'articleCover',
            dataIndex: 'articleCover',
            align: 'center',
            width: 220,
            render: (articleCover: string, record, index) => (
                <Image width={150} src={'../article'} data-src={articleCover} />
            ),
        },
        {
            title: '文章标题',
            key: 'articleTitle',
            dataIndex: 'articleTitle',
            align: 'center',
            ...getColumnSearchProps('articleTitle'),
        },
        {
            title: '分类',
            key: 'categoryName',
            dataIndex: 'categoryName',
            align: 'center',
            filters: getCondition('category'),
            onFilter: (value, record) => record.categoryName.includes(value as string),
        },
        {
            title: '标签',
            key: 'tagDTOList',
            dataIndex: 'tagDTOList',
            align: 'center',
            filters: getCondition('tag'),
            onFilter: (value, record) => {
                const tagList = record.tagDTOList.reduce((prev, next) => {
                    return [...prev, next.tagName];
                }, []);
                return tagList.includes(value);
            },
            render: (tagDTOList: any[]) => (
                <>
                    {tagDTOList.map(tag => {
                        let color = tag.tagName.length > 3 ? 'geekblue' : 'green';

                        return (
                            <Tag color={color} key={tag.tagName}>
                                {tag.tagName}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: '浏览量',
            key: 'viewsCount',
            dataIndex: 'viewsCount',
            align: 'center',
        },
        {
            title: '发表时间',
            key: 'createTime',
            dataIndex: 'createTime',
            align: 'center',
            render: (createTime: Date) => dayjs(createTime).format('YYYY-MM-DD'),
        },
        {
            title: '置顶',
            key: 'isTop',
            dataIndex: 'isTop',
            align: 'center',
            render: (isTop: number, { id }: { id: number }) => {
                //改变文章置顶
                const changeTop = async (isTop: any) => {
                    try {
                        let params = new URLSearchParams();
                        params.append('isTop', isTop === true ? '1' : '0');
                        const { message } = await changeIsTop(params, id);
                        Imessage.success(message);
                        getArticleList(tableRef.current.tableParams);
                    } catch (error) {
                        console.log(error);
                    }
                };

                return <Switch defaultChecked={isTop === 1 ? true : false} onChange={changeTop} />;
            },
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => {
                const { id, isDelete } = record;
                return (
                    <Space size="small">
                        {isDelete === 0 ? (
                            <>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setStoreData && setStoreData('SET_EDITARTICLEID', id);
                                        history.push({
                                            pathname: '/articles/edit',
                                            state: {
                                                id: id,
                                            },
                                        });
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    danger
                                    type="primary"
                                    onClick={() => {
                                        updateArticleStatus(id, isDelete);
                                    }}
                                >
                                    Delete
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        updateArticleStatus(id, isDelete);
                                    }}
                                >
                                    restore
                                </Button>
                                <Button
                                    danger
                                    type="primary"
                                    onClick={() => {
                                        deteleArticle(id);
                                    }}
                                >
                                    Delete
                                </Button>
                            </>
                        )}
                    </Space>
                );
            },
        },
    ];

    //初始化组件
    useEffect(() => {
        getOptions(); //获取文章筛选项
        getArticleList(tableRef.current.tableParams); //获取文章列表
    }, []);

    useEffect(() => {
        const domList = document.querySelectorAll('div[data-src]');

        ioRef.current = lazyLoad(domList, [0.25]);
        return () => {
            ioRef.current.disconnect(); // 关闭观察器
        };
    }, [dataSource]);

    //图片懒加载    
    const lazyLoad = (domList: NodeList, threshold: number[]) => {
        let Observer = new IntersectionObserver(
            entries => {
                // 观察者
                entries.forEach((item: any) => {
                    // entries 是被监听的dom集合，是一个数组
                    if (item.intersectionRatio <= 0) return; // intersectionRatio 是可见度 如果当前元素不可见就结束该函数。
                    const { target } = item;
                    let img = target.querySelector('img');
                    img.src = target.dataset.src; // 将 h5 自定义属性赋值给 src (进入可见区则加载图片)
                });
            },
            {
                threshold, // 用来指定交叉比例，决定什么时候触发回调函数，是一个数组，默认是[0]。
            }
        );
        domList.forEach(item => ioRef.current.observe(item)); // observe 开始观察，接受一个DOM节点对象
        return Observer;
    };

    //得到文章选项
    const getOptions = async () => {
        try {
            const {
                data: { data },
            } = await getArticleOptions();
            setCondition({ ...data });
        } catch (error) {
            console.log(error);
        }
    };
    //得到文章列表
    const getArticleList = async (tableParams: any) => {
        setLoading(true);
        try {
            const { data } = await getArticle({
                ...tableParams,
            });
            const {
                dataList: { contentList, count },
            } = data;

            setDataSource(contentList);
            setCount(count);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    //逻辑删除
    const updateArticleStatus = async (id: number | React.Key[], isDelete: number) => {
        let params = {};
        try {
            if (Array.isArray(id)) {
                params = { idList: id, isDelete: isDelete === 0 ? 1 : 0 };
            } else {
                params = { idList: [id], isDelete: isDelete === 0 ? 1 : 0 };
            }
            const {message} =  await updateArticle(params);
            Imessage.info(message)
            getArticleList(tableRef.current.tableParams);
        } catch (error) {
            console.log(error);
        }
    };

    //物理删除
    const deteleArticle = async (ids: number | React.Key[]) => {
        let params;
        try {
            if (Array.isArray(ids)) {
                params = ids;
            } else {
                params = [ids];
            }
            const { message } = await deleteArticle(params);
            getArticleList(tableRef.current.tableParams);
            Imessage.info(message);
        } catch (error) {
            console.log(error);
        }
    };

    //搜索
    const handleSearch = (confirm: (param?: FilterConfirmProps) => void) => {
        confirm();
    };

    //搜索框重置
    const handleReset = (
        clearFilters: () => void,
        confirm: (param?: FilterConfirmProps) => void
    ) => {
        clearFilters();
        confirm();
    };

    //改变选中选中行数状态或者删除所在行
    const onSelectRow = (selectedRowKeys: React.Key[], isDelete: number, hasIsDelete: boolean) => {
        if (hasIsDelete) {
            updateArticleStatus(selectedRowKeys, isDelete);
        } else {
            deteleArticle(selectedRowKeys);
        }
    };

    return (
        <div className="article-list container">
            <div className="container-name">文章列表</div>
            
            <MyTable
                columns={Icolumns}
                dataSource={dataSource}
                count={count}
                loading={loading}
                ref={tableRef}
                extraProps={initParams}
                searchConfig={searchConfig}
                onParamsChange={getArticleList}
                onSelectRow={onSelectRow}
            />
        </div>
    );
};

export default connect(state => state, actions)(ArticleList);
