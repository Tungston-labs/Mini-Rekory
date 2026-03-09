import {useInfiniteQuery, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDepartments, addDepartment } from "../../services/HrServices/departmentService";

export const useDepartments = () => {
  return useInfiniteQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.current_page < lastPage.total_pages) {
        return lastPage.current_page + 1;
      } else {
        return undefined; 
      }
    },
    onError: (error) => console.log("DEPARTMENT ERROR:", error),
  });
};

export const useAddDepartment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addDepartment,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};