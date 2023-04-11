<script>
  import HeaderComponent from "@/components/structure-site/HeaderComponent.vue";
  import FooterComponent from "@/components/structure-site/FooterComponent.vue";

  export default {
    components: { HeaderComponent, FooterComponent },
  }
</script>

<template>
  <HeaderComponent></HeaderComponent>

  <router-view></router-view>

  <FooterComponent></FooterComponent>
</template>

<style>
  
</style>