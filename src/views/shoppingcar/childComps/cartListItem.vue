<template>
    <div class="shop-item">
        <div class="item-selector">
            <check-button :isChecked="product.checked" @click.native="checkClick"></check-button>
        </div>
        <div class="item-img">
            <img :src="product.image" alt="商品图片">
        </div>
        <div class="item-info">
            <div class="item-title">{{product.title}}</div>
            <div class="item-desc">{{product.desc}}</div>
            <div class="item-bottom">
                <div class="item-price left">￥{{product.realPrice}}</div>
                <div class="item-count right">X{{product.count}}</div>
            </div>
        </div>

    </div>
</template>

<script>
    import CheckButton from "../../../components/content/checkbutton/CheckButton";
    export default {
        name: "cartListItem",
        components:{
            CheckButton
        },
        props:{
            product:{
                type:Object,
                default(){
                    return {}
                }
            },
        },
        methods:{
            checkClick(){
                this.product.checked = !this.product.checked
            }
        }
    }
</script>

<style scoped>
.shop-item{
    width:100%;
    display:flex;
    padding:5px;
    font-size: 0;
    border-bottom: 1px solid #ccc;
}
    .item-selector{
        width:20px;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .item-title, .item-desc{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .item-title{
        font-size: 18px;
        margin-bottom: 4px;
    }
    .item-img{
       padding:5px;
    }
    .item-img img{
        width:80px;
        height:100px;
        display: block;
        border-radius: 5px;
    }
    .item-info{
        font-size: 17px;
        color:#333;
        padding:5px 10px;
        position:relative;
        overflow: hidden;
    }
    .item-info, .item-desc{
        color:#666;
        font-size: 14px;
    }
    .item-desc{
        margin-top: 15px;
    }
    .item-bottom{
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
    }
    .item-price{
        color:#ffb805;
        font-size:20px;
    }
    .item-count{
        font-size:20px;
    }
</style>