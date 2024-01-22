# Game API

Este repositorio alberga el código fuente de un proyecto que implementa una API utilizando JavaScript en conjunto con el framework de backend NestJS. La aplicación está diseñada para almacenar datos en una base de datos SQLite.

Esta base de datos cuenta con **35** registros con su:

1. Título
2. Descripción
3. Género
4. Cover/Caratula en **webp** y **jpg**
5. Consola
6. Año de lanzamiento
7. Precio
8. Generación que pertenece el juego

## Tecnologías Utilizadas

- [NestJS](https://github.com/nestjs/nest): Framework de backend que facilita el desarrollo de aplicaciones escalables y modularizadas en Node.js.
- [SQLite](https://turso.tech/): Alojamiento de la base de datos SQLite.
- [Preact](https://github.com/preactjs/preact): Una alternativa a **React** con una API similar.
- [Hosting Vercel](https://vercel.com): Hosting dónde esta alojada la demo
- [Hosting Render](https://render.com): Hosting dónde esta alojada la API


## Requirementos
- Instalar [Turso](https://turso.tech/)
- [NodeJS](https://nodejs.org/en)
- Tener instalado **NPM** este ya viene con **NodeJS** o [pnpm](https://github.com/pnpm/pnpm)

## Uso de Turso
0. Se tiene que crear una cuenta con GitHub

1. Autenticarse.
```bash
turso auth login
```

2. Crear una base de datos.
```bash
turso db create games
```

### Obtener URL y Token

1. Token
```bash
turso db tokens create games.
```

2. Url 
```bash
turso db show games --url
```

> Tanto el **token** como la **url** tienen que ir en un archivo **.env**. [Este es el ejemplo](./env.example).

### Insertar los datos

1. Acceder
```bash
turso db shell games
```
En el repo tiene el [La definición de la base de datos](./createTable.sql) y las [sentencias SQL para añadir las columnas](./insertGames.sql).
Solo se tendra que copiar y pegar.

## Iniciarlo en local

1. Clonar el repositorio

```bash
git clone https://github.com/Lauta-dev/render-nestjs.git
```

2. Instalar dependencias

- En este proyecto lo hice con [pnpm](https://github.com/pnpm/pnpm), pero podes usar **npm**

```bash
pnpm install
```

3. Levantar API

```bash
pnpm run start:dev
```

4. Levantar front-end

```bash
cd demo
pnpm run dev
```



## Rutas de la API

- **Ruta:** `/`
- **Método:** `GET` 
- **Descripción:** Obtener todos los juegos.

#### Parámetros de Consulta Soportados:
- `limit`, (opcional), **Por defecto el limite es 10 x página**
    - **Descripción:** Limita el número de juegos devueltos por página.
    - **Tipo**: Number

- `page`, (opcional), **Por defecto es la página 0**
    - **Descripción:** Especifica la página de resultados.
    - **Tipo**: Number

---

- **Ruta:** `/consoles`
- **Método:** `GET` 
- **Descripción:** Obtener todas las consolas de la base de datos.

---

- **Ruta:** `/generations`
- **Método:** `GET` 
- **Descripción:** Obtener todas las generaciones de consolas de ls base de datos.

---

- **Ruta:** `/id/:id`
- **Parámetro:** `id`
- **Método:** `GET` 
- **Descripción:** Obtener un objeto del juego que se le pase por `id`.

---

- **Ruta:** `/console/:console`
- **Método:** `GET` 
- **Descripción:** Obtener todos los juegos de una misma consola.
- **Posibles valores:** ps1, ps2, ps3, ps4, xbox, xbox_360, xbox_one

---

- **Ruta:** `/generation/:generation`
- **Método:** `GET` 
- **Descripción:** Obtener todos los juegos de una Generación.
- **Posibles valores:** ps1, ps2, ps3, ps4, xbox, xbox_360, xbox_one
