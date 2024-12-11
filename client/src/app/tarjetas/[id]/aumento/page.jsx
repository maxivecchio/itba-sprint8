"use client";

import {useEffect, useState} from "react";
import {useTarjetas} from '@/lib/hooks/useTarjetas';
import {notFound, useRouter} from 'next/navigation';
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

const AumentoPage = ({params}) => {
    const [tarjetas, updateTarjetas] = useTarjetas();
    const [nuevoLimite, setNuevoLimite] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const [tarjeta, setTarjeta] = useState(null);

    useEffect(() => {
        if (tarjetas.length > 0) {
            const tarjetaFound = tarjetas.find(tarjetaSearch => tarjetaSearch.id === params.id);
            console.log({tarjetas, tarjetaFound});
            if (!tarjetaFound) {
                return notFound();
            }
            setTarjeta(tarjetaFound);
        }
    }, [tarjetas, params.id, router]);

    const handleAumento = (e) => {
        e.preventDefault();

        const limiteAumento = parseFloat(nuevoLimite);
        if (isNaN(limiteAumento) || limiteAumento <= tarjeta.limite) {
            setMessage('El nuevo límite debe ser mayor al actual.');
            return;
        }

        tarjeta.limite = limiteAumento;

        updateTarjetas([...tarjetas]);
        setMessage(`Aumento de límite aprobado. Nuevo límite: $${tarjeta.limite}`);
        setNuevoLimite('');
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-md shadow-lg">
            <Link href={`/tarjetas/${params.id}`} className={`${buttonVariants({variant: "link"})} !p-0`}>
                Volver atrás
            </Link>
            {tarjeta ? (
                <>
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Solicitar Aumento de Límite</h1>
                    <p className="text-lg mb-6 text-gray-600">Límite actual: <span
                        className="font-semibold">${tarjeta.limite}</span></p>
                    <form onSubmit={handleAumento} className="space-y-6">
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Nuevo límite:
                            </label>
                            <Input
                                type="number"
                                value={nuevoLimite}
                                onChange={(e) => setNuevoLimite(e.target.value)}
                                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md shadow-sm"
                                placeholder="Ingresa el nuevo límite"
                            />
                        </div>
                        <button type="submit" className={buttonVariants({variant: "default"})}>
                            Solicitar aumento
                        </button>
                    </form>
                    {message && (
                        <p className="mt-6 text-lg font-semibold text-green-600">
                            {message}
                        </p>
                    )}
                </>
            ) : (
                <>
                    <Skeleton className="h-12 w-40 mb-6"/>
                    <Skeleton className="h-6 w-24 mb-4"/>
                    <Skeleton className="h-6 w-32 mb-4"/>
                    <div className="flex gap-4">
                        <Skeleton className="h-6 w-28"/>
                        <Skeleton className="h-6 w-56"/>
                    </div>
                </>
            )}
        </div>
    );
};

export default AumentoPage;
