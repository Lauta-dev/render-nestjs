import { Route } from "wouter-preact";
import Home from "./components/Home";
import GameInfo from "./components/game-info";
import Header from "./components/Header";
import GameConsoleInfo from "./components/game-console-list";
import { CharacterProvider } from "./context/ChangeHome";

const App = () => {
	return (
		<>
			<CharacterProvider>
				<Header />
				<Route path="/" component={Home} />
			</CharacterProvider>

			<Route path="/game/:id" component={GameInfo} />
			<Route path="/item/:selected/:i" component={GameConsoleInfo} />
		</>
	);
};

export default App;
