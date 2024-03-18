<template>
  <div class="menu-apartment-page">
    <div class="header-and-cards-container">
      <div class="search-bar">
        <q-input
          outlined
          v-model="searchTerm"
          placeholder="Encuentra tu estadía ideal"
          debounce="300"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div class="header-location">
        <div class="line"></div>
        <q-icon name="place" class="location-icon" />
        <div class="line"></div>
      </div>

      <CardApartmentsComponent
        v-for="apartment in paginatedApartments"
        :key="apartment.id"
        :apartment-image="apartment.image"
        :title="apartment.title"
        :location="apartment.location"
        :price="apartment.price"
        :bedrooms="apartment.bedrooms"
        :bathrooms="apartment.bathrooms"
        :private-residence="apartment.privateResidence"
        :private-parking="apartment.privateParking"
      />
    </div>

    <div class="pagination">
      <q-btn
        icon="chevron_left"
        @click="changePage(currentPage - 1)"
        :disable="currentPage <= 1"
      />
      <q-btn
        :label="1"
        @click="changePage(1)"
        :color="currentPage === 1 ? 'primary' : 'secondary'"
      />

      <div v-if="currentPage > 3" class="ellipsis">...</div>

      <q-btn
        v-for="page in pageRange"
        :key="page"
        :label="page"
        @click="changePage(page)"
        :color="page === currentPage ? 'primary' : 'secondary'"
      />

      <div v-if="currentPage < totalPages - 2" class="ellipsis">...</div>
      <q-btn
        :label="totalPages"
        @click="changePage(totalPages)"
        :color="currentPage === totalPages ? 'primary' : 'secondary'"
      />
      <q-btn
        icon="chevron_right"
        @click="changePage(currentPage + 1)"
        :disable="currentPage >= totalPages"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import CardApartmentsComponent from "../components/card-apartments.component.vue";
import { QBtn } from "quasar";

const apartments = ref([
  {
    id: 1,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 2,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Las brisas",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 3,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 4,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 5,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 6,
    image: "../../public/images/apartment-1.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 7,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 8,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 9,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 10,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 11,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 12,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 13,
    image: "../../public/images/apartment-1.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 14,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 15,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 16,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 17,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 18,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 19,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 20,
    image: "../../public/images/apartment-1.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 21,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 22,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 23,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 24,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 25,
    image: "../../public/images/apartment-1.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 25,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 27,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 28,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 29,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 30,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 31,
    image: "../../public/images/apartment-2.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
  {
    id: 32,
    image: "../../public/images/apartment-1.jpg",
    title: "Casa Moderna de Lujo",
    location: "Colonia Lomas del Guijarro",
    price: 15000,
    bedrooms: 4,
    bathrooms: 2,
    privateResidence: true,
    privateParking: true,
  },
]);

const itemsPerPage = 5;
const totalPages = computed(() =>
  Math.ceil(filteredApartments.value.length / itemsPerPage)
);
const currentPage = ref(1);
const searchTerm = ref("");

const filteredApartments = computed(() => {
  if (searchTerm.value) {
    return apartments.value.filter((apartment) =>
      apartment.location.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }
  return apartments.value;
});

const pageRange = computed(() => {
  let start = currentPage.value - 1;
  let end = currentPage.value + 2;

  if (start < 2) {
    start = 2;
    end = 5;
  }
  if (end > totalPages.value - 1) {
    end = totalPages.value;
    start = totalPages.value - 3;
  }
  return Array.from({ length: end - start }, (_, i) => i + start).filter(
    (page) => page !== 1 && page !== totalPages.value
  );
});

const paginatedApartments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredApartments.value.slice(start, end);
});

const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage;
    scrollToTop();
  }
};

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

watch(currentPage, scrollToTop);
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Glacial+Indifference&display=swap");

.menu-apartment-page {
  font-family: "Glacial Indifference", sans-serif;
}

.header-and-cards-container {
  max-width: 350px;
  margin: auto;
}

.header-location {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.header-location .location-icon {
  color: #635c5c;
}

.location-icon {
  padding: 0 15px;
  font-size: 24px;
}

.line {
  flex-grow: 1;
  height: 2px;
  background-color: #635c5c;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-bottom: 20px;
}

.pagination .q-btn {
  min-width: 36px;
}

.ellipsis {
  padding: 0 15px;
}

.page-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.location-page-icon {
  font-size: 24px;
  margin-right: 8px;
}

.search-bar {
  max-width: 350px;
  margin: auto;
  margin-bottom: 20px;
}
</style>