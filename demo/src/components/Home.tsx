import { useContext, useEffect, useState } from "preact/hooks";
import ViewGames from "./View-games";
import { Game } from "@/interface/Game";
import { paths } from "@/paths";
import { CharacterContext } from "@/context/ChangeHome";

const Home = () => {
	const [games, setGames] = useState<Game[]>();
	const [page, setPage] = useState(10);
	const a = useContext(CharacterContext);

	useEffect(() => {
		async function getAllGames() {
			const f = await fetch(paths.getGamesWithPagination({}));
			const json: Game[] = await f.json();

			setGames(json);
		}

		getAllGames();
	}, []);

	async function handleClick() {
		const f = await fetch(paths.getGamesWithPagination({ page }));
		const json: Game[] = await f.json();
		setGames((prev) => prev?.concat(json));
		setPage(page + 10);
	}

	const v = a.a ? a.a : games;
	console.log(a.a);

	return (
		<section className={"flex flex-col items-center gap-5"}>
			<ViewGames games={v} />

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
