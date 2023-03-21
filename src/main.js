import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import axios from "axios";
import VueAxios from "vue-axios";

import './assets/main.css'
  // Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'

// J'importe mes composants
import AcceuilComponent from "@/components/AcceuilComponent.vue";
import HerosComponent from "@/components/HerosComponent.vue";
import ComicsComponent from "@/components/ComicsComponent.vue";

const routes = [
    {path: '/', name:'homepage', component: AcceuilComponent},
    {path: '/heros', name:'heros', component: HerosComponent},
    // {path: '/heros/:id', name:'heros_id', component: HerosComponent, props: true},
    {path: '/comics', name:'comics', component: ComicsComponent},
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App);

app.use(router, VueAxios, axios)

app.mount('#app')
