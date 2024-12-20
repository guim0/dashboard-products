import { Badge } from "./ui/badge";

enum Status {
  Active = "active",
  Late = "late",
  Done = "done",
}
interface IStatusProject {
  status: Status | string;
}

export const StatusProject = ({ status }: IStatusProject) => {
  const statusStyles = {
    [Status.Active]: {
      text: "text-blue-500",
      bg: "bg-blue-200 hover:bg-blue-300",
      label: "Ativo",
    },
    [Status.Late]: {
      text: "text-red-500",
      bg: "bg-red-200 hover:bg-red-300",
      label: "Atrasado",
    },
    [Status.Done]: {
      text: "text-green-500",
      bg: "bg-green-200 hover:bg-green-300",
      label: "Concluído",
    },
  };

  const styles = statusStyles[status];

  if (!styles) {
    return <p className="text-red-500 font-bold">Status inválido!</p>;
  }

  return (
    <Badge
      className={`px-6 py-1 text-md  rounded-lg font-semibold text-center ${styles.text} ${styles.bg}`}
    >
      {styles.label}
    </Badge>
  );
};
