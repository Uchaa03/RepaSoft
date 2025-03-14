<template>
  <main class="repairs">
    <!-- Notification -->
    <aside v-if="notification.show" :class="['repairs__notification', `repairs__notification--${notification.type}`]">
      <p class="repairs__notification-text">{{ notification.message }}</p>
      <button class="repairs__notification-close" @click="notification.show = false">×</button>
    </aside>

    <!-- Loading states -->
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
      <button class="repairs__retry-button" @click="loadRepairs">Reintentar</button>
    </article>

    <!-- Main content -->
    <section v-if="!isLoading && !error" class="repairs__content">
      <!-- Header with counter -->
      <header class="repairs__header">
        <h1 class="repairs__title">Reparaciones asignadas</h1>
        <span class="repairs__count">{{ repairs.length }} reparaciones</span>
      </header>

      <!-- No results -->
      <section v-if="repairs.length === 0" class="repairs__no-results">
        <p class="repairs__no-results-text">No tienes reparaciones asignadas</p>
      </section>

      <!-- Repairs list -->
      <section v-for="repair in repairs" :key="repair.id" class="repairs__item">
        <article class="repair">
          <!-- Card header -->
          <header class="repair__header">
            <h2 class="repair__reference-code">#{{ repair.reference_code }}</h2>
            <time class="repair__creation-date">{{ repair.created_at }}</time>
          </header>

          <!-- Card body -->
          <section class="repair__body">
            <h3 class="repair__device-name">{{ repair.device }}</h3>
            <div class="repair__device-details">
              <span class="repair__model">{{ repair.model }}</span>
              <span class="repair__type">{{ repair.type }}</span>
            </div>

            <!-- Description -->
            <p class="repair__description">{{ repair.description }}</p>

            <!-- Client information -->
            <section class="repair__client-info">
              <h4 class="repair__client-title">Datos del cliente:</h4>
              <div class="repair__client-details">
                <p class="repair__client-name">{{ repair.client.name }}</p>
                <p class="repair__client-contact">
                  <!-- Icons Copy paste for decorate -->
                  <a :href="`tel:${repair.client.phone}`">📱 {{ repair.client.phone }}</a>
                  <a :href="`mailto:${repair.client.email}`">📧 {{ repair.client.email }}</a>
                </p>
                <p class="repair__client-address">
                  📍 {{ repair.client.address }}
                </p>
              </div>
            </section>

            <!-- Actions -->
            <footer class="repair__footer">
              <div class="repair__status-selector">
                <label class="repair__status-label">Estado:</label>
                <select
                    v-model="repair.status"
                    class="repair__status-select"
                    @change="updateStatus(repair.id, repair.status)"
                >
                  <option value="pending">Pendiente</option>
                  <option value="in_progress">En progreso</option>
                  <option value="completed">Completada</option>
                  <option value="cancelled">Cancelada</option>
                </select>
              </div>

              <!-- Delete button with confirmation -->
              <button
                  v-if="!repair.deleteConfirm"
                  class="repair__delete-btn"
                  @click="repair.deleteConfirm = true"
              >
                Eliminar
              </button>

              <div v-else class="repair__confirm-delete">
                <span class="repair__confirm-text">¿Seguro?</span>
                <button
                    class="repair__confirm-yes"
                    @click="deleteRepairItem(repair.id)"
                >
                  Sí
                </button>
                <button
                    class="repair__confirm-no"
                    @click="repair.deleteConfirm = false"
                >
                  No
                </button>
              </div>
            </footer>
          </section>
        </article>
      </section>
    </section>
  </main>
</template>

<script>
import {
  fetchTechnicianRepairs,
  updateRepairStatus,
  deleteRepair
} from '@/helpers/apiCalls.js';
import { useAuthStore } from '@/store/authstore.js';

