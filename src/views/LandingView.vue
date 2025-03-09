<template>
  <main class="landing-view">
    <section class="landing-view__intro">
      <h1 class="intro__title"> Mejora Tus Reparaciones <span>Eficiente</span>, <span>Sencillo</span>, <span>Fácil</span>.</h1>
      <h2 class="intro__subtitle">Mejora Tu Negocio Con Nuestro Software, una mejor organización y experiencia para el usuario.</h2>
      <router-link to="/register" class="intro__button">Empieza Ahora</router-link>
      <img class="intro__img" src="/public/img/IlustrationLanding.svg" alt="Imagen ilustrativa sobre la informatica"/>
    </section>
    <section class="landing-view__cards">
      <article class="cards__card">
        <img class="card_img" src="/public/img/UserCard.svg" alt="Imagen Card de Gestión de Clientes">
        <h2 class="card__title">Reparaciones</h2>
      </article>
      <article class="cards__card">
        <img class="card_img" src="/public/img/TicketCard.svg" alt="Imagen Card de Tickets">
        <h2 class="card__title">Gestiona Clientes</h2>
      </article>
      <article class="cards__card">
        <img class="card_img" src="/public/img/ReparacionCard.svg" alt="Imagen Card de Reparaciones">
        <h2 class="card__title">Inventario</h2>
      </article>
      <article class="cards__card">
        <img class="card_img" src="/public/img/InventarioCard.svg" alt="Imagen Card de Inventario">
        <h2 class="card__title">Tickets</h2>
      </article>
    </section>

  </main>
</template>

<script>
export default {
  name: "LandingView"
}
</script>

<style scoped lang="sass">
  @use '@/assets/sass/utilities/mixins' as mixins

  .landing-view
    align-self: center
    justify-self: center

  .landing-view__intro
    display: grid
    margin: 2rem 14rem
    grid-template-areas: "title img" "subtitle img" "button img"
    grid-template-columns: 1fr 1fr
    grid-template-rows: 2fr 0.75fr 0.75fr

  .intro__title
    grid-area: title
    font-size: 4rem
    font-family: 'SF-Pro-Text-Medium','sans-serif'
    color: var(--complementary--color)
    span
      font-size: 5rem
      font-family: 'SF-Pro-Text-Medium','sans-serif'
      color: var(--primary--color)

  .intro__subtitle
    grid-area: subtitle
    width: 80%
    font-size: 1.3rem
    font-family: 'SF-Pro-Text-Light','sans-serif'
    margin-top: 1.5rem

  .intro__button
    grid-area: button
    @include mixins.create-button(20rem, 3.5rem, 2rem, bold)
    align-self: self-end
    margin-bottom: 1.5rem

  .intro__img
    grid-area: img
    width: 70%
    margin-top: 0.8rem
    justify-self: right

  .landing-view__cards
    width: 100%
    padding: 0 14rem
    display: flex
    justify-content: space-between
    align-content: center

  .cards__card
    width: 18rem
    height: 18rem
    border-radius: 0.5rem
    background-color: var(--primary--color)
    color: var(--neutral--color)
    box-shadow: 0 4px 10px 1px rgba(20, 20, 20, 0.50)
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

  .card__title
    font-size: 1.8rem
    margin-top: 1rem

</style>