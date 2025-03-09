<template>
  <header class="header">
    <router-link to="/"><img src="/public/img/LogoLight.svg" alt="Logo App" class="header__logo"/></router-link>
    <nav class="header__nav">
      <ul class="nav__list">
        <li><router-link to="/login" class="header__button">Accede</router-link></li>
        <li><span class="header__icon"/></li>
      </ul>
    </nav>

  </header>
</template>

<script>
export default {
  name: "header"
}
</script>

<style scoped lang="sass">
  @use '@/assets/sass/utilities/mixins' as mixins

  .header
    width: 100%
    height: 5rem
    box-shadow: 0 10px 8px 1px rgba(20, 20, 20, 0.15)
    display: flex
    align-items: center
    justify-content: space-between
    padding: 0 14rem

    .header__logo
      width: 4rem
      display: flex
      align-items: flex-start

    .header__button
      @include mixins.create-button(9rem, 2.8rem, 1.5rem, bold)

    .nav__list
      display: flex
      justify-content: space-between
      align-items: center

    .header__icon
      @include mixins.create-icon('/public/img/Luna.svg', '/public/img/LunaHover.svg')
</style>