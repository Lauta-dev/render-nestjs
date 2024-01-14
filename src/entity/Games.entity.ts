import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("games")
export class Games {
	@PrimaryGeneratedColumn("increment")
	id: number;

	// Caratula del juego
	@Column({
		name: "cover_jpg",
		type: "text",
		nullable: true,
		default: () => "'URL NO DADA'",
	})
	coverJpg: string;

	@Column({
		name: "cover_webp",
		type: "text",
		nullable: true,
		default: () => "'URL NO DADA'",
	})
	coverWebp: string;

	// Columna para el título del juego
	@Column({ type: "text" })
	title: string;

	// Columna para la descripción del juego
	@Column({ type: "text" })
	descripcion: string;

	// Columna para el género del juego
	@Column({ type: "text" })
	genre: string;

	// Columna para la consola del juego
	@Column({ type: "text", name: "console_public_name" })
	consolePublicName: string;

	@Column({ type: "text", name: "console_small_name" })
	consoleSmallName: string;

	// Columna para la generación del juego
	@Column({ type: "integer" })
	generation: number;

	// Columna para el año de lanzamiento del juego
	@Column({ name: "release_year", type: "integer" })
	releaseYear: number;

	// Columna para el precio del juego
	@Column({ type: "real" })
	precio: number;
}
