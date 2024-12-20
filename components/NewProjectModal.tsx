import {
  addProjectToCompany,
  getCompanyDetails,
  IProject,
} from "@/lib/mocked/list";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";

interface INewProjectForm {
  projectName: string;
  startDate: string;
  endDate: string;
  description: string;
  responsible: string;
}

export const NewProjectModal = ({ id }: { id: number }) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<INewProjectForm>();

  const startDate = watch("startDate");
  const { company_name } = getCompanyDetails(id);
  const onSubmit = (data: IProject) => {
    addProjectToCompany(id, data);
    toast({
      title: ` Novo Projeto Criado com sucesso! ✅`,
      description: `Clique abaixo para acessar os projetos de ${company_name}`,
      action: (
        <ToastAction altText="Check in" asChild>
          <Link href={`/admin/project/${id}`}>Acessar</Link>
        </ToastAction>
      ),
      duration: 13000,
    });
  };

  return (
    <AlertDialogContent className="py-6">
      <AlertDialogHeader>
        <AlertDialogTitle>Crie seu novo projeto</AlertDialogTitle>
        <AlertDialogDescription>
          Preencha os campos abaixo para criar um novo projeto.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <form
        onSubmit={handleSubmit(onSubmit as any)}
        className="flex flex-col gap-4"
      >
        <div>
          <label htmlFor="projectName" className="capitalize mb-1 block">
            Nome do Projeto
          </label>
          <Input
            type="text"
            id="projectName"
            {...register("projectName", {
              required: "O nome do projeto é obrigatório.",
              maxLength: { value: 50, message: "Máximo de 50 caracteres." },
            })}
          />
          {errors.projectName && (
            <p className="text-red-500 text-[12px] mt-2">
              {errors.projectName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="startDate" className="capitalize mb-1 block">
            Data de início
          </label>
          <Input
            type="date"
            id="startDate"
            {...register("startDate", {
              required: "A data de início é obrigatória.",
            })}
          />
          {errors.startDate && (
            <p className="text-red-500 text-[12px] mt-2">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="endDate" className="capitalize mb-1 block">
            Data limite
          </label>
          <Input
            type="date"
            id="endDate"
            {...register("endDate", {
              required: "A data de fim é obrigatória.",
              validate: (value) =>
                new Date(value) >= new Date(startDate) ||
                "A data de fim não pode ser anterior à data de início.",
            })}
          />
          {errors.endDate && (
            <p className="text-red-500 text-[12px] mt-2">
              {errors.endDate.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="capitalize mb-1 block">
            Descrição do projeto
          </label>
          <Textarea
            id="description"
            {...register("description", {
              required: "A descrição é obrigatória.",
              maxLength: { value: 500, message: "Máximo de 500 caracteres." },
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-[12px] mt-2">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="responsible" className="capitalize mb-1 block">
            Responsável pelo projeto
          </label>
          <Controller
            name="responsible"
            control={control}
            rules={{
              required: "O responsável é obrigatório.",
              validate: (value) =>
                ["Ayrton Senna", "Mike Tyson", "Elon Musk"].includes(value) ||
                "Responsável inválido.",
            }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione um responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ayrton Senna">Ayrton Senna</SelectItem>
                  <SelectItem value="Mike Tyson">Mike Tyson</SelectItem>
                  <SelectItem value="Elon Musk">Elon Musk</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.responsible && (
            <p className="text-red-500 text-[12px] mt-2">
              {errors.responsible.message}
            </p>
          )}
        </div>

        <AlertDialogFooter className="flex justify-end gap-2">
          <Button type="submit">Criar novo Projeto</Button>
          <AlertDialogCancel className="bg-red-300 text-red-600 font-bold hover:bg-red-400 hover:text-red-700">
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  );
};
