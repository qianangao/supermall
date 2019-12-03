import {debounce} from "./utils";
import BackTop from 'components/content/backtop/BackTop'
export const itemListenerMixin={
    data(){
        return{
            ItemImgListener:null,
            newRefresh:null,
        }
    },
    mounted(){
        //这个地方img图片确实被挂载，但是其中的图片还没有占据高度
        //this.$refs.scroll.refresh对这个函数进行防抖操作
        this.newRefresh= debounce(this.$refs.scroll.refresh,50)
        //对监听的事件进行保存
        this.ItemImgListener=()=>{
            this.newRefresh()
        }
        this.$bus.$on('itemImageLoad',
            //  this.$refs.scroll.refresh()
            this.ItemImgListener
        )
        console.log('mountedaa');
    }
}
export const backTopMixin={
    components:{
        BackTop
    },
    data(){
        return{
            isShowBackTop:false,
        }
    },
    methods:{
        backClick(){
            this.$refs.scroll.scrollTo(0,0);
        },
    }
}