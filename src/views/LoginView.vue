<template>
  <FormsComponent>
    <LoginComponent/>
  </FormsComponent>
</template>

<script>
import LoginComponent from "@/components/forms/LoginComponent.vue";
import FormsComponent from "@/components/forms/FormsComponent.vue";

export default {
  name: "LoginView" ,
  components: {FormsComponent, LoginComponent}
}
</script>

<style scoped lang="sass">

</style>