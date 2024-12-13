"use client";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";

const TarjetasPage = () => {
    const [tarjetas, setTarjetas] = useState([])

    useEffect(() => {
        const token = Cookies.get("token");
        console.log({token})
        axios.get('http://localhost:8000/api/tarjetas/token/', {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log({DATA_CUENTA: response.data})
            setTarjetas(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Tarjetas de Crédito</h1>
            <ul className="space-y-4">
                {tarjetas.map((tarjeta) => (
                    <li key={tarjeta.id}>
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">{tarjeta.marca} {tarjeta.tipo}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="font-mono">**** **** **** {tarjeta.numero}</div>
                                Exp. {new Date(tarjeta.fecha_expiracion).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' })}
                            </CardContent>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TarjetasPage;
