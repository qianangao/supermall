<template>
    <div>
        <nav-bar class="home-nav">
            <div slot="left" @click="backClick">
                <img src="~/assets/img/common/back.svg" alt="">
            </div>
            <div  slot="center" class="title">
            <div class="title-item" v-for="(title,index) in titles" :key="index" :class="{active:index===currentIndex}" @click="titleClick(index)">{{title}}</div>
            </div>
        </nav-bar>
    </div>

</template>

<script>
    import NavBar from "components/common/navbar/NavBar"
    export default {
        name: "DetailNavBar",
        components:{
            NavBar
        },
        data(){
            return{
                titles:['商品','参数','评论','推荐'],
                currentIndex:0,
            }
        },
        methods:{
            titleClick(index){
                this.currentIndex=index
                this.$emit('titleClick',index)
            },
            backClick(){
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
.title{
    display: flex;
}
    .title-item{
        flex:1;
        font-size: 13px;
    }
    .active{
        color:var(--color-high-text)
    }
    img{
        margin-top: 15px;
    }
</style>