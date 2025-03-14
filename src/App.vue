<template>
  <Header/>
  <router-view/>
  <FooterComponent/>
</template>

<script >
import {defineComponent} from "vue";
import Header from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default defineComponent({
  components: {FooterComponent, Header}
})
</script>

<style lang="sass">

body
  background-color: var(--neutral--color)
</style>
