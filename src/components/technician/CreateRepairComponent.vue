<template>
  <main class="repair">
    <section class="repair__form">
      <!-- Simple form for create repair -->
      <form class="form" @submit.prevent="onSubmit">
        <h1 class="form__title">Datos de la Reparación</h1>

        <fieldset class="form__field">
          <label class="form__label" for="deviceName">Nombre del Dispositivo</label>
          <input
              class="form__input"
              type="text"
              id="deviceName"
              v-model="deviceName"
              placeholder="Introduce el nombre de dispositivo"
              @blur="validateDeviceName"
          />
          <span v-if="deviceNameError" class="field__error">{{deviceNameError}}</span>
        </fieldset>

        <fieldset class="form__field">
          <label class="form__label" for="model">Modelo S/N</label>
          <input
              class="form__input"
              type="text"
              id="model"
              v-model="model"
              placeholder="Introduce el S/N del dispositivo"
              @blur="validateModel"
          />
          <span v-if="modelError" class="field__error">{{modelError}}</span>
        </fieldset>

        <fieldset class="form__field">
          <label class="form__label" for="type">Tipo de Dispositivo</label>
          <select
              class="form__input"
              id="type"
              v-model="type"
              @blur="validateType"
          >
            <option value="" selected>Tipo de dispositivo</option>
            <option value="Móviles">Móviles</option>
            <option value="Portátiles">Portátiles</option>
            <option value="Tablets">Tablets</option>
            <option value="Ordenadores">Ordenadores</option>
            <option value="Otros">Otros</option>
          </select>
          <span v-if="typeError" class="field__error">{{typeError}}</span>
        </fieldset>

        <fieldset class="form__field">
          <label class="form__label" for="description">Descripción del Problema</label>
          <textarea
              class="form__textarea"
              id="description"
              v-model="description"
              placeholder="Describe el problema del dispositivo"
              rows="4"
              @blur="validateDescription"
          ></textarea>
          <span v-if="descriptionError" class="field__error">{{descriptionError}}</span>
        </fieldset>

        <span v-if="formError" class="field__error">{{formError}}</span>
        <button class="form__submit" type="submit" :disabled="!isFormValid || isLoading">
          {{ isLoading ? 'Cargando...' : 'Crear Reparación' }}
        </button>
      </form>

      <section class="repair__client">
        <!-- Pass emit to function to add to client data -->
        <ClientSearchCreateComponent @client-selected="onClientSelected"/>
      </section>
    </section>
  </main>
</template>

<script>
import { validateDeviceName, validateModel, validateType, validateDescription } from "@/helpers/validations.js";
import { createRepairRequest } from "@/helpers/apiCalls.js";
import ClientSearchCreateComponent from "@/components/technician/ClientSearchCreateComponent.vue";
import { useAuthStore } from "@/store/authstore.js";

export default {
  name: "CreateRepairComponent",
  components: { ClientSearchCreateComponent },
  data() {
    return {
      deviceName: "",
      model: "",
      type: "",
      description: "",
      deviceNameError: "",
      modelError: "",
      typeError: "",
      descriptionError: "",
      formError: "",
      isLoading: false,
      client: null
    }
  },
  computed: {
    isFormValid() {
      return (
          !this.deviceNameError &&
          !this.modelError &&
          !this.typeError &&
          !this.descriptionError &&
          this.deviceName &&
          this.model &&
          this.type &&
          this.description &&
          this.client
      );
    }
  },
  methods: {
    onClientSelected(client) {
      this.client = client; //Set client data
      this.formError = "";
    },

    validateDeviceName() {
      this.deviceNameError = validateDeviceName(this.deviceName);
    },

    validateModel() {
      this.modelError = validateModel(this.model);
    },

    validateType() {
      this.typeError = validateType(this.type);
    },

    validateDescription() {
      this.descriptionError = validateDescription(this.description);
    },

    async onSubmit() {
      this.isLoading = true;
      this.formError = "";


      const repairData = {
        device_name: this.deviceName,
        model: this.model,
        type: this.type,
        description: this.description,
        client_id: this.client.id
      };

      const authStore = useAuthStore();
      const token = authStore.access_token

      try {
        const response = await createRepairRequest(repairData, token);

        if (response.success) {
          this.$router.push({
            path: "/panel",
            query: { success: "Reparación creada exitosamente" }
          });
        } else {
          this.formError = response.error || "Error al crear la reparación";
        }
      } catch (error) {
        this.formError = "Error de conexión con el servidor";
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped lang="sass">
  @use '@/assets/sass/utilities/mixins' as mixins
  .repair
    width: 100%
    display: flex
    justify-content: center
    align-items: center
    min-height: 85vh
    padding: 0 14rem

  .repair__form
    width: 100%
    height: 48rem
    border-radius: 2rem
    box-shadow: 0 0 18px 2px rgba(0, 0, 0, 0.50)
    display: flex
    flex-direction: row

  .form
    width: 55%
    @include mixins.forms-display
    padding-top: 2.5rem
    padding-left: 4rem

  .form__title
    font-size: 3rem
    font-family: 'SF-Pro-Text-Bold', 'sans-serif'
    margin-top: 0
    margin-left: 0
    margin-bottom: 1rem

  .form__field
    margin-left: 1rem

  .form__input
    @include mixins.input-style

  .form__submit
    @include mixins.create-button(22rem, 4rem, 2rem, bold)
    margin-top: 1rem
    align-self: flex-end

  .form__textarea
    @include mixins.input-style
    margin: 0.1rem 0 2rem 0
    padding-top: 1rem
    resize: none
    height: 10rem

  .repair__client
    width: 45%
    background-color: var(--primary--color)
    border-radius: 2rem
</style>
