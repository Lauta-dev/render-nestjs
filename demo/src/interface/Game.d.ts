export interface Game {
	id: number;
	coverJpg: string;
	coverWebp: string;
	title: string;
	descripcion: string;
	genre: string;
	consolePublicName: string;
	consoleSmallName: string;
	generation: number;
	releaseYear: number;
	precio: number;
}

export interface ViewAllGames {
	id: number;
	title: string;
	description: string;
	genre: string;
	generation: number;
	price: number;

	covers: {
		webp: string;
		jpg: string;
	};
	consoleName: {
		short: string;
		public: string;
	};
}
