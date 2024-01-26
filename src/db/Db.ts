import { createClient } from "@libsql/client";

export class Db {
	private connect() {
		const prodClient = createClient({
			url: process.env.TURSO_URL,
			authToken: process.env.TURSO_TOKEN,
		});

		const devClient = createClient({
			url: "file:../../games.db",
		});

		return prodClient;
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

	async getAllGames({ limit, page }: { limit?: number; page?: number }) {
		const l = limit ? limit : 10;
		const p = page ? page : 0;

		const sql = `
      SELECT *
      FROM games
      LIMIT :limit
      OFFSET :page
    `;

		return await this.sql(sql, { limit: l, page: p });
	}

	async getGameByConsole(console: string) {
		const sql = `
    SELECT title, precio, cover_webp, console_small_name, console_public_name, id
    FROM games
    WHERE console_small_name = :console
    `;

		return await this.sql(sql, { console });
	}

	async getGameByGeneration(g: number) {
		const sql = `
    SELECT title, precio, cover_webp, console_small_name, console_public_name, id
    FROM games
    WHERE generation = :g
    `;

		return await this.sql(sql, { g });
	}
}
