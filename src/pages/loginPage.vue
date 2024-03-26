<template>
  <div class="glacial-font">
    <div>
      <img src="../assets/logoRosa.svg" class="logoRosa q-mb-md q-mt-lg" />
    </div>
    <div class="line"></div>
    <h4 class="title-login">Inicia sesión</h4>
    <q-form @submit.prevent="submitLogin" ref="formAdd">
      <div class="input-datos">
        <p class="q-mb-xs">Correo electrónico</p>
        <q-input
          outlined
          class="input-login"
          v-model="email"
          bg-color="white"
          style="font-size: 1.1rem; border: #635c5c"
          dense
          placeholder="Ingresa tu correo electrónico"
          :rules="[
            (val) => !!val || 'Este campo es requerido',
            (val) =>
              /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val) ||
              'Formato incorrecto de email',
          ]"
        ></q-input>
      </div>
      <div class="input-datos">
        <p class="q-mb-xs">Contraseña</p>
        <q-input
          outlined
          class="input-login"
          v-model="password"
          bg-color="white"
          style="font-size: 1.1rem; border: #635c5c"
          dense
          placeholder="Ingresa tu contraseña"
          :rules="[
            (val) => {
              if (val && val.length <= 5) {
                return 'La contraseña debe tener mínimo 6 caracteres';
              }
              return true;
            },
          ]"
          hide-bottom-space
          :type="showPassword ? 'text' : 'password'"
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'remove_red_eye' : 'visibility_off'"
              class="cursor-pointer"
              style="color: #635c5c"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
      </div>

      <div class="check-rec">
        <div class="q-gutter-sm">
          <q-checkbox v-model="right" label="Recordarme" color="cyan" />
        </div>
      </div>
      <q-btn
        type="submit"
        class="btn-entrar"
        label="Entrar"
        text-color="white"
      />
    </q-form>
    <div class="forgotPwd">
      <a
        class="text-center text-secondary"
        style="text-decoration: none"
        href=""
      >
        <b>¿Olvidaste tu contraseña?</b></a
      >
    </div>
    <q-btn class="btn-google">
      <img
        src="../assets/logogoogle.svg"
        width="25"
        height="30"
        class="iconGoogleBtn"
      />
      <label for="">Iniciar con Google</label></q-btn
    >
    <div style="text-align: center" class="q-pb-xl">
      <b class="subtitulo">¿Aún no tienes cuenta? </b>
      <a class="subtitulo1" href="/register"> <b>Regístrate</b></a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user-store";
import { useQuasar } from "quasar";

//tienda, router y notificaciones
const userStore = useUserStore();
const router = useRouter();
const $q = useQuasar();

//variables a usar
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const right = ref(false);

const submitLogin = async () => {
  try {
    await userStore.access(email.value, password.value);
    router.push("/menu");
    email.value = "";
    password.value = "";
    formAdd.value.resetValidation();
  } catch (error) {
    if (error.error) {
      alertFunction(error.error);
    } else {
      alertFunction(error.errors[0].msg);
    }
  }
};

const logout = async () => {
  await userStore.logout();
};
logout();

const alertFunction = (msg) => {
  $q.dialog({
    title: "Error",
    message: msg,
    dark: true,
    ok: {
      push: true,
      color: "secondary",
    },
  });
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Glacial+Indifference&display=swap");

.glacial-font {
  font-family: "Glacial Indifference", sans-serif;
}

.input-datos {
  width: 90%;
  margin-bottom: 5px;
  padding-left: 35px;
  color: #635c5c;
  font-size: 1.2rem;
}

.input-login {
  width: 102%;
  margin-top: 10px;
  margin-bottom: 11px;
}

.title-login {
  font-size: 1.8rem;
  margin-bottom: 35px;
  color: #635c5c;
  text-align: center;
}

.forgotPwd {
  font-size: 1.1rem;
  margin-bottom: 55px;
  margin-top: -5px;
  color: #5fbfb8;
  text-align: center;
}

.btn-entrar {
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: none;
  color: white;
  width: 83%;
  margin-left: 36px;
  background-color: #5fbfb8 !important;
  margin-bottom: 20px;
}

.btn-google {
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: none;
  color: #5fbfb8;
  width: 83%;
  margin-left: 36px;
  background-color: white !important;
  border: solid 1.2px #5fbfb8 !important;
  margin-top: -25px;
  margin-bottom: 30px;
}

.iconGoogleBtn {
  margin-right: 12px;
}

.logoRosa {
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.subtitulo {
  color: #797676;
  font-size: 1.2rem;
  font-weight: normal;
  text-align: center;
}
.subtitulo1 {
  color: #f39daa;
  font-size: 1.2rem;
  margin-bottom: 30px;
  font-weight: bold;
  text-decoration: none;
}

.check-rec {
  margin-left: 27px;
  margin-bottom: 20px;
  font-size: 1rem;
  color: #797676;
}

.line {
  width: 70%;
  border-bottom: 2px solid #e3d2c6;
  margin: 20px auto;
}
</style>
