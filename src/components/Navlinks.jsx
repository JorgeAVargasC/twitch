import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { FaGamepad } from "react-icons/fa";
import { AiOutlineOrderedList } from "react-icons/ai";
import { navbarContext } from "../context/NavbarContext";
import "animate.css";

export default function Navlinks() {
	const { setOpen } = useContext(navbarContext);
	const location = useLocation();

	const navigate = useNavigate();

	const activeLink = (path) => {
		const baseStyle =
			"flex items-center h-full w-full rounded border-l-4 " +
			"md:px-4 md:h-2/3 md:justify-center md:border-0 md:border-b-2 md:rounded-sm";
		if (location.pathname === path) {
			return (
				`${baseStyle} border-white text-white ` +
				"md:border-purple-500 md:text-purple-500"
			);
		} else {
			return (
				`${baseStyle} border-slate-500 text-slate-500 hover:text-white duration-200 ` +
				"md:hover:border-purple-500 md:hover:text-purple-500"
			);
		}
	};

	return (
		<nav className="animate__animated animate__slideInRight md:animate-none z-10 bg-slate-900 w-full pt-16 min-h-full fixed top-0 left-0 flex justify-center md:pt-0 md:flex md:justify-center md:items-center md:z-auto md:relative md:h-full">
			<ul className="w-full md:flex md:h-full md:items-center">
				<li className="h-14 flex items-center justify-center text-xl md:hidden md:mr-4">
					Hi, Jhon Doe
				</li>

				<li className="mb-2 h-14 md:flex md:mr-4 md:justify-center md:items-center md:h-full">
					<Link to={"/"} className={activeLink("/")} onClick={() => setOpen(false)}>
						<HiHome className="w-8 h-auto mx-4 md:hidden" />
						Home
					</Link>
				</li>

				<li className="mb-2 h-14 md:flex md:mr-4 md:justify-center md:items-center md:h-full">
					<Link
						to={"/games"}
						className={activeLink("/games")}
						onClick={() => setOpen(false)}
					>
						<FaGamepad className="w-8 h-auto mx-4 md:hidden" />
						Games
					</Link>
				</li>

				<li className="mb-2 h-14 md:flex md:mr-4 md:justify-center md:items-center md:h-full">
					<Link
						to={"/top-games"}
						className={activeLink("/top-games")}
						onClick={() => setOpen(false)}
					>
						<AiOutlineOrderedList className="w-8 h-auto mx-4 md:hidden" />
						Top Games
					</Link>
				</li>
			</ul>
		</nav>
	);
}
