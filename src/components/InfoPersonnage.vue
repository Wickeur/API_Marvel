<script>
import axios from 'axios';
import md5 from 'md5';

  // Ma clé public : bb4b312175d34c383916b21d0cd61b2f
  // Ma clé privée : 7add3909894cb9c00d59137600b6bb8001617be2

export default {
  name: 'InfoPersonnage',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      hero: {}
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
          this.hero = response.data.data.results[0];
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
   <div>
    <h1>{{ hero.name }}</h1>
    <div v-if="hero.description">
      <p>{{ hero.description }}</p>
    </div>
    <div v-else>
      <p>No description available</p>
    </div>
    
  </div>
</template>