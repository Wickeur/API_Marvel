<script>
import axios from 'axios';
import md5 from 'md5';

  // Ma clé public : bb4b312175d34c383916b21d0cd61b2f
  // Ma clé privée : 7add3909894cb9c00d59137600b6bb8001617be2

export default {
  name: 'InfoPersonnage',
  props: {
    type: Number,
    required: true
  },
  data() {
    return {
      perso: {}
    };
  },
  methods: {
    detailPersonnage() {
      const publicKey = 'bb4b312175d34c383916b21d0cd61b2f';
      const privateKey = '7add3909894cb9c00d59137600b6bb8001617be2';
      const timestamp = Date.now();
      const hash = md5(timestamp + privateKey + publicKey);
        console.log(this.$route.params);
      axios
        .get('https://gateway.marvel.com:443/v1/public/characters/'+this.$route.params.id, {
          params: {
            ts: timestamp,
            apikey: publicKey,
            hash: hash
          }
        })
        .then(response => {
            console.log(response);
          this.perso = response.data.data.results[0];
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.detailPersonnage();
  }
};
</script>

<template>
  <div class="detailPersso">
     
    <h1>{{ perso.name }}</h1>

    <div class="imagePerso">
      <img :src="perso.thumbnail.path + '.' + perso.thumbnail.extension" alt="image">
    </div>
  
    <div v-if="perso.description">
      <p>{{ perso.description }}</p>
    </div>
    <div v-else>
      <p>There is no description</p>
    </div>

    <div class="comics">
      <h2>Appearance in the comics</h2>
      <!-- <p>Nombre de comics : {{ perso.comics.available }}</p>
      <ul>
        <li v-for="comic in perso.comics.items" :key="comic.name">
          {{ comic.name }}
        </li>
      </ul> -->
      <!-- <a :href="comic.resourceURI">Lien ressource</a> -->
    </div>

    <div class="series">
      <h2>Apparition dans les séries</h2>
      <!-- <p>Nombre de séries : {{ perso.series.available }}</p>
      <ul>
        <li v-for="serie in perso.series.items" :key="serie.name">
          {{ serie.name }}
        </li>
      </ul> -->
    </div>
</div>
</template>

<style>
  .detailPersso {
    margin: 0 auto;
    width: 80%;
    text-align: center;
    height: 750px;
  }
  img {
    height: 200px;
  }
</style>