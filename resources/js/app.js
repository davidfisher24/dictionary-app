import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import store from './store'

window.Vue = Vue;

Vue.component('dictionary', require('./components/Dictionary.vue').default);

Vue.use(BootstrapVue)

const app = new Vue({
    el: '#app',
    store
});

