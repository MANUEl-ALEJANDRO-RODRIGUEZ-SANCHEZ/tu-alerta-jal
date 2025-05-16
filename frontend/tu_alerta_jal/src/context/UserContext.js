"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState({ name: "", email: "" });

    const setUserSession = (data) => {
        setUser({ name: data.name, email: data.email });
    };

    return (
        <UserContext.Provider value={{ user, setUserSession }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
