<template>
  <Transition name="bounce">
    <p style="text-align: center" v-if="show">On me voit plus, on me voit</p>
  </Transition>

  <br>
  <button @click="show = !show">Clique moi</button>
</template>

<script>
export default {
  name: "TransitionComponent",
  data(){
    return {
      show: true,
    }
  }
}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

</style>