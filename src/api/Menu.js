import Http from './http'
export default {
    getMenu() {
        return Http
            .get('/menu', {
                adapter: async (config) => {
                    return {
                        data: [
                            { name: '用户管理', sub: '导航一', index: 'menu1',icon:'el-icon-s-unfold', componentPath: 'components/User/UserManager.vue' },
                            { name: '菜单二', sub: '导航二', index: 'menu2',icon:'el-icon-s-unfold'},
                            { name: '菜单三', sub: '导航二', index: 'menu3',icon:'el-icon-s-unfold' },
                            // { name: '菜单四', index: 'menu4' },
                        ],
                        status: 200
                    }
                }
            })
    }
}