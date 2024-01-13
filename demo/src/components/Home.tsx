import { useEffect, useState } from "preact/hooks";
import ViewGames from "./View-games";
import { Game } from "@/interface/Game";

const Home = () => {
	const [games, setGames] = useState<Game[]>();
	const [page, setPage] = useState(10);

	useEffect(() => {
		async function getAllGames() {
			const f = await fetch("http://localhost:3000?limit=10");
			const json: Game[] = await f.json();

			setGames(json);
		}

		getAllGames();
	}, []);

	async function handleClick() {
		const f = await fetch(`http://localhost:3000?limit=10&page=${page}`);
		const json: Game[] = await f.json();
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
