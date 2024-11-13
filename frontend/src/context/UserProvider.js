import { createContext } from "react";  // Apenas crie o contexto
import useAuth from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
    const { authenticated, register, logout } = useAuth();

    return <Context.Provider value={{ authenticated, register, logout }}>{children}</Context.Provider>;
}

export { Context, UserProvider };
