"use client";

import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { NewProjectModal } from "@/components/NewProjectModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastAction } from "@/components/ui/toast";
import { getCompanyDetails, ICompany, mockCompanies } from "@/lib/mocked/list";
import { chartConfig } from "@/lib/utils/chartConfigOnCard";
import Link from "next/link";

export default function ListingPage() {
  const { status } = useSession();
  const { toast } = useToast();
  const data = mockCompanies;

  const quantityOfProjects = (id: number) => {
    const dataProject = getCompanyDetails(id);
    return dataProject?.projects.length;
  };

  return (
    <main className="w-full flex flex-col bg-slate-950 h-auto pb-10">
      <section className="flex container flex-wrap gap-8 mt-8">
        {data.map((items: ICompany) => (
          <Card
            key={crypto.randomUUID()}
            className="min-w-[300px] max-w-[600px] w-full"
          >
            <CardHeader>
              <CardTitle>{items.company_name}</CardTitle>
              <CardDescription>
                Projetos desta empresa: {quantityOfProjects(items.id ?? 0)}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart
                  data={items.projects[0].progress}
                  layout="vertical"
                  margin={{
                    left: -20,
                  }}
                >
                  <XAxis type="number" dataKey="desktop" hide />
                  <YAxis
                    dataKey="month"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={5}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                Powered by @
                <div className="flex gap-2">
                  {status !== "loading" ? (
                    <>
                      <Dialog>
                        <DialogTrigger disabled={status !== "authenticated"}>
                          <Button disabled={status !== "authenticated"}>
                            Criar novo projeto
                          </Button>
                        </DialogTrigger>
                        <NewProjectModal id={items.id ?? 0} />
                      </Dialog>
                      <Button
                        onClick={() =>
                          status === "unauthenticated"
                            ? toast({
                                title: "Olá visitante! 🖖🏽",
                                description:
                                  "Faça o login no sistema para ver os detalhes do seu projeto 😁",
                                action: (
                                  <ToastAction altText="Log in" asChild>
                                    <Link href={"/api/auth/signin"}>
                                      Log in
                                    </Link>
                                  </ToastAction>
                                ),
                              })
                            : null
                        }
                      >
                        {status === "authenticated" ? (
                          <Link prefetch href={`admin/project/${items.id}`}>
                            <span>Veja os projetos {"->"}</span>
                          </Link>
                        ) : (
                          <span>Login necessário</span>
                        )}
                      </Button>
                    </>
                  ) : (
                    <Skeleton className="bg-slate-900 w-[140px] h-[40px]" />
                  )}
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}
