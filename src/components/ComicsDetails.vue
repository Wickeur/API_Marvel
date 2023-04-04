<script>
  import axios from 'axios';
  import md5 from 'md5';
  
  export default {
    name: 'ComicsDetails',
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        comic: {}
      };
    },
    methods: {
      getComicsDetails() {
        const publicKey = 'bb4b312175d34c383916b21d0cd61b2f';
        const privateKey = '7add3909894cb9c00d59137600b6bb8001617be2';
        const timestamp = Date.now();
        const hash = md5(timestamp + privateKey + publicKey);
  
        axios.get(`https://gateway.marvel.com:443/v1/public/comics/${this.id}`, {
          params: {
            ts: timestamp,
            apikey: publicKey,
            hash: hash
          }
        }).then(response => {
          this.comic = response.data.data.results[0];
        }).catch(error => {
          console.log(error);
        });
      }
    },
    mounted() {
      this.getComicsDetails();
    }
  };
</script>

<template>
    <div class="comic-details">
      <h1>{{ comic.title }}</h1>
  
      <div class="image-comic">
        <img :src="comic.thumbnail.path + '.' + comic.thumbnail.extension" alt="Comic cover image">
      </div>
  
      <div v-if="comic.description">
        <p>{{ comic.description }}</p>
      </div>
      <div v-else>
        <p>No description available</p>
      </div>
  
      <div class="creators">
        <h2>Creators</h2>
        <ul>
          <li v-for="creator in comic.creators.items" :key="creator.name">{{ creator.name }} - {{ creator.role }}</li>
        </ul>
      </div>
  
      <div class="characters">
        <h2>Characters</h2>
        <ul>
          <li v-for="character in comic.characters.items" :key="character.name">{{ character.name }}</li>
        </ul>
      </div>
  
      <div class="series">
        <h2>Series</h2>
        <p>{{ comic.series.name }}</p>
      </div>
    </div>
  </template>
  
  <style>
    .comic-details {
      margin: 0 auto;
      width: 80%;
      text-align: center;
    }
    img {
      height: 300px;
    }
  </style>
  