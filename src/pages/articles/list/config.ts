//搜索项配置
export const searchConfig = [
    {
        key: 'state',
        placeholder: '请选择文章状态',
        defaultValue: '公开',
        options: [
            {
                label: '公开',
                value: '公开',
                params: {
                    isDraft: 0,
                    isDelete: 0,
                },
            },
            {
                label: '草稿箱',
                value: '草稿箱',
                params: {
                    isDraft: 1,
                    isDelete: 0,
                },
            },
            {
                label: '回收站',
                value: '回收站',
                params: {
                    isDraft: undefined,
                    isDelete: 1,
                },
            },
        ],
    },
];

