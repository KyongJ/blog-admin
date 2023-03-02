/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useRef, useState } from 'react';
import Editor from 'md-editor-rt';
import {
    Button,
    Input,
    Upload,
    message as Imessage,
    Image,
    Switch,
    Select,
    Popconfirm,
    Form,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@/store/actions';
import * as type from '@/models/article';
import MyModalForm from '@/component/Common/modalForm';
import { isEmpty, typeConverse } from '@/assets/js/publicFunc';
import { getArticleById, getArticleOptions, saveOrUpdateArticle, uploadImg } from '@/api';
import './index.less';
import 'md-editor-rt/lib/style.css';
import { debounce } from '@/utils/debounce';
const { Dragger } = Upload;
const { Option } = Select;

interface Props extends ReduxProps {}

const Article: FC<Props> = ({ storeData: { editArticleId } }) => {
    const [text, setText] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [condition, setCondition] = useState<type.conditionType>();
    const [articleInfo, setArticleInfo] = useState<type.ArticleInfo>({
        articleTitle: '',
        articleContent: '',
        isDraft: 0,
    });
    const { pathname, state } = useLocation<{ id: number }>();
    const modalFormRef = useRef<RefType>();

    //选择框下拉参数
    const renderOptions = (key: string) => {
        let list;
        if (key === 'category') {
            list = condition?.categoryList;
            return list?.map(item => (
                <Option key={typeConverse(item.id)} value={typeConverse(item.id)}>
                    {item.categoryName}
                </Option>
            ));
        } else if (key === 'tag') {
            list = condition?.tagList;
            return list?.map(item => (
                <Option key={typeConverse(item.id)} value={typeConverse(item.id)}>
                    {item.tagName}
                </Option>
            ));
        }
    };

    //上传文章图片或封面回调
    const onUploadChange = ({ file }: { file: UploadFile }) => {
        console.log(file);
        switch (file.status) {
            case 'error':
                Imessage.warning('上传失败');
                break;
            case 'uploading':
                Imessage.info('上传中');
                break;
            case 'done':
                const {
                    response: { code, message },
                } = file;
                if (code !== 200) {
                    Imessage.warning(message);
                    break;
                }
                setArticleInfo({ ...articleInfo, articleCover: file.response.data.addr });
                Imessage.info('上传成功');
                break;
            case 'removed':
                setArticleInfo({ ...articleInfo, articleCover: '' });
                Imessage.info('删除成功');
                break;
            default:
                Imessage.warning('好像出现了什么错误');
                break;
        }
    };

    // upload  value指定
    const upLoadFile = (e: any) => {
        if (e.file.status === 'done') {
            return e.file.response.data.addr;
        }
        return e;
    };

    //分类select配置
    const categoryConfig = {
        key: '分类',
        allowClear: true,
        placeholder: '请选择分类',
        // options: renderOptions('category'),
    };
    //标签selece配置
    const tagConfig = {
        key: '标签',
        allowClear: true,
        placeholder: '请选择标签',
        // options: renderOptions('tag'),
    };

    //modal配置
    const modalFormConfig = [
        {
            key: 'categoryId',
            name: 'categoryId',
            label: 'Category',
            rules: [{ required: true }],
            slot: <Select {...categoryConfig}>{renderOptions('category')}</Select>,
        },
        {
            key: 'tagIdList',
            name: 'tagIdList',
            label: 'Tags',
            rules: [{ required: true }],
            slot: (
                <Select mode="tags" {...tagConfig}>
                    {renderOptions('tag')}
                </Select>
            ),
        },
        {
            key: 'articleCover',
            label: 'Cover',
            rules: [{ required: true }],
            slot: (
                <Form.Item
                    name="articleCover"
                    valuePropName="file"
                    getValueFromEvent={upLoadFile}
                    noStyle
                >
                    <Dragger
                        name="file"
                        action="/api/admin/article/uploadImg"
                        onChange={debounce(onUploadChange, 1000)}
                    >
                        {!articleInfo.articleCover || articleInfo.articleCover === '' ? (
                            <div>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag file to this area to upload
                                </p>
                            </div>
                        ) : (
                            <Image src={articleInfo.articleCover} preview={false} />
                        )}
                    </Dragger>
                </Form.Item>
            ),
        },
        {
            key: 'isTop',
            name: 'isTop',
            label: '置顶',
            valuePropName: 'checked',
            rules: [{ required: true }],
            slot: <Switch defaultChecked={false} />,
        },
    ];

    useEffect(() => {
        //获取文章选项
        getOptions();
    }, []);

    useEffect(() => {
        judgePath();
    }, [pathname]);

    //markdown图片上传
    const onUploadImg = (files: FileList, callback: (urls: string[]) => void) => {
        Array.from(files).map(async file => {
            const form = new FormData();
            form.append('file', file);
            const { data } = await uploadImg(form);
            console.log(data);
        });
    };

    //路由判断
    const judgePath = () => {
        let arr = pathname.split('/');
        if (arr[2] === 'add') {
            //清除内容
            resetArticle();
        } else {
            let id = state?.id;
            id = id ? id : editArticleId;
            //获取指定文章
            getArticle(id);
        }
    };

    //获取文章内容
    const getArticle = async (id: number) => {
        try {
            const {
                data: { article },
            } = await getArticleById(id);
            let tagIdList = article.tagIdList.map((item: number) => typeConverse(item));
            setArticleInfo({ ...articleInfo, ...article });
            setText(article.articleContent);
            modalFormRef.current.setFormValue({
                categoryId: typeConverse(article.categoryId),
                tagIdList,
                articleCover: article.articleCover,
                isTop: article.isTop ? true : false,
            });
        } catch (error) {
            console.log(error);
        }
    };

    //获取文章选项
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

    //modal cancel回调
    const onCancel = () => {
        setVisible(false);
    };

    //modal create回调
    const onCreate = async (values: CommonObjectType) => {
        try {
            try {
                if (isEmpty(text) || isEmpty(articleInfo.articleTitle)) {
                    throw new Error('请输入文章内容和标题!');
                }
            } catch (error: any) {
                Imessage.warn(error.message);
                return;
            }
            const { isTop } = values;
            //设置文章内容
            let article = {
                ...articleInfo,
                ...values,
                articleContent: text,
                isTop: isTop ? 1 : 0,
            };
            const { message } = await saveOrUpdateArticle(article);
            setVisible(false);
            Imessage.info(message);
            //清除所有内容
            resetArticle();
        } catch (error) {
            console.log(error);
        }
    };

    //保存草稿
    const saveDraft = async () => {
        try {
            try {
                if (isEmpty(text) || isEmpty(articleInfo.articleTitle)) {
                    throw new Error('请输入文章内容和标题!');
                }
            } catch (error: any) {
                Imessage.warn(error.message);
                return;
            }
            let article = {
                ...articleInfo,
                articleContent: text,
                isDraft: 1,
            };
            const { message } = await saveOrUpdateArticle(article);
            Imessage.info(message);
            setArticleInfo(article);
        } catch (error) {
            console.log(error);
        }
    };

    //清除所有内容
    const resetArticle = () => {
        modalFormRef.current.resetFormValue();

        setArticleInfo({
            articleTitle: '',
            articleContent: '',
            isDraft: 0,
        });
        setText('');
    };

    //输入框回调
    const onInputChange = (e: any) => {
        setArticleInfo({ ...articleInfo, articleTitle: e.target.value });
    };

    return (
        <div className="article container">
            <div className="container-name">发布文章</div>
            <MyModalForm
                config={modalFormConfig}
                visible={visible}
                ref={modalFormRef}
                modalName={'article'}
                onCreate={onCreate}
                onCancel={onCancel}
            />
            <div className="handle">
                <div className="article-title">
                    <Input
                        placeholder="请输入文章标题"
                        value={articleInfo.articleTitle}
                        onChange={onInputChange}
                    />
                </div>
                <div className="article-handle">
                    <Popconfirm
                        title="Are you sure to delete the article?"
                        onConfirm={() => resetArticle()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>
                            清除
                        </Button>
                    </Popconfirm>
                    {!articleInfo.id && (
                        <Button type="primary" onClick={() => saveDraft()}>
                            保存草稿
                        </Button>
                    )}
                    <Button type="primary" onClick={() => setVisible(true)}>
                        发布文章
                    </Button>
                </div>
            </div>
            <Editor
                modelValue={text}
                onChange={modelValue => {
                    setText(modelValue);
                }}
                // onUploadImg={onUploadImg}
            />
        </div>
    );
};

export default connect(state => state, actions)(Article);
