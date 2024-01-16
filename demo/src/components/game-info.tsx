import { ViewAllGames } from "@/interface/Game";
import { useEffect, useState } from "preact/hooks";
import { Link, useParams } from "wouter-preact";
import { paths } from "@/paths";
import "@/css/view-game.css";
import Loading from "./Loading";
import { meta } from "@/meta";

function Game(props: { game: ViewAllGames }) {
	const { game } = props;

	meta({
		title: game.title,
		description: game.description,
	});

	return (
		<div className={"info_game_container"}>
			<section className={"img_constainer"}>
				<img
					className={"img_cover_game_info"}
					src={game.covers.jpg}
					alt={`Poster from ${game.title}`}
				/>
			</section>
			<section className={"more_info_container"}>
				<h1 className={"game_info_title"}>{game.title}</h1>
				<b className={"game_info_price"}>{game.price} $</b>
				<p className={"game_description"}>{game.description}</p>

				<ul>
					<li>
						Console:{" "}
						<Link href={`/item/console/${game.consoleName.short}`}>
							{game.consoleName.public}
						</Link>
					</li>
					<li>
						Genre: <b>{game.genre}</b>
					</li>
					<li>
						Generation:{" "}
						<Link href={`/item/generation/${game.generation}`}>
							{game.generation}
						</Link>
					</li>
				</ul>
			</section>
		</div>
	);
}

function GameInfo() {
	const id = Number(useParams().id);
	const [game, setGame] = useState<ViewAllGames>();
	const [loading, setLoading] = useState(false);
	const [notFound, setNotFound] = useState<boolean>(false);
	const [internalServerError, setInternalServerError] = useState(false);

	useEffect(() => {
		async function getGameById() {
			try {
				const f = await fetch(paths.getGameById(id));

				// Comprobar si el status code es 200
				if (!f.ok) {
					// Comprobar si es 404 o not found
					if (f.status === 404) {
						setNotFound(true);
					}

					// Comprobar si es 505 o internal server error
					if (f.status === 500) {
						setInternalServerError(true);
					}

					return;
				}

				const json = await f.json();
				setGame(json);
			} catch (error) {
				setInternalServerError(true);
			} finally {
				setLoading(true);
			}
		}

		getGameById();
	}, []);

	return (
		<>
			{!loading && <Loading />}
			{loading && notFound && "No hay nada"}
			{loading && internalServerError && "Error de parte del servidor"}
			{loading && !notFound && !internalServerError && game?.id && (
				<Game game={game} />
			)}
		</>
	);
}
export default GameInfo;
