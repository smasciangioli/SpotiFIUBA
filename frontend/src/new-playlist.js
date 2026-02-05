const usuario = JSON.parse(localStorage.getItem("usuario"));
const form = document.getElementById("form-playlist");

form.addEventListener("submit", async (e) => {
e.preventDefault();

const nombre = document.getElementById("nombre").value.trim();
let link_portada = document.getElementById("link_portada").value.trim();
if(link_portada === "") {
    link_portada = null;
}
const creador_id = usuario.id;

if (!nombre) {
    alert("Completa todos los campos obligatorios");
    return;
}

try {
    const respuesta = await fetch("http://localhost:3000/playlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, creador_id, link_portada})
    });

    if(!respuesta.ok) {
        alert("Error al crear la playlist.");
        return;
    }
    window.location.href = `lista-playlists.html?id_usuario=${usuario.id}`

} catch {
    alert("Error en la petición.")
}
})