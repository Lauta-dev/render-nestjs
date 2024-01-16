type metaType = {
	title: string;
	description: string;
};

export function meta({ title = "null", description = "null" }: metaType) {
	let getDesc = document.querySelector("meta[name='description']");

	if (!getDesc) {
		const newMeta = document.createElement("meta");
		newMeta.name = "description";
		newMeta.content = description;
		document.querySelector("head")?.appendChild(newMeta);
		getDesc = document.querySelector("meta[name='description']");
	}

	getDesc?.setAttribute("content", description);
	document.title = title;
}
