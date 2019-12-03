<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        props:{
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                scroll:null
            }
        },
        mounted(){
            //1. 创建better-scroll对象
          this.scroll=new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad,
            mouseWheel:true
          })
            //2.监听滚动的位置
            if(this.probeType===2||this.probeType===3){
                this.scroll.on('scroll',(position)=>{
                    // console.log(position);
                    this.$emit('scroll',position)
                })
            }
            //3.监听上拉事件
            if(this.pullUpLoad){
                this.scroll.on('pullingUp',()=>{
                    this.$emit('pullingUp')
                    console.log('upload111111111');

                })
            }
        },
        methods:{
            getScrollY(){
                return this.scroll?this.scroll.y:0
            },
            scrollTo(x,y,time=300){
                this.scroll&&this.scroll.scrollTo(x,y,time)
            },
            refresh(){
                this.scroll&&this.scroll.refresh()
                console.log('scroll111');
            },
            finishPullUp(){
                //finishPullUp:当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载
                this.scroll&&this.scroll.finishPullUp()
            }
        }
    }
</script>

<style scoped>

</style>