# SpotiFIUBA
Página del Trabajo Practico Final de la materia Introduccion al Desarrollo del Software. Cátedra Camejo.

SpotiFIUBA es una web de reproduccion de música, para los estudiantes de la Facultad de Ingenieria de la Universidad de Buenos Aries (FIUBA).
El proyecto es un contenedor de Docker el cual se ejecuta con los comandos correspondientes.
A continuación, veremos como levantar la web paso a paso.

1. Revisar la disponibilidad de los puertos.
Los puertos que usa este contenedor y que por ende e un requerimiento que esten liberados son: 3000 (backend), 5432 (Base de Datos), y 8080 (Frontend).
Para verificar si un puerto esta ocupado, se puede usar el comando en la terminal: sudo lsof -i :3000, (siendo en este caso 3000 el puerto a revisar). Si no hay ninguna salida, el puerto esta libre. En caso contrario, si el puerto esta ocupado se debera liberar con el comando correspondiente antes de poder levantar el contenedor de SpotiFIUBA.

2. Levantar el contenedor.
Una vez terminada la revision anterior, se puede levantar el contenedor con el comando docker compose up --build, el cual construye las imagenes y levanta el servicio. Una vez ejecutado, se debera ver la linea de la siguiente imagen para asegurar que ya esta corriendo.
<img width="411" height="40" alt="Image" src="https://github.com/user-attachments/assets/9aafa6a0-cd32-4da1-8d52-88caeeb7cd09" />
Alternativamente, se puede usar docker compose up -d --build, para ejecutarlo en modo detached, y poder seguir usando esa terminal.

3. Empezar a usar la pagina
 Con el contenedor ya levantado, se podra entrar en la pagina escribiendo en el navegador localhost:8080, lo que nos llevara a la pagina principal de la web.
 (imagen de index.html cuando este terminado).
 Desde aqui se recomienda crear una cuenta usando el boton ubicado en el lateral superior derecho de la pantalla, el cual te redirigira a la pantalla de creacion de usuario.
 <img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/7661b51b-cc13-4c6b-9fae-93767b2772d0" />
 Una vez hecho esto podremos elegir el nombre de usuario que se usara en la pagina e ingresar nuestro mail y contraseña, aparte de la indicar la ingenieria que estemos cursando. Tambien podremos iniciar sesion si ya teniamos una cuenta previamente, clickeando el texto de abajo del formulario. Luego de completar los campos con nuestra informacion, se debe hacer click en el boton 'Continuar', el cual nos redirige a iniciar sesion con la cuenta ya creada.
 <img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/b498f2bf-bea5-4fc3-b1f5-e1c6a9931c3e" />
 Al iniciar sesion con nuestra cuenta volveremos a la pagina principal donde ya tendremos acceso a las funciones de la misma.
 Una vez aqui, podremos tocar el boton de 'Perfil' que ahora reemplaza los botones de iniciar sesion y crear usuario, para acceder a nuestra informacion.
 <img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/629d7e21-28c1-47af-8eb3-ba76aff56c0e" />
 Si queremos editar nuestro perfil, podremos hacerlo desde aqui con el boton correspondiente.
 Dicho boton nos llevara a la pagina done podremos hacer los cambios buscados o incluso eliminar nuestra cuenta, una vez hechos los cmabios, debemos volver a iniciar sesion.
 <img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/035ed996-aefd-4f9d-aa5c-df576cc844ab" />
 Para subir una cancion podremos hacerlo ya sea deade nuestro perfil con el boton visto en la captura o desde la pagina principal tocando el 'Más' de abajo a la derecha.
 <img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/196f221e-4eb3-428f-8883-97318c10d331" />
 Aqui es importante completar todos los campos obligatorios con la informacion correspondiente de la cancion que queremos subir.  Cabe aclarar que es recomendable que la tanto el archivo de audio como el de la imagen esten subidos a una plataforma como Cloudinary, ya que no se aceptan todo tipo de URLs. Una vez toquemos subir cancion podremos ver una lista de todas las canciones subidas, ordenadas de mas nueva a mas vieja.
 <img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/79cadd21-8565-4327-becb-d6eb6f204438" />
 Haciendo click en la que queramos podremos escucharla.
 <img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/0215530b-74fc-4e80-b3dc-96e278c6d516" />
 Si quisieramos ver solo las canciones subidas con nuestro usuario, podemos hacerlo con el boton 'Tus canciones' en la pantalla del perfil.




