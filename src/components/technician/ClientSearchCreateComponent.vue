<template>
  <div class="client-container">
    <h1 class="client__title">Datos del Cliente</h1>

    <!-- Principal form for search a client -->
    <form v-if="!selectedClient && !showCreateForm" class="client__form" @submit.prevent="searchClient">
      <fieldset class="form__field">
        <label class="field__label">Email de Cliente</label>
        <input
            class="field__input"
            type="email"
            v-model="searchEmail"
            placeholder="Introduce el correo del cliente"
            @blur="validateEmail"
        />
        <span v-if="emailError" class="field__error">{{ emailError }}</span>
        <span v-if="searchError" class="field__error">{{ searchError }}</span>
      </fieldset>
      <button class="form__submit" type="submit" :disabled="!isSearchValid || isSearching">
        {{ isSearching ? 'Buscando...' : 'Buscar Cliente' }}
      </button>

      <!-- If search client fail show option to create a client -->
      <button v-if="searchError" class="client__create-button" type="button" @click="showCreateForm = true">
        Crear Nuevo Cliente
      </button>
    </form>

    <!-- Form Create Client -->
    <form v-if="showCreateForm && !selectedClient" class="client__form" @submit.prevent="createClient">
      <h2 class="client__subtitle">Nuevo Cliente</h2>

      <fieldset class="form__field">
        <label class="field__label">Nombre</label>
        <input
            class="field__input"
            type="text"
            v-model="newClient.name"
            placeholder="Nombre completo"
            @blur="validateName"
        />
        <span v-if="nameError" class="field__error">{{ nameError }}</span>
        <span v-if="createError" class="field__error">{{ createError }}</span>
      </fieldset>

      <fieldset class="form__field">
        <label class="field__label">Email</label>
        <input
            class="field__input"
            type="email"
            v-model="newClient.email"
            placeholder="Email del cliente"
            @blur="validateClientEmail"
        />
        <span v-if="clientEmailError" class="field__error">{{ clientEmailError }}</span>
      </fieldset>

      <fieldset class="form__field">
        <label class="field__label">Teléfono</label>
        <input
            class="field__input"
            type="tel"
            v-model="newClient.phone"
            placeholder="Teléfono de contacto"
            @blur="validatePhone"
        />
        <span v-if="phoneError" class="field__error">{{ phoneError }}</span>
      </fieldset>

      <fieldset class="form__field">
        <label class="field__label">Dirección</label>
        <input
            class="field__input"
            type="text"
            v-model="newClient.address"
            placeholder="Dirección completa"
            @blur="validateAddress"
        />
        <span v-if="addressError" class="field__error">{{ addressError }}</span>
      </fieldset>
      <footer class="client__form-buttons">
        <button type="button" class="client__back-button" @click="showCreateForm = false">
          Volver a Búsqueda
        </button>
        <button class="form__submit" type="submit" :disabled="!isCreateFormValid || isCreating">
          {{ isCreating ? 'Creando...' : 'Crear Cliente' }}
        </button>
      </footer>
    </form>

    <!-- Show Client Selected -->
    <section v-if="selectedClient" class="client__info">
      <h2 class="client__subtitle">Cliente Seleccionado</h2>
      <article class="client__details">
        <p><strong>Nombre:</strong> {{ selectedClient.name }}</p>
        <p><strong>Email:</strong> {{ selectedClient.email }}</p>
        <p><strong>Teléfono:</strong> {{ selectedClient.phone }}</p>
        <p><strong>Dirección:</strong> {{ selectedClient.address }}</p>
      </article>
      <button class="client__change-button" @click="resetClient">
        Cambiar Cliente
      </button>
    </section>
  </div>
</template>

<script>
import {
  validateEmail,
  validateName,
  validatePhone,
  validateAddress
} from "@/helpers/validations.js";
import { searchClientRequest, createClientRequest } from "@/helpers/apiCalls.js";
import { useAuthStore } from "@/store/authstore.js";

