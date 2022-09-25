import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { postAuth } from "./api";
import Navbar from "./components/Navbar";
import NavbarProvider from "./context/NavbarContext";
import Loading from "./pages/Loading";

const Home = lazy(() => import("./pages/Home"));
const Games = lazy(() => import("./pages/Games"));
const TopGames = lazy(() => import("./pages/TopGames"));

export default function App() {

	useEffect(() => {
		postAuth("/token")
		.then(({access_token}) => {
			localStorage.setItem("token", JSON.stringify(access_token));
			// console.log(JSON.parse(localStorage.getItem("token")));
		});
	},[]);



	return (
		<div className="App bg-slate-900 min-h-screen text-white flex items-center flex-col w-full">
			<Router>
				<NavbarProvider>
					<Navbar />
				</NavbarProvider>
				<Suspense fallback={<Loading />}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/games" element={<Games />} />
						<Route path="/top-games" element={<TopGames />} />
					</Routes>
				</Suspense>
			</Router>
		</div>
	);
}
