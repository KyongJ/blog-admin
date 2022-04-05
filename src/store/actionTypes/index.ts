/**
 * redux的type常量
 * @param {name} string action 要 diapatch 的类型
 * @param {field} string action 要操作的字段名
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    SET_USERINFO: {
        type: 'SET_USERINFO',
        field: 'userInfo',
    },
    SET_CURTABLE: {
        type: 'SET_CURTABLE',
        field: 'curTab',
    },
    SET_COLLAPSED:{
        type:'SET_COLLAPSED',
        field:'collapsed'
    },
    SET_EDITARTICLEID:{
        type:'SET_EDITARTICLEID',
        field:'editArticleId'
    }
};
