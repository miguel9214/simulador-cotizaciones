// src/composables/useGoogleSheets.js
import { ref } from 'vue';

export function useGoogleSheets(url) {
  const servicios = ref([]);

  const cargarServicios = async () => {
    try {
      const respuesta = await fetch(url);
      const texto = await respuesta.text();
      const filas = texto.split("\n").slice(1); // Ignora la primera fila (encabezados)

      servicios.value = filas.map(fila => {
        const [id, cantidad, descripcionservicio, precioxmayorunidad, preciocontadounidad, precioxmayorcombo, preciominimocombo, categoria] = fila.split(",");

        return {
          ID: id.trim(),
          CANTIDAD: parseInt(cantidad.trim(), 10) || 1,
          SERVICIOS_COMPLETOS: descripcionservicio.trim(),
          PRECIOXMAYORUNIDAD: parseFloat(precioxmayorunidad.trim()) || 0,
          PRECIOCONTADOUNIDAD: parseFloat(preciocontadounidad.trim()) || 0,
          PRECIOXMAYORCOMBO: parseFloat(precioxmayorcombo.trim()) || 0,
          PRECIOMINIMOCOMBO: parseFloat(preciominimocombo.trim()) || 0,
          CATEGORIA: categoria.trim()
        };
      });
    } catch (error) {
      console.error("Error al cargar los datos de Google Sheets:", error);
    }
  };

  return { servicios, cargarServicios };
}
