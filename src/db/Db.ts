import { createClient } from "@libsql/client";
import { Consoles } from "src/interface/Consoles.interface";

export class Db {
	private connect() {
		return createClient({
			url: process.env.TURSO_URL,
			authToken: process.env.TURSO_TOKEN,
		});
	}

	async sql(sql: string, args: {}) {
		const { rows } = await this.connect().execute({
			sql,
			args,
		});

		return rows;
	}

	async getAllConsoles() {
		const sql = `
      SELECT console_small_name AS short, console_public_name AS public
      FROM games
      GROUP BY console_public_name, console_small_name
    `;

		return await this.sql(sql, {});
	}

	async getAllGeneration() {
		const sql = `
      SELECT generation
      FROM games
      GROUP BY generation
    `;
		return await this.sql(sql, {});
	}

	async getGameById(id: number) {
		const sql = `
      SELECT *
      FROM games
      WHERE id = :id
    `;

		return await this.sql(sql, { id });
	}

	async getAllGames() {
		const sql = `
      SELECT *
      FROM games
    `;

		return await this.sql(sql, {});
	}
}
