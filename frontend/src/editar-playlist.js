const URLParametros = new URLSearchParams(window.location.search);
const playlist_id = URLParametros.get("id");
const playlist_nombre = URLParametros.get("nombrePlaylist");
const form = document.getElementById("form-editar");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById("nombre");
    const link_portada = document.getElementById("link_portada");
    const body = {}

    if(nombre.value.trim() !== ""){
        body.nombre = nombre.value.trim();
    }
    if(link_portada.value.trim() !== ""){
        body.link_portada = link_portada.value.trim();
    }

    editarPlaylist(body);
})
let playlist = "";
async function editarPlaylist(body, nuevoNombre) {
    try {
        const res = await fetch(`http://localhost:3000/playlists/${playlist_id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" }, 
                    body: JSON.stringify(body)
                });

        if(!res.ok){
            alert("Ocurrió un error editando la playlist.");
            window.location.href = `playlist.html?id=${playlist_id}&nombrePlaylist=${playlist_nombre}`;
            return;
        }

        alert("La playlist se editó correctamente.");
        window.location.href = `playlist.html?id=${playlist_id}&nombrePlaylist=${body.nombre || playlist_nombre}`;
    }
    catch {
        alert("Ocurrió un error editando la playlist.");
        window.location.href = `playlist.html?id=${playlist_id}&nombrePlaylist=${playlist_nombre}`;
        return;
    }
}