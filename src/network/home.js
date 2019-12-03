import {request} from "./request";

export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}
export function getHomeGoods(type,page){
    return request({
        url:'/home/data',
        params:{
            type,
            page,
        }
    })
}


let totalNums=[]
const nums=[20,21,22]
totalNums.push(...nums)
