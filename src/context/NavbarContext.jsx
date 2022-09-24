import { createContext, useState } from "react";

export const navbarContext = createContext();

export default function NavbarProvider({ children }) {
	
	const [isOpen, setOpen] = useState(false);

	return (
		<navbarContext.Provider value={{ isOpen, setOpen }}>
			{children}
		</navbarContext.Provider>
	)
}
