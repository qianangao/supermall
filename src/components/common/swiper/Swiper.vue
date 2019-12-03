<template>
    <div class="slide">
        <div class="carousel-wrap" id="carousel">
            <transition-group tag="ul" class="slide-ui" name="list"> 
                <li v-for="(list,index) in banners" :key="index" v-show="index===currentIndex" @mouseenter="stop" @mouseleave="go">
                    <a :href="list.link" title="">
                        <img :src="list.image">
                    </a>
                </li>
            </transition-group>
        </div>
         <slot name="indicator"></slot>
      <div class="carousel-items">
          <span v-for="(item,index) in banners.length" :key="index" class="indi-item":class="{'active':index===currentIndex}" @mouseover="change(index)"> </span>
      </div>
    </div>
</template>
  
<script>
 export default {
    name:"Swiper",
     props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
    currentIndex: 0,
    timer:null,
        }
    },
    created(){
        this.go()
    },
    methods:{
           stop(){
        clearInterval(this.timer)
        this.timer=''
    },
    go(){
        this.timer=setInterval(()=>{
            this.autoPlay()
        },4000)
    },
    change(index){
        this.currentIndex=index
    },
    autoPlay(){
        this.currentIndex++;
        if(this.currentIndex>this.banners.length-1){
            this.currentIndex=0
        }
    }
 
    }
 }   
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .slide {
    width: 100%;
    height: 320px;
    margin: 0 auto;
    margin-top: 0px;
    overflow: hidden;
    position: relative;
  }
  .carousel-wrap {
    width: 100%;
    height: 320px;
  }
  li {
    position: absolute;
  }
  img {
    width: 100%;
    height: 320px;
  }
  .carousel-items {
    position: absolute;
    width: 100%;
    bottom: 10px;
    margin: 0 auto;
    z-index: 10;
    text-align: center;
  }
  .carousel-items span {
    width: 20px;
    height: 5px;
    border: 1px solid;
    background: white;
    display: inline-block;
    margin-right: 10px;
  }
  .active {
    background: red !important;
  }
.image-enter-active {
    transform: translateX(0);
    transition: all 1.5s ease;
  }
  .image-leave-active {
    transform: translateX(-100%);
    transition: all 1.5s ease;
  }
  .image-enter {
    transform: translateX(100%);
  }
  .image-leave {
    transform: translateX(0);
  }
</style>
