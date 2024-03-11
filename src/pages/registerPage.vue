<template>
  <div class="q-pa-md register-container">
    <div>
      <img :src="logo" alt="Logo" class="logo-image q-mb-md" />
      <div class="color-line"></div>
      <div class="text-h6">Regístrate</div>
      <q-form @submit.prevent="submitForm" class="form">
        <div>
          <label class="text-subtitle1" for="nombre">Nombre</label>
          <q-input
            outlined
            dense
            v-model="user.username"
            placeholder="Ingresa tu nombre y apellido"
            :rules="[(val) => !!val || 'El nombre es obligatorio']"
          ></q-input>
        </div>
        <div>
          <label class="text-subtitle1" for="telefono">Teléfono</label>
          <q-input
            outlined
            dense
            class="q-mb-none"
            v-model="user.telefono"
            placeholder="Ingresa tu teléfono"
            type="tel"
            :rules="[
              (val) => /^\+?\d{8,8}$/.test(val) || 'Ingresa un número válido',
            ]"
          ></q-input>
        </div>
        <div>
          <label class="text-subtitle1" for="email">Correo electrónico</label>
          <q-input
            outlined
            dense
            v-model="user.email"
            placeholder="Ingresa tu correo electrónico"
            :rules="[
              (val) => /.+@.+\..+/.test(val) || 'Correo electrónico inválido',
            ]"
          ></q-input>
        </div>
        <div>
          <label class="text-subtitle1" for="password">Contraseña</label>
          <q-input
            outlined
            dense
            v-model="user.password"
            :type="passwordFieldType"
            placeholder="Ingresa tu contraseña"
            :rules="[(val) => val.length >= 8 || 'Mínimo 8 caracteres']"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="togglePasswordVisibility('password')"
              ></q-icon>
            </template>
          </q-input>
        </div>
        <div>
          <label class="text-subtitle1" for="confirmPassword"
            >Confirma tu contraseña</label
          >
          <q-input
            outlined
            dense
            v-model="user.confirmPassword"
            :type="confirmPasswordFieldType"
            placeholder="Confirma tu contraseña"
            :rules="[
              (val) => val === user.password || 'Las contraseñas no coinciden',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="showConfirmPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="togglePasswordVisibility('confirmPassword')"
              ></q-icon>
            </template>
          </q-input>
        </div>
      </q-form>
      <div class="button-container q-mt-md">
        <q-btn
          label="Crear cuenta"
          type="submit"
          class="full-width-button q-mb-lg"
          :style="{ backgroundColor: '#F39DAA', color: '#ffffff' }"
        />
      </div>
      <div class="button-container q-mb-md">
        <q-btn type="button" class="google-button-custom full-width-button">
          <img :src="logoGoogle" alt="Logo" class="button-icon" />
          <span>Continuar con Google</span>
        </q-btn>
      </div>

      <div class="text-center">
        <span class="text-color-general">¿Ya tienes cuenta?</span>
        <q-btn flat @click="gotoLogin">
          <span class="text-color-highlight">Inicia Sesión</span>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import logo from "../assets/logoAzul.svg";
import logoGoogle from "../assets/logo_google.svg";

const user = ref({
  username: "",
  telefono: "",
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  showConfirmPassword: false,
});

const passwordFieldType = ref("password");
const confirmPasswordFieldType = ref("password");

function togglePasswordVisibility(field) {
  if (field === "password") {
    user.value.showPassword = !user.value.showPassword;
    passwordFieldType.value = user.value.showPassword ? "text" : "password";
  } else if (field === "confirmPassword") {
    user.value.showConfirmPassword = !user.value.showConfirmPassword;
    confirmPasswordFieldType.value = user.value.showConfirmPassword
      ? "text"
      : "password";
  }
}

function submitForm() {
  console.log("Data enviada", user.value);
}

function gotoLogin() {
  console.log("Ir a login");
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Glacial+Indifference&display=swap");

label {
  display: block;
  margin-bottom: 8px;
  color: #635c5c;
  font-weight: 500;
}

.logo-image {
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.color-line {
  margin-bottom: 20px;
  height: 2px;
  background-color: #e3d2c6;
  width: 100%;
}

.register-container {
  margin: 10px 20px 10px 20px;
  font-family: "Glacial Indifference", sans-serif;
}

.button-container {
  display: flex;
  justify-content: center;
}

.full-width-button {
  width: 100%;
}

.google-button-custom {
  border: 2px solid #f39daa;
  color: #f39daa;
}

.text-color-highlight {
  color: #5fbfb8;
}

.text-h6 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 24px;
  font-weight: 500;
  color: #635c5c;
}

.button-icon {
  width: 24px;
  height: auto;
  vertical-align: middle;
}
</style>
