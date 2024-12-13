"use client"

import axios from "axios";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";

const BalanceList = () => {

    const [cuentas, setCuentas] = useState([])

    useEffect(() => {
        const token = Cookies.get("token");
        console.log({token})
        axios.get('http://localhost:8000/api/cuentas/token/', {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log({DATA_CUENTA: response.data})
            setCuentas(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return <>
        {/*
        {
            cuentas.map((cuenta, index) => {
                return <div key={index} className="bg-white p-4 shadow h-full rounded-xl max-w-4xl">
                    <h2 className="text-s font-semibold mb-1">{cuenta.tipo_cuenta.nombre_tipo_cuenta} ({cuenta.tipo_cuenta.moneda}) </h2>
                    <span className="text-2xl font-bold text-primary">
                  ${cuenta.saldo}
                </span>
                </div>
            })
        }*/}
        {
            cuentas.length > 0 && (
                <div className="bg-white p-4 shadow h-full rounded-xl max-w-4xl">
                    <h2 className="text-s font-semibold mb-1">
                        {cuentas[0].tipo_cuenta.nombre_tipo_cuenta} ({cuentas[0].tipo_cuenta.moneda})
                    </h2>
                    <span className="text-2xl font-bold text-primary">
                ${cuentas[0].saldo}
            </span>
                </div>
            )
        }

    </>

}

export default BalanceList