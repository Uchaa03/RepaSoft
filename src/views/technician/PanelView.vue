<template xmlns="http://www.w3.org/1999/html">
  <main class="panel">
    <section class="panel__buttons">
      <router-link to="/create-reparation" class="buttons__button1">
        <img class="button__img" src="/img/CrearRepaPanel.svg" alt="">
        <h2 class="panel_subtitle">Crear Reparación</h2>
      </router-link>
      <router-link to="/reparations" class="buttons__button2">
        <img class="button__img" src="/img/VerRepaPanel.svg" alt="">
        <h2 class="panel_subtitle">Reparaciones</h2>
      </router-link>
      <router-link to="" class="buttons__button3" :aria-disabled="true">
        <img class="button__img" src="/img/TicketsPanel.svg" alt="">
        <h2 class="panel_subtitle">Próximamente</h2>
      </router-link>
      <router-link to="" class="buttons__button4" :aria-disabled="true">
        <img class="button__img" src="/img/InventarioPanel.svg" alt="">
        <h2 class="panel_subtitle">Próximamente</h2>
      </router-link>
    </section>
    <section class="panel__list">
      <article class="list__reparations">
        <h1 class="reparations__header">Reparaciones Recientes</h1>
        <ul class="reparations__list">
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
        <div class="reparations__footer"></div>
      </article>
    </section>
  </main>
</template>

<script>
export default {
  name: "PanelView"
}
</script>


<style scoped lang="sass">
  @use '@/assets/sass/utilities/mixins' as mixins
  .panel
    width: 100%
    display: flex
    justify-content: space-between
    min-height: 80vh
    padding: 4rem 14rem

  .panel__buttons
    width: 50%
    display: grid
    grid-template-areas: "button1 button2" "button3 button4"
    grid-template-columns: 1fr 1fr
    grid-template-rows: 1fr 1fr
    align-items: center

  .buttons__button1
    @include mixins.button-panel
    grid-area: button1

  .buttons__button2
    @include mixins.button-panel
    grid-area: button2

  .buttons__button3
    @include mixins.button-panel
    grid-area: button3
    opacity: 0.5

  .buttons__button4
    @include mixins.button-panel
    grid-area: button4
    opacity: 0.5
    gap: 2.5rem

  .panel__list
    width: 50%
    display: flex
    justify-content: flex-end
    align-items: center


  .list__reparations
    position: relative
    width: 35rem
    height: 95%
    border: solid 0.8rem var(--primary--color)
    border-radius: 1rem
    display: flex
    flex-direction: column

  .reparations__header
    width: 100%
    height: 2.5rem
    background-color: var(--primary--color)
    color: var(--neutral--color)
    font-size: 1.5rem
    padding-left: 1rem

  .reparations__footer
    position: absolute
    bottom: 0
    width: 100%
    height: 2rem
    align-items: flex-end
    background-color: var(--primary--color)

  .reparations__list
    display: flex
    flex-direction: column
    height: calc(100% - 4.5rem)
    padding: 0
    margin: 0
    list-style: none

    li
      flex: 1
      width: 100%
      height: 25%
      box-shadow: 0 4px 10px 1px rgba(20, 20, 20, 0.10)
</style>