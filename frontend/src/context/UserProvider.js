import { Children, createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext()

function UserProvider({ children }) {
    const { register } = useAuth()

    return <Context.Provider value={{register}}>{Children}</Context.Provider>
}

export { Context, UserProvider }