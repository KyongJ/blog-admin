import ajax from './ajax';

//登录
export const login = (param: object): any => ajax('/login', param, 'POST');
//注销
export const logout = (param?: object): any => ajax('/logout', param, 'POST');

/**首页 */
export const getBlogInfo = (param?: object): any => ajax('/admin', param, 'GET');

/**文章管理 */
//添加文章
export const saveOrUpdateArticle = (param?: object):any => ajax('/admin/article/saveOrUpdate', param, 'POST');
//文章列表查询
export const getArticle = (param?: object):any => ajax('/admin/article/listArticles', param, 'GET');
//改变文章置顶
export const changeIsTop = (param: object,id:number):any => ajax('/admin/article/changeTop/' + id, param, 'PUT');
//逻辑删除恢复
export const updateArticle = (param?: object):any => ajax('/admin/article/delete',param,'PUT')
//删除
export const deleteArticle = (param?: object):any => ajax('/admin/article/delete',param,'DELETE')
//查询文章选项
export const getArticleOptions = (param?: object):any => ajax('/admin/article/options',param,'GET')
//根据查询单个文章
export const getArticleById = (param: number):any => ajax('/admin/article/getById/'+param,'GET')
//上传图片
export const uploadImg = (param?: object):any => ajax('/admin/article/uploadImg',param,'POST')

/**标签管理*/
//新增标签
export const addOrUpdateTag = (param?: object):any => ajax('/admin/tag/addOrUpdate', param, 'POST');
//标签列表查询
export const getTag = (param?: object):any => ajax('/tag/list', param, 'GET');
//删除
export const deleteTagList = (param?: object):any => ajax('/admin/tag/delete', param, 'DELETE');

/**分类管理*/
//新增标签
export const addOrUpdateCategory = (param?: object):any => ajax('/admin/category/addOrUpdate', param, 'POST');
//标签列表查询
export const getCategory = (param?: object):any => ajax('/category/list', param, 'GET');
//删除
export const deleteCategoryList = (param?: object|string):any => ajax('/admin/category/delete', param, 'DELETE');



/** 角色管理 */
//查看角色资源
export const listResourceOption = (param?: object):any => ajax('/role/resources', param, 'GET');
//新增或修改角色资源
export const addOrUpdateRoleResource = (param?: object):any => ajax('/admin/role/UpdateRoleResource', param, 'POST');
//角色列表查询
export const getRole = (param?: object):any => ajax('/role/list', param, 'GET');
//删除
export const deleteRole = (param?: object):any => ajax('/admin/role/delete', param, 'DELETE');
//角色是否禁用
export const changeDisable = (param: object):any => ajax('/admin/role/changeDisable', param, 'PUT');

/** 资源管理 */
//资源列表查询
export const getResource = (param?: object):any => ajax('/admin/resources/list', param, 'GET');
//添加或修改资源
export const addOrUpdateResource = (param?: object):any => ajax('/admin/resource/addOrUpdate', param, 'POST');
//删除
export const deleteResource = (param?: object):any => ajax('/admin/resource/delete', param, 'DELETE');

/** 用户管理 */
// 获取用户信息
export const getUserInfoById = (id: number):any => ajax('/admin/user-info/'+id, {}, 'GET');
// 修改用户信息
export const updateUserInfo = (param?: object):any => ajax('/admin/user-info/updateUserInfo', param, 'PUT');
