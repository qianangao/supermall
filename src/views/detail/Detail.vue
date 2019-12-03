<template>
    <div id="detail">
       <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
       <scroll class="content"
               ref="scroll"
               :probe-type="3"
               @scroll="contentScroll">
           <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
           <goods-list :goods="recommends" ref="recommend"></goods-list>
        </scroll>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>

    </div>

</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";
import DetailSwiper from "./childComps/DetailSwiper";
import GoodsList from "../../components/content/goods/GoodsList";

import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import Scroll from 'components/common/scroll/Scroll';
import {itemListenerMixin,backTopMixin} from "../../common/mixin";
import {mapActions} from 'vuex';

import {debounce} from "../../common/utils";

export default {
        name: "Detail",
        components:{
            DetailSwiper,
            DetailNavBar,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            GoodsList,
            Scroll
        },
    mixins:[itemListenerMixin,backTopMixin],
        data(){
            return{
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},
                recommends:[],
                themeTopYs:[],
                currentIndex:0,

            }
        },
        created() {
            //1. 保存传入的id
            this.iid=this.$route.params.id
            //2.根据iid请求获取详细数据
            getDetail(this.iid).then(res=>{
                // 1.根据顶部的图片轮播数据
                console.log(res);
                const data=res.result;
                this.topImages=data.itemInfo.topImages
                //2.获取商品信息
                this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
                //3.创建店铺信息
                this.shop=new Shop(data.shopInfo)
                //4.保存商品详情数据
                this.detailInfo=data.detailInfo
                //5.获取参数信息
                this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
                //6.获取评论信息
                if(data.rate.cRate!==0){
                    this.commentInfo=data.rate.list[0]
                }


            })
            //3.请求推荐数据
            getRecommend().then(res=>{
                console.log(res);
                this.recommends=res.data.list
            })
            //4.给themeTopYs赋值
            this.themeTopYs=debounce(()=>{
                this.themeTopYs=[]
                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.param.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                this.themeTopYs.push(Number.MAX_VALUE)
                console.log(this.themeTopYs);
            },300)

        },
    mounted(){
    },
    destroyed(){
        console.log('deactive');
        this.$bus.$off('itemImageLoad',this.ItemImgListener)
    },
        methods:{
            ...mapActions(['addCart']),
            addToCart(){
                //1.获取购物车所需要展示的信息
                const product={}
                product.image=this.topImages[0];
                product.title=this.goods.title;
                product.desc=this.goods.desc;
                product.realPrice=this.goods.realPrice;
                product.iid=this.iid;
                //2.将商品添加到购物车
                // this.$store.dispatch('addCart',product).then(res=>{
                //     console.log(res);
                // })
                this.addCart(product).then(res=>{
                    console.log(res);
                    this.$toast.show(res,2000)
                    // this.show=true;
                    // this.message=res;
                    // setTimeout(()=>{
                    //     this.show=false;
                    //     this.message='';
                    // },1000)
                })


            },
            imgLoad(){
                console.log('imgLoad');
                this.newRefresh()
                this.themeTopYs()
            },
            titleClick(index){
                console.log(index)
                this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
            },
            contentScroll(position){
            //[0, 5488, 6207, 6581
               const positionY=-position.y
                this.isShowBackTop=-(position.y)>1000
                for(var i=0;i<this.themeTopYs.length;i++){
                    // if(this.currentIndex!==i&&((i<this.themeTopYs.length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])||(i===this.themeTopYs.length-1 && positionY>=this.themeTopYs[i])))
                    if(this.currentIndex!==i&&(positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1]))
                    {
                        this.currentIndex=i;
                        this.$refs.nav.currentIndex=this.currentIndex
                    }
                }

            }
        }
    }
</script>

<style scoped>
 #detail{
    position: relative;
    z-index:9;
    background-color: #fff;
    height:100vh;
}

.detail-nav{
    position: relative;
    z-index:9;
    background-color: #fff;
}
.content{
    overflow: hidden;
    position: absolute;;
    top:44px;
    bottom: 49px;
    left:0;
    right: 0;

} 
</style>