<template>
  <div class="q-pa-md register-container">
    <div>
      <img :src="logo" alt="Logo" class="logo-image q-mb-md" />
      <div class="color-line"></div>
      <div class="text-h6">Regístrate</div>
      <q-form @submit.prevent="submitRegister" ref="formAdd">
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
          <label class="text-subtitle1" for="phone">Teléfono</label>
          <q-input
            outlined
            dense
            class="q-mb-none"
            v-model="user.phone"
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
                :name="user.showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="togglePasswordVisibility('password')"
              ></q-icon>
            </template>
          </q-input>
        </div>
        <div>
          <label class="text-subtitle1" for="repassword"
            >Confirma tu contraseña</label
          >
          <q-input
            outlined
            dense
            v-model="user.repassword"
            :type="repasswordFieldType"
            placeholder="Confirma tu contraseña"
            :rules="[
              (val) => val === user.password || 'Las contraseñas no coinciden',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="user.showrepassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="togglePasswordVisibility('repassword')"
              ></q-icon>
            </template>
          </q-input>
        </div>
        <div class="button-container q-mt-md">
          <q-btn
            label="Crear cuenta"
            type="submit"
            class="full-width-button q-mb-lg"
            :style="{ backgroundColor: '#F39DAA', color: '#ffffff' }"
          />
        </div>
      </q-form>

      <div class="button-container q-mb-md">
        <q-btn type="button" class="google-button-custom full-width-button">
          <img :src="logoGoogle" alt="Logo" class="button-icon" />
          <span>Continuar con Google</span>
        </q-btn>
      </div>

      <div class="text-center">
        <span class="text-color-general">¿Ya tienes cuenta?</span>
        <q-btn flat to="/">
          <span class="text-color-highlight">Inicia Sesión</span>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user-store";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import logo from "../assets/logoAzul.svg";
import logoGoogle from "../assets/logo_google.svg";

//tienda de user
const userStore = useUserStore();
const router = useRouter();
const $q = useQuasar();

const user = ref({
  username: "",
  phone: "",
  email: "",
  password: "",
  repassword: "",
  showPassword: false,
  showrepassword: false,
});
const formAdd = ref(null);

const passwordFieldType = ref("password");
const repasswordFieldType = ref("password");

function togglePasswordVisibility(field) {
  if (field === "password") {
    user.value.showPassword = !user.value.showPassword;
    passwordFieldType.value = user.value.showPassword ? "text" : "password";
  } else if (field === "repassword") {
    user.value.showrepassword = !user.value.showrepassword;
    repasswordFieldType.value = user.value.showrepassword ? "text" : "password";
  }
}

const submitRegister = async () => {
  try {
    await userStore.register(
      user.value.username,
      user.value.phone,
      user.value.email,
      user.value.password,
      user.value.repassword
    );
    router.push("/menu"); //aqui debera ir la ruta al menu principal
    user.value = {
      username: "",
      phone: "",
      email: "",
      password: "",
      repassword: "",
      showPassword: false,
      showrepassword: false,
    };
    formAdd.value.resetValidation();
  } catch (error) {
    if (error.error) {
      alertFunction(error.error);
    } else {
      console.log(error);
      alertFunction(error.errors.msg);
    }
  }
};

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
