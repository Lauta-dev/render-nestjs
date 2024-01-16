import { Games } from "src/entity/Games.entity";

export function formatGame(game: Games) {
	return {
		id: game.id,
		title: game.title,
		description: game.descripcion,
		genre: game.genre,
		generation: game.generation,
		price: game.precio,
		covers: {
			webp: game.coverWebp,
			jpg: game.coverJpg,
		},
		consoleName: {
			short: game.consoleSmallName,
			public: game.consolePublicName,
		},
	};
}
