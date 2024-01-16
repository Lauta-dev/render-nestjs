import { useEffect, useState } from "preact/hooks";
import { useLocation, useParams } from "wouter-preact";

import ViewGames from "./View-games";
import { paths } from "@/paths";
import Loading from "./Loading";
import { meta } from "@/meta";
function GameConsoleInfo() {
	const [games, setGames] = useState();
	const [loading, setLoading] = useState(false);

	// consola, generation
	// Selected: puede recibir "console" o "generation"
	// i: puede recibir un numero: Que es el id de la generacion o un string: El nombre de la consola (ps1, ps2, xbox, etc)
	const { selected, i } = useParams();
	const fetchUrl =
		selected === "console"
			? paths.getConsoleOrGeneration(selected, i)
			: selected === "generation"
			  ? paths.getConsoleOrGeneration(selected, i)
			  : null;

	if (!fetchUrl) {
		useLocation()[1](window.location.origin);
		return <div></div>;
	}

	useEffect(() => {
		async function getGame() {
			try {
				const f = await fetch(fetchUrl ? fetchUrl : "");

				if (!f.ok) {
					console.log(f.status);
					return;
				}

				const json = await f.json();
				setGames(json);
				setLoading(true);
			} catch (error) {
				console.log(error);
			}
		}

		getGame();
	}, []);

	meta({
		title: `${selected}: ${i?.toUpperCase()}`,
	});

	return (
		<>
			{!loading && <Loading />}
			{loading && <ViewGames games={games} />}
		</>
	);
}

export default GameConsoleInfo;
