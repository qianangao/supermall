import Vue from 'vue'
import Router from 'vue-router'

const Home=()=>import('@/views/home/Home')
const Category=()=>import('@/views/category/Category')
const Profile=()=>import('@/views/profile/Profile')
const ShoppingCar=()=>import('@/views/shoppingcar/ShoppingCar')
const Detail=()=>import('@/views/detail/Detail')

Vue.use(Router)

const routes=[
{
    path:'',
    redirect:'/home'
},
{
    path:'/home',
    component:Home
},
{
    path:'/category',
    component:Category
},
{
    path:'/profile',
    component:Profile
},
{
    path:'/shoppingcar',
    component:ShoppingCar
},
    {
    path:'/detail/:id',
     component:Detail
    }
]

const router=new Router({
    routes,
    mode:'history',
})

export default router
