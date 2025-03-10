<template>
  <h1 class="form__title">Regístrate</h1>
  <router-link to="/login" class="form__button">
    <p class="form__selected">Regístrate</p><p>Accede</p>
  </router-link>
  <form class="form" @submit.prevent="onSubmit">
    <fieldset class="form__field">
      <label class="field__label">Nombre del Técnico</label>
      <input
          class="field__input"
          type="text"
          id="name"
          v-model="name"
          placeholder="Introduce tu Nombre"
          @blur="validateName"
      />
      <span v-if="nameError" class="field__error">{{nameError}}</span>
    </fieldset>
    <fieldset class="form__field">
      <label class="field__label">Correo Electrónico</label>
      <input
          class="field__input"
          type="email"
          id="email"
          v-model="email"
          placeholder="Introduce tu Correo Electrónico"
          @blur="validateEmail"
      />
      <span v-if="emailError" class="field__error">{{emailError}}</span>
    </fieldset>
    <fieldset class="form__field">
      <label class="field__label">Contraseña</label>
      <input
          class="field__input"
          type="password"
          id="password"
          v-model="password"
          placeholder="Introduce tu Contraseña"
          @blur="validatePassword"
      />
      <span v-if="passwordError" class="field__error">{{actualPasswordError}}</span>
    </fieldset>
    <fieldset class="form__field">
      <label class="field__label">Confirmación de Contraseña</label>
      <input
          class="field__input"
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="Confirma tu Contraseña"
          @blur="validateConfirmPassword"
      />
      <span v-if="confirmPasswordError" class="field__error">{{confirmPasswordError}}</span>
    </fieldset>
    <span v-if="registerError" class="field__error">{{registerError}}</span>
    <button class="form__submit" type="submit" :disabled="!isFormValid || isLoading">
      {{isLoading ? 'Registrando...' : 'Regístrate'}}
    </button>
  </form>
</template>

<script>
import { validateName, validateEmail, validatePasswordRegister, validateConfirmPassword } from "@/helpers/validations.js";
import {useAuthStore} from "@/store/authstore.js";
import {registerRequest} from "@/helpers/apiCalls.js";

export default {
  name: "RegisterComponent",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      nameError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      registerError: "",
      isLoading: false,
    };
  },
  computed: {
    isFormValid() {
      return (
          !this.nameError &&
          !this.emailError &&
          !this.passwordError &&
          !this.confirmPasswordError &&
          this.name &&
          this.email &&
          this.password &&
          this.confirmPassword
      );
    },
  },
  methods: {
    validateName() {
      this.nameError = validateName(this.name);
    },
    validateEmail() {
      this.emailError = validateEmail(this.email);
    },
    validatePassword() {
      this.passwordError = validatePasswordRegister(this.password);
    },
    validateConfirmPassword() {
      this.confirmPasswordError = validateConfirmPassword(this.password, this.confirmPassword);
    },
    async onSubmit() {
      this.isLoading = true
      this.registerError = ""

      const res = await registerRequest(this.name, this.email, this.password);

      if (res.success) {
        const authStore = useAuthStore()
        authStore.setAuthData(res.response)

        this.$router.push("/panel")
      }else {
        this.registerError = res.error
        this.isLoading = false
      }
    },
  },
};
</script>

<style scoped lang="sass">
@use '@/assets/sass/utilities/mixins' as mixins

.form
  @include mixins.forms-display
  padding: 2.5rem 7rem

.field__input
  @include mixins.input-style
  margin: 0.1rem 0 1rem 0


.form__submit
  @include mixins.create-button(18rem, 3.5rem, 2rem, bold)
  margin-top: 1rem
  align-self: flex-end
</style>
