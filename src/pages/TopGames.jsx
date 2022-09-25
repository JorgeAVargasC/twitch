import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { get, postAuth } from "../api";
import { MdClose } from "react-icons/md";

export default function TopGames() {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [games, setGames] = useState([]);
	const [modalGame, setModalGame] = useState(false);

	useEffect(() => {
		postAuth("/token").then(({ access_token }) => {
			setToken(access_token);
			console.log(access_token);
		});
	}, []);

	useEffect(() => {
		get("/games/top", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then(({ data }) => {
			setGames(data);
			console.log(data);
		});
	}, [token]);

	const openModal = (gameId) => {
		get(`/games?id=${gameId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then(({ data }) => {
			setModalGame(data[0]);
			console.log(data);
		});
	};

	return (
		<>
			{/* Modal Game */}
			{modalGame && (
				<div className="animate__animated animate__fadeIn fixed z-50 top-0 w-full min-h-screen flex justify-center items-center">
					<div
						className="absolute top-0 w-full min-h-screen bg-slate-900 opacity-70"
						onClick={() => {
							setModalGame(false);
						}}
					></div>

					<div className="animate__animated animate__fadeInDown z-50 w-3/4 md:w-1/4 bg-gray-900 rounded-lg">
						<MdClose
							className="absolute bg-purple-500 rounded hover:bg-white hover:text-purple-500 hover:cursor-pointer duration-300 w-8 top-2 right-2 h-auto"
							onClick={() => {
								setModalGame(false);
							}}
						/>

						<img
							src={modalGame.box_art_url
								.replace("{width}", "300")
								.replace("{height}", "400")}
							className="rounded-lg w-full h-full"
							alt={modalGame.name}
						/>

						<div className="flex flex-col p-4 w-full h-full justify-between">
							<p className="mb-1 text-center text-2xl font-bold">{modalGame.name}</p>
						</div>
					</div>
				</div>
			)}

			<div className="w-11/12 mt-20 mb-20 flex flex-col justify-center items-center">
				<div className="animate__animated animate__fadeInDown p-5 w-full flex flex-col items-center justify-center rounded-lg mb-4 bg-gradient-to-r from-purple-600 to-purple-900">
					<h2 className="text-2xl">Top Games</h2>
				</div>

				{/* Top Games Container */}

				<div className="w-full grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
					{/* Game Cards */}

					{games?.length !== 0 ? (
						games.map((game) => {
							return (
								<div
									onClick={() => openModal(game.id)}
									key={game.id}
									className="overflow-hidden bg-red-400 cursor-pointer rounded-xl relative group"
								>
									<div className="rounded-xl z-40 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
										<div>
											<div className="transform-gpu p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
												<div className="font-bold">{game.name}</div>
											</div>
										</div>
									</div>
									<img
										alt={game.name}
										className="w-full h-full group-hover:scale-110 transition duration-300 ease-in-out"
										src={game.box_art_url
											.replace("{width}", "285")
											.replace("{height}", "380")}
									/>
								</div>
							);
						})
					) : (
						<div className="w-full col-span-5 h-96 flex items-center justify-center">
							<svg
								role="status"
								className="w-36 h-36 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="currentColor"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentFill"
								/>
							</svg>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
