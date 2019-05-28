import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import A from '@/components/A'
import B from '@/components/B'
import C from '@/components/C'

Vue.use(Router)

var router =  new Router({
  mode:'history',
  routes: [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    }, {
        path: '/a/:id/:name',
        props: true,
        name: 'A',
        component: A,
        children: [{
            path: 'c',
            name: 'C',
            component: C
        }]
    }, {
        path: '/b',
        name: 'B',
        component: B
    }
  ]
})

router.beforeEach((to, from, next) => {
    next()
})

export default router;

