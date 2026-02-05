const URLParametros = new URLSearchParams(window.location.search);
const usuario_id = URLParametros.get("id");
let url;
async function cargarCanciones() {
    const contenedorCanciones = document.getElementById("contenedor-canciones");
    if (usuario_id) {
        url = `http://localhost:3000/usuarios/${usuario_id}/canciones`;
    }
    else {
        url = `http://localhost:3000/canciones`;
    }
    try {
        
        const res = await fetch(url);

        if(!res.ok) {
            alert("Hubo un problema cargando las canciones.");
            return;
        }

        const canciones = await res.json();

        contenedorCanciones.innerHTML = "";

        if (usuario_id) {
            document.getElementById("titulo-canciones").textContent = "Canciones de " + canciones[0].nombre_usuario;
        }
        else {
            document.getElementById("titulo-canciones").textContent = "Canciones"
        }

        canciones.forEach(cancion => {
            const elemento = document.createElement("div");
            elemento.classList.add("cancion-elemento");
            
            elemento.innerHTML = `
                <img src="${cancion.link_portada || 'https://i.pinimg.com/736x/b1/56/d8/b156d88727d0be3f16e79af15f66a122.jpg'}" class="cancion-portada">
                <div class="detalles-cancion">
                    <h3 class="cancion-titulo">${cancion.nombre}</h3>
                    <div class="cancion-artista-genero">
                        <p class="datos">${cancion.artista} - ${cancion.genero}</p>
                    </div>
                </div>
            `;
            elemento.addEventListener("click", () =>
                window.location.href = `musica.html?id=${cancion.id}`
            )
            contenedorCanciones.appendChild(elemento);
        });
    } 
    catch {
        alert("No se pudo conectar con el servidor.");
        window.location.href = "index.html";
    }
}

cargarCanciones();
const botonSubirMusica = document.getElementById("subir-musica");
botonSubirMusica.addEventListener("click", () => {
    window.location.href = "new-music.html";
})