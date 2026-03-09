import { useQuery } from "@tanstack/react-query";
import { getLiveEmployees } from "../../services/HrServices/liveEmployeeService";

export const useLiveEmployees = (search, filter) => {
  return useQuery({
    queryKey: ["liveEmployees", search, filter],
    queryFn: () => getLiveEmployees(search, filter),
    keepPreviousData: true,
  });
};