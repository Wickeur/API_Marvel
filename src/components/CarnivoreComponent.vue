<template>
  <h2>Animaux carnivores</h2>
  <ul>
    <li v-for="animal in allCanivores">{{animal.nom}}</li>
  </ul>
</template>

<script>
export default {
  name: "CarnivoreComponent",
  data(){
    return {
      animaux: [
        {
          nom: "tigre",
          carnivore: true
        },
        {
          nom: "girafe",
          carnivore: false
        },
        {
          nom: "crocodile",
          carnivore: true
        },
        {
          nom: "dinde",
          carnivore: false
        },
      ],
    }
  },
  computed:{
    allCanivores(){
      return this.animaux.filter((animal) => animal.carnivore)
    }
  }
}
</script>

<style scoped>

</style>