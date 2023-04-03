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
        itemsParPage: 20,
        totalItems: 0
      }
    },
    methods: {
      // Fonction pour limiter la description à 70 caractères
        restriction(text){
            if (this.affichageDescription == false) {
                return text.slice(0, 70) + '...';
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
                "limit": 30,
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
    }
  },
  // Appel de la fonction paginationPersonnages() au chargement de la page
  mounted() {
    this.paginationPersonnages();
  }
};
</script>

<template>
    <h1><b>Les Personnages de l'univers Marvel</b></h1>

    <!-- Barre de recherche -->
    <div class="barreRecherche">
      <h5>Rechercher votre personnage</h5>

      <div style="display: flex; flex-direction: row;">
        <input style="flex: 5;" type="text" v-model="nomRecherche" placeholder="ex : Iron Man ...">
        <button style="flex: 1; background-color: black; margin-left: 0;" @click="rechercher()">
          <img style="height: 20px;" src="/icons8-loupe-64.png" alt="">
        </button>
      </div>
      <button v-if="filtreActif === true" @click="annulerRecherche()">Annuler</button>
    </div>

    <!-- Pagination -->
    <nav v-if="filtreActif === false" style="width:90%; overflow-x: scroll;">
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

    <!-- Filtre des personnages -->
    <div v-if="filtreActif === true" name="persoFiltre" class="lesPersonnages">
      <div class="Personnages" v-for="item in personnages">        
        <div class="card" style="width: 18rem;">
        <!-- Si il y a une image -->
          <div style="height: 250px;" v-if="item.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'">
              <img class="card-img-top image" :src="item.thumbnail.path + '.' + item.thumbnail.extension" alt="image">
          </div>
          <!-- Si il n'y pas a pas d'image -->
          <div style="height: 250px;" v-if="item.thumbnail.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'">
            <img class="card-img-top image" src="https://via.placeholder.com/150" alt="image">
          </div>
          <div class="card-body" style="max-height: 180px;">
            <h5 class="card-title">{{ item.name}}</h5>
             <!-- Si la description est vide -->
            <p class="card-text" v-if="item.description === ''">Il n'y a pas de description</p>
            <!-- Si la description n'est pas vide  -->
            <p class="card-text" :style="{ height: tailleCard + 'px' }" v-else>{{ restriction(item.description) }}</p>
            <button class="read-more" @click="afficheDescription">Lire la suite</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Affichage des personnages -->
    <div v-if="filtreActif === false" name="persoSansFiltre" class="lesPersonnages">
      <!-- {{ dataMarvel }} -->
      <div class="Personnages" v-for="item in dataMarvel" :key="item.id">        
        <div class="card" style="width: 18rem;">
          <!-- Si il y a une image -->
          <div style="height: 250px;" v-if="item.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'">
              <img class="card-img-top image" :src="item.thumbnail.path + '.' + item.thumbnail.extension" alt="image">
          </div>
          <!-- Si il n'y pas a pas d'image -->
          <div style="height: 250px;" v-if="item.thumbnail.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'">
            <img class="card-img-top image" src="https://via.placeholder.com/150" alt="image">
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ item.name}}</h5>
            <!-- Si la description est vide -->
            <p class="card-text" v-if="item.description === ''">Il n'y a pas de description</p>
            <!-- Si la description n'est pas vide  -->
            <p class="card-text" :style="{ height: tailleCard + 'px' }" v-else>{{ restriction(item.description) }}</p>
            <button class="read-more" @click="afficheDescription">Lire la suite</button>

            <router-link :to="{ name: 'InfoPersonnage', params: { id: item.id } }">
              <div>Voir détails</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<style>
    h1{
    text-align: center;
    padding: 2%;
  }
  .lesPersonnages{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    margin: 40px 0 20px 0;
  }
  .name{
    font-weight: bold;
  }
  .image{
    max-height: 250px;
  }

  h1{
    text-align: center;
  }

  .card-text{
    height: 100px;
    overflow: hidden;
  }

  .read-more {
     position: absolute; /* définit la position du bouton par rapport à la carte */
     bottom: 0;
     right: 0;
     margin: 10px; /* ajoute un peu de marge autour du bouton */
     width: fit-content;
    }

</style>