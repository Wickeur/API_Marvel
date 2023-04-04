<script>
import axios from 'axios';
import md5 from 'md5';

  // Ma clé public : bb4b312175d34c383916b21d0cd61b2f
  // Ma clé privée : 7add3909894cb9c00d59137600b6bb8001617be2
const timestamp = Date.now();

export default {
  name: 'ComicsComponent',
  data() {
    return {
        dataComicsMarvel: [],
        nomRecherche: '',
        comicsFiltre: [],
        filtreActif: false,
        pageActuelle: 1,
        itemsParPage: 20,
        totalItems: 0
      }
    },
    // Composant créé
    methods:{
      rechercher() {
        // Si la barre de recherche n'est pas vide
        if(this.nomRecherche.length > 0){
          this.filtreActif = true;
          axios.get('https://gateway.marvel.com:443/v1/public/comics',{
            params: {
              "apikey": "bb4b312175d34c383916b21d0cd61b2f",
              "ts": 1,
              "limit": 20,
              "titleStartsWith": this.nomRecherche,
              'orderBy': 'title',
              "hash": md5( 1 + "7add3909894cb9c00d59137600b6bb8001617be2" + "bb4b312175d34c383916b21d0cd61b2f")
            }
          })
          .then(response => {
            this.comicsFiltre = response.data.data.results;
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
        }
        else{
          this.filtreActif = false;
        }
      },   

      // Annuler la recherche
      annulerRecherche() {
        this.filtreActif = false;
        this.nomRecherche = '';
      },  

      // Fonction pour la pagination
      paginationComics() {
        axios.get('https://gateway.marvel.com:443/v1/public/comics',{
          params: {
            "apikey": "bb4b312175d34c383916b21d0cd61b2f",
            "ts": 1,
            "limit": this.itemsParPage,
            "offset": (this.pageActuelle - 1) * this.itemsParPage,
            "orderBy": 'title',
            "hash": md5( 1 + "7add3909894cb9c00d59137600b6bb8001617be2" + "bb4b312175d34c383916b21d0cd61b2f")
          }
        })

        // Résultat de la requête
        .then(response => {
          this.dataComicsMarvel = response.data.data.results;
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
        this.paginationComics();
      },  

      // Fonction pour aller à la page précédente
      pageAvant() {
        if (this.pageActuelle > 1) {
          this.pageActuelle--;
          this.paginationComics();
        }
      },

      // Fonction pour aller à la page suivante
      pageApres() {
        if (this.pageActuelle < this.totalPages) {
          this.pageActuelle++;
          this.paginationComics();
        }
      },
    },

    // Calcul du nombre de pages
    computed: {
      // Fonction pour calculer le nombre de pages
      totalPages() {
        return Math.ceil(this.totalItems / this.itemsParPage);
      }
    },

    // Appel de la fonction paginationComics() au chargement de la page
    mounted() {
      this.paginationComics();
    }

};
</script>

<template>
    <h1><b>Les Comics Marvel</b></h1>

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
    
    <!-- {{ dataComicsMarvel }} -->
    <div v-if="filtreActif === true">
      <div class="listeComics">
          <div v-for="comics in comicsFiltre"> 
              <div class="card mb-3" style="max-width: 540px; max-height: 280px;">
                  <div class="row g-0">
                      <div class="col-md-4">
                      <img class="img-fluid rounded-start" :src="comics.thumbnail.path + '.' + comics.thumbnail.extension" alt="image">
                      </div>
                      <div class="col-md-8">
                      <div class="card-body">
                          <h5 class="card-title">{{ comics.title }}</h5>
                          <p class="card-text">
                            <small class="text-muted">
                              Number of pages : {{ comics.pageCount }} <br>
                              Price : {{ comics.prices[0].price }}
                            </small>
                          </p>
                          <p class="card-text">{{ comics.description }}</p>
                      </div>
                      </div>
                  </div>
              </div>
          </div>    
      </div>
    </div>

    <div v-if="filtreActif === false">
      <div class="listeComics">
          <div v-for="comics in dataComicsMarvel"> 
              <div class="card mb-3" style="max-width: 540px; max-height: 280px;">
                  <div class="row g-0">
                      <div class="col-md-4">
                      <img class="img-fluid rounded-start" :src="comics.thumbnail.path + '.' + comics.thumbnail.extension" alt="image">
                      </div>
                      <div class="col-md-8">
                      <div class="card-body">
                          <h5 class="card-title">{{ comics.title }}</h5>
                          <p class="card-text">
                            <small class="text-muted">
                              Number of pages : {{ comics.pageCount }} <br>
                              Price : {{ comics.prices[0].price }}
                            </small></p>
                          <p class="card-text">{{ comics.description }}</p>
                      </div>
                      </div>
                  </div>
              </div>
          </div>    
      </div>
    </div>

    <!-- Barre de recherche -->
    <div class="barreRecherche">
      <h5>Rechercher un comics</h5>
      <div style="display: flex; flex-direction: row;">
        <input style="flex: 5;" type="text" v-model="nomRecherche" placeholder="ex : Avengers ...">
        <button style="flex: 1; background-color: black; margin-left: 0;" @click="rechercher()">
          <img style="height: 20px;" src="/icons8-loupe-64.png" alt="">
        </button>
      </div>
      <button v-if="filtreActif === true" @click="annulerRecherche()">Annuler</button>
    </div>
</template>

<style>
  .listeComics{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    padding-top: 10px;
  }

</style>