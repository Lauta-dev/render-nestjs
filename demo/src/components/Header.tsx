import { useEffect, useState } from "preact/hooks";
import { Link } from "wouter-preact";
import "@/css/header.css";

export interface ConsoleName {
	consoleSmallName: string;
	consolePublicName: string;
}

export interface GenerationGames {
	generation: number;
}
/*
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
		const selected = type?.toLowerCase();
		const url = `/item/${selected}/${value}`;
		setLocation(url); // Actualiza la URL
		location.reload(); // Recarga la página
	};

	return (
		<Select onValueChange={handleValueChange}>
			<SelectTrigger className="h-[25px] w-[150px]">
				<SelectValue placeholder={type} />
			</SelectTrigger>
			<SelectContent>
				{consoleSmallName?.map((data) => (
					<SelectItem
						key={data.consolePublicName}
						value={data.consoleSmallName}
					>
						{data.consolePublicName}
					</SelectItem>
				))}
				{generationGames?.map((data) => (
					<SelectItem key={data.generation} value={data.generation}>
						{data.generation}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}*/

function Header() {
	const [consoleSmallName, setConsoleSmallName] = useState<ConsoleName[]>();
	const [generation, setGeneration] = useState<GenerationGames[]>();

	console.log({
		consoleSmallName,
		generation,
	});

	useEffect(() => {
		async function g() {
			const urls = {
				g: "http://localhost:3000/generations",
				c: "http://localhost:3000/consoles",
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
						<li>sad</li>
						<li>asd</li>
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
							href="w"
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
							href="W"
						>
							API
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
