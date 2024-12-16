export interface IProjects {
  id?: number;
  name: string;
  progress: unknown;
}

function generateMockData(numItems: number) {
  const mockData = [];
  let idCounter = 1;
  for (let i = 0; i < numItems; i++) {
    const name = `Project ${i + 1}`;

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

    const item: IProjects = {
      id: idCounter++,
      name: name,
      progress: progress,
    };

    mockData.push(item);
  }

  return mockData;
}
export const mockedList = generateMockData(4);

export const cartList: IProjects[] = [];
