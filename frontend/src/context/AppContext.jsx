'use client';

import { useRouter } from "next/navigation";

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const router = useRouter();

    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem('token') ? true : false
    );

    const logout = () => {
        localStorage.removeItem('token');
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        setLoggedIn(false);
        router.push('/login');
    }

    return <AppContext.Provider value={{ loggedIn, setLoggedIn, logout }} >
        {children}
    </AppContext.Provider>
}

const useAppContext = () => useContext(AppContext);

export default useAppContext;