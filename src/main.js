import Vue from 'vue'
import App from './App.vue'
import circle from './circle.vue';

Vue.component('dcircle', circle);

new Vue({
    el: '#app',
    render: h => h(App)
})
