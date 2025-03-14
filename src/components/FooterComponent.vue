<template>
  <footer class="footer">
    <a href=""  class="footer__license">Licencia CC</a>
    <router-link to="/contact" class="footer__button">Contáctanos</router-link>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent"
}
</script>

<style scoped lang="sass">
  @use '@/assets/sass/utilities/mixins' as mixins

  .footer
    width: 100%
    height: 5rem
    display: flex
    align-items: center
    justify-content: space-between
    padding: 0 14rem
    position: fixed
    bottom: 0
    background-color: var(--neutral--color)
    box-shadow: 0px -10px 8px 1px rgba(20, 20, 20, 0.15)

    .footer__license
      font-size: 1.5rem
      font-family: 'SF-Pro-Text-Bold', 'sans-serif'
      align-items: flex-start
      color: var(--complementary--color)

    .footer__button
      @include mixins.create-button(15rem, 2.8rem, 1.5rem, bold)

</style>