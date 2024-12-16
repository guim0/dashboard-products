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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { mockedList } from "../lib/mocked/list";
import { Button } from "@/components/ui/button";

export default function ListingPage() {
  const { status } = useSession();
  const { toast } = useToast();

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  // const handleAdd = (item: IProducts) => {
  //   if (status === "unauthenticated") {
  //     return toast({
  //       title: "You must be logged to create/add an item!",
  //       description: "Please click on Sign in to create a new item",
  //       action: (
  //         <ToastAction altText="Log in" asChild>
  //           <Link href={"/api/auth/signin"}>Log in</Link>
  //         </ToastAction>
  //       ),
  //     });
  //   }
  //   toast({
  //     title: `${item.name} has been added to cart`,
  //     description: "Check the Cart!",
  //   });
  //   cartList.push(item);
  // };

  console.log(mockedList[0]);
  return (
    <main className="w-full flex flex-col bg-slate-950 h-auto pb-10">
      <section className="flex container flex-wrap gap-8 mt-8">
        {mockedList.map((items) => (
          <Card key={items.id} className="min-w-[300px] max-w-[600px] w-full">
            <CardHeader>
              <CardTitle>{items.name}</CardTitle>
              <CardDescription>Manager: Ayrton Senna</CardDescription>
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

              <Button className="">Check for details -> </Button>
              </div>
             
            </CardFooter>
          </Card>
        ))}
      </section>
      {/* {status === "loading" ? (
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
          <section className="flex container justify-between mt-8">
            <h3 className="text-white text-2xl font-medium border-b-[1px] border-gray-700 ">
              Add Items to your card or Create a new one
            </h3>
            {status === "unauthenticated" ? (
              <Button
                variant="secondary"
                onClick={() => {
                  toast({
                    title: "You must be logged to create/add an item!",
                    description: "Please click on Sign in to create a new item",
                    action: (
                      <ToastAction altText="Log in" asChild>
                        <Link href={"/api/auth/signin"}>Log in</Link>
                      </ToastAction>
                    ),
                  });
                }}
              >
                Add More Items
              </Button>
            ) : (
              <div className="flex align-baseline gap-5">
                <Button asChild>
                  <Link href="/add">Create new Item</Link>
                </Button>

                <Button asChild>
                  <Link href="/cart">Go to Cart</Link>
                </Button>
              </div>
            )}
          </section>

          <Table className="text-white w-[80%] my-5 mx-auto">
            <TableHeader className="bg-gray-300">
              <TableRow>
                <TableHead>Item ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockedList?.map((items: IProducts, idx) => (
                <TableRow key={idx}>
                  <TableCell>{1 + idx}</TableCell>
                  <TableCell>{items.name}</TableCell>
                  <TableCell>{items.type}</TableCell>
                  <TableCell>{items.price}</TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => handleAdd(...[items])}>
                      Add to Card
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">${totalValue()}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </>
      )} */}
    </main>
  );
}
