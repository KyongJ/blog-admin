const menuConfig: MenuType[] = [
    {
        path: '/',
        name: '首页',
        key: 'home',
        iconfont: 'icon-home',
        childrens: [],
    },
    {
        path: '/articles',
        name: '文章管理',
        key: 'articles',
        type: 'subMenu',
        iconfont: 'icon-16',
        childrens: [
            {
                path: '/articles/add',
                name: '发布文章',
                iconfont: 'icon-wodewenzhang',
                key: 'articles:add',
            },
            {
                path: '/articles/edit',
                name: '修改文章',
                iconfont: 'icon-bianjiwenzhang_huaban',
                hidden: true,
                key: 'articles:edit',
            },
            {
                path: '/articles/list',
                name: '文章列表',
                iconfont: 'icon-list',
                key: 'articles:list',
            },
            {
                path: '/articles/tag',
                name: '标签管理',
                iconfont: 'icon-biaoqian',
                key: 'articles:tag',
            },
            {
                path: '/articles/category',
                name: '分类管理',
                iconfont: 'icon-fenlei',
                key: 'articles:category',
            },
        ],
    },
    {
        path: '/permission',
        name: '权限管理',
        key: 'permission',
        type: 'subMenu',
        iconfont: 'icon-quanxian',
        childrens: [
            {
                path: '/permission/role',
                name: '角色管理',
                iconfont: 'icon-jiaoseguanli',
                key: 'permission:role',
            },
            {
                path: '/permission/resource',
                name: '接口管理',
                iconfont: 'icon-APIjiekouguanli',
                key: 'permission:resource',
            },
            {
                path: '/permission/demo',
                name: '测试',
                iconfont: 'icon-APIjiekouguanli',
                key: 'permission:demo',
            },
        ],
    },
    {
        path: '/setting',
        name: '个人中心',
        key: 'setting',
        iconfont: 'icon-jiaoseguanli'
    }
];

export default menuConfig;
