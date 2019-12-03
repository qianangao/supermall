import Toast from "./Toast";
const obj={}
obj.install=function (Vue) {
    // Vue.extend(Toast)
    // console.log(Toast.$el);
    // document.body.appendChild(Toast.$el)
    //1.创建组件构造器
    const toastConstructor=Vue.extend(Toast)
    //2.new 的方式，根据组件构造器，可以创建出一个组建对象
    const toast=new toastConstructor()
    //3.将组建对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))
    //toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast=toast;
}

export default obj