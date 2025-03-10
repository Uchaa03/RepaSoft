<template>
  <FormsComponent>
    <RegisterComponent/>
  </FormsComponent>
</template>

<script>
import FormsComponent from "@/components/forms/FormsComponent.vue";
import RegisterComponent from "@/components/forms/RegisterComponent.vue";

export default {
  name: "RegisterView",
  components: {RegisterComponent, FormsComponent}
}
</script>


<style scoped lang="sass">

</style>