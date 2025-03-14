<template>
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

        <!-- Loading state -->
        <div v-if="isLoading" class="reparations__loading">
          <p>Cargando...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="reparations__error">
          <p>{{ error }}</p>
        </div>

        <!-- Repair list -->
        <ul v-else class="reparations__list">
          <li v-for="repair in recentRepairs" :key="repair.id" class="repair-item">
            <div class="repair-item__content">
              <h3 class="repair-item__code">{{ repair.reference_code }}</h3>
              <div class="repair-item__date">{{ repair.created_at }}</div>
              <div class="repair-item__details">
                <p class="repair-item__type">Tipo: {{ repair.device_name }}</p>
                <p class="repair-item__client">Cliente: {{ repair.client.name }}</p>
              </div>
              <span :class="['repair-item__status', `repair-item__status--${getStatusClass(repair.status)}`]">
                {{ getStatusText(repair.status) }}
              </span>
            </div>
          </li>

          <!-- Empty states to fill remaining slots -->
          <li v-for="i in (5 - recentRepairs.length)" :key="`empty-${i}`" class="repair-item repair-item--empty">
            <p class="repair-item__empty-text">Sin reparaciones adicionales</p>
          </li>
        </ul>

        <div class="reparations__footer"></div>
      </article>
    </section>
  </main>
</template>

<script>
import { fetchRecentRepairs } from '@/helpers/apiCalls.js';
import { useAuthStore } from '@/store/authstore.js';

export default {
  name: "PanelView",
  data() {
    return {
      recentRepairs: [],
      isLoading: true,
      error: null
    }
  },
  async mounted() {
    await this.loadRecentRepairs();
  },
  methods: {
    async loadRecentRepairs() {
      const authStore = useAuthStore();
      try {
        const response = await fetchRecentRepairs(authStore.access_token);

        if (response.success) {
          this.recentRepairs = response.repairs.slice(0, 5);
        } else {
          this.error = response.error;
        }
      } catch (error) {
        this.error = "Error al cargar reparaciones recientes";
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    getStatusClass(status) {
      return {
        'pending': 'pending',
        'in_progress': 'progress',
        'completed': 'completed',
        'cancelled': 'cancelled'
      }[status] || 'pending';
    },

    getStatusText(status) {
      return {
        'pending': 'Pendiente',
        'in_progress': 'En progreso',
        'completed': 'Completada',
        'cancelled': 'Cancelada'
      }[status] || 'Pendiente';
    }
  }
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
    margin: 0

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
    overflow-y: auto

  .repair-item
    flex: 0 0 20%
    width: 100%
    min-height: 20%
    border-bottom: 1px dashed #d0d0d0
    padding: 0.8rem
    box-shadow: 0 4px 10px 1px rgba(20, 20, 20, 0.10)
    position: relative

    &:last-child
      border-bottom: none

    &--empty
      display: flex
      justify-content: center
      align-items: center
      background-color: #f9f9f9
      opacity: 0.7

  .repair-item__content
    position: relative
    height: 100%

  .repair-item__code
    font-size: 1.3rem
    font-weight: bold
    color: #500
    margin: 0 0 0.3rem 0

  .repair-item__date
    position: absolute
    top: 0
    right: 0
    font-size: 0.9rem
    color: #666

  .repair-item__details
    margin: 0.5rem 0

  .repair-item__type,
  .repair-item__client
    margin: 0.2rem 0
    font-size: 0.9rem

  .repair-item__status
    position: absolute
    bottom: 0
    right: 0
    padding: 0.4rem 1rem
    border-radius: 1rem
    font-size: 0.8rem
    font-weight: bold
    color: white

    &--pending
      background-color: #FFA000

    &--progress
      background-color: #1976D2

    &--completed
      background-color: #388E3C

    &--cancelled
      background-color: #D32F2F

  .repair-item__empty-text
    color: #999
    font-style: italic

  .reparations__loading,
  .reparations__error
    display: flex
    justify-content: center
    align-items: center
    height: 100%
    color: #666
</style>
