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
        dataComicsMarvel: []
      }
    },
    mounted() {
      axios.get('https://gateway.marvel.com:443/v1/public/comics',{
        params: {
            "apikey": "bb4b312175d34c383916b21d0cd61b2f",
            "ts": 1,
            "limit": 20,
            'orderBy': 'title',
          // md5(ts+privateKey+publicKey)
          "hash": md5( 1 + "7add3909894cb9c00d59137600b6bb8001617be2" + "bb4b312175d34c383916b21d0cd61b2f")
        }
      })
        .then(response => {
          this.dataComicsMarvel = response.data.data.results;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
}
</script>

<template>
    <h1><b>Les Comics Marvel</b></h1>
    <!-- {{ dataComicsMarvel }} -->
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
                        <p class="card-text"><small class="text-muted">Nombre de page : {{ comics.pageCount }}</small></p>
                        <!-- <div v-for="prix in comics">
                            <p class="card-text"><small class="text-muted">Prix : {{ prix.price }}</small></p>
                        </div> -->
                        <p class="card-text">{{ comics.description }}</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>    
    </div>
</template>

<style>
  .listeComics{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }

</style>