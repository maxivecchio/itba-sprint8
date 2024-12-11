"use client";

import {useTarjetas} from "@/lib/hooks/useTarjetas";
import Link from "next/link";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {buttonVariants} from "@/components/ui/button"; // Asegúrate de tener esta función disponible

const TarjetasPage = () => {
    const [tarjetas] = useTarjetas();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Tarjetas de Crédito</h1>
            <ul className="space-y-4">
                {tarjetas.map((tarjeta) => (
                    <li key={tarjeta.id}>
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">{tarjeta.nombre}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Límite: ${tarjeta.limite}</p>
                                <p>Deuda: ${tarjeta.deuda}</p>
                                <Link
                                    href={`/tarjetas/${tarjeta.id}`}
                                    className={`${buttonVariants({variant: "outline"})} mt-4`}
                                >
                                    Ver detalles
                                </Link>
                            </CardContent>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TarjetasPage;
