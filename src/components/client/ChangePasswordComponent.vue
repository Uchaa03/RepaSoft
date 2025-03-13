<template>
  <h1 class="form__title">Cambia tu contraseña</h1>
  <form class="form" @submit.prevent="onSubmit">
    <fieldset class="form__field">
      <label class="field__label">Contraseña Actual</label>
      <input
          class="field__input"
          type="password"
          id="actualPassword"
          v-model="actualPassword"
          placeholder="Introduce la contraseña Generada"
          @blur="validateActualPassword"
      >
      <span v-if="actualPasswordError" class="field__error">{{ actualPasswordError }}</span>
    </fieldset>
    <fieldset class="form__field">
      <label class="field__label">Nueva Contraseña</label>
      <input
          class="field__input"
          type="password"
          id="password"
          v-model="password"
          placeholder="Introduce tu Contraseña"
          @blur="validatePassword"
      />
      <span v-if="passwordError" class="field__error">{{passwordError}}</span>
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
    <span v-if="changePasswordError" class="field__error">{{ changePasswordError }}</span>
    <button class="form__submit" type="submit" :disabled="!isFormValid || isLoading">
      {{ isLoading ? 'Cargando...' : 'Cambia la Contraseña' }}
    </button>
  </form>
</template>

<script>
import {validateConfirmPassword, validatePasswordLogin, validatePasswordRegister} from "@/helpers/validations.js";
import {changePasswordRequest} from "@/helpers/apiCalls.js";
import {useAuthStore} from "@/store/authstore.js";

export default {
  name: "ChangePasswordComponent",
  data() {
    return { //Set values in data for manage inputs and errors
      actualPassword: "",
      password: "",
      confirmPassword: "",
      actualPasswordError: "",
      changePasswordError: "",
      passwordError: "",
      confirmPasswordError: "",//Show login errors
      isLoading: false, //Control petitions
    }
  },
  computed: {
    //Reactive validation
    isFormValid() {
      return !this.actualPasswordError && !this.passwordError && !this.confirmPasswordError &&
          this.actualPassword && this.password && this.confirmPassword;
    }
  },
  methods: {
    //Ser errors validations
    validateActualPassword() {
      this.actualPasswordError = validatePasswordLogin(this.actualPassword);
    },
    validatePassword() {
      this.passwordError = validatePasswordRegister(this.password);
    },
    validateConfirmPassword() {
      this.confirmPasswordError = validateConfirmPassword(this.password, this.confirmPassword);
    },
    //Call Backend submit
    async onSubmit() {
      this.isLoading = true;
      this.changePasswordError = ""

      //Get pinia
      const authStore = useAuthStore()


      //Get result of login
      const res =  await changePasswordRequest(this.actualPassword, this.password, authStore.access_token);
      if (res.success) {
        authStore.updatePassword(false)

        //When paseord change return to dashboard client
        this.$router.push("/dashboard")
      }else {
        this.changePasswordError = res.status === 400
            ? "La contraseña actual es incorrecta"
            : res.error;
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
  padding: 3rem 7rem

.field__input
  @include mixins.input-style
  margin: 0.2rem 0 1.2rem 0

.form__submit
  @include mixins.create-button(22rem, 3.5rem, 2rem, bold)
  margin-top: 7rem
  align-self: flex-end
</style>