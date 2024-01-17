import { Link } from "wouter-preact";
import { ViewAllGames } from "@/interface/Game";

function ViewGames({ games }: { games: ViewAllGames[] | undefined }) {
	return (
		<section className={"grid grid-cols-3 gap-5"}>
			{games?.map((data) => (
				<div key={data.title} className={"flex flex-col justify-between"}>
					<img
						className={"rounded-xl object-fill"}
						src={data.covers.webp}
						alt={data.title}
					/>

					<div>
						<p className={"text-green-700"}>
							Precio: <b>{data.price}</b>
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
								href={`/item/console/${data.consoleName.short}`}
								target={"_blank"}
							>
								{data.consoleName.public}
							</Link>
						</div>
					</div>
				</div>
			))}
		</section>
	);
}

export default ViewGames;
