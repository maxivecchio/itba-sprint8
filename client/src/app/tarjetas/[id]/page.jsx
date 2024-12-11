"use client";

import {notFound, useRouter} from 'next/navigation';
import {useTarjetas} from '@/lib/hooks/useTarjetas';
import Link from "next/link";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {buttonVariants} from "@/components/ui/button";

const TarjetaDetailsPage = ({params}) => {
    const [tarjetas] = useTarjetas();
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
    }, [tarjetas, params.id]);

    return (
        <div className="container mx-auto p-6 bg-white rounded-md shadow-lg">
            <Link href="/tarjetas" className={`${buttonVariants({variant: "link"})} !p-0`}>
                Volver a tarjetas
            </Link>
            {tarjeta ? (
                <>
                    <h1 className="text-3xl font-bold mb-4">{tarjeta.nombre}</h1>
                    <p>Límite actual: ${tarjeta.limite}</p>
                    <p>Deuda: ${tarjeta.deuda}</p>
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <Link
                            href={`/tarjetas/${tarjeta.id}/pago`}
                            className={buttonVariants({variant: "outline"})}
                        >
                            Realizar pago
                        </Link>
                        <Link
                            href={`/tarjetas/${tarjeta.id}/aumento`}
                            className={buttonVariants({variant: "outline"})}
                        >
                            Solicitar aumento de límite
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <Skeleton className="h-12 w-40 mb-4"/>
                    <Skeleton className="h-6 w-24 mb-2"/>
                    <Skeleton className="h-6 w-32 mb-2"/>
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-28"/>
                        <Skeleton className="h-6 w-56"/>
                    </div>
                </>
            )}
        </div>
    );
};

export default TarjetaDetailsPage;
