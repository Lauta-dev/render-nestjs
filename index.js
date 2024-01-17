const box = document.getElementById("data");
const cantidad = document.getElementById("cantidad");
async function dom(){
	const f = await fetch("http://localhost:3000/games/all");
	const data = await f.json();
	cantidad.innerHTML = `Cantidad de elementos: ${data.length}`;

	data.map((data) => {
		const {
			consolePublicName,
			cover,
			descripcion,
			generation,
			genre,
			precio,
			release_year,
			title,
		} = data;

		const viewData = `
      <h2>${title} - ${release_year} - ${consolePublicName}</h2>
      <hr>
      <div style="display: flex; gap: 1rem; justify-content: center;">
        <p>${descripcion}</p>
        <img src="${cover}" alt="Imagen de ${title}" width="100px" />
      </div>
      <ul>
        <li>Generation: ${generation}</li>
        <li>Genre: ${genre}</li>
        <li>Price: ${precio}</li>
      </ul>
		`;

		box.innerHTML += viewData;
	});
}
dom();
