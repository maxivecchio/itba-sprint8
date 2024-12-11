"use client";

import { useEffect, useState } from "react";
import { useTarjetas } from '@/lib/hooks/useTarjetas';
import { notFound, useRouter } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Input de shadcn

const PagoPage = ({ params }) => {
    const [tarjetas, updateTarjetas] = useTarjetas();
    const [monto, setMonto] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const [tarjeta, setTarjeta] = useState(null);

    useEffect(() => {
        if (tarjetas.length > 0) {
            const tarjetaFound = tarjetas.find(tarjetaSearch => tarjetaSearch.id === params.id);
            console.log({ tarjetas, tarjetaFound });
            if (!tarjetaFound) {
                return notFound();
            }
            setTarjeta(tarjetaFound);
        }
    }, [tarjetas, params.id, router]);

    const handlePago = (e) => {
        e.preventDefault();

        const montoPago = parseFloat(monto);
        if (isNaN(montoPago) || montoPago <= 0) {
            setMessage('El monto ingresado no es válido');
            return;
        }

        tarjeta.deuda -= montoPago;

        updateTarjetas([...tarjetas]);
        setMessage(`Pago de $${montoPago} realizado con éxito. Deuda actual: $${tarjeta.deuda}`);
        setMonto('');
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-md shadow-lg">
            <Link href={`/tarjetas/${params.id}`} className={`${buttonVariants({variant: "link"})} !p-0`}>
                Volver atrás
            </Link>
            {tarjeta ? (
                <>
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Realizar Pago</h1>
                    <p className="mb-6 text-lg text-gray-600">Deuda actual: <span className="font-semibold">${tarjeta.deuda}</span></p>
                    <form onSubmit={handlePago} className="space-y-6">
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Monto a pagar:
                            </label>
                            <Input
                                type="number"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md shadow-sm"
                                placeholder="Ingresa el monto"
                            />
                        </div>
                        <button type="submit" className={buttonVariants({ variant: "default" })}>
                            Pagar
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
                    <Skeleton className="h-12 w-40 mb-6" />
                    <Skeleton className="h-6 w-24 mb-4" />
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="flex gap-4">
                        <Skeleton className="h-6 w-28" />
                        <Skeleton className="h-6 w-56" />
                    </div>
                </>
            )}
        </div>
    );
};

export default PagoPage;
