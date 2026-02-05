const URLParametros = new URLSearchParams(window.location.search);
const cancion_id = URLParametros.get("id");
const form = document.getElementById("form-editar")
form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById("nombre");
    const link_portada = document.getElementById("link_portada");
    const genero = document.getElementById("genero");
    const body = {}

    if(nombre.value.trim() !== ""){
        body.nombre = nombre.value.trim();
    }
    if(link_portada.value.trim() !== ""){
        body.link_portada = link_portada.value.trim();
    }
    if(genero.value.trim() !== ""){
        body.genero = genero.value.trim();
    }

    editarMusica(body);
})

async function editarMusica(body) {
    try {
    const res = await fetch(`http://localhost:3000/canciones/${cancion_id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify(body)
            });

        if(!res.ok){
            alert("Ocurrió un error editando la música.");
            window.location.href = `musica.html?id=${cancion_id}`;
            return;
        }

        alert("La musica se editó correctamente.");
        window.location.href = `musica.html?id=${cancion_id}`;
    }
    catch {
        alert("Ocurrió un error editando la música.");
        window.location.href = `musica.html?id=${cancion_id}`;
        return;
    }
}