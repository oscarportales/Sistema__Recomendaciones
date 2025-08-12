// ==============================
// Año actual en el footer
// ==============================

// Busca el elemento con id="year" y coloca el año actual obtenido con la clase Date()
document.getElementById("year").textContent = new Date().getFullYear();


// ==============================
// Lista de productos (apps móviles populares)
// ==============================

// Array con 10 aplicaciones populares
const productos = [
    "WhatsApp",
    "Instagram",
    "TikTok",
    "Telegram",
    "Spotify",
    "Uber",
    "Facebook",
    "Discord",
    "X (Twitter)",
    "YouTube"
];


// ==============================
// Generar tabla dinámica de productos
// ==============================

// Obtenemos la referencia a la tabla donde se insertarán las filas
const tabla = document.getElementById("tablaProductos");

// Recorremos la lista de productos y creamos una fila para cada uno
productos.forEach((app, i) => {
    // Creamos un elemento <tr>
    const fila = document.createElement("tr");

    // Insertamos las celdas con:
    //  - Nombre de la app
    //  - Input para calificación de Usuario 1 (0 a 5)
    //  - Input para calificación de Usuario 2 (0 a 5)
    fila.innerHTML = `
        <td class="fw-bold text-start">${app}</td>
        <td class="text-center"><input type="number" class="form-control usuario1" min="0" max="5" value="0"></td>
        <td class="text-center"><input type="number" class="form-control usuario2" min="0" max="5" value="0"></td>
    `;

    // Agregamos la fila a la tabla
    tabla.appendChild(fila);
});


// ==============================
// Evitar caracteres no deseados y valores decimales
// ==============================

// Escuchamos los eventos en los inputs para prevenir puntos, letras, etc.
document.querySelectorAll(".usuario1, .usuario2").forEach(input => {
    
    // Evento 'input': se dispara al escribir, pegar o usar flechitas
    input.addEventListener("input", function () {
        const val = this.value;

        // Si el valor contiene un punto o es vacío, no permitimos decimales
        if (val.includes(".") || val.includes("-") || isNaN(val)) {
            // Si es decimal, redondeamos hacia abajo o lo corregimos
            const intVal = parseInt(val) || 0;
            this.value = Math.min(5, Math.max(0, intVal)); // Ajustar entre 0 y 5
        }
    });

    // Evento 'change': útil cuando se cambia con flechitas o pierde foco
    input.addEventListener("change", function () {
        let val = parseInt(this.value);
        if (isNaN(val) || this.value === "") {
            this.value = 0; // Valor por defecto si está vacío
        } else {
            this.value = Math.min(5, Math.max(0, val)); // Asegurar rango 0-5
        }
    });

    // Evento 'keypress': bloquear puntos, letras, etc.
    input.addEventListener("keypress", function (e) {
        // Permitir solo dígitos (48-57) y teclas de control (como borrar)
        const charCode = e.which || e.keyCode;
        if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault(); // Bloquear puntos, letras, etc.
        }
    });

    // Evitar pegado de texto no válido
    input.addEventListener("paste", function (e) {
        const pastedText = e.clipboardData.getData("text");
        if (!/^\d+$/.test(pastedText)) {
            e.preventDefault();
        }
    });
});


// ==============================
// Función para calcular similitud de coseno
// ==============================

function similitudCoseno(vec1, vec2) {

    // Variables para:
    // - productoEscalar → suma de multiplicaciones posición a posición
    // - magnitud1 → suma de cuadrados del primer vector
    // - magnitud2 → suma de cuadrados del segundo vector
    let productoEscalar = 0, magnitud1 = 0, magnitud2 = 0;

    // Recorremos cada posición del vector
    for (let i = 0; i < vec1.length; i++) {
        // Suma del producto de valores en la misma posición
        productoEscalar += vec1[i] * vec2[i];

        // Suma de cuadrados para magnitud del primer vector
        magnitud1 += vec1[i] ** 2;

        // Suma de cuadrados para magnitud del segundo vector
        magnitud2 += vec2[i] ** 2;
    }

    // Obtenemos la magnitud real aplicando raíz cuadrada
    magnitud1 = Math.sqrt(magnitud1);
    magnitud2 = Math.sqrt(magnitud2);

    // Si alguna magnitud es cero, no se puede dividir → devolver 0
    // Si no, aplicar fórmula: cos(θ) = productoEscalar / (magnitud1 * magnitud2)
    return (magnitud1 === 0 || magnitud2 === 0) ? 0 : productoEscalar / (magnitud1 * magnitud2);
}


