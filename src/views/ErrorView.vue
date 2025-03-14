<template>
  <main class="error">
    <section class="error__container">
      <div class="error__content">
        <h1 class="error__title">¡Vaya! Parece que algo ha salido mal</h1>

        <div class="error__code">
          <span>404</span>
        </div>

        <p class="error__message">
          La página que estás buscando no existe o ha sido movida a otra ubicación.
        </p>

        <div class="error__actions">
          <router-link to="/" class="error__button">
            Volver al inicio
          </router-link>

          <button @click="goBack" class="error__button error__button--secondary">
            Volver atrás
          </button>
        </div>
      </div>

      <div class="error__illustration">
        <img src="/img/error-404.png" alt="Error illustration" />
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "ErrorView",
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped lang="sass">
@use '@/assets/sass/utilities/mixins' as mixins

.error
  width: 100%
  min-height: 80vh
  display: flex
  justify-content: center
  align-items: center
  padding: 2rem

  &__container
    display: flex
    max-width: 1200px
    background-color: white
    border-radius: 1.5rem
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1)
    overflow: hidden

  &__content
    flex: 1
    padding: 3rem
    display: flex
    flex-direction: column
    justify-content: center

  &__title
    font-size: 2.5rem
    font-weight: bold
    color: var(--complementary--color)
    margin-bottom: 1.5rem

  &__code
    font-size: 6rem
    font-weight: 900
    color: var(--primary--color)
    margin: 1rem 0
    line-height: 1
    span
      text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1)

  &__message
    font-size: 1.2rem
    color: var(--secondary--color)
    margin-bottom: 2rem
    max-width: 90%

  &__actions
    display: flex
    gap: 1rem

  &__button
    @include mixins.create-button(auto, 3rem, 1rem, bold)
    padding: 0 2rem
    display: inline-flex
    align-items: center
    justify-content: center
    text-decoration: none

    &--secondary
      background-color: var(--neutral--color)
      color: var(--complementary--color)
      border: 2px solid var(--primary--color)

  &__illustration
    flex: 1
    background-color: var(--primary--color)
    display: flex
    align-items: center
    justify-content: center
    padding: 2rem

    img
      max-width: 100%
      height: auto
      max-height: 300px
      opacity: 0.9

</style>
