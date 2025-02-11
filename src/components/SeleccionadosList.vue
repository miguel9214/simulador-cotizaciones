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
          <div class="text-start">
            <span class="fw-bold">{{ servicio.SERVICIOS_COMPLETOS }}</span>
            <div class="text-muted">
              💰 Precio Unitario: <strong>${{ servicio.PRECIOCONTADOUNIDAD }}</strong>
            </div>
          </div>
  
          <div class="d-flex align-items-center">
            <input 
              type="number" 
              class="form-control form-control-sm me-2" 
              :value="servicio.cantidad"
              min="1"
              max="10"
              style="width: 60px;"
              @input="actualizarCantidad(servicio.ID, $event.target.value)"
            />
            <button class="btn btn-danger btn-sm rounded-circle" @click="$emit('eliminar-servicio', servicio.ID)">❌</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps(['seleccionados']);
  const emit = defineEmits(['actualizar-cantidad', 'eliminar-servicio']);
  
  const actualizarCantidad = (id, nuevaCantidad) => {
    const cantidad = Math.min(10, Math.max(1, parseInt(nuevaCantidad) || 1)); // Limita entre 1 y 10
    emit('actualizar-cantidad', id, cantidad);
  };
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
  
  .text-muted {
    font-size: 0.9em;
  }
  </style>
  