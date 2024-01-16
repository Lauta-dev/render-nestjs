import { useEffect, useState } from "preact/hooks";
import ViewGames from "./View-games";
import { ViewAllGames } from "@/interface/Game";
import { paths } from "@/paths";
import Loading from "./Loading";
import { meta } from "@/meta";

function ButtonViewMore(props: { handleClick: () => void }) {
	return (
		<button
			type="button"
			className={
				"p-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all"
			}
			onClick={props.handleClick}
		>
			Cargar 10 más
		</button>
	);
}

const Home = () => {
	const [games, setGames] = useState<ViewAllGames[]>();
	const [page, setPage] = useState(10);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		async function getAllGames() {
			try {
				const f = await fetch(paths.getGamesWithPagination({}));
				if (!f.ok) {
					return;
				}

				const json = await f.json();

				setGames(json);
			} catch (error) {
				setError(true);
			} finally {
				setLoading(true);
			}
		}

		getAllGames();
	}, []);

	async function handleClick() {
		try {
			const f = await fetch(paths.getGamesWithPagination({ page }));

			if (!f.ok) {
				return;
			}

			const json = await f.json();
			setGames((prev) => prev?.concat(json));
			setPage(page + 10);
		} catch (error) {
			setError(true);
		}
	}

	meta({
		title: "API demo",
		description: "this is a page",
	});

	return (
		<section className={"flex flex-col items-center gap-5"}>
			{!loading && <Loading />}
			{loading && error && "Error al cargar los datos"}
			{loading && !error && <ViewGames games={games} />}
			{loading && !error && <ButtonViewMore handleClick={handleClick} />}
		</section>
	);
};

export default Home;
