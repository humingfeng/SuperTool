import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import jsonPage from './views/entity/jsonPage.vue'
import strPage from './views/entity/strPage.vue'
import xmlPage from './views/entity/xmlPage.vue'
import urlEncodePage from './views/encode/urlEncodePage.vue'
import urlDecodePage from './views/encode/urlDecodePage.vue'
import htmlEncodePage from './views/encode/htmlEncodePage.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '实体生成',
        index:'2-1',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/jsonPage', component: jsonPage, name: 'json生成实体' ,isReadOnly: false},
            { path: '/strPage', component: strPage, name: '字符串生成实体' ,isReadOnly: false},
            { path: '/xmlPage', component: xmlPage, name: 'xml生成实体' ,isReadOnly: true},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '编码转换',
        index:'2-2',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/urlEncodePage', component: urlEncodePage, name: 'URL_ENCODE' },
            { path: '/urlDecodePage', component: urlDecodePage, name: 'URL_DECODE' },
            { path: '/htmlEncodePage', component: htmlEncodePage, name: 'HTML_ENCODE' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/jsonToJavaBean', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
