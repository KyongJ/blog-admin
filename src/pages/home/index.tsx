import React, { FC, useEffect, useMemo, useState } from 'react';
import { Col, Row, message as Imessage } from 'antd';
import { getBlogInfo } from '@/api';
import ReactECharts from 'echarts-for-react';
import MyIconFont from '@/component/Common/MyIconFont';
import './index.less';
interface IAppProps {}

const Home: FC<IAppProps> = props => {
    const [blogInfo, setBlogInfo] = useState<any>({});

    useEffect(() => {
        getBlogHome();
    }, []);

    //获取数据
    const getBlogHome = async () => {
        let errorMsg = '';
        try {
            const { data, message } = await getBlogInfo();
            errorMsg = message;
            console.log(data.blogInfo);
            setBlogInfo(data.blogInfo);
        } catch (error) {
            console.log(error);
            Imessage.error(errorMsg);
        }
    };

    const dayViewCountOption = useMemo(() => {
        let viewList = blogInfo.uniqueViewDTOList || [];
        let { dayList, viewCountList } = viewList.reduce(
            (
                prev: { dayList: string[]; viewCountList: number[] },
                next: { day: string; blogViewCount: number }
            ) => {
                prev.dayList.push(next.day);
                prev.viewCountList.push(next.blogViewCount);
                return prev;
            },
            { dayList: [], viewCountList: [] }
        );
        return {
            title: {
                text: '一周访客量',
                textStyle: {
                    color: 'rgba(0,0,0,.45)',
                    fontSize: '1rem',
                },
                left: 'center',
                top: '10px',
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dayList,
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: 'viewCount',
                    data: viewCountList,
                    type: 'line',
                    smooth: true,
                },
            ],
            tooltip: {
                trigger: 'axis',
            },
        };
    }, [blogInfo]);

    const articleViewCountOption = useMemo(() => {
        let viewList = blogInfo.articleInfoDTOList || [];
        let { articleList, views, likes } = viewList.reduce(
            (
                prev: { articleList: string[]; views: number[]; likes: number[] },
                next: { articleTitle: string; view: number; like: number }
            ) => {
                prev.articleList.push(next.articleTitle);
                prev.views.push(next.view);
                prev.likes.push(next.like);
                return prev;
            },
            { articleList: [], views: [], likes: [] }
        );

        return {
            title: {
                text: '文章浏览点赞排行',
                textStyle: {
                    color: 'rgba(0,0,0,.45)',
                    fontSize: '1rem',
                },
                left: 'center',
                top: '10px',
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
            },
            xAxis: {
                type: 'category',
                data: articleList,
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: '浏览量',
                    data: views,
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)',
                    },
                },
                {
                    name: '点赞量',
                    data: likes,
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)',
                    },
                },
            ],
            tooltip: {
                trigger: 'axis',
            },
        };
    }, [blogInfo]);

    const categoryArticleOption = useMemo(() => {
        let categoryCount = blogInfo.categoryDTOList || [];
        let data = categoryCount.map(
            (item: { id: number; categoryName: string; articleCount: number }) => {
                return { name: item.categoryName, value: item.articleCount };
            }
        );
        return {
            title: {
                text: '分类文章数',
                textStyle: {
                    color: 'rgba(0,0,0,.45)',
                    fontSize: '1rem',
                },
                left: 'center',
                top: '10px',
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                bottom: '5%',
                left: 'center',
            },
            series: [
                {
                    name: 'viewCount',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2,
                    },
                    label: {
                        show: true,
                        position: 'center',
                    },
                    labelLine: {
                        show: true,
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '20',
                            fontWeight: 'bold',
                        },
                    },
                    data: data,
                },
            ],
        };
    }, [blogInfo]);

    return (
        <div className="home">
            <div>
                <Row gutter={48}>
                    <Col span={6}>
                        <div className="card cardHover">
                            <MyIconFont type="icon-yonghu1" style={{ fontSize: 48 }}></MyIconFont>
                            <div className="card-content">
                                <div className="title">访问数</div>
                                <div className="card-data">{blogInfo.viewsCount}</div>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="card cardHover">
                            <MyIconFont type="icon-yonghu" style={{ fontSize: 48 }}></MyIconFont>
                            <div className="card-content">
                                <div className="title">用户数</div>
                                <div className="card-data">{blogInfo.userCount}</div>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="card cardHover">
                            <MyIconFont
                                type="icon-icon_wenzhang"
                                style={{ fontSize: 48 }}
                            ></MyIconFont>
                            <div className="card-content">
                                <div className="title">文章数</div>
                                <div className="card-data">{blogInfo.articleCount}</div>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="card cardHover">
                            <MyIconFont type="icon-pinglunqu" style={{ fontSize: 48 }}></MyIconFont>
                            <div className="card-content">
                                <div className="title">评论数</div>
                                <div className="card-data">{blogInfo.messageCount}</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div style={{ backgroundColor: '#fff', marginTop: 20 }} className="cardHover">
                <ReactECharts option={dayViewCountOption}></ReactECharts>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 20,
                }}
            >
                <div style={{ backgroundColor: '#fff', width: '70%' }} className="cardHover">
                    <ReactECharts option={articleViewCountOption}></ReactECharts>
                </div>
                <div style={{ backgroundColor: '#fff', width: '27%' }} className="cardHover">
                    <ReactECharts option={categoryArticleOption}></ReactECharts>
                </div>
            </div>
        </div>
    );
};

export default Home;
