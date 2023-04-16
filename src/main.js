import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import axios from "axios";
import VueAxios from "vue-axios";
import InfoPersonnage from "./components/InfoPersonnage.vue";

import './assets/main.css'
// Import Bootstrap 
import 'bootstrap/dist/css/bootstrap.css'

// J'importe mes composants
import AcceuilComponent from "@/components/AcceuilComponent.vue";
import PersonnagesComponent from "@/components/PersonnagesComponent.vue";
import ComicsComponent from "@/components/ComicsComponent.vue";

// J'instancie mes routes
const routes = [
    { 
      path: '/', 
      name:'homepage', 
      component: AcceuilComponent
    },
    {
      path: '/Personnages', 
      name:'Personnages', 
      component: PersonnagesComponent
    },
    {
      path: '/comics', 
      name:'comics', component: 
      ComicsComponent
    },
    {
      path: '/personnage/:id',
      name: 'InfoPersonnage',
      component: InfoPersonnage,
      props: true
    }
];

// J'instancie mon router
const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App); // J'instancie mon app

app.use(router, VueAxios, axios) // J'ajoute mon router à mon app

app.mount('#app') // J'attache mon app à mon id app