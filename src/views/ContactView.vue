<template>
  <FormsComponent>
    <ContactComponent/>
  </FormsComponent>
</template>

<script>
import FormsComponent from "@/components/forms/FormsComponent.vue";
import ContactComponent from "@/components/forms/ContactComponent.vue";

export default {
  name: "ContactView",
  components: {ContactComponent, FormsComponent}
}
</script>

<style scoped lang="sass">

</style>