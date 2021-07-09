import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path:'/interceptor',
        component:() => import('./view/interceptor.vue')
    },
     {
        path:'/simple',
        component:() => import('./view/simple.vue')
    },
    {
        path:'/base',
        component:() => import('./view/base.vue')
    },
    {
        path:'/cancel',
        component:() => import('./view/cancel.vue')
    },
    {
        path:'/config',
        component:() => import('./view/config.vue')
    },
     {
        path:'/error',
        component:() => import('./view/error.vue')
    },
    {
        path:'/extend',
        component:() => import('./view/extend.vue')
    },
    {
        path:'/more',
        component:() => import('./view/more.vue')
    },
    {
        path:'/upload-download',
        component:() => import('./view/upload-download.vue')
    }
]

export default new VueRouter({
    routes,
    mode:'history'
})