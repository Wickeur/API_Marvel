<script>
  import HeaderComponent from "@/components/structure-site/HeaderComponent.vue";
  import FooterComponent from "@/components/structure-site/FooterComponent.vue";
  import axios from 'axios';
  import md5 from 'md5';

  const timestamp = Date.now();

  // Ma clé public : bb4b312175d34c383916b21d0cd61b2f
  // Ma clé privée : 7add3909894cb9c00d59137600b6bb8001617be2

  export default {
    components: { HeaderComponent, FooterComponent },
    data() {
      return {
        dataMarvel: []
      }
    },
    mounted() {
      // axios.get('https://jsonplaceholder.typicode.com/users')
      axios.get('https://gateway.marvel.com:443/v1/public/characters',{
        params: {
          "apikey": "bb4b312175d34c383916b21d0cd61b2f",
          "ts": 1,
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
  <HeaderComponent></HeaderComponent>

  <router-view>
    <div>
      <!-- {{ dataMarvel }} -->
    <ul>
      Ici on test 
      
      <li v-for="item in dataMarvel">
        {{ item.name}}</li>
    </ul>
  </div>
  </router-view>

  <FooterComponent></FooterComponent>
</template>
