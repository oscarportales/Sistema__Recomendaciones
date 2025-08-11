<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>🛒 Recomendaciones Bidireccionales</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background: #f8f9fa; font-family: 'Segoe UI', sans-serif; }
        .card { border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .btn-primary { background: #28a745; }
        .btn-primary:hover { background: #218838; }
        input.form-control { text-align: center; }
        .recomendacion-item {
            border-left: 4px solid #28a745;
            margin-bottom: 12px;
            padding-left: 12px;
            background: #f9f9f9;
        }
    </style>
</head>
<body>
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-9">
            <div class="card">
                <div class="card-header text-center bg-success text-white">
                    <h2>🛒 Sistema de Recomendaciones (Bidireccional)</h2>
                    <p class="mb-0">Recomendaciones para ambos usuarios</p>
                </div>

                <div class="card-body">
                    <p class="text-center text-muted">Ingresa las puntuaciones (0 a 5) para cada producto:</p>

                    <table class="table table-bordered text-center">
                        <thead class="table-dark">
                            <tr>
                                <th>Producto</th>
                                <th>Usuario 1</th>
                                <th>Usuario 2</th>
                            </tr>
                        </thead>
                        <tbody id="tablaProductos"></tbody>
                    </table>

                    <div class="text-center mt-3">
                        <button id="btnCalcular" class="btn btn-primary btn-lg px-5">
                            🔍 Calcular y Recomendar (Ambos)
                        </button>
                    </div>

                    <div id="resultado" class="mt-4"></div>
                </div>
            </div>

            <footer class="text-center mt-4 text-secondary">
                &copy; <span id="year"></span> - Sistema de recomendaciones bidireccionales con similitud de coseno
            </footer>
        </div>
    </div>
</div>

<script>
document.getElementById("year").textContent = new Date().getFullYear();

// Lista de productos
const productos = ["Camiseta", "Pantalón", "Zapatos", "Gorra", "Reloj"];

// Generar tabla
const tabla = document.getElementById("tablaProductos");
productos.forEach((producto, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td class="text-start">${producto}</td>
        <td><input type="number" class="form-control usuario1" min="0" max="5" value="0"></td>
        <td><input type="number" class="form-control usuario2" min="0" max="5" value="0"></td>
    `;
    tabla.appendChild(fila);
});

// Función similitud coseno
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
    if (usuario1.length !== 5 || usuario2.length !== 5) {
        alert("Debes ingresar todas las puntuaciones.");
        return;
    }
    if ([...usuario1, ...usuario2].some(p => p < 0 || p > 5)) {
        alert("Las puntuaciones deben estar entre 0 y 5.");
        return;
    }

    // Calcular similitud
    const sim = similitudCoseno(usuario1, usuario2);
    const porcentaje = (sim * 100).toFixed(2);

    let html = `
        <div class="alert alert-info text-center">
            Similitud entre usuarios: <strong>${porcentaje}%</strong>
        </div>
    `;

    // Recomendaciones para Usuario 1
    let rec1 = productos
        .map((producto, i) => usuario1[i] <= 2 && usuario2[i] >= 4 ? {
            producto,
            puntuacion: usuario2[i],
            motivo: `Usuario 2 lo valora en ${usuario2[i]}/5`
        } : null)
        .filter(x => x);

    html += `<div class="mt-4"><h5 class="text-primary">👤 Recomendaciones para <strong>Usuario 1</strong></h5>`;
    if (rec1.length === 0) {
        html += `<div class="alert alert-light">No se encontraron productos recomendables para Usuario 1.</div>`;
    } else {
        html += `<div class="border rounded p-3 bg-light">`;
        rec1.forEach(r => {
            html += `<div class="recomendacion-item">
                        <strong>${r.producto}</strong> 
                        <span class="badge bg-success float-end">${r.puntuacion}/5</span><br>
                        <small class="text-muted">${r.motivo}</small>
                     </div>`;
        });
        html += `</div>`;
    }
    html += `</div>`;

    // Recomendaciones para Usuario 2
    let rec2 = productos
        .map((producto, i) => usuario2[i] <= 2 && usuario1[i] >= 4 ? {
            producto,
            puntuacion: usuario1[i],
            motivo: `Usuario 1 lo valora en ${usuario1[i]}/5`
        } : null)
        .filter(x => x);

    html += `<div class="mt-4"><h5 class="text-secondary">👤 Recomendaciones para <strong>Usuario 2</strong></h5>`;
    if (rec2.length === 0) {
        html += `<div class="alert alert-light">No se encontraron productos recomendables para Usuario 2.</div>`;
    } else {
        html += `<div class="border rounded p-3 bg-light">`;
        rec2.forEach(r => {
            html += `<div class="recomendacion-item">
                        <strong>${r.producto}</strong> 
                        <span class="badge bg-secondary float-end">${r.puntuacion}/5</span><br>
                        <small class="text-muted">${r.motivo}</small>
                     </div>`;
        });
        html += `</div>`;
    }
    html += `</div>`;

    document.getElementById("resultado").innerHTML = html;
});
</script>
</body>
</html>
