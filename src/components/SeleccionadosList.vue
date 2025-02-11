<template>
    <div class="servicios-card shadow-lg p-4 rounded mb-4">
      <h2 class="text-center text-primary">🛒 Servicios Seleccionados</h2>
      <hr />
      <ul class="list-group">
        <li 
          v-for="servicio in seleccionados" 
          :key="servicio.ID" 
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span class="fw-bold">{{ servicio.SERVICIOS_COMPLETOS }}</span>
  
          <div class="d-flex align-items-center">
            <input 
              type="number" 
              class="form-control form-control-sm me-2" 
              :value="servicio.cantidad"
              min="1"
              max="10"
              style="width: 60px;"
              @input="$emit('actualizar-cantidad', servicio.ID, parseInt($event.target.value) || 1)"
            />
            <button class="btn btn-danger btn-sm rounded-circle" @click="$emit('eliminar-servicio', servicio.ID)">❌</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  defineProps(['seleccionados']);
  defineEmits(['actualizar-cantidad', 'eliminar-servicio']);
  </script>
  
  <style scoped>
  .servicios-card {
    background: white;
    border-radius: 12px;
    max-width: 500px;
    margin: auto;
  }
  
  .list-group-item {
    background: #f8f9fa;
    border: none;
    border-radius: 8px;
    margin-bottom: 8px;
    padding: 10px 15px;
  }
  
  .list-group-item:hover {
    background: #e9ecef;
  }
  </style>
  