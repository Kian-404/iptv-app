import App from './App'
import uView from "uview-ui";
import 'uview-ui/theme.scss';
import Vue from 'vue'
import tabBar from 'components/tabBar/tabBar.vue'
Vue.component('tab-bar', tabBar)//使用tabBar组件
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(uView);
const app = new Vue({
	...App
})
app.$mount()
