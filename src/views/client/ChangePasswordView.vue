<template>
  <FormsComponent>
    <ChangePasswordComponent/>
  </FormsComponent>
</template>

<script>
import FormsComponent from "@/components/forms/FormsComponent.vue";
import ChangePasswordComponent from "@/components/client/ChangePasswordComponent.vue";

export default {
  name: "ChangePasswordView",
  components: {ChangePasswordComponent, FormsComponent}
}
</script>

<style scoped lang="sass">

</style>