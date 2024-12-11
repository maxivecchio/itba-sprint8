"use client";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useRouter} from "next/navigation";
import {useUser} from "@/context/UserContext";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const {login} = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const success = await login(username, password);
        if (success) {
            router.push("/"); // Redirigir al home si el login es exitoso
        } else {
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-700">
            <div
                className="relative flex flex-col m-6 space-y-8 bg-black shadow-2xl rounded-2xl md:flex-row md:space-y-0 w-full max-w-5xl">
                <div className="flex flex-col justify-center p-8 md:p-14 w-full md:max-w-md">
                    <div className="flex">
                        <img className="h-6 w-12" src="/logo.webp" alt="Rossum Logo" loading="lazy"/>
                        <span className="font-bold ml-2 text-lg hidden md:inline-block text-white">
              <span className="logo_name text-white">Rossum | </span>HomeBanking
            </span>
                    </div>

                    <form onSubmit={handleLogin} className="gap-y-4">
                        <div className={"text-white opacity-60 p-2 bg-white/20 rounded-lg mt-2"}>
                            <span className="font-semibold">Credenciales de prueba:</span> <br/>
                            <div className={"flex flex-col sm:flex-row sm:gap-4"}>
                            <span>
              User: juliana.martinez
              </span>
                                <span>
              Passowrd: Password123
                </span>
                            </div>
                        </div>
                        <div className="my-2">
                            <Label htmlFor="user" className="text-white">Usuario</Label>
                            <Input
                                id="user"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="my-2">
                            <Label htmlFor="password" className="text-white">Contraseña</Label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <Button type="submit" className="mt-4">Iniciar sesión</Button>
                    </form>
                </div>

                <div className="relative">
                    <img
                        src="/oficina.avif"
                        alt="img"
                        className="h-full w-full hidden rounded-r-2xl md:block object-cover"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
