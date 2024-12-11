import React from "react";
import {FaUser} from "react-icons/fa";
import {TiThMenu} from "react-icons/ti";
import {MdOutlineLogin} from "react-icons/md";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {useUser} from "@/context/UserContext";

import {Button, buttonVariants} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";


const Header = ({toggleSidebar}) => {
    const {user, logout} = useUser();
    /*console.log(user)*/
    return (
        <header className="fixed w-full z-50 p-3 bg-[#1a1a1a] h-14 flex items-center justify-between	 text-white">
            <div className="flex items-center">
                <Button
                    variant="ghost"
                    className="bg-transparent mr-2 md:hidden"
                    onClick={toggleSidebar}
                >
                    <TiThMenu/>
                </Button>
                <img className="h-7" src="/logo.webp" alt="Rossum Logo"/>
                <span className="font-bold ml-2 text-lg hidden md:inline-block">
          <span className="logo_name">Rossum | </span>HomeBanking
        </span>
            </div>
            <DropdownMenu>
                {
                    user && user.firstname && user.lastname ?
                        <DropdownMenuTrigger
                            className={`${buttonVariants({
                                variant: "outline",
                            })} bg-transparent`}
                        >
                            <FaUser/><span className="ml-2">{user?.firstname} {user?.lastname}</span>
                        </DropdownMenuTrigger>
                        :
                        <Skeleton className={"w-40 h-10"} />
                }
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <span>Mi cuenta</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={logout}>
                        <MdOutlineLogin/> <span className="ml-2">Cerrar Sesión</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default Header;
