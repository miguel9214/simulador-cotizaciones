<template>
    <div class="seleccionados-card shadow-lg p-4 rounded mb-4">
      <h2 class="text-center text-primary">📌 Servicios Seleccionados</h2>
      <hr />
      <ul class="list-group">
        <li v-for="(servicio, index) in seleccionados" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
          <span class="fw-bold">{{ servicio.SERVICIOS_COMPLETOS }} ({{ servicio.cantidad }})</span>
          <button class="btn btn-danger btn-sm rounded-circle" @click="$emit('eliminar-servicio', index)">❌</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  defineProps(['seleccionados']);
  defineEmits(['eliminar-servicio']);
  </script>
  
  <style scoped>
  .seleccionados-card {
    background: white;
    border-radius: 12px;
    max-width: 500px;
    margin: auto;
    transition: transform 0.2s ease-in-out;
  }
  
  .seleccionados-card:hover {
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
  
  .btn-danger {
    transition: background 0.2s ease-in-out;
  }
  
  .btn-danger:hover {
    background: #c82333;
  }
  </style>
  