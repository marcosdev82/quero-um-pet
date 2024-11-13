import { createContext } from "react";  // Apenas crie o contexto
import useAuth from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
    const { authenticated, register } = useAuth();
    return <Context.Provider value={{ authenticated, register }}>{children}</Context.Provider>;
}

export { Context, UserProvider };
