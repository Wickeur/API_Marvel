<script>
import axios from 'axios';
import md5 from 'md5';

  // Ma clé public : bb4b312175d34c383916b21d0cd61b2f
  // Ma clé privée : 7add3909894cb9c00d59137600b6bb8001617be2
const timestamp = Date.now();

export default {
  name: 'HerosComponent',
  data() {
      return {
        tailleCard: 100,
        affichageDescription: false,
        dataMarvel: []
      }
    },
    methods: {
        restriction(text){
            if (this.affichageDescription == false) {
                return text.slice(0, 70) + '...';
            } else {
                return text;
            }
        },
        afficheDescription() {
            this.affichageDescription = !this.affichageDescription;
            if (this.affichageDescription == true) {
                this.tailleCard = 220;
            } else {
                this.tailleCard = 100;
            }
        }
    },
    mounted() {
      // axios.get('https://jsonplaceholder.typicode.com/users')
      axios.get('https://gateway.marvel.com:443/v1/public/characters',{
        params: {
          "apikey": "bb4b312175d34c383916b21d0cd61b2f",
          "ts": 1,
          "limit": 20,
          // "nameStartsWith": 'I',
          'orderBy': 'name',
          // md5(ts+privateKey+publicKey)
          "hash": md5( 1 + "7add3909894cb9c00d59137600b6bb8001617be2" + "bb4b312175d34c383916b21d0cd61b2f")
        }
      })
        .then(response => {
          this.dataMarvel = response.data.data.results;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
}
</script>
<template>
    <h1><b>Les héros Marvel</b></h1>
    <div class="lesHeros">
      <!-- {{ dataMarvel }} -->
      <div class="heros" v-for="item in dataMarvel">        
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
          </div>
        </div>
      </div>
    </div>
</template>

<style>
  .lesHeros{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
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
    }

</style>