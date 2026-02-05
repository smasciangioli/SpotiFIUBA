const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
    window.location.href = "iniciar-sesion.html";
}

document.getElementById("input-nombre").value = usuario.nombre;
const selectCarrera = document.getElementById("carrera");
selectCarrera.value = usuario.carrera;


async function guardarCambios() {
    const nombreInput = document.getElementById("input-nombre");
    const carreraSelect = document.getElementById("carrera");
    const passInput = document.getElementById("input-contrasenia");

    if (!nombreInput || !carreraSelect) {
        alert("Error interno: campos no encontrados");
        return;
    }

    const body = {
        nombre_usuario: nombreInput.value,
        carrera: carreraSelect.value
    };

    if (passInput.value !== "") {
        body.contrasenia = passInput.value;
    }

    const res = await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        alert("error al actualizar perfil");
        return;
    }

    localStorage.removeItem("usuario");
    alert("Perfil actualizado. Inicia sesión nuevamente.");
    window.location.href = "iniciar-sesion.html";
}


function logout() {
    localStorage.removeItem("usuario");
    window.location.href = "iniciar-sesion.html";
}
async function eliminarUsuario() {
    const confirmar = confirm(
        "¿Estás seguro? Esta acción eliminará tu cuenta y no se puede deshacer."
    );

    if (!confirmar) return;

    const res = await fetch(
        `http://localhost:3000/usuarios/${usuario.id}`,
        { method: "DELETE" }
    );

    if (!res.ok) {
        alert("Error al eliminar la cuenta");
        return;
    }

    localStorage.removeItem("usuario");
    alert("Cuenta eliminada correctamente");
    window.location.href = "index.html";
}
