"use client";

import React, {useEffect, useState} from "react";
import {
    FaHouse,
    FaArrowRightArrowLeft,
    FaMoneyBill,
    FaCalculator,
} from "react-icons/fa6";

import Link from "next/link";
import {usePathname} from "next/navigation";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
} from "@/components/ui/sheet";
import {RiBillLine} from "react-icons/ri";
import {Button} from "@/components/ui/button";
import {LuCreditCard} from "react-icons/lu";
import { FaHandHoldingUsd } from "react-icons/fa";

const Sidebar = ({sidebarOpen, setSidebarOpen}) => {
    const pathname = usePathname();

    const links1 = [
        {
            name: "Inicio",
            url: "/",
            icon: <FaHouse/>,
        },
        {
            name: "Cuentas",
            url: "/cuentas",
            icon: <FaMoneyBill/>,
        },
        {
            name: "Transferencias",
            url: "/transferencias",
            icon: <FaArrowRightArrowLeft/>,
        },
        {
            name: "Tarjetas",
            url: "/tarjetas",
            icon: <LuCreditCard />,
        },
        {
            name: "Conversor",
            url: "/conversor",
            icon: <FaCalculator/>,
        },
        {
            name: "Pago de servicios",
            url: "/pago-de-servicios",
            icon: <RiBillLine />,
        },

        {
            name: "Simular Prestamos",
            url: "/calculadora",
            icon: <FaHandHoldingUsd />
        },
    ];

    const links2 = [
        /* {
          name: "Configuración",
          url: "/configuracion",
          icon: <IoMdSettings />,
        }, */
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = () => {
        if(userMessage.length!=0){
            setShowToast(true);
        }
        setIsModalOpen(false);
        setUserMessage("");
    };

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    return (
        <>
            <aside
                className="hidden md:block md:w-[220px] lg:w-[300px] fixed bg-gray-200 mt-14 h-[calc(100vh-56px)] p-3">
                <nav className="flex flex-col justify-between h-full">
                    <NavLinks
                        links1={links1}
                        links2={links2}
                        pathname={pathname}
                        setSidebarOpen={setSidebarOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                </nav>
            </aside>
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetContent side="left" className="pt-12">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <img className="w-12" src="/logo.webp" alt="Rossum Logo"/>
                    <div className="pt-4 flex flex-col justify-between h-[calc(100%-30px)]">
                        <NavLinks
                            links1={links1}
                            links2={links2}
                            pathname={pathname}
                            setSidebarOpen={setSidebarOpen}
                            setIsModalOpen={setIsModalOpen}
                        />
                    </div>
                </SheetContent>
            </Sheet>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-[96%]">
                        <h2 className="text-lg font-bold">¿Cuál es el problema?</h2>
                        <textarea className="w-full mt-4 p-2 border rounded" rows="5" placeholder="Escriba su problema aquí..."
                                  value={userMessage}
                                  onChange={(e) => setUserMessage(e.target.value)}></textarea>
                        <div className="flex justify-end mt-4">
                            <Button
                                variant="outline"
                                className="mr-2"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button onClick={handleSubmit}>Enviar</Button>
                        </div>
                    </div>
                </div>
            )}

            {showToast && (
                <div className="fixed bottom-4 right-4 bg-green-800 text-white p-4 rounded-lg shadow-lg">
                    Recibimos tu mensaje. Te contactaremos pronto.
                </div>
            )}
        </>
    );
};

const NavLinks = ({links1, links2, pathname, setSidebarOpen, setIsModalOpen}) => {
    return (
        <>
            <div className="flex flex-col gap-1.5">
                {links1.map((link, index) => (
                    <Link key={index} href={link.url}>
                        <div
                            onClick={() => {
                                setSidebarOpen(false);
                            }}
                            className={`${
                                pathname === link.url
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-gray-300"
                            } rounded-lg py-0.5 px-3 w-full flex items-center gap-1.5`}
                        >
                            {link.icon}
                            {link.name}
                        </div>
                    </Link>
                ))}
            </div>
            <div className="flex flex-col gap-1.5">
                <Button
                    className="mt-4 w-full"
                    variant="link"
                    onClick={() => {
                        setSidebarOpen(false);
                        setIsModalOpen(true)
                    }}
                >
                    ¿Necesita ayuda?
                </Button>
                {links2.map((link, index) => (
                    <Link
                        onClick={(e) => {
                            setSidebarOpen(false);
                        }}
                        key={index}
                        href={link.url}
                    >
                        <div
                            className={`${
                                pathname === link.url
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-gray-300"
                            } rounded-lg py-0.5 px-3 w-full flex items-center gap-1.5`}
                        >
                            {link.icon}
                            {link.name}
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Sidebar;
