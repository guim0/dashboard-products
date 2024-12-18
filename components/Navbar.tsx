"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BurgerIcon from "@/public/burger-menu.svg";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "./ui/button";

import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

import { Avatar, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  const { data, status } = useSession();

  return (
    <main className="grow px-10 bg-slate-950 border-b-[1px] border-gray-200 py-4 text-white">
      <section className="flex justify-between  items-center">
        <div>
          {status === "unauthenticated" ? (
            <h2 className="text-2xl">Gerenciamento de projetos</h2>
          ) : status !== "loading" ? (
            <div className="flex items-center gap-2">
              <div className="text-2xl">Bem vindo, {data?.user?.name}.</div>
              <Avatar>
                <AvatarImage src={data?.user?.image ?? ""} alt="user" />
              </Avatar>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-[20px] w-[20px] rounded" />
            </div>
          )}
        </div>

        {status === "loading" ? (
          <Skeleton className="h-4 w-[330px]" />
        ) : (
          <div className="mr-8">
            {status === "unauthenticated" ? (
              <Button variant="secondary" asChild>
                <Link href={"/api/auth/signin"}>Log in</Link>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="secondary" size="icon">
                    <Image src={BurgerIcon} alt="Menu" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Páginas</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {status === "authenticated" && (
                    <DropdownMenuItem asChild>
                      <Link href="/project/add"> Novo projeto</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/">Projetos</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button variant="destructive" asChild>
                      <Link href={"/api/auth/signout"}>Sair</Link>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Navbar;
