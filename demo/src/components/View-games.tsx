import { Link } from "wouter-preact";
import { Game } from "@/interface/Game";

function ViewGames({ games }: { games: Game[] | undefined }) {
	return (
		<section className={"grid grid-cols-3 gap-5"}>
			{games &&
				games.map((data) => (
					<div key={data.title} className={"flex flex-col justify-between"}>
						<img
							className={"rounded-xl object-fill"}
							src={data.cover}
							alt={data.title}
						/>

						<div>
							<p className={"text-green-700"}>
								Precio: <b>{data.precio}</b>
							</p>

							<div
								className={`
						flex justify-between gap-3
						max-md:flex max-md:flex-col
						`}
							>
								<Link
									className={
										"text-gray-600 hover:text-black text-balance transition-all"
									}
									href={`/game/${data.id}`}
									target={"_blank"}
								>
									{data.title}
								</Link>

								<Link
									className={"text-gray-600 hover:text-black transition-all"}
									href={`/item/console/${data.consoleSmallName}`}
									target={"_blank"}
								>
									{data.consolePublicName}
								</Link>
							</div>
						</div>
					</div>
				))}
		</section>
	);
}

export default ViewGames;
