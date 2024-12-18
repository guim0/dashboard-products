import { ChartConfig } from "@/components/ui/chart";

export const chartConfig = {
  desktop: {
    label: <div className="block mr-2"> Progresso do mês (%): </div>,
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
