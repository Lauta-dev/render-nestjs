export function formatGame(game) {
	return {
		id: game.id,
		title: game.title,
		description: game.descripcion,
		genre: game.genre,
		generation: game.generation,
		price: game.precio,
		covers: {
			webp: game.cover_webp,
			jpg: game.cover_jpg,
		},
		consoleName: {
			short: game.console_small_name,
			public: game.console_public_name,
		},
	};
}
