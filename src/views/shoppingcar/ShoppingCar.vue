<template>
    <div class="cart">
<!--        导航-->
    <nav-bar class="nav-bar">
        <div slot="left" @click="backClick">
            <img src="~/assets/img/common/back.svg" alt="">
        </div>
        <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
<!--        //商品列表-->
        <cart-list></cart-list>
<!--        //底部汇总-->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>
  
<script>
    import NavBar from "components/common/navbar/NavBar"
    import cartList from "./childComps/cartList";
    import CartBottomBar from "./childComps/CartBottomBar";
    import { mapGetters } from 'vuex'
 export default {
 name:"ShoppingCar",
     components:{
         NavBar,
         cartList,
         CartBottomBar
     },
     data() {
         return {

         };
     },
     computed:{
        ...mapGetters([
            'cartLength',
        ])
     },
     methods: {
         backClick(){
             this.$router.push('/home')
         }
     }
 }   
</script>

<style scoped>
   .nav-bar{
       background-color: #ef8a9b;
       color:#fff;
       /*font-weight: 700;*/
   }
    .cart{
        height:100vh;
    }
   img{
       margin-top: 15px;
   }
</style>

