<script setup>
import { ref, computed, onMounted } from 'vue';
import Swal from 'sweetalert2';
import ServiciosList from '../components/ServiciosList.vue';
import SeleccionadosList from '../components/SeleccionadosList.vue';
import ResumenCotizacion from '../components/ResumenCotizacion.vue';
import { useGoogleSheets } from '../composables/useGoogleSheets';


const googleSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpxJi1a_-cNDW2IHcnruCrfeFronTvfR84FQ6nAfkaElNOHmzWPAIu0_NFgy-5ILY3TbH6lT0BnPYL/pub?output=csv";
const { servicios, cargarServicios } = useGoogleSheets(googleSheetURL);

const seleccionados = ref([]);
const maxServicios = 10;

const agregarServicio = (servicio) => {
    if (seleccionados.value.length >= maxServicios) {
        Swal.fire('Límite alcanzado', 'No puedes agregar más de 10 servicios en total.', 'warning');
        return;
    }

    const existente = seleccionados.value.find(s => s.ID === servicio.ID);

    if (existente) {
        if (existente.cantidad < 10) {
            existente.cantidad += 1;
            seleccionados.value = [...seleccionados.value]; // 🔄 Forzar reactividad en Vue
        } else {
            Swal.fire('Límite alcanzado', 'No puedes agregar más de 10 unidades de este servicio.', 'warning');
        }
    } else {
        seleccionados.value.push({ ...servicio, cantidad: 1 });
    }
};

const actualizarCantidad = (id, nuevaCantidad) => {
    const servicio = seleccionados.value.find(s => s.ID === id);
    if (servicio) {
        if (nuevaCantidad > 10) {
            Swal.fire('Límite alcanzado', 'No puedes agregar más de 10 unidades de este servicio.', 'warning');
            servicio.cantidad = 10;
        } else {
            servicio.cantidad = nuevaCantidad;
        }
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

onMounted(cargarServicios);
</script>

<template>
    <div class="container mt-5 p-4 rounded shadow-lg bg-white">
        <h1 class="text-center mb-4 text-primary">Simulador de Cotizaciones</h1>

        <ServiciosList :servicios="servicios" @agregar-servicio="agregarServicio" />

        <SeleccionadosList :seleccionados="seleccionados" @actualizar-cantidad="actualizarCantidad"
            @eliminar-servicio="eliminarServicio" />

        <ResumenCotizacion :totalMayorista="totalMayorista" :totalContado="totalContado" :totalMinimo="totalMinimo"
            @copiar-resumen="copiarResumen" @enviar-whatsapp="enviarWhatsApp" @limpiar-cotizacion="seleccionados = []" />
    </div>
</template>
