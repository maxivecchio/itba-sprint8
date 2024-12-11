"use client";

import React, {createContext, useState, useContext, useEffect} from "react";
import Cookies from "js-cookie";
import {toast} from "sonner";
import axios from "axios";
import {useRouter} from "next/navigation";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/api/session");
                if (res.status === 200) {
                    setUser(res.data.user);
                }
            } catch (error) {
                console.error("Error fetching session:", error);
            }
        };

        fetchUser();
    }, []);

    const login = async (username, password) => {
        try {
            const res = await axios.post("/api/login", {username, password});

            if (res.status === 200) {
                const userData = res.data;
                toast.success("Sesión iniciada correctamente.");
                setUser(userData.user);
                Cookies.set("user", JSON.stringify(userData.user), {expires: 7});
                return true;
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Usuario o contraseña incorrectos";
            toast.error(errorMessage);
            return false;
        }
    };

    const router = useRouter();
    const logout = async () => {

        try {
            const res = await axios.post("/api/logout");

            if (res.status === 200) {
                Cookies.remove("user");
                setUser(null);
                toast.success("Sesión cerrada correctamente.");
                router.push("/login");
                return true;
            }
        } catch (err) {
            toast.error("Ocurrió un error inesperado. Por favor, intenta de nuevo.");
            return false;
        }
    };

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
