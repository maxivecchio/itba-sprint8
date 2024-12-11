import "./globals.css";
import {LayoutProvider} from "@/app/layout-provider";
import {Toaster} from "@/components/ui/sonner";
import {UserProvider} from "@/context/UserContext";
import {Poppins} from "next/font/google";  // Add this line

const poppins = Poppins({subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']});

export const metadata = {
    title: " Rossum | Homebanking",
    description: "Generated by create next app",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body
            className={`${poppins.className} antialiased`}
        >
        <UserProvider>
            <LayoutProvider>{children}</LayoutProvider>
            <Toaster/>
        </UserProvider>
        </body>
        </html>
    );
}
