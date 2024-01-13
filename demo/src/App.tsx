import { Route } from "wouter-preact";
import Home from "./components/Home";
import gameConsoleList from "./components/game-console-list";
import GameInfo from "./components/game-info";
import Header from "./components/Header";

const App = () => {
	return (
		<>
			<Header />
			<Route path="/" component={Home} />
			<Route path="/game/:id" component={GameInfo} />
			<Route path="/item/:selected/:i" component={gameConsoleList} />
		</>
	);
};

export default App;
