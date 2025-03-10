<template>
  <!-- Header if is auth -->
  <header v-if="isAuthenticated" class="header">

    <!-- Header if is technician -->
    <router-link v-if="userType === 'technician'" to="/panel"><img src="/public/img/LogoLight.svg" alt="Logo App" class="header__logo"/></router-link>
    <nav v-if="userType === 'technician'" class="header__nav">
      <ul class="nav__list">
        <li>
          <router-link to="/create-reparation">
            <span class="header__icon__createreparation"/>
          </router-link>
          <router-link to="/reparations">
            <span class="header__icon__reparations"/>
          </router-link>
        </li>
        <li><span @click="logout"  class="header__icon__logout"/></li>
        <li><span class="header__icon__darkmode"/></li>
      </ul>
    </nav>

    <!-- Header if is client -->
    <router-link v-if="userType === 'client'" to="/dashboard"><img src="/public/img/LogoLight.svg" alt="Logo App" class="header__logo"/></router-link>
    <nav v-if="userType === 'client'" class="header__nav">
      <ul class="nav__list">
        <li><span @click="logout"  class="header__icon__logout"/></li>
        <li><span class="header__icon__darkmode"/></li>
      </ul>
    </nav>
  </header>

  <!-- Header if isn't auth -->
  <header v-else class="header">
    <router-link to="/"><img src="/public/img/LogoLight.svg" alt="Logo App" class="header__logo"/></router-link>
    <nav class="header__nav">
      <ul class="nav__list">
        <li><router-link to="/login" class="header__button">Accede</router-link></li>
        <li><span class="header__icon__darkmode"/></li>
      </ul>
    </nav>

  </header>

</template>

<script>
import {useAuthStore} from "@/store/authstore.js";

export default {
  name: "header",
  computed: {
    //For get reactive getters states
    isAuthenticated() {
      const authStore = useAuthStore()
      return authStore.isAuthenticated
    },
    userType() {
      const authStore = useAuthStore()
      return authStore.userType
    }
  },
  methods: {
    //For call function log auth if is necessary
    logout() {
      const authStore = useAuthStore()
      authStore.clearAuthData()
      this.$router.push('/login')
    }
  }
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

    .header__icon__darkmode
      @include mixins.create-icon('/public/img/Luna.svg', '/public/img/LunaHover.svg')

    .header__icon__logout
      @include mixins.create-icon('/public/img/Logout.svg', '/public/img/LogoutHover.svg')

    .header__icon__createreparation
      @include mixins.create-icon('/public/img/CrearRepa.svg', '/public/img/CrearRepaHover.svg')

    .header__icon__reparations
      @include mixins.create-icon('/public/img/Reparaciones.svg', '/public/img/ReparacionesHover.svg')
</style>