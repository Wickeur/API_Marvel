import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import axios from "axios";
import VueAxios from "vue-axios";

import './assets/main.css'
  // Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'

// J'importe mes composants
import IndexComponent from "@/components/IndexComponent.vue";
import ContenuComponent from "@/components/ContenuComponent.vue";
import TpComponent from "@/components/TpComponent.vue";

const routes = [
    {path: '/', name:'homepage', component: IndexComponent},
    {path: '/tp', name:'tp', component: TpComponent},
    {path: '/contenu/:id/page/:page', name:'content_page', component: ContenuComponent, props: true},
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App);

app.use(router, VueAxios, axios)

app.mount('#app')
