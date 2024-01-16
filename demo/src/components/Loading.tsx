import Spinner from "./svg/Spinner";

function Loading() {
	return (
		<button
			disabled
			type="button"
			className="text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  inline-flex items-center"
		>
			<Spinner />
			Cargando...
		</button>
	);
}

export default Loading;
