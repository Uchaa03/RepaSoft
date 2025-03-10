<template>
  <h1 class="form__title">Inicia Sesión</h1>
  <router-link to="/register" class="form__button">
    <p>Regístrate</p><p class="form__selected">Accede</p>
  </router-link>
  <form class="form" @submit.prevent="onSubmit">
      <fieldset class="form__field">
        <label class="field__label">Correo Electrónico</label>
        <input
            class="field__input"
            type="email"
            id="email"
            v-model="email"
            placeholder="Introduce tu Correo Electrónico"
            @blur="validateEmail"
        >
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
        >
        <span v-if="passwordError" class="field__error">{{passwordError}}</span>
      </fieldset>
      <button class="form__submit" type="submit" :disabled="!isFormValid">Accede</button>
  </form>
</template>

<script>
import {validateEmail, validatePasswordLogin} from "@/helpers/validations.js";
import {login} from "@/helpers/apiCalls.js";

export default {
  name: "LoginComponent",
  data() {
    return { //Set values in data for manage inputs and errors
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      loginError: "" //Show login errors
    }
  },
  computed: {
    //Reactive validation
    isFormValid() {
      return !this.emailError && !this.passwordError && this.email && this.password;
    }
  },
  methods: {
    //Ser errors validations
    validateEmail() {
      this.emailError = validateEmail(this.email);
    },
    validatePassword() {
      this.passwordError = validatePasswordLogin(this.password);
    },
    //Call Backend submit
    onSubmit() {
      login()
      this.email = ""
      this.password = ""
    }
  },
}
</script>

<style scoped lang="sass">
  @use '@/assets/sass/utilities/mixins' as mixins

  .form
    @include mixins.forms-display

  .field__input
    @include mixins.input-style

  .form__submit
    @include mixins.create-button(18rem, 3.5rem, 2rem, bold)
    margin-top: 7rem
    align-self: flex-end
</style>