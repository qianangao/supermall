<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button class="checked-button"
                          :is-checked="isSelectedAll"
                          @click.native="totalClick"></check-button>
            <span>全选</span>
        </div>
        <div class="total">合计:{{totalPrice}}</div>
        <div class="calculate" @click="calClick">去计算({{cartLength}})</div>

    </div>
</template>

<script>
    import CheckButton from "../../../components/content/checkbutton/CheckButton";
    import cartList from "./cartList";
    import {mapGetters} from 'vuex'
    export default {
        name: "CartBottomBar",
        components:{
            CheckButton
        },
        computed:{
            ...mapGetters(['cartList']),
            totalPrice(){
                return '￥'+this.cartList.filter(item=>item.checked).reduce((Price,item)=>{
                    return Price + item.realPrice * item.count
                },0).toFixed(2)
            },
            cartLength(){
                return this.cartList.filter(item=>item.checked).length
            },
            isSelectedAll(){
                if(this.cartList.length===0) return false
                return !this.cartList.find(item=> !item.checked)
            }
        },
        methods:{
            totalClick(){
                   if(this.isSelectedAll){
                       this.cartList.forEach(item=>item.checked=false)
                   }
                   else{
                       this.cartList.forEach(item=>item.checked=true)
                   }
                },
            calClick(){
                this.$toast.show('请选择要购买的商品',2000)
            }

            }
    }
</script>

<style scoped>
.bottom-bar{
    height:40px;
    display: flex;
    background-color:#777777;
    position: relative;
    line-height: 40px;
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width:80px;
}
    .checked-button{
        width:20px;
        height: 20px;
        line-height:20px;
        margin-right: 5px;
    }
    .total{
    margin-left:20px;
        flex:1;
    }
.calculate{
    width:100px;
    background-color: red;
    color: #cccccc;
    text-align: center;
}
</style>