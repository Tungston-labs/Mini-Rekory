import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
 import { getDepartments, addDepartment, } from "../services/HrServices/departmentService";

let dummyDepartments = [
  { id: "1", name: "Development", code: "DEV" },
  { id: "2", name: "Human Resources", code: "HR" },
  { id: "3", name: "Finance", code: "FIN" },
];

export const useDepartments = () =>
  useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return dummyDepartments;
    },
  });


export const useAddDepartment = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const newDept = { ...payload, id: Date.now().toString() };
      dummyDepartments.push(newDept); 
      return newDept;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};
