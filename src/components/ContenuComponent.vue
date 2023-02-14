<template>
  Je suis le contenu du site : {{ id }} / {{ page }}
</template>

<script>
import axios from "axios";

export default {
  name: "ContenuComponent",
  data(){
    return {
      product: null
    }
  },
  mounted() {
    this.getProduct();
  },
  props: ['id', 'page'],
  methods:{
    async getProduct(){
      console.log('ok')
      axios.get('https://world.openfoodfacts.org/api/v0/product/5449000000996.json').then(
          (result) => {console.log(result)}
      )
      console.log('ok')
      }
  }
}
</script>

<style scoped>

</style>