// Año actual
document.getElementById("year").textContent = new Date().getFullYear();

// 10 apps móviles populares
const productos = [
    "WhatsApp",
    "Instagram",
    "TikTok",
    "Telegram",
    "Spotify",
    "Uber",
    "Google Maps",
    "Discord",
    "X (Twitter)",
    "YouTube"
];

// Generar tabla
const tabla = document.getElementById("tablaProductos");
productos.forEach((app, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td class="fw-bold text-start">${app}</td>
        <td class="text-center"><input type="number" class="form-control usuario1" min="0" max="5" value="0"></td>
        <td class="text-center"><input type="number" class="form-control usuario2" min="0" max="5" value="0"></td>
    `;
    tabla.appendChild(fila);
});

// Similitud de coseno
function similitudCoseno(vec1, vec2) {
    let productoEscalar = 0, magnitud1 = 0, magnitud2 = 0;
    for (let i = 0; i < vec1.length; i++) {
        productoEscalar += vec1[i] * vec2[i];
        magnitud1 += vec1[i] ** 2;
        magnitud2 += vec2[i] ** 2;
    }
    magnitud1 = Math.sqrt(magnitud1);
    magnitud2 = Math.sqrt(magnitud2);
    return (magnitud1 === 0 || magnitud2 === 0) ? 0 : productoEscalar / (magnitud1 * magnitud2);
}

// Botón calcular
document.getElementById("btnCalcular").addEventListener("click", () => {
    const usuario1 = Array.from(document.querySelectorAll(".usuario1")).map(i => parseInt(i.value) || 0);
    const usuario2 = Array.from(document.querySelectorAll(".usuario2")).map(i => parseInt(i.value) || 0);

    // Validación
    if ([...usuario1, ...usuario2].some(p => p < 0 || p > 5)) {
        alert("❌ Las puntuaciones deben estar entre 0 y 5.");
        return;
    }

    // Calcular similitud
    const sim = similitudCoseno(usuario1, usuario2);
    const porcentaje = (sim * 100).toFixed(2);

    let html = `
        <div class="alert alert-info text-center fade-in" style="font-size: 1.1rem;">
            <i class="fas fa-sync-alt fa-spin me-2"></i>
            <strong>Similitud de intereses:</strong> ${porcentaje}%
        </div>
    `;

    // Recomendaciones para Usuario 1
    const rec1 = productos
        .map((app, i) => (usuario1[i] <= 2 && usuario2[i] >= 4) ? {
            app, puntuacion: usuario2[i],
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

    // Recomendaciones para Usuario 2
    const rec2 = productos
        .map((app, i) => (usuario2[i] <= 2 && usuario1[i] >= 4) ? {
            app, puntuacion: usuario1[i],
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

    document.getElementById("resultado").innerHTML = html;
});
