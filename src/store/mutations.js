import {ADD_TO_CART,ADD_COUNTER} from "./mutation-types";

export default{
    [ADD_TO_CART](state,payload){
        payload.checked=true
        state.cartList.push(payload)
        console.log(state.cartList);
    },
    [ADD_COUNTER](state,payload){
        payload.count++
    }
}