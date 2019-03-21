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
import htmlDecodePage from './views/encode/htmlDecodePage.vue'
import asciiPage from './views/encode/asciiPage.vue'
import unicodePage from './views/encode/unicodePage.vue'
import developLogPage from './views/about/developLogPage.vue'
import donationPage from './views/about/donationPage.vue'
import whoisquery from './views/whois/whoisquery.vue'
import morse from './views/geek/morse.vue'
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
    {
      path: '/home',
      component: Home,
      name: '关于',
      index:'5',
      iconCls: 'el-icon-info',//图标样式class
      children: [
        { path: '/developLogPage', component: developLogPage, name: '开发日志' ,isReadOnly: false},
        { path: '/donationPage', component: donationPage, name: '赞助' ,isReadOnly: false}
      ]
    },
    {
      path: '/home',
      component: Home,
      name: '首页',
      index:'1',
      iconCls: 'el-icon-star-off',
      leaf: true,//只有一个节点
      children: [
        { path: '/Main', component: Main, name: '首页' },
      ]
    },
    {
        path: '/home',
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
        path: '/home',
        component: Home,
        name: '编码转换',
        index:'2-2',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/urlEncodePage', component: urlEncodePage, name: 'URL_ENCODE' },
            { path: '/urlDecodePage', component: urlDecodePage, name: 'URL_DECODE' },
            { path: '/htmlEncodePage', component: htmlEncodePage, name: 'HTML_ENCODE' },
            { path: '/htmlDecodePage', component: htmlDecodePage, name: 'HTML_DECODE' },
            { path: '/asciiPage', component: asciiPage, name: 'ASCII' },
            { path: '/unicodePage', component: unicodePage, name: 'Unicode' },
        ]
    },
    {
      path: '/home',
      component: Home,
      name: '站长工具',
      index:'3-2',
      iconCls: 'fa fa-id-card-o',
      leaf: true,//只有一个节点
      children: [
        { path: '/whoisquery', component: whoisquery, name: 'whois查询' },
      ]
    },
    {
      path: '/home',
      component: Home,
      name: '极客工具',
      index:'4-1',
      iconCls: 'fa fa-id-card-o',
      leaf: true,//只有一个节点
      children: [
        { path: '/morse', component: morse, name: '摩斯电码' },
      ]
    },
    {
        path: '/home',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        index:'6',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },
    {
      path: '/',
      hidden: true,
      redirect: { path: '/Main' }
    }
];

export default routes;
