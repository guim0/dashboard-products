export interface IProjects {
  id?: number;
  project_name: string;
  company_name: string;
  progress: unknown;
  detail?: {
    status: "active" | "late" | "done" | string;
    progress_percentage: number;
  };
}

function generateMockData(numItems: number) {
  const mockData: any = [];

  for (let i = 0; i < numItems; i++) {
    const name = `Project ${i + 1}`;
    const company = `Empresa ${i + 1}`;

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const progress = months.map((month) => {
      return {
        month: month,
        desktop: Math.floor(Math.random() * 100) + 1,
        mobile: Math.floor(Math.random() * 100) + 1,
      };
    });

    const statuses = ["active", "late", "done"];

    // IDs repetidos baseados no total de IDs únicos
    const maxUniqueIds = 5; // Quantidade máxima de IDs únicos
    const randomId = Math.floor(Math.random() * maxUniqueIds) + 1; // IDs de 1 a maxUniqueIds

    const item: IProjects = {
      company_name: company,
      id: randomId,
      project_name: name,
      progress: progress,
      detail: {
        status: statuses[Math.floor(Math.random() * statuses.length)],
        progress_percentage: Math.floor(Math.random() * 101),
      },
    };

    mockData.push(item);
  }

  const itemDetail = (id: number) => {
    return mockData?.filter((item: { id: number }) => item.id === id);
  };

  return { mockData, itemDetail };
}
export const { mockData } = generateMockData(10);
export const { itemDetail: getProjectDetail } = generateMockData(10);
export const cartList: IProjects[] = [];
