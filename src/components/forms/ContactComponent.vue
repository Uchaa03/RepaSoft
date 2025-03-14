<template>
  <h1 class="form__title">Contacto</h1>
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
      />
      <span v-if="emailError" class="field__error">{{ emailError }}</span>
    </fieldset>
    <fieldset class="form__field">
      <label class="field__label">Mensaje</label>
      <textarea
          class="field__textarea"
          id="message"
          v-model="message"
          placeholder="Introduce tu Mensaje"
          @blur="validateMessage"
      ></textarea>
      <span v-if="messageError" class="field__error">{{ messageError }}</span>
    </fieldset>
    <button class="form__submit" type="submit" :disabled="!isFormValid">Enviar Mensaje</button>
  </form>
</template>

<script>
import { validateEmail, validateMessage } from "@/helpers/validations.js";
import { sendMessage } from "@/helpers/apiCalls.js";

export default {
  name: "ContactComponent",
  data() {
    return {
      email: "",
      message: "",
      emailError: "",
      messageError: "",
    };
  },
  computed: {
    isFormValid() {
      return !this.emailError && !this.messageError && this.email && this.message;
    },
  },
  methods: {
    validateEmail() {
      this.emailError = validateEmail(this.email);
    },
    validateMessage() {
      this.messageError = validateMessage(this.message);
    },
    onSubmit() {
      sendMessage();
      this.email = "";
      this.message = "";
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
    margin: 0.1rem 0 2rem 0

  .field__textarea
    @include mixins.input-style
    margin: 0.1rem 0 2rem 0
    padding-top: 1rem
    resize: none /* Deshabilita el redimensionamiento del textarea */
    height: 10rem /* Define una altura inicial */

  .form__submit
    @include mixins.create-button(18rem, 3.5rem, 2rem, bold)
    margin-top: 1rem
    align-self: flex-end
</style>
