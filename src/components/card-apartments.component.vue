<template>
  <q-card class="my-card">
    <q-img :src="apartmentImage" class="card-image">
      <div class="rent-ribbon">RENTAR</div>
      <q-icon
        :name="isHeartActive ? 'favorite' : 'favorite_border'"
        class="absolute-top-right cursor-pointer heart-icon"
        :class="{ 'heart-active': isHeartActive }"
        @click="toggleHeart"
      />
    </q-img>
    <q-card-section class="text-section">
      <div class="header-section">
        <div class="text-h6">{{ title }}</div>
        <div class="price-section">
          <div class="text-caption text-primary">L {{ price }}</div>
          <div class="price-per-month">/mes</div>
        </div>
      </div>
      <div class="location-section">
        <q-icon name="place" class="location-icon" />
        <div class="text-subtitle2">{{ location }}</div>
      </div>
      <div class="details">
        <div class="detail-item">
          <q-icon name="bed" class="detail-icon" />
          <span class="detail-text">{{ bedrooms }} habitaciones</span>
        </div>
        <div class="detail-item">
          <q-icon name="bathtub" class="detail-icon" />
          <span class="detail-text">{{ bathrooms }} baños</span>
        </div>
        <div v-if="privateResidence" class="detail-item">
          <q-icon name="location_city" class="detail-icon" />
          <span class="detail-text">Residencial privada</span>
        </div>
        <div v-if="privateParking" class="detail-item">
          <q-icon name="directions_car" class="detail-icon" />
          <span class="detail-text">Parqueo privado</span>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  apartmentImage: String,
  title: String,
  location: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  privateResidence: Boolean,
  privateParking: Boolean,
});

const isHeartActive = ref(false);
function toggleHeart() {
  isHeartActive.value = !isHeartActive.value;
  console.log(props.location);
}
</script>

<style scoped>
.heart-icon {
  pointer-events: auto;
  font-size: 24px;
  color: #635c5c;
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
}

.heart-active {
  color: #f39daa;
}

.my-card {
  max-width: 350px;
  margin: auto;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  height: auto;
}

.menu-apartment-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.rent-ribbon {
  height: 20px;
  font-size: 6px;
  position: absolute;
  top: 50px;
  left: 0px;
  background-color: #f39daa;
  color: #ffffff;
  padding: 2px 30px;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
  font-size: 14px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.rent-ribbon::before {
  position: relative;
  left: 5px;
  white-space: nowrap;
  font-weight: bold;
}

.text-section {
  padding: 16px;
  background: white;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.price-section {
  display: flex;
  align-items: baseline;
}

.price-per-month {
  font-size: 0.8em;
}

.text-caption {
  font-size: 16px;
  color: #3f51b5;
  font-weight: bold;
  margin-right: 4px;
}

.details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 16px;
}

.detail-item {
  display: flex;
  align-items: center;
  color: #635c5c;
}

.detail-icon {
  font-size: 1.2em;
  color: #9e9e9e;
}

.detail-text {
  margin-left: 8px;
  color: #666;
}

.text-h6 {
  font-size: 16px;
  font-weight: bold;
  color: #f39daa;
  margin-bottom: 4px;
}

.text-subtitle2 {
  color: #555;
  margin-bottom: 8px;
}

.text-primary {
  color: #3f51b5;
}

.absolute-top-right {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
}

.cursor-pointer {
  cursor: pointer;
}

.q-ml-md {
  margin-left: 16px;
}

.q-my-md {
  margin-top: 16px;
  margin-bottom: 16px;
}

.location-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.location-icon {
  transform: translateY(-3px);
  font-size: 24px;
  color: #635c5c;
}
</style>