export default {
  name: "TechnicianRepairsList",
  data() {
    return {
      repairs: [],
      isLoading: false,
      error: null,
      notification: {
        show: false,
        type: 'success',
        message: '',
        timeout: null
      }
    }
  },
  async created() {
    await this.loadRepairs();
  },
  methods: {
    async loadRepairs() {
      this.isLoading = true;
      this.error = null;

      const authStore = useAuthStore();
      const token = authStore.access_token;

      try {
        const response = await fetchTechnicianRepairs(token);

        if (response.success) {
          //Add delete confirmation repair in repairs
          this.repairs = response.repairs.map(repair => ({
            ...repair,
            deleteConfirm: false
          }));
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
    //Function for show notification
    showNotification(message, type = 'success') {
      // Clean message
      if (this.notification.timeout) {
        clearTimeout(this.notification.timeout);
      }

      this.notification = {
        show: true,
        type,
        message,
        timeout: setTimeout(() => {
          this.notification.show = false;
        }, 3000)
      };
    },
    //Function for change status repair
    async updateStatus(repairId, newStatus) {
      const authStore = useAuthStore();
      const token = authStore.access_token;

      try {
        const response = await updateRepairStatus(repairId, newStatus, token);

        if (response.success) {
          this.showNotification(`Estado actualizado a: ${this.getStatusText(newStatus)}`);
        } else {
          this.showNotification(response.error, 'error');
          // Recargar reparaciones para restablecer estado original
          await this.loadRepairs();
        }
      } catch (error) {
        this.showNotification('Error al actualizar estado', 'error');
        console.error(error);
        await this.loadRepairs();
      }
    },

    async deleteRepairItem(repairId) {
      const authStore = useAuthStore();
      const token = authStore.access_token;

      try {
        const response = await deleteRepair(repairId, token);

        if (response.success) {
          // Delete repa
          this.repairs = this.repairs.filter(repair => repair.id !== repairId);
          this.showNotification(`Reparación #${response.deletedRepair.reference_code} eliminada`);
        } else {
          this.showNotification(response.error, 'error');
        }
      } catch (error) {
        this.showNotification('Error al eliminar reparación', 'error');
        console.error(error);
      }
    },
    //Get status back and convert for front
    getStatusText(status) {
      return {
        'pending': 'Pendiente',
        'in_progress': 'En progreso',
        'completed': 'Completada',
        'cancelled': 'Cancelada'
      }[status] || status;
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
    position: relative


  .repairs__notification
    position: fixed
    top: 2rem
    right: 2rem
    padding: 1rem 1.5rem
    border-radius: 0.5rem
    display: flex
    align-items: center
    justify-content: space-between
    min-width: 300px
    z-index: 10
    animation: slideIn 0.3s ease-in-out
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)

    &--success
      background-color: #D4EDDA
      color: #155724
      border-left: 4px solid #28A745

    &--error
      background-color: var(--secondary--color)
      color: var(--primary--color)
      border-left: 4px solid var(--primary--color)

  .repairs__notification-close
    background: none
    border: none
    font-size: 1.5rem
    cursor: pointer
    color: inherit
    padding: 0 0.5rem


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


  .repairs__header
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 2rem

  .repairs__title
    font-size: 2.2rem
    color: var(--complementary--color)
    margin: 0

  .repairs__count
    background-color: var(--primary--color)
    color: white
    padding: 0.5rem 1rem
    border-radius: 2rem
    font-weight: bold


  .repair
    width: 100%
    margin-bottom: 2rem
    border-radius: 2rem
    padding: 2rem
    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.20)
    position: relative
    background-color: white
    transition: transform 0.2s ease

    &:hover
      transform: translateY(-3px)
      box-shadow: 4px 5px 15px rgba(0, 0, 0, 0.25)

  .repair__header
    display: flex
    justify-content: space-between
    align-items: flex-start
    margin-bottom: 1.5rem

  .repair__reference-code
    font-size: 2rem
    font-weight: bold
    color: var(--primary--color)
    margin: 0

  .repair__creation-date
    font-size: 1.2rem
    color: #666

  .repair__device-name
    font-size: 1.6rem
    margin-bottom: 0.5rem

  .repair__device-details
    margin-bottom: 1rem
    display: flex
    gap: 1rem
    flex-wrap: wrap

  .repair__model, .repair__type
    display: inline-block
    padding: 0.3rem 0.8rem
    background-color: rgba(var(--primary--color-rgb), 0.1)
    border-radius: 0.5rem
    font-size: 1rem

  .repair__description
    margin: 1.5rem 0
    line-height: 1.5
    color: #555


  .repair__client-info
    background-color: #F9F9F9
    border-radius: 1rem
    padding: 1.5rem
    margin: 1.5rem 0
    border-left: 4px solid var(--primary--color)

  .repair__client-title
    margin-top: 0
    margin-bottom: 1rem
    font-size: 1.2rem
    color: var(--complementary--color)

  .repair__client-details
    p
      margin: 0.5rem 0

    a
      margin-right: 1rem
      color: var(--primary--color)
      text-decoration: none

      &:hover
        text-decoration: underline


  .repair__footer
    display: flex
    justify-content: space-between
    align-items: center
    margin-top: 1.5rem
    padding-top: 1.5rem
    border-top: 1px solid #EEE

  .repair__status-selector
    display: flex
    align-items: center
    gap: 0.8rem

  .repair__status-label
    font-weight: bold
    color: #555

  .repair__status-select
    padding: 0.6rem 1rem
    border-radius: 0.5rem
    border: 2px solid #DDD
    background-color: white
    font-size: 1rem
    cursor: pointer

    &:focus
      border-color: var(--primary--color)
      outline: none


  .repair__delete-btn
    @include mixins.create-button(auto, 2.5rem, 1rem, bold)
    background-color: var(--primary--color)
    padding: 0 1.5rem

    &:hover
      background-color: #BD2130

  .repair__confirm-delete
    display: flex
    align-items: center
    gap: 0.5rem

  .repair__confirm-text
    font-weight: bold
    color: #DC3545

  .repair__confirm-yes,
  .repair__confirm-no
    @include mixins.create-button(3rem, 2.2rem, 0.9rem, bold)

  .repair__confirm-yes
    background-color: #DC3545

    &:hover
      background-color: #BD2130

  .repair__confirm-no
    background-color: #6C757D

    &:hover
      background-color: #5A6268


  .repairs__error,
  .repairs__no-results
    text-align: center
    padding: 3rem
    border-radius: 1rem
    background-color: white
    margin: 2rem 0
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1)

  .repairs__retry-button
    @include mixins.create-button(10rem, 3rem, 1rem, bold)
    margin-top: 1.5rem

  // Animations
  @keyframes bounce
    0%, 80%, 100%
      transform: scale(0)
    40%
      transform: scale(1)

  @keyframes slideIn
    from
      transform: translateX(100%)
      opacity: 0
    to
      transform: translateX(0)
      opacity: 1
</style>
