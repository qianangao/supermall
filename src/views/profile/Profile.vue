<template>

    <div>
        <scroll class="content">
            <ul v-for="i in 100" :key="i">
                <li>数字:{{i}}</li>

            </ul>
        </scroll>
    </div>
</template>
  
<script>
import Scroll from 'components/common/scroll/Scroll';
 export default {
 name:"Profile",
     components:{
         Scroll
     }
 }   
</script>


<style scoped>
    .content{
        height:300px;
        background-color: pink;
        overflow: hidden;
    }
</style>