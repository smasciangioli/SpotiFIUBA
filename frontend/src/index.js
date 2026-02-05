let usuario = null
async function validarLogin() {
    usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        actualizarPagina(null);
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/usuarios/${usuario.id}`)

        if(!res.ok){
            localStorage.clear();
            actualizarPagina(null);
            return;
        }

        actualizarPagina(usuario);

    } catch (fallo){
        console.error(fallo);
        localStorage.clear();
        actualizarPagina(null);
    }
}

function actualizarPagina(usuario){
    const barra = document.getElementById("barra-login");
    const botonLogin = document.getElementById("boton-login");
    const botonPlaylist = document.getElementById("boton-playlist");
    const botonPerfil = document.getElementById("boton-perfil");
    const botonIniciarSesion = document.getElementById("boton-iniciar-sesion");
    const botonCrearUsuario = document.getElementById("boton-crear-usuario");
    const botonListaPlaylists = document.getElementById("boton-lista-playlists");
    const botonCanciones = document.getElementById("boton-lista-canciones");
    const botonMusica = document.getElementById("boton-musica");

    if (usuario) {
        botonLogin.style.display = "none";
        botonPlaylist.style.display = "block";
        botonPerfil.style.display = "block";
        botonIniciarSesion.style.display = "none";
        botonCrearUsuario.style.display = "none";
        botonListaPlaylists.style.display = "block";
        botonCanciones.style.display = "block";
        botonMusica.style.display = "block";
        
            
    } else {
        botonLogin.style.display = "block";
        botonPlaylist.style.display = "none";
        botonPerfil.style.display = "none";
        botonIniciarSesion.style.display = "block";
        botonCrearUsuario.style.display = "block";
        botonListaPlaylists.style.display = "none";
        botonCanciones.style.display = "none";
        botonMusica.style.display = "none";
    }

    botonListaPlaylists.addEventListener("click", () => {
        window.location.href = `lista-playlists.html?id_usuario=${usuario.id}`;
    })
}

validarLogin();
const botonSubirMusica = document.getElementById("subir-musica");
botonSubirMusica.addEventListener("click", () => {
    if(usuario) {
        window.location.href = "new-music.html";
    } else {
        alert("Tenes que crear una cuenta o iniciar sesion.");
    }
    
})
