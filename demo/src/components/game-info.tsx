import { Game } from "@/interface/Game";
import { useEffect, useState } from "preact/hooks";
import { Link, useParams } from "wouter-preact";
import "@/css/view-game.css";
import { paths } from "@/paths";

function GameInfo() {
	const id = Number(useParams().id);
	const [game, setGame] = useState<Game>();
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

				const json: Game = await f.json();
				setGame(json);
			} catch (error) {
				setInternalServerError(true);
			}
		}

		getGameById();
	}, []);

	return (
		<>
			{notFound && "No hay nada"}
			{internalServerError && "Error de parte del servidor"}
			<div className={"info_game_container"}>
				<section className={"img_constainer"}>
					<img
						className={"img_cover_game_info"}
						src={game?.cover}
						alt={`Poster from ${game?.title}`}
					/>
				</section>
				<section className={"more_info_container"}>
					<h2 className={"game_info_title"}>{game?.title}</h2>
					<b className={"game_info_price"}>{game?.precio} $</b>
					<p className={"game_description"}>{game?.descripcion}</p>

					<ul>
						<li>
							Console:{" "}
							<Link href={`/item/console/${game?.consoleSmallName}`}>
								{game?.consolePublicName}
							</Link>
						</li>
						<li>
							Release: <b>{game?.release_year}</b>
						</li>
						<li>
							Genre: <b>{game?.genre}</b>
						</li>
						<li>
							Generation:{" "}
							<Link href={`/item/generation/${game?.generation}`}>
								{game?.generation}
							</Link>
						</li>
					</ul>
				</section>
			</div>
		</>
	);
}
export default GameInfo;
