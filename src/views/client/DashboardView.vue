<template>
  <main class="repairs">
    <!-- When is charging -->
    <article v-if="isLoading" class="repairs__loading">
      <div class="repairs__loading-spinner">
        <div class="spinner__circle"></div>
        <div class="spinner__circle"></div>
        <div class="spinner__circle"></div>
      </div>
      <p class="repairs__loading-text">Cargando reparaciones...</p>
    </article>


    <!-- Error message -->
    <article v-if="error" class="repairs__error">
      <p class="repairs__error-message">{{ error }}</p>
    </article>

    <section v-if="!isLoading && !error">
      <!-- Message if this client doesn't has any repair  -->
      <section v-if="repairs.length === 0" class="repairs__no-results">
        <p class="repairs__no-results-text">No se encontraron reparaciones</p>
      </section>

      <!-- Bucle for show repairs -->
      <section v-for="repair in repairs" :key="repair.id" class="repairs__item">
        <article class="repair">
          <header class="repair__header">
            <h2 class="repair__reference-code">#{{ repair.reference_code }}</h2>

            <time class="repair__creation-date">{{ repair.creation_date }}</time>
          </header>

          <section class="repair__body">
            <!-- Product data -->
            <div class="repair__device-details">
              <h3 class="repair__device-name">{{ repair.device }}</h3>
              <span class="repair__model">{{ repair.model }}</span>
              <span class="repair__type">{{ repair.type }}</span>
            </div>

            <!-- Description repair -->
            <p class="repair__description">{{ repair.description }}</p>

            <footer class="repair__footer">
              <!-- Technician info -->
              <address class="repair__technician-info" v-if="repair.technician">
                <span class="repair__technician-label">Técnico:</span>
                <span class="repair__technician-name">{{ repair.technician.name }}</span>
              </address>

              <!-- Different class for custom styles -->
              <span :class="['repair__status-badge', `repair__status-badge--${getStatusBadgeClass(repair.status)}`]">
                {{ getStatusText(repair.status) }}
              </span>
            </footer>
          </section>
        </article>
      </section>
    </section>
  </main>
</template>

<script>
import { fetchClientRepairs } from '@/helpers/apiCalls.js';
import { useAuthStore } from '@/store/authstore.js';

export default {
  name: "ClientRepairsList",
  data() {
    return {
      repairs: [],
      isLoading: false,
      error: null
    }
  },
  async created() {
    await this.loadRepairs();
  },
  methods: {
    //Function for get repairs
    async loadRepairs() {
      this.isLoading = true;
      this.error = null;

      const authStore = useAuthStore();
      const token = authStore.access_token

      try {
        const response = await fetchClientRepairs(token);

        if (response.success) {
          // Usar la fecha tal como viene del backend sin formatear
          this.repairs = response.repairs;
        } else {
          this.error = response.error;
        }
      } catch (error) {
        this.error = 'Error de conexión con el servidor';
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    //Function for apply style in status
    getStatusBadgeClass(status) {
      return {
        'pending': 'status-pending',
        'in_progress': 'status-in-progress',
        'completed': 'status-completed'
      }[status];
    },
    //Get status repair
    getStatusText(status) {
      return {
        pending: 'Pendiente',
        in_progress: 'En Progreso',
        completed: 'Completada'
      }[status];
    }
  }
}
</script>

<style scoped lang="sass">
  @use '@/assets/sass/utilities/mixins' as mixins

  .repairs
    width: 100%
    display: flex
    flex-direction: column
    min-height: 80vh
    padding: 2rem 14rem

  .repair
    width: 100%
    margin-bottom: 2rem
    border-radius: 2rem
    padding: 2rem
    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.50)
    position: relative

  .repair__header
    display: flex
    justify-content: space-between
    align-items: flex-start
    margin-bottom: 1.5rem

  .repair__reference-code
    font-size: 2.5rem
    font-family: 'SF-Pro-Text-Bold', 'sans-serif'
    color: var(--primary--color)
    margin: 0

  .repair__creation-date
    font-size: 1.2rem
    color: #666

  .repair__device-details
    margin-bottom: 1rem

  .repair__device-name
    font-size: 1.6rem
    margin-bottom: 0.5rem

  .repair__model, .repair__type
    display: inline-block
    margin-right: 1rem
    padding: 0.3rem 0.8rem
    background-color: rgba(0, 0, 0, 0.05)
    border-radius: 0.5rem
    font-size: 1rem

  .repair__description
    margin: 1.5rem 0
    line-height: 1.5

  .repair__footer
    display: flex
    justify-content: space-between
    align-items: center
    margin-top: 1.5rem

  .repair__technician-info
    .repair__technician-label
      font-weight: bold
      margin-right: 0.5rem

  .repair__status-badge
    @include mixins.create-button(auto, auto, 1rem, bold)
    padding: 0.5rem 1.5rem
    &--status-pending
      background-color: #FFF3CD
      color: #856404
    &--status-in-progress
      background-color: #CCE5FF
      color: #004085
    &--status-completed
      background-color: #D4EDDA
      color: #155724

  .repairs__loading
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    background-color: white
    border-radius: 1.5rem
    padding: 3rem
    margin: 2rem 0
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2)
    min-height: 10rem
    width: 100%

  .repairs__loading-spinner
    display: flex
    gap: 0.8rem
    margin-bottom: 1.5rem

  .spinner__circle
    width: 1.2rem
    height: 1.2rem
    border-radius: 50%
    background-color: var(--primary--color)
    opacity: 0.8
    animation: bounce 1.4s infinite ease-in-out both

    &:nth-child(1)
      animation-delay: -0.32s

    &:nth-child(2)
      animation-delay: -0.16s

  .repairs__loading-text
    font-size: 1.3rem
    font-weight: 500
    color: var(--complementary--color)

  @keyframes bounce
    0%, 80%, 100%
      transform: scale(0)
    40%
      transform: scale(1)
</style>