// ==============================
// Evento para el botón "Calcular"
// ==============================

document.getElementById("btnCalcular").addEventListener("click", () => {

    // Obtener calificaciones de Usuario 1 como array numérico
    const usuario1 = Array.from(document.querySelectorAll(".usuario1")).map(input => {
        const val = input.value.trim();
        // Si está vacío, no es número o fuera de rango
        if (val === "" || isNaN(val) || !/^\d+$/.test(val)) {
            return null;
        }
        const num = parseInt(val);
        return (num >= 0 && num <= 5) ? num : null;
    });

    // Obtener calificaciones de Usuario 2 como array numérico
    const usuario2 = Array.from(document.querySelectorAll(".usuario2")).map(input => {
        const val = input.value.trim();
        if (val === "" || isNaN(val) || !/^\d+$/.test(val)) {
            return null;
        }
        const num = parseInt(val);
        return (num >= 0 && num <= 5) ? num : null;
    });

    // Validar que todas las calificaciones sean válidas
    if (usuario1.some(p => p === null) || usuario2.some(p => p === null)) {
        alert("❌ Todos los campos deben tener un número entero entre 0 y 5. No se permiten campos vacíos, decimales ni caracteres no numéricos.");
        return; // Detener ejecución si hay error
    }

    // ==============================
    // Calcular la similitud
    // ==============================

    const sim = similitudCoseno(usuario1, usuario2);
    const porcentaje = (sim * 100).toFixed(2);

    let html = `
        <div class="alert alert-info text-center fade-in" style="font-size: 1.1rem;">
            <i class="fas fa-sync-alt fa-spin me-2"></i>
            <strong>Similitud de intereses:</strong> ${porcentaje}%
        </div>
    `;


    // ==============================
    // Recomendaciones para Usuario 1
    // ==============================

    const rec1 = productos
        .map((app, i) => (usuario1[i] <= 2 && usuario2[i] >= 4) ? {
            app, 
            puntuacion: usuario2[i],
            motivo: `Usuario 2 la valora en ${usuario2[i]}/5`
        } : null)
        .filter(Boolean);

    html += `<div class="mt-4"><h5><i class="fas fa-thumbs-up text-info"></i> Recomendaciones para <strong>Usuario 1</strong></h5>`;
    if (rec1.length === 0) {
        html += `<div class="alert alert-light">No hay apps recomendables para Usuario 1.</div>`;
    } else {
        html += `<div class="border rounded p-3 bg-white shadow-sm">`;
        rec1.forEach(r => {
            html += `<div class="recomendacion-item">
                        <strong>${r.app}</strong> 
                        <span class="badge bg-info float-end">${r.puntuacion}/5</span>
                        <br>
                        <small class="text-muted"><i class="fas fa-lightbulb"></i> ${r.motivo}</small>
                     </div>`;
        });
        html += `</div>`;
    }
    html += `</div>`;


    // ==============================
    // Recomendaciones para Usuario 2
    // ==============================

    const rec2 = productos
        .map((app, i) => (usuario2[i] <= 2 && usuario1[i] >= 4) ? {
            app, 
            puntuacion: usuario1[i],
            motivo: `Usuario 1 la valora en ${usuario1[i]}/5`
        } : null)
        .filter(Boolean);

    html += `<div class="mt-4"><h5><i class="fas fa-thumbs-up text-info"></i> Recomendaciones para <strong>Usuario 2</strong></h5>`;
    if (rec2.length === 0) {
        html += `<div class="alert alert-light">No hay apps recomendables para Usuario 2.</div>`;
    } else {
        html += `<div class="border rounded p-3 bg-white shadow-sm">`;
        rec2.forEach(r => {
            html += `<div class="recomendacion-item">
                        <strong>${r.app}</strong> 
                        <span class="badge bg-info float-end">${r.puntuacion}/5</span>
                        <br>
                        <small class="text-muted"><i class="fas fa-lightbulb"></i> ${r.motivo}</small>
                     </div>`;
        });
        html += `</div>`;
    }
    html += `</div>`;

    
    // Botón para reiniciar la página
    document.getElementById("btnReiniciar").addEventListener("click", () => {
        location.reload(); // Recarga la página
    });


    // ==============================
    // Mostrar el resultado en pantalla
    // ==============================

    document.getElementById("resultado").innerHTML = html;
});
