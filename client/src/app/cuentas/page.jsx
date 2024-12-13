"use client";

import {useBankAccounts} from '@/lib/hooks/useBankAccounts';
import Link from 'next/link';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function AccountsPage() {
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

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Lista de Cuentas Bancarias</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cuentas?.length > 0 ? cuentas.map((cuenta, index) => (
                    <Card key={index} className="shadow-lg">
                        <CardHeader>
                            <CardTitle>{cuenta.tipo_cuenta.nombre_tipo_cuenta} ({cuenta.tipo_cuenta.moneda})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-semibold text-gray-700">
                                Saldo: <span className="text-green-600">${cuenta.saldo}</span>
                            </p>
                        </CardContent>
                    </Card>
                )) :
                [...Array(3)].map((_, index) => (
                    <Skeleton className={"h-44"} key={index} />
                ))
                }
            </div>
        </div>
    );
}
