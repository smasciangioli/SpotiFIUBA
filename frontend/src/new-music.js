const usuario = JSON.parse(localStorage.getItem("usuario"));
const form = document.getElementById("form-musica");
async function validarLogin(usuario) {
    
    if (!usuario) {
        window.location.href = "index.html";
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/usuarios/${usuario.id}`)

        if(!res.ok){
            localStorage.clear();
            window.location.href = "index.html";
            return;
        }

    } catch {
        localStorage.clear();
        window.location.href = "index.html";
    }
}

validarLogin(usuario);

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    let link_portada = document.getElementById("link_portada").value.trim();
    if(link_portada === "") {
        link_portada = null;
    }
    const artista = document.getElementById("artista").value.trim();
    const genero = document.getElementById("genero").value;
    const usuario_id = usuario.id;
    const link_audio = document.getElementById("link_audio").value.trim();

    if (!nombre || !artista || !genero || !link_audio) {
        alert("Completa todos los campos obligatorios");
        return;
    }

    try {
        const respuesta = await fetch("http://localhost:3000/canciones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, genero, artista, usuario_id, link_portada, link_audio})
        });

        if(!respuesta.ok) {
            alert("Error al subir la música.");
            return;
        }
        window.location.href = "lista-canciones.html"

    } catch {
        alert("Error en la petición.")
    }
})