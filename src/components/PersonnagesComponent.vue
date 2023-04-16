<script>
import axios from 'axios';
import md5 from 'md5';

  // Ma clé public : bb4b312175d34c383916b21d0cd61b2f
  // Ma clé privée : 7add3909894cb9c00d59137600b6bb8001617be2
const timestamp = Date.now();

export default {
  name: 'PersonnagesComponent',
  data() {
      return {
        tailleCard: 100,
        affichageDescription: false,
        dataMarvel: [], 
        nomRecherche: '',
        personnages: [],
        filtreActif: false,
        pageActuelle: 1,
        itemsParPage: 32,
        totalItems: 0
      }
    },
    methods: {
      // Fonction pour limiter la description à 70 caractères
        restriction(text){
            if (this.affichageDescription == false) {
                return text.slice(0, 120) + '...';
            } else {
                return text;
            }
        },
        // Fonction pour afficher la description complète
        afficheDescription() {
            this.affichageDescription = !this.affichageDescription;
            if (this.affichageDescription == true) {
                this.tailleCard = 220;
            } else {
                this.tailleCard = 100;
            }
        },
        // Fonction pour rechercher un personnage
        rechercher() {
          if(this.nomRecherche.length > 0){
            this.filtreActif = true;
            // Requête pour récupérer les personnages
            axios.get('https://gateway.marvel.com:443/v1/public/characters',{
              params: {
                "apikey": "bb4b312175d34c383916b21d0cd61b2f",
                "ts": 1,
                "limit": 100,
                "nameStartsWith": this.nomRecherche,
                'orderBy': 'name',
                "hash": md5( 1 + "7add3909894cb9c00d59137600b6bb8001617be2" + "bb4b312175d34c383916b21d0cd61b2f")
              }
            })
              .then(response => {
                // On stocke les personnages dans un tableau
                this.personnages = response.data.data.results;
                console.log(response.data);
              })
              // En cas d'erreur
              .catch(error => {
                console.log(error);
              });
          }
          else{
            // Si la recherche est vide, on annule la recherche
            this.filtreActif = false;
          }
        },

        // Fonction pour annuler la recherche
        annulerRecherche() {
          this.filtreActif = false;
          this.nomRecherche = '';
        },

        // Fonction pour la pagination
        paginationPersonnages() {
          axios.get('https://gateway.marvel.com:443/v1/public/characters',{
            params: {
              "apikey": "bb4b312175d34c383916b21d0cd61b2f",
              "ts": 1,
              "limit": this.itemsParPage,
              "offset": (this.pageActuelle - 1) * this.itemsParPage,
              "orderBy": 'name',
              "hash": md5( 1 + "7add3909894cb9c00d59137600b6bb8001617be2" + "bb4b312175d34c383916b21d0cd61b2f")
            }
          })
          // Résultat de la requête
          .then(response => {
            this.dataMarvel = response.data.data.results;
            //console.log(response.data);
            this.totalItems = response.data.data.total;
          })
          // En cas d'erreur
          .catch(error => {
            console.log(error);
          });
        },
        // Fonction pour changer de page
        majPageActuelle(numPage) {
          this.pageActuelle = numPage;
          this.paginationPersonnages();
        },
        // Fonction pour aller à la page précédente
        pageAvant() {
          if (this.pageActuelle > 1) {
            this.pageActuelle--;
            this.paginationPersonnages();
          }
        },
        // Fonction pour aller à la page suivante
        pageApres() {
          if (this.pageActuelle < this.totalPages) {
            this.pageActuelle++;
            this.paginationPersonnages();
          }
        },
        afficherInfoPerso(id) {
          this.$router.push({ name: 'InfoPersonnage', params: { id: id } });
         }
  },
  // Calcul du nombre de pages
  computed: {
    // Fonction pour calculer le nombre de pages
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsParPage);
    },
    persoVisible() {
        return this.filtreActif ? this.personnages : this.dataMarvel;
      }
  },
  // Appel de la fonction paginationPersonnages() au chargement de la page
  mounted() {
    this.paginationPersonnages();
  }
};
</script>

<template>
  <div class="contenuPage">
    <h1><b>Characters from the Marvel Universe</b></h1>

    <!-- Barre de recherche -->
    <div class="barreRecherche">
      <h5 style="justify-content: center;">Find your character</h5>

      <div style="display: flex; flex-direction: row;">
        <input style="flex: 5;" type="text" v-model="nomRecherche" placeholder="ex : Iron Man ...">
        <button class="boutonClicable" style="flex: 1; background-color: black; margin-left: 0;" @click="rechercher()">
          <img class="loupe" src="/icons8-loupe-64.png" alt="">
        </button>
      </div>
      <button v-if="filtreActif === true" @click="annulerRecherche()">Cancel</button>
    </div>

    <!-- Pagination -->
    <nav v-if="filtreActif === false" style="width: 98%; justify-content: center;">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: pageActuelle === 1 }">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="pageAvant">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="numPage in totalPages" :key="numPage" :class="{ active: pageActuelle === numPage }">
          <a class="page-link" href="#" @click.prevent="majPageActuelle(numPage)">{{ numPage }}</a>
        </li>
        <li class="page-item" :class="{ disabled: pageActuelle === totalPages }">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="pageApres">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Affichage des personnages -->
    <div class="lesPersonnages">
      <div v-for="item in persoVisible" :key="item.id" class="Personnages" >
        <div class="card" style="width: 18rem;">
          <!-- Affichage de l'image -->
          <div>
            <img class="card-img-top image"
                :src="item.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
                ? item.thumbnail.path + '.' + item.thumbnail.extension
                : 'https://via.placeholder.com/150'"
                alt="image">
          </div>

          <div class="card-body" :key="item.id">
            <!-- Affichage du titre -->
            <h5 class="card-title">{{ item.name }}</h5>

            <!-- Si la description est vide -->
            <p class="card-text" style="height: 100px;" v-if="item.description === ''">There is no description</p>

            <!-- Si la description n'est pas vide  -->
            <p class="card-text" :style="{ height: tailleCard + 'px' }" v-else>{{ restriction(item.description) }}</p>

            <!-- Affichage du bouton pour voir plus -->
            <button class="read-more boutonClicable" @click="afficheDescription">Read more</button>

            <!-- Redirection vers info perso -->
            <router-link :to="{ name: 'InfoPersonnage', params: { id: item.id } }">
              <div class="seeDetails boutonClicable">See details</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
  .card:hover {
    transform: scale(1.05);
  }
    h1{
    text-align: center;
    padding: 2%;
  }
  .lesPersonnages{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .name{
    font-weight: bold;
  }
  .image{
    max-height: 250px;
  }

  .card-text{
    height: 100px;
    overflow: hidden;
  }

  .read-more {
     position: absolute; 
     bottom: 0;
     right: 0;
     margin: 10px; 
     width: fit-content;
    }

    .seeDetails {
     position: relative; 
     bottom: -5px;
     left: 0;
     margin: 10px; 
     width: fit-content;
    }

</style>