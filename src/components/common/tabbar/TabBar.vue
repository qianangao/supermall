<template>
    <div class="tab-bar ignore">
        <slot></slot>
    </div>
</template>
  
<script>
 export default {
 name:"TabBar"
 }   
</script>

<style scoped>
    
.tab-bar{
  display:flex;
  background-color:#ccc;
  position:fixed;
  left:0;
  right:0;
  bottom:0;
  box-shadow:0 -1px 1px rgba(100,100,100,.8);
}

</style>
