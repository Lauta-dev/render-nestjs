import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
	let app: INestApplication;

	// Levantar la APP
	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	// Cerrar la APP
	afterAll(async () => await app.close());

	describe("Obtener juego por id", () => {
		it("/id/:id [GET] Deberia obtener un juego válido por id", async () => {
			const res = await request(app.getHttpServer()).get("/id/1");
			expect(res.status).toBe(HttpStatus.OK);

			const keys = Object.keys(res.body).map((data) => data);
			expect(keys).toContain("id");
			expect(res.body.id).not.toBeNaN();
			expect(res.body.id).toBeGreaterThanOrEqual(1);
		});

		it("/id/:id [GET] El id es inválido", async () => {
			const res = await request(app.getHttpServer()).get("/id/asd");
			expect(res.status).toBe(HttpStatus.BAD_REQUEST);
		});

		it("/id/:id [GET] El juego no existe", async () => {
			const res = await request(app.getHttpServer()).get("/id/40");
			expect(res.status).toBe(HttpStatus.OK);
			expect(res.body.error).toBe(false);
		});
	});

	describe("Obtener juegos por su generación", () => {
		it("/generation/:generation", async () => {
			const res = await request(app.getHttpServer()).get(
				"/generation/asd",
			);
			expect(res.status).toBe(HttpStatus.BAD_REQUEST);
		});

		it("/generation/:generation", async () => {
			const res = await request(app.getHttpServer()).get(
				"/generation/1",
			);
			expect(res.status).toBe(HttpStatus.OK);
		});
	});
});
