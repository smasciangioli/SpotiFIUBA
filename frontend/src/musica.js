const URLParametros = new URLSearchParams(window.location.search);
const cancion_id = URLParametros.get("id");
const usuarioLoggeado = JSON.parse(localStorage.getItem("usuario"));
const selectPlaylists = document.getElementById("selector-playlists");

if(!cancion_id) {
    alert("Esa cancion no es valida.");
    window.location.href = "lista-canciones.html";
}

async function cargarPlaylistsUsuario() {
    
    try {
        const respuesta = await fetch(`http://localhost:3000/usuarios/${usuarioLoggeado.id}/playlists`);
        
        if(!respuesta.ok) {
            alert("No se pudo cargar las playlists.");
            return;
        }

        const playlists = await respuesta.json();

        playlists.forEach(playlist => {
            const opcion = document.createElement("option");
            opcion.value = playlist.id;
            opcion.textContent = playlist.nombre;
            selectPlaylists.appendChild(opcion);
        });
    }
    catch {
        alert("No se pudo cargar las playlists.");
        return;
    }
}   

async function cargarMusica() {
    try {
        const res = await fetch(`http://localhost:3000/canciones/${cancion_id}`);

        if(!res.ok) {
            alert("Esa cancion no existe.");
            window.location.href = "lista-canciones.html";
            return;
        }

        const cancion = await res.json();  
        const portadaMusica = document.getElementById("portada-musica");
        const tituloMusica = document.getElementById("titulo-musica");
        const autorMusica = document.getElementById("autor-musica");
        const usuarioMusica = document.getElementById("usuario-musica");
        const generoMusica = document.getElementById("genero-musica");
        const reproductor = document.getElementById("reproductor");

        portadaMusica.src = cancion.link_portada || 'https://i.pinimg.com/736x/b1/56/d8/b156d88727d0be3f16e79af15f66a122.jpg';
        tituloMusica.textContent = cancion.nombre;
        autorMusica.textContent = "De: " + cancion.artista;
        usuarioMusica.textContent = "Subida Por: " + cancion.nombre_usuario;
        generoMusica.textContent = "Genero: " + cancion.genero;
        reproductor.src = cancion.link_audio;

        if(usuarioLoggeado.id === cancion.usuario_id) {
            document.getElementById("botones-musica").style.display = "flex";

            document.getElementById("boton-editar").addEventListener("click", () => {
                window.location.href = `editar-musica.html?id=${cancion.id}`;
            })
            document.getElementById("boton-borrar").addEventListener("click", async () => {
                if(confirm("Seguro que queres borrar la cancion?")) {
                    const resBorrar = await fetch(`http://localhost:3000/canciones/${cancion_id}`, {method: "DELETE"});

                    if(resBorrar.ok){
                        alert("Cancion fue borrada.");
                        window.location.href = "lista-canciones.html";
                    } 
                    else {
                        alert("No se pudo borrar la cancion.");
                    }
                    
                }
            })
        }
        document.getElementById("botones-playlists").style.display = "flex";
        cargarPlaylistsUsuario();
    
    } 
    catch {
        alert("Esa cancion no es valida.");
        window.location.href = "lista-canciones.html";
        return;
}
}

cargarMusica();

const botonPlaylists = document.getElementById("boton-playlists");    
botonPlaylists.addEventListener("click", async function(e) {
    const playlist_id = selectPlaylists.value;

    if (!playlist_id) {
        alert("Selecciona una playlist.")
        return;
    }

    try {
        const respuesta = await fetch(`http://localhost:3000/playlists/${playlist_id}/cancion/${cancion_id}`, {method: "POST"});

        if(!respuesta.ok) {
            alert("La cancion ya se encuentra en la playlist u ocurrio un error.");
            return;
        }
        alert("La playlist se agrego correctamente.");
    }
    catch {
        alert("Ocurrio un error.");
        return;
    }
})  