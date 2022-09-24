import { useContext } from "react";
import { Link } from "react-router-dom";
import Navlinks from "./Navlinks";
import { Spin as Hamburger } from "hamburger-react";
import { navbarContext } from "../context/NavbarContext";
import Logo from "../assets/Logo.svg";

export default function Navbar() {
	
	const { isOpen, setOpen } = useContext(navbarContext);

	return (
		<div className="bg-slate-900 h-16 w-full flex justify-center fixed z-20">
			<div className="flex h-full justify-between items-center w-11/12">
				<Link to="/" className="z-30">
					<img src={Logo} className="w-12 h-auto" alt="Logo" />
				</Link>

				{/* Mobile Navigation */}
				<div className="md:hidden z-30">
					<Hamburger
						rounded
						toggled={isOpen}
						toggle={setOpen}
						direction="left"
						duration={0.4}
						size={32}
					/>
				</div>

				<div className="fixed w-full md:hidden">
					{isOpen && <Navlinks />}
				</div>

				{/* Desktop Navigation */}
				<div className="hidden md:block h-full">
					<Navlinks/>
				</div>
				
			</div>
		</div>
	);
}
