const basePath = import.meta.env.PROD
	? "https://nest-etid.onrender.com"
	: "http://localhost:3000";

export const paths = {
	getAllGames: basePath,
	generations: `${basePath}/generations`,
	consoles: `${basePath}/consoles`,

	getGameById: (id: number) => `${basePath}/id/${id}`,
	getConsoleOrGeneration: (
		consoleORGeneration: string,
		i: string | number | undefined,
	) => `${basePath}/${consoleORGeneration}/${i}`,
	getGamesWithPagination: ({
		page = 0,
		limit = 10,
	}: { page?: number; limit?: number }) =>
		`${basePath}?limit=${limit}&page=${page}`,
};
