import {buttonVariants} from "@/components/ui/button";
import Link from 'next/link'

export default function NotFoundPage() {

    return (
        <div className="min-h-svh flex flex-col items-center justify-center bg-gray-50 p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">404 <br/> Página no encontrada</h1>
            <p className="text-gray-600 text-lg mb-8">
                Lo sentimos, la página que estás buscando no existe.
            </p>
            <Link
                className={`${buttonVariants()}`}
                href="/"
            >
                Volver a la página principal
            </Link>
        </div>
    );
}
