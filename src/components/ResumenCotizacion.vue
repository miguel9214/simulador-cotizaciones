<template>
    <div class="resumen-card shadow-lg p-4 rounded">
      <h2 class="text-center text-primary">Resumen</h2>
      <hr />
      <p class="fw-bold">💰 Total Mayorista: <span class="text-success">${{ totalMayorista }}</span></p>
      <p class="fw-bold">💳 Total Contado: <span class="text-warning">${{ totalContado }}</span></p>
      <p class="fw-bold">🔖 Total Mínimo: <span class="text-danger">${{ totalMinimo }}</span></p>
      
      <div class="d-flex justify-content-between mt-3">
        <button class="btn btn-outline-primary w-45" @click="$emit('copiar-resumen')">
          📋 Copiar
        </button>
        <button class="btn btn-success w-45" @click="$emit('enviar-whatsapp')">
          📲 WhatsApp
        </button>
      </div>
  
      <!-- Botón para limpiar cotización -->
      <button class="btn btn-danger w-100 mt-3" @click="$emit('limpiar-cotizacion')">
        🔄 Nueva Cotización
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps(['totalMayorista', 'totalContado', 'totalMinimo']);
  defineEmits(['copiar-resumen', 'enviar-whatsapp', 'limpiar-cotizacion']);
  </script>
  
  <style scoped>
  .resumen-card {
    background: white;
    border-radius: 12px;
    max-width: 400px;
    margin: auto;
    transition: transform 0.2s ease-in-out;
  }
  
  .resumen-card:hover {
    transform: scale(1.02);
  }
  
  .w-45 {
    width: 48%;
  }
  </style>
  