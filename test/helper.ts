import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

import { AppModule } from "../src/app.module";
import { AppService } from "../src/app.service";

export const req = (app: INestApplication, path: string) => {
	return request(app.getHttpServer()).get(path);
};

export const moduleRef = async () => {
	let appService = { getAllConsoles: () => [] };

	const moduleRef = await Test.createTestingModule({
		imports: [AppModule],
	})
		.overrideProvider(AppService)
		.useValue(appService)
		.compile();

	return moduleRef;
};
