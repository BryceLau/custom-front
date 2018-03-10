import Login from '@/views/login';
import Home from '@/views/home';
import Index from '@/views/Index/index';
import ErrorPage_404 from '@/views/error-page/404.vue';
import ErrorPage_403 from '@/views/error-page/403.vue';
import ErrorPage_500 from '@/views/error-page/500.vue';
import Locking from '@/views/components/lockscreen/components/locking-page.vue';


import SqlMaintence from '@/views/sql-manage/sql-maintence.vue';
import SqlExecute from '@/views/sql-manage/sql-execute.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: Login
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: ErrorPage_404
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: ErrorPage_403
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: ErrorPage_500
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: Locking
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    title: {i18n: 'message.home.title'},
    redirect: '/home',
    component: Home,
    children: [
        {path: 'home', title: {i18n: 'message.home.title'}, name: 'home_index', component: Index}
    ]
};

// 作为Home组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/sql',
        icon: 'key',
        name: 'sql',
        title: {i18n: 'message.sql.title'},
        component: Home,
        children: [
            {
                path: 'maintence',
                title: {i18n: 'message.sql.maintenceTitle'},
                name: 'sql_maintence',
                component: SqlMaintence
            },
            {
                path: 'execute',
                title: {i18n: 'message.sql.executeTitle'},
                name: 'sql_execute',
                component: SqlExecute
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
