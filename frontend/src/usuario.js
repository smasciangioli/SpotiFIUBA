async function validarLogin() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

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

        cargarPerfil(usuario)

    } catch (fallo){
        console.error(fallo);
        localStorage.clear();
        window.location.href = "index.html";
    }
}

function cargarPerfil(usuario) {
    document.getElementById("nombre-perfil").textContent =
    `Hola ${usuario.nombre}`;

    document.getElementById("email-perfil").textContent =
    usuario.email;
    document.getElementById("carrera-perfil").textContent = usuario.carrera;
    document.getElementById("boton-canciones-usuario").addEventListener("click", () => {
        window.location.href = `lista-canciones.html?id=${usuario.id}`;
    })
    const botonLogout = document.getElementById("logout")
    botonLogout.addEventListener("click", () =>{
    if(confirm("¿Estás seguro que querés cerrar sesion?")) {
        localStorage.removeItem("usuario");
        window.location.href = "index.html";
    } 
    });
}

validarLogin();