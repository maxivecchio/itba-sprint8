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
                const token = Cookies.get("token");
                if (token) {
                    console.log({token})
                    const res = await axios.get("http://localhost:8000/api/auth/user/", {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    });
                    if (res.status === 200) {
                        console.log({data: res.data})
                        setUser(res.data);
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, []);

    const login = async (username, password) => {
        try {
            const res = await axios.post("http://localhost:8000/api/auth/login/", {
                username,
                password,
            });

            if (res.status === 200) {
                const token = res.data.token;

                Cookies.set("token", token, { expires: 7 });

                const userRes = await axios.get("http://localhost:8000/api/auth/user/", {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                if (userRes.status === 200) {
                    setUser(userRes.data);
                    Cookies.set("user", JSON.stringify(userRes.data), { expires: 7 });
                    toast.success("Sesión iniciada correctamente.");
                    return true;
                }
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
