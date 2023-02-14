<template>
  <h2>Liste des personnes</h2>

  <ul v-for="personne in personnes">
    <li v-for="(info, index) in personne">
      <strong>{{index}} :</strong> {{info}}
    </li>
  </ul>

  <br>
  <input type="text" @input="$emit('update:amodifier',$event.target.value)">
  <br>=> PersonnesComponent a la variable amodifier à <b>{{amodifier}}</b>
</template>

<script>
export default {
  name: "PersonnesComponent",
  props: ['personnes','amodifier'],
  emits: ['update:amodifier']
}
</script>

<style scoped>

</style>