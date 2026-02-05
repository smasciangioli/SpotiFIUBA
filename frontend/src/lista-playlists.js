const URLParametros = new URLSearchParams(window.location.search);
const usuario_id = URLParametros.get("id_usuario");
async function cargarPlaylists() {
    const contenedorPlaylists = document.getElementById("contenedor-playlists");
    try {
        
        const res = await fetch(`http://localhost:3000/usuarios/${usuario_id}/playlists`);

        if(!res.ok) {
            alert("Hubo un problema cargando las playlists.");
            return;
        }

        const playlists = await res.json();
        contenedorPlaylists.innerHTML = "";
        document.getElementById("titulo-playlists").textContent = "Playlists de " + playlists[0].nombre_usuario ;


        playlists.forEach(playlist => {
            const elemento = document.createElement("div");
            elemento.classList.add("cancion-elemento");
            
            elemento.innerHTML = `
                <img src="${playlist.link_portada || 'https://i.pinimg.com/736x/b1/56/d8/b156d88727d0be3f16e79af15f66a122.jpg'}" class="cancion-portada">
                <div class="detalles-cancion">
                    <h3 class="cancion-titulo">${playlist.nombre}</h3>
                    </div>
                </div>
            `;
            elemento.addEventListener("click", () =>
                window.location.href = `playlist.html?id=${playlist.id}&nombrePlaylist=${playlist.nombre}`
            )
            contenedorPlaylists.appendChild(elemento);
        });
    } 
    catch {
        alert("No tenes playlists creadas, o hubo un problema.");
        return;
    }
}

cargarPlaylists();
const botonSubirMusica = document.getElementById("subir-musica");
botonSubirMusica.addEventListener("click", () => {
    window.location.href = "new-playlist.html";
})