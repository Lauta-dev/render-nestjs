CREATE TABLE games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    descripcion TEXT,
    genre TEXT,
    console_public_name TEXT,
    console_small_name TEXT,
    generation INTEGER,
    release_year INTEGER,
    precio REAL,
    cover_jpg TEXT,
    cover_webp TEXT
);
