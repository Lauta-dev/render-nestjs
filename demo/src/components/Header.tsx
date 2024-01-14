import { useEffect, useState } from "preact/hooks";
import { Link, useLocation } from "wouter-preact";
import "@/css/header.css";
import { paths } from "@/paths";
import { links } from "@/metadata";

export interface ConsoleName {
	consoleSmallName: string;
	consolePublicName: string;
}

export interface GenerationGames {
	generation: number;
}
function Form({
	consoleSmallName,
	generationGames,
	type,
}: {
	consoleSmallName?: ConsoleName[];
	generationGames?: GenerationGames[];
	type: string;
}) {
	const [_, setLocation] = useLocation();

	// Esta función se ejecuta cada vez que algunos de los dos select cambie.
	const handleValueChange = (value: string) => {
		if (value === "elegir") {
			return;
		}

		const selected = type?.toLowerCase();
		const url = `/item/${selected}/${value}`;
		setLocation(url); // Actualiza la URL
		location.reload(); // Recarga la página
	};

	return (
		<>
			<select
				value={"asd"}
				onChange={(v) => {
					handleValueChange((v.target as HTMLSelectElement).value);
				}}
			>
				{consoleSmallName?.map((data) => (
					<option key={data.consolePublicName} value={data.consoleSmallName}>
						{data.consolePublicName}
					</option>
				))}

				{generationGames?.map((data) => (
					<option key={data.generation} value={data.generation}>
						{data.generation}
					</option>
				))}
			</select>
		</>
	);
}

function Header() {
	const [consoleSmallName, setConsoleSmallName] = useState<ConsoleName[]>();
	const [generation, setGeneration] = useState<GenerationGames[]>();

	useEffect(() => {
		async function g() {
			const urls = {
				g: paths.generations,
				c: paths.consoles,
			};

			try {
				const getConsoles = await fetch(urls.c);
				const getGeneration = await fetch(urls.g);
				const consolesToJson = await getConsoles.json();
				const generationToJson = await getGeneration.json();

				// Save in localStorage
				localStorage.setItem("consoles", JSON.stringify(consolesToJson));
				localStorage.setItem("generation", JSON.stringify(generationToJson));

				setConsoleSmallName(consolesToJson);
				setGeneration(generationToJson);
			} catch (error) {}
		}

		const getConsolesFromLocalStorage = localStorage.getItem("consoles");
		const getGenerationFromLocalStorage = localStorage.getItem("generation");

		if (getGenerationFromLocalStorage && getConsolesFromLocalStorage) {
			const consolesToArray = JSON.parse(getConsolesFromLocalStorage);
			const generationToArray = JSON.parse(getGenerationFromLocalStorage);
			setConsoleSmallName(consolesToArray);
			setGeneration(generationToArray);

			return;
		}

		g();
	}, []);
	return (
		<header className={"header_container"}>
			<section className={"section_container_navigation"}>
				<nav>
					<ul>
						<li>
							<Link
								className={
									"bg-gray-700 text-white p-2 rounded-md hover:bg-black transition-all"
								}
								href={location.origin}
							>
								Ir a la página principal
							</Link>
						</li>
						<li>
							<Form type="Console" consoleSmallName={consoleSmallName} />
						</li>
						<li>
							<Form type="Generation" generationGames={generation} />
						</li>
					</ul>
				</nav>
			</section>
			<nav>
				<ul>
					<li>
						<a
							className={`
							transition-all
							rounded-md
							p-3
							hover:bg-gray-100
						`}
							href={links.ghDemo}
						>
							repositorio de la demo
						</a>
					</li>
					<li>
						<a
							className={`
							rounded-md
							p-3
							bg-black
							text-white
						`}
							href={links.api}
						>
							API
						</a>
					</li>
					<li>
						<a
							className={`
							rounded-md
							p-3
							bg-black
							text-white
						`}
							href={links.ghPersonal}
						>
							Mi GitHub
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
