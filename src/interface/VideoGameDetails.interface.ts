export interface VideoGameDetails {
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
