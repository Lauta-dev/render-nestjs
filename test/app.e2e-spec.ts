import { INestApplication } from "@nestjs/common";
import { moduleRef, req } from "./helper";

describe("App", () => {
	let app: INestApplication;

	beforeAll(async () => {
		const ref = await moduleRef();
		app = ref.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		app.close();
	});

	it("/GET consoles", () => {
		return req(app, "/consoles").expect(200);
	});
});
