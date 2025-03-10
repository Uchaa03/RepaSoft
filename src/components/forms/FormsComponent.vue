<template>
  <main class="forms__card">
    <section class="card">
      <img class="card__img" src="/img/EngranajeDecorativo.svg" alt="Imagen decorativa">
      <article class="card__form">
        <!-- For insert forms in component -->
        <slot></slot>
      </article>
    </section>
  </main>
</template>

<script>
export default {
  name: "FormsComponent"
}
</script>

<style lang="sass">
  .forms__card
    width: 100%
    display: flex
    justify-content: center
    align-items: center
    min-height: 80vh
    padding: 0 14rem


  .card
    width: 100%
    height: 45rem
    background-color: var(--primary--color)
    border-radius: 2rem 3rem 3rem 2rem
    display: flex
    overflow: visible //For extend card for shadow

  .card__img
    width: 20%
    margin: 2rem
    align-self: self-end

  .card__form
    width: 80%
    background-color: var(--neutral--color)
    border-radius: 2rem
    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.30)
    position: relative

  .form__title
    font-size: 4rem
    font-family: 'SF-Pro-Text-Medium', 'sans-serif'
    margin-top: 2rem
    margin-left: 2rem

  .form__button
    position: absolute
    width: 14rem
    height: 2.2rem
    top: 2rem
    right: 2rem
    border-radius: 0.5rem
    background-color: var(--neutral--color)
    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.30)
    display: flex
    justify-content: center
    align-items: center
    text-decoration: none

    p
      width: 7rem
      height: 2.2rem
      font-family: 'SF-Pro-Text-Bold', 'sans-serif'
      text-align: center
      align-content: center
      color: var(--complementary--color)

    .form__selected
      background-color: var(--primary--color)
      border-radius: 0.5rem
      color: var(--neutral--color)
</style>