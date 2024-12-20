"use client";
import { StatusProject } from "@/components/StatusProject";
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
import { Skeleton } from "@/components/ui/skeleton";
import { getCompanyDetails } from "@/lib/mocked/list";
import { chartConfig } from "@/lib/utils/chartConfigOnCard";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

export default function ProjectDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const { status } = useSession();
  const data = getCompanyDetails(+`${params?.id}`);

  console.log(data);

  return (
    <main className="w-full flex flex-col bg-slate-950 h-auto pb-10">
      {status === "loading" ? (
        <section className="w-full items-center flex flex-col gap-6 my-[25vh]">
          <Skeleton className="h-4 w-[800px]" />
          <Skeleton className="h-4 w-[800px]" />
          <Skeleton className="h-4 w-[800px]" />
          <Skeleton className="h-4 w-[800px]" />
          <Skeleton className="h-4 w-[800px]" />
          <Skeleton className="h-4 w-[800px]" />
        </section>
      ) : (
        <>
          <Link href={"/"} className="text-5xl text-white px-3 mt-3 font-light">
            {" < "}
          </Link>
          <section className="flex container flex-wrap gap-8 mt-8">
            {data?.projects.map((items) => (
              <Card
                key={items.id}
                className="min-w-[300px] max-w-[600px] w-full"
              >
                <CardHeader>
                  <CardTitle>{items.project_name}</CardTitle>
                  <CardDescription>
                    <div className="flex justify-between ">
                      Manager: {items.manager}
                      <div className="flex flex-col items-center">
                        <span>Status do projeto</span>
                        <StatusProject status={items.detail.status} />
                      </div>{" "}
                    </div>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      data={items.progress as any}
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
                  </div>
                </CardFooter>
              </Card>
            ))}
          </section>
        </>
      )}
    </main>
  );
}
