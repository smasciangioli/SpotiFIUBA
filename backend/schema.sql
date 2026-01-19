CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    carrera VARCHAR(50),
    contraseña VARCHAR (100),
    fecha_creacion DATE NOT NULL,
    fecha_modificacion DATE NOT NULL 
);

CREATE TABLE canciones (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    duracion DECIMAL(10,2) NOT NULL,
    artista VARCHAR(100) NOT NULL,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    link_portada VARCHAR(400),
    link_audio VARCHAR(400) NOT NULL,
    fecha_creacion DATE NOT NULL,
    fecha_modificacion DATE NOT NULL
);

CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    creador_id INTEGER NOT NULL REFERENCES usuarios(id),
    link_portada VARCHAR(400),
    fecha_creacion DATE NOT NULL,
    fecha_modificacion DATE NOT NULL
);

-- Tabla que vincula la playlist con sus canciones
CREATE TABLE playlist_canciones (
    playlist_id INTEGER NOT NULL REFERENCES playlists(id),
    cancion_id INTEGER NOT NULL REFERENCES canciones(id),
    PRIMARY KEY (playlist_id,cancion_id)
);