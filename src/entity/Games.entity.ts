import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("games")
export class Games {
	@PrimaryGeneratedColumn("increment")
	id: number;

	// Caratula del juego
	@Column({ type: "text", nullable: true, default: () => "'URL NO DADA'" })
	cover: string;

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
	@Column({ type: "text" })
	console: string;

	// Columna para la generación del juego
	@Column({ type: "integer" })
	generation: number;

	// Columna para el año de lanzamiento del juego
	@Column({ type: "integer" })
	release_year: number;

	// Columna para el precio del juego
	@Column({ type: "real" })
	precio: number;
}
