<script>
import CarnivoreComponent from "@/components/CarnivoreComponent.vue";
import PersonnesComponent from "@/components/PersonnesComponent.vue";
import TestComponent from "@/components/TestComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import TransitionComponent from "@/components/TransitionComponent.vue";

export default {
  components: {
    CarnivoreComponent, PersonnesComponent, TestComponent, SearchComponent, TransitionComponent
  },
  //Initialisation de nos variables
  data(){
    return {
      fruit: '',
      message: "Hello World !!",
      age:15,
      fruits: [
        "pomme", "poire", "fraise"
      ],
      personnes: [
        {
          nom: "Marc",
          prenom: "Dupuis",
          date: "05/08/1945"
        },
        {
          nom: "Jean",
          prenom: "Durand",
          date: "05/07/1945"
        }
      ],
      amodifier: "toto"
    }
  },
  // Permet de créer et appeler des fonctions
  methods:{
    ajouterElementTab(){
      this.fruits.push(this.fruit);
      this.fruit = "";
    },
    supprimeListe(fruit){
      this.fruits = this.fruits.filter((f) => f !== fruit)
    }
  }
}
</script>

<template>
  <h1>{{ message }}</h1>
  <input type="int" v-model="age">
  <hr>
  <span v-if="age >= 18">Tu es majeur(e)</span>
  <span v-else>Tu es mineur(e)</span>

  <ul>
    <li v-for="n in 12">{{n}}</li>
  </ul>
  <hr>

  <PersonnesComponent v-model:amodifier="amodifier" :personnes="personnes"></PersonnesComponent>
  <br>=> App a la variable amodifier à <b>{{amodifier}}</b>

  <hr>

  <ul>
    <li v-for="fruit in fruits">
      {{fruit}}
      <em @click="supprimeListe(fruit)">Supprimer</em>
    </li>
  </ul>
  <form @submit.prevent="ajouterElementTab()">
    <input type="text" v-model="fruit">
    <input type="submit">
  </form>
  <hr>
  <CarnivoreComponent></CarnivoreComponent>
  <TestComponent></TestComponent>
  <SearchComponent>
    <template #title>
      Voici mon titre
    </template>

    Clique pour trouver

    <template #footer>
      <div>
        <ul>
          <li><a href="#">Lien vers Google</a></li>
          <li><a href="#">Lien vers mon insta</a></li>
          <li><a href="#">Lien qui sert à rien</a></li>
        </ul>
      </div>
    </template>
  </SearchComponent>
  <hr>
  <TransitionComponent></TransitionComponent>

  <hr>

  <router-view></router-view>
</template>
