import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import Child from './child.vue'
Vue.use(VueRouter)
const routes = [
    { path: '/foo', component: App },
    { path: '/bar', component: Child }
]
const router = new VueRouter({
    routes
})
export default new Vue({
    el: '#app',
    router,
    components: { App,Child }
});
console.log(123)