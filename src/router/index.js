import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home.vue";
import Admin from "../components/Admin.vue";
import Login from "../components/Login.vue";
import AdminTable from "../components/AdminTable.vue";
import AdminOrder from "../components/AdminOrder.vue";
import AdminDish from "../components/AdminDish.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', component: Home},
        {path: '/login', component: Login},
        {
            path: '/admin',
            component: Admin,
            children:[
                {
                    path:'table',
                    component:AdminTable
                },  
                {
                    path:'dish',
                    component:AdminDish
                },  
                {
                    path:'order',
                    component:AdminOrder
                },  
        ]
        },
    ]
})
