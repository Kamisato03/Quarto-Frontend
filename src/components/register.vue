<template>
    <div class="q-pa-md register-container">
    <div>
      <img :src="logo" alt="Logo" class="logo-image q-mb-md">
      <div class="color-line"></div>
      <div class="text-h6 q-mb-md">Regístrate</div>
      <q-form @submit.prevent="submitForm">
        <div class="field-container">
          <label for="nombre">Nombre</label>
          <q-input outlined v-model="user.username" placeholder="Ingresa tu nombre y apellido" class="custom-input"></q-input>
        </div>
        <div class="field-container">
          <label for="telefono">Teléfono</label>
          <q-input outlined v-model="user.telefono" placeholder="Ingresa tu teléfono" type="tel" class="custom-input"></q-input>
        </div>
        <div class="field-container">
          <label for="email">Correo electrónico</label>
          <q-input outlined v-model="user.email" placeholder="Ingresa tu correo electrónico" class="custom-input"></q-input>
        </div>
        <div class="field-container">
    <label for="password">Contraseña</label>
    <q-input outlined v-model="user.password" :type="user.passwordFieldType" placeholder="Ingresa tu contraseña" class="custom-input">
      <template v-slot:append>
        <q-icon :name="user.showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer" @click="togglePassword('password')"></q-icon>
      </template>
    </q-input>
  </div>
  <div class="field-container">
    <label for="confirmPassword">Confirma tu contraseña</label>
    <q-input outlined v-model="user.confirmPassword" :type="user.confirmPasswordFieldType" placeholder="Confirma tu contraseña" class="custom-input">
      <template v-slot:append>
        <q-icon :name="user.showConfirmPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer" @click="togglePassword('confirmPassword')"></q-icon>
      </template>
    </q-input>
  </div>
      </q-form>
        <div class="button-container q-mt-md">
          <q-btn label="Crear cuenta" type="submit" class="full-width-button" :style="{ backgroundColor: '#F39DAA', color: '#ffffff' }" />
        </div>
        
        <div class="text-center q-my-md">— o —</div>
        
        <div class="button-container q-mb-md">
          <q-btn type="button" class="google-button-custom full-width-button">
              <img src="/icons/icons8-google-32.png" class="button-icon"/>
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
  
  <script>
  import { ref } from 'vue';
  import logo from '../assets/logoalquiler.svg';
  
  export default {
    name: 'RegisterComponent',
    setup() {
      const user = ref({
        username: '',
        telefono: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false
      });

      function togglePassword(field) {
      if (field === 'password') {
        user.value.showPassword = !user.value.showPassword;
        user.value.passwordFieldType = user.value.showPassword ? 'text' : 'password';
      } else if (field === 'confirmPassword') {
        user.value.showConfirmPassword = !user.value.showConfirmPassword;
        user.value.confirmPasswordFieldType = user.value.showConfirmPassword ? 'text' : 'password';
      }
    }
  
      const submitForm = () => {
        console.log('Data enviada', user.value);
      };
  
      const gotoLogin = () => {
        console.log('Ir a login');
      };
  
      return {
        user,
        submitForm,
        gotoLogin,
        logo,
        togglePassword
      };
    }
  }
  </script>
  
  <style scoped>

  .cursor-pointer {
      cursor: pointer;
    }

  .field-container {
      position: relative;
      margin-bottom: 20px;
    }
    
  label {
      display: block;
      margin-bottom: 8px;
      color: #635C5C;
    }

  .logo-image {
      width: 70%;
      height: auto; 
      display: block;
      margin-bottom: -30px;
      margin-top: -50px;
      margin-left: auto;
      margin-right: auto;
    }

  .color-line {
      margin-bottom: 20px;
      height: 2px; 
      background-color: #E3D2C6;
      width: 100%;
    }

  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .button-container {
    display: flex;
    justify-content: center;
  }

  .full-width-button {
    width: 100%;
  }

  .google-button-custom {
    border: 2px solid #F39DAA;
    color: #F39DAA;
  }

  .text-color-highlight {
    color: #5FBFB8;
  }

  .text-h6 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #635C5C
  }
  </style>
  