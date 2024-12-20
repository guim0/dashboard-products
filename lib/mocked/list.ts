export interface IProject {
  id: number;
  project_name: string;
  progress: {
    month: string;
    desktop: number;
    mobile: number;
  }[];
  start_date: Date | string;
  end_date: Date | string;
  manager: string;
  detail: {
    status: "active" | "late" | "done" | string;
    progress_percentage: number;
  };
  description: string;
}

export interface ICompany {
  id: number;
  company_name: string;
  projects: IProject[];
}

function generateMockData(numCompanies: number, projectsPerCompany: number) {
  const mockCompanies: ICompany[] = [];

  const statuses = ["active", "late", "done"];
  const maxUniqueProjectIds = 100;

  for (let i = 0; i < numCompanies; i++) {
    const companyName = `Company ${i + 1}`;
    const companyProjects: IProject[] = [];

    for (let j = 0; j < projectsPerCompany; j++) {
      const projectId = Math.floor(Math.random() * maxUniqueProjectIds) + 1;
      const projectName = `Project ${j + 1}`;

      const progress = Array.from({ length: 12 }, (_, monthIndex) => ({
        month: new Date(2024, monthIndex, 1).toLocaleString("en", {
          month: "long",
        }),
        desktop: Math.floor(Math.random() * 100) + 1,
        mobile: Math.floor(Math.random() * 100) + 1,
      }));

      const totalDesktop = progress.reduce((sum, p) => sum + p.desktop, 0);
      const totalMobile = progress.reduce((sum, p) => sum + p.mobile, 0);
      const progressPercentage = Math.round(
        (totalDesktop + totalMobile) / (progress.length * 2)
      );

      const today = new Date();
      const startDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - Math.floor(Math.random() * 365)
      );
      const endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + Math.floor(Math.random() * 180)
      );

      companyProjects.push({
        id: projectId,
        project_name: projectName,
        progress,
        start_date: startDate,
        end_date: endDate,
        manager: "Ayrton Senna",
        detail: {
          status: statuses[Math.floor(Math.random() * statuses.length)],
          progress_percentage: progressPercentage,
        },
        description: "This project aims to innovate the industry.",
      });
    }

    mockCompanies.push({
      id: i + 1,
      company_name: companyName,
      projects: companyProjects,
    });
  }

  const addProjectToCompany = (
    companyId: number,
    newProject: Omit<IProject, "id" | "progress"> & {
      progress?: { month: string; desktop: number; mobile: number }[];
    }
  ) => {
    const company = mockCompanies.find((comp) => comp.id === companyId);
    if (!company) {
      console.error(`No company found with ID: ${companyId}`);
      return;
    }

    const progress =
      newProject.progress ||
      Array.from({ length: 12 }, (_, monthIndex) => ({
        month: new Date(2024, monthIndex, 1).toLocaleString("en", {
          month: "long",
        }),
        desktop: Math.floor(Math.random() * 100) + 1,
        mobile: Math.floor(Math.random() * 100) + 1,
      }));

    const totalDesktop = progress.reduce((sum, p) => sum + p.desktop, 0);
    const totalMobile = progress.reduce((sum, p) => sum + p.mobile, 0);
    const progressPercentage = Math.round(
      (totalDesktop + totalMobile) / (progress.length * 2)
    );

    const projectWithId: IProject = {
      id: companyId,
      manager: newProject.manager,
      start_date: newProject.start_date,
      end_date: newProject.end_date,
      description: newProject.description,
      project_name: newProject.project_name,
      progress,
      detail: {
        status: "active",
        progress_percentage: progressPercentage,
      },
    };

    company.projects.push(projectWithId);
    console.log(
      `Project '${projectWithId.project_name}' added to '${company.company_name}'`
    );
  };

  const getCompanyDetails = (companyId: number) => {
    return mockCompanies.find((comp) => comp.id === companyId);
  };

  return {
    mockCompanies,
    addProjectToCompany,
    getCompanyDetails,
  };
}

export const { mockCompanies, addProjectToCompany, getCompanyDetails } =
  generateMockData(5, 5);