export default {
  name: "ClientSearchCreateComponent",
  emits: ['client-selected'],
  data() {
    return {
      searchEmail: "",
      emailError: "",
      isSearching: false,
      searchError: "",
      showCreateForm: false,
      newClient: {
        name: "",
        email: "",
        phone: "",
        address: ""
      },
      nameError: "",
      clientEmailError: "",
      phoneError: "",
      addressError: "",
      isCreating: false,
      createError: "",
      selectedClient: null
    }
  },
  computed: {
    isSearchValid() {
      return !this.emailError && this.searchEmail;
    },
    isCreateFormValid() {
      return !this.nameError &&
          !this.clientEmailError &&
          !this.phoneError &&
          !this.addressError &&
          this.newClient.name &&
          this.newClient.email &&
          this.newClient.phone &&
          this.newClient.address;
    }
  },
  methods: {
    validateEmail() {
      this.emailError = validateEmail(this.searchEmail);
      this.searchError = "";
    },
    validateName() {
      this.nameError = validateName(this.newClient.name);
    },
    validateClientEmail() {
      this.clientEmailError = validateEmail(this.newClient.email);
    },
    validatePhone() {
      this.phoneError = validatePhone(this.newClient.phone);
    },
    validateAddress() {
      this.addressError = validateAddress(this.newClient.address);
    },
    resetClient() {
      this.selectedClient = null;
      this.searchEmail = "";
      this.showCreateForm = false;
      this.$emit('client-selected', null);
    },
    //Function for search client
    async searchClient() {
      if (!this.isSearchValid) return;

      this.isSearching = true;
      this.searchError = "";

      const authStore = useAuthStore();
      const techToken = authStore.access_token;

      try {
        const response = await searchClientRequest(this.searchEmail, techToken);

        if (response.success) {
          this.selectedClient = response.client;
          //Send client to father element
          this.$emit('client-selected', response.client);
        } else {
          this.searchError = "Cliente no encontrado";
        }
      } catch (error) {
        this.searchError = "Error en la búsqueda";
        console.error(error);
      } finally {
        this.isSearching = false;
      }
    },
    async createClient() {
      this.validateName();
      this.validateClientEmail();
      this.validatePhone();
      this.validateAddress();

      if (!this.isCreateFormValid) return;

      this.isCreating = true;
      this.createError = "";

      const authStore = useAuthStore();
      const techToken = authStore.access_token;

      try {
        const response = await createClientRequest({
          ...this.newClient,
        }, techToken);

        if (response.success) {
          this.selectedClient = response.client;
          this.$emit('client-selected', response.client);
          this.showCreateForm = false;

          this.newClient = {
            name: "",
            email: "",
            phone: "",
            address: ""
          };
        } else {
          this.createError = response.error || "Error al crear cliente";
        }
      } catch (error) {
        this.createError = "Error de conexión con el servidor";
        console.error(error);
      } finally {
        this.isCreating = false;
      }
    }
  }
}
</script>

<style scoped lang="sass">
  @use '@/assets/sass/utilities/mixins' as mixins

  .client__title
    font-size: 3rem
    font-family: 'SF-Pro-Text-Bold', 'sans-serif'
    color: var(--neutral--color)
    margin-top: 2rem
    margin-left: 2rem

  .client__form
    @include mixins.forms-display
    padding: 1rem 3rem
    position: relative
    .field__error
      background-color: var(--complementary--color)

  .field__label
    color: var(--neutral--color)

  .field__input
    @include mixins.input-style
    border-color: var(--complementary--color)
    background-color: var(--neutral--color)
    color: var(--complementary--color)
    box-shadow: none
    position: relative

  .form__submit
    @include mixins.create-button(14rem, 3rem, 1.8rem, bold)
    color: var(--complementary--color)
    background-color: var(--neutral--color)
    align-self: flex-end

  .client__create-button
    @include mixins.create-button(18rem, 3rem, 1.6rem, bold)
    color: var(--complementary--color)
    background-color: var(--neutral--color)
    margin-top: 1rem
    align-self: flex-end

  .client__back-button
    @include mixins.create-button(14rem, 3rem, 1.6rem, bold)
    color: var(--complementary--color)
    background-color: var(--neutral--color)

  .client__form-buttons
    display: flex
    justify-content: space-between
    width: 100%
    margin-top: 1rem

  .client__subtitle
    font-size: 2rem
    color: var(--neutral--color)
    margin-bottom: 1.5rem

  .client__info
    padding: 2rem

  .client__details
    background-color: var(--neutral--color)
    padding: 1.5rem
    border-radius: 0.8rem
    color: var(--complementary--color)
    margin-bottom: 1.5rem
    p
      margin: 0.8rem 0
      font-size: 1.4rem

  .client__change-button
    @include mixins.create-button(14rem, 3rem, 1.6rem, bold)
    color: var(--complementary--color)
    background-color: var(--neutral--color)
</style>