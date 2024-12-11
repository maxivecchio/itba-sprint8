import Link from "next/link"
import {Component as GastosAnual} from "@/components/shared/bar-chart";
import {Component as GraficoGastos} from "@/components/shared/radial-chart";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen ">
            <div className="flex-grow">
                <h1 className="sr-only">Home Banking</h1>
                <main className="grid grid-cols-4 xl:grid-cols-5 gap-4 container mx-auto sm:p-4 bg-gray-100 rounded-xl">
                    <section className="col-span-4 md:col-span-2 xl:col-span-1">
                        <Link href="/cuentas">
                            <div className="bg-white p-4 shadow h-full rounded-xl max-w-4xl">
                                <h2 className="text-s font-semibold mb-1">Mi balance</h2>
                                <span className="text-2xl font-bold text-primary">
                $43.521,08
              </span>
                            </div>
                        </Link>
                    </section>


                    <section className="col-span-4 md:col-span-2 h-full bg-white p-4 shadow rounded-xl">
                        <Link href="/tarjetas">
                            <div className="bg-gray-100 p-4 rounded shadow">
                                <div>Tarjeta VISA</div>
                                <div className="font-mono">**** **** **** 7525</div>
                            </div>
                            <div className="bg-gray-100 mt-4 p-4 rounded shadow">
                                <div>Tarjeta MasterCard</div>
                                <div className="font-mono">**** **** **** 8321</div>
                            </div>
                        </Link>
                    </section>

                    <section className="col-span-4 xl:col-span-2">
                        <Link href="/transferencias">
                            <div className="bg-white p-4 h-full rounded-xl max-w-4xl">
                                <h2 className="text-xl font-semibold">Últimos movimientos</h2>
                                <div className="space-y-2">
                                    <div className="flex-col sm:flex-row flex justify-between sm:items-center">
                                        <div>Transferencia recibida</div>
                                        <div className="text-green-500 font-medium">
                                            + $79.000,00
                                        </div>
                                    </div>
                                    <div className="flex-col sm:flex-row flex justify-between sm:items-center">
                                        <div>Insumos médicos</div>
                                        <div className="text-red-500 font-medium">- $5.120,45</div>
                                    </div>
                                    <div className="flex-col sm:flex-row flex justify-between sm:items-center">
                                        <div>Electrodomésticos</div>
                                        <div className="text-red-500 font-medium">
                                            - $340.000,40
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </section>

                    <section className="col-span-4 xl:col-span-3">
                        <div className="bg-white p-4 shadow rounded-xl max-w-4xl">
                            <h2 className="text-xl font-semibold">Mi Gasto - 2024</h2>
                            <GastosAnual/>
                        </div>
                    </section>

                    <section className="col-span-4 xl:col-span-2">
                        <div className="bg-white h-full p-4 shadow rounded-xl max-w-4xl">
                            <h2 className="text-xl font-semibold">Limite Crediticio</h2>
                            <GraficoGastos/>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
