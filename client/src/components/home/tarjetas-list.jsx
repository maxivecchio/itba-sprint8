"use client"

import axios from "axios";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";

const TarjetasList = () => {

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
            setTarjetas([
                {
                    "id_tarjeta": 1,
                    "numero": "7998",
                    "cvv": 458,
                    "fecha_otorgamiento": "2024-12-13",
                    "fecha_expiracion": "2027-12-13",
                    "tipo": "Débito",
                    "marca": "Visa"
                },
                {
                    "id_tarjeta": 1,
                    "numero": "7998",
                    "cvv": 458,
                    "fecha_otorgamiento": "2024-12-13",
                    "fecha_expiracion": "2027-12-13",
                    "tipo": "Débito",
                    "marca": "Visa"
                }
            ]);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return <>
        <div className={"flex flex-col gap-4"}>
            {tarjetas.slice(0, 2).map((tarjeta, index) => {
                return (
                    <div key={index} className="bg-gray-100 p-4 rounded shadow">
                        <div>{tarjeta.marca} {tarjeta.tipo}</div>
                        <div className="font-mono">**** **** **** {tarjeta.numero}</div>
                        <div className="font-mono">
                            Exp. {new Date(tarjeta.fecha_expiracion).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' })}
                        </div>
                    </div>
                );
            })}
        </div>
        {tarjetas.length > 2 && (
            <p className="text-blue-700 mt-2 cursor-pointer">
                Hace click para ver todas
            </p>
        )}
    </>

}

export default TarjetasList