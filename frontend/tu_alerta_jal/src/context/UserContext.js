"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        location: "",
    });

    const setUserSession = (data) => {
        setUser((prev) => ({
            ...prev,
            ...data,
        }));
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
