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
      <span v-if="loginError" class="field__error">{{loginError}}</span>
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
      <span v-if="loginError" class="field__error">{{loginError}}</span>
      <span v-if="passwordError" class="field__error">{{passwordError}}</span>
    </fieldset>
    <button class="form__submit" type="submit" :disabled="!isFormValid || isLoading">
      {{ isLoading ? 'Cargando...' : 'Accede' }}
    </button>
  </form>
</template>

<script>
import {validateEmail, validatePasswordLogin} from "@/helpers/validations.js";
import {loginRequest} from "@/helpers/apiCalls.js";
import {useAuthStore} from "@/store/authstore.js";

export default {
  name: "LoginComponent",
  data() {
    return { //Set values in data for manage inputs and errors
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      loginError: "", //Show login errors
      isLoading: false, //Control petitions
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
      this.loginError = ""
    },
    validatePassword() {
      this.passwordError = validatePasswordLogin(this.password);
      this.loginError = ""
    },
    //Call Backend submit
    async onSubmit() {
      this.isLoading = true;
      this.loginError = ""
      //Get pinia and route
      const authStore = useAuthStore()

      //Ger result of login
      const res =  await loginRequest(this.email, this.password);
      if (res.success) {
        //Store data result
        authStore.setAuthData(res.response)
        this.isLoading = false
        if (res.response.user_type === 'technician') {
          this.$router.push("/panel");
        }else if (res.response.user_type === 'client') {
          this.$router.push("/dashboard");
        }
      } else {
        this.loginError = res.error
        this.isLoading = false
      }
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
    align-self: flex-end
    margin-top: 7rem
</style>