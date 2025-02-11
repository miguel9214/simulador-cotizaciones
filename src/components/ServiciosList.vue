<template>
  <div class="servicios-card shadow-lg p-4 rounded mb-4">
    <h2 class="text-center text-primary">📋 Lista de Servicios</h2>
    <hr />
    <ul class="list-group">
      <li 
        v-for="servicio in servicios" 
        :key="servicio.ID" 
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span class="fw-bold">{{ servicio.SERVICIOS_COMPLETOS }}</span>
        <button class="btn btn-success btn-sm rounded-circle" @click="$emit('agregar-servicio', servicio)">➕</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps(['servicios']);
defineEmits(['agregar-servicio']);
</script>

<style scoped>
.servicios-card {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  margin: auto;
  transition: transform 0.2s ease-in-out;
}

.servicios-card:hover {
  transform: scale(1.02);
}

.list-group-item {
  background: #f8f9fa;
  border: none;
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
}

.list-group-item:hover {
  background: #e9ecef;
}

.btn-success {
  transition: background 0.2s ease-in-out;
}

.btn-success:hover {
  background: #218838;
}
</style>
