<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"> </tab-control>
        <scroll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature></feature>
            <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl"> </tab-control>
            <goods-list :goods="showGoods"> </goods-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>
  
<script>
import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'



import HomeSwiper from "./childComponents/HomeSwiper"
import RecommendView from './childComponents/RecommendView'
import Feature from './childComponents/Feature'


import {getHomeMultidata,
        getHomeGoods} from "network/home"
import {debounce} from "../../common/utils";
import {itemListenerMixin,backTopMixin} from "../../common/mixin";

export default {
     name:"Home",
     components:{
        NavBar,
        TabControl,
         GoodsList,
        HomeSwiper,
         Scroll,
        RecommendView,
        Feature,
         
     },
    mixins:[itemListenerMixin,backTopMixin],
     data(){
        return{
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]},
            },
            currentType:'pop',
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0,
            ItemImgListener:null
        }
     },
    activated(){
        this.$refs.scroll.scrollTo(0,this.saveY,0);
        this.$refs.scroll.refresh()
    },
    deactivated(){
         //1.保存y值
       this.saveY=this.$refs.scroll.getScrollY()
        //2.取消全局事件的监听
        this.$bus.$off('itemImageLoad',this.ItemImgListener)
        console.log(this.saveY);
    },
     created(){
        //1.请求多个数据
         this.getHomeMultidata(),
             //2.请求商品数据
         this.getHomeGoods('pop'),
         this.getHomeGoods('new'),
         this.getHomeGoods('sell')
     },
     mounted(){
    this.tabClick(0)

     },
    destroyed(){
        console.log('home destroy');
    },
     computed:{
       showGoods(){
           return this.goods[this.currentType].list
       }
     },
     methods:{
         /*
         * 事件监听
         * */
         swiperImageLoad(){
             //$el  用于获取组件中的元素
             this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
             console.log(this.tabOffsetTop);
        },
         tabClick(index){
             console.log(index)
             switch(index){
                 case 0:
                     this.currentType='pop';
                     break;
                 case 1:
                     this.currentType='new';
                     break;
                 case 2:
                     this.currentType='sell';
                     break;
             }
             this.$refs.tabControl1.currentIndex=index;
             this.$refs.tabControl.currentIndex=index;

         },

         contentScroll(position){
             // console.log(position);
             //判断backTop是否显示
             //判断tabControl是否吸顶（position:fixed)
             this.isShowBackTop=-(position.y)>1000
             this.isTabFixed=(-position.y)>this.tabOffsetTop
         },
         loadMore(){
             console.log('upload');
             this.getHomeGoods(this.currentType)
         },

         /*
         * 网络请求相关
          */
         getHomeMultidata(){
             getHomeMultidata().then(res=>{
                 console.log(res)
                 // console.log(res.data.banner.list)
                 // this.result=res;
                 this.banners=res.data.banner.list;
                 this.recommends=res.data.recommend.list;
                 console.log(this.banners)
             })
         },
         getHomeGoods(type){
             const page=this.goods[type].page+1
             getHomeGoods(type,page).then(res=>{
                this.goods[type].list.push(...res.data.list)
                 this.goods[type].page+=1
                 this.$refs.scroll.finishPullUp()

             })
         }


     }
 }   
</script>

<style scoped>

#home{
   /*padding-top:44px;*/
    /*vh viewport height*/
    height:100vh;
    position: relative;
}
   .home-nav{
    background:var(--color-tint);
    color:white;
    /*position:fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top:0;*/
    /*z-index:3;*/
   }
   .tab-control{
       position: relative;
       z-index:6;
   }
    .content{
        overflow: hidden;
        position:absolute;
        top:44px;
        bottom: 49px;
        left:0;
        right: 0;

    }
</style>
