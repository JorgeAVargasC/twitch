import React from "react";
import { useEffect, useState } from "react";
import { get, postAuth } from "../api";

export default function Games() {

	const img = "https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-285x380.jpg";

	const [token, setToken] = useState(localStorage.getItem("token"));

	// useEffect(() => {
	// 	postAuth("/token")
	// 	.then(({access_token}) => {
	// 		setToken(access_token);
	// 		console.log(access_token);
	// 	});
	// },[token]);

	// useEffect(() => {
	// 	console.log(localStorage.getItem("token"));
	// 	get("/games?id=493057",{
	// 		headers: {
	// 			"Authorization": `Bearer ${token}`
	// 		}
	// 	})
	// 	.then((data) => {
	// 		console.log(data);
	// 	});
	// },[token]);

	return (
		<div className="w-11/12 mt-20 mb-20 flex flex-col justify-center items-center">
			{/* Title */}
			<div className="animate__animated animate__fadeInDown p-5 w-full flex flex-col items-center justify-center rounded-lg mb-4 bg-gradient-to-r from-purple-600 to-purple-900">
				<h2 className="text-2xl">Games</h2>
			</div>

			{/* All Games Container */}

			<div className="w-full grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">

				{/* Game Card */}
				<div className="animate__animated animate__fadeInUp item rounded-lg flex flex-col justify-between bg-slate-800 hover:scale-105 duration-200">
					<div className="flex flex-col justify-center items-center rounded-lg h-40 bg-purple-500 hover:cursor-pointer">
						<img className="rounded-lg w-full h-40 object-cover" src={img} alt="Valorant" />
					</div>
					<div className="flex flex-col p-4">
						<p className="mb-1">name</p>
						<p className="mb-2 text-white bg-purple-500 px-2 rounded-full w-fit">{`$ ${40000}`}</p>
					</div>
				</div>				

			</div>
		</div>
	);
}
