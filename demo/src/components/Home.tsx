import { useEffect, useState } from "preact/hooks";
import ViewGames from "./View-games";
import { ViewAllGames } from "@/interface/Game";
import { paths } from "@/paths";

const Home = () => {
	const [games, setGames] = useState<ViewAllGames[]>();
	const [page, setPage] = useState(10);

	useEffect(() => {
		async function getAllGames() {
			const f = await fetch(paths.getGamesWithPagination({}));
			const json = await f.json();

			setGames(json);
		}

		getAllGames();
	}, []);

	async function handleClick() {
		const f = await fetch(paths.getGamesWithPagination({ page }));
		const json = await f.json();
		setGames((prev) => prev?.concat(json));
		setPage(page + 10);
	}

	return (
		<section className={"flex flex-col items-center gap-5"}>
			<ViewGames games={games} />

			<button
				type="button"
				className={
					"p-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all"
				}
				onClick={handleClick}
			>
				Cargar 10 más
			</button>
		</section>
	);
};

export default Home;
