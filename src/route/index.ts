import Category from '@/pages/category';
import Demo from '@/pages/demo';
import Resource from '@/pages/resource';
import Role from '@/pages/role';
import Tag from '@/pages/tag';
import Article from '@/pages/articles/article';
import ArticleList from '@/pages/articles/list';
import Error from '@/pages/error';
import Home from '@/pages/home';
import Setting from '@/pages/setting';

const routeConfig: IRouter[] = [
    {
        name: '首页',
        path: '/',
        exact: true,
        key: 'home',
        component: Home,
    },
    {
        name: '文章管理',
        path: '/articles',
        key: 'articles',
        component: Error,
        childrens: [
            {
                name: '发布文章',
                path: '/articles/add',
                exact: true,
                key: 'articles:add',
                component: Article,
            },
            {
                name: '修改文章',
                path: '/articles/edit',
                exact: true,
                key: 'articles:edit',
                component: Article,
            },
            {
                name: '文章列表',
                path: '/articles/list',
                exact: true,
                key: 'articles:list',
                component: ArticleList,
            },
            {
                name: '标签管理',
                path: '/articles/tag',
                exact: true,
                key: 'articles:tag',
                component: Tag,
            },
            {
                name: '分类管理',
                path: '/articles/category',
                exact: true,
                key: 'articles:category',
                component: Category,
            },
        ],
    },
    {
        name: '权限管理',
        path: '/permission',
        key: 'permission',
        component: Error,
        childrens: [
            {
                name: '角色管理',
                path: '/permission/role',
                exact: true,
                key: 'permission:role',
                component: Role,
            },
            {
                name: '接口管理',
                path: '/permission/resource',
                exact: true,
                key: 'permission:resource',
                component: Resource,
            },
            {
                name: '测试',
                path: '/permission/demo',
                exact: true,
                key: 'permission:demo',
                component: Demo,
            },
        ],
    },
    {
        name: '个人中心',
        exact: true,
        path: '/setting',
        key: 'setting',
        component: Setting,
    },
];

export default routeConfig;
