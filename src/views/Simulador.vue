<template>
    <div class="container mt-5 p-4 rounded shadow-lg bg-white">
      <h1 class="text-center mb-4 text-primary">Simulador de Cotizaciones</h1>
  
      <ServiciosList :servicios="servicios" @agregar-servicio="agregarServicio" />
  
      <SeleccionadosList 
        :seleccionados="seleccionados" 
        @actualizar-cantidad="actualizarCantidad"
        @eliminar-servicio="eliminarServicio" 
      />
  
      <ResumenCotizacion 
        :totalMayorista="totalMayorista" 
        :totalContado="totalContado" 
        :totalMinimo="totalMinimo" 
        @copiar-resumen="copiarResumen" 
        @enviar-whatsapp="enviarWhatsApp" 
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import Swal from 'sweetalert2';
  import ServiciosList from '../components/ServiciosList.vue';
  import SeleccionadosList from '../components/SeleccionadosList.vue';
  import ResumenCotizacion from '../components/ResumenCotizacion.vue';
  
  const servicios = ref([
    { ID: '1', SERVICIOS_COMPLETOS: 'Perfil Compartido - Netflix - 1 Mes', PRECIOXMAYORUNIDAD: 5000, PRECIOCONTADOUNIDAD: 5500 },
    { ID: '2', SERVICIOS_COMPLETOS: 'Cuenta Premium - Disney+ - 1 Año', PRECIOXMAYORUNIDAD: 20000, PRECIOCONTADOUNIDAD: 22000 },
    { ID: '3', SERVICIOS_COMPLETOS: 'Perfil 4K - HBO Max - 6 Meses', PRECIOXMAYORUNIDAD: 15000, PRECIOCONTADOUNIDAD: 16000 }
  ]);
  
  const seleccionados = ref([]);
  const maxServicios = 10;
  
  const agregarServicio = (servicio) => {
    const existente = seleccionados.value.find(s => s.ID === servicio.ID);
    if (existente) {
      if (existente.cantidad < 10) {
        existente.cantidad += 1;
      } else {
        Swal.fire('Límite alcanzado', 'No puedes agregar más de 10 unidades de este servicio.', 'warning');
      }
    } else {
      if (seleccionados.value.length < maxServicios) {
        seleccionados.value.push({ ...servicio, cantidad: 1 });
      } else {
        Swal.fire('Límite alcanzado', 'No puedes agregar más de 10 servicios.', 'warning');
      }
    }
  };
  
  const actualizarCantidad = (id, nuevaCantidad) => {
    const servicio = seleccionados.value.find(s => s.ID === id);
    if (servicio) {
      servicio.cantidad = nuevaCantidad;
    }
  };
  
  const eliminarServicio = (id) => {
    seleccionados.value = seleccionados.value.filter(s => s.ID !== id);
  };
  
  const totalMayorista = computed(() => {
    return seleccionados.value.reduce((total, s) => total + s.PRECIOXMAYORUNIDAD * s.cantidad, 0);
  });
  
  const totalContado = computed(() => {
    return seleccionados.value.reduce((total, s) => total + s.PRECIOCONTADOUNIDAD * s.cantidad, 0);
  });
  
  const descuentoPorVolumen = computed(() => {
    const descuentos = { 2: 3000, 3: 5000, 4: 7000, 5: 9000, 6: 11000, 7: 12000 };
    return descuentos[seleccionados.value.length] || 12000;
  });
  
  const totalMinimo = computed(() => {
    return seleccionados.value.length > 0 ? totalContado.value - descuentoPorVolumen.value : 0;
  });
  
  const copiarResumen = () => {
    let resumen = 'Resumen de Cotización:\n';
    seleccionados.value.forEach(s => {
      resumen += `${s.SERVICIOS_COMPLETOS} x ${s.cantidad}\n`;
    });
    resumen += `\nTotal Mayorista: $${totalMayorista.value}`;
    resumen += `\nTotal Contado: $${totalContado.value}`;
    resumen += `\nTotal Mínimo: $${totalMinimo.value}`;
    navigator.clipboard.writeText(resumen);
    Swal.fire('Copiado', 'El resumen ha sido copiado al portapapeles.', 'success');
  };
  
  const enviarWhatsApp = () => {
    let mensaje = encodeURIComponent(`Resumen de Cotización:\n`);
    seleccionados.value.forEach(s => {
      mensaje += encodeURIComponent(`${s.SERVICIOS_COMPLETOS} x ${s.cantidad}\n`);
    });
    mensaje += encodeURIComponent(`\nTotal Mayorista: $${totalMayorista.value}`);
    mensaje += encodeURIComponent(`\nTotal Contado: $${totalContado.value}`);
    mensaje += encodeURIComponent(`\nTotal Mínimo: $${totalMinimo.value}`);
    window.open(`https://wa.me/?text=${mensaje}`, '_blank');
  };
  </script>
  
  <style>
  .container {
    max-width: 800px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
  }
  
  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #007bff;
  }
  </style>
  