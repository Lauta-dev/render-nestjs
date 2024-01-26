import { AppController } from "./app.controllers";
import { AppService } from "./app.service";
import { VideoGameDetails } from "./interface/VideoGameDetails.interface";
import { allConsoles } from "./utils/allConsoles";

describe("AppController", () => {
	const appService = new AppService();
	const appController = new AppController(appService);

	it("Return array from games", async () => {
		jest.spyOn(appService, "getAllConsoles").mockImplementation(() =>
			Promise.resolve(allConsoles),
		);

		const consoles = await appController.getAllConsoles();
		expect(consoles).toEqual(allConsoles);
	});

	// Seguit con los tests

	it.each(["ps1", "ps2", "ps3", "ps4"])(
		"should get games for %s",
		async (consoleVideoGame: string) => {
			const mockGames = Array.from({ length: 5 }, (_, index) => ({
				id: index,
				title: `${consoleVideoGame} game title`,
				description: "description",
			}));

			jest.spyOn(appService, "getGameByConsole").mockImplementation(
				() => Promise.resolve(mockGames as VideoGameDetails[]),
			);
			const result = await appController.getGameByConsole({
				consoleVideoGame,
			});

			expect(mockGames).toHaveLength(5);

			result.forEach((game) => {
				expect(game.id).not.toBeNaN();
				expect(game).toHaveProperty("title");
				expect(game).toHaveProperty("id");
				expect(game).toHaveProperty("description");
			});
		},
	);
});
