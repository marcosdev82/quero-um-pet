import { createContext } from "react";  // Apenas crie o contexto
import useAuth from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
    const { authenticated, register, logout, login } = useAuth();

    return <Context.Provider value={{ authenticated, register, logout, login }}>{children}</Context.Provider>;
}

export { Context, UserProvider };
