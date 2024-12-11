"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Conversor = () => {
    const [amountARS, setAmountARS] = useState(0);
    const [amountUSD, setAmountUSD] = useState(0);
    const [dolarType, setDolarType] = useState("");
    const [error, setError] = useState("");
    const [dolarOptions, setDolarOptions] = useState([]);
    const [userHasInput, setUserHasInput] = useState(false);

    useEffect(() => {
        axios
            .get("https://dolarapi.com/v1/dolares")
            .then((response) => {
                const data = response.data;
                setDolarOptions(data);
                setDolarType(data[0]?.casa || "");
            })
            .catch((err) => {
                setError("Error al obtener las tasas de dólar");
                console.error(err);
                l;
            });
    }, []);

    const handleConversion = (
        value,
        fromCurrency,
        toCurrency,
        setFromCurrency,
        setToCurrency,
        rate
    ) => {
        setFromCurrency(value);
        setUserHasInput(true);

        if (value === "" || isNaN(value) || value <= 0) {
            setError("Por favor, ingrese un número válido");
            setToCurrency(0);
            return;
        }

        setError("");

        if (rate) {
            const result = fromCurrency === "ARS" ? value / rate : value * rate;
            setToCurrency(result.toFixed(3));
        } else {
            setError("Tipo de dólar no disponible");
        }
    };

    const handleARSChange = (e) => {
        const value = e.target.value;
        const selectedRate = dolarOptions.find(
            (option) => option.casa === dolarType
        )?.venta;

        handleConversion(
            value,
            "ARS",
            "USD",
            setAmountARS,
            setAmountUSD,
            selectedRate
        );
    };

    const handleUSDChange = (e) => {
        const value = e.target.value;
        const selectedRate = dolarOptions.find(
            (option) => option.casa === dolarType
        )?.venta;

        handleConversion(
            value,
            "USD",
            "ARS",
            setAmountUSD,
            setAmountARS,
            selectedRate
        );
    };

    useEffect(() => {
        if (dolarType && userHasInput) {
            const selectedRate = dolarOptions.find(
                (option) => option.casa === dolarType
            )?.venta;
            handleConversion(
                amountARS,
                "ARS",
                "USD",
                setAmountARS,
                setAmountUSD,
                selectedRate
            );
        }
    }, [dolarType]);

    /*console.log(dolarOptions);*/

    if (!dolarOptions.length) {
        return null;
    }

    return (
        <div className="mt-10 rounded-lg">
            <div className="flex gap-10 flex-col-reverse lg:flex-row">
                <div className="lg:max-w-xl w-full">
                    <h2 className="text-2xl font-bold mb-4 text-left">Valor del Dólar</h2>
                    <div className="gap-2.5 flex flex-col">
                        {dolarOptions.map((option) => (
                            <div
                                className="border-t-2 p-1.5 bg-white rounded border-primary flex items-center justify-between"
                                key={option.casa}
                            >
                                <div className="flex-1 text-center text-sm lg:text-md">
                                    {option.nombre === "Contado con liquidación"
                                        ? "Dólar Contado con liqui."
                                        : "Dólar " + option.nombre}
                                </div>
                                <div className="flex-1 text-center flex items-center justify-center flex-col">
                                    <span className="text-xs">Compra</span>
                                    <span className="text-lg font-semibold text-primary">
                    ${option.compra}
                  </span>
                                </div>
                                <div className="flex-1 text-center flex items-center justify-center flex-col">
                                    <span className="text-xs">Venta</span>
                                    <span className="text-lg font-semibold text-primary">
                    ${option.venta}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-left">
                        Conversor de monedas
                    </h2>
                    <div className="lg:bg-white rounded-lg lg:p-8">
                        <div className="flex mb-4">
                            <div className="border-2 flex w-full rounded-lg">
                                <input
                                    type="number"
                                    value={amountARS}
                                    onChange={handleARSChange}
                                    className="w-full p-2 border-gray-300 rounded-lg outline-none"
                                    placeholder="Cantidad en ARS"
                                />
                                <div className="flex items-center font-medium justify-center w-64 px-3 bg-gray-100 rounded">
                                    ARS
                                </div>
                            </div>
                        </div>
                        <div className="flex ">
                            <div className="border-2 flex w-full rounded-lg">
                                <input
                                    type="number"
                                    value={amountUSD}
                                    onChange={handleUSDChange}
                                    className="w-full p-2 outline-none rounded-lg"
                                    placeholder="Cantidad en USD"
                                />
                                {dolarType && (
                                    <Select
                                        onValueChange={(value) => setDolarType(value)}
                                        defaultValue={dolarType}
                                    >
                                        <SelectTrigger className="font-medium border-none w-64 px-3 bg-gray-100">
                                            <SelectValue placeholder="Selecciona el tipo de dólar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dolarOptions.map((option) => (
                                                <SelectItem key={option.casa} value={option.casa}>
                                                    {option.nombre === "Contado con liquidación"
                                                        ? "Dólar Contado con liqui."
                                                        : "Dólar " + option.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                        </div>
                        {error && <p className="m-0 mt-3 text-red-500">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Conversor;
