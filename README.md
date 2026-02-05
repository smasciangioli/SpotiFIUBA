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
 <img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/004e6612-5636-4aff-a1af-5b8d2d19662e" />
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
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/e77542cd-58d2-4c2f-8aa5-524a89de415c" />

 Si quisieramos ver solo las canciones subidas con nuestro usuario, podemos hacerlo con el boton 'Tus canciones' en la pantalla del perfil.
 Tambien podemos eliminar las canciones que hayamos subido, y editarlas, en caso de que la informacion este mal y queramos actualizarla. Adicionalmente, tenemos la opcion de subirla a una playlist, lo cual abordaremos mas adelante.
 El boton 'Editar Cancion' te llevara a la pagina donde podremos cambiar el nombre, la portada y el genero.
 <img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/f5da0624-82d3-4d6c-b7b5-e7da3d69930e" />
 Volviendo a la pagina principal, podremos ver una lista de todas las canciones subidas por cualquiero usuario con el boton 'Canciones'.
 <img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/18434243-9e33-4da4-be24-793a4c13eadf" />
 Lo mismo podemos hacer con las playlists tocando el boton al costado del anteriormente mencionado.
 <img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/24547627-866a-44d6-b881-ef5a3af7f726" />
 Para crear nuestra playlist se debe tocar el boton ubicado en la barra lateral izquierda de la pantalla principal, donde podremos ponerle el nombre y una foto de portada opcional.
 <img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/d0a8c501-3672-4094-9f02-7d2e964bf631" />
 Al subirla nos redirige a la lista de nuestras playlist, donde debemos podremos elegir a cual entrar, una vez dentro, podremos editar su nombre o portada con el boton 'Editar Playlist', o eliminarla.
 <img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/01494908-5618-4cc4-8ff1-6b4b696b9399" />
 Si recien creamos nuestra playlist y por lo tanto esta vacia, el proceso para subir canciones es ir a la lista de las mismas ya mencionada anteriormente, seleccionar una cancion y tocar el selector de playlists
 <img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/543bd525-f970-4f26-9285-ab09f65d914b" />
 Una vez hecho eso la veremos agregada en la playlist seleccionada.
 En caso de querer eliminar una cancion, debemos usar el selector que aparece al borrar de la playlist, donde apareceran las canciones que esten en la misma, la seleccionamos y apretamos el boton 'Borrar de la Playlist'
 <img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/2f565ee5-8307-4889-992c-fa5091579fb6" />



