    const form = document.getElementById("form-registro");
    
    
    form.addEventListener("submit", async function(e) {
        e.preventDefault();
    
        const nombre_usuario = document.getElementById("nombre_usuario").value.trim();
        const email = document.getElementById("email").value.trim();
        const carrera = document.getElementById("carrera").value;
        const contrasenia = document.getElementById("contrasenia").value;
        if (!nombre_usuario || !email || !contrasenia) {
            alert("Completa todos los campos obligatorios");
            
            return;
        }
        
    
        try {
            const respuesta = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre_usuario, email, carrera, contrasenia })
            });
    
            console.log("Respuesta POST /usuarios:", respuesta.status);
            if (!respuesta.ok) {
                const error = await respuesta.text().catch(()=>"");
                throw new Error(error || `status ${respuesta.status}`);
            }
    
            window.location.href = "iniciar-sesion.html";
        } catch (fallo) {
            console.error(fallo);
            alert(fallo.message || "Error en la petición");
        } 
        
    });