async function login() {
const email = document.getElementById("email").value;
const contrasenia = document.getElementById("contrasenia").value;

const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, contrasenia })
});

if (!res.ok) {
    alert("Login incorrecto");
    return;
}

const usuario = await res.json();
localStorage.setItem("usuario", JSON.stringify(usuario));
window.location.href = "index.html";
}