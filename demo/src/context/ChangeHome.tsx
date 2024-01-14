import { Game } from "@/interface/Game";
import { ComponentChildren, FunctionComponent, createContext } from "preact";
import { useState } from "preact/hooks";
interface CharacterProviderProps {
	children: ComponentChildren;
}

export const CharacterContext = createContext<Game[] | undefined>(undefined);

export const CharacterProvider: FunctionComponent<CharacterProviderProps> = ({
	children,
}) => {
	const [a, setA] = useState<Game[] | undefined>();
	console.log(a);
	return (
		<CharacterContext.Provider
			value={{
				a,
				setA,
			}}
		>
			{children}
		</CharacterContext.Provider>
	);
};
